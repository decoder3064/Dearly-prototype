# Dearly — Slow Correspondence

> *"Where anticipation meets connection—savor the journey of thoughtful, unhurried letters."*

## What is Dearly?

Dearly is a **slow-tech letter app** — a deliberate counter to the instant-messaging culture of today. Instead of real-time replies, Dearly simulates the experience of sending and receiving physical letters: messages are composed thoughtfully, dispatched, tracked "in transit," and revealed only upon arrival.

The core philosophy is that the **wait is the feature**. Anticipation deepens connection. Choosing your words carefully — knowing they won't arrive instantly — encourages more meaningful communication.

This project is an HCI (Human-Computer Interaction) design prototype built as a React + TypeScript web app, originally designed in Figma, and then implemented by myself.

---

## Core Features

| Feature | Description |
|---|---|
| **Welcome Screen** | Animated intro with a handwriting effect and a wax-seal logo |
| **Dashboard** | Overview of all correspondents and letter groups |
| **Write a Letter** | Compose a letter to an individual correspondent |
| **Groups** | Create groups and send letters to multiple people at once |
| **In Transit** | Track letters currently "traveling" to their recipients |
| **Pending Arrivals** | Letters that have arrived and are waiting to be opened |
| **Letter Reveal** | A ceremonious, animated experience for opening a received letter |
| **Tracking Details** | Detailed delivery status for individual letters |
| **Correspondent View** | See the full history of letters with a specific person |
| **Settings** | App preferences and configuration |

---

## Design Philosophy

Dearly is built around **slow tech** principles:

- **Intentionality** — Writing a letter takes effort; that effort signals care.
- **Anticipation** — Delayed delivery creates emotional investment in both sender and receiver.
- **Intimacy** — Designed for 1-to-1 or small-group correspondence, not broadcasts.
- **Presence** — The app encourages you to slow down, not optimize.

---

## Tech Stack

- **React** + **TypeScript** (via Vite)
- **Tailwind CSS** for styling
- **Motion (Framer Motion)** for animations
- **shadcn/ui** component primitives
- **Lucide React** for icons

---

## Running the App

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Project Context

This is a design prototype created as part of an HCI project exploring slow technology and intentional digital communication. The app uses mock data throughout — no backend or real mail delivery exists. The focus is entirely on the UX and interaction design of a slow-correspondence experience.
