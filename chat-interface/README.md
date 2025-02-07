# Chat Interface Project

## 🚀 Project Overview
This is a modern chat interface built using React (Vite) with support for speech recognition, theme toggling, and responsive design. The project is containerized using Docker for seamless deployment.

## 📂 Project Structure
```
chat-interface/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── InputArea.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   └── MessageThread.tsx
│   │   ├── settings/
│   │   │   └── ThemeToggle.tsx
│   │   ├── context/
│   │   │   └── ChatContext.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   └── types/
│   │       └── chat.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Setup Instructions
### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)

### 1️⃣ Clone the Repository
```sh
git clone [your-repository-url]
cd chat-interface
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run Locally
```sh
npm run dev
```
The application will be available at `http://localhost:5173`.

## 🐳 Running with Docker
### 1️⃣ Build and Run the Docker Container
```sh
docker-compose up --build
```
This will start the app in a Docker container.

### 2️⃣ Access the Application
Open `http://localhost:5173` in your browser.

## 🏗️ Architecture Overview
This project follows a modular architecture:
- **Components**: Divided into `chat`, `settings`, and shared UI components.
- **Context**: Manages global state using React Context API.
- **Services**: Handles API interactions.
- **Types**: Stores TypeScript interfaces for type safety.

## 🎯 Implementation Decisions
- **React (Vite)**: Faster development with optimized build performance.
- **Context API**: Lightweight state management.
- **Docker**: Ensures consistency across environments.
- **Responsive UI**: Optimized for mobile and desktop devices.

## 🧪 Testing Approach
- Unit tests using Jest and React Testing Library.
- Integration tests for API interactions.
- Manual testing on different devices.

## 📜 Docker Configuration
### Dockerfile
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
services:
  app:
    build: .
    ports:
      - "5173:5173"
    environment:
      - NODE_ENV=production
```
