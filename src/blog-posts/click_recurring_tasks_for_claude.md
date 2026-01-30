---
title: 'Click: Recurring Tasks for Claude'
date: '2026-01-30'
tags: ['claude', 'ai', 'productivity', 'automation']
description: 'A distributed system for AI-assisted recurring tasks across your machine, with TTL so nothing runs forever'
---

I wanted a super easy way to have Claude handle recurring organisational tasks for me, tracked across the many different places on my system. I already organize everything in Obsidian, so a distributed markdown-based approach felt natural.

So I built **Click**: define a task once in a `CLICK.md` file wherever you need it, and Claude runs it on schedule. One central registry orchestrates tasks scattered across your machine, each folder owning its own definition.

## The Architecture

```
~/.clicks.md                         ← Central registry (tracks all tasks)
     │
     ├──► ~/notes/CLICK.md           ← Categorize daily logs
     │
     ├──► ~/work/project/CLICK.md    ← Sync docs from Confluence
     │
     ├──► ~/dotfiles/CLICK.md        ← Update README from configs
     │
     └──► ~/reading/CLICK.md         ← Archive old articles
```

One registry orchestrates many tasks. Each `CLICK.md` is self-contained with absolute paths, so Claude can run everything from your home directory.

## The Registry

Lives at `~/.clicks.md`:

```markdown
# Clicks

## Active

| Path | Frequency | Last Run | TTL Expires | Status |
|------|-----------|----------|-------------|--------|
| ~/notes/CLICK.md | daily | 2026-01-30 | 2026-04-30 | ok |
| ~/work/project/CLICK.md | weekly | 2026-01-27 | 2026-03-15 | ok |
| ~/dotfiles/CLICK.md | monthly | 2026-01-01 | 2026-06-01 | ok |
```

## Local Task Files

Each folder defines what it needs in a `CLICK.md`:

```markdown
# Sync Project Docs from Confluence

**Inputs:**
- Confluence space: PROJECT

**Outputs:**
- /Users/.../work/project/docs/

**Task:**
Fetch pages from Confluence space modified after {{last_run}}.
Update corresponding local markdown files.
```

The `{{last_run}}` placeholder gets the timestamp from the registry. Each run only processes changes since then.

## Running It

Say "run clicks" and Claude checks what's due:

```bash
$ claude
╭─────────────────────────────────────────────────────────╮
│ ✻ Welcome to Claude Code!                               │
╰─────────────────────────────────────────────────────────╯

> run clicks

CLICKS RUN COMPLETE
===================

Ran 2 clicks: 2 succeeded, 0 failed

Categorize Logs: processed 5 entries
Sync from Confluence: updated 2 files
```

## TTL: Tasks That Expire

Every task has an expiration date. When it hits:

```
Click "Sync Docs" expired. Renew for 3 months, or archive?
```

No zombie automations running forever. If it's still useful, renew it.

## Session Hook

Why not run clicks automatically in the background? Because I want to approve what Claude does to my files. Automated background execution means something modifies your stuff without you knowing. With Click, nothing runs unless you explicitly say "run clicks."

A shell hook reminds you about overdue tasks when you start Claude:

```bash
$ claude
[clicks] 2 due: Categorize Logs, Sync Docs. Run 'run clicks' when ready.
```

The reminder fires once per day, not every session. The registry tracks the last reminder timestamp to avoid nagging. But execution is always manual. You decide when to run, you see what happens, you stay in control.

## Commands

| Command | What it does |
|---------|--------------|
| `run clicks` | Execute all due tasks |
| `show clicks` | Display status |
| `add click` | Create new task (interactive) |
| `renew click` | Extend TTL |
| `remove click` | Delete a task |

## Setup

1. Create skill at `~/.claude/skills/click/SKILL.md`
2. Create registry at `~/.clicks.md`
3. Add `CLICK.md` files wherever you need recurring work
4. (Optional) Add a `SessionStart` hook in `~/.claude/settings.json` for daily reminders

## Example Use Cases

- Categorize daily logs into organized notes
- Sync docs from Confluence/Notion to local
- Generate changelogs from commits
- Extract action items from meeting notes
- Update documentation from code changes
- Archive and clean up old files

The task files are just markdown. While this post shows Claude Code, any AI assistant that can read files and follow instructions could run clicks with equivalent setup.

---

<details>
<summary><strong>Full Skill File (click to expand)</strong></summary>

Save this as `~/.claude/skills/click/SKILL.md`:

```markdown
---
name: click
description: "Use when managing recurring tasks - run clicks, add click, show clicks, edit click, remove click, renew click. Orchestrates distributed CLICK.md files from central ~/.clicks.md registry."
---

# Click - Distributed Recurring Tasks

## Overview

Click manages recurring tasks across your system. Each task is defined in a local `CLICK.md` file, orchestrated from a central registry at `~/.clicks.md`.

## Commands

| Command | Description |
|---------|-------------|
| `run clicks` | Execute all due clicks |
| `run click [path]` | Run specific click regardless of schedule |
| `show clicks` | Display registry status |
| `add click` | Interactive flow to create new click |
| `edit click [path]` | Modify existing click |
| `remove click [path]` | Archive/delete a click |
| `renew click [path]` | Extend TTL for expired click |

## Central Registry (`~/.clicks.md`)

The registry tracks all clicks with metadata:

# Clicks

Last reminder: YYYY-MM-DDTHH:MM:SS

## Active

| Path | Frequency | Last Run | TTL Expires | Status |
|------|-----------|----------|-------------|--------|

## Expired

| Path | Frequency | Last Run | Expired On |
|------|-----------|----------|------------|

## Determining "Due"

| Frequency | Due if last run was... |
|-----------|------------------------|
| daily | > 24 hours ago |
| weekly | > 7 days ago |
| monthly | > 30 days ago |

Special: `Last Run: -` (never run) is always due.

## Local Click File Format (`CLICK.md`)

# [Descriptive Name]

**Context:** Brief description of workspace/project

**Inputs:**
- /absolute/path/to/source.md
- /absolute/path/to/folder/

**Outputs:**
- /absolute/path/to/destination.md
- /absolute/path/to/folder/

**Task:**
[Natural language instructions]
Read inputs for entries since {{last_run}}.
[Processing logic...]

**Requirements:**
- All paths MUST be absolute (executable from anywhere)
- `{{last_run}}` placeholder gets substituted with timestamp
- Outputs can be files OR directories
- When output is directory, read its CLAUDE.md to understand structure

## "run clicks" Flow

1. Read `~/.clicks.md`
2. Parse Active table
3. Check for expired TTLs first, ask user to renew or archive each
4. For each non-expired entry:
   - Check if due (frequency vs last run date)
   - If due: read local CLICK.md, execute task, update Last Run
   - If failed: mark status as 'failed', continue with others
5. Report summary: "Ran N clicks: X succeeded, Y failed"
6. For each failure: ask user how to proceed

## "add click" Flow

1. Ask: "Where should this click live?" (directory path)
2. Ask: "What should this task do?" (natural language)
3. Ask: "What are the inputs?" (files/folders to read)
4. Ask: "What are the outputs?" (files/folders to update)
5. Ask: "How often? (daily/weekly/monthly)"
6. Ask: "When should this expire?" (TTL date)
7. Create local CLICK.md with absolute paths
8. Add row to ~/.clicks.md Active table
9. Confirm creation

## Bootstrap

First use of click commands creates `~/.clicks.md` if it doesn't exist.

## Error Handling

When a click fails:
1. Mark status as 'failed' in registry
2. Continue with remaining clicks
3. At end of run, ask about each failure
4. User decides: retry, skip, edit, or remove
```

</details>

<details>
<summary><strong>Session Hook Script (click to expand)</strong></summary>

Save as `~/.claude/hooks/click-reminder.sh` and make executable (`chmod +x`):

```bash
#!/bin/bash
# Click reminder hook - once-daily reminder for due clicks

CLICKS_FILE="$HOME/.clicks.md"
[[ ! -f "$CLICKS_FILE" ]] && exit 0

# Check if 24h since last reminder
last=$(grep "^Last reminder:" "$CLICKS_FILE" | cut -d' ' -f3-)
[[ -z "$last" || "$last" == "-" ]] && last="1970-01-01T00:00:00"
last_ts=$(date -j -f "%Y-%m-%dT%H:%M:%S" "$last" "+%s" 2>/dev/null || echo 0)
(( $(date +%s) - last_ts < 86400 )) && exit 0

# Parse Active table, collect due clicks
due=()
now=$(date +%s)
in_active=false

while IFS= read -r line; do
  [[ "$line" == "## Active" ]] && in_active=true && continue
  [[ "$line" == "## "* ]] && in_active=false
  $in_active || continue
  [[ "$line" != "|"* || "$line" == *"Path"* || "$line" == *"---"* ]] && continue

  path=$(echo "$line" | cut -d'|' -f2 | xargs)
  freq=$(echo "$line" | cut -d'|' -f3 | xargs)
  last_run=$(echo "$line" | cut -d'|' -f4 | xargs)
  [[ -z "$path" ]] && continue

  name=$(basename "$(dirname "$path")")

  if [[ "$last_run" == "-" ]]; then
    due+=("$name (new)")
  else
    days=$(( (now - $(date -j -f "%Y-%m-%d" "$last_run" "+%s" 2>/dev/null || echo 0)) / 86400 ))
    case "$freq" in
      daily)   (( days >= 1 )) && due+=("$name") ;;
      weekly)  (( days >= 7 )) && due+=("$name") ;;
      monthly) (( days >= 30 )) && due+=("$name") ;;
    esac
  fi
done < "$CLICKS_FILE"

# Output if any due
if (( ${#due[@]} > 0 )); then
  echo "[clicks] ${#due[@]} due: $(printf '%s, ' "${due[@]}" | sed 's/, $//'). Run 'run clicks' when ready." >&2
  sed -i '' "s/^Last reminder:.*/Last reminder: $(date +%Y-%m-%dT%H:%M:%S)/" "$CLICKS_FILE"
fi
```

Then add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/click-reminder.sh"
          }
        ]
      }
    ]
  }
}
```

</details>
