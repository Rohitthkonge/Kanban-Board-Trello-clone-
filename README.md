# Kanban Board

A Trello-style task board built with vanilla JavaScript, using the native HTML5 Drag and Drop API — no external libraries.

## Features
- Three columns: To Do, In Progress, Done
- Add cards with a title and optional description via modal
- Drag and drop cards between columns to update their status
- Delete individual cards
- Live card count per column
- Data persists in the browser via `localStorage`
- Responsive layout (columns stack vertically on mobile)

## Tech Stack
- HTML5 (native Drag and Drop API)
- CSS3 (Flexbox, no framework)
- Vanilla JavaScript (ES6+)

## Project Structure
```
kanban-board/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run
1. Clone or download this folder
2. Open `index.html` in any modern browser — no build step or server required

## What I Learned / Demonstrates
- Native HTML5 Drag and Drop API (dragstart, dragover, drop events)
- Managing complex UI state without a framework
- Modal dialog handling and form validation
- Persisting structured data with `localStorage`


