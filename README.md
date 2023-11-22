# Emunah Memory Site

This site is built in loving memory of **Emunah**, a remarkable individual whose life and legacy continue to inspire all who knew her. The purpose of this memory site is to honor her, share her stories, and provide a space for family and friends to reflect on cherished memories.

---

## **About the Project**

This memory site is a React application developed with TypeScript and MOBX for state management. It is designed to be both interactive and visually appealing, allowing users to contribute and explore memories in a meaningful way.

### **Features**

- **Personalized Memory Pages**: Share stories, photos, and tributes dedicated to Emunah.
- **Photo Gallery**: A curated collection of images showcasing cherished moments.
- **Interactive Timeline**: A visual representation of key milestones in Emunah's life.
- **Guest Contributions**: Family and friends can add their own messages and memories.
- **Search and Filter**: Easily find specific memories or stories.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## **Tech Stack**

### **Frontend**

- **React**: Framework for building the user interface.
- **TypeScript**: Enhances code quality and maintainability with static typing.
- **MOBX**: Simplifies state management with reactive programming.
- **Tailwind CSS**: Provides utility-first styling for a modern and consistent design.

### **Backend**

- **Firebase**: Backend-as-a-Service for authentication, database, and hosting.

### **Hosting**

- Deployed using Firebase Hosting.

---

## **Installation and Setup**

### **Prerequisites**

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn package manager

### **Clone the Repository**

```bash
git clone <repository-url>
cd <repository-folder>
```

### **Install Dependencies**

```bash
npm install
# or
yarn install
```

### **Run the Development Server**

```bash
npm run dev
# or
yarn dev
```

Navigate to `http://localhost:3000` to view the application.

### **Build for Production**

```bash
npm run build
# or
yarn build
```

### **Deploy to Firebase**

Ensure Firebase CLI is installed and set up:

```bash
npm install -g firebase-tools
firebase login
firebase init
firebase deploy
```

---

## **Folder Structure**

```
src/
|-- assets             # any attached assets (i.e. images)
|-- components/        # Reusable React components
|-- services/          # site wide services
|-- stores/            # MOBX stores for state management
|-- types/             # Site level types
|-- utils/             # Utility functions
|-- views/             # Page-level components
```

---

## **Scripts**

The following scripts are defined in `package.json`:

- `dev`: Starts the development server using Vite.
- `build`: Builds the application for production.
- `serve`: Previews the production build.
- `test`: Runs tests using Vitest.
- `lint`: Lints the source code using ESLint.
- `typecheck`: Checks for TypeScript errors.
- `deploy`: Runs linting, tests, builds the app, and deploys to Firebase.


## **Acknowledgments**

This site is a labor of love created to celebrate Emunah's life. Thank you to everyone who contributed their time, stories, and support to make this possible.
