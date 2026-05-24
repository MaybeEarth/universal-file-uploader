# Universal File Uploader

Local-first, zero-dependency Vanilla Web Component for drag-and-drop file selection, trust reporting, performance benchmarking, client-side image optimization, recovery-lite, and optional upload adapters.

```html
<script type="module" src="./universal-file-uploader.js"></script>
<universal-file-uploader id="uploader" preset="strict" max-file-size="5MB" multiple show-report></universal-file-uploader>
<script>document.querySelector("#uploader").onUploadSuccess = ({ files }) => console.log(files);</script>
```

## Project Files

- `universal-file-uploader.js`: the production Web Component, shipped as a standalone ESM file.
- `universal-file-uploader.d.ts`: TypeScript declarations for the public API, payloads, items, reports, and transport adapter.
- `demo.html`: interactive local demo with trust reports, image optimization, risky-file validation, headless mode, and mock resumable upload.
- `README.md`: integration guide and API overview.

## Quick Start

This project does not need a bundler. Serve the folder with any static server and open the demo:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4173/demo.html`.

In your own project, copy `universal-file-uploader.js` and optionally `universal-file-uploader.d.ts`, then import the JS file with `type="module"`.

## Positioning

Universal File Uploader is intentionally not a hosted upload platform. It is a small app-owned uploader that gives developers security and performance insight before a file reaches their server.

| Product | Strength | Tradeoff | Universal File Uploader angle |
| --- | --- | --- | --- |
| Uppy | Plugins, Tus/S3, remote providers, recovery | Larger orchestration surface | Smaller local-first component with built-in trust report |
| FilePond | Polished UI and image plugins | Advanced flows rely on plugin setup | Built-in Canvas optimizer, variants, and reports |
| Dropzone | XHR queue, chunking, retry settings | Older library-style integration | Modern Web Component plus typed events |
| react-dropzone | Lightweight React drop hook | Not an uploader or processor | Framework-free processing and upload lifecycle |
| Uploadcare | Hosted infrastructure and cloud sources | Vendor/provider dependency | App-owned backend, no lock-in |

## Highlights

- Single ESM file, no runtime dependencies, no framework lock-in.
- Trust Report per file: `declaredType`, `detectedType`, `signatureStatus`, `riskFlags`, before/after size, dimensions, and warnings.
- Benchmark Report per file: validation, optimization, preview, upload, memory guard, canvas pixels, and variant bytes.
- Security presets: `images`, `documents`, and `strict`.
- Dangerous type policy for SVG/HTML/XML-style content: `reject`, `warn`, or `allow`.
- Native Canvas optimization with `webp`, `avif`, `jpeg`, `png`, or `auto` output.
- Optional `fetch`, `xhr`, `chunked`, custom function transport, or chunk adapter contract.
- Resumable chunk manifest with `uploadId`, `chunkHashes`, `completedChunks`, and `resumeToken`.
- Headless mode for custom UI: `<universal-file-uploader headless>`.

## Common Usage

Image uploader with optimization and reports:

```html
<universal-file-uploader
  id="images"
  preset="images"
  output-format="auto"
  image-max-width="1600"
  multiple
  show-report
></universal-file-uploader>
```

Document uploader with validation only:

```html
<universal-file-uploader
  id="docs"
  preset="documents"
  optimize-images="false"
  max-file-size="12MB"
></universal-file-uploader>
```

Headless mode for your own UI:

```html
<universal-file-uploader id="headless" headless preset="images"></universal-file-uploader>
<script>
  const uploader = document.querySelector("#headless");
  uploader.onChange = ({ items }) => renderYourOwnUI(items);
</script>
```

## API Overview

The full typed surface is in `universal-file-uploader.d.ts`. Main options:

| Property / Attribute | Default | Description |
| --- | --- | --- |
| `preset` | empty | `images`, `documents`, or `strict` defaults. |
| `headless` | `false` | Hide built-in UI while keeping state, callbacks, and events. |
| `reportLevel` / `report-level` | `full` | `none`, `basic`, or `full` report payload detail. |
| `showReport` / `show-report` | `false` | Render trust/performance report details in the file list. |
| `dangerousTypesPolicy` / `dangerous-types-policy` | `reject` | `reject`, `warn`, or `allow` risky SVG/HTML/XML-style content. |
| `hashChunks` / `hash-chunks` | `false` | Generate SHA-256 hashes for chunk manifests. |
| `resumeUploads` / `resume-uploads` | `false` | Reuse chunk manifest and resume tokens when available. |
| `reorderable` | `false` | Enable up/down controls and Arrow key reordering. |
| `allowedTypes` / `allowed-types` | `[]` | MIME types, wildcards like `image/*`, or extensions like `.pdf`. |
| `maxFileSize` / `max-file-size` | `5MB` | Maximum final file size. Images are checked after optimization. |
| `maxTotalSize` / `max-total-size` | none | Maximum total accepted size. |
| `minFileSize` / `min-file-size` | `0` | Minimum accepted original file size. |
| `maxFiles` / `max-files` | none | Maximum accepted file count. |
| `multiple` | `false` | Allow multiple files. |
| `dedupe` | `false` | Reject duplicate name/size/type/lastModified signatures. |
| `directory` | `false` | Enable directory selection where supported. |
| `capture` | empty | Forwarded to the native file input. |
| `locale` | `en` | Built-in labels support `en` and `tr`. |
| `theme` | `light` | `light`, `dark`, or `auto`. |
| `view` | `list` | `list`, `grid`, or `compact`. |
| `optimizeImages` / `optimize-images` | `true` | Optimize supported images before upload. |
| `outputFormat` / `output-format` | `webp` | `auto`, `avif`, `webp`, `jpeg`, `png`. |
| `preferAvif` / `prefer-avif` | `false` | Prefer AVIF when `outputFormat="auto"` and supported. |
| `imageMaxWidth` / `image-max-width` | `1920` | Maximum optimized image width. |
| `imageMaxHeight` / `image-max-height` | `1920` | Maximum optimized image height. |
| `imageQuality` / `image-quality` | `0.8` | Canvas export quality. |
| `skipIfSmaller` / `skip-if-smaller` | `true` | Keep the original when optimization would make it larger. |
| `variants` | `[]` | Array of image variant configs. Set via property or JSON attribute. |
| `autoUpload` / `auto-upload` | `false` | Upload automatically after files become ready. |
| `transport` | `none` | `none`, `fetch`, `xhr`, `chunked`, custom function, or chunk adapter object. |
| `endpoint` | empty | Upload endpoint for built-in transports. |
| `headers` | `{}` | Static headers or async header factory. |
| `fieldName` / `field-name` | `files` | FormData field name. |
| `chunkSize` / `chunk-size` | `2MB` | Chunk size for chunked transport. |
| `retryDelays` / `retry-delays` | `0,1000,3000` | Retry delays for chunked uploads. |
| `persistSession` / `persist-session` | `false` | Boolean or string key for IndexedDB restore. |

## Item Shape

Each accepted or rejected file appears as an item:

```js
{
  id, file, originalFile, status, progress, error,
  optimized, compressionRatio, dimensions, variants,
  detectedType, warnings, trustReport, performanceReport,
  before, after, chunkManifest, resumeToken
}
```

Statuses are `queued`, `validating`, `optimizing`, `ready`, `uploading`, `success`, `error`, and `removed`.

## Events And Callbacks

Callbacks receive one payload object. Every callback also has a bubbling CustomEvent equivalent.

- `onUploadSuccess` / `upload-success`
- `onUploadError` / `upload-error`
- `onChange` / `files-change`
- `onProgress` / `file-progress`
- `onRemove` / `file-remove`
- `onUploadStart` / `upload-start`
- `onUploadComplete` / `upload-complete`
- V3 events: `trust-report`, `benchmark-complete`, `chunk-complete`, `upload-resume-ready`, `file-reorder`

## Upload Examples

Simple XHR upload:

```js
const uploader = document.querySelector("universal-file-uploader");
uploader.transport = "xhr";
uploader.endpoint = "/api/uploads";
uploader.onUploadComplete = ({ uploadedItems, errors }) => {
  console.log(uploadedItems, errors);
};
```

Custom direct transport:

```js
uploader.transport = async ({ file, onProgress, signal }) => {
  for (let progress = 0; progress <= 100; progress += 20) {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    onProgress(progress);
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
  return { ok: true, fileName: file.name };
};
```

Resumable chunk adapter:

```js
uploader.transport = {
  async start({ manifest }) {
    return { resumeToken: manifest.resumeToken };
  },
  async resume({ manifest }) {
    return { completedChunks: manifest.completedChunks };
  },
  async uploadChunk({ chunkIndex, chunkHash }) {
    return { ok: true, chunkIndex, chunkHash };
  },
  async complete({ manifest }) {
    return { ok: true, uploadId: manifest.uploadId };
  },
};
uploader.hashChunks = true;
uploader.resumeUploads = true;
```

## Browser Support

Targets modern browsers with Web Components, ES modules, File API, Canvas, and IndexedDB. Image optimization uses `createImageBitmap` when available and falls back to `Image`. AVIF/WebP output is capability checked and falls back where needed.

## Security Note

Client-side validation improves UX and reduces wasted bandwidth, but it is not a security boundary. Always validate type, size, content, authentication, and authorization again on the server.

