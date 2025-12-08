# Inventory Management System

A simple and elegant web-based inventory management system built with Express.js and vanilla JavaScript. Manage your inventory items with ease using this responsive application.

## Features

- ✨ **Add Items** - Add new items to your inventory with name, quantity, price, and category
- 🗑️ **Delete Items** - Remove items from the inventory
- 📊 **View Inventory** - Display all items in a clean, organized table
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Containerization**: Docker, Docker Compose

## Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose (optional, for containerized deployment)
- npm or yarn

## Installation

### Local Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd /home/ihete/Documents/Inventory_System
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

### Docker Setup

1. **Build and run using Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   ```
   http://localhost:3000
   ```

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

## Project Structure

# Smart Bill WASC - Complete CI/CD Pipeline

## 🚀 Complete DevOps Implementation

This project implements a full **8-phase DevOps CI/CD pipeline** with:

### ✅ Phase 1: Plan
- Project planning and requirements
- Architecture design
- Resource estimation

### ✅ Phase 2: Code
- **Git Flow workflow** (main → develop → feature)
- **Pull Request templates** with checklist
- **Commit message standards** (Conventional Commits)
- **Code review automation**
- **Branch protection rules**

### ✅ Phase 3: Build
- **GitHub Actions CI pipeline**
- **Multi-stage Docker builds** (optimized size)
- **Container registry** (GitHub Container Registry)
- **Build caching** for faster builds
- **Security scanning** (Trivy)

### ✅ Phase 4: Test
- **Unit tests** with Mocha
- **Integration tests** for API endpoints
- **E2E tests** with Playwright
- **Code coverage** reporting (Codecov)
- **Automated notifications** (Slack, Email)

### ✅ Phase 5: Release
- **Semantic versioning** (v1.2.3)
- **Automated changelog** generation
- **GitHub Releases** with artifacts
- **Docker image tagging** and publishing

### ✅ Phase 6: Deploy
- **Kubernetes deployment** manifests
- **Rolling updates** (zero downtime)
- **Blue-Green deployment** ready
- **Horizontal Pod Autoscaler** (HPA)
- **Resource limits** and requests calculated

### ✅ Phase 7: Operate
- **Prometheus** for metrics
- **Grafana** dashboards
- **ELK Stack** for logging
- **Alert rules** based on SLOs

### ✅ Phase 8: Monitor
- **Health checks** and probes
- **Auto-scaling** based on CPU/Memory
- **Feedback loop** (alerts → pipeline)
- **Auto-remediation** for failures

---

## 📋 Quick Start

### Prerequisites
```bash
- Docker 24+
- Kubernetes 1.27+
- kubectl configured
- GitHub account
```

### Local Development
```bash
# Install dependencies
npm install

# Run locally
npm start

# Run tests
npm test

# Run with Docker
docker-compose up
```

### Deploy to Kubernetes
```bash
# Apply all manifests
kubectl apply -f k8s/

# Check deployment
kubectl get pods -n smartbill-wasc

# Check HPA status
kubectl get hpa -n smartbill-wasc
```

---

## 🌿 Git Workflow

### Branching Strategy

