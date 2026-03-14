# PwnPath — Project Instructions

## What is PwnPath?
A static web application that curates HackTheBox challenges/Sherlocks into progressive learning trails organized by topic. Built with Next.js 15 (static export), Tailwind CSS 4, TypeScript.

## Categories (7 total)
1. **Network Forensics (PCAP)** — Wireshark, tshark, traffic analysis
2. **Memory Forensics** — Volatility, process analysis, memory artifacts
3. **Disk & Filesystem Forensics** — Autopsy, FTK, registry, event logs
4. **Log Analysis & SIEM** — ELK, Splunk, log correlation, detection rules
5. **Malware Analysis** — Static/dynamic analysis, behavioral analysis
6. **Reverse Engineering** — Ghidra, IDA, decompilation, assembly
7. **Binary Exploitation** — Buffer overflow, ROP, heap, pwntools

## Project Structure
- `content/` — All learning content as JSON files (read at build time)
- `src/app/` — Next.js App Router pages
- `src/components/` — React components
- `src/lib/` — Types, content loading, progress helpers

## Key Rules
1. **Static export only** — `output: "export"` in next.config.ts. No server-side features.
2. **Content in JSON** — All challenge content lives in `content/`. Markdown is stored as strings in JSON, rendered by `react-markdown`.
3. **`generateStaticParams()`** — All dynamic routes must define this for static generation.
4. **Client components** — Only use `"use client"` for components needing browser APIs (localStorage, useState). Keep data loading server-side.
5. **No auth** — Progress tracking uses `localStorage` via `src/lib/progress.ts`.

## Content Creation Pipeline (MANDATORY)

**CRITICAL: Every lesson MUST be grounded in real, verified HTB challenge data. NEVER invent or guess challenge mechanics, vulnerability types, flags, or solutions.**

The pipeline for creating or revising lessons is strictly sequential:

### Step 1: Research
- Search the internet for HTB challenges/Sherlocks in the target category
- Collect challenge names, difficulty ratings, and URLs
- Identify which techniques/concepts each challenge teaches

### Step 2: Read Writeups
- For EVERY candidate challenge, find and read **at least 2 independent public writeups**
- Extract: the actual vulnerability/technique, exact exploit steps, tools used, answers to HTB questions
- Note the real binary behavior (what it does, what functions exist, what protections are enabled)
- **If you cannot find writeups, you cannot include the challenge**

### Step 3: Select and Order
- Select challenges based on concept diversity, difficulty spread, and pedagogical value
- Order them so each lesson introduces exactly one new concept/technique
- Verify the progression makes sense (prerequisites build on each other)

### Step 4: Create Lessons
- The `fundamentals` section teaches the **concept/technique** (e.g., "what is a format string vulnerability")
- The `solution` section applies that concept to the **specific HTB challenge**
- Solution steps must match what the challenge ACTUALLY requires (verified from writeups)
- **The lesson teaches a topic; the challenge is the lab to practice it — not the other way around**

### Anti-Hallucination Rules
- **NEVER guess** what a challenge does based on its name alone
- **NEVER invent** function names, addresses, vulnerability types, or exploit steps
- **NEVER assume** a challenge is ret2win, format string, heap, etc. without writeup verification
- If unsure about a detail, search for it or mark it as needing verification
- Cross-reference challenge mechanics against at least 2 independent sources

## Content Volume & Quality Standards

### Minimum challenge counts per category
- **General topics** (PCAP, memory, disk, logs): **minimum 10 challenges**, ideally 15+
- **Deep topics** (binary exploitation, web security): **15-20+ challenges**
- **Niche topics** with limited material: 5 is acceptable only if fewer exist

### Research-to-selection ratio
When populating a category, **research at least 50-100% more candidates** than the final selection. For a target of 10 challenges, research 15-20 candidates, then pick the most didactic ones based on:
- Concept diversity (don't repeat the same technique)
- Good difficulty spread (easy → medium → hard)
- Quality of available writeups (need enough detail for walkthroughs)
- Pedagogical value (does it teach a transferable skill?)

### Solution walkthrough standards
Solutions must be **real walkthroughs**, not expanded hints. Each must include:
- The exact questions/tasks asked by HTB
- The specific answers and how to find them
- Precise tool commands and usage at each step
- Explanation of WHY each step works (educational value)
- Content sourced from verified public writeups (never invented)

### Validation requirements
- **Every challenge must be verified** to exist on HTB before inclusion
- Cross-reference against at least 2 independent writeup sources
- HTB URLs must be valid
- Never invent or guess challenge names, answers, or details

## Content Schema
- `content/categories.json` — Master index of all categories
- `content/<category>/category.json` — Category detail (overview, tools, prerequisites)
- `content/<category>/path.json` — Ordered challenge list
- `content/<category>/cheatsheet.json` — Command reference
- `content/<category>/challenges/<slug>.json` — Individual challenge lessons

## Adding a New Category
1. Create directory `content/<category-id>/`
2. Add `category.json`, `path.json`, `cheatsheet.json`
3. Add challenge files in `challenges/`
4. Update `categories.json` — set `status: "available"`, update `challengeCount`
5. Run `pnpm build` to verify

## Adding a New Challenge
1. Create `content/<category>/challenges/<challenge-id>.json` following the ChallengeLesson schema in `src/lib/types.ts`
2. Add entry to `path.json` with correct position
3. Update `navigation` fields in adjacent challenges (prev/next links)
4. Update `challengeCount` in `categories.json`

## Commands
- `pnpm dev` — Development server
- `pnpm build` — Static export to `out/`
- `pnpm lint` — ESLint
