---
title: 'Awk Cheatsheet'
date: '2020-03-01'
tags: [awk]
description: 'Notes about using awk'
---

`awk <command> <file1> <file2> ... <filen>`

- code is enclosed in {}
- code in `{}` can be separated with `;`
- command is enclosed in ''
- run from an awk file: `-f progfile`
- built-in function https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html#Built_002din

## Printing fields by delimiter

- print the first field of each line, delimited by ,
  `awk -F',' '{print $1}' filename`

## Choosing the output delimiter

`awk -F"," -v OFS=";" '{print $2}' filename`

## Match by regex

- simple match
  `awk '/J/ {print}' filename`

- match only field against regex (compared to whole line above)
  `awk -F"," '$1 ~ /J/ {print}' filename` // or `!~` for not matching

## Boolean condition

- Prints where snd field in line is > 200
  `awk -F"," '$2>200 {print $0}' filename`

- Multiple conditions can be `&&` `||` `!`
-

## BEGIN and END

`awk 'BEGIN { print "before first line" } { print $0 } END { print "After last line" }' filename`

- Using begin and end with variables (total file size of all files > 200kb)
  `ls -l | awk 'BEGIN {sum=0} $5>200 {sum+=$5} END{print sum}'`

## Useful commands

```bash
{ print $0; }  # prints $0. In this case, equivalent to 'print' alone
{ exit; }      # ends the program
{ next; }      # skips to the next line of input
{ a=$1; b=$0 } # variable assignment
{ c[$1] = $2 } # variable assignment (array)

{ if (BOOLEAN) { ACTION }
  else if (BOOLEAN) { ACTION }
  else { ACTION }
}
{ for (i=1; i<x; i++) { ACTION } }
{ for (item in c) { ACTION } }
```
