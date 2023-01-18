---
title: 'A systematic approach to organizing yourself with Obsidian'
date: '2023-01-17'
tags: ['obsidian','todo']
description: 'How I set up a system to capture, organize, prioritize and execute all the work I am doing and to ensure I don’t forget anything I need to do and to keep as few things as possible in my head'
---
In our industry, deep focus work is of major importance. For me, with limited brain capacity available, I realized early on that having as few things in my head as possible allows the most focus on the current task at hand. This is how my love for typed, functional, immutable programming, with languages like Scala or Haskell, developed (less things to reason about at any point, looking at you immutability), at the same time I was not paying enough attention organizing the rest of my work to allow me to get to this focus state often enough.

In 2021 I changed my career at commercetools from an individual contributor role to a management role and realized that managing and organizing myself first is one of the most important steps to set myself up for success.
The lessons learned and the method and setup I optimized for myself can be valuable at any point in your career though, as my main focus was to set up a system to:
- **capture, organize, prioritize and execute** all the work I am doing
- ensure I **don't forget anything** I need to do
- keep **as few things as possible** in my head
- have all the information I need for working in **one place**, no mix of items in the email inbox, unread DMs and open browser tabs that are still to be read

Starting from the core principle, **as few things as possible in my head**, my basic workflow is the following (inspired by [Getting Things Done](https://gettingthingsdone.com/getting-things-done-the-art-of-stress-free-productivity/)):
1. each morning process all of my inboxes, this can be Slack messages, emails, random thoughts I am having
2. everything that can be done in less than 2 minutes I do immediately (quick reply)
3. **everything** else goes into my todo list and the message in Slack or the email is changed to read
4. whenever I have a thought popping up during the day or have some action items coming up during a meeting they go **immediately** into my todo list
5. anything that is not on my todo list, **I do not do**, this helps keeping the list up-to-date and prioritized and I have a nice archive of done tasks afterwards
6. whenever I have a bit of time I prioritize items in the todo list or hide them until they become relevant

Some requirements that come up by that workflow are:
- the todo list needs to support prioritizing tasks
- tasks can be hidden until they are relevant
- recurring tasks need to be supported
- tasks should be more than just a text note, support multimedia, longer documents or even slides when the task is a presentation
- tasks need to be added anytime from any device without friction, so I can do it during a conversation or when I am out for a walk (actually I have been using voice recording to todo during a road bike ride in Greece when I had some random ideas popping up and even that kind of worked fine :))
- tasks need to be searchable, so I can find information later on again
- data should belong to me and be in a format that is future prove, I do not want to lose this at any point


##  [Obsidian](https://obsidian.md/)

In the past I tried tools like Evernote or Notion, but I found Obsidian to be the perfect tool for this, as it is simple to use, highly customizable, and it allows for easy organization and linking of notes. Additionally, it is based on plain text files (markdown), which makes it highly portable, and it is available for Windows, Mac, Linux, iOS and android. It also has a variety of plugins and integrations available, which can further enhance the functionality of the tool and which are essential for my setup. It is also free and all the data stays on your machines or your clouds in a format you can use without Obsidian.

### The Workflow basics

For the workflow in Obsidian some configuration and plugins are needed and the setup is described in detail further down.

#### Daily Notes

I work with daily notes, this means there is a new page everyday with all todos and notes for that day summarized in the `Today` section and all uncategorised tasks in the `Next` section. It also features a section for meeting notes for that day and an unstructured section, where I add any random ideas.
The most basic feature is adding a new task to the todo list.

Adding a new task for today is as easy as hitting `cmd+p`  and selecting `QuickAdd: Add Todo` and adding some description. New tasks always appear in the `Next` group of todos, they are unclassified, basically in the inbox. If the task is something for today you could change the `schedule` date to today and the task moves to your tasks for the day:

![img](media/daily note.gif)

#### send it to the future

If the task is not something you want to tackle today, but some day in the future, you can send it to a specific date in the future. It will only appear on that day again. If I do not know yet when to do it exactly, I often just send it to next week and re-classify it to a specific date if I know better when it should be done. Sending tasks to the future is very powerful, it could be tomorrow or even next year, it helps to keep the tasks for the day to be clear and organized:

![img](media/do_something_future.gif)

#### Block it

You can also add a due date, this will rank it higher in priority in the list.
Oftentimes a particular task can not be worked on as it waits on something else, external or internal. In that case I either send it to the future as well to a day where I expect an answer or I put it into the blocked list:

![img](media/blocked.gif)
The priority fields can also be used to order tasks in the lists.

### The more powerful stuff

#### Recurring tasks

Very often I have recurring tasks, like preparing 1:1 meetings, managing that works really well with this setup. For example if I want a daily reminder to check my email every day, this will make the task reappear every morning:

![img](media/do_every_day.gif)

#### Multimedia

Now oftentimes tasks are not just simple one liners, but need way more context or are even drawings or presentations. It is very easy to change a task into something more powerful at any time, let's say I decide I need a bit more context on the `Create Obsidian Blog Post` task, I can just change it into a new file:

![img](media/to_file.gif)

Visualizations also help me a lot to organize my thoughts, for that I use [excalidraw](https://excalidraw.com/), a great drawing tool which is supported in Obsidian:

![img](media/excali.gif)

I even create most of my presentations in obsidian itself as it is very simple and I can keep everything in one place, and I can even present them from obsidian in the browser using the [advanced slides](https://github.com/MSzturc/obsidian-advanced-slides) plugin:

![img](media/presentation.gif)

#### Link it

Basically the todo list has now become a list of markdown files, this gives me unlimited power to add all information and context I need at any time.
Obsidian is also great to create files linked to each other, making discovery in the future very easy, it creates and awesome graph showing how all of your files are connected:

![img](media/link_files.gif)


#### Collect it all

And finally I can add in tasks from many places, for example from the terminal with a simple:

```bash
todo Adding todos from cli
```

or from my phone:

![img](media/from_ios%20(2).gif)

### The detailed setup step by step

After installing obsidian on our device there are a few steps needed to configure all plugins and set up some files. I use iCloud to synchronize across devices, dropbox, the paid feature from Obsidian or Github seem to work as well.

First we need to set up an Obsidian Vault in an iCloud folder, the Vault is basically your workspace. For example if you want to separate work and private life or multiple projects they could live in different Vaults.

![img](media/Screen Shot 2023-01-17 at 07.55.58.png)

Then we need to activate some of the core plugins shipped with Obsidian, daily notes to have a daily file for each day and slides if you also want to use Obsidian for presentations.

![img](media/Screen Shot 2023-01-17 at 07.59.43.png)

Additionally we need some community plugins, Advanced Slides for themes and nice functionality, excalidraw for drawing stuff, quick add for actions to quickly add todos and most importantly, the tasks plugin to get all that fancy todo list behavior.

![img](media/Screen Shot 2023-01-17 at 08.03.02.png)

We'll need one file, which will store all the tasks, this is a file that should basically not be touched, as we view the tasks in our daily template or any other place where we query them. For that we create a file called `Todo Source.md` in our vault.
It will store all tasks and you can add an example one for getting started and seeing if the views work:
```markdown
- [ ] #t Create Obsidian Blog post
```

For the daily notes we create a template in a `Daily Template.md` file in your Vault.
This is leveraging the [tasks](https://github.com/MSzturc/obsidian-advanced-slides) plugin query language to get all tasks for Today, Next and Blocked. It fetches the tasks from the `Todo Source.md` file we just created, checking for certain conditions.
For example, blocked tasks only list tasks that are `priority is below none`, which matches the `low` priority.

````markdown
### Meeting Notes

### Unstructured Notes

# Today
```tasks
path includes Todo Source
hide backlink
due before tomorrow
not done
hide task count
no scheduled date
hide due date
priority is above low
```
```tasks
path includes Todo Source
(scheduled before tomorrow) OR ((starts before tomorrow) AND (has start date))
hide scheduled date
hide backlink
not done
hide task count
priority is above low
```

# Next
```tasks
path includes Todo Source
hide backlink
not done
no scheduled date
no start date
priority is above low
```
# Blocked
```tasks
path includes Todo Source
hide backlink
not done
priority is below none
```

````

We then activate the daily notes and link the template and create a folder `daily_notes` in our Vault.

![img](media/Screen Shot 2023-01-17 at 08.28.48.png)

For the tasks plugin we just configure how to identify tasks, in this case `- [ ] #t tagged with t, I am a task` every listing tagged with `#t` is considered a task.

![img](media/Screen Shot 2023-01-17 at 08.20.05.png)

Finally we configure quick actions to get the `QuickAdd: Add Todo` command when hitting `Cmd + p`.

![img](media/Screen Shot 2023-01-17 at 08.35.38.png)

For the capture format make sure to add a newline after the `- [ ] #t {{Value}}`, so new tasks are appended in the next line in the `Todo Source.md` file.

![img](media/Screen Shot 2023-01-17 at 08.36.34.png)

And lastly we need to enable the command:

![img](media/Screen Shot 2023-01-17 at 08.38.32.png)

If you want to have additional sections showing future tasks and summarizing your last week of tasks, that is easy to add in:
````markdown
# Future

```tasks
path includes Todo Source
hide backlink
scheduled after today
not done
hide task count
priority is above low
```

# Done Last Week

```tasks
path includes Todo Source
hide backlink
done after last friday
```
````

### Extensions
#### Cli

To be able to easily add todos from the terminal I added this snippet to my `.zshrc`:
```bash
function todo { echo "- [ ] #t $1" >> ~/Library/Mobile\ Documents/iCloud\~md\~obsidian/Documents/Example\Vault/Todo\ Source.md  }
```

This allows me to send `todo new item for list` from any place in the terminal to my todo notes.

#### iOS

On iOS the same quick actions is available in Obsidian, additionally I added an iOS shortcut to directly append text to the `Todo Source.md` file as well. This can be used with Siri, from the home screen or from sharing any webpage or anything else. The shortcut looks the following:
![img](media/Screen Shot 2023-01-17 at 08.56.52.png)

## Conclusion

Summarizing, the main idea is **everything is in one place, organized and prioritized**. With this it becomes very unlikely to forget something important, as everything lives in the todo list. Additionally it gets super easy to look back in time, I use that at the end of every week to write my weekly summary for example.
The most important learning for me was, that I do not let tasks or reminders exist in other places, for example the calendar is strictly used as a calendar and not for reminding myself. Or I do not leave emails unread after first checking them, they always are answered or transitioned into a task if action is needed.
And Obsidian just works great for all those requirements. I have it even coupled with [Anki - powerful, intelligent flashcards](https://apps.ankiweb.net/), a flashcard system, to retain knowledge over longer periods of time.
Obsidian is also under active development, just recently they released an awesome [canvas](https://obsidian.md/canvas) feature for brainstorming. And there is an endless amount of plugins, if something is missing, you can just create one yourself.

I just love being able to work on a topic without having something nagging in the back of my mind that I need to do or not forget something else.

**Get everything not needed out of the brain**.