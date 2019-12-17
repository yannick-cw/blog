---
title: 'HElm: Derive Elm Functions from Haskell Servant'
date: '2019-12-17'
tags: ['haskell', 'elm', 'servant']
description: 'How to generate Elm Functions from a Haskell Servant Api Backend'
---

Writing Decoders and Encoders in Elm is considered a bit painful by many people, especially compared to languages like Haskell or Scala, where we get them for free or languages like JavaScript, where we do not need them at all (but also get no safety at all).
Servant is a great Haskell Library to write Web APIs, that solves that problem!
One of the great advantages of the [Servant](https://www.servant.dev) library is, that you write the API on the type level like this:

```haskell
type UserAPI = "users" :> QueryParam "sortby" SortBy :> Get '[JSON] [User]
```

This gives you a few distinct advantages:

- write servers (this part of servant can be considered a web framework),
- obtain client functions (in haskell),
- generate client functions for other programming languages,
- generate documentation for your web applications

We will focus on the `obtain client functions` and how we can use that generating code for Elm.

#### Setting up the Haskell Project

We can run `stack new helm-example` to have a basic Haskell project setup with stack.
Run `stack build` to see if everything works fine.

Next up we write a simple servant API and server in the `Lib.hs` file (straight from the servant websites example):

```haskell
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE DeriveGeneric #-}

module Lib where

import           Servant.API

type UserAPI = "users" :>  Get '[JSON] [User]

data User = User {
  name :: String,
  age :: Int,
  email :: String
}

someFunc :: IO ()
someFunc = putStrLn "Hello"
```

For that to compile we need to add `servant` as a dependency. Also add `servant-server`, `wai` and `wai-cors` as dependencies, we are going to need them in a second.

So these types `UserAPI` and `User` are all we need to generate the Elm code, that's what's so great about servant, you only need do define the type, the rest follows. Lets anyway still implement the server:

```haskell
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE DeriveGeneric #-}

module Lib where

import           Servant.API
import           Servant
import           GHC.Generics
import           Network.Wai.Handler.Warp       ( run )
import           Network.Wai.Middleware.Cors    ( simpleCors )


type UserAPI = "users" :>  Get '[JSON] [User]

data User = User {
  name :: String,
  age :: Int,
  email :: String
} deriving (Show, Eq, Generic)

users :: [User]
users = [User "Isaac Newton" 372 "isaac@newton.co.uk"]

server :: Server UserAPI
server = return users

userAPI :: Proxy UserAPI
userAPI = Proxy

app :: Application
app = simpleCors $ serve userAPI server -- avoid any cors issues for requests from elm

someFunc :: IO ()
someFunc = run 8081 app
```

If you run `stack build && stack exec helm-example-exe` it should start your webserver and should be reachable with `http://localhost:8081/users`

#### Setting up Elm

We will create the Elm project with [create-elm-app](https://github.com/halfzebra/create-elm-app), as it makes developing pretty comfortable and easy.

Run `create-elm-app helm-elm` and `cd helm-elm` afterwards. To verify all is working run `elm-app start` and you should see your elm app running on `http://localhost:3000`.

#### Putting it all together

Now, to generate the functions for elm we need to add the dependencies `servant-elm` and `elm-bridge` to our Haskell project.
Next we create directory `mkdir gen` in the Haskell project, where we add a file `Main.hs`.

Then we add a new executable to our `package.yml` so it looks like this:

```yml
executables:
  elm-gen-exe:
    source-dirs: gen
    main: Main.hs
    ghc-options:
      - -threaded
      - -rtsopts
      - -with-rtsopts=-N
    dependencies:
      - helm-example
  helm-example-exe:
    source-dirs: app
    main: Main.hs
    ghc-options:
      - -threaded
      - -rtsopts
      - -with-rtsopts=-N
    dependencies:
      - helm-example
```

This allows us to later on easily run the code generation.
Now we add the actual code necessary for the generation to `Main.hs`:

```haskell
{-# LANGUAGE DataKinds         #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TypeOperators     #-}

module Main where

import           Lib
import           Servant.Elm                    ( DefineElm(DefineElm)
                                                , Proxy(Proxy)
                                                , defElmImports
                                                , defElmOptions
                                                , generateElmModuleWith
                                                , ElmOptions
                                                , urlPrefix
                                                , UrlPrefix(..)
                                                )

-- So it knows where to connect to
myElmOpts :: ElmOptions
myElmOpts = defElmOptions { urlPrefix = Static "http://localhost:8081" }


main :: IO ()
main = putStrLn "Generating..." *> generateElmModuleWith
  myElmOpts
  ["Generated", "UserAPI"]
  defElmImports
  "helm-elm/src"
  [DefineElm (Proxy :: Proxy User)] -- generating types for User
  (Proxy :: Proxy UserAPI) -- generating function for the api
```

We also need to add a slide modification to our `User` type in `Lib.hs`:

```haskell
import           Elm.Derive                     ( defaultOptions
                                                , deriveBoth
                                                )

data User = User {
  name :: String,
  age :: Int,
  email :: String
} deriving (Show, Eq, Generic)
deriveBoth defaultOptions ''User
```

No we are all set to generate the code with:
`stack build && stack exec elm-gen-exe`

You can now inspect the generated code in `helm-elm/src/Generate/UserAPI.elm`

Now to use it in Elm we need to add these dependencies to our Elm project with inside the `helm-elm` folder:

```
elm-app install elm/json
elm-app install elm/url
elm-app install elm/http
elm-app install bartavelle/json-helpers
```

Running `elm-app start` should give no errors now.

Now we extend our `Main.elm` a bit, to actually call the sevant server:

```elm
module Main exposing (..)

import Browser
import Generated.UserAPI exposing (User, getUsers)
import Html exposing (Html, div, h1, img, text)
import Html.Attributes exposing (src)
import Http



---- MODEL ----


-- The users returned from our API
type alias Model =
    { users : List User }


init : ( Model, Cmd Msg )
init =
 -- initially call the backend to fetch users, using the generated function
    ( { users = [] }, getUsers GotUsers )



---- UPDATE ----

-- Our result message for using the genrated function
type Msg
    = GotUsers (Result Http.Error (List User))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotUsers (Ok users) ->
            ( { users = users }, Cmd.none )

        _ ->
            ( model, Cmd.none )



---- VIEW ----


view : Model -> Html Msg
view model =
    let
        userDivs = -- rendering the users
            List.map (\user -> div [] [ text user.name ]) model.users
    in
    div []
        ([ img [ src "/logo.svg" ] []
         , h1 [] [ text "Your Elm App is working!" ]
         ]
            ++ userDivs
        )



---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.element
        { view = view
        , init = \_ -> init
        , update = update
        , subscriptions = always Sub.none
        }
```

Thats it! Every time we change something we just need to run
`stack build && stack exec elm-gen-exe` and it updates our generated code. Than just follow the Elm compiler to fix compile errors and we are done!
Usually I move this into a Makefile for more convenient access. You can see Servant and Elm in action in this repository https://github.com/yannick-cw/notion-ocr-plugin. 
