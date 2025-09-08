# Family Learning App: Project Requirements

## Table of Contents
1. [Project Summary](#project-summary)
2. [Development Checklist](#development-checklist)
   - [Core Technologies](#core-technologies)
   - [File Structure](#file-structure)
   - [Key Logic & Functionality](#key-logic--functionality)
   - [Content Generation Workflow](#content-generation-workflow)
3. [JSON Topic Template](#json-topic-template)
4. [Summary & Next Steps](#summary--next-steps)

---

## Project Summary
The Family Learning App is a private, static learning website designed for easy management and free hosting. The application is a single `index.html` file that dynamically renders content using JavaScript. All learning materials—subjects, topics, and tests—are stored as JSON files alongside the site.

- **Content Management:** New content is generated locally using the Gemini API and uploaded to the hosting provider. The site updates automatically.
- **User Progress:** Progress is saved on the user's device (localStorage). Test results can be saved or shared.

---

## Development Checklist

### Core Technologies
- **Front-End:** Single `index.html` (HTML, CSS, JavaScript)
- **Data Storage:** JSON files for all subjects, topics, and tests
- **Progress & Results:** Browser `localStorage`
- **Hosting:** Free static hosting (e.g., Netlify)
- **Content Generation:** Script/tool using Gemini API to generate JSON files

### File Structure
Organize your project as follows:

```
/
├── index.html              # The single-page app
├── data/
│   └── subjects/
│       ├── history/
│       │   ├── world_war_2.json
│       │   └── ancient_greece.json
│       └── science/
│           ├── solar_system.json
│           └── rock_cycle.json
└── ...
```

### Key Logic & Functionality
- **Loading Content:**
  - Hardcode subject folder names in JS (e.g., `const subjects = ['history', 'science'];`).
  - Use `fetch()` to load topic files from each subject folder.
- **Dynamic UI:**
  - On subject selection, fetch and render topic JSON files dynamically (no page refresh).
- **Subject & Topic Listing:** Users first select a subject, then a topic. Confirmation is required before starting a topic.
- **Randomized Question Order:** When a topic is started, questions are presented one at a time in random order.
- **Quiz Summary:** After all questions, a summary score is shown with options to share or save the score summary.
- **Question Types:**
  - Support `multiple-choice` and `numerical-input` questions (see [JSON Topic Template](#json-topic-template)).
  - Render buttons for multiple-choice; number input for numerical-input.
- **Progress Tracking:**
  - Use `localStorage` for persistent progress per device.
- **Save/Share Results:**
  - **Save:** Download results as a JSON file (Blob).
  - **Share:** Use Web Share API for sharing score summaries.
- **UI Blocking:** After an answer is chosen, the UI is blocked until the next question is shown.
- **Score Summary:** At the end, a beautiful score summary is shown with a detailed table of all questions, answers, and results.
- **Filtering:** Users can filter the summary to show all, only correct, or only incorrect answers.
- **Save/Share:**
  - 'Save Result (JSON)' downloads the session as a JSON file.
  - 'Save Score as JPG' downloads the score summary as an image (JPG).

### Content Generation Workflow
1. Use a script (CLI) with your Gemini API key.
2. Input learning content, generate a new JSON file (see template below).
3. Upload the new JSON to `data/subjects/` in your repo.
4. Push changes; Netlify auto-deploys the updated site.

---

## JSON Topic Template
Use this schema for each topic JSON file:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/topic.schema.json",
  "title": "Topic Schema",
  "description": "Schema for a single learning topic, including learning content and questions.",
  "type": "object",
  "properties": {
    "topicTitle": { "type": "string" },
    "learningContent": { "type": "string" },
    "questions": {
      "type": "array",
      "items": {
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "questionType": { "type": "string", "const": "multiple-choice" },
              "questionText": { "type": "string" },
              "options": { "type": "array", "items": { "type": "string" }, "minItems": 2 },
              "correctAnswer": { "type": "string" }
            },
            "required": ["questionType", "questionText", "options", "correctAnswer"],
            "additionalProperties": false
          },
          {
            "type": "object",
            "properties": {
              "questionType": { "type": "string", "const": "numerical-input" },
              "questionText": { "type": "string" },
              "correctAnswer": { "type": "number" }
            },
            "required": ["questionType", "questionText", "correctAnswer"],
            "additionalProperties": false
          }
        ]
      },
      "minItems": 1
    }
  },
  "required": ["topicTitle", "learningContent", "questions"],
  "additionalProperties": false
}
```

---
````
