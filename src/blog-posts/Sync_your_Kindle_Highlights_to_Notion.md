---
title: 'Sync your Kindle Highlights to Notion: 📓 + 🗒
date: '2019-11-06'
tags: [kindle, notion, haskell]
description: 'Synchronize from the kindle to notion. Take your clipping highlights and have them as a Notion Page. All of them!'
---

[Notion](https://www.notion.so/) is a great general purpose note taking App and a valid alternative to Evernote. I use it for almost anything.
One thing I was unhappy with so far, was that I could not have my highlights from my Kindle on there. This would be super powerful, as you could search through all your highlights you ever took.

Amazon offers access to your highlights on there website, but unfortunately these do **only** include books you bought on amazon directly.
There are some solutions for Evernote to sync your highlights (https://the-digital-reader.com/2019/03/17/dozen-tools-managing-kindle-notes-highlights/), but they mostly focus on the few highlights available online.
And the solutions do not work for Notion.

Thats why I build a solution for Notion:

### Install

Download the [notionfy](https://github.com/yannick-cw/notionfy/releases/tag/0.1) executable and place it in your `PATH` or run it directly with `./notionfy`. Don't forget to make it executable with `chmod +x notionfy`.

On Mac you may also give it permission to run in `System Preferences -> Security & Privacy`

### Setup

1. Get the `token_v2` token from https://www.notion.so/

   - when using chrome [here](https://developers.google.com/web/tools/chrome-devtools/storage/cookies) is some info on how to read a cookie

2. Create a new, empty page and copy the id

   - e.g. `https://www.notion.so/Kindle-Highlights-5129b8f88a414b8e893469b2d95daac8`
   - take `5129b8f88a414b8e893469b2d95daac8`

3. Connect you kindle to your machine and get the path to the kindle (on Mac this is `/Volumes/Kindle`)
4. run `notionfy-exe` with:

```bash
notionfy-exe -n "notion_token" -p "parent_page_id" -k "kindle_path"
```

5. See the highlights added to notion page

This is what the highlights look like in the end:
![Highlights](./media/highlights.png)

What the script does in the end is:

1. Read your highlights from the `Clippings.txt` file
2. Check which highlights are already on your Notion Page
3. Add all new highlights

### Future Add-ons

It would be great to have this running automatically when you connect you Kindle (e.g. with Apple-script).
Even better would be, if we could sync from the Kindle without connecting to the machine, but I guess that would only work with a jailbreak.
