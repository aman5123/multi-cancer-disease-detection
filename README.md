# AI Healers — Multi-Cancer Disease Detection System

A capstone full-stack web application for medical image analysis. The system supports **8 deep learning models** across four cancer domains—Brain, Breast, Skin, and Gastrointestinal (GI)—for both **image classification** and **image segmentation**.

> **Disclaimer:** This tool is for research and educational purposes only. It is not a substitute for professional medical diagnosis.

## Features

- **8 AI models** — classification and segmentation for Brain, Breast, Skin, and GI cancers
- **React dashboard** — responsive UI with dark/light mode, animations, and charts
- **PDF reports** — download analysis results as clinical-style reports
- **Prediction history** — store and review past scans via MongoDB
- **FastAPI backend** — async API with dynamic PyTorch model loading
- **Visual explanations** — Grad-CAM heatmaps (classification) and segmentation masks

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Recharts, Axios |
| Backend | FastAPI, Uvicorn, PyTorch, Timm, Segmentation Models PyTorch |
| Database | MongoDB (Motor async driver) |
| Legacy (optional) | Flask, Jinja2 templates |

## Project Structure

```
.
├── backend/                 # FastAPI API server (primary backend)
│   ├── app.py               # Main application & routes
│   ├── model_loader.py      # Dynamic model architecture loading
│   ├── inference.py         # Classification & segmentation logic
│   ├── preprocessing.py     # Image transforms
│   ├── config.json          # Model definitions (required)
│   ├── requirements.txt
│   └── models/              # Trained .pth weight files (not in repo)
│
├── frontend/                # React + Vite SPA (primary UI)
│   ├── src/
│   │   ├── components/      # Navbar, Footer, etc.
│   │   ├── pages/           # Home, Detection, History, About
│   │   ├── services/api.js  # Backend API client
│   │   └── context/         # Theme provider
│   └── package.json
│
├── app.py                   # Legacy Flask prototype
├── templates/               # Legacy Flask HTML templates
├── static/                  # Legacy Flask static assets
├── uploads/                 # Optional uploaded image storage
├── PROJECT_OVERVIEW.md      # Extended project documentation
└── README.md
```

## Prerequisites

- **Python** 3.9+
- **Node.js** 18+
- **MongoDB** (local or cloud instance)
- **CUDA** (optional, for GPU-accelerated inference)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/config.json` with your model definitions. Each entry should follow this shape:

```json
{
  "skin_classification": {
    "type": "classification",
    "architecture": "efficientnet_b3",
    "model_path": "models/skin_cancer_classification.pth",
    "classes": ["akiec", "bcc", "bkl", "df", "mel", "nv", "vasc"],
    "img_size": 224
  },
  "skin_segmentation": {
    "type": "segmentation",
    "architecture": "unet",
    "encoder": "resnet34",
    "model_path": "models/skin_segmentation.pth",
    "img_size": 256
  }
}
```

Supported architectures:

- **Classification:** `efficientnet_b3`, `resnet50`, `vit_small_patch16_224`, `custom_cnn`
- **Segmentation:** `unet`, `unet_plus_plus`

Place trained weight files (`.pth`) in `backend/models/`. Model binaries are excluded from version control due to size.

Start the API server:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The dev server runs at `http://localhost:5173` by default.

### 4. Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGODB_URL` | `mongodb://localhost:27017` | MongoDB connection string |
| `VITE_API_URL` | `http://localhost:8000` | Backend URL for the React app |

Create a `frontend/.env` file to point at your API:

```
VITE_API_URL=http://localhost:8000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/models` | List loaded model configurations |
| `POST` | `/predict/{model_key}` | Upload an image and run inference |
| `GET` | `/history` | Retrieve the 50 most recent predictions |

**Example prediction request:**

```bash
curl -X POST "http://localhost:8000/predict/skin_classification" \
  -F "file=@sample.jpg"
```

## AI Models

| Cancer Type | Classification | Segmentation |
|-------------|----------------|--------------|
| Brain | Custom CNN (Figshare) | Attention U-Net (BRATS) |
| Breast | ResNet-50 (BreaKHis) | UNet++ + EfficientNet-B3 (BUSI) |
| Skin | EfficientNet-B3 (HAM10000) | U-Net + ResNet34 (ISIC 2018) |
| GI | ViT (Kvasir) | UNet++ + EfficientNet-B4 (Kvasir-SEG) |

See [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for methodology, data flow, and concept details.

## Legacy Flask App

An earlier Flask-based prototype lives at the repository root (`app.py`, `templates/`, `static/`). It can be run independently for reference:

```bash
pip install -r requirements.txt
python app.py
```

The React + FastAPI stack is the primary application going forward.

## Scripts

**Backend**

```bash
uvicorn app:app --reload          # Development server
```

**Frontend**

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
---

*Capstone Project — 202*
