---
title: Benchmarks
description: Benchmarks Page
---

LoQIP is designed to generate high-quality placeholders with as little processing time as possible. The library focuses on keeping latency low while maintaining visually pleasing results, making it well suited for production environments and image-heavy applications.

## Analysis

To evaluate its performance, LoQIP was benchmarked against [**Plaiceholder**](https://plaiceholder.co/) using the same input images and **100 samples per test case**.

| Image | LoQIP | Plaiceholder | Speedup |
| --- | ---: | ---: | ---: |
| [`landscape-exif.jpg`][fixtures] | ~55 ms | ~101 ms | **1.8×** |
| [`pexels-fabianwiktor-3470872.jpg`][fixtures] | ~711 ms | ~825 ms | **1.2×** |
| [`portrait-exif.jpg`][fixtures] | ~52 ms | ~125 ms | **2.4×** |
| [`transparent.png`][fixtures] | ~65 ms | ~316 ms | **4.9×** |

Across all benchmarked images, LoQIP consistently achieved lower latency than Plaiceholder, with speed improvements ranging from **1.2×** to **4.9×**, depending on the image characteristics.

## Why is it faster?

LoQIP is built with performance as a primary goal.

Some of the factors that contribute to its speed include:

- A lightweight processing pipeline with minimal overhead.
- Efficient image decoding powered by [`@napi-rs/image`](https://image.napi.rs/).
- Optimized placeholder generation algorithms.
- A simple API that avoids unnecessary processing steps.

The result is a library that can generate placeholders quickly enough for production workloads without sacrificing output quality.

## Benchmark details

The reported numbers represent average execution times collected over **100 runs** for each image.

Performance can vary depending on several factors, including:

- CPU architecture
- Available system resources
- JavaScript runtime and version
- Input image dimensions
- Image format and compression

Because of these variables, your results may differ from the benchmark presented here.

## Reproducing the benchmarks

The complete benchmark implementation, test images, and raw results are available in the project's [`benchmark`](https://github.com/felixicaza/loqip/tree/main/benchmark) directory.

If you'd like to compare LoQIP against other libraries or test it on your own hardware, you can run the benchmark suite locally.

[fixtures]: https://github.com/felixicaza/loqip/tree/main/packages/loqip/tests/fixtures
