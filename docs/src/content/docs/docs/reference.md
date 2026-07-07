---
title: Reference
description: Reference Page
---

This page documents the public API exposed by LoQIP. In most cases, you'll only interact with the [`getLoqip()`](/docs/reference#getloqip) function and the objects it returns.

---

## `getLoqip()`

Generates a low-quality image placeholder (LQIP) from an image buffer.

### Signature

```ts
function getLoqip(
  src: Buffer,
  options?: GetLoqipOptions
): Promise<GetLoqipReturn>
```

### Parameters

#### `src`

**Type:** `Buffer`
**Required:** Yes

The source image to process.

```ts
const loqip = await getLoqip(buffer);
```

---

#### `options`

**Type:** `GetLoqipOptions`
**Required:** No

Configuration options that control how the placeholder is generated.

## `GetLoqipOptions`

### `autoOrient`

**Type:** `boolean`
**Default:** `false`

Automatically rotates the image according to its EXIF orientation metadata before generating the placeholder.

---

### `size`

**Type:** `number`
**Default:** `4`

The size, in pixels, of the generated placeholder image.

The value must be an integer between **4** and **64**.

Larger values produce more detailed placeholders but slightly increase processing time and output size.

---

### `format`

**Type:** `ImageFormats`
**Default:** `"webp"`

Specifies the output format used for the generated placeholder image.

```ts
type ImageFormats =
  | "png"
  | "jpg"
  | "jpeg"
  | "webp"
  | "avif";
```

---

### `brightness`

**Type:** `number`
**Default:** `1`

Applies a brightness multiplier to the generated placeholder.

Values greater than `1` increase brightness, while values below `1` make the image darker.

---

### `saturation`

**Type:** `number`
**Default:** `1.2`

Adjusts the color saturation of the placeholder.

Higher values produce more vibrant colors, while lower values create a more muted appearance.

---

### `hue`

**Type:** `number`

Rotates the image hue by the specified number of degrees.

If omitted, no hue transformation is applied.

---

### `removeAlpha`

**Type:** `boolean`
**Default:** `false`

Removes the alpha channel from transparent images before generating the placeholder.

---

### `getExif`

**Type:** `boolean`
**Default:** `false`

Includes the image EXIF metadata in the returned [`metadata`](/docs/reference#metadata) object when available.

---

## Return value

[`getLoqip()`](/docs/reference#getloqip) returns a [`Promise<GetLoqipReturn>`](/docs/reference#getloqipreturn).

## `GetLoqipReturn`

### `base64`

**Type:** `string`

A Base64-encoded data URL that can be used directly as an image source.

```ts
<img src={loqip.base64} />
```

---

### `color`

**Type:** `GetLoqipColor`

The dominant color extracted from the image.

```ts
interface GetLoqipColor {
  hex: string;
  r: number;
  g: number;
  b: number;
}
```

Example:

```ts
console.log(loqip.color.hex);
// "#74A2D8"
```

---

### `css`

**Type:** `GetLoqipCSS`

A CSS representation of the placeholder using gradients.

```ts
interface GetLoqipCSS {
  backgroundImage: string;
  backgroundPosition: string;
  backgroundSize: string;
  backgroundRepeat: "no-repeat";
}
```

Example:

```ts
element.style.backgroundImage = loqip.css.backgroundImage;
```

---

### `svg`

**Type:** `GetLoqipSVG`

A structured SVG representation of the generated placeholder.

This value is intended to be passed to [`serializeSVG()`](/docs/reference#serializesvg) before being embedded into HTML or converted into a string.

```ts
const svg = serializeSVG(loqip.svg);
```

---

### `pixels`

**Type:** `GetLoqipPixel[][]`

A two-dimensional array containing the generated placeholder pixels.

Each pixel is represented by the following structure:

```ts
interface GetLoqipPixel {
  r: number;
  g: number;
  b: number;
  a?: number;
}
```

This property is useful if you want to build your own renderer or perform custom processing.

---

### `metadata`

**Type:** `GetLoqipMetadata`

Contains information about the processed image.

```ts
interface GetLoqipMetadata {
  width: number;
  height: number;
  originalWidth: number;
  originalHeight: number;
  originalFormat: string;
  // Additional EXIF metadata when available.
}
```

When [`getExif`](/docs/reference#getexif) is enabled, this object also includes the EXIF metadata extracted from the source image.

## Complete example

```ts
import { readFile } from "node:fs/promises";
import { getLoqip } from "loqip";

const image = new URL("./image.jpg", import.meta.url);
const buffer = await readFile(image);

const loqip = await getLoqip(buffer, {
  size: 8,
  format: "avif",
  autoOrient: true,
});

console.log(loqip.base64);
console.log(loqip.color);
console.log(loqip.css);
console.log(loqip.metadata);
```

## `serializeSVG()`

Converts a LoQIP SVG object into a serialized SVG string.

This helper is useful when you want to embed the generated SVG directly into HTML, convert it into a data URL, or use it anywhere a string representation of the SVG is required.

### Signature

```ts
function serializeSVG(svg: GetLoqipSVG): string
```

### Parameters

#### `svg`

**Type:** `GetLoqipSVG`
**Required:** Yes

The SVG object returned by [`getLoqip()`](/docs/reference#getloqip).

```ts
const loqip = await getLoqip(buffer);

const svg = serializeSVG(loqip.svg);
```

---

## Return value

**Type:** `string`

A serialized SVG document.

The returned value is a valid SVG string that can be:

- Embedded directly into HTML.
- Converted into a Base64 or URL-encoded data URL.
- Stored or transmitted as plain text.
- Used anywhere an SVG string is expected.

---

## Basic example

```ts
import { readFile } from "node:fs/promises";
import { getLoqip, serializeSVG } from "loqip";

const image = new URL("./image.jpg", import.meta.url);
const buffer = await readFile(image);

const loqip = await getLoqip(buffer);

const svg = serializeSVG(loqip.svg);

console.log(svg);
```

The output will look similar to the following:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4">
  ...
</svg>
```

---

## Using it as an image

One common use case is converting the serialized SVG into a data URL that can be assigned to an image element.

```ts
const svg = serializeSVG(loqip.svg);

const dataURL = `data:image/svg+xml,${encodeURIComponent(svg)}`;
```

You can then use it as the source of an image:

```html
<img src="{dataURL}" alt="" />
```

---

## When should I use `serializeSVG()`?

You only need this helper if you want to work with the SVG representation as a string.

If you're using the other outputs returned by [`getLoqip()`](/docs/reference#getloqip) (such as [`base64`](/docs/reference#base64), [`css`](/docs/reference#css) or [`color`](/docs/reference#color)) there's no need to call [`serializeSVG()`](/docs/reference#serializesvg).

A common workflow is:

1. Generate a placeholder with [`getLoqip()`](/docs/reference#getloqip).
2. Access the [`svg`](/docs/reference#svg) property.
3. Serialize it using [`serializeSVG()`](/docs/reference#serializesvg).
4. Embed the resulting string wherever an SVG is required.
