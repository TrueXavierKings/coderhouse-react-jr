# Project VL

This is a React application built with Vite. The app allows users to browse items, add them to a cart, and proceed to checkout. The app also includes functionality to manage the cart, including adding, removing, and clearing items.

## Table of Contents

1. [Installation](#installation)
2. [Running the App in Development Mode](#running-the-app-in-development-mode)
3. [Building the App for Production](#building-the-app-for-production)
4. [Environment Variables](#environment-variables)

## Installation

Follow these steps to install the application:

1. **Clone the repository:**

```bash
git clone https://github.com/TrueXavierKings/coderhouse-react-jr.git
cd project-vl
```

2. **Install dependencies:**

The application uses npm for managing dependencies. Run the following command to install the necessary packages:

```bash
npm install
```

## Running the App in Development Mode

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the Vite development server, which will compile the app and serve it on a local development server. You can access the app in your browser at http://localhost:5173/

The development server will automatically reload the app when you make changes to the code.

## Building the App for Production

To build the app for production, run the following command:

```bash
npm run build
```

This command will create an optimized production build in the dist folder. You can then deploy the contents of the dist folder to your production server.

To preview the production build locally, use the following command after building the app:

```bash
npm run preview
```

This will start a local server to preview the production build.

## Environment Variables

The app uses environment variables to manage configuration settings. You can define these variables in a .env file at the root of your project.

For example, to set the tax rate used in the app, create a .env file with the following content:

```bash
VITE_TAX_RATE=0.19
```

### Explanation of VITE_TAX_RATE

- VITE_TAX_RATE: This variable represents the tax rate that will be applied to the cart total during checkout. The value should be a decimal representing the tax percentage (e.g., 0.19 for 19% tax).

Make sure to restart the development server or rebuild the app after modifying the .env file so that the changes take effect.