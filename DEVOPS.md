# DevOps Documentation

This document provides instructions for setting up, running, and deploying the `binomo` project.

## 1. Project Overview

This project is a monorepo managed by [pnpm](https://pnpm.io/) and [Turborepo](https://turbo.build/). The project is structured as follows:

-   `apps/`: Contains the main applications, such as the `web` (Next.js frontend) and `server` (Node.js backend).
-   `packages/`: Contains shared libraries and packages, such as `db` (database schema and client), `ui` (React components), `event-queue`, etc.
-   `services/`: Contains microservices that perform specific tasks, such as `oracle`, `wss` (WebSocket Server), `position-liquidator`, etc.

The project uses Docker for containerization and `docker-compose` for orchestration of services in a production environment.

## 2. Prerequisites

Before you begin, ensure you have the following tools installed on your system:

-   [Node.js](https://nodejs.org/) (version >=18, as specified in `package.json`)
-   [pnpm](https://pnpm.io/installation) (version 10.9.0, as specified in `package.json`)
-   [Docker](https://docs.docker.com/get-docker/)
-   [Docker Compose](https://docs.docker.com/compose/install/)

## 3. Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd binomo
    ```

2.  **Install dependencies:**

    Use `pnpm` to install all the dependencies for the monorepo:

    ```bash
    pnpm install
    ```

## 4. Running the Application

### Development Mode

To run all the applications and services in development mode, use the following command:

```bash
pnpm dev
```

This command uses `turbo run dev` to start the development servers for all the applications and services defined in the `pnpm-workspace.yaml`. The `dev` task is configured in `turbo.json` to be persistent and not cached.

### Production Mode

The application is designed to be run with Docker and Docker Compose in a production environment.

1.  **Create an environment file:**

    The `docker-compose.yml` file uses `.env.prod` for environment variables. You should create this file by copying the example file:

    ```bash
    cp .env.example .env.prod
    ```

    Then, edit the `.env.prod` file with your production configuration.

2.  **Build and run the containers:**

    Use `docker-compose` to build the images and start the services:

    ```bash
    docker-compose up --build -d
    ```

    This will start all the services defined in the `docker-compose.yml` file in detached mode (`-d`). The services include the web server, backend server, database, Redis, and all the microservices.

To stop the services, run:

```bash
docker-compose down
```

## 5. Building the Application

To build all the applications and services for production, run the following command:

```bash
pnpm build
```

This command uses `turbo run build` to create optimized production builds for all the workspaces. The build outputs are stored in the `.next/` directory for the Next.js app and `dist/` directories for the other services and packages, as configured in `turbo.json`.

## 6. Deployment

The project is set up to be deployed using Docker. The `docker-compose.yml` file orchestrates the deployment of all the services.

A typical deployment process would be:

1.  Ensure the production server has Docker and Docker Compose installed.
2.  Copy the project source code to the server.
3.  Create the `.env.prod` file with the correct production environment variables.
4.  Run `docker-compose up --build -d` to build and start all the services.

For a more advanced setup, you can use a CI/CD pipeline to automate this process.

## 7. Environment Variables

Environment variables are managed using `.env` files.

-   `.env.example`: This file contains a list of all the environment variables required by the applications and services. It can be used as a template for creating your own environment files.
-   `.env.prod`: This file is used by `docker-compose` for production deployment. It should contain the actual values for the production environment.

## 8. CI/CD (Suggested)

A CI/CD pipeline can be set up to automate the building, testing, and deployment of the project. Here is a suggested workflow for a CI/CD pipeline (e.g., using GitHub Actions):

1.  **On push to `main` branch or on creating a pull request:**
    -   Install dependencies (`pnpm install`).
    -   Run linting (`pnpm lint`).
    -   Run type checking (`pnpm check-types`).
    -   Run tests (a `test` script would need to be added to `package.json`).
    -   Build the project (`pnpm build`).

2.  **On merge to `main` branch (for deployment):**
    -   Build Docker images for each service.
    -   Push the images to a container registry (e.g., Docker Hub, AWS ECR, Google Container Registry).
    -   On the production server, pull the latest images and restart the services using `docker-compose`.
