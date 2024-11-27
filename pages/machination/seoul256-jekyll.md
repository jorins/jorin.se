---
title: seoul256 in Jekyll code snippets
footnotes: true
tags:
  - Software
---

# Introduction

[seoul256](https://github.com/junegunn/seoul256.vim) is a great colour scheme
that seized my personal number 1 spot from Monokai the second I saw it. I
ported it to Jekyll (i.e. [Pygments](https://pygments.org) /
[Rouge](http://rouge.jneen.net) CSS) so that you can enjoy it, too. You can
find the source code
[here](https://github.com/jorins/jorins.github.io/blob/main/_sass/minima/skins/seoul256-dark.scss).
Check it out below.

# Examples

## C example

Inline C like this `int x = 4;{:c}`

Code block like zis

```c showLineNumbers
#include "ruby/ruby.h"

static int
clone_method_i(st_data_t key, st_data_t value, st_data_t data)
{
    clone_method((VALUE)data, (ID)key, (const rb_method_entry_t *)value);
    return ST_CONTINUE;
}
```

## Clojure example

```clojure filename="make-adder.clj" /make-adder/
(defn make-adder [x]
  (let [y x]
    (fn [z] (+ y z))))
(def add2 (make-adder 2))
(add2 4)
```

## TypeScript example

```typescript showLineNumbers {6-10} /count/ copy filename="animals.ts"
export interface Animal {
  legs: number
  tails: number
}

type Cat<Pattern> = Animal & {
  swoosh?: (number) => void
  meow: (string) => string
  pattern: Pattern
}

// TODO: write Bird interface
// const utsuho: Bird = { ... }

const mike: Cat = {
  legs: 2,
  tails: 1,
  meow: (target) => `Hello! Wanna buy some cards, ${target ?? 'chump'}?`
  pattern: 'calico',
}

function yeet(target: any) => {
  throw target
}

let count = 1
while (true) {
  const target = 'nerd #' + count.toString()
  yeet(mike.meow(target))
  count = count + 1
}
```

## Zig example

```zig {1, 4-5}
const std = @import("std");
const warn = std.debug.warn;

fn add_floats(x: f16, y: f16) f16 {
    return x + y;
}
```

# Porting process

One
[article](https://www.uraimo.com/2011/09/21/from-vim-theme-to-pygments-css/) I
found suggested an external script that would attempt to parse VimL through
Python and it wasn't working out for me in part due to the complexity of the
`seoul256.vim` implementation, and in part due to the script not seeming to
work on modern Python (it was eight years old :scream:).

I cut out some middle-steps at the cost of some added manual labour to get the
job done instead. Since vim is a scriptable editor, I figured it would be no
problem exporting the colours if I could just figure out how, and I was right.

To outline the process:

1. Run `:runtime syntax/hitest.vim` inside vim. This will run a thorough colour
   test in vim.
2. Run `:TOhtml` in vim. This will convert the current buffer to a HTML page,
   complete with your colour scheme in use.
3. Strip the generated HTML to just the contents of the `<style>` tag in the
   `<head>`.
4. Remove style-rules related only to plugins to clean things up. I found I had
   hundreds if not thousands of selectors for
   [CHADtree](https://github.com/ms-jpq/chadtree) and
   [nvim-colorizer.lua](https://github.com/norcalli/nvim-colorizer.lua).[^not-a-dig]
5. Copy an existing stylesheet, e.g [minima
   classic](https://github.com/jekyll/minima/blob/master/_sass/minima/skins/classic.scss)
6. Replace the values of the stylesheet you copied with the values you got from
   your colour test stylesheet. There aren't always 1:1 relations here, but you
   can make a best effort for sure.

This method certainly has room for improvement. If I were to automate it, I'd
make it a lua script for neovim. Most of all I wish there were a proper
standard for colour schemes though, and I have no real incentive to work
further on this.

[^not-a-dig]: This is not a dig at either plugin; I use them because they are both great at what they do. Their internal workings are beyond my expertise and I do not judge their code by this metric.
