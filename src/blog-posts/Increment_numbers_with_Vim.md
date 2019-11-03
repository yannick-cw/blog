---
title: 'Increment numbers in Vim'
date: '2019-09-18'
tags: ['vim']
description: ''
---

Today I learned about a great command to increase numbers in Vim!

### How to go from here:
```vim
0
0
0
0
0
0
0
```
### To here:

```vim
1
2
3
4
5
6
7
```

![gif increment](./inc_num.gif)

1. `vG` to select to the bottom
2. `g<C-A>` to increment each number by one

Find help about it with `:h v_g_^x`.
