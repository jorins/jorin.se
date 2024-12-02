---
title: Conductor
tags:
  - Electronics
related:
  - '[[connector]]'
furtherReading:
  - https://en.wikipedia.org/wiki/Electrical_resistivity_and_conductivity
  - https://en.wikipedia.org/wiki/Electrical_resistance_and_conductance
---

A conductor is something that conducts electricity. If you're brave enough and supply enough voltage, anything can be a conductor. Most commonly, however, we use wire, terminals, leads, [[connector|connectors]], PCB pads, etc.

# Materials

Conductors are generally made of metal, on account of metal being conductive. Copper is the most commonly used material. It has excellent conductivity, is cheap, and is malleable. Other metals may be used in certain cases when their properties are desired. For example, aluminium wire may be used in housing to cut costs. However, its inferior electrical properties and lesser malleability make it a greater fire hazard than copper wiring. Gold may be used to coat connectors so as to make them more corrosion proof, or to profit from audiophiles.

Here are some properties adapted from <i><span lang="se">Formler & Tabeller</i></strong> by <span lang="se">Natur & Kultur (2019):</span>

| **Material**   | **Resistivity ($µΩm$)** | **Temperature coefficient ($10^{-3} / K$)** | **Melting point ($ºC$)** | **Density ($10^3 kg / m^3$)** |
| -------------- | ----------------------- | ------------------------------------------- | ------------------------ | ----------------------------- |
| Aluminium      | 0.027                   | 4.3                                         | 660                      | 2.70                          |
| Lead           | 0.21                    | 4.2                                         | 327                      | 11.3                          |
| Gold           | 0.024                   | 4.0                                         | 1064                     | 19.3                          |
| Iron           | 0.097                   | 6.6                                         | 1538                     | 7.87                          |
| Cadmium        | 0.069                   | 4.3                                         | 321                      | 8.69                          |
| Copper         | 0.0167                  | 4.3                                         | 1085                     | 8.96                          |
| Quicksilver    | 0.96                    | 0.89                                        | -39                      | 13.55                         |
| Nickel         | 0.078                   | 6.7                                         | 1455                     | 8.9                           |
| Platinum       | 0.106                   | 3.9                                         | 1768                     | 21.45                         |
| Silver         | 0.0159                  | 4.1                                         | 962                      | 10.5                          |
| Wolfram        | 0.0565                  | 4.8                                         | 3422                     | 19.3                          |
| Zinc           | 0.059                   | 4.2                                         | 420                      | 7.1                           |
| Steel (0.85 C) | 0.16                    | 3.3                                         | 1350                     | 7.8                           |

Assuming 20 ºC for resistivity and conductivity.

# Resistivity & conductivity

Resistivity and conductivity are properties of a material which determine the resistance and conductance of a conductor. They are affected by temperature. Increased temperature gives increased resistivity. Resistivity uses the symbol $\rho$ (rho) and is measured in ohm-metres ($\Omega m$). Conductivity is the inverse of resistivity and uses the symbol $\sigma$ (sigma). It is measured in siemens per metre ($S/m$).

Resistance uses the symbol $R$ and is measured in Ohms ($\Omega$). Conductance uses the symbol $G$ and is measured in Siemens ($S$). One can view resistance and conductance as applied resistivity and conductivity, however deceptively similar the names of these properties are. Whereas resistivity is primarily used in calculations, resistance can be plainly measured between two points in a circuit. Resistance is determined by resistivity, conductor length, and conductor cross-sectional area. The resistance $R$ is determined $R = \rho \cdot \frac{l}{A}$ where $l$ is length, $A$ is cross sectional area, and $\rho$ is the resistivity of the material. Conversely, conductance is defined as $G = \frac{1}{R} = \sigma \cdot \frac{A}{l}$.

# Current capacity

Since temperature rises with current, resistance rises with temperature, and current rises with resistance, a conductor finds itself in a feedback loop when conducting too much current. This will in the best case lead to the conductor simply reaching a critical temperature where it breaks off and stops conducting. However, it is obviously a fire hazard and can damage a circuit in unpredictable ways.

# Wires

## Solid & stranded cables

A solid cable consists of one singular core. A stranded cable consists of multiple, separate strands of wire that are not isolated from each other. Stranded cables are generally preferred where possible, as they're less prone to breaking off and even if a single strand breaks, it's not necessarily going to result in the wire ceasing to function entirely. However, since they do not occupy the full area of their diameter, they have higher resistivity. According to [Wikipedia](https://en.wikipedia.org/wiki/American_wire_gauge#Stranded_wire_AWG_sizes), about 25% of the cross-sectional area of a stranded wire is air and the diameter must be increased by 13% to achieve electrical characteristics of the equivalent solid core wire.

A drawback of stranded wires in installations is that they tend to fray when inserted into screw terminals and similar. This can be a hazard as stray strands risk making contact with something else. You generally want to twist the end of the wire to make them stick together a bit and install a [[ferrule]] if needed. You can also put some solder at the end of a stranded wire to make the strands stick together. This is especially useful in situations where ferrules cannot be used, e.g. when working with smaller electronics.

## Gauge

The gauge (pronounced gage) or thickness of a wire will tell you virtually everything you need to know about it. Gauge is specified as cable diameter, cross section area, or an American Wire Gauge (AWG) number. The higher the AWG number, the lower the thickness.

### Table

Assuming copper wire at 20 ºC where relevant. Table adjusted from [Wikipedia](https://en.wikipedia.org/wiki/American_wire_gauge)

| **Gauge (AWG)** | **Diameter ($mm$)** | **Area ($mm^2$)** | **Conductivity ($m/mΩ$)** | **Reistance ($mΩ/m$)** | **Current rating at 60 ºC ($A$)** | **Current rating at 90 ºC ($A$)** | **Notes**                                 |
| --------------- | ------------------- | ----------------- | ------------------------- | ---------------------- | --------------------------------- | --------------------------------- | ----------------------------------------- |
| 0000 (4/0)      | 11.684              | 107.21            | 6.4203                    | 0.15575                | 195                               | 260                               |                                           |
| 000 (3/0)       | 10.405              | 85.030            | 5.0916                    | 0.19640                | 165                               | 225                               |                                           |
| 00 (2/0)        | 9.266               | 67.433            | 4.0379                    | 0.24765                | 145                               | 195                               |                                           |
| 0 (1/0)         | 8.251               | 53.469            | 3.2017                    | 0.31232                | 125                               | 170                               |                                           |
| 1               | 7.3481              | 42.407            | 2.5393                    | 0.39379                | 110                               | 145                               |                                           |
| 2               | 6.5437              | 33.630            | 2.0138                    | 0.49656                | 95                                | 130                               |                                           |
| 3               | 5.8273              | 26.670            | 1.5970                    | 0.62616                | 85                                | 115                               |                                           |
| 4               | 5.1893              | 21.150            | 1.2665                    | 0.78957                | 70                                | 95                                |                                           |
| 5               | 4.6212              | 16.773            | 1.0043                    | 0.99563                |                                   |                                   |                                           |
| 6               | 4.1153              | 13.301            | 0.79651                   | 1.2554                 | 55                                | 75                                |                                           |
| 7               | 3.6648              | 10.548            | 0.63166                   | 1.5831                 |                                   |                                   |                                           |
| 8               | 3.2636              | 8.3655            | 0.50093                   | 1.9962                 | 40                                | 55                                |                                           |
| 9               | 2.9063              | 6.6341            | 0.39725                   | 2.5172                 |                                   |                                   |                                           |
| 10              | 2.5881              | 5.2611            | 0.31503                   | 3.1742                 | 30                                | 40                                |                                           |
| 11              | 2.3048              | 4.1722            | 0.24983                   | 4.0026                 |                                   |                                   |                                           |
| 12              | 2.0525              | 3.3087            | 0.19813                   | 5.0471                 | 20                                | 30                                | Appropriate for household electronics.    |
| 13              | 1.8278              | 2.6239            | 0.15712                   | 6.3643                 |                                   |                                   |                                           |
| 14              | 1.6277              | 2.0809            | 0.12460                   | 8.0253                 | 15                                | 25                                |                                           |
| 15              | 1.4495              | 1.6502            | 0.098816                  | 10.119                 |                                   |                                   |                                           |
| 16              | 1.2908              | 1.3086            | 0.078365                  | 12.760                 | 12                                | 18                                |                                           |
| 17              | 1.1495              | 1.0378            | 0.062146                  | 16.091                 |                                   |                                   |                                           |
| 18              | 1.0236              | 0.82304           | 0.049284                  | 20.290                 | 10                                | 16                                |                                           |
| 19              | 0.91161             | 0.65270           | 0.039084                  | 25.585                 |                                   |                                   |                                           |
| 20              | 0.81182             | 0.51761           | 0.030995                  | 32.263                 | 5                                 |                                   |                                           |
| 21              | 0.72294             | 0.41049           | 0.024580                  | 40.683                 |                                   |                                   |                                           |
| 22              | 0.64380             | 0.32553           | 0.019493                  | 51.300                 | 3                                 |                                   |                                           |
| 23              | 0.57332             | 0.25816           | 0.015458                  | 64.688                 |                                   |                                   |                                           |
| 24              | 0.51055             | 0.20473           | 0.012259                  | 81.570                 | 2.1                               |                                   |                                           |
| 25              | 0.45466             | 0.16235           | 0.0097220                 | 102.85                 |                                   |                                   |                                           |
| 26              | 0.40489             | 0.12875           | 0.0077099                 | 129.70                 | 1.3                               |                                   |                                           |
| 27              | 0.36056             | 0.10210           | 0.0061142                 | 163.55                 |                                   |                                   |                                           |
| 28              | 0.32109             | 0.080975          | 0.0048488                 | 206.23                 | 0.83                              |                                   |                                           |
| 29              | 0.28594             | 0.064216          | 0.0038453                 | 260.05                 |                                   |                                   |                                           |
| 30              | 0.25463             | 0.050926          | 0.0030494                 | 327.92                 | 0.52                              |                                   |                                           |
| 31              | 0.22676             | 0.040386          | 0.0024183                 | 413.50                 |                                   |                                   |                                           |
| 32              | 0.20193             | 0.032027          | 0.0019178                 | 521.42                 | 0.32                              |                                   |                                           |
| 33              | 0.17983             | 0.025399          | 0.0015209                 | 657.50                 |                                   |                                   |                                           |
| 34              | 0.16014             | 0.020142          | 0.0012061                 | 829.09                 | 0.18                              |                                   |                                           |
| 35              | 0.14261             | 0.015973          | 0.00095650                | 1045.4                 |                                   |                                   |                                           |
| **36**          | **0.12700**         | 0.012667          | 0.00075854                | 1318.3                 |                                   |                                   | Basis for AWG definition.                 |
| 37              | 0.11309             | 0.010045          | 0.00060155                | 1662.3                 |                                   |                                   |                                           |
| 38              | 0.10071             | 0.0079667         | 0.00047705                | 2096.2                 |                                   |                                   |                                           |
| 39              | 0.089689            | 0.0063179         | 0.00037832                | 2643.2                 |                                   |                                   |                                           |
| 40              | 0.079871            | 0.0050103         | 0.00030002                | 3333.0                 |                                   |                                   | Approximately the diameter of human hair. |
| 41              | 0.071127            | 0.0039733         | 0.00023792                | 4202.9                 |                                   |                                   |                                           |
| 42              | 0.063340            | 0.0031510         | 0.00018868                | 5299.8                 |                                   |                                   | Commonly used for guitar pickups.         |
| 43              | 0.056406            | 0.0024988         | 0.00014963                | 6682.9                 |                                   |                                   |                                           |
| 44              | 0.050231            | 0.0019817         | 0.00011866                | 8427.0                 |                                   |                                   |                                           |
| 45              | 0.044732            | 0.0015715         | 9.4105E-05                | 10626                  |                                   |                                   |                                           |
| 46              | 0.039835            | 0.0012463         | 7.4629E-05                | 13399                  |                                   |                                   |                                           |
| 47              | 0.035474            | 0.00098837        | 5.9183E-05                | 16896                  |                                   |                                   |                                           |
| 48              | 0.031590            | 0.00078381        | 4.6934E-05                | 21306                  |                                   |                                   |                                           |
| 49              | 0.028132            | 0.00062159        | 3.7221E-05                | 26866                  |                                   |                                   |                                           |
| 50              | 0.025052            | 0.00049294        | 2.9517E-05                | 33878                  |                                   |                                   |                                           |
| 51              | 0.022310            | 0.00039092        | 2.3408E-05                | 42719                  |                                   |                                   |                                           |
| 52              | 0.019867            | 0.00031001        | 1.8563E-05                | 53868                  |                                   |                                   |                                           |
| 53              | 0.017692            | 0.00024585        | 1.4721E-05                | 67926                  |                                   |                                   |                                           |
| 54              | 0.015755            | 0.00019497        | 1.1674E-05                | 85653                  |                                   |                                   |                                           |
| 55              | 0.014030            | 0.00015461        | 9.2586E-06                | 108010                 |                                   |                                   |                                           |
| 56              | 0.012494            | 0.00012261        | 7.3424E-06                | 136200                 |                                   |                                   |                                           |
| 57              | 0.011127            | 9.7240-05         | 5.8228E-06                | 171740                 |                                   |                                   |                                           |
| 58              | 0.0099089           | 7.7115-05         | 4.6176E-06                | 216560                 |                                   |                                   | Approx. $1 \mu m$ thick.                  |
| 59              | 0.0088241           | 6.1155-05         | 3.6619E-06                | 273070                 |                                   |                                   |                                           |
| 60              | 0.0078581           | 4.8498-05         | 2.9040E-06                | 344340                 |                                   |                                   |                                           |

## Sheathing

Most wires have some form of non-metallic sheathing. For example, most common hookup wire has a decently thick plastic sheathing to make it easy to remove and adds additional tensile strength. Copper wire meant for winding spools will have very thin sheathing that primarily serves to stop it from shorting with itself and provides minimal tensile reinforcement. Good audio cables will have very thick sheathing that will help it survive the harshness of the road.

## Shielding

Shielding is a conductive layer around the cable that serves to prevent interference. It usually takes the shape of strands of copper running around the insulated conductor, with another layer of sheathing keeping the shielding in place.

Shielding is primarily important for analog signals, such as audio cables, but can also be applicable for e.g. ethernet cables, where a shielded twisted pair (STP) cable can be run further than an unshielded twisted pair (UTP) cable.

The termination of the cable can be important. Whereas the strands can just be collected and run into a solder terminal in an audio cable (leaving the signal wire unshielded for a couple of centimetres inside the connector), some connectors used in high frequency electronics such as BNC are made to shield the conductor all the way until termination.
