# Getting Started

## Prerequisites

| Tool    | Version | Installation                          |
|---------|---------|---------------------------------------|
| Node.js | ≥ 18.17 | [nodejs.org](https://nodejs.org/)     |
| npm     | ≥ 9     | Included with Node.js                 |
| Git     | Any     | [git-scm.com](https://git-scm.com/) |

No database, Docker, or external service accounts are required. The Hugging Face model API is public and requires no authentication.

## Installation

```bash
git clone https://github.com/manishborikar92/Smart-Healthcare.git
cd Smart-Healthcare
```

This is a polyglot monorepo. The web application lives in the `web/` directory — all frontend commands must be run from there.

```bash
cd web
npm install
```

This installs React 19, Next.js 16, Tailwind CSS v4, `@gradio/client`, `framer-motion`, `lenis`, and `lucide-react`.

## Environment Configuration

No environment variables are required. The Hugging Face Space URL (`theodinproject/skin_cancer_model_resnet50v2`) is hardcoded in the `Upload.jsx` component because it is a public API endpoint.

There is no `.env.example` file in this project. If a `NEXT_PUBLIC_APP_URL` variable is needed in the future for absolute Open Graph URLs, it can be set in a `.env.local` file inside the `web/` directory.

## Starting the Development Server

```bash
npm run dev
```

The Next.js development server starts with Turbopack. Open `http://localhost:3000` in your browser.

On the home page, the application will display a "Connecting to AI model…" indicator while the `@gradio/client` establishes a WebSocket connection to the Hugging Face Space. Once connected, upload a skin image to receive a classification.

## Running the Linter

```bash
npm run lint
```

This runs ESLint with the `eslint-config-next/core-web-vitals` configuration. There is no separate formatting tool configured.

## Building for Production

```bash
npm run build
```

This produces a production-optimized build in the `web/.next/` directory.

```bash
npm run start
```

Serves the production build locally on `http://localhost:3000`.

## Common Development Commands

All commands are run from the `web/` directory.

| Command         | Description                                  |
|-----------------|----------------------------------------------|
| `npm run dev`   | Start the development server (Turbopack)     |
| `npm run build` | Create a production build                    |
| `npm run start` | Serve the production build locally           |
| `npm run lint`  | Run ESLint across the codebase               |

## Python ML Scripts (Optional)

The `model/` directory contains Python scripts for offline model training and utilities. These are independent of the web application and do not need to be run to develop or use the frontend.

To set up the Python environment:

```bash
cd model
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

Key scripts:

| Script                  | Purpose                                           |
|-------------------------|---------------------------------------------------|
| `utils/train_model.py`  | Train the ResNet-50 v2 model on skin image data   |
| `utils/preprocess.py`   | Preprocess images and test Gradio inference        |
| `tools/check.py`        | Validate image files in a directory                |
| `tools/compress_imges.py` | Batch compress images using PIL                  |
