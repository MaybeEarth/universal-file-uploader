const DEFAULTS = {
  allowedTypes: [],
  maxFileSize: "5MB",
  maxTotalSize: "",
  minFileSize: 0,
  maxFiles: Infinity,
  multiple: false,
  dedupe: false,
  directory: false,
  capture: "",
  locale: "en",
  labels: {},
  theme: "light",
  view: "list",
  autoUpload: false,
  transport: "none",
  endpoint: "",
  headers: {},
  fieldName: "files",
  chunkSize: "2MB",
  retryDelays: [0, 1000, 3000],
  persistSession: false,
  headless: false,
  preset: "",
  reportLevel: "full",
  hashChunks: false,
  resumeUploads: false,
  reorderable: false,
  showReport: false,
  dangerousTypesPolicy: "reject",
  optimizeImages: true,
  outputFormat: "webp",
  preferAvif: false,
  imageMaxWidth: 1920,
  imageMaxHeight: 1920,
  imageQuality: 0.8,
  skipIfSmaller: true,
  preserveOriginal: false,
  variants: [],
  concurrency: 2,
};

const OPTION_ATTRIBUTES = {
  "allowed-types": "allowedTypes",
  "max-file-size": "maxFileSize",
  "max-total-size": "maxTotalSize",
  "min-file-size": "minFileSize",
  "max-files": "maxFiles",
  multiple: "multiple",
  dedupe: "dedupe",
  directory: "directory",
  capture: "capture",
  locale: "locale",
  labels: "labels",
  theme: "theme",
  view: "view",
  "auto-upload": "autoUpload",
  transport: "transport",
  endpoint: "endpoint",
  headers: "headers",
  "field-name": "fieldName",
  "chunk-size": "chunkSize",
  "retry-delays": "retryDelays",
  "persist-session": "persistSession",
  headless: "headless",
  preset: "preset",
  "report-level": "reportLevel",
  "hash-chunks": "hashChunks",
  "resume-uploads": "resumeUploads",
  reorderable: "reorderable",
  "show-report": "showReport",
  "dangerous-types-policy": "dangerousTypesPolicy",
  "optimize-images": "optimizeImages",
  "output-format": "outputFormat",
  "prefer-avif": "preferAvif",
  "image-max-width": "imageMaxWidth",
  "image-max-height": "imageMaxHeight",
  "image-quality": "imageQuality",
  "skip-if-smaller": "skipIfSmaller",
  "preserve-original": "preserveOriginal",
  variants: "variants",
  concurrency: "concurrency",
};

const BOOLEAN_OPTIONS = new Set([
  "multiple",
  "dedupe",
  "directory",
  "autoUpload",
  "headless",
  "hashChunks",
  "resumeUploads",
  "reorderable",
  "showReport",
  "preferAvif",
  "optimizeImages",
  "skipIfSmaller",
  "preserveOriginal",
]);

const NUMERIC_OPTIONS = new Set([
  "imageMaxWidth",
  "imageMaxHeight",
  "imageQuality",
  "maxFiles",
  "concurrency",
]);

const BYTE_UNITS = {
  b: 1,
  kb: 1024,
  mb: 1024 ** 2,
  gb: 1024 ** 3,
  tb: 1024 ** 4,
};

const STATUS = {
  QUEUED: "queued",
  VALIDATING: "validating",
  OPTIMIZING: "optimizing",
  READY: "ready",
  UPLOADING: "uploading",
  SUCCESS: "success",
  ERROR: "error",
  REMOVED: "removed",
};

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
  "image/gif",
]);

const CANVAS_EXPORTS = {
  avif: "image/avif",
  webp: "image/webp",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
};

const EXTENSIONS = {
  "image/avif": ".avif",
  "image/webp": ".webp",
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

const SIGNATURE_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
  "image/svg+xml",
  "text/html",
  "application/xhtml+xml",
  "application/xml",
  "text/xml",
]);

const DANGEROUS_MIME_TYPES = new Set([
  "image/svg+xml",
  "text/html",
  "application/xhtml+xml",
  "application/xml",
  "text/xml",
]);

const DANGEROUS_EXTENSIONS = [".svg", ".html", ".htm", ".xhtml", ".xml"];

const PRESETS = {
  images: {
    allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    maxFileSize: "8MB",
    optimizeImages: true,
    outputFormat: "auto",
    dangerousTypesPolicy: "reject",
  },
  documents: {
    allowedTypes: ["application/pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt"],
    maxFileSize: "12MB",
    optimizeImages: true,
    dangerousTypesPolicy: "warn",
  },
  strict: {
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
    maxFileSize: "5MB",
    maxTotalSize: "20MB",
    dedupe: true,
    optimizeImages: true,
    outputFormat: "webp",
    dangerousTypesPolicy: "reject",
    reportLevel: "full",
  },
};

const DEFAULT_LABELS = {
  en: {
    title: "Drop files here or click to choose",
    ready: "Ready",
    processing: "Processing files...",
    uploading: "Uploading...",
    allTypes: "All file types",
    allowed: "Allowed",
    maxSize: "Max",
    multiple: "Multiple files",
    single: "Single file",
    optimized: "optimized",
    upload: "Upload",
    retry: "Retry",
    cancel: "Cancel",
    remove: "Remove",
    clear: "Clear",
    files: "files",
    total: "total",
    noLimit: "No limit",
    compression: "saved",
  },
  tr: {
    title: "Dosyalari buraya birak veya secmek icin tikla",
    ready: "Hazir",
    processing: "Dosyalar isleniyor...",
    uploading: "Yukleniyor...",
    allTypes: "Tum dosya turleri",
    allowed: "Izin verilen",
    maxSize: "Maksimum",
    multiple: "Coklu dosya",
    single: "Tek dosya",
    optimized: "optimize edildi",
    upload: "Yukle",
    retry: "Tekrar dene",
    cancel: "Iptal",
    remove: "Kaldir",
    clear: "Temizle",
    files: "dosya",
    total: "toplam",
    noLimit: "Limit yok",
    compression: "kazanc",
  },
};

const DB_NAME = "universal-file-uploader";
const DB_VERSION = 1;
const DB_STORE = "sessions";
const PERSIST_MAX_BYTES = 50 * 1024 * 1024;
const MAX_CANVAS_PIXELS = 16_777_216;

const exportSupportCache = new Map();

function createOptions() {
  return {
    ...DEFAULTS,
    allowedTypes: [...DEFAULTS.allowedTypes],
    labels: { ...DEFAULTS.labels },
    headers: { ...DEFAULTS.headers },
    retryDelays: [...DEFAULTS.retryDelays],
    variants: [...DEFAULTS.variants],
  };
}

function normalizeOption(name, value) {
  if (name === "allowedTypes") {
    return normalizeAllowedTypes(value);
  }

  if (name === "labels" || name === "headers") {
    if (typeof value === "string") {
      return parseJsonAttribute(value, {});
    }
    return value && typeof value === "object" ? value : {};
  }

  if (name === "variants") {
    if (typeof value === "string") {
      const parsed = parseJsonAttribute(value, []);
      return Array.isArray(parsed) ? parsed : [];
    }
    return Array.isArray(value) ? value : [];
  }

  if (name === "retryDelays") {
    if (Array.isArray(value)) {
      return value.map((delay) => Math.max(0, Number(delay) || 0));
    }
    if (typeof value === "string") {
      return value.split(",").map((delay) => Math.max(0, Number(delay.trim()) || 0));
    }
    return [...DEFAULTS.retryDelays];
  }

  if (BOOLEAN_OPTIONS.has(name)) {
    return coerceBoolean(value);
  }

  if (NUMERIC_OPTIONS.has(name)) {
    if (name === "imageQuality") {
      return clamp(Number(value), 0.01, 1, DEFAULTS.imageQuality);
    }
    if (name === "maxFiles") {
      return toPositiveIntegerOrInfinity(value, DEFAULTS.maxFiles);
    }
    if (name === "concurrency") {
      return toPositiveIntegerOrInfinity(value, DEFAULTS.concurrency);
    }
    return toPositiveNumber(value, DEFAULTS[name]);
  }

  if (name === "view") {
    return ["list", "grid", "compact"].includes(String(value)) ? String(value) : DEFAULTS.view;
  }

  if (name === "theme") {
    return ["light", "dark", "auto"].includes(String(value)) ? String(value) : DEFAULTS.theme;
  }

  if (name === "transport") {
    if (typeof value === "function" || (value && typeof value === "object")) {
      return value;
    }
    return ["none", "fetch", "xhr", "chunked"].includes(String(value)) ? String(value) : DEFAULTS.transport;
  }

  if (name === "preset") {
    const preset = String(value || "").trim();
    return preset in PRESETS ? preset : "";
  }

  if (name === "reportLevel") {
    const reportLevel = String(value || DEFAULTS.reportLevel).trim();
    return ["none", "basic", "full"].includes(reportLevel) ? reportLevel : DEFAULTS.reportLevel;
  }

  if (name === "dangerousTypesPolicy") {
    const policy = String(value || DEFAULTS.dangerousTypesPolicy).trim();
    return ["reject", "warn", "allow"].includes(policy) ? policy : DEFAULTS.dangerousTypesPolicy;
  }

  if (name === "outputFormat") {
    return ["auto", "avif", "webp", "jpeg", "jpg", "png"].includes(String(value))
      ? String(value)
      : DEFAULTS.outputFormat;
  }

  if (name === "persistSession") {
    if (value === "" || value === true) {
      return true;
    }
    if (value === null || value === undefined || value === false) {
      return false;
    }
    if (typeof value === "string" && ["false", "0", "no", "off"].includes(value.trim().toLowerCase())) {
      return false;
    }
    return value;
  }

  if (name in DEFAULTS) {
    return value ?? DEFAULTS[name];
  }

  return value;
}

function parseJsonAttribute(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function normalizeAllowedTypes(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeAllowedType).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(",").map(normalizeAllowedType).filter(Boolean);
  }
  return [];
}

function normalizeAllowedType(value) {
  return String(value || "").trim().toLowerCase();
}

function parseFileSize(value, fallback = Infinity) {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0 ? value : fallback;
  }

  const normalized = String(value).trim().replace(",", ".").toLowerCase();
  if (!normalized || normalized === "infinity" || normalized === "none") {
    return fallback;
  }

  const match = normalized.match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb|tb)?$/);
  if (!match) {
    return fallback;
  }

  const amount = Number(match[1]);
  const unit = match[2] || "b";
  return Math.round(amount * BYTE_UNITS[unit]);
}

function coerceBoolean(value) {
  if (value === "" || value === true) {
    return true;
  }
  if (value === null || value === undefined || value === false) {
    return false;
  }
  if (typeof value === "string") {
    return !["false", "0", "no", "off"].includes(value.trim().toLowerCase());
  }
  return Boolean(value);
}

function toPositiveNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function toPositiveIntegerOrInfinity(value, fallback) {
  if (value === Infinity || value === "Infinity" || value === "") {
    return Infinity;
  }
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : fallback;
}

function clamp(value, min, max, fallback) {
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;
}

function formatBytes(bytes, noLimitLabel = "No limit") {
  if (!Number.isFinite(bytes)) {
    return noLimitLabel;
  }
  if (bytes === 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB", "TB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const amount = bytes / 1024 ** index;
  const decimals = amount >= 10 || index === 0 ? 0 : 1;
  return `${amount.toFixed(decimals)} ${units[index]}`;
}

function formatPercent(value) {
  if (!Number.isFinite(value)) {
    return "0%";
  }
  return `${Math.round(value * 100)}%`;
}

function isImageFile(file) {
  return Boolean(file?.type && file.type.toLowerCase().startsWith("image/"));
}

function isOptimizableImage(file) {
  return IMAGE_TYPES.has((file?.type || "").toLowerCase());
}

function replaceExtension(fileName, mimeType) {
  const extension = EXTENSIONS[mimeType] || ".bin";
  const safeName = String(fileName || "file").trim() || "file";
  const baseName = safeName.replace(/\.[^/.\\]+$/, "") || "file";
  return `${baseName}${extension}`;
}

function signatureForFile(file) {
  return [
    file.name || "",
    file.size || 0,
    file.lastModified || 0,
    file.type || "",
  ].join("|").toLowerCase();
}

function makeId(prefix = "file") {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createError(file, code, message, options = {}) {
  return {
    code,
    message,
    file,
    name: file?.name || "",
    retryable: Boolean(options.retryable),
    stage: options.stage || "",
    cause: options.cause,
  };
}

function uniqueErrors(errors) {
  const seen = new Set();
  return errors.filter((error) => {
    const key = `${error.code}|${error.name}|${error.message}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function createItem(file, order) {
  const relativePath = file.webkitRelativePath || file.relativePath || "";
  const before = createFileSnapshot(file);
  return {
    id: makeId(),
    file,
    originalFile: file,
    status: STATUS.QUEUED,
    progress: 0,
    error: null,
    name: file.name || "file",
    size: file.size || 0,
    type: file.type || "application/octet-stream",
    optimized: false,
    compressionRatio: 1,
    dimensions: null,
    previewUrl: null,
    relativePath,
    uploadResponse: null,
    variants: [],
    detectedType: "",
    warnings: [],
    trustReport: createTrustReport(file, "", "pending", [], []),
    performanceReport: createPerformanceReport(),
    before,
    after: { ...before },
    chunkManifest: null,
    resumeToken: "",
    detailsOpen: false,
    _order: order,
    _urls: [],
    _abortController: null,
    _xhr: null,
  };
}

function publicVariant(variant) {
  return {
    name: variant.name,
    file: variant.file,
    size: variant.size,
    type: variant.type,
    dimensions: variant.dimensions,
    optimized: variant.optimized,
    compressionRatio: variant.compressionRatio,
  };
}

function publicItem(item) {
  return {
    id: item.id,
    file: item.file,
    originalFile: item.originalFile,
    status: item.status,
    progress: item.progress,
    error: item.error,
    name: item.name,
    size: item.size,
    type: item.type,
    optimized: item.optimized,
    compressionRatio: item.compressionRatio,
    dimensions: item.dimensions,
    previewUrl: item.previewUrl,
    relativePath: item.relativePath,
    uploadResponse: item.uploadResponse,
    variants: item.variants.map(publicVariant),
    detectedType: item.detectedType,
    warnings: [...item.warnings],
    trustReport: item.trustReport,
    performanceReport: item.performanceReport,
    before: item.before,
    after: item.after,
    chunkManifest: item.chunkManifest,
    resumeToken: item.resumeToken,
  };
}

function createFileSnapshot(file, dimensions = null) {
  return {
    name: file?.name || "",
    size: file?.size || 0,
    type: file?.type || "application/octet-stream",
    lastModified: file?.lastModified || 0,
    dimensions,
  };
}

function createTrustReport(file, detectedType = "", signatureStatus = "pending", riskFlags = [], warnings = []) {
  const declaredType = (file?.type || "").toLowerCase();
  const sizeBefore = file?.size || 0;
  return {
    declaredType,
    detectedType,
    signatureStatus,
    sizeBefore,
    sizeAfter: sizeBefore,
    compressionSaved: 0,
    dimensionsBefore: null,
    dimensionsAfter: null,
    riskFlags: [...riskFlags],
    warnings: [...warnings],
  };
}

function createPerformanceReport() {
  return {
    startedAt: 0,
    completedAt: 0,
    totalMs: 0,
    validationMs: 0,
    optimizationMs: 0,
    previewMs: 0,
    uploadMs: 0,
    memoryGuardApplied: false,
    canvasPixels: 0,
    variantCount: 0,
    variantBytes: 0,
  };
}

function nowMs() {
  return globalThis.performance?.now ? globalThis.performance.now() : Date.now();
}

function elapsed(start) {
  return Math.max(0, Math.round(nowMs() - start));
}

function updateCompressionReport(item) {
  const beforeSize = item.before?.size || item.originalFile?.size || 0;
  const afterSize = item.file?.size || 0;
  const saved = beforeSize > 0 ? Math.max(0, 1 - afterSize / beforeSize) : 0;
  item.after = createFileSnapshot(item.file, item.dimensions);
  item.trustReport = {
    ...item.trustReport,
    sizeAfter: afterSize,
    compressionSaved: saved,
    dimensionsBefore: item.before?.dimensions || item.trustReport.dimensionsBefore,
    dimensionsAfter: item.dimensions || item.trustReport.dimensionsAfter,
    warnings: [...item.warnings],
  };
}

function blobToCanvasBlob(canvas, type, quality) {
  if (canvas.convertToBlob) {
    return canvas.convertToBlob({ type, quality });
  }
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas conversion returned an empty blob."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("FileReader failed."));
    reader.readAsDataURL(file);
  });
}

function loadImageElement(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image decoding failed."));
    image.src = dataUrl;
  });
}

async function decodeImage(file) {
  if ("createImageBitmap" in globalThis) {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return {
        image: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close?.(),
      };
    } catch {
      const bitmap = await createImageBitmap(file);
      return {
        image: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close?.(),
      };
    }
  }

  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadImageElement(dataUrl);
  return {
    image,
    width: image.naturalWidth || image.width,
    height: image.naturalHeight || image.height,
    close: () => {},
  };
}

function createCanvas(width, height) {
  if ("OffscreenCanvas" in globalThis) {
    return new OffscreenCanvas(width, height);
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

async function canvasExportSupported(mimeType) {
  if (!mimeType) {
    return false;
  }
  if (exportSupportCache.has(mimeType)) {
    return exportSupportCache.get(mimeType);
  }

  const promise = (async () => {
    try {
      const canvas = createCanvas(1, 1);
      const context = canvas.getContext("2d");
      context.fillStyle = "#000";
      context.fillRect(0, 0, 1, 1);
      const blob = await blobToCanvasBlob(canvas, mimeType, 0.8);
      return blob.type === mimeType;
    } catch {
      return false;
    }
  })();

  exportSupportCache.set(mimeType, promise);
  return promise;
}

async function sniffFileSignature(file) {
  const bytes = new Uint8Array(await file.slice(0, 512).arrayBuffer());
  if (bytes.length >= 4 && bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return "application/pdf";
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "image/png";
  }
  if (bytes.length >= 6) {
    const gif = String.fromCharCode(...bytes.slice(0, 6));
    if (gif === "GIF87a" || gif === "GIF89a") {
      return "image/gif";
    }
  }
  if (bytes.length >= 12) {
    const riff = String.fromCharCode(...bytes.slice(0, 4));
    const webp = String.fromCharCode(...bytes.slice(8, 12));
    if (riff === "RIFF" && webp === "WEBP") {
      return "image/webp";
    }
  }
  if (bytes.length >= 2 && bytes[0] === 0x42 && bytes[1] === 0x4d) {
    return "image/bmp";
  }
  const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes).trim().toLowerCase();
  if (text.startsWith("<svg") || text.includes("<svg")) {
    return "image/svg+xml";
  }
  if (text.startsWith("<!doctype html") || text.startsWith("<html") || text.includes("<html")) {
    return "text/html";
  }
  if (text.startsWith("<?xml") || text.startsWith("<")) {
    return "application/xml";
  }
  return "";
}

function dangerousTypeFlags(file, detectedType) {
  const declaredType = (file.type || "").toLowerCase();
  const fileName = (file.name || "").toLowerCase();
  const flags = [];
  if (DANGEROUS_MIME_TYPES.has(declaredType) || DANGEROUS_MIME_TYPES.has(detectedType)) {
    flags.push("dangerous-mime");
  }
  if (DANGEROUS_EXTENSIONS.some((extension) => fileName.endsWith(extension))) {
    flags.push("dangerous-extension");
  }
  return flags;
}

async function hashBlob(blob) {
  if (!globalThis.crypto?.subtle) {
    return `${blob.size}-${blob.type || "blob"}`;
  }
  const digest = await crypto.subtle.digest("SHA-256", await blob.arrayBuffer());
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function allowedTypeMatches(file, allowedType, detectedType) {
  const fileType = (file.type || "").toLowerCase();
  const fileName = (file.name || "").toLowerCase();

  if (allowedType.endsWith("/*")) {
    const prefix = allowedType.slice(0, -1);
    return fileType.startsWith(prefix) || detectedType.startsWith(prefix);
  }
  if (allowedType.startsWith(".")) {
    return fileName.endsWith(allowedType);
  }
  return fileType === allowedType || detectedType === allowedType;
}

function isAllowedFileType(file, allowedTypes, detectedType) {
  if (!allowedTypes.length) {
    return true;
  }
  return allowedTypes.some((allowedType) => allowedTypeMatches(file, allowedType, detectedType));
}

function requiresKnownSignature(file, allowedTypes) {
  const fileType = (file.type || "").toLowerCase();
  if (SIGNATURE_TYPES.has(fileType)) {
    return true;
  }
  return allowedTypes.some((allowedType) => SIGNATURE_TYPES.has(allowedType));
}

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Upload aborted.", "AbortError"));
      return;
    }
    const timeout = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject(new DOMException("Upload aborted.", "AbortError"));
    }, { once: true });
  });
}

async function runWithConcurrency(items, limit, worker) {
  const safeLimit = Math.max(1, Math.min(Number(limit) || 1, items.length || 1));
  let cursor = 0;
  const workers = Array.from({ length: safeLimit }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index], index);
    }
  });
  await Promise.all(workers);
}

function openDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in globalThis)) {
      reject(new Error("IndexedDB is not available."));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(DB_STORE, { keyPath: "key" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbGet(key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readonly");
    const request = tx.objectStore(DB_STORE).get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

async function idbSet(record) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).put(record);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

async function idbDelete(key) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).delete(key);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

export class UniversalFileUploader extends HTMLElement {
  static get observedAttributes() {
    return Object.keys(OPTION_ATTRIBUTES);
  }

  constructor() {
    super();
    this._options = createOptions();
    this._items = [];
    this._errors = [];
    this._busy = false;
    this._dragDepth = 0;
    this._order = 0;
    this._loadingPersistence = false;
    this._persistTimer = 0;
    this.attachShadow({ mode: "open" });
    this._render();
    this._bindEvents();
  }

  connectedCallback() {
    for (const prop of Object.values(OPTION_ATTRIBUTES)) {
      this._upgradeProperty(prop);
    }
    this._applyPreset();
    this._syncInputAttributes();
    this._updateUI();
    this._restorePersistedSession();
  }

  disconnectedCallback() {
    clearTimeout(this._persistTimer);
    this._items.forEach((item) => this._revokeUrls(item));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    const prop = OPTION_ATTRIBUTES[name];
    if (!prop) {
      return;
    }
    const value = BOOLEAN_OPTIONS.has(prop) && newValue === null ? false : newValue;
    this._setOption(prop, value, { fromAttribute: true });
  }

  get items() {
    return this._items.filter((item) => item.status !== STATUS.REMOVED).map(publicItem);
  }

  get files() {
    return this._acceptedItems().map((item) => item.file);
  }

  get errors() {
    return [...this._errors];
  }

  async addFiles(files) {
    return this._handleFiles(Array.from(files || []));
  }

  async upload(ids) {
    const targetItems = this._resolveItems(ids).filter((item) => {
      return item.status === STATUS.READY || (item.status === STATUS.ERROR && item.error?.stage === "upload");
    });

    if (!targetItems.length || this._options.transport === "none") {
      return {
        items: this.items,
        files: this.files,
        uploadedItems: [],
        uploadedFiles: [],
        uploaded: [],
        errors: [],
        component: this,
      };
    }

    this._busy = true;
    this._updateUI();
    this._emit("upload-start", { items: targetItems.map(publicItem), files: targetItems.map((item) => item.file) });
    this._callUserCallback("onUploadStart", {
      items: targetItems.map(publicItem),
      files: targetItems.map((item) => item.file),
      component: this,
    });

    await runWithConcurrency(targetItems, this._options.concurrency, async (item) => {
      await this._uploadItem(item);
    });

    this._busy = false;
    this._updateUI();
    this._emitUploadComplete(targetItems);
    this._schedulePersist();

    const uploadedItems = targetItems.filter((item) => item.status === STATUS.SUCCESS).map(publicItem);
    const errors = targetItems.filter((item) => item.status === STATUS.ERROR).map((item) => item.error);

    return {
      items: this.items,
      files: this.files,
      uploadedItems,
      uploadedFiles: uploadedItems.map((item) => item.file),
      uploaded: uploadedItems,
      errors,
      component: this,
    };
  }

  async uploadFile(idOrItem) {
    const item = this._resolveItems([idOrItem])[0];
    if (!item) {
      return null;
    }
    await this.upload([item.id]);
    return publicItem(item);
  }

  retryUpload(idOrItem) {
    const item = this._resolveItems([idOrItem])[0];
    if (!item) {
      return Promise.resolve(null);
    }
    item.error = null;
    item.status = STATUS.READY;
    item.progress = 0;
    this._updateUI();
    return this.upload([item.id]);
  }

  cancelUpload(idOrItem) {
    const item = this._resolveItems([idOrItem])[0];
    if (!item || item.status !== STATUS.UPLOADING) {
      return false;
    }
    if (this._options.transport && typeof this._options.transport === "object" && typeof this._options.transport.abort === "function") {
      try {
        this._options.transport.abort({
          item: publicItem(item),
          file: item.file,
          component: this,
          signal: item._abortController?.signal,
          endpoint: this._options.endpoint,
          headers: {},
          fieldName: this._options.fieldName,
          onProgress: (progress) => this._setUploadProgress(item, progress),
          manifest: item.chunkManifest,
        });
      } catch {
        // Adapter abort is best-effort; local abort still proceeds.
      }
    }
    item._abortController?.abort();
    item._xhr?.abort();
    item.status = STATUS.READY;
    item.progress = 0;
    item.error = null;
    this._updateUI();
    this._emitChange();
    return true;
  }

  clear() {
    this._items.forEach((item) => {
      item.status = STATUS.REMOVED;
      this._revokeUrls(item);
    });
    this._items = [];
    this._errors = [];
    this._updateUI();
    this._emitChange();
    this._clearPersistedSession();
  }

  removeFile(idOrIndex) {
    const item = typeof idOrIndex === "number"
      ? this._items.filter((entry) => entry.status !== STATUS.REMOVED)[idOrIndex]
      : this._items.find((entry) => entry.id === idOrIndex);

    if (!item) {
      return false;
    }

    if (item.status === STATUS.UPLOADING) {
      this.cancelUpload(item.id);
    }

    item.status = STATUS.REMOVED;
    this._revokeUrls(item);
    this._items = this._items.filter((entry) => entry.status !== STATUS.REMOVED);
    this._updateUI();
    this._emitChange();
    this._callUserCallback("onRemove", { item: publicItem(item), component: this });
    this._emit("file-remove", { item: publicItem(item) });
    this._schedulePersist();
    return true;
  }

  moveFile(idOrItem, direction) {
    const itemId = typeof idOrItem === "object" ? idOrItem?.id : idOrItem;
    const visibleItems = this._items.filter((entry) => entry.status !== STATUS.REMOVED);
    const currentVisibleIndex = visibleItems.findIndex((entry) => entry.id === itemId);
    if (currentVisibleIndex < 0) {
      return false;
    }

    const nextVisibleIndex = Math.max(0, Math.min(visibleItems.length - 1, currentVisibleIndex + direction));
    if (nextVisibleIndex === currentVisibleIndex) {
      return false;
    }

    const fromItem = visibleItems[currentVisibleIndex];
    const toItem = visibleItems[nextVisibleIndex];
    const fromIndex = this._items.indexOf(fromItem);
    const toIndex = this._items.indexOf(toItem);
    this._items.splice(fromIndex, 1);
    this._items.splice(toIndex, 0, fromItem);
    this._items.forEach((entry, index) => {
      entry._order = index;
    });
    this._updateUI();
    this._emitChange();
    this._emit("file-reorder", { items: this.items, movedItem: publicItem(fromItem), component: this });
    this._schedulePersist();
    return true;
  }

  async clearPersistedSession() {
    await this._clearPersistedSession();
  }

  _upgradeProperty(propertyName) {
    if (Object.prototype.hasOwnProperty.call(this, propertyName)) {
      const value = this[propertyName];
      delete this[propertyName];
      this[propertyName] = value;
    }
  }

  _setOption(name, value) {
    this._options[name] = normalizeOption(name, value);
    if (name === "preset") {
      this._applyPreset();
    }
    if (name === "persistSession" && this.isConnected) {
      this._restorePersistedSession();
    }
    this._syncInputAttributes();
    this._updateUI();
  }

  _applyPreset() {
    const preset = PRESETS[this._options.preset];
    if (!preset) {
      return;
    }

    for (const [name, value] of Object.entries(preset)) {
      const attribute = Object.entries(OPTION_ATTRIBUTES).find(([, prop]) => prop === name)?.[0];
      const hasExplicitAttribute = attribute ? this.hasAttribute(attribute) : false;
      const current = this._options[name];
      const defaultValue = DEFAULTS[name];
      const isDefault = Array.isArray(current)
        ? current.length === 0
        : current === defaultValue || current === "" || current === Infinity;

      if (!hasExplicitAttribute && isDefault) {
        this._options[name] = normalizeOption(name, value);
      }
    }
  }

  _label(key, variables = {}) {
    const locale = this._options.locale in DEFAULT_LABELS ? this._options.locale : "en";
    const labels = {
      ...DEFAULT_LABELS.en,
      ...DEFAULT_LABELS[locale],
      ...this._options.labels,
    };
    const template = labels[key] || DEFAULT_LABELS.en[key] || key;
    return Object.entries(variables).reduce((text, [name, value]) => {
      return text.replaceAll(`{${name}}`, value);
    }, template);
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --uploader-accent: #2563eb;
          --uploader-accent-strong: #1d4ed8;
          --uploader-accent-soft: #eff6ff;
          --uploader-border: #cbd5e1;
          --uploader-border-strong: #94a3b8;
          --uploader-danger: #dc2626;
          --uploader-danger-soft: #fef2f2;
          --uploader-success: #16a34a;
          --uploader-success-soft: #dcfce7;
          --uploader-warning: #ca8a04;
          --uploader-warning-soft: #fef9c3;
          --uploader-text: #111827;
          --uploader-muted: #64748b;
          --uploader-surface: #ffffff;
          --uploader-surface-soft: #f8fafc;
          display: block;
          color: var(--uploader-text);
          font-family:
            Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
            "Segoe UI", sans-serif;
        }

        :host([hidden]) {
          display: none;
        }

        * {
          box-sizing: border-box;
        }

        .uploader {
          width: 100%;
        }

        .uploader.theme-dark {
          --uploader-accent: #60a5fa;
          --uploader-accent-strong: #93c5fd;
          --uploader-accent-soft: #172554;
          --uploader-border: #334155;
          --uploader-border-strong: #64748b;
          --uploader-danger: #f87171;
          --uploader-danger-soft: #450a0a;
          --uploader-success: #4ade80;
          --uploader-success-soft: #052e16;
          --uploader-warning: #facc15;
          --uploader-warning-soft: #422006;
          --uploader-text: #f8fafc;
          --uploader-muted: #cbd5e1;
          --uploader-surface: #0f172a;
          --uploader-surface-soft: #111827;
        }

        @media (prefers-color-scheme: dark) {
          .uploader.theme-auto {
            --uploader-accent: #60a5fa;
            --uploader-accent-strong: #93c5fd;
            --uploader-accent-soft: #172554;
            --uploader-border: #334155;
            --uploader-border-strong: #64748b;
            --uploader-danger: #f87171;
            --uploader-danger-soft: #450a0a;
            --uploader-success: #4ade80;
            --uploader-success-soft: #052e16;
            --uploader-warning: #facc15;
            --uploader-warning-soft: #422006;
            --uploader-text: #f8fafc;
            --uploader-muted: #cbd5e1;
            --uploader-surface: #0f172a;
            --uploader-surface-soft: #111827;
          }
        }

        .drop-zone {
          appearance: none;
          width: 100%;
          min-height: 168px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 24px;
          border: 2px dashed var(--uploader-border);
          border-radius: 8px;
          background: var(--uploader-surface-soft);
          color: inherit;
          cursor: pointer;
          text-align: center;
          transition:
            background-color 160ms ease,
            border-color 160ms ease,
            box-shadow 160ms ease,
            transform 160ms ease;
        }

        .drop-zone:hover,
        .drop-zone:focus-visible {
          border-color: var(--uploader-accent);
          background: var(--uploader-accent-soft);
          box-shadow: 0 0 0 4px color-mix(in srgb, var(--uploader-accent) 16%, transparent);
          outline: none;
        }

        .uploader.is-dragging .drop-zone {
          border-color: var(--uploader-accent);
          background: var(--uploader-accent-soft);
          transform: translateY(-1px);
        }

        .uploader.is-error .drop-zone {
          border-color: var(--uploader-danger);
          background: var(--uploader-danger-soft);
        }

        .uploader.is-busy .drop-zone {
          cursor: progress;
        }

        .icon,
        .file-icon,
        .action {
          display: inline-grid;
          place-items: center;
          flex: 0 0 auto;
        }

        .icon {
          width: 46px;
          height: 46px;
          border-radius: 999px;
          background: var(--uploader-accent-soft);
          color: var(--uploader-accent-strong);
        }

        svg {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .title {
          max-width: 38rem;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.35;
        }

        .hint {
          max-width: 44rem;
          color: var(--uploader-muted);
          font-size: 0.875rem;
          line-height: 1.45;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid color-mix(in srgb, var(--uploader-accent) 24%, transparent);
          border-top-color: var(--uploader-accent);
          border-radius: 999px;
          animation: spin 700ms linear infinite;
        }

        .message {
          margin-top: 10px;
          color: var(--uploader-muted);
          font-size: 0.875rem;
          line-height: 1.45;
        }

        .message.is-error {
          color: var(--uploader-danger);
        }

        .summary {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 12px;
          padding: 10px 12px;
          border: 1px solid var(--uploader-border);
          border-radius: 8px;
          background: var(--uploader-surface);
          color: var(--uploader-muted);
          font-size: 0.85rem;
        }

        .summary strong {
          color: var(--uploader-text);
        }

        .summary-actions {
          display: inline-flex;
          gap: 8px;
        }

        .file-list {
          display: grid;
          gap: 8px;
          margin: 14px 0 0;
          padding: 0;
          list-style: none;
        }

        .uploader.view-grid .file-list {
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }

        .file-item {
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr) auto;
          align-items: center;
          gap: 12px;
          min-width: 0;
          padding: 10px;
          border: 1px solid var(--uploader-border);
          border-radius: 8px;
          background: var(--uploader-surface);
        }

        .uploader.view-grid .file-item {
          grid-template-columns: 1fr;
          align-items: stretch;
        }

        .uploader.view-compact .file-item {
          grid-template-columns: 32px minmax(0, 1fr) auto;
          padding: 8px;
        }

        .file-item.is-error {
          border-color: color-mix(in srgb, var(--uploader-danger) 44%, var(--uploader-border));
          background: color-mix(in srgb, var(--uploader-danger-soft) 70%, var(--uploader-surface));
        }

        .thumbnail,
        .file-icon {
          width: 48px;
          height: 48px;
          border: 1px solid var(--uploader-border);
          border-radius: 6px;
          background: var(--uploader-surface-soft);
        }

        .uploader.view-grid .thumbnail,
        .uploader.view-grid .file-icon {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 10;
        }

        .uploader.view-compact .thumbnail,
        .uploader.view-compact .file-icon {
          width: 32px;
          height: 32px;
        }

        .thumbnail {
          display: block;
          object-fit: cover;
        }

        .file-icon {
          color: var(--uploader-border-strong);
        }

        .file-details {
          min-width: 0;
          display: grid;
          gap: 5px;
        }

        .file-name {
          overflow: hidden;
          color: var(--uploader-text);
          font-size: 0.925rem;
          font-weight: 700;
          line-height: 1.25;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          color: var(--uploader-muted);
          font-size: 0.8rem;
          line-height: 1.3;
        }

        .report {
          margin-top: 2px;
          color: var(--uploader-muted);
          font-size: 0.78rem;
        }

        .report summary {
          cursor: pointer;
          font-weight: 700;
        }

        .report pre {
          max-height: 190px;
          margin: 6px 0 0;
          overflow: auto;
          padding: 8px;
          border: 1px solid var(--uploader-border);
          border-radius: 8px;
          background: var(--uploader-surface-soft);
          color: var(--uploader-text);
          font: 0.75rem/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          white-space: pre-wrap;
        }

        .progress {
          width: 100%;
          height: 6px;
          overflow: hidden;
          border-radius: 999px;
          background: color-mix(in srgb, var(--uploader-accent) 18%, transparent);
        }

        .progress-bar {
          display: block;
          width: 0%;
          height: 100%;
          border-radius: inherit;
          background: var(--uploader-accent);
          transition: width 160ms ease;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          min-height: 20px;
          padding: 2px 7px;
          border-radius: 999px;
          background: var(--uploader-success-soft);
          color: var(--uploader-success);
          font-size: 0.72rem;
          font-weight: 700;
          line-height: 1;
        }

        .badge.warning {
          background: var(--uploader-warning-soft);
          color: var(--uploader-warning);
        }

        .badge.error {
          background: var(--uploader-danger-soft);
          color: var(--uploader-danger);
        }

        .actions {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .action,
        .text-action {
          min-width: 32px;
          height: 32px;
          border: 1px solid transparent;
          border-radius: 8px;
          background: transparent;
          color: var(--uploader-muted);
          cursor: pointer;
          transition:
            background-color 140ms ease,
            border-color 140ms ease,
            color 140ms ease;
        }

        .text-action {
          width: auto;
          padding: 0 10px;
          font: inherit;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .action:hover,
        .action:focus-visible,
        .text-action:hover,
        .text-action:focus-visible {
          border-color: var(--uploader-border);
          background: var(--uploader-surface-soft);
          color: var(--uploader-text);
          outline: none;
        }

        .action.danger:hover,
        .action.danger:focus-visible {
          border-color: color-mix(in srgb, var(--uploader-danger) 35%, transparent);
          background: var(--uploader-danger-soft);
          color: var(--uploader-danger);
        }

        [hidden] {
          display: none !important;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 560px) {
          .drop-zone {
            min-height: 148px;
            padding: 18px;
          }

          .file-item {
            grid-template-columns: 40px minmax(0, 1fr);
          }

          .actions {
            grid-column: 1 / -1;
            justify-content: flex-end;
          }

          .thumbnail,
          .file-icon {
            width: 40px;
            height: 40px;
          }
        }
      </style>

      <div class="uploader" part="root">
        <input id="file-input" type="file" hidden />
        <button class="drop-zone" id="drop-zone" type="button" part="drop-zone" aria-describedby="uploader-hint uploader-message">
          <span class="icon" id="idle-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <path d="M17 8l-5-5-5 5"></path>
              <path d="M12 3v12"></path>
            </svg>
          </span>
          <span class="spinner" id="spinner" hidden aria-hidden="true"></span>
          <span class="title" id="uploader-title"><slot name="title"></slot></span>
          <span class="hint" id="uploader-hint"></span>
        </button>
        <div class="message" id="uploader-message" role="status" aria-live="polite" hidden></div>
        <div class="summary" id="summary" hidden>
          <span id="summary-text"></span>
          <span class="summary-actions">
            <button class="text-action" type="button" id="upload-all" hidden></button>
            <button class="text-action" type="button" id="clear-all"></button>
          </span>
        </div>
        <ul class="file-list" id="file-list" aria-label="Selected files"></ul>
      </div>
    `;

    this._root = this.shadowRoot.querySelector(".uploader");
    this._input = this.shadowRoot.getElementById("file-input");
    this._zone = this.shadowRoot.getElementById("drop-zone");
    this._hint = this.shadowRoot.getElementById("uploader-hint");
    this._title = this.shadowRoot.getElementById("uploader-title");
    this._message = this.shadowRoot.getElementById("uploader-message");
    this._summary = this.shadowRoot.getElementById("summary");
    this._summaryText = this.shadowRoot.getElementById("summary-text");
    this._uploadAll = this.shadowRoot.getElementById("upload-all");
    this._clearAll = this.shadowRoot.getElementById("clear-all");
    this._list = this.shadowRoot.getElementById("file-list");
    this._idleIcon = this.shadowRoot.getElementById("idle-icon");
    this._spinner = this.shadowRoot.getElementById("spinner");
  }

  _bindEvents() {
    this._zone.addEventListener("click", () => {
      if (!this._busy) {
        this._input.click();
      }
    });

    this._zone.addEventListener("dragenter", (event) => {
      event.preventDefault();
      this._dragDepth += 1;
      this._updateUI();
    });

    this._zone.addEventListener("dragover", (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
      this._updateUI();
    });

    this._zone.addEventListener("dragleave", (event) => {
      event.preventDefault();
      this._dragDepth = Math.max(0, this._dragDepth - 1);
      this._updateUI();
    });

    this._zone.addEventListener("drop", (event) => {
      event.preventDefault();
      this._dragDepth = 0;
      this.addFiles(event.dataTransfer.files).catch((error) => this._handleUnexpectedError(error));
    });

    this._input.addEventListener("change", (event) => {
      this.addFiles(event.target.files).catch((error) => this._handleUnexpectedError(error));
      event.target.value = "";
    });

    this._list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-action]");
      if (!button) {
        return;
      }
      const itemId = button.dataset.id;
      const action = button.dataset.action;
      if (action === "remove") {
        this.removeFile(itemId);
      } else if (action === "upload") {
        this.upload([itemId]);
      } else if (action === "retry") {
        this.retryUpload(itemId);
      } else if (action === "cancel") {
        this.cancelUpload(itemId);
      } else if (action === "move-up") {
        this.moveFile(itemId, -1);
      } else if (action === "move-down") {
        this.moveFile(itemId, 1);
      }
    });

    this._list.addEventListener("keydown", (event) => {
      if (!this._options.reorderable || !["ArrowUp", "ArrowDown"].includes(event.key)) {
        return;
      }
      const row = event.target.closest("[data-item-id]");
      if (!row) {
        return;
      }
      event.preventDefault();
      this.moveFile(row.dataset.itemId, event.key === "ArrowUp" ? -1 : 1);
    });

    this._uploadAll.addEventListener("click", () => {
      this.upload();
    });

    this._clearAll.addEventListener("click", () => {
      this.clear();
    });
  }

  async _handleFiles(files) {
    const incomingFiles = files.filter((file) => file instanceof File);
    if (!incomingFiles.length) {
      return { items: this.items, files: this.files, addedItems: [], addedFiles: [], errors: [] };
    }

    const errors = [];
    const candidates = [];
    const maxFiles = this._options.maxFiles;
    const currentAcceptedCount = this._acceptedItems().length;
    let plannedAcceptedCount = currentAcceptedCount;
    const existingSignatures = new Set(this._items.map((item) => signatureForFile(item.originalFile)));
    const seenSignatures = new Set();
    const filesToConsider = this._options.multiple ? incomingFiles : incomingFiles.slice(0, 1);

    if (!this._options.multiple) {
      this._items.forEach((item) => this._revokeUrls(item));
      this._items = [];
      plannedAcceptedCount = 0;

      if (incomingFiles.length > 1) {
        for (const file of incomingFiles.slice(1)) {
          errors.push(createError(file, "multiple-not-allowed", `Only one file can be selected. "${file.name}" was skipped.`));
        }
      }
    }

    for (const file of filesToConsider) {
      if (Number.isFinite(maxFiles) && plannedAcceptedCount >= maxFiles) {
        errors.push(createError(file, "max-files-exceeded", `"${file.name}" exceeds the maximum file count of ${maxFiles}.`));
        continue;
      }

      const signature = signatureForFile(file);
      if (this._options.dedupe && (existingSignatures.has(signature) || seenSignatures.has(signature))) {
        errors.push(createError(file, "duplicate-file", `"${file.name}" was skipped because it is already selected.`));
        continue;
      }

      seenSignatures.add(signature);
      plannedAcceptedCount += 1;
      const item = createItem(file, this._order);
      this._order += 1;
      candidates.push(item);
      this._items.push(item);
    }

    this._errors = errors;
    this._busy = candidates.length > 0;
    this._updateUI();

    await runWithConcurrency(candidates, this._options.concurrency, async (item) => {
      await this._processItem(item);
    });

    this._enforceTotalSize(candidates);
    this._busy = false;

    const readyItems = candidates.filter((item) => item.status === STATUS.READY);
    const itemErrors = candidates.filter((item) => item.status === STATUS.ERROR).map((item) => item.error);
    this._errors = [...errors, ...itemErrors].filter(Boolean);
    this._updateUI();

    if (readyItems.length) {
      this._emitReady(readyItems);
    }
    if (this._errors.length) {
      this._emitErrors(this._errors);
    }

    this._emitChange();
    this._schedulePersist();

    if (this._options.autoUpload && readyItems.length) {
      await this.upload(readyItems.map((item) => item.id));
    }

    return {
      items: this.items,
      files: this.files,
      addedItems: readyItems.map(publicItem),
      addedFiles: readyItems.map((item) => item.file),
      errors: this._errors,
    };
  }

  async _processItem(item) {
    item.performanceReport.startedAt = Date.now();
    const totalStart = nowMs();
    try {
      item.status = STATUS.VALIDATING;
      item.progress = 8;
      this._updateUI();
      this._emitProgress(item);

      const beforeValidate = await this._callHook("beforeValidate", { item: publicItem(item), file: item.file, component: this });
      if (beforeValidate === false) {
        throw createError(item.file, "validation-cancelled", `"${item.name}" was rejected by beforeValidate.`, { stage: "validation" });
      }
      if (beforeValidate instanceof File) {
        this._replaceItemFile(item, beforeValidate, false);
      }

      const validationStart = nowMs();
      await this._validateFile(item);
      item.performanceReport.validationMs = elapsed(validationStart);
      this._emitTrustReport(item);

      if (this._options.optimizeImages && isOptimizableImage(item.file)) {
        const beforeOptimize = await this._callHook("beforeOptimize", { item: publicItem(item), file: item.file, component: this });
        if (beforeOptimize !== false) {
          const optimizationStart = nowMs();
          item.status = STATUS.OPTIMIZING;
          item.progress = 32;
          this._updateUI();
          this._emitProgress(item);

          const result = await this._optimizeImage(item.file);
          const afterOptimize = await this._callHook("afterOptimize", {
            item: publicItem(item),
            result,
            component: this,
          });

          if (afterOptimize instanceof File) {
            result.file = afterOptimize;
            result.type = afterOptimize.type;
            result.size = afterOptimize.size;
          }

          if (result.file !== item.file) {
            this._replaceItemFile(item, result.file, result.optimized);
          }

          item.optimized = result.optimized;
          item.compressionRatio = result.compressionRatio;
          item.before = createFileSnapshot(item.originalFile, result.sourceDimensions || null);
          item.dimensions = result.dimensions;
          item.variants = result.variants || [];
          item.performanceReport.optimizationMs = elapsed(optimizationStart);
          item.performanceReport.memoryGuardApplied = Boolean(result.memoryGuardApplied);
          item.performanceReport.canvasPixels = result.canvasPixels || 0;
          item.performanceReport.variantCount = item.variants.length;
          item.performanceReport.variantBytes = item.variants.reduce((sum, variant) => sum + (variant.size || 0), 0);
        }
      }

      if (item.file.size > this._maxFileSizeBytes()) {
        throw createError(
          item.file,
          "file-too-large",
          `"${item.name}" is ${formatBytes(item.file.size)}. Maximum allowed size is ${formatBytes(this._maxFileSizeBytes())}.`,
          { stage: "validation" },
        );
      }

      const previewStart = nowMs();
      this._createPreview(item);
      item.performanceReport.previewMs = elapsed(previewStart);
      updateCompressionReport(item);
      item.status = STATUS.READY;
      item.progress = 100;
      item.error = null;
      item.performanceReport.completedAt = Date.now();
      item.performanceReport.totalMs = elapsed(totalStart);
      this._updateUI();
      this._emitProgress(item);
      this._emitBenchmark(item);
    } catch (error) {
      item.status = STATUS.ERROR;
      item.progress = 0;
      item.error = error?.code
        ? error
        : createError(item.file, "processing-failed", `"${item.name}" could not be processed.`, { stage: "processing", cause: error });
      updateCompressionReport(item);
      item.performanceReport.completedAt = Date.now();
      item.performanceReport.totalMs = elapsed(totalStart);
      this._updateUI();
      this._emitTrustReport(item);
      this._emitBenchmark(item);
    }
  }

  async _validateFile(item) {
    const file = item.file;
    const allowedTypes = this._options.allowedTypes;
    const detectedType = await sniffFileSignature(file);
    item.detectedType = detectedType;
    const riskFlags = dangerousTypeFlags(file, detectedType);
    let signatureStatus = "unknown";

    if (!isAllowedFileType(file, allowedTypes, detectedType)) {
      item.trustReport = createTrustReport(file, detectedType, "rejected", ["invalid-type", ...riskFlags], item.warnings);
      throw createError(file, "invalid-file-type", `"${file.name}" is not an allowed file type.`, { stage: "validation" });
    }

    const fileType = (file.type || "").toLowerCase();
    if (requiresKnownSignature(file, allowedTypes)) {
      if (!detectedType) {
        item.trustReport = createTrustReport(file, detectedType, "unverified", ["signature-unverified", ...riskFlags], item.warnings);
        throw createError(file, "signature-unverified", `"${file.name}" does not match a supported file signature.`, { stage: "validation" });
      }
      if (SIGNATURE_TYPES.has(fileType) && detectedType !== fileType) {
        item.trustReport = createTrustReport(file, detectedType, "mismatch", ["signature-mismatch", ...riskFlags], item.warnings);
        throw createError(
          file,
          "signature-mismatch",
          `"${file.name}" is declared as ${fileType} but looks like ${detectedType}.`,
          { stage: "validation" },
        );
      }
      signatureStatus = "verified";
    } else if (detectedType) {
      signatureStatus = "detected";
    }

    if (riskFlags.length) {
      const warning = `"${file.name}" contains potentially dangerous web content (${riskFlags.join(", ")}).`;
      if (this._options.dangerousTypesPolicy === "reject") {
        item.trustReport = createTrustReport(file, detectedType, "dangerous", riskFlags, [warning]);
        item.warnings.push(warning);
        throw createError(file, "dangerous-file-type", warning, { stage: "validation" });
      }
      if (this._options.dangerousTypesPolicy === "warn") {
        item.warnings.push(warning);
      }
    }

    item.trustReport = createTrustReport(file, detectedType, signatureStatus, riskFlags, item.warnings);

    const minSize = this._minFileSizeBytes();
    if (file.size < minSize) {
      throw createError(
        file,
        "file-too-small",
        `"${file.name}" is ${formatBytes(file.size)}. Minimum allowed size is ${formatBytes(minSize)}.`,
        { stage: "validation" },
      );
    }

    if (!isOptimizableImage(file) && file.size > this._maxFileSizeBytes()) {
      throw createError(
        file,
        "file-too-large",
        `"${file.name}" is ${formatBytes(file.size)}. Maximum allowed size is ${formatBytes(this._maxFileSizeBytes())}.`,
        { stage: "validation" },
      );
    }
  }

  async _optimizeImage(file, variantOptions = null) {
    const source = await decodeImage(file);
    try {
      const options = variantOptions || {};
      const maxWidth = toPositiveNumber(options.maxWidth ?? this._options.imageMaxWidth, this._options.imageMaxWidth);
      const maxHeight = toPositiveNumber(options.maxHeight ?? this._options.imageMaxHeight, this._options.imageMaxHeight);
      const outputMime = await this._resolveOutputMime(options.outputFormat || this._options.outputFormat, file.type);
      const quality = clamp(Number(options.quality ?? this._options.imageQuality), 0.01, 1, this._options.imageQuality);
      const pixelCount = source.width * source.height;
      const memoryGuardApplied = pixelCount > MAX_CANVAS_PIXELS;
      const ratio = Math.min(
        1,
        maxWidth / source.width,
        maxHeight / source.height,
        Math.sqrt(MAX_CANVAS_PIXELS / pixelCount),
      );
      const targetWidth = Math.max(1, Math.round(source.width * ratio));
      const targetHeight = Math.max(1, Math.round(source.height * ratio));

      if (
        this._options.skipIfSmaller &&
        !variantOptions &&
        targetWidth === source.width &&
        targetHeight === source.height &&
        outputMime === file.type
      ) {
        return {
          file,
          optimized: false,
          compressionRatio: 1,
          sourceDimensions: { width: source.width, height: source.height },
          dimensions: { width: source.width, height: source.height },
          memoryGuardApplied,
          canvasPixels: targetWidth * targetHeight,
          variants: await this._createVariants(file),
        };
      }

      const canvas = createCanvas(targetWidth, targetHeight);
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) {
        throw new Error("Canvas 2D context is not available.");
      }
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(source.image, 0, 0, targetWidth, targetHeight);

      const blob = await blobToCanvasBlob(canvas, outputMime, quality);
      if (!blob || !blob.size) {
        throw new Error("Image conversion produced an empty file.");
      }

      if (this._options.skipIfSmaller && !variantOptions && blob.size >= file.size) {
        return {
          file,
          optimized: false,
          compressionRatio: 1,
          sourceDimensions: { width: source.width, height: source.height },
          dimensions: { width: source.width, height: source.height },
          memoryGuardApplied,
          canvasPixels: targetWidth * targetHeight,
          variants: await this._createVariants(file),
        };
      }

      const optimizedFile = new File([blob], replaceExtension(file.name, outputMime), {
        type: outputMime,
        lastModified: file.lastModified || Date.now(),
      });

      return {
        file: optimizedFile,
        optimized: true,
        compressionRatio: file.size ? optimizedFile.size / file.size : 1,
        sourceDimensions: { width: source.width, height: source.height },
        dimensions: { width: targetWidth, height: targetHeight },
        memoryGuardApplied,
        canvasPixels: targetWidth * targetHeight,
        variants: variantOptions ? [] : await this._createVariants(file),
      };
    } finally {
      source.close();
    }
  }

  async _createVariants(file) {
    const variants = [];
    for (const [index, variant] of this._options.variants.entries()) {
      const name = String(variant.name || `variant-${index + 1}`);
      try {
        const result = await this._optimizeImage(file, variant);
        variants.push({
          name,
          file: result.file,
          size: result.file.size,
          type: result.file.type,
          dimensions: result.dimensions,
          optimized: result.optimized,
          compressionRatio: result.compressionRatio,
        });
      } catch (error) {
        variants.push({
          name,
          file,
          size: file.size,
          type: file.type,
          dimensions: null,
          optimized: false,
          compressionRatio: 1,
          error,
        });
      }
    }
    return variants;
  }

  async _resolveOutputMime(format, originalType) {
    if (format === "auto") {
      if (this._options.preferAvif && await canvasExportSupported("image/avif")) {
        return "image/avif";
      }
      if (await canvasExportSupported("image/webp")) {
        return "image/webp";
      }
      if (await canvasExportSupported(originalType)) {
        return originalType;
      }
      return "image/jpeg";
    }

    const requested = CANVAS_EXPORTS[format] || CANVAS_EXPORTS.webp;
    if (await canvasExportSupported(requested)) {
      return requested;
    }
    if (await canvasExportSupported("image/webp")) {
      return "image/webp";
    }
    return "image/jpeg";
  }

  _replaceItemFile(item, file, optimized) {
    item.file = file;
    item.name = file.name || item.name;
    item.size = file.size || 0;
    item.type = file.type || item.type;
    item.optimized = Boolean(optimized);
  }

  _createPreview(item) {
    this._revokeUrls(item);
    if (isImageFile(item.file)) {
      item.previewUrl = URL.createObjectURL(item.file);
      item._urls.push(item.previewUrl);
    } else {
      item.previewUrl = null;
    }
  }

  _revokeUrls(item) {
    for (const url of item._urls || []) {
      URL.revokeObjectURL(url);
    }
    item._urls = [];
    item.previewUrl = null;
  }

  _enforceTotalSize(newItems) {
    const maxTotalSize = this._maxTotalSizeBytes();
    if (!Number.isFinite(maxTotalSize)) {
      return;
    }

    let total = 0;
    const sorted = [...this._items]
      .filter((item) => item.status === STATUS.READY || item.status === STATUS.SUCCESS)
      .sort((a, b) => a._order - b._order);

    for (const item of sorted) {
      if (total + item.file.size > maxTotalSize && newItems.includes(item)) {
        item.status = STATUS.ERROR;
        item.progress = 0;
        item.error = createError(
          item.file,
          "max-total-size-exceeded",
          `"${item.name}" exceeds the maximum total size of ${formatBytes(maxTotalSize)}.`,
          { stage: "validation" },
        );
        this._revokeUrls(item);
      } else {
        total += item.file.size;
      }
    }
  }

  async _uploadItem(item) {
    item.status = STATUS.UPLOADING;
    item.progress = 0;
    item.error = null;
    item._abortController = new AbortController();
    this._updateUI();
    this._emitProgress(item);

    try {
      const beforeUpload = await this._callHook("beforeUpload", { item: publicItem(item), file: item.file, component: this });
      if (beforeUpload === false) {
        item.status = STATUS.READY;
        item.progress = 0;
        this._updateUI();
        return;
      }

      const uploadStart = nowMs();
      const response = await this._runTransport(item);
      item.performanceReport.uploadMs = elapsed(uploadStart);
      item.performanceReport.totalMs += item.performanceReport.uploadMs;
      item.uploadResponse = response;
      item.status = STATUS.SUCCESS;
      item.progress = 100;
      item._abortController = null;
      item._xhr = null;
      this._updateUI();
      this._emitProgress(item);
      this._emit("file-upload-success", { item: publicItem(item), response });
    } catch (error) {
      if (error?.name === "AbortError") {
        item.status = STATUS.READY;
        item.progress = 0;
        item.error = null;
      } else {
        item.status = STATUS.ERROR;
        item.progress = 0;
        item.error = createError(item.file, "upload-failed", `"${item.name}" could not be uploaded.`, {
          stage: "upload",
          retryable: true,
          cause: error,
        });
      }
      item._abortController = null;
      item._xhr = null;
      this._updateUI();
    }
  }

  async _runTransport(item) {
    const transport = this._options.transport;
    const payload = {
      item: publicItem(item),
      file: item.file,
      component: this,
      signal: item._abortController.signal,
      endpoint: this._options.endpoint,
      headers: await this._resolveHeaders(item),
      fieldName: this._options.fieldName,
      onProgress: (progress) => this._setUploadProgress(item, progress),
    };

    if (typeof transport === "function") {
      return transport(payload);
    }
    if (transport && typeof transport === "object") {
      return this._uploadWithAdapter(item, payload, transport);
    }
    if (transport === "fetch") {
      return this._uploadWithFetch(item, payload);
    }
    if (transport === "xhr") {
      return this._uploadWithXhr(item, payload);
    }
    if (transport === "chunked") {
      return this._uploadInChunks(item, payload);
    }
    return null;
  }

  async _uploadWithAdapter(item, payload, adapter) {
    if (adapter.uploadChunk || adapter.complete || adapter.resume) {
      return this._uploadWithAdapterChunks(item, payload, adapter);
    }
    if (adapter.start) {
      return adapter.start(payload);
    }
    throw new Error("Custom transport adapter must provide start or uploadChunk.");
  }

  async _uploadWithAdapterChunks(item, payload, adapter) {
    const chunkSize = parseFileSize(this._options.chunkSize, 2 * 1024 * 1024);
    const manifest = await this._ensureChunkManifest(item, chunkSize);
    const resumePayload = { ...payload, manifest };
    if (this._options.resumeUploads && adapter.resume) {
      const resumed = await adapter.resume(resumePayload);
      if (resumed?.completedChunks) {
        manifest.completedChunks = [...new Set([...manifest.completedChunks, ...resumed.completedChunks])];
      }
    }
    if (adapter.start) {
      const started = await adapter.start(resumePayload);
      if (started?.resumeToken) {
        item.resumeToken = started.resumeToken;
        manifest.resumeToken = started.resumeToken;
      }
    }

    const completed = new Set(manifest.completedChunks);
    const responses = [];
    for (let index = 0; index < manifest.chunkCount; index += 1) {
      if (completed.has(index)) {
        continue;
      }
      const start = index * chunkSize;
      const end = Math.min(item.file.size, start + chunkSize);
      const chunk = item.file.slice(start, end);
      const response = await this._withRetries(async () => {
        return adapter.uploadChunk({
          ...payload,
          manifest,
          chunk,
          chunkIndex: index,
          chunkCount: manifest.chunkCount,
          chunkHash: manifest.chunkHashes[index] || "",
          start,
          end,
        });
      }, payload.signal);
      responses.push(response);
      completed.add(index);
      manifest.completedChunks = [...completed];
      item.chunkManifest = manifest;
      this._setUploadProgress(item, Math.round((completed.size / manifest.chunkCount) * 100));
      this._emit("chunk-complete", { item: publicItem(item), manifest, chunkIndex: index, response, component: this });
      this._emit("upload-resume-ready", { item: publicItem(item), manifest, resumeToken: item.resumeToken, component: this });
      this._schedulePersist();
    }

    const completeResponse = adapter.complete
      ? await adapter.complete({ ...payload, manifest, responses })
      : { ok: true, manifest, responses };
    return { manifest, responses, completeResponse };
  }

  async _uploadWithFetch(item, payload) {
    if (!payload.endpoint) {
      throw new Error("endpoint is required for fetch transport.");
    }
    const formData = this._createFormData(item, payload.fieldName);
    this._setUploadProgress(item, 12);
    const response = await fetch(payload.endpoint, {
      method: "POST",
      headers: payload.headers,
      body: formData,
      signal: payload.signal,
    });
    this._setUploadProgress(item, 100);
    return this._parseResponse(response);
  }

  _uploadWithXhr(item, payload) {
    if (!payload.endpoint) {
      return Promise.reject(new Error("endpoint is required for xhr transport."));
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      item._xhr = xhr;
      xhr.open("POST", payload.endpoint);
      for (const [key, value] of Object.entries(payload.headers || {})) {
        xhr.setRequestHeader(key, value);
      }
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          this._setUploadProgress(item, Math.round((event.loaded / event.total) * 100));
        }
      };
      xhr.onload = () => {
        const ok = xhr.status >= 200 && xhr.status < 300;
        if (!ok) {
          reject(new Error(`Upload failed with status ${xhr.status}.`));
          return;
        }
        resolve(parseXhrResponse(xhr));
      };
      xhr.onerror = () => reject(new Error("Network error during upload."));
      xhr.onabort = () => reject(new DOMException("Upload aborted.", "AbortError"));
      payload.signal.addEventListener("abort", () => xhr.abort(), { once: true });
      xhr.send(this._createFormData(item, payload.fieldName));
    });
  }

  async _ensureChunkManifest(item, chunkSize) {
    if (this._options.resumeUploads && item.chunkManifest?.chunkSize === chunkSize) {
      return item.chunkManifest;
    }

    const chunkCount = Math.max(1, Math.ceil(item.file.size / chunkSize));
    const uploadId = item.chunkManifest?.uploadId || makeId("upload");
    const chunkHashes = [];
    if (this._options.hashChunks) {
      for (let index = 0; index < chunkCount; index += 1) {
        const start = index * chunkSize;
        const end = Math.min(item.file.size, start + chunkSize);
        chunkHashes.push(await hashBlob(item.file.slice(start, end)));
      }
    }

    const manifest = {
      uploadId,
      fileName: item.name,
      fileSize: item.file.size,
      chunkSize,
      chunkCount,
      chunkHashes,
      completedChunks: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      resumeToken: item.resumeToken || `${uploadId}:${item.file.size}:${item.file.lastModified || 0}`,
    };
    item.chunkManifest = manifest;
    item.resumeToken = manifest.resumeToken;
    return manifest;
  }

  async _uploadInChunks(item, payload) {
    if (!payload.endpoint) {
      throw new Error("endpoint is required for chunked transport.");
    }

    const chunkSize = parseFileSize(this._options.chunkSize, 2 * 1024 * 1024);
    const manifest = await this._ensureChunkManifest(item, chunkSize);
    const chunkCount = manifest.chunkCount;
    const uploadId = manifest.uploadId;
    const completed = new Set(this._options.resumeUploads ? manifest.completedChunks : []);
    const responses = [];

    for (let index = 0; index < chunkCount; index += 1) {
      if (completed.has(index)) {
        continue;
      }
      const start = index * chunkSize;
      const end = Math.min(item.file.size, start + chunkSize);
      const chunk = item.file.slice(start, end);
      const formData = new FormData();
      formData.append("chunk", chunk, `${item.name}.part-${index + 1}`);
      formData.append("fileName", item.name);
      formData.append("fileId", uploadId);
      formData.append("chunkIndex", String(index));
      formData.append("chunkCount", String(chunkCount));
      formData.append("fileSize", String(item.file.size));

      const response = await this._withRetries(async () => {
        const result = await fetch(payload.endpoint, {
          method: "POST",
          headers: {
            ...payload.headers,
            "X-Upload-Id": uploadId,
            "X-File-Name": encodeURIComponent(item.name),
            "X-Chunk-Index": String(index),
            "X-Chunk-Count": String(chunkCount),
          },
          body: formData,
          signal: payload.signal,
        });
        return this._parseResponse(result);
      }, payload.signal);

      responses.push(response);
      completed.add(index);
      manifest.completedChunks = [...completed];
      manifest.updatedAt = Date.now();
      item.chunkManifest = manifest;
      this._setUploadProgress(item, Math.round((completed.size / chunkCount) * 100));
      this._emit("chunk-complete", { item: publicItem(item), manifest, chunkIndex: index, response, component: this });
      this._emit("upload-resume-ready", { item: publicItem(item), manifest, resumeToken: item.resumeToken, component: this });
      this._schedulePersist();
    }

    return { uploadId, chunkCount, manifest, responses };
  }

  async _withRetries(task, signal) {
    let lastError;
    for (const delay of this._options.retryDelays) {
      if (delay > 0) {
        await sleep(delay, signal);
      }
      try {
        return await task();
      } catch (error) {
        lastError = error;
        if (signal?.aborted) {
          throw error;
        }
      }
    }
    throw lastError;
  }

  _createFormData(item, fieldName) {
    const formData = new FormData();
    formData.append(fieldName, item.file, item.name);
    item.variants.forEach((variant) => {
      if (variant.file instanceof File) {
        formData.append(`${fieldName}_${variant.name}`, variant.file, variant.file.name);
      }
    });
    return formData;
  }

  async _parseResponse(response) {
    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}.`);
    }
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  async _resolveHeaders(item) {
    if (typeof this._options.headers === "function") {
      return await this._options.headers({ item: publicItem(item), file: item.file, component: this });
    }
    return { ...this._options.headers };
  }

  _setUploadProgress(item, progress) {
    item.progress = clamp(Number(progress), 0, 100, item.progress);
    this._updateUI();
    this._emitProgress(item);
  }

  _resolveItems(ids) {
    if (!ids) {
      return this._items.filter((item) => item.status !== STATUS.REMOVED);
    }
    const list = Array.isArray(ids) ? ids : [ids];
    return list
      .map((idOrItem) => {
        if (typeof idOrItem === "object" && idOrItem?.id) {
          return this._items.find((item) => item.id === idOrItem.id);
        }
        return this._items.find((item) => item.id === idOrItem);
      })
      .filter(Boolean);
  }

  _acceptedItems() {
    return this._items.filter((item) => {
      return item.status === STATUS.READY || item.status === STATUS.UPLOADING || item.status === STATUS.SUCCESS;
    });
  }

  _maxFileSizeBytes() {
    return parseFileSize(this._options.maxFileSize, Infinity);
  }

  _maxTotalSizeBytes() {
    return parseFileSize(this._options.maxTotalSize, Infinity);
  }

  _minFileSizeBytes() {
    return parseFileSize(this._options.minFileSize, 0);
  }

  _syncInputAttributes() {
    if (!this._input) {
      return;
    }

    this._input.multiple = this._options.multiple;
    this._input.accept = this._options.allowedTypes.join(",");
    this._input.disabled = this._busy;
    this._input.webkitdirectory = Boolean(this._options.directory);
    if (this._options.capture) {
      this._input.setAttribute("capture", this._options.capture);
    } else {
      this._input.removeAttribute("capture");
    }
  }

  _updateUI() {
    if (!this._root) {
      return;
    }

    const hasErrors = this._errors.length > 0 || this._items.some((item) => item.status === STATUS.ERROR);
    const hasItems = this._items.some((item) => item.status !== STATUS.REMOVED);
    const isDragging = this._dragDepth > 0;

    this._root.hidden = Boolean(this._options.headless);
    if (this._options.headless) {
      this._list.replaceChildren();
      this._syncInputAttributes();
      return;
    }

    this._root.className = [
      "uploader",
      `theme-${this._options.theme}`,
      `view-${this._options.view}`,
      this._busy ? "is-busy" : "",
      hasErrors ? "is-error" : "",
      isDragging ? "is-dragging" : "",
    ].filter(Boolean).join(" ");

    this._zone.setAttribute("aria-busy", String(this._busy));
    this._zone.setAttribute("aria-invalid", String(hasErrors));
    this._idleIcon.hidden = this._busy;
    this._spinner.hidden = !this._busy;
    this._title.textContent = this._label("title");
    this._hint.textContent = this._buildHintText();
    this._renderMessage();
    this._renderSummary(hasItems);
    this._renderFileList();
    this._syncInputAttributes();
  }

  _buildHintText() {
    const typeText = this._options.allowedTypes.length
      ? `${this._label("allowed")}: ${this._options.allowedTypes.join(", ")}`
      : this._label("allTypes");
    const sizeText = `${this._label("maxSize")}: ${formatBytes(this._maxFileSizeBytes(), this._label("noLimit"))}`;
    const modeText = this._options.multiple ? this._label("multiple") : this._label("single");
    const output = this._options.optimizeImages
      ? `${this._options.outputFormat.toUpperCase()} ${this._label("optimized")}`
      : "Original files";
    return `${typeText}. ${sizeText}. ${modeText}. ${output}.`;
  }

  _renderMessage() {
    const processing = this._items.find((item) => item.status === STATUS.VALIDATING || item.status === STATUS.OPTIMIZING);
    const uploading = this._items.find((item) => item.status === STATUS.UPLOADING);
    const errors = uniqueErrors([
      ...this._errors,
      ...this._items.filter((item) => item.status === STATUS.ERROR).map((item) => item.error),
    ].filter(Boolean));

    if (errors.length) {
      this._message.hidden = false;
      this._message.classList.add("is-error");
      this._message.setAttribute("role", "alert");
      this._message.textContent = errors.map((error) => error.message).join(" ");
      return;
    }

    if (processing || uploading) {
      this._message.hidden = false;
      this._message.classList.remove("is-error");
      this._message.setAttribute("role", "status");
      this._message.textContent = uploading ? this._label("uploading") : this._label("processing");
      return;
    }

    this._message.hidden = true;
    this._message.textContent = "";
  }

  _renderSummary(hasItems) {
    if (!hasItems) {
      this._summary.hidden = true;
      return;
    }

    const accepted = this._acceptedItems();
    const total = accepted.reduce((sum, item) => sum + item.file.size, 0);
    const readyCount = this._items.filter((item) => item.status === STATUS.READY).length;
    const errorCount = this._items.filter((item) => item.status === STATUS.ERROR).length;
    this._summary.hidden = false;
    this._summaryText.innerHTML = `<strong>${accepted.length}</strong> ${this._label("files")} | <strong>${formatBytes(total)}</strong> ${this._label("total")}${errorCount ? ` | ${errorCount} error` : ""}`;
    this._uploadAll.hidden = this._options.transport === "none" || this._options.autoUpload || readyCount === 0;
    this._uploadAll.textContent = this._label("upload");
    this._clearAll.textContent = this._label("clear");
  }

  _renderFileList() {
    const fragment = document.createDocumentFragment();
    for (const item of this._items.filter((entry) => entry.status !== STATUS.REMOVED)) {
      const row = document.createElement("li");
      row.className = `file-item is-${item.status}`;
      row.dataset.status = item.status;
      row.dataset.itemId = item.id;
      row.tabIndex = this._options.reorderable ? 0 : -1;

      row.append(this._renderPreview(item));

      const details = document.createElement("span");
      details.className = "file-details";

      const name = document.createElement("span");
      name.className = "file-name";
      name.textContent = item.name;
      details.append(name);

      const meta = document.createElement("span");
      meta.className = "file-meta";
      meta.append(document.createTextNode(this._buildMetaText(item)));
      if (item.optimized) {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = `${formatPercent(1 - item.compressionRatio)} ${this._label("compression")}`;
        meta.append(badge);
      }
      if (item.variants.length) {
        const badge = document.createElement("span");
        badge.className = "badge warning";
        badge.textContent = `${item.variants.length} variants`;
        meta.append(badge);
      }
      if (item.status === STATUS.ERROR) {
        const badge = document.createElement("span");
        badge.className = "badge error";
        badge.textContent = item.error?.code || "error";
        meta.append(badge);
      }
      details.append(meta);

      if ([STATUS.VALIDATING, STATUS.OPTIMIZING, STATUS.UPLOADING].includes(item.status)) {
        const progress = document.createElement("span");
        progress.className = "progress";
        progress.setAttribute("aria-label", `${item.progress}%`);
        progress.innerHTML = `<span class="progress-bar" style="width: ${item.progress}%"></span>`;
        details.append(progress);
      }

      if (item.error?.message) {
        const error = document.createElement("span");
        error.className = "file-meta";
        error.textContent = item.error.message;
        details.append(error);
      }

      if (this._options.showReport && this._options.reportLevel !== "none") {
        details.append(this._renderReport(item));
      }

      row.append(details);
      row.append(this._renderActions(item));
      fragment.append(row);
    }
    this._list.replaceChildren(fragment);
  }

  _renderPreview(item) {
    if (item.previewUrl) {
      const image = document.createElement("img");
      image.className = "thumbnail";
      image.src = item.previewUrl;
      image.alt = "";
      image.loading = "lazy";
      return image;
    }

    const icon = document.createElement("span");
    icon.className = "file-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <path d="M14 2v6h6"></path>
      </svg>
    `;
    return icon;
  }

  _renderReport(item) {
    const details = document.createElement("details");
    details.className = "report";
    details.open = Boolean(item.detailsOpen);
    details.addEventListener("toggle", () => {
      item.detailsOpen = details.open;
    });

    const summary = document.createElement("summary");
    summary.textContent = "Trust and performance report";
    details.append(summary);

    const pre = document.createElement("pre");
    const report = this._options.reportLevel === "basic"
      ? {
        trustReport: item.trustReport,
        performanceReport: {
          totalMs: item.performanceReport.totalMs,
          validationMs: item.performanceReport.validationMs,
          optimizationMs: item.performanceReport.optimizationMs,
          uploadMs: item.performanceReport.uploadMs,
        },
      }
      : {
        trustReport: item.trustReport,
        performanceReport: item.performanceReport,
        chunkManifest: item.chunkManifest,
        warnings: item.warnings,
      };
    pre.textContent = JSON.stringify(report, null, 2);
    details.append(pre);
    return details;
  }

  _renderActions(item) {
    const actions = document.createElement("span");
    actions.className = "actions";

    if (this._options.reorderable) {
      actions.append(this._iconButton("move-up", item.id, "Move up", `
        <path d="m18 15-6-6-6 6"></path>
      `));
      actions.append(this._iconButton("move-down", item.id, "Move down", `
        <path d="m6 9 6 6 6-6"></path>
      `));
    }

    if (item.status === STATUS.READY && this._options.transport !== "none" && !this._options.autoUpload) {
      actions.append(this._iconButton("upload", item.id, this._label("upload"), `
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <path d="M17 8l-5-5-5 5"></path>
        <path d="M12 3v12"></path>
      `));
    }

    if (item.status === STATUS.UPLOADING) {
      actions.append(this._iconButton("cancel", item.id, this._label("cancel"), `
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      `));
    }

    if (item.status === STATUS.ERROR && item.error?.retryable) {
      actions.append(this._iconButton("retry", item.id, this._label("retry"), `
        <path d="M21 12a9 9 0 1 1-2.64-6.36"></path>
        <path d="M21 3v6h-6"></path>
      `));
    }

    actions.append(this._iconButton("remove", item.id, this._label("remove"), `
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    `, "danger"));

    return actions;
  }

  _iconButton(action, itemId, label, svg, tone = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `action ${tone}`.trim();
    button.dataset.action = action;
    button.dataset.id = itemId;
    button.title = label;
    button.setAttribute("aria-label", label);
    button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${svg}</svg>`;
    return button;
  }

  _buildMetaText(item) {
    const pieces = [
      formatBytes(item.file.size),
      item.type || "unknown",
      item.status,
    ];
    if (item.trustReport?.signatureStatus) {
      pieces.push(`trust:${item.trustReport.signatureStatus}`);
    }
    if (item.dimensions) {
      pieces.push(`${item.dimensions.width}x${item.dimensions.height}`);
    }
    if (item.relativePath) {
      pieces.push(item.relativePath);
    }
    return pieces.join(" | ");
  }

  _emitReady(addedItems) {
    const payload = {
      items: this.items,
      files: this.files,
      addedItems: addedItems.map(publicItem),
      addedFiles: addedItems.map((item) => item.file),
      component: this,
    };
    this._callUserCallback("onUploadSuccess", payload);
    this._emit("upload-success", payload);
  }

  _emitErrors(errors) {
    const payload = { errors, component: this };
    this._callUserCallback("onUploadError", payload);
    this._emit("upload-error", payload);
  }

  _emitUploadComplete(uploadedItems) {
    const payload = {
      items: this.items,
      files: this.files,
      uploadedItems: uploadedItems.map(publicItem),
      uploadedFiles: uploadedItems.map((item) => item.file),
      errors: uploadedItems.filter((item) => item.status === STATUS.ERROR).map((item) => item.error),
      component: this,
    };
    this._callUserCallback("onUploadComplete", payload);
    this._emit("upload-complete", payload);
  }

  _emitProgress(item) {
    const payload = {
      item: publicItem(item),
      progress: item.progress,
      status: item.status,
      component: this,
    };
    this._callUserCallback("onProgress", payload);
    this._emit("file-progress", payload);
  }

  _emitTrustReport(item) {
    const payload = {
      item: publicItem(item),
      trustReport: item.trustReport,
      component: this,
    };
    this._emit("trust-report", payload);
  }

  _emitBenchmark(item) {
    const payload = {
      item: publicItem(item),
      performanceReport: item.performanceReport,
      trustReport: item.trustReport,
      component: this,
    };
    this._emit("benchmark-complete", payload);
  }

  _emitChange() {
    const payload = {
      items: this.items,
      files: this.files,
      component: this,
    };
    this._callUserCallback("onChange", payload);
    this._emit("files-change", payload);
  }

  _emit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, {
      bubbles: true,
      composed: true,
      detail,
    }));
  }

  async _callHook(name, payload) {
    const hook = this[name];
    if (typeof hook !== "function") {
      return undefined;
    }
    return hook(payload);
  }

  _callUserCallback(name, payload) {
    const callback = this[name];
    if (typeof callback !== "function") {
      return;
    }
    try {
      callback(payload);
    } catch (error) {
      setTimeout(() => {
        throw error;
      }, 0);
    }
  }

  _handleUnexpectedError(error) {
    const componentError = createError(null, "unexpected-error", "An unexpected error occurred while processing files.", {
      cause: error,
    });
    this._errors = [componentError];
    this._busy = false;
    this._dragDepth = 0;
    this._updateUI();
    this._emitErrors([componentError]);
  }

  _sessionKey() {
    const persistSession = this._options.persistSession;
    if (!persistSession) {
      return "";
    }
    if (typeof persistSession === "string" && !["true", "false", ""].includes(persistSession)) {
      return persistSession;
    }
    const id = this.id || this.getAttribute("name") || "default";
    return `${location.origin}${location.pathname}#${id}`;
  }

  async _restorePersistedSession() {
    const key = this._sessionKey();
    if (!key || this._loadingPersistence || this._items.length) {
      return;
    }

    this._loadingPersistence = true;
    try {
      const record = await idbGet(key);
      if (!record?.items?.length) {
        return;
      }

      for (const stored of record.items) {
        const file = stored.file;
        if (!(file instanceof File)) {
          continue;
        }
        const item = createItem(file, this._order);
        this._order += 1;
        item.originalFile = stored.originalFile instanceof File ? stored.originalFile : file;
        item.status = stored.status === STATUS.SUCCESS ? STATUS.SUCCESS : STATUS.READY;
        item.progress = item.status === STATUS.SUCCESS ? 100 : 0;
        item.optimized = Boolean(stored.optimized);
        item.compressionRatio = stored.compressionRatio || 1;
        item.dimensions = stored.dimensions || null;
        item.relativePath = stored.relativePath || "";
        item.uploadResponse = stored.uploadResponse || null;
        item.trustReport = stored.trustReport || item.trustReport;
        item.performanceReport = stored.performanceReport || item.performanceReport;
        item.before = stored.before || item.before;
        item.after = stored.after || item.after;
        item.warnings = stored.warnings || [];
        item.chunkManifest = stored.chunkManifest || null;
        item.resumeToken = stored.resumeToken || "";
        this._createPreview(item);
        this._items.push(item);
      }

      this._updateUI();
      this._emitChange();
    } catch {
      // Persistence is an enhancement; failures should not block selection.
    } finally {
      this._loadingPersistence = false;
    }
  }

  _schedulePersist() {
    if (!this._sessionKey()) {
      return;
    }
    clearTimeout(this._persistTimer);
    this._persistTimer = setTimeout(() => {
      this._persistSession().catch(() => {});
    }, 150);
  }

  async _persistSession() {
    const key = this._sessionKey();
    if (!key) {
      return;
    }

    const persistable = this._items.filter((item) => item.status === STATUS.READY || item.status === STATUS.SUCCESS);
    const total = persistable.reduce((sum, item) => sum + item.file.size, 0);
    if (total > PERSIST_MAX_BYTES) {
      return;
    }

    await idbSet({
      key,
      updatedAt: Date.now(),
      items: persistable.map((item) => ({
        file: item.file,
        originalFile: this._options.preserveOriginal ? item.originalFile : item.file,
        status: item.status,
        optimized: item.optimized,
        compressionRatio: item.compressionRatio,
        dimensions: item.dimensions,
        relativePath: item.relativePath,
        uploadResponse: item.uploadResponse,
        trustReport: item.trustReport,
        performanceReport: item.performanceReport,
        before: item.before,
        after: item.after,
        warnings: item.warnings,
        chunkManifest: item.chunkManifest,
        resumeToken: item.resumeToken,
      })),
    });
  }

  async _clearPersistedSession() {
    const key = this._sessionKey();
    if (!key) {
      return;
    }
    try {
      await idbDelete(key);
    } catch {
      // Ignore persistence cleanup failures.
    }
  }
}

function parseXhrResponse(xhr) {
  const contentType = xhr.getResponseHeader("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(xhr.responseText);
    } catch {
      return xhr.responseText;
    }
  }
  return xhr.responseText;
}

for (const optionName of Object.values(OPTION_ATTRIBUTES)) {
  if (Object.prototype.hasOwnProperty.call(UniversalFileUploader.prototype, optionName)) {
    continue;
  }
  Object.defineProperty(UniversalFileUploader.prototype, optionName, {
    get() {
      const value = this._options[optionName];
      if (Array.isArray(value)) {
        return [...value];
      }
      if (value && typeof value === "object" && typeof value !== "function") {
        return { ...value };
      }
      return value;
    },
    set(value) {
      this._setOption(optionName, value);
    },
  });
}

if (!customElements.get("universal-file-uploader")) {
  customElements.define("universal-file-uploader", UniversalFileUploader);
}

globalThis.UniversalFileUploader = UniversalFileUploader;
