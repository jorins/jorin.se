---
title: Diode
footnotes: true

tags:
  - electronics
  - components

furtherReading:
  - name: Wikipedia (en) - Diode
    href: 'https://en.wikipedia.org/wiki/Diode'
    lang: en-US

  - name: Wikipedia (sv) - Diod
    href: 'https://sv.wikipedia.org/wiki/Diod'
    lang: sv-SE
---

A diode is an [active electronic component](/grimoire/active-component) that
limits the direction of current. It doesn't conduct beneath a certain voltage,
and variants of the component can be used for purposes such as emitting light
and voltage regulation.

# Characteristics

Current can normally only pass through from the the anode, to the the cathode,
meaning that the voltage from anode to cathode must be positive to conduct.
When this is the case, the diode is _forward biased_.

```
Anode              Cathode
  o-------|>|---------o
```

A conducting diode will drop voltage from anode to cathode. This is known as a
forward voltage, or a voltage drop. In order for the diode to conduct, the
voltage must exceed the forward voltage. The amount of voltage drop is inherent
to the type of diode used. Most conventional diodes have a voltage drop of
about 0.7V.

**Not conducting**

```
+0.3V            0V
  o-------|>|----o
```

**Conducting**

```
+3V          +2.3V
 o-----|>|-----o
```

If the voltage at the cathode exceeds the voltage at the anode, the diode is
_reverse biased_ and won't conduct unless it's either a [zener
diode](#zener), or if it's pushed so hard it breaks. If a diode breaks,
it can result in the diode not conducting under any circumstances, or it can
short entirely. Diodes breaking is generally considered bad for circuit health.

The humble [1N4148 silicon
diode](https://en.wikipedia.org/wiki/1N4148_signal_diode 'lang=en-US') will for example
stand up to 100V of voltage from cathode to anode, but will only handle a few
hundred mA of current even in forward voltage.

# Types

## Silicon

Silicon diodes are the most commonly used signal diodes because they are cheap
and have a fast switching time. Their largest drawbacks are their relatively
high forward voltage $(W_F \approx 0.7V)$.

## Germanium

Germanium diodes were historically favoured for their low forward voltage $(W_F
\approx 0.3V)$, but are mostly replaced by [Schottky diodes](#schottky) which
achieve lower forward voltages and are far cheaper. Germanium diodes still see
use in audio, in particular in [distortion effects](#distortion) as their
characteristics <sup>(which characteristics?)</sup> contribute to a vintage
sound.

## Schottky

Schottky diodes have a very low forward voltage, making them ideal for power
management processes, e.g. [rectification](#ac-rectification). They are
available with current ratings up to several Amperes. A consequence of their
low forward voltage is that their reverse breakdown voltage is relatively low.

## Light-emitting

LEDs emit light when current passes through them. They're easily fried when
provided with too much current and are usually rated for a low reverse voltage.

### Forward voltage

LEDs' forward voltage increases with the frequency of the light.

| Color            | Forward voltage    |
| ---------------- | ------------------ |
| Infrared (IR)    | $W_F \approx 1.2V$ |
| Red              | $W_F \approx 1.7V$ |
| Yellow           | $W_F \approx 2.1V$ |
| Green            | $W_F \approx 3.5V$ |
| Blue             | $W_F \approx 3.6V$ |
| Ultraviolet (UV) | $W_F \approx 4.0V$ |

Values will between specific types a lot. Green and white LEDs vary a lot in
particular as their colours can be a compound of many different things.

### Form factor

Since LEDs are used in user interfaces, their physical form factor is often
defined by the diameter of their bulb. Common sizes include 8mm, 5mm, 3mm, and
1.8mm (flat shape).

8mm and 5mm are popular in guitar pedals. 3mm can be used in them as well. 3mm
has historically been used in keyboards sometimes, but would often collides with
keycaps and so 1.8mm LEDs were favoured, although both are mostly replaced by
RGB lights placed directly on the PCB such as [WS2812Bs](ws2812b) nowadays.

## Zener

Zener diodes are unique in that they can conduct in reverse bias (up to a
certain voltage) without breaking. This voltage varies but is typically
something like 9V or 12V. This allows you to use them for [voltage
regulation](#voltage-regulation).

## Comparison table

| Type           | Forward voltage                                  | Reverse voltage                       | Current rating | Applications                  |
| -------------- | ------------------------------------------------ | ------------------------------------- | -------------- | ----------------------------- |
| Silicon        | $W_F \approx 0.7V$                               | $V_R \gtrapprox 30V$                  | Medium         | Signal processing             |
| Germanium      | $W_F \approx 0.3V$                               | $V_R \gtrapprox 30V$                  | Low            | Audio effects, power handling |
| Schottky       | $W_F \approx 0.2V$                               | $20V \lessapprox V_R \lessapprox 40V$ | Low to high    | Power handling                |
| Light-emitting | $1.2V \lessapprox W_F \lessapprox 4.0V$[^led-vf] | $V_R \approx 5V$                      | Low            | User interfacing              |
| Zener          | $W_F \approx 0.7V$                               | Variable; does not break              | Low to medium  | Voltage regulation            |

[^led-vf]: Scales with wave length, see [LED forward voltage](#forward-voltage)

# Applications

Applications for diodes include rectifying alternating current to direct
current, distorting sound, limiting voltage, and emitting light.

## AC rectification

## Reverse voltage protection

Connecting a diode between the positive pole of your power input and the rest
of the circuit ensures that current does not flow if a power supply of wrong
polarity is connected. A [schottky diode](#schottky) is ideal for this task as
its low forward voltage maximises the voltage available to the circuit.

## Voltage regulation

A [zener diode](#zener) connected in reverse bias between positive and negative
DC power rails ensures that any voltage exceeding the diode's rating is drained
to ground, protecting the circuit from over-voltage.

## In audio

_N.B.: This section needs some peer review and concrete, verifiable examples._

Diodes interact wonderfully with audio signals and are mostly used to create
various distorting effects. Although diodes do not achieve the same "authentic"
overdrive that is caused by literally pushing an amplifying circuit to its
limit, the right selection and application of diodes will very frequently
achieve nearly indistinguishable results.

### Analogue octave up

The simplest, but probably least common usage of diodes in audio processing, is
to simply run the signal across a diode. This will make a half-wave rectifier
and cut all negative parts of the signal. While the fundamental frequency for a
stable wave will remain the same, the harmonic emphasis will be drastically
altered.

Using either four diodes or a transformer/op-amp and two diodes, we can instead
create a full wave rectifier. Though a full-wave rectifier is normally used to
turn always positive relative to neutral in order to create DC, we can opt to
not add AC filtering diodes to instead just get the doubled frequency of the
rectified wave.

A four-diode rectifier is arguably the simpler design, but using a centre-tap
transformer or an op-amp allows reducing the amount of diodes to two, which
makes for a less distorted effect as there is less forward voltage to overcome.
By creating an inverted signal and then running both the original and the
inverted signals through their own half-wave rectifiers before summing them, a
full-wave rectification is achieved, of which the fundamental frequency is
twice what the input's was.

For pure octave effects, diodes with low forward voltages are strongly
preferred. If more distortion is desired, other diodes may be of greater
interest.

### Gate

Running a signal through two diodes in parallel, one forward-biased and one
reverse-biased, will cause the signal to go through so long as the forward
voltage is met, both on the positive and negative duty cycles. Since this will
cut the signal during the transition from positive to negative and vice versa,
it will be a distorted gate sound, sharing some similarities to old
transistor-based fuzzes.

### Distortion

By running the signal to ground through a two-way diode gate, any voltage above
the forward voltage will run to ground and the wave will effectively have its
top and bottom cut off. This creates a classic pedal distortion.

By instead doing this with the negative feedback loop of an op-amp, the op-amp
will achieve a similar but less harsh effect. This is more akin to a pedal
overdrive.

In these circuits, the switching speed of the diode influences the harshness of
the distortion. Although germanium diodes have a very low forward voltage and
cut the most off a signal, they will produce fewer harmonics.
