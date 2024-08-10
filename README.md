# Tree App

Tree App is a web application designed for managing and visualizing tree structures. Using React and Redux, this project allows users to view, add, delete, and rename nodes in a tree structure.

## Live Demo

[View the application](https://tree-trial.netlify.app/)

## Features

- **View Tree Structure**: Load and display a tree structure from the API.
- **Add Nodes**: Add new nodes to the tree.
- **Delete Nodes**: Remove nodes from the tree.
- **Rename Nodes**: Change the names of nodes.

## Installation and Setup

Follow these steps to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)

### Clone the Repository

```bash
git clone <repository-link>
cd tree-app
```

Replace <repository-link> with the actual URL of your Git repository.

### Install Dependencies

npm install

### Running the Application

npm run dev

### Building for Production

npm run build

## Project Structure

tree-app/
├── public/ # Static files served by the application
├── src/ # Main application code
│ ├── api/ # API endpoints
│ ├── components/ # React components used in the application
│ ├── store/ # Redux store configuration
│ ├── models/ # TypeScript type definitions
│ └── main.tsx # Entry point for the React application
├── vite.config.ts # Configuration file for Vite
├── package.json # Project metadata and dependencies
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

## Dependencies

React: A JavaScript library for building user interfaces.
Redux Toolkit: The official toolset for efficient Redux development.
Vite: A fast build tool for modern web applications.
MUI: A popular React UI framework.
