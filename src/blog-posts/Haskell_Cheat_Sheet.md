---
title: 'Haskell Cheat Sheet'
date: '2019-08-22'
tags: [haskell, cheatsheet]
description: ''
---

## Basics

#### Infix style

```haskell
10 `div` 2
```

#### Data Types

```haskell
data Bool = False | True
--    [1]   [2]
```

1. Type constructor
2. Data constructor

```haskell
data Pair a = Pair a a

-- record type
data Person = Person { name :: String }

p1 = Person "Name"
p2 = Person { name = "Name" }
```

```haskell
newtype Age = Age Int
```

- newtype just a efficient wrapper around single value

#### if then else

```haskell
if X then 22 else 23
```

#### pattern matching

```haskell
case x == y of
  True  -> "t"
  False -> "f"
```

#### Guards

```haskell
myAbs x
  | x < 0     = (-x)
  | otherwise = x
```

Inside case statement

```haskell
case maybeInt of
  Just x | x > 0 -> Just x
  _              -> Nothing
```

#### Lists

Split lists

```haskell
import Data.List.Split

splitOn "," "a,b,c,d"
```

#### Typeclasses

```haskell
class Eq a where
  (==) :: a -> a -> Bool

data Days = Mon | Tue

instance Eq Days where
  (==) Mon Mon = True
  (==) Tue Tue = True
  (==) _ _     = False

-- Typeclass requiring some other Typeclass for m
class Applicative m => Monad (m :: * -> *) where
```

#### do syntax

```haskell
main = do
  name <- readName
  return name
  [1]
```

1. `return :: Monad m => a -> m a`

#### Symbols

```haskell
(>>=) :: Monad m => m a -> (a -> m b) -> m b
maybeA >>= atToMaybeB

(<*>) :: Applicative f => f (a -> b) -> f a -> f b
(<$>) :: Functor f => (a -> b) -> f a -> f b

(<$) :: Functor f => a -> f b -> f a
toMaybeB <$ maybeA -- but returns maybeA

-- dropping result of right or left
(<*) :: Applicative f => f a -> f b -> f a
(*>) :: Applicative f => f a -> f b -> f b
```

#### IO

##### Files

```haskell
withFile "path" ReadMode (\handler -> hGetContents handler)
-- or
readFile "path"
```

The difference is, that `hGetContents` lazily reads the file, meaning only when you use the result, it actually reads from the file what you need. Downside is, if you read outside of the scope of the `withFile` function, you get an exception, as the file handle was closed already.

#### Exceptions

```haskell
try :: Exception e => IO a -> IO (Either e a)
-- defined in terms of catch
catch :: Exception e => IO a -> (e -> IO a) -> IO a
```

You need to define what exceptions to consider, others are not handled, e.g. `IOException` for all `IO` errors.

#### System

```haskell
exitWith :: ExitCode -> IO a
exitFailure :: IO a
```

## Language Extensions

##### LambdaCase

Allows:

```haskell
\case
    Just v  -> doX
    Nothing -> doY
```

## REPL

#### Query Type

`Prelude> :type "string"`

#### Run REPL in project

`stack repl` inside project or `cabal repl`

## Projects

#### Header

```haskell
module What (Import1, Import2) where

-- code
```

#### Importing

```haskell
import qualified Data.Bool
         [1]
```

1. `Data.Bool.bool` can now not be called directly anymore, only fully qualified

```haskell
import qualified Data.Bool as B
                             [1]
```

1. Like this call with `B.bool` for renaming

## Debugging

```haskell
import Debug.Trace.trace

 trace "This is logged" thisIsReturned
```
