# Contract Translator

> Upload any legal contract and get a plain-English breakdown — clause-by-clause translation, risk assessment, and legal glossary powered by GPT-4.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?logo=openai)

## What It Does

Contract Translator takes dense legal documents and makes them understandable for anyone. Upload a PDF, DOCX, or paste text directly — the AI breaks down every clause into plain English, flags potential risks, and builds a searchable glossary of legal terms.

### Features

- **File Upload** — Drag-and-drop PDF, DOCX, or TXT files
- **Text Paste** — Paste contract text directly for quick analysis
- **Clause-by-Clause Breakdown** — Each section translated independently
- **Risk Assessment** — Color-coded risk levels (low/medium/high) per clause
- **Overall Summary** — Contract type, parties involved, key concerns, recommendation
- **Legal Glossary** — Auto-extracted definitions of legal jargon with search
- **Dark Mode** — Clean, professional interface

## Quick Start

```bash
git clone https://github.com/DareDev256/contract-translator.git
cd contract-translator
cp .env.example .env.local
# Add your OpenAI API key to .env.local
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) and upload a contract.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | Full-stack React framework with App Router |
| **React 19** | UI components |
| **TypeScript 5** | Type safety |
| **Tailwind CSS 4** | Styling |
| **OpenAI GPT-4** | Contract analysis and translation |
| **pdf-parse** | PDF text extraction |
| **mammoth** | DOCX text extraction |
| **lucide-react** | Icons |

## How It Works

1. **Upload** — File is parsed server-side (PDF → text, DOCX → text)
2. **Split** — GPT-4 identifies and separates individual clauses
3. **Analyze** — Each clause is analyzed in parallel for:
   - Plain English translation
   - Risk level assessment
   - Key legal terms
4. **Summarize** — Overall contract summary generated concurrently
5. **Display** — Results rendered with expandable clause cards, risk badges, and searchable glossary

## API

### `POST /api/analyze`

**Request:** `multipart/form-data` with either:
- `file` — PDF, DOCX, or TXT file
- `text` — Raw contract text

**Response:**
```json
{
  "summary": {
    "title": "Software License Agreement",
    "contractType": "License",
    "parties": ["Licensor", "Licensee"],
    "overallRisk": "medium",
    "keyConcerns": ["Automatic renewal clause", "Broad indemnification"],
    "recommendation": "Review the auto-renewal and liability sections carefully..."
  },
  "clauses": [
    {
      "id": 1,
      "originalText": "The Licensor hereby grants...",
      "plainEnglish": "They're giving you permission to use their software...",
      "riskLevel": "low",
      "riskExplanation": "",
      "keyTerms": [{"term": "Licensor", "definition": "The company giving you the license"}]
    }
  ],
  "glossary": [
    {"term": "indemnification", "definition": "A promise to compensate for any losses or damages"}
  ]
}
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key with GPT-4 access |

## Project Structure

```
src/
├── app/
│   ├── api/analyze/route.ts    # Contract analysis API endpoint
│   ├── globals.css             # Tailwind imports + theme
│   ├── layout.tsx              # Root layout with metadata
│   └── page.tsx                # Main app page
├── components/
│   ├── upload-zone.tsx         # File upload + text paste
│   ├── contract-summary.tsx    # Summary card with risk + concerns
│   ├── clause-card.tsx         # Expandable clause with translation
│   ├── glossary.tsx            # Searchable legal term glossary
│   └── risk-badge.tsx          # Color-coded risk indicator
└── lib/
    ├── types.ts                # TypeScript interfaces
    ├── prompts.ts              # GPT-4 prompt templates
    ├── openai.ts               # OpenAI service layer
    └── parsers.ts              # PDF/DOCX/TXT file parsing
```

## Documentation

- **[API Billing Guide](docs/api-billing-guide.md)** — Managing AI API costs for team deployments, per-seat invoice behavior across providers, and cost estimation per analysis

## License

MIT
