# Fuzzy Personality Quiz

A fun, interactive personality quiz that reveals your unique personality type based on your preferences. Answer 7 questions about colors, food, places, and more — then get matched to one of four personality types with a confetti celebration.

## Features

- **7-question quiz** covering colors, vacation spots, pizza, dream homes, fruits, activities, and comic book characters
- **4 personality results**: The Philosopher, The Group Leader, The Day Dreamer, The Performing Artist
- **Progress tracking** with a progress bar and step dots
- **Smooth transitions** between questions and results
- **Confetti animation** on result reveal
- **Share button** that copies your result to the clipboard

## How It Works

Each answer is mapped to a trait score across two axes:

- **Logical vs. Creative**
- **Introvert vs. Extrovert**

After all 7 questions, the dominant score on each axis determines your result:

| Logical + Introvert | Logical + Extrovert | Creative + Introvert | Creative + Extrovert |
|---|---|---|---|
| The Philosopher | The Group Leader | The Day Dreamer | The Performing Artist |

## Tech Stack

- HTML5
- CSS3 (custom properties, grid, animations)
- Vanilla JavaScript (no frameworks or dependencies)
- Google Fonts (Inter)

## Getting Started

No build step required. Just open `index.html` in a browser:

```
open index.html
```

Or serve it with any static file server:

```
npx serve .
```

## Project Structure

```
├── index.html   # Markup, questions, and result cards
├── style.css    # All styling and animations
└── script.js    # Quiz logic, scoring, confetti, and share
```
