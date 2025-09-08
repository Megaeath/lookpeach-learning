#!/usr/bin/env node
/**
 * Skeleton CLI for generating topic JSON using Gemini API.
 * Usage: node scripts/generate_topic.js --subject history --title "Ancient Rome" --apiKey $GEMINI_API_KEY
 * This is a placeholder. Wire up real API calls and schema validation as needed.
 */

const fs = require('fs');
const path = require('path');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const [k, v] = argv[i].split('=');
    if (k.startsWith('--')) {
      const key = k.slice(2);
      args[key] = v ?? argv[++i];
    }
  }
  return args;
}

function safeFileName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') + '.json';
}

function generateStubTopic(title) {
  return {
    topicTitle: title,
    learningContent: `Placeholder content for **${title}**. Replace with generated material.`,
    questions: [
      {
        questionType: 'multiple-choice',
        questionText: 'Placeholder MCQ: pick the first option.',
        options: ['Option A', 'Option B', 'Option C'],
        correctAnswer: 'Option A'
      },
      {
        questionType: 'numerical-input',
        questionText: 'Placeholder numeric: enter 42.',
        correctAnswer: 42
      }
    ]
  };
}

function main() {
  const args = parseArgs(process.argv);
  const subject = args.subject;
  const title = args.title;
  if (!subject || !title) {
    console.error('Usage: node scripts/generate_topic.js --subject <subject> --title <title>');
    process.exit(1);
  }

  const outDir = path.join(process.cwd(), 'data', 'subjects', subject);
  fs.mkdirSync(outDir, { recursive: true });
  const fileName = safeFileName(title);
  const outPath = path.join(outDir, fileName);

  const topic = generateStubTopic(title);
  fs.writeFileSync(outPath, JSON.stringify(topic, null, 2));
  console.log(`Wrote ${outPath}`);
}

main();

