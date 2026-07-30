# ModernSite - Professional Internship Portfolio Project

This repository contains the final version of the ModernSite internship project (Task 5), built exclusively with HTML5, CSS3, and Vanilla JavaScript. 

The project seamlessly integrates a multi-page professional website, a live Weather Application, and a full-featured To-Do Application into one unified experience featuring a stunning Glassmorphism UI and animated gradient backgrounds.

## Features

- **Multi-Page Architecture**: Contains 5 distinct pages (Home, About, Weather, To-Do, Contact).
- **Professional UI/UX**: Uses advanced Glassmorphism (`backdrop-filter`), CSS custom properties, Poppins Google Font, and Font Awesome iconography.
- **Dynamic Animations**: Includes an infinite animated CSS gradient background, custom JS typing animations, and Intersection Observer scroll reveals.
- **Weather Application**: Uses the OpenWeatherMap API and modern `async/await` Fetch logic to pull live data. Includes loading states and error handling.
- **To-Do Application**: Complete CRUD functionality with active/completed filters.
- **Persistent Storage**: Uses Browser `localStorage` to save both To-Do tasks and the last searched weather city.
- **Performance & SEO**: Semantic HTML, accessible ARIA labels, semantic forms, and modular JavaScript design.

## Folder Structure

```
task5/
├── index.html       - Hero Section & Typing Animation
├── about.html       - Project information
├── weather.html     - Weather App UI
├── todo.html        - To-Do App UI
├── contact.html     - Contact Form
├── css/
│   └── style.css    - Global Styles, Glassmorphism, Animations
├── js/
│   ├── main.js      - UI Logic, Dark Mode, Navbar, Animations
│   ├── weather.js   - OpenWeatherMap API logic
│   └── todo.js      - CRUD and Filtering logic
└── README.md        - Deployment Guide
```

## Setup & Configuration

1. **Weather API Key**: To use the Weather App, you must provide your own OpenWeatherMap API key.
   - Open `js/weather.js`
   - Find the constant: `const API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace the placeholder with your actual API key.

2. **Local Development**: You can open any HTML file directly in your browser (`file://`), or use a local development server like VS Code Live Server.

## Deployment Guide

This static project can be deployed easily on free, highly available platforms.

### Option 1: GitHub Pages (Recommended for Portfolio)
1. Initialize a Git repository in the `task5` folder: `git init`
2. Commit your files: `git add . && git commit -m "Initial commit"`
3. Push to a new GitHub repository.
4. Navigate to your Repository Settings > **Pages**.
5. Select the `main` branch as the source and click **Save**. Your site will be live in a few minutes.

### Option 2: Netlify
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Simply drag and drop the `task5` folder into the upload zone.
3. Your site will instantly go live with a secure HTTPS domain.

### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside the `task5` directory.
3. Follow the terminal prompts to deploy.

---
*Developed for the Senior Frontend Developer Internship Final Submission.*
