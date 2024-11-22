---
title: Lilypond test
hidden: true
---

Test page for Lilypond plugin

No inline parameters

```lilypond
\relative d' {
  d4 e f a
}
```

strategy=img-png

```lilypond strategy=img-png
\relative d' {
  d4 e f a
}
```

strategy=img-svg

```lilypond strategy=img-svg
d4 e f g
```

strategy=inline-svg

```lilypond strategy=inline-svg
d4 e f g
```

strategy=img-png crop dpi=300

```lilypond strategy=img-png crop dpi=300
d4 e f g
```

strategy=img-png nocrop dpi=72

```lilypond strategy=img-png nocrop dpi=72
d4 e f g
```

No inline parameters, in block quote

> ```lilypond
> d4 e f g
> ```
