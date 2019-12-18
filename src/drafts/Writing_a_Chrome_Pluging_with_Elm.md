---
title: 'Writing a Chrome Pluging with Elm'
date: '2019-12-18'
tags: ['elm', 'plugin']
description: 'How to write a Chrome / Firefox Plugin with Elm Lang'
---

Recently I had the need to write a small browser plugin for one of my projects, the thought of that already making me feel bad thinking of needing to program in Javascript again 😱.
But then my fear turned to joy, when I realized this is a perfect opportunity to write the plugin in Elm, my favorite language for the frontend.
[Elm](https://elm-lang.org) is a beautiful language, with a similar feel to Haskell, it gives some benefits as:

- No Runtime Exceptions
- Great Performance
- Functional to its core
- Great Error Messages / Compiler
- The Elm Architecture

Check out a nice introduction here:
`youtube: https://www.youtube.com/embed/oYk8CKH7OhE`

#### Setting up the project

We will create the Elm project with [create-elm-app](https://github.com/halfzebra/create-elm-app), as it makes developing pretty comfortable and easy.

Run `create-elm-app elm-plug` and `cd elm-plug` afterwards. To verify all is working run `elm-app start` and you should see your elm app running on `http://localhost:3000`.

You should have a structure like that now:
```
elm-plug
│   README.md
│   elm.json
│   .gitignore
│
└───public
│
└───src
│
└───tests
```

Now are able to run `elm-app build`, which generates the production build for us in `build/` and `build/static/`.


#### Setup for the Plugin

Next we need to add a `manifest.json` file 

#### Enabling the Plugin

Reload with `elm-app build`


#### Using Ports to access the Plugin API

#### Mock for Dev
