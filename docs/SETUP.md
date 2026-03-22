# Smart Healthcare AI — Local Setup

This guide details how to run the web application on your local machine. The steps have been verified against the current repository state built with Node.js and Next.js 16.

## Dependencies

- **Node.js** v18.17 or later (required by Next.js 16)
- **npm** (comes with Node.js)

## Instructions

1. **Navigate to the web directory**
   Because this is a polyglot monorepo, all front-end commands must be run within the `web/` workspace.
   ```bash
   cd web
   ```

2. **Install modules**
   Install all necessary dependencies. This will fetch React 19, Next.js 16, Tailwind CSS v4, and the required `@gradio/client`, `framer-motion`, and `lucide-react` libraries.
   ```bash
   npm install
   ```

3. **Run the development server**
   Start the Next.js development server. It will compile using Turbopack for faster refreshes.
   ```bash
   npm run dev
   ```

4. **View the application**
   Open your browser and navigate to the local host address provided in the terminal (usually `http://localhost:3000`).
   The HuggingFace Gradio client will automatically attempt to connect to the external ML model upon page load.

*(Note: There are no `.env` configurations, database migrations, or background jobs required to run the frontend.)*
