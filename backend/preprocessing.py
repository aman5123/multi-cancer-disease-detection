import torch
from torchvision import transforms
from PIL import Image
import numpy as np

def get_preprocessing(model_info):
    img_size = model_info["img_size"]
    
    if model_info["type"] == "classification":
        return transforms.Compose([
            transforms.Resize((img_size, img_size)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
    else:
        # For segmentation, we often need to keep the image and mask alignment
        # This is a basic transform for the input image
        return transforms.Compose([
            transforms.Resize((img_size, img_size)),
            transforms.ToTensor(),
            # No normalization or different normalization depending on the encoder
        ])

def preprocess_image(image_bytes, model_info):
    image = Image.open(image_bytes).convert("RGB")
    transform = get_preprocessing(model_info)
    input_tensor = transform(image).unsqueeze(0)
    return input_tensor, image
