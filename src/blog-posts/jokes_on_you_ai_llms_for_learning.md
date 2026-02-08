---
title: 'Jokes on you AI: Turning the Tables - LLMs for Learning'
date: '2026-02-08'
tags: ['ai', 'claude', 'learning', 'productivity']
description: 'Flip the script: let AI write the plan, I code, and the LLM sorts through my mess. A personalized approach to technical learning with Claude Code.'
---

Know that feeling of one too many times writing out each detail of the spec, going through multiple iterations in planning mode, long back and forth discussions, then the dreadful wait while the AI wheels are spinning, just to be served a bunch of code that gets some parts right, some parts wrong and the loop starts again?

Well time to flip the script, let AI write the plan, you code, and the LLM sorts through the mess 😀.

The purpose of using AI here is empowering us as humans, not taking anything away, but **staying in control and enhancing our capabilities**.

## AI for Learning – Actually Great

So far, learning a new technology for me has been either self-driven (random tutorials, documentation, generic online courses) or finding an expert willing to mentor me 1-on-1. The first approach is fine, but sometimes a bit slow or unfocused. The second is the best way to learn, but rare and expensive.

AI fills this gap. I can now create a curriculum that fits MY specific learning goal. Not "Learn Haskell" but "Learn OAuth2 security patterns while building a GitHub notification agent." Not a generic course, but **a project tailored to the gaps I actually want to close**. All that wrapped into a fun, challenging project.

On top of that I get an interactive tutor alongside. For any language I want, for any technology I want. I ask questions, submit my code for review, get hints when stuck. All personalized to where I am in the curriculum.

One caveat though: I am relying on the AI to be correct as a teacher. For broad, well-documented topics or common language patterns, this works well. These are areas where LLMs have seen a ton of training data and get things right. For very niche or cutting-edge topics, I cross-check with official documentation. In practice, the quality has been solid for the kind of foundational skills I've been learning.

I have used this on multiple projects, even adapting at times to a 10-minute-a-day Kata approach, and it has been quite fun and amazing.

## How to Set Up a Learning Project

I built a Claude Code skill called `creating-learning-project` that turns a vague "I want to learn X" into a concrete curriculum with project setup and tutor instructions.

The skill follows 4 steps:

```
1. Brainstorm Direction    What do you want to learn? Interactive questions
        │
        ▼
2. Scope It                What's new vs what you already know?
        │
        ▼
3. Design Curriculum       Phases, exercises, solutions
        │
        ▼
4. Set Up Project          Folder, CLAUDE.md, config files
```

### The Interactive Flow

Here's what the brainstorming looks like in Claude Code. The skill asks one question at a time, gives a recommendation, and I decide:

```
> /creating-learning-project

What area are you interested in learning?

> I want to understand OAuth2 and security patterns better, at the same time I want to work more with mastra/agents

Nice. What's your current experience with auth?
  A) I've used API keys and tokens but never implemented OAuth myself
  B) I've done basic OAuth but want to go deeper
  C) Starting from scratch

> A

What kind of project would make this useful AND educational?
  A) GitHub notification agent - OAuth2 flow + API integration + agent workflows
  B) OAuth provider from scratch - deep security focus but less practical
  C) Multi-service auth gateway - broad but complex

I'd go with A. You get to implement the full authorization code flow,
work with a real API, and build something you'd actually use.

> A

What language do you want to build this in?
  A) TypeScript / Node.js
  B) Python
  C) Go

> A

So the curriculum would focus on:
  - OAuth2 authorization code flow (the main learning target)
  - Secure token storage patterns
  - GitHub API integration
  - Building an agent workflow on top

Things like basic TypeScript and API calls I'll keep light since
you're already familiar. Sound good?

> Yes, let's go with that!
```

After this brainstorming, the skill designs the full curriculum and sets up the project folder.

### The Curriculum

Here's what the curriculum looks like, using an example gh-notify project:

```markdown
# GitHub Notification Agent Curriculum

> **Goal:** Build an agent that triages GitHub notifications and sends relevant ones to Slack
> **Approach:** One continuous project, incremental exercises
> **End State:** Agent runs, fetches your GitHub notifications, filters out noise,
> uses LLM to decide what matters, posts to Slack

## Progress Overview

| Phase | Topic                  | Sessions |
| ----- | ---------------------- | -------- |
| 0     | TypeScript Setup       | 2-3      |
| 1     | GitHub OAuth2 Flow     | 2-3      |
| 2     | GitHub API Client      | 1-2      |
| 3     | Notification Filtering | 1-2      |
| 4     | Mastra Agent Workflow  | 2-3      |
| 5     | Slack Output           | 1        |
| 6     | Polish & Scheduling    | 1-2      |

## Learning Goals

**What's NEW (primary focus):**

- OAuth2 authorization code flow
- CSRF protection, back-channel token exchange
- Multi-step agent workflows with state passing
- Secure token storage patterns

**What you already know (won't repeat):**

- Mastra agent basics, tool creation
- Zod schemas, general TypeScript patterns
```

Each phase has exercises with a consistent structure. Here's a trimmed view of Phase 1:

```markdown
## Phase 1 - GitHub OAuth2 Flow

### Goal

Implement the OAuth2 authorization code flow to get a GitHub access token.

### Concepts

- OAuth2 authorization code flow
- State parameter and CSRF protection
- Code-to-token exchange (back-channel security)
- Secure token storage

### Exercise 1.1: Register GitHub OAuth App

1. Go to GitHub Settings > Developer Settings > OAuth Apps
2. Create a new OAuth App with callback URL http://localhost:3000/callback
3. Add credentials to your .env and update your config schema

### Exercise 1.2: Build Authorization URL

Create `src/auth/github.ts` with a function that constructs the GitHub
authorization URL with client_id, redirect_uri, scope, and state parameters.

> Stuck? See [Solution 1.2](#solution-12) at the bottom.

...

### Key Takeaway

OAuth2 authorization code flow: redirect user -> user consents ->
receive code -> exchange for token -> store securely.
```

A few things to notice:

- I always use a **Single continuous project.** Every phase builds on the previous one. I get something cool out of it in the end.
- **"Stuck?" hints with solutions at the bottom.** Just in case I get stuck, the solutions also force the AI to think things through during the setup.
- **"What's NEW" focus.** The curriculum skips what I already know and focuses on my actual gaps, as we have discussed them in the setup.

## How to Work on It

Okay so how do I actually use it? I just open it in my IDE and start coding on it, having an agent chat window open alongside. Here I often use cursor, it enables me just a nice workflow.
The agent just needs to be configured to read the `CLAUDE.md`, and it automatically plays tutor.

### The Tutoring Interaction

```
> I implemented Exercise 1.3. Can you have a look?

Let me check your implementation.

[reads src/auth/server.ts]

Nice work on the server setup. The routing for `/` and `/callback` is clean,
and you're correctly extracting code and state from the query params.

One thing: you generate the state in `buildAuthUrl` but never store it.
When the callback comes in, what do you validate against? The state needs
to live somewhere between the redirect and the callback return.

Try storing it before the redirect, then checking it matches on callback.

[later]

> I'm stuck on exercise 1.4. I keep getting a 401 when I try to use the token.

Can you show me the request you're making?

> [pastes code]

The 401 isn't from the exchange itself - that actually succeeded. The problem
is upstream. Look at your headers: you're not setting `Accept: application/json`.
Without it, GitHub returns the token as a form-encoded string. Your JSON
parsing fails silently, you end up with an empty token, and that empty token
causes the 401 on the next API call.

> That fixed it. Why does the Accept header matter here?

GitHub's OAuth endpoint supports both form-encoded and JSON responses.
Without `Accept: application/json`, you get `access_token=abc&token_type=bearer`
as a form-encoded string. With it, you get proper JSON. Most tutorials skip this
detail and it causes exactly this kind of silent failure.
```

<!-- TODO: Add GIF of real tutoring session here -->

The AI reviews MY code. It gives **hints, not solutions**. It explains **WHY, not just WHAT**. And I can ask follow-up questions any time and go in depth on a sidedrack whenever I want.
Also if I notice any discrapencies while buildig the thing, I can always **call the skill** again and adjust the whole curriculum. For exampke if I chose along the way not to write to Slack, but send me and email, no problem at all.

### The CLAUDE.md - Shaping the Tutor

This is what makes the tutoring work. Each project has a `CLAUDE.md` that shapes how the AI behaves:

```markdown
## My Role as Tutor Partner

- **Never provide solutions unprompted**
- **Review your code** - Point out what's working, suggest improvements
- **Explain concepts** - Help clarify when stuck
- **Ask guiding questions** - Help discover solutions
- **Reference the curriculum** - Keep aligned with learning objectives

## Current Progress

**Status:** Phase 1, Exercise 1.4
**Next up:** Exercise 1.5 (Secure Token Storage)
**Completed:** 0.1, 0.2, 0.3, 0.4, 0.5, 1.1, 1.2, 1.3

## Session Workflow

1. Read `curriculum.md` for current phase and exercise
2. Attempt the exercise yourself first
3. Ask me for guidance when stuck
4. Update progress in this file when exercise complete
5. Move to next exercise
```

Without this file, the agent would just solve everything for me (yes happened to me a few times, it is definelty faster than me in learnig mode 😀). **With it, it tutors.** The progress tracking also means I can pick up across sessions without losing context.

### Now AI Reads MY Slop

And with that we have turned the tables: **I write the imperfect code. The AI reads MY mess** and helps me clean it up. Feels good to give back sometimes! And the best part, so far it never got frustrated with me.

### Final bonus step: Anki - Locking It In

One more thing I do: when I've actually really got a concept, I ask the AI to create an Anki flashcard. Only when I understood it, not before. That way the card makes sense when it comes up for review later.

```
> I just finished the OAuth2 state parameter exercise.
  Can you create an Anki card for this?

Front: What is the OAuth2 state parameter and why is it important?
Back: ...
```

It actuall generates really nice looking and practical Anki cards (yes I have another skill for that).

**Understanding first, memorization second.** The card is a bookmark for knowledge I already have.

## Conclusion

This approach flips the AI relationship 🥳. Instead of me serving the AI with detailed specs so it can write code, the AI serves my learning. **I code, I struggle, I understand.** The AI writes the plan, tutors me through it, reviews my work, and helps lock it into memory.
It really feels a bit like magic sometimes.

What do **you** want to learn next?

---

<details>
<summary><strong>Full Skill File (click to expand)</strong></summary>

Save this as `~/.claude/skills/creating-learning-project/SKILL.md`:

```markdown
---
name: creating-learning-project
description: Use when user wants to start a new learning project, asks what to learn next, or needs to design a curriculum for skill development. Covers brainstorming, curriculum design, project setup, and tracking.
---

# Creating a Learning Project

## Overview

Turn vague "I want to learn X" into a concrete curriculum with project setup, tutor instructions, and progress tracking.

## When to Use

- User asks "what should I learn next?"
- User wants to start a new learning project
- User has a skill gap to close
- User finished a learning project and needs the next one

## Process

1. Brainstorm Direction (questions, not answers)
2. Scope It (what's new vs what you already know)
3. Design Curriculum (phases, exercises)
4. Set Up Project (folder, CLAUDE.md)

## Step Details

### 1. Brainstorm Direction

Key principles:

- Ask questions one at a time
- Prefer multiple choice when possible
- Lead with your recommendation and reasoning
- Explore 2-3 approaches with trade-offs

Questions to answer:

- What area are you interested in?
- What's your current experience level?
- What project direction sounds interesting?
- What makes this useful AND educational?

### 2. Scope It

Figure out what's new vs what the user already knows:

- Ask about prior experience with the relevant technologies
- Identify the primary learning targets
- Determine what can be kept light vs what needs depth

### 3. Design Curriculum

Structure:

# [Project Name] Curriculum

> **Goal:** [One sentence]
> **Approach:** One continuous project, incremental exercises
> **End State:** [What can they do when done]

## Progress Overview

| Phase | Topic | Sessions | Status |

## Learning Goals

**What's NEW (primary focus):**

- [Main learning objectives]

**What you already know (won't repeat):**

- [From previous projects]

## The End-to-End Flow

[ASCII diagram of what they're building]

## Phase N - [Topic]

### Goal

### Concepts

### Exercise N.1: [Name]

> Stuck? See [Solution N.1](#solution-n1) at the bottom.

### Key Takeaway

## Solutions

[All solutions at bottom, not inline]

### Example Phase

Use this as a reference for tone and depth when designing phases:

## Phase 1 - GitHub OAuth2 Flow

### Goal

Implement the OAuth2 authorization code flow to get a GitHub access token.

### Concepts

- OAuth2 authorization code flow (the standard for user-authorized apps)
- State parameter and CSRF protection
- Code-to-token exchange (back-channel security)
- Secure token storage

### Exercise 1.1: Register GitHub OAuth App

1. Go to GitHub Settings > Developer Settings > OAuth Apps
2. Create a new OAuth App with callback URL http://localhost:3000/callback
3. Add credentials to your .env and update your config schema

### Exercise 1.2: Build Authorization URL

Create `src/auth/github.ts` with a function that:

1. Constructs the GitHub authorization URL
2. Includes required parameters: client_id, redirect_uri, scope, state
3. State should be a random string (CSRF protection)

> Stuck? See [Solution 1.2](#solution-12) at the bottom.

### Exercise 1.3: Local Callback Server

Create a minimal HTTP server that:

1. Redirects to the GitHub auth URL at `/`
2. Handles the callback at `/callback`
3. Validates state matches what was sent

### Key Takeaway

OAuth2 authorization code flow: redirect user -> user consents ->
receive code -> exchange for token -> store securely.

### Solutions

#### Solution 1.2: Build Authorization URL

[Full working solution here so the learner can peek when stuck]

### 4. Set Up Project

Location: `~/[your-projects]/[project-name]/`

Create:

- `curriculum.md` - the curriculum
- `CLAUDE.md` - tutor partner instructions (see template below)
- `package.json` / `build.gradle.kts` - project config
- `.env.example` - environment variables
- `.gitignore` - standard ignores
- Folder structure per curriculum design

## CLAUDE.md Template

Use this template when creating `CLAUDE.md` in the new project folder:

# CLAUDE.md

## Project Context

This is a **learning project** following the curriculum in `curriculum.md`.
**Domain:** [What you're building]

## My Role as Tutor Partner

- **Never provide solutions unprompted** - give feedback on solutions and help with concepts
- **Review your code** - Point out what's working, suggest improvements, explain why
- **Explain concepts** - When stuck on understanding something, help clarify
- **Ask guiding questions** - Help discover solutions rather than handing them over
- **Reference the curriculum** - Keep aligned with learning objectives

## Current Progress

**Status: STARTING**
**Next up:** Phase 0, Exercise 0.1
**Completed:** (none yet)

## Build Commands

[Project-specific commands]

## Tech Stack

[Project-specific technologies]

## Session Workflow

1. Read `curriculum.md` for current phase and exercise
2. Attempt the exercise yourself first
3. Ask me for guidance when stuck
4. Update progress in this file when exercise complete
5. Move to next exercise

## Learning Goals (What's New)

**Primary focus:**

- [Main learning objectives]

**Already know (won't re-teach):**

- [From previous experience]

## Key Files

| File            | Purpose                       |
| --------------- | ----------------------------- |
| `curriculum.md` | Learning phases and exercises |
| `CLAUDE.md`     | Tutor partner instructions    |

## Common Mistakes

- **Skipping brainstorming** - Don't jump to curriculum design without understanding goals
- **Repeating known content** - Check what they learned in previous projects
- **No solutions section** - Always include solutions at bottom for when stuck
- **Missing CLAUDE.md** - Tutor instructions are essential for session continuity
```

</details>
