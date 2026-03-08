# Xenith 2026 Website

## ⚠️ Before You Start Coding — Always Pull First!

Before touching any code, sync your local repo with the latest changes from main:
```bash
git checkout main
git pull origin main
git checkout feature/<your-page>
git merge main
```

Skipping this step causes merge conflicts. Always do this at the start of every coding session.

---

## Getting Started
Follow these steps to run the project locally:

### Clone the repository
```bash
git clone https://github.com/khushimittal20/xenith-26.git
cd xenith-26
npm install
npm run dev
```

### Create Branch
```bash
git checkout -b feature/<your-page>
# example: git checkout -b feature/events
```

---

## Folder Structure
- `src/pages/` — one folder per page e.g. `Events/Events.jsx` + `Events.css`
- `src/components/` — shared reusable components
- `src/layout/` — MainLayout wrapper
- `src/router.jsx` — add your route here after creating your page
- `public/` — static assets (images, frames)

### Adding a New Page
1. Create `src/pages/YourPage/YourPage.jsx` and `YourPage.css`
2. Export a default component
3. Add your route in `src/router.jsx`

---

## Contribution Rules
1. Never push directly to main. Always create a feature branch.
2. Work only in your assigned page folder.
3. Use `index.css` for global fonts, colors, and resets. Page-specific styling goes in your page's CSS.
4. Reusable components (buttons, cards, sliders) go in `components/`.
5. Open a Pull Request (PR) to merge your branch into main.
6. After merging, always pull latest changes from main before starting new work.

---

## Commit Changes
```bash
git add .
git commit -m "Describe your changes"
git push origin feature/<your-page>
```

---

## Full Workflow for a Developer

**1. Sync with main before starting**
```bash
git checkout main
git pull origin main
git checkout feature/<your-page>
git merge main
```

**2. Stage and commit changes**
```bash
git add .
git commit -m "describe"
```

**3. Push your feature branch**
```bash
git push -u origin feature/<your-page>
```

**4. Open a Pull Request on GitHub**
- Go to the repository on GitHub
- Click **Compare & pull request** for `feature/yourpage`
- Set base branch = `main`, compare branch = `feature/yourpage`
- Add a title + description
- Click **Create Pull Request**
