[![loqip](https://raw.githubusercontent.com/felixicaza/loqip/HEAD/.github/assets/loqip.jpg)][website]

# 🏞️ LoQIP

[![npm version](https://img.shields.io/npm/v/loqip?color=4dae5f&logo=npm&logoColor=888888&labelColor=ffffff)][package]
[![GitHub actions workflow tests status](https://img.shields.io/github/actions/workflow/status/felixicaza/loqip/tests.yml?color=4dae5f&logo=rocket&logoColor=888888&label=tests&labelColor=ffffff)](https://github.com/felixicaza/loqip/actions/workflows/tests.yml)
[![license](https://img.shields.io/badge/license-MIT-4dae5f?logo=googledocs&logoColor=888888&labelColor=ffffff)](https://github.com/felixicaza/loqip/blob/main/LICENSE)

A lightweight, fast, multi-environment generator of beautiful low-quality image placeholders.

## ✨ Features

- 🖼️ Generates low-quality image placeholders (LQIP) in multiple formats, including Base64, CSS, SVG and color.
- 📂 Supports decoding a wide range of image formats, with configurable output encoding. See [`@napi-rs/image` supported formats](https://image.napi.rs/docs#supported-formats).
- 🌐 Supports multiple environments, including server and browser.
- 🚀 Provides a simple and intuitive API for generating placeholders.
- ⚡ Optimized for performance and speed, making it suitable for production use.

## 📦 Installation

You can install [`LoQIP`][website] using npm:

```sh
$ npm install @napi-rs/image loqip
```

<details>
  <summary>Using a different package manager?</summary>
  <br/>

  Using pnpm:
  ```sh
  $ pnpm add @napi-rs/image loqip
  ```

  Using yarn:
  ```sh
  $ yarn add @napi-rs/image loqip
  ```

  Using bun:
  ```sh
  $ bun add @napi-rs/image loqip
  ```
</details>

## 🚀 Usage

You can use [`LoQIP`][website] as follows:

```ts
import { readFile } from 'node:fs/promises';
import { getLoqip } from 'loqip';

const image = new URL('./path/to/image.jpg', import.meta.url);
const buffer = await readFile(image);

const loqip = await getLoqip(buffer);

console.log(loqip.base64);
console.log(loqip.css);
console.log(loqip.svg);
console.log(loqip.color);
```

You can also use the `serializeSVG` method to generate a serialized SVG string:

```ts
import { readFile } from 'node:fs/promises';
import { getLoqip, serializeSVG } from 'loqip';

const image = new URL('./path/to/image.jpg', import.meta.url);
const buffer = await readFile(image);

const loqip = await getLoqip(buffer);

console.log(serializeSVG(loqip.svg));
```

## ⚙️ Options

The [`LoQIP`][website] library receives the following options:

#### `src` (buffer) — required

The image source to generate the LQIP.

#### `options` (object) — optional

An object containing configuration options for the LQIP process.

#### `options.autoOrient` (boolean) — (default: false)

Automatically orient the image using its EXIF orientation metadata.

#### `options.brightness` (number) — (default: 1)

Brightness multiplier applied to the image.

#### `options.format` (ImageFormats) — (default: webp)

Output image format for the generated placeholder.

#### `options.getExif` (boolean) — (default: false)

Include the image EXIF metadata in the returned result.

#### `options.hue` (number) — (default: undefined)

Hue rotation, in degrees. No transformation is applied when omitted.

#### `options.removeAlpha` (boolean) — (default: false)

Remove the alpha channel from transparent images.

#### `options.saturation` (number) — (default: 1.2)

Saturation multiplier applied to the image.

#### `options.size` (number) — (default: 4)

Size of the generated placeholder image, in pixels. Must be an integer between `4` and `64`.

<details>
  <summary>Example</summary>
  <br/>

  ```ts
  import { readFile } from 'node:fs/promises';
  import { getLoqip } from 'loqip';

  const image = new URL('./path/to/image.jpg', import.meta.url);
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

  console.log(loqip.base64);
  console.log(loqip.css);
  console.log(loqip.svg);
  console.log(loqip.color);
  ```
</details>

## 🏆 Credits

This project is highly inspired by [@joe-bell/plaiceholder](https://github.com/joe-bell/plaiceholder).

## 📝 Knowledge

Other related projects for the LQIP (Low-Quality Image Placeholders) technique:

- [`@zouhir/lqip`](https://github.com/zouhir/lqip): The original LQIP module.
- [`@transitive-bullshit/lqip-modern`](https://github.com/transitive-bullshit/lqip-modern): Modern approach to LQIP using webp and sharp.
- [`@axe312ger/sqip`](https://github.com/axe312ger/sqip): A library for SVG-based LQIP technique.
- [`@woltapp/blurhash`](https://github.com/woltapp/blurhash): A compact representation of a placeholder for an image.
- [`@evanw/thumbhash`](https://github.com/evanw/thumbhash): Alternative to BlurHash with some advantages.
- [`@frzi/lqip-css`](https://github.com/frzi/lqip-css): Demonstrating a pure CSS implementation for LQIP.

Good reading on the topic of LQIP and related techniques:

- [Introducing LQIP – Low Quality Image Placeholders](https://www.guypo.com/introducing-lqip-low-quality-image-placeholders)
- [How to use SVG as a Placeholder, and Other Image Loading Techniques](https://www.freecodecamp.org/news/using-svg-as-placeholders-more-image-loading-techniques-bed1b810ab2c/)
- [The Ultimate Low-Quality Image Placeholder Technique](https://csswizardry.com/2023/09/the-ultimate-lqip-lcp-technique/)

<!-- ## 📚 Related Projects -->

## 🤝 Contributing

Contributions to this library are welcome! If you have any ideas for improvements or new features, please feel free to open an issue or submit a pull request. I appreciate your help in making [`LoQIP`][website] better for everyone. Please read the [CONTRIBUTING.md](https://github.com/felixicaza/loqip/blob/main/CONTRIBUTING.md).

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/felixicaza/loqip/blob/main/LICENSE) file for details.

[website]: https://loqip.feli.cc/
[package]: https://npmx.dev/package/loqip
