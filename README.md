# Tradvio.com Clone - React Frontend

This project is a frontend clone of Tradvio.com, built with React, Vite, and TypeScript, using shadcn/ui for components.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have Node.js and npm (or another package manager like Yarn or pnpm) installed on your system. You can download Node.js from [here](https://nodejs.org/).

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/BenMaghzouz-Raed/tradvio-clone-frontend.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd tradvio-clone-frontend
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the development server, run the following command. This will start the application on a local server, typically at `http://localhost:5173`.

```bash
npm run dev
```

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in the development mode.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run preview`: Serves the production build locally for previewing.

## Project Structure

```md
tradvio-clone/
├── public/ # Public assets
├── src/ # Application source code
│ ├── components/ # React components
│ ├── context/ # contexts components
│ ├── config/ # Config data
│ ├── hook/ # Custom hooks
│ ├── lib/ # Utility functions
│ ├── pages/ # pages/features components
│ ├── App.tsx # Application entry point
│ ├── index.css # Main css and tailwind configuration
│ ├── main.tsx # Main rendering file
│ └── Router.tsx # Routes component
├── index.html # HTML entry point
├── tsconfig.json # TypeScript configuration
└── vite.config.ts # Vite configuration
