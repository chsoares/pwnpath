# PwnPath

Structured learning paths through HackTheBox challenges and Sherlocks for defensive security and digital forensics.

## What is PwnPath?

PwnPath curates HTB challenges into **progressive learning trails** organized by topic. Each trail builds skills from fundamentals to advanced topics, with structured lessons, progressive hints, and full solution walkthroughs.

**This is a static site** — no backend, no auth, no AI at runtime. Content is researched and written during development, then built into static HTML.

## Tech Stack

- **Next.js 15** (App Router, `output: "export"`) — static site generation
- **Tailwind CSS 4** — styling
- **TypeScript** — type safety
- **pnpm** — package management
- **Content**: JSON files in `content/`, rendered with `react-markdown`
- **Progress**: `localStorage` (no auth for v1)

## Development

```bash
pnpm install
pnpm dev       # Development server
pnpm build     # Static export to out/
pnpm lint      # ESLint
```

## Content Structure

```
content/
├── categories.json              # Master index
└── network-forensics/           # One dir per category
    ├── category.json            # Overview, tools, prerequisites
    ├── path.json                # Ordered challenge list
    ├── cheatsheet.json          # Command reference
    └── challenges/              # One file per challenge
        ├── noxious.json
        ├── meerkat.json
        └── ...
```

## Categories

| Category | Status | Challenges |
|----------|--------|------------|
| Network Forensics (PCAP) | Available | 5 (expanding to 10+) |
| Memory Forensics | Coming Soon | — |
| Disk & Filesystem Forensics | Coming Soon | — |
| Log Analysis & SIEM | Coming Soon | — |
| Malware Analysis | Coming Soon | — |
| Reverse Engineering | Coming Soon | — |
| Binary Exploitation | Coming Soon | — |

## License

MIT
