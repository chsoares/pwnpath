# PwnPath — Lesson Review Guide

This document defines the review process for PwnPath lessons. Use it whenever auditing, creating, or revising challenge content.

## Core Philosophy

> **PwnPath teaches concepts. HTB challenges are labs to practice them.**

The primary purpose of each lesson page is the **fundamentals section** — a standalone tutorial on a technique or concept. The Sherlock/challenge is a hands-on lab where the student applies what they just learned. The lesson is NOT a Sherlock walkthrough guide with some theory prepended.

### What This Means in Practice

- The fundamentals section should teach the concept thoroughly enough that a reader who never does the HTB challenge still learns the technique.
- The hints and solution sections guide the student through the specific challenge, applying the concepts taught in fundamentals.
- Every Wireshark filter, tool, or technique mentioned in the walkthrough should first be taught in the fundamentals section.

## Common Problems Found in Reviews

### 1. Hallucinated Challenge Details

**Problem:** Challenge answers, IPs, credentials, filenames, or CVEs were invented rather than verified from writeups.

**Examples found:**
- Origins: password written as `ftprocks69` when the real answer is `ftprocks69$`
- Origins: walkthrough described SSH traffic and SMTP traffic that don't exist in the PCAP
- Telly: final walkthrough step was fabricated ("reconstruct the full attack chain" is not a real question)

**Fix:** Every specific detail in hints and walkthrough MUST come from a verified writeup. Cross-reference at least 2 independent sources. If a writeup is not available, mark the lesson as needing verification.

### 2. Walkthrough Steps Don't Match Real Questions

**Problem:** The walkthrough covers some challenge questions but misses others, or adds fabricated steps that aren't actual challenge tasks.

**Examples found:**
- Origins: 9 real questions, but walkthrough only covered 4 and fabricated 3 others
- Telly: real questions about hostname, timestamps, Tripwire, and database records were omitted; a "reconstruct the attack chain" step was invented

**Fix:** The walkthrough steps should map to the actual challenge questions. Each step should correspond to a real task. Don't add filler steps like "reconstruct the full attack timeline" unless the challenge actually asks for that.

### 3. Vague Walkthrough Steps

**Problem:** Steps say things like "Look for cloud storage URLs" or "Examine email-related traffic" without specifying exactly what to do or what the answer is.

**Fix:** Every walkthrough step must include:
- The exact Wireshark filter or tool command to run
- What to look for in the output
- The specific answer on its own line (format: `\n\n**Answer:** \`value\``)

### 4. Fundamentals Don't Cover What the Challenge Requires

**Problem:** The fundamentals section teaches concepts that the challenge doesn't test, while missing concepts the challenge actually requires.

**Examples found:**
- Origins: taught "SSH as a Pivot" (credential reuse across services) but the challenge has no SSH traffic — SSH password is found inside an extracted PDF
- Origins: didn't teach Follow TCP Stream or Export Objects, which are the two main techniques needed

**Fix:** Before writing fundamentals, list all techniques the challenge requires (from writeups). Then ensure fundamentals covers each one. Don't teach concepts that aren't exercised in the challenge.

### 5. Wrong Answer Format

**Problem:** Answers were embedded inline within explanation text, making them hard to find.

**Fix:** Put answers on their own line at the end of the explanation:
```
The attacker's IP is visible in the failed login responses...

**Answer:** `15.206.185.207`
```

Not:
```
...the attacker's IP is `15.206.185.207`. **Answer: `15.206.185.207`**
```

## Review Checklist

### Before Writing/Revising a Lesson

1. [ ] Find at least 2 independent writeups for the challenge
2. [ ] Extract ALL questions (exact text if possible) and ALL answers
3. [ ] List every tool/technique the challenge requires
4. [ ] Note the exact attack chain and artifacts involved

### Fundamentals Section

5. [ ] Teaches the concept as a standalone tutorial (not just challenge context)
6. [ ] Covers every technique needed to solve the challenge (Follow TCP Stream, Export Objects, specific filters, etc.)
7. [ ] Does NOT teach irrelevant concepts that the challenge doesn't exercise
8. [ ] Connects to the previous lesson ("In the previous lesson you learned X, now we'll learn Y")
9. [ ] Tool references list all commands/filters used in the walkthrough

### Hints Section

10. [ ] 5-6 progressive hints, from vaguest to most specific
11. [ ] First hint points to the right protocol/filter to start with
12. [ ] Last hint nearly gives away the methodology for the hardest question
13. [ ] No hint contains fabricated information
14. [ ] Hints reference techniques taught in fundamentals

### Solution/Walkthrough Section

15. [ ] Every step maps to a real challenge question
16. [ ] No fabricated steps (no "reconstruct the attack chain" unless it's a real question)
17. [ ] Every step has a concrete command (Wireshark filter, CLI command, tool invocation)
18. [ ] Every step has a specific answer on its own line (`**Answer:** \`value\``)
19. [ ] Answers are verified against writeups (correct values, correct spelling, correct special characters)
20. [ ] The explanation connects back to fundamentals ("This is the Follow TCP Stream technique we covered above")
21. [ ] Steps are in logical order (matching how you'd actually solve the challenge)

### Cross-References

22. [ ] `keyTakeaway` accurately reflects what the lesson teaches
23. [ ] `tags` include all relevant techniques and tools
24. [ ] `navigation` prev/next links are correct
25. [ ] Challenge exists on HTB (URL is valid)

## Research Sources

### Primary Sources (in order of reliability)

1. **HTB Official Writeup PDF** — Available on the challenge page itself after solving. Most didactic and accurate. Always check here first.
2. **0xdf.gitlab.io** — Extremely detailed, methodical writeups
3. **ByteBerzerker** — Good coverage of recent Sherlocks
4. **Medium writeups** — Variable quality; cross-reference with other sources
5. **GitHub writeup repos** — Often have raw answers without methodology

### How to Search

```
"hackthebox sherlock <name> writeup"
"htb <name> sherlock walkthrough"
"htb sherlock <name> all questions answers"
site:0xdf.gitlab.io <name>
site:byteberzerker.com <name>
```

### Verification Rules

- Every IP address, credential, filename, CVE, hash, and timestamp must appear in at least 2 independent sources
- If only 1 source exists, mark the lesson with a comment noting limited verification
- If 0 sources exist, do NOT include the challenge until writeups become available
- Pay attention to exact characters: trailing `$`, case sensitivity, special characters in passwords

## Lesson Structure Reference

See `content/binary-exploitation/challenges/getting-started.json` for an exemplary lesson that follows all guidelines:
- Fundamentals teach buffer overflows as a standalone concept with stack diagrams, code examples, and tool introductions
- Every technique used in the walkthrough (checksec, pwntools, Ghidra) is first taught in fundamentals
- Solution steps map exactly to what the challenge requires
- Answers are concrete and verifiable
