---
title: Usage
description: Usage Page
---

Once [LoQIP is installed](/docs/installation), generating a placeholder only takes a few lines of code. Simply provide an image as a `Buffer`, call [`getLoqip()`](/docs/reference#getloqip) method, and use the generated output wherever you need a placeholder while the original image is loading.

## Basic example

```ts
import { readFile } from "node:fs/promises";
import { getLoqip } from "loqip";

const image = new URL("./image.jpg", import.meta.url);
const buffer = await readFile(image);

const loqip = await getLoqip(buffer);

console.log(loqip.base64);
console.log(loqip.css);
console.log(loqip.svg);
console.log(loqip.color);
```

The returned object contains multiple representations of the same placeholder, allowing you to choose the one that best fits your rendering strategy.

## Understanding the output

Calling [`getLoqip()`](/docs/reference#getloqip) returns an object with several useful properties.

### `base64`

A Base64-encoded data URL that can be used directly as the `src` of an `<img>` element.

```ts
<img src={loqip.base64} alt="" />
```

### `css`

A CSS representation of the placeholder that recreates the image using gradients. This is useful when you want to render placeholders without additional image requests.

```ts
element.style.background = loqip.css;
```

### `svg`

An SVG object describing the generated placeholder. This format is lightweight, scalable, and works particularly well when serialized and embedded into the page.

### `color`

The dominant color extracted from the image. This is perfect for simple color placeholders or loading skeletons.

```ts
element.style.backgroundColor = loqip.color.hex;
```

## Serializing the SVG

If you prefer working with a serialized SVG string, LoQIP provides the [`serializeSVG()`](/docs/reference#serializesvg) helper.

```ts
import { readFile } from "node:fs/promises";
import { getLoqip, serializeSVG } from "loqip";

const image = new URL("./image.jpg", import.meta.url);
const buffer = await readFile(image);

const loqip = await getLoqip(buffer);

const svg = serializeSVG(loqip.svg);

console.log(svg);
```

This is especially useful when embedding the SVG into HTML, converting it into a data URL, or sending it over the network.

## Customizing the output

LoQIP includes several options that allow you to control how placeholders are generated. For example, you can change the placeholder size, output format, brightness, saturation, orientation handling, and more.

```ts
import { readFile } from "node:fs/promises";
import { getLoqip } from "loqip";

const image = new URL("./image.jpg", import.meta.url);
const buffer = await readFile(image);

const loqip = await getLoqip(buffer, {
  autoOrient: true,
  size: 12,
  format: "avif",
  brightness: 2,
  saturation: 1.7,
  hue: 50,
  removeAlpha: true,
  getExif: true,
});
```

Every option is documented in detail in the [**API Reference**](/docs/reference).

## Common workflow

A typical integration looks like this:

1. Read or receive an image.
2. Generate a placeholder with [`getLoqip()`](/docs/reference#getloqip).
3. Render the placeholder immediately.
4. Replace it with the full-resolution image once it finishes loading.

This approach creates a much smoother loading experience, especially on slower connections or when displaying large images.

## Next steps

Now that you've generated your first placeholder, head over to the [**API Reference**](/docs/reference) to explore every available option and return type in detail.

Or see the [**Choosing a Placeholder**](/docs/placeholder) to select the best option according to your needs.
