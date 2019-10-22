---
title: 'Haskell Cheat Sheet'
date: '2019-08-22'
tags: [haskell, cheatsheet]
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
* newtype just a efficient wrapper around single value

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

#### Typeclasses

```haskell
class Eq a where
  (==) :: a -> a -> Bool

data Days = Mon | Tue 

instance Eq Days where
  (==) Mon Mon = True
  (==) Tue Tue = True
  (==) _ _     = False
```

#### do syntax

```haskell
main = do
  name <- readName
  return name
  [1]
```
1. `return :: Monad m => a -> m a`


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


