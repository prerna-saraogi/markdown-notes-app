#  Markdown Notes App


A Vite-powered, Firebase-backed, and user-friendly **Markdown note-taking app**. Effortlessly create, edit, and manage Markdown-based notes with real-time storage and retrieval powered by **Firebase**. This app ensures a fast, efficient, and seamless experience for organizing and structuring your thoughts in **Markdown**.


## 🚀 Demo

[View Live App](https://markdown-notes-firebase.netlify.app/)


## Features

- **Real-time Note Management** - Create, read, update, and delete (CRUD) notes.

- **Rich Markdown Support** – Write notes in Markdown format and preview them live.

- **Organized Notes** – Recently modified or created notes appear at the top.

- **Firebase Integration** – Secure, scalable, and real-time data storage & retrieval.

- **Auto-Saving** – Notes are automatically saved as you type.

- **Dark & Light Mode** – Toggle between themes for a personalized experience.

- **Minimal & User-Friendly UI** – Clean, intuitive interface for seamless note management.

- **Vite-Powered Performance** – Fast development and optimized production builds.
  

## Tech Stack

**Frontend** - React (Vite), React MDE, Showdown, React Split, React Toggle Dark Mode, CSS.

**Backend** - Firebase Firestore (Cloud-based NoSQL database)
  

## Installation & Setup

Before getting started, ensure Node.js and npm are installed on your system.

 1️. Clone the Repository


 ```bash
   git clone https://github.com/prerna-saraogi/markdown-notes-app.git

```

```bash
  cd markdown-notes-app
```

 2️. Install Dependencies


```bash
  npm install --legacy-peer-deps
```

3. Configure Firebase:
   
    - Create a new Firebase project via the [Firebase Console](https://console.firebase.google.com/).
      
    - Enable Firestore Database
      
    - Obtain your Firebase configuration (API Key, Auth Domain, Project ID, etc.).
      
    - Create a `.env` file in the root directory and add your Firebase credentials (refer to `.env.example`).

4. Start the Development Server

   
``` bash 
npm run dev
```


## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.


## License

[MIT](LICENSE)


