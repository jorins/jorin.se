---
title: Connector
tags:
  - Electronics
  - Engineering
related:
  - '[[midi]]'
  - '[[conductor]]'
furtherReading:
  - https://www.mattmillman.com/info/crimpconnectors/common-jst-connector-types
  - https://www.mattmillman.com/info/crimpconnectors/dupont-and-dupont-connectors/
---

A connector is placed at the end of [[conductor|wires]] and on circuit boards in order to make electrical connections.

# Types

## JST

JST connectors are very common and cheap. They're mostly used internally in electronics, as most variants are not very durable and easily detach when pulled.

Most JST contacts consist of a header, soldered to a PCB, and a housing which holds several wires with crimped connectors.

Here's a table primarily based on the Matt's Tech Pages guide. Common connectors are marked with a star in the name column:

| Connector name | Pin pitch      | Mounting type | Latching mechanism | Rows | Min wire gauge [^terminals] | Max wire gauge [^terminals] | Note                                | Common application |
| -------------- | -------------- | ------------- | ------------------ | ---- | --------------------------- | --------------------------- | ----------------------------------- | ------------------ |
| ⭐ ZH          | 1.5 mm         | THT & SMD     | Friction           | 1    | 26                          | 28                          |                                     | 3D printers        |
| ⭐ PH          | 2.0 mm         | THT & SMD     | Friction           | 1    | 20                          | 30                          |                                     | Everything         |
| ⭐ XH          | 2.5mm[^2.5mm]  | THT & SMD     | Friction           | 1    | 22                          | 28                          |                                     | Everything         |
| PHD            | 2.0 mm         | THT           | Friction           | 2    |                             |                             | Dual row version of PH.             |                    |
| PA             | 2.0 mm         | THT & SMD     | Positive latch     | 1    |                             |                             |                                     |                    |
| XA             | 2.5 mm[^2.5mm] | THT & SMD     | Positive latch     | 1    |                             |                             |                                     |                    |
| EH             | 2.5 mm[^2.5mm] |               |                    | 1    | 22                          | 30                          | Like XH but slimmer                 |                    |
| SM             | 2.5 mm[^2.5mm] | Wire to wire  |                    | 1    | 22                          | 28                          |                                     | LED strips         |
| RCY            | 2.5 mm         | Wire to wire  |                    | 1    |                             |                             | Only ever has two pins              | Battery packs      |
| SH/SR          | 1.0 mm         | SMD only      |                    | 1    | 28                          | 32                          | Housings are SH and headers are SR. |                    |
| SHD            | 1.0 mm         | SMD only      |                    | 2    |                             |                             |                                     |                    |
| GH             | 1.25 mm        | SMD only      | Positive latch     | 1    | 26                          | 30                          |                                     |                    |
| VH             | 3.96 mm        | THT           |                    | 1    | 16                          | 20                          | Very similar to Molex KK .396.      |                    |

[^terminals]: Based on minimum and maximums available for terminals at Electrokit. May not be quite accurate but should be a good estimate of the minimal range available.

[^2.5mm]: It should be noted that the 2.5 mm pitch connectors are indeed 2.5 mm, and not 2.54 mm (0.1 in). You might be able to squeeze a 2.5 mm header into a 2.54 mm pitch footprint, but you'd best not let hubris get the better of you lest the gods strike you down.

## DuPont

DuPont connectors are another common type of internal connector for electronics. They use 2.54 mm pitch and are connected to straight pins. There's also shrouded/keyed headers, which you should use so as to not allow connecting things the wrong way around.

They're commonly used internally in eurorack, for internal rack connections including power. They come in one and two-row configurations.
