import torch
import torch.nn as nn
import torchvision.models as models
import segmentation_models_pytorch as smp
import timm
import json
import os

def load_model(model_key, config):
    model_info = config[model_key]
    model_type = model_info["type"]
    architecture = model_info["architecture"]
    model_path = model_info["model_path"]
    
    if not os.path.exists(model_path):
        print(f"Warning: Model file {model_path} not found. Returning None for {model_key}")
        return None

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    if model_type == "classification":
        if architecture == "efficientnet_b3":
            model = models.efficientnet_b3(weights=None)
            num_ftrs = model.classifier[1].in_features
            model.classifier[1] = nn.Linear(num_ftrs, len(model_info["classes"]))
        
        elif architecture == "vit_small_patch16_224":
            model = timm.create_model("vit_small_patch16_224", pretrained=False, num_classes=len(model_info["classes"]))
            
        elif architecture == "resnet50":
            model = models.resnet50(weights=None)
            num_ftrs = model.fc.in_features
            model.fc = nn.Linear(num_ftrs, len(model_info["classes"]))
            
        elif architecture == "custom_cnn":
            # Example Custom CNN for Brain Classification
            model = nn.Sequential(
                nn.Conv2d(3, 32, kernel_size=3, padding=1),
                nn.ReLU(),
                nn.MaxPool2d(2),
                nn.Conv2d(32, 64, kernel_size=3, padding=1),
                nn.ReLU(),
                nn.MaxPool2d(2),
                nn.Flatten(),
                nn.Linear(64 * 56 * 56, 512),
                nn.ReLU(),
                nn.Linear(512, len(model_info["classes"]))
            )
        else:
            raise ValueError(f"Unknown architecture: {architecture}")

    elif model_type == "segmentation":
        encoder = model_info.get("encoder", "resnet34")
        if architecture == "unet":
            model = smp.Unet(
                encoder_name=encoder,
                encoder_weights=None,
                in_channels=3,
                classes=1,
            )
        elif architecture == "unet_plus_plus":
            model = smp.UnetPlusPlus(
                encoder_name=encoder,
                encoder_weights=None,
                in_channels=3,
                classes=1,
            )
        else:
            raise ValueError(f"Unknown segmentation architecture: {architecture}")

    # Load weights
    try:
        state_dict = torch.load(model_path, map_location=device)
        model.load_state_dict(state_dict)
        model.to(device)
        model.eval()
        print(f"Successfully loaded {model_key}")
        return model
    except Exception as e:
        print(f"Error loading {model_key}: {e}")
        return None

def load_all_models(config_path="config.json"):
    with open(config_path, 'r') as f:
        config = json.load(f)
    
    loaded_models = {}
    for model_key in config.keys():
        loaded_models[model_key] = load_model(model_key, config)
    
    return loaded_models, config
