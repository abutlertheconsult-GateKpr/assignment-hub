# Assignment Hub

A Progressive Web App (PWA) for convention assignment management — lookup by name, day-by-day schedules, embedded maps, and captain contacts.

---

## 📁 File Structure

```
assignment-hub/
├── index.html       ← The full app
├── manifest.json    ← PWA install config
├── sw.js            ← Service worker (offline support)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## 🚀 Deploying to GitHub Pages (Step by Step)

### Step 1 — Create a new GitHub repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Name it: `assignment-hub`
4. Set it to **Public** *(required for free GitHub Pages)*
5. Leave everything else as default and click **Create repository**

---

### Step 2 — Upload the files

1. On your new repo page, click **uploading an existing file**
2. Drag and drop ALL of these files/folders:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - The entire `icons/` folder (both PNGs inside)
3. Scroll down, add a commit message like `Initial upload`
4. Click **Commit changes**

---

### Step 3 — Enable GitHub Pages

1. In your repo, click **Settings** (top tab)
2. In the left sidebar, click **Pages**
3. Under **Branch**, select `main` and folder `/` (root)
4. Click **Save**
5. Wait ~60 seconds, then refresh — you'll see:
   > Your site is live at `https://YOUR-USERNAME.github.io/assignment-hub/`

---

### Step 4 — Update the manifest start URL

Once you know your GitHub Pages URL, open `manifest.json` and update:

```json
"start_url": "/assignment-hub/",
"scope": "/assignment-hub/",
```

Then re-upload the updated `manifest.json` to the repo.

---

## 📲 Installing as an App

### On Android (Chrome)
1. Open your GitHub Pages URL in Chrome
2. Tap the **three-dot menu** → **Add to Home screen**
3. Tap **Install** — it appears as a full app icon

### On iPhone (Safari)
1. Open your GitHub Pages URL in Safari
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **Add to Home Screen**
4. Tap **Add** — the app icon appears on your home screen

### On Desktop (Chrome/Edge)
1. Open the URL
2. Click the **install icon** in the address bar (looks like a monitor with a down arrow)
3. Click **Install**

---

## 🔄 Updating the App

Whenever you make changes:
1. Upload the updated file(s) to the GitHub repo
2. Users will get the update automatically on their next visit
3. If someone has it installed, they may need to close and reopen the app once

---

## ✅ Features

- 🔍 Name/congregation lookup across all days
- ⇄ Last-minute name swapping
- 📋 Friday / Saturday / Sunday assignment management
- 🗺 CL (Concourse Level) and EL (Event Level) map viewer
- 👥 Captain contacts with one-tap calling
- 👤 Personal "My Assignments" card pinned at top
- 📤 Export / Import data as JSON
- 📴 Works offline after first load
