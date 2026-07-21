# 🎨 CanvasCode

> **AI-Powered Visual Full-Stack IDE**

CanvasCode is a desktop application that transforms full-stack web development into a visual experience. Instead of manually writing thousands of lines of code, developers design applications through a drag-and-drop interface while AI generates production-ready code behind the scenes.

Built for **OpenAI Build Week**.

---

# 🚀 Elevator Pitch

CanvasCode bridges the gap between visual design tools and professional software development.

Developers visually build interfaces using drag-and-drop components, configure them through an intelligent property system, preview changes instantly, and compile the entire project into a production-ready full-stack application powered by AI.

Unlike existing AI builders that only generate UI or require constant prompting, CanvasCode understands the complete project structure before generating clean, maintainable code.

---

# ✨ Features

- 🎨 Drag-and-Drop Visual Canvas
- 🧩 Component Library
- ⚙️ Dynamic Property Inspector
- 👀 Live Application Preview
- 🌳 Automatic Project AST Generation
- 🤖 AI-Powered Full-Stack Code Generation
- 🔄 Compiler Orchestration Pipeline
- 📊 Backend Blueprint Visualization
- 📝 Monaco Code Editor
- 📂 Project Workspace
- 📦 Export Production-Ready Projects
- 💾 SQLite Project Persistence
- 🖥 Desktop Application powered by Electron

## Human + CODEX & GPT-5.6 Collaboration

While Codex significantly accelerated development, all major architectural decisions, product vision, workflow design, feature planning, and final implementation decisions were made by the development team.

This collaborative workflow allowed us to rapidly prototype, iterate, and build a complex desktop application while maintaining full control over the software architecture and user experience.

OpenAI Codex enabled us to spend less time writing repetitive boilerplate and more time solving challenging engineering problems that make CanvasCode unique.

#  CODEX-Assisted Development

CanvasCode was developed using an AI-assisted engineering workflow throughout the project lifecycle.

Instead of using AI only for code completion, we used CODEX in the software development process to accelerate architecture design, feature implementation, debugging, and iterative refinement.

### OpenAI Codex

OpenAI Codex was used to:

- Scaffold complex React and Electron modules.
- Generate repetitive TypeScript boilerplate.
- Implement React Flow interactions.
- Accelerate backend API development.
- Refactor components into reusable modules.
- Resolve implementation issues during development.
- Speed up debugging and iteration.

---

# 🏗 Architecture

```
Dashboard
    │
    ▼
Project Manager
    │
    ▼
Canvas Engine
    │
    ▼
Component Registry
    │
    ▼
Property Inspector
    │
    ▼
Live Preview
    │
    ▼
AST Engine
    │
    ▼
Compiler Orchestrator
    │
    ▼
AI Integration Layer
    │
    ▼
AI Code Generation Engine
    │
    ▼
Blueprint Renderer
    │
    ▼
Workspace
    │
    ▼
Export Engine
```

---

# 🛠 Tech Stack

## Frontend

- React
- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Flow
- Zustand

## Desktop

- Electron

## Backend

- Node.js
- Express.js

## Database

- Prisma ORM
- SQLite

## Editor

- Monaco Editor

## AI

- OpenRouter
- OpenAI Compatible APIs

---

# 🤖 AI Workflow

CanvasCode uses AI as an intelligent software engineering assistant rather than a simple code generator.

Workflow:

```
Visual Design

↓

Project AST

↓

Compilation Plan

↓

Prompt Builder

↓

AI Provider

↓

Generated Source Code

↓

Validation

↓

Workspace
```

The AI understands the entire project before generating code, allowing it to produce consistent frontend, backend, routing, API, and database layers.

---

# 📂 Project Structure

```
CanvasCode/

app/

components/

electron/

hooks/

lib/

prisma/

public/

services/

types/

utils/

package.json
```

---

# 🚀 Getting Started

## Clone

```bash
git clone https://github.com/yourusername/CanvasCode.git

cd CanvasCode
```

## Install

```bash
npm install
```

## Create Environment Variables

Create a `.env` file.

```env
AI_PROVIDER=openrouter

OPENROUTER_API_KEY=your_key

DATABASE_URL=file:./canvascode.db
```

## Run

```bash
npm run dev
```

---

# 🖥 How It Works

1. Create a new project.
2. Drag UI components onto the canvas.
3. Configure component properties.
4. Preview changes instantly.
5. Compile the project.
6. AI generates production-ready source code.
7. Inspect backend logic.
8. Export the application.

---

# 📸 Screenshots

Add screenshots here.

- Dashboard
- Canvas
- Property Inspector
- Live Preview
- AI Compilation
- Blueprint Renderer
- Workspace
- Export

---

# 🎥 Demo Video

Demo Video:

(Add YouTube Link Here)

---

# 🧠 Challenges

- Designing a scalable visual architecture.
- Synchronizing UI, AST, and generated code.
- Building a modular AI generation pipeline.
- Managing desktop application state efficiently.
- Creating an extensible component system.

---

# 🏆 Accomplishments

- Built a desktop-first visual development environment.
- Designed a complete AI-assisted compilation pipeline.
- Developed an extensible drag-and-drop editor.
- Integrated AI into a structured development workflow.

---

# 📚 What We Learned

This project reinforced the importance of modular architecture, state management, AI orchestration, and designing systems that keep developers in control while leveraging AI for productivity.

---

# 🔮 Future Improvements

- Real-time collaboration
- Multi-language support
- Plugin ecosystem
- Cloud synchronization
- Custom component marketplace
- AI-assisted debugging
- Deployment integrations

---

# 👥 Team

- Abdul Rehman
- Owaif Amir

---

# ❤️ Acknowledgements

This project was created for **OpenAI Build Week**.

We would like to thank **OpenAI** for organizing the hackathon and providing tools such as **OpenAI Codex & GPT-5.6**, which played a significant role in accelerating development, code generation, debugging, and iterative software engineering throughout the project.

We also acknowledge the open-source communities behind React, Next.js, Electron, React Flow, Prisma, Tailwind CSS, Shadcn UI, and the many tools that made this project possible.
