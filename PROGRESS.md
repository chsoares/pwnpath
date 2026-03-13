# PwnPath — Progress Tracker

## Phase 1: PCAP Trail Content
- [x] Scaffold project (Next.js 15, Tailwind 4, TypeScript)
- [x] Content directory structure
- [x] Initial 5 validated challenges with real walkthroughs (Noxious, Meerkat, Litter, Compromised, Knock Knock)
- [x] Category overview and cheatsheet
- [ ] Research 15-20 PCAP-related HTB Sherlocks/Challenges as candidates
- [ ] Select best 10+ for the trail (pedagogical ordering, concept diversity)
- [ ] Write detailed lessons for new challenges from public writeups
- [ ] Human review: accuracy, quality, lesson structure

## Phase 2: Frontend UI/UX
- [x] TypeScript types matching content JSON
- [x] Data loading layer (content.ts)
- [x] Category Dashboard (homepage) with ComingSoon overlays
- [x] Learning Path View (PathTrail component)
- [x] Lesson Page (Fundamentals + Spoiler hints/solution + markdown)
- [x] Cheatsheet pages
- [x] Progress tracking (localStorage)
- [x] Navigation (prev/next, breadcrumbs)
- [ ] Human review: UI, navigation, spoiler behavior

## Phase 3: Full Content Rollout
- [ ] Memory Forensics category (target: 10+ challenges)
- [ ] Disk & Filesystem Forensics category (target: 10+ challenges)
- [ ] Log Analysis & SIEM category (target: 10+ challenges)
- [ ] Malware Analysis category (target: 10+ challenges)
- [ ] Incident Response category (target: 10+ challenges)
- [ ] Remove ComingSoon overlays as categories are populated
- [ ] Final build + deploy

## Tech Stack
| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router, static export) |
| Styling | Tailwind CSS 4 |
| Content | JSON in `content/` |
| Progress | localStorage |
| Package mgr | pnpm |
