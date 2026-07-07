---
title: Choosing a Placeholder
description: Choosing a Placeholder Page
---

LoQIP generates multiple representations of the same placeholder, each optimized for a different use case. The best choice depends on how you're displaying your images and the level of visual fidelity you want.

This guide will help you decide which output to use in your application.

## At a glance

| Output | Best for |
| --- | --- |
| `base64` | Image previews using `<img>` or `<picture>`. |
| `css` | Background images and CSS-only placeholders. |
| `svg` | High-quality, scalable placeholders with minimal size. |
| `color` | Simple loading states, cards, and skeleton screens. |

## Base64

The `base64` output is the easiest option to integrate. It returns a data URL that can be used anywhere an image source is expected.

```html
<img src={loqip.base64} alt="" />
```

### Recommended when

- You want the simplest possible implementation.
- You're displaying images with `<img>` or `<picture>`.
- You don't mind embedding a small data URL into your page.

### Advantages

- Easy to use.
- Works in every modern browser.
- No additional processing required.

---

## CSS

The `css` output recreates the image using CSS gradients instead of an actual image.

```ts
element.style.backgroundImage = loqip.css.backgroundImage;
```

### Recommended when

- You're displaying images as CSS backgrounds.
- You want to avoid embedding image data.
- Your UI already relies heavily on CSS.

### Advantages

- Pure CSS solution.
- No image decoding required.
- Great for decorative backgrounds.

---

## SVG

The `svg` output provides a vector representation of the generated placeholder.

After serializing it with `serializeSVG()`, it can be embedded directly into your application.

```ts
const svg = serializeSVG(loqip.svg);
```

### Recommended when

- You want the highest visual quality.
- You need a scalable placeholder.
- You're generating responsive interfaces.

### Advantages

- Lightweight.
- Resolution independent.
- Excellent visual fidelity for small placeholders.

---

## Dominant color

The `color` output extracts the dominant color from the source image.

```ts
element.style.backgroundColor = loqip.color.hex;
```

### Recommended when

- Building skeleton screens.
- Displaying image cards.
- Showing placeholders behind lazy-loaded images.

### Advantages

- Extremely lightweight.
- Instant to render.
- Creates a smooth visual transition while the image loads.

---

## Which one should I use?

There isn't a single "best" placeholder format—each one is designed for a different scenario.

If you're unsure where to start, these recommendations work well for most applications:

- Choose **Base64** if you want the simplest integration.
- Choose **SVG** if visual quality is your priority.
- Choose **CSS** when working with background images.
- Choose **Color** for minimal loading states and skeleton UIs.

The good news is that LoQIP generates every representation in a single call, so you can experiment with different approaches without changing your processing pipeline.
