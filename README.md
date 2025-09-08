# Family Learning App

A static, single-page learning site. Content is stored as JSON alongside the site. Progress is saved per-device via localStorage.

## Quickstart

- Open `index.html` in a browser (no server required).
- Choose a subject and topic to start learning.
- Answers and scores are saved automatically to your browser.

## Project Structure

- `index.html` — SPA UI and logic
- `data/subjects/<subject>/<topic>.json` — Content files
- `scripts/generate_topic.js` — CLI skeleton to create topic JSON

## Add Content

1. Create a new JSON file under `data/subjects/<subject>/` following the template in `requirement.md`.
2. Or generate a stub via:

```bash
node scripts/generate_topic.js --subject history --title "Ancient Rome"
```

## Save/Share Results

- Use the Save button to download results as JSON.
- Use the Share button (Web Share API) to share a text summary if supported.

## Run Locally with Python

You can serve the app locally using Python's built-in HTTP server:

### Python 3.x

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

This ensures all fetch requests to JSON files work correctly.

## Deploy to Netlify

1. Create a new site from Git in Netlify and select this repository.
2. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
3. Deploy. Netlify will serve `index.html` and your `/data` files as static assets.

To update content, push new JSON files to `data/subjects/...`; Netlify will auto-deploy the changes.