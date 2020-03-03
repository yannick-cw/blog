---
title: 'Vim: Substitute across all files'
date: '2019-11-14'
tags: ['vim']
description: 'Substitute across all files in a project in Vim'
---

Let's say you want to do a refactoring in your Scala project and replace all occurrences of `new LocalDate(2020, 10, 1)` with `DateTime(2020, 10, 1)`.

1. Search for what you want to match in your local file to try to find the right query
   - `/\vnew LocalDate\((.{-})\)` `\v` activates regex search as you would expect it, we capture the exact date in a capture group and `.{-}` makes the `.` match non-greedy compared to `.*` which would not stop at the first `)`
2. Find all files containing `new LocalDate(...)`
   - `:vimgrep // **/*.scala` find all occurrences in files which match the `//` last executed search and writes these into the quickfix list. `**/*.scala` matches all `.scala` files, regardless where in the project.
   - Alternatively with fzf vim: `:Rg pattern` and then `alt - a` or `Tab` and `Shift - Tab` to select wanted matches, `Enter` to send to quickfix list.
3. Run the replacing over all files
   - `:cfdo %s//DateTime(\1)/gc` applies the substitute command to each item in the quickfix list. `%s` starts the substitute command, `//` again is the last used search and `DateTime(\1)` is the replacement, where `\1` is the first capture group, so e.g. `2020, 10, 1`. `/gc` says we want to apply it to each occurrences in a line and `c` lets you view and accept the replacement, it can be left out. It can be useful to chain a `update` with `:cfdo %s//DateTime(\1)/gc | update`, which ensures all changed files are saved.

#### Bonus: run a normal mode command across multiple files

Sometimes you want to do some refactoring to many files, so you record a macro `qq` in the current file, and want to apply that to other files as well:

1. Record the macro once in the current file and afterwards undo all the changes
2. Add all files you want to apply the macro to the args list
   - `argadd ./src/stuff/*.md`
   - Or with fzf vim: `:GFiles` and then `Tab` and `Shift + Tab` select wanted files and hit `Ctrl - l` (custom function see **) to add to args list. 
3. Check that the args list is correct
   - `args`
4. Apply the macro to all files
   - `argdo normal @q | update`

** 
```
" Populates the args list with file search results from fzf
func s:fnameescape(key, val)
  return fnameescape(a:val)
endfunc

function! s:populate_arg_list(lines)
  execute 'args ' . join(map(a:lines, function('s:fnameescape')), ' ') 
endfunction

let g:fzf_action = { 'ctrl-l': function('s:populate_arg_list') }
```
