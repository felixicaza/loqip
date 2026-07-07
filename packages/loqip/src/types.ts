import type { Metadata } from '@napi-rs/image'

export interface GetLoqipOptions {
  /**
   * Automatically orient the image using its EXIF orientation metadata.
   * @default false
   */
  autoOrient?: boolean;

  /**
   * Size of the generated placeholder image, in pixels.
   * Must be an integer between 4 and 64.
   * @default 4
   */
  size?: number;

  /**
   * Output image format for the generated placeholder.
   * @default "webp"
   */
  format?: ImageFormats;

  /**
   * Brightness multiplier applied to the image.
   * @default 1
   */
  brightness?: number;

  /**
   * Saturation multiplier applied to the image.
   * @default 1.2
   */
  saturation?: number;

  /**
   * Hue rotation, in degrees.
   * No transformation is applied when omitted.
   */
  hue?: number;

  /**
   * Remove the alpha channel from transparent images.
   * @default false
   */
  removeAlpha?: boolean;

  /**
   * Include the image EXIF metadata in the returned result.
   * @default false
   */
  getExif?: boolean;
}

export type GetLoqipSrc = Buffer | Uint8Array
export type GetLoqipPixels = GetLoqipPixel[][]
export type ImageFormats = 'png' | 'jpg' | 'jpeg' | 'webp' | 'avif'
export type PipelineOptions = Required<Pick<GetLoqipOptions, 'autoOrient' | 'size' | 'brightness' | 'saturation' | 'removeAlpha'>> & Pick<GetLoqipOptions, 'hue'>

export interface GetLoqipPixel {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface GetLoqipColor {
  hex: string;
  r: number;
  g: number;
  b: number;
}

export interface GetLoqipCSS {
  backgroundImage: string;
  backgroundPosition: string;
  backgroundSize: string;
  backgroundRepeat: 'no-repeat';
}

export type GetLoqipSVGRect = [
  'rect',
  {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    'fill-opacity': number;
  }
]

export type GetLoqipSVG = [
  'svg',
  {
    xmlns: string;
    viewBox: string;
    width: string;
    height: string;
    preserveAspectRatio: string;
    shapeRendering: string;
    style: {
      position: string;
      top: string;
      left: string;
      transformOrigin: string;
      transform: string;
      right: number;
      bottom: number;
    };
  },
  GetLoqipSVGRect[]
]

export interface GetLoqipMetadata
  extends Omit<Metadata, 'width' | 'height'> {
  width: number;
  height: number;
  originalFormat: string;
  originalWidth: number;
  originalHeight: number;
}

export interface GetLoqipReturn {
  metadata: GetLoqipMetadata;
  base64: string;
  color: GetLoqipColor;
  pixels: GetLoqipPixels;
  css: GetLoqipCSS;
  svg: GetLoqipSVG;
}
