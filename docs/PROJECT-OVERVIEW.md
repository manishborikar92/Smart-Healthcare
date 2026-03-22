# Project Overview

## What Is Smart Healthcare AI?

Smart Healthcare AI is a web-based skin condition classifier. Users upload an image of a skin lesion or condition, and the application sends it to a ResNet-50 v2 deep learning model hosted on Hugging Face Spaces. The model returns a classification (one of five categories) along with a confidence score. The application targets patients seeking preliminary insight, medical students studying dermatology, and healthcare professionals exploring AI-assisted diagnostics — all within an educational context.

## Core Concepts

**Skin Condition Classification** — The model classifies images into exactly five categories: Burn Skin, Healthy Skin, Malignant, Non-Cancerous, and Non-Skin. Each classification maps to a severity level (danger, warning, good, info, neutral) that determines the visual presentation of results.

**Client-Side Inference** — The application has no backend server. The `@gradio/client` library establishes a WebSocket connection directly from the user's browser to the Hugging Face Space, streams the uploaded image, and receives the prediction result. All processing happens between the browser and the external model API.

**ResNet-50 v2** — A deep convolutional neural network architecture used for image classification. The model was custom-trained on dermatological image datasets using TensorFlow and is deployed as a Gradio application on Hugging Face Spaces at `theodinproject/skin_cancer_model_resnet50v2`.

**Gradio Client** — The `@gradio/client` npm package provides a JavaScript interface to Gradio-hosted machine learning models. It handles connection establishment, binary image streaming, and result parsing over WebSocket connections.

**Polyglot Monorepo** — The repository contains two independent domains: a JavaScript/Next.js web application (`web/`) and Python machine learning scripts (`model/`). The Python code is used offline for model training and utilities — it does not run as part of the web application.

## Key Features

- Image classification into five skin condition categories with confidence scores
- Drag-and-drop and click-to-upload file input with image preview
- Real-time WebSocket connection to the Hugging Face inference API
- Severity-aware result display with colour-coded condition cards
- Medical disclaimer for potentially concerning classifications (Malignant, Burn Skin)
- Responsive, accessible dark-themed interface with glass-morphism design
- SEO-optimized with sitemap, robots.txt, Open Graph, and Twitter Card metadata
- Progressive Web App (PWA) manifest for home screen installation

## System Boundaries

**What the system does:**

- Accepts skin images via browser file upload
- Sends images to an external AI model for classification
- Displays classification results with confidence scores
- Serves a static, SEO-friendly marketing and information site

**What the system does not do:**

- Store, persist, or log uploaded images
- Run AI inference locally or on its own servers
- Provide medical diagnoses or treatment recommendations
- Require user accounts, authentication, or authorization
- Maintain a database or any server-side state

## Stakeholders and Users

**Patients and general users** — Upload skin images to receive a preliminary classification. The application displays clear disclaimers that results are for educational purposes only.

**Medical students** — Use the tool to explore AI-assisted dermatological classification and understand how deep learning models approach skin condition analysis.

**Healthcare professionals** — Evaluate the tool as a reference for AI-assisted diagnostics concepts, not as a clinical instrument.

**Developers and contributors** — An open-source project welcoming contributions. The two primary maintainers are Manish Borikar (Full-Stack Developer) and Prankita Potbhare (ML Engineer).
