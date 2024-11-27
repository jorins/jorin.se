---
title: Wiring standards
tags:
  - Electronics
related:
  - '[[wire-gauge]]'
  - '[[connector]]'
furtherReading:
---

Standardising how wires are supposed to be connected is an effective method of
increasing the maintainability and safety of systems.

# AC power (Europe)

- Brown: live
- Blue: neutral
- Green + yellow: ground

A good way to remember is that the brown lead shares colour with your underwear
if you touch it. Blue can be likened to cold, analogous to the negative in a
balanced signal. Ground is not found in all installations. Of course, it is
possible to swap live and neutral by just turning a plug around, so they should
be treated with equal care.

# DC power

- Red: positive
- Black: negative (ground)

# RJ45 (ethernet)

RJ45 has two standards. Common for them is that they alternate striped and
solid wires, starting with striped wires. The blue pair wires are always in the
center, and enveloped by another colour. Brown is always the last colour. This
leaves the green and yellow pairs as the only difference.

For a lone cable, the same standard should be used in both ends. It doesn't
really matter which standard is used. However, for wiring inside a building
where connectors may be replaced in the future, it is important to make sure to
consistently use the same standard to avoid creating crossover cables where not
intended. T568-**B** is preferred if the A variant is not already in use.

## T568-A

1. **Striped green + white**
2. **Solid green**
3. **Striped yellow + white**
4. Solid blue
5. Striped blue + white
6. **Solid yellow**
7. Striped brown + white
8. Solid brown

## T568-B

1. **Striped yellow + white**
2. **Solid yellow**
3. **Striped green + white**
4. Solid blue
5. Striped blue + white
6. **Solid green**
7. Striped brown + white
8. Solid brown

# Balanced audio

Balanced audio uses a positive signal, its negative opposite, and a ground. The
colours used for positive and negative are usually red and blue, respectively.
You can think of them as hot and cold. The ground is usually the bare copper
sleeve.

Phantom power may be transmitted over the negative, usually as +48V DC.

## TRS (tele jacks)

1. Tip: positive
2. Ring: negative
3. Sleeve: ground

## XLR

1. Ground
2. Positive
3. Negative
