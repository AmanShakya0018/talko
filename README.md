# Talko

## 💬 Introduction

Talko is a real-time messaging platform that offers a seamless chat experience with features like typing indicators, read receipts, online user tracking, and responsive design. Whether for personal conversations or team communication, Talko keeps you connected with a modern and intuitive interface.

---

## 🛠️ Technologies Used

### Client (Next.js App)

- **Next.js** - Frontend framework
- **TypeScript** - Type safety and modern JavaScript features
- **Tailwind CSS** - Responsive and customizable styling
- **NextAuth** - Authentication using Google
- **Prisma** - Database ORM
- **Socket.io Client** - Real-time communication

### Server (Node.js with Socket.io)

- **Express.js** - Server framework
- **Socket.io** - Real-time communication
- **CORS** - Cross-origin resource sharing
- **Axios** - API requests
- **dotenv** - Environment variable management

---

## 🚀 Getting Started

### Cloning the Repository

To clone the repository locally, use the following commands:

```bash
git clone https://github.com/your-username/Talko.git
cd Talko

```

### Client Setup

```bash
cd client
npm install

```

### Configuration

Create a `.env` file in the root folder of your project. Update it following the convention of the `.env.example` file.
Here's an example:

```
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET="your-own-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_SOCKET_URL="http://localhost:5000"

```

### Running the Project

```bash
npm run dev
```

### Server Setup

```bash
cd server
npm install

```

### Configuration

Create a `.env` file in the root folder of your project. Update it following the convention of the `.env.example` file.
Here's an example:

```
PORT=5000
CLIENT_URL="http://localhost:3000"
```

### Running the Project

```bash
npm run dev
```

## 🤝 Contribution Guide

I hearty welcome contributions! Please follow these steps:

- Fork the repository.
- Create a new branch `(git checkout -b feature-branch-name)`.
- Make your changes and commit them `(git commit -m "Add feature description")`.
- Push your changes `(git push origin feature-branch-name)`.
  Create a Pull Request.

---

Thank you for checking out this project! Feel free to open an issue if you have any questions or suggestions.
