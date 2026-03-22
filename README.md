# Smart Healthcare AI

Smart Healthcare AI is a web application that classifies skin conditions from uploaded images using a custom-trained ResNet-50 v2 deep learning model. The model is hosted on Hugging Face Spaces and accessed directly from the browser via the Gradio client — no backend server or database is required. The tool is designed for educational purposes and is not a substitute for professional medical advice.

## Prerequisites

| Requirement | Version   | Notes                                                   |
|-------------|-----------|---------------------------------------------------------|
| Node.js     | ≥ 18.17   | [Download](https://nodejs.org/)                         |
| npm         | ≥ 9       | Included with Node.js                                   |

## Quick Start

```bash
git clone https://github.com/manishborikar92/Smart-Healthcare.git
cd Smart-Healthcare
```

```bash
cd web
npm install
```

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. The application will automatically connect to the Hugging Face model on page load.

## Project Structure

```
Smart-Healthcare/
├── docs/                  # Architecture, setup, design system, and migration documentation
├── images/                # Screenshots used in documentation
├── model/                 # Python ML scripts — training, preprocessing, utilities
│   ├── tools/             # Image validation and compression helpers
│   └── utils/             # Model training and Gradio inference scripts
├── web/                   # Next.js 16 frontend application
│   ├── public/            # Static assets — SVG logos, PWA icons
│   └── src/
│       ├── app/           # Next.js App Router — pages, layout, metadata, CSS
│       └── components/    # React components (layout, features, UI)
└── README.md              # This file
```

## Documentation

```
docs/
├── PROJECT-OVERVIEW.md      # What the project is, core concepts, and stakeholders
├── GETTING-STARTED.md       # Prerequisites, installation, and development commands
├── ARCHITECTURE.md          # System design, component map, data flow
├── TECH-STACK.md            # Every technology with version and purpose
├── UI-DESIGN-SYSTEM.md      # Design tokens, colour system, typography, animations
├── UI-COMPONENTS.md         # Component API reference with props and accessibility
├── SEO-STRATEGY.md          # Metadata, sitemap, robots.txt, Core Web Vitals
├── SECURITY.md              # Security headers, data handling, medical disclaimer
├── MIGRATION-RECORD.md      # Historical record of the Vite → Next.js 16 migration
└── CONTRIBUTING.md          # How to contribute, code style, workflow
```

## Available Commands

All commands are run from the `web/` directory.

| Command         | Description                                  |
|-----------------|----------------------------------------------|
| `npm run dev`   | Start the development server (Turbopack)     |
| `npm run build` | Create a production build                    |
| `npm run start` | Serve the production build locally           |
| `npm run lint`  | Run ESLint across the codebase               |

## Live Demo

| Platform  | URL                                                                  |
|-----------|----------------------------------------------------------------------|
| Vercel    | [smart-healthcare-ai.vercel.app](https://smart-healthcare-ai.vercel.app/) |
| Streamlit | [smart-healthcare.streamlit.app](https://smart-healthcare.streamlit.app/) |
| Render    | [smart-healthcare-xe3p.onrender.com](https://smart-healthcare-xe3p.onrender.com/) |

## Disclaimer

This application is for **educational purposes only**. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult a certified healthcare provider.

## Developers

| Name               | GitHub                                                        | Email                           |
|--------------------|---------------------------------------------------------------|----------------------------------|
| Manish Borikar     | [manishborikar92](https://github.com/manishborikar92)         | manishborikar@proton.me          |
| Prankita Potbhare  | [prankitapotbhare](https://github.com/prankitapotbhare)      | prankitapotbhare@proton.me       |

## Acknowledgments

- [Hugging Face Spaces](https://huggingface.co/spaces) for model hosting and inference API
- [Next.js](https://nextjs.org/) and [Vercel](https://vercel.com/) for the frontend framework and deployment
- [TensorFlow](https://www.tensorflow.org/) for the deep learning model training framework