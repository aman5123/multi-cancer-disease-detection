# AI Healers: Multi-Cancer Disease Detection System - Project Documentation

This document provides a comprehensive overview of the **AI Healers** project, explaining the technology stack, core concepts, and how the system handles data.

---

## 1. Project Overview
**AI Healers** is a full-stack web application designed for the detection and analysis of various types of cancer (Skin, Breast, Brain, and Gastrointestinal) using advanced Deep Learning models. The system supports both **Image Classification** (identifying the type/severity of cancer) and **Image Segmentation** (highlighting the specific cancerous regions in an image).

---

## 2. Technology Stack (Tools Used)

### **Frontend (User Interface)**
*   **React (Vite):** A modern, fast JavaScript framework used for building the responsive and interactive user interface.
*   **Tailwind CSS:** A utility-first CSS framework used for creating a premium, modern "glassmorphism" design.
*   **Axios:** A library used to send HTTP requests from the browser to the backend server.
*   **Lucide React:** A collection of beautiful, consistent icons used throughout the app.
*   **Framer Motion:** Used for smooth animations and transitions.

### **Backend (The "Brain")**
*   **FastAPI (Python):** A high-performance web framework for building APIs with Python. It handles the logic of receiving images and returning AI predictions.
*   **Uvicorn:** A lightning-fast ASGI server implementation used to run the FastAPI application.
*   **Pydantic:** Used for data validation and settings management.

### **AI & Machine Learning**
*   **PyTorch:** The primary deep learning framework used for loading models and running inference.
*   **Timm (PyTorch Image Models):** Used for advanced architectures like Vision Transformers (ViT).
*   **Segmentation Models PyTorch (SMP):** Used for creating segmentation architectures like UNet and UNet++.
*   **OpenCV & PIL:** Libraries used for image preprocessing (resizing, normalizing) before sending them to the AI.

### **Database & Storage**
*   **MongoDB:** A NoSQL database used to store the history of scans, including timestamps, model types, and results.
*   **Motor:** An asynchronous Python driver for MongoDB.

---

## 3. Methodology (The AI Models)
The system integrates 8 distinct deep learning architectures specifically optimized for different cancer types:

*   **Brain Cancer:**
    *   **Classification:** Custom CNN for 4-class classification (using Figshare dataset).
    *   **Segmentation:** Attention U-Net for highlighting tumor regions (using BRATS2020 dataset).
*   **Breast Cancer:**
    *   **Classification:** ResNet-50 architecture (using BreaKHis dataset).
    *   **Segmentation:** UNet++ with EfficientNet-B3 encoder for precise lesion detection (using BUSI dataset).
*   **Skin Cancer:**
    *   **Classification:** EfficientNet-B3 for 7-class classification (using HAM10000 dataset).
    *   **Segmentation:** U-Net with ResNet34 backbone (using ISIC 2018 dataset).
*   **Gastrointestinal (GI) Cancer:**
    *   **Classification:** Vision Transformer (ViT) for detecting abnormalities (using Kvasir dataset).
    *   **Segmentation:** UNet++ with EfficientNet-B4 for polyp segmentation (using Kvasir-SEG dataset).

---

## 4. Important Concepts

### **Image Classification**
This process tells you *what* is in the image. For example, given a skin lesion image, the model classifies it into categories like "Malignant" or "Benign."

### **Image Segmentation**
This process tells you *where* the issue is. It generates a "mask" that overlays the original image, highlighting the exact area of the tumor or lesion.

### **Preprocessing**
Raw images from users cannot be fed directly into AI models. They must first be:
1.  **Resized:** To a standard size (e.g., 224x224 or 256x256).
2.  **Normalized:** Adjusting pixel values (Mean/Std) to match the range the model was trained on.
3.  **Converted to Tensors:** Changing the image format into mathematical arrays (tensors) that PyTorch understands.

---

## 5. Data Flow: Where does the "Upload Pic" go?

When you upload an image through the website, the following happens:

1.  **Frontend:** The image is selected and sent as `multipart/form-data` to the backend `/predict` endpoint using Axios.
2.  **Backend (In-Memory):** The image is read into the server's memory as bytes. It is **not** permanently saved to a folder by default to ensure speed and disk space management.
3.  **AI Inference:** The backend pre-processes the bytes and sends them to the selected model.
4.  **Database Storage:** The **metadata** (filename, prediction result, and timestamp) is saved into the **MongoDB `history` collection**.
5.  **Root Folder `uploads/`:** This directory is available for persistent file storage if you decide to enable permanent saving of images in the future.

---

## 6. Project Structure Summary

*   `frontend/`: The React application (Vite, Tailwind, Framer Motion).
*   `backend/`: The FastAPI server, `inference.py`, and `model_loader.py`.
*   `models/`: Stores the pre-trained weights (`.pth`, `.keras`).
*   `uploads/`: Placeholder directory for file storage.

---

## 7. Development Team
*   **Aman:** Lead Developer
*   **Samrit:** ML Engineer
*   **Sejal:** Frontend Developer
*   **Kritika:** Researcher
*   **Simran:** UI Designer

**Department:** Computer Science & Engineering (AI & DS)  
**Mentor:** Er. Ravi Kumar
