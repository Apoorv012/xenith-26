# Xenith 2026 Website

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
example: git checkout -b feature/home
git status
it should show something like this
On branch feature/events
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

```
### Commit changes
```bash
git add .
git commit -m "Describe your changes"
git push origin feature/<your-page>
```
---
## Contribution Rules
1) Never push directly to main. Always create a feature branch.
2) Work only in your assigned page folder.
3) Use index.css for global fonts, colors, and resets. Page-specific styling goes in your page’s CSS.
4) Reusable components (buttons, cards, sliders) go in components/.
5) Open a Pull Request (PR) to merge your branch into main.
6) After merging, always pull latest changes from main before starting new work:
   ```bash
   git checkout main
   git pull origin main
   git checkout feature/<your-page>
   git merge main
   ```

---
## Workflow for a Developer
1) Make sure branch is up-to-date with main
Before pushing, always sync with main to avoid conflicts:
```bash
# Switch to main branch
git checkout main

# Pull latest changes from remote
git pull origin main

# Switch back to feature branch
git checkout feature/events

# Merge latest main into your branch
git merge main
```
2) Stage and commit the changes
   ```bash
   git add .
   git commit -m "describe"
   ```
3) Push the feature branch to GitHub
   ```bash
   git push -u origin feature/events
   ```
4) Open a Pull Request (PR) on GitHub
   Go to the repository on GitHub, Click Compare & pull request for feature/yourpage, Set the base branch = main, compare branch = feature/yourpage, Add a title + description, Click Create Pull Request


