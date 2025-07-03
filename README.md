# Image Vault

[GitHub Repository](https://github.com/LeeRoiii/Image-Vault)

Image Vault is a modern, full-stack web app for secure image storage, organization, and sharing. Built with React, TypeScript, Vite, Tailwind CSS, and Supabase, it provides a seamless experience for managing your personal image collection in the cloud.

---

## Features

- 🔐 **Authentication:** Sign up, log in, reset password (Supabase Auth)
- 🖼️ **Image Upload & Storage:** Upload images to your private vault (Supabase Storage)
- 🗂️ **Categories:** Organize images by category for easy browsing
- ⬇️ **Signed URLs:** Secure, time-limited access to private images
- 🏷️ **Details:** Add titles, descriptions, and categories to your images
- 🔎 **Infinite Scroll:** Effortless browsing with lazy loading
- ⚡ **Responsive UI:** Fast, modern interface with Tailwind CSS and Vite

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend & Auth:** Supabase (Postgres + Auth + Storage)
- **Tooling:** ESLint, Prettier, Vercel (deployment)

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/LeeRoiii/Image-Vault.git
cd Image-Vault
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add your Supabase project details:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the development server

```sh
npm run dev
```

App will be available at `http://localhost:5173`

---

## Usage

- **Sign Up or Log In:** Create an account or sign in with your credentials.
- **Upload Images:** Click the upload button to add new images.
- **Organize:** Assign images to categories, add titles and descriptions.
- **Browse:** Images load infinitely as you scroll.
- **Account Management:** Reset your password anytime from the UI.

---

## Project Structure

```
src/
  hooks/         // Custom React hooks for auth, homepage, etc.
  utils/         // TypeScript types and helpers
  supabase.ts    // Supabase client setup
  App.tsx        // Main app with routing
  index.css      // TailwindCSS styles
  ...
```

---

## Deployment

Deployed on [Vercel](https://vercel.com/).  
You can deploy your own instance by importing the repo and configuring Supabase credentials in the Vercel dashboard.

---

## Contributing

PRs, issues, and suggestions are welcome!  
Fork the repo and open a pull request to contribute.

---

## License

This project is currently unlicensed.  
Please contact the author if you wish to use or extend it beyond personal use.

---

## Author

- [LeeRoiii](https://github.com/LeeRoiii)

---