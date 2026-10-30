# 🛡️ TrustVault Feedback Portal — Innotech 2026

A modern, high-tech feedback & review web portal designed specifically for the **TrustVault** Innotech project. Built with pure **HTML5, CSS3, and Vanilla JavaScript** — zero backend, zero server configuration needed. All data is persisted directly in **HTML5 LocalStorage** with realistic receipt generation, live animations, and statistics.

---

## 🚀 How to Run on Localhost

You have several easy options to run this website locally:

### Option 1: Python Built-in Server (Recommended & Fast)
If you have Python installed, open your terminal / command prompt in this directory:
```bash
python -m http.server 8000
```
Then open your browser and navigate to:
👉 **`http://localhost:8000`**

### Option 2: Node.js `npx serve` or `http-server`
If you have Node.js installed:
```bash
npx serve .
```
or
```bash
npx http-server -p 8080
```
Then open **`http://localhost:3000`** (or the port indicated in the terminal).

### Option 3: VS Code Live Server
If you use VS Code, right-click `index.html` and select **"Open with Live Server"**.

### Option 4: Direct Browser View
You can also directly double-click `index.html` in Windows File Explorer to open it in Chrome, Edge, or Firefox. `localStorage` works out of the box!

---

## ✨ Features Built for Innotech

1. **Pure Front-End (No Backend Required)**:
   - Everything runs in the browser. No databases, Express, or PHP needed.

2. **Real-Feeling Review Submission**:
   - Interactive 1–5 Star Rating with live hover preview and text evaluation tags.
   - 5 Emoji Mood Selectors: 😡 (*Needs Work*), 🙁 (*Okay*), 😐 (*Average*), 😊 (*Impressed*), 🚀 (*Mind Blown!*).
   - Quick Feedback Chips (e.g., `🔒 High Security`, `⚡ Blazing Fast`, `🎨 Sleek UI`) for 1-click text insertion.
   - Rich Review Textarea with an engaging placeholder and dynamic character counter.
   - Realistic "Submitting & Encrypting in Vault..." loader state with spinner.
   - Built-in lightweight celebratory **Confetti Canvas Burst** upon submission.
   - Verified Submission Modal with unique receipt ID (e.g., `TV-849201`).
   - Floating real-time Toast Notification.

3. **Persistent LocalStorage**:
   - Submissions are instantly stored in `localStorage` (`trustvault_reviews_innotech`).
   - Newly added reviews are immediately prepended to the live feed with a vibrant glowing "NEW REVIEW" badge.
   - Pre-seeded with 4 realistic reviews from Innotech Judges, Mentors, and peers so your demo never looks empty.

4. **Live Statistics Dashboard**:
   - Dynamically calculates **Average Rating (/5.0)**, **Total Reviews Count**, and **Positive Sentiment Rate %**.

5. **Community Feed & Interaction**:
   - Filter reviews by: **All**, **Judges & Faculty**, **5 Stars ★**, and **Constructive Feedback**.
   - Real-time search by reviewer name, role, or review text.
   - Clickable **"Helpful / Like"** button on every review card, also saved to `localStorage`.

6. **Innotech Demo Utilities**:
   - **Export Data**: Download all submitted reviews as a formatted `.json` file to present to the jury or archive.
   - **Reset Demo**: Restore default showcase reviews anytime if you want a clean slate for the next judge.

---

## 📁 File Structure

```
feedback/
├── index.html     # Semantic, accessible HTML5 layout
├── style.css      # Cyber-security dark glassmorphic styling
├── app.js         # Reactive logic, LocalStorage, Confetti & Filtering
└── README.md      # Project documentation & run guide
```

"# innotech-feedback" 
