export type UniversalUploaderStatus =
  | "queued"
  | "validating"
  | "optimizing"
  | "ready"
  | "uploading"
  | "success"
  | "error"
  | "removed";

export type UniversalUploaderTransportName = "none" | "fetch" | "xhr" | "chunked";
export type UniversalUploaderOutputFormat = "auto" | "avif" | "webp" | "jpeg" | "jpg" | "png";
export type UniversalUploaderView = "list" | "grid" | "compact";
export type UniversalUploaderTheme = "light" | "dark" | "auto";
export type UniversalUploaderPreset = "" | "images" | "documents" | "strict";
export type UniversalUploaderReportLevel = "none" | "basic" | "full";
export type UniversalUploaderDangerousTypesPolicy = "reject" | "warn" | "allow";

export interface UniversalUploaderError {
  code: string;
  message: string;
  file: File | null;
  name: string;
  retryable: boolean;
  stage: string;
  cause?: unknown;
}

export interface UniversalUploaderDimensions {
  width: number;
  height: number;
}

export interface UniversalUploaderVariant {
  name: string;
  file: File;
  size: number;
  type: string;
  dimensions: UniversalUploaderDimensions | null;
  optimized: boolean;
  compressionRatio: number;
}

export interface UniversalUploaderTrustReport {
  declaredType: string;
  detectedType: string;
  signatureStatus: string;
  sizeBefore: number;
  sizeAfter: number;
  compressionSaved: number;
  dimensionsBefore: UniversalUploaderDimensions | null;
  dimensionsAfter: UniversalUploaderDimensions | null;
  riskFlags: string[];
  warnings: string[];
}

export interface UniversalUploaderPerformanceReport {
  startedAt: number;
  completedAt: number;
  totalMs: number;
  validationMs: number;
  optimizationMs: number;
  previewMs: number;
  uploadMs: number;
  memoryGuardApplied: boolean;
  canvasPixels: number;
  variantCount: number;
  variantBytes: number;
}

export interface UniversalUploaderFileSnapshot {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  dimensions: UniversalUploaderDimensions | null;
}

export interface UniversalUploaderChunkManifest {
  uploadId: string;
  fileName: string;
  fileSize: number;
  chunkSize: number;
  chunkCount: number;
  chunkHashes: string[];
  completedChunks: number[];
  createdAt: number;
  updatedAt: number;
  resumeToken: string;
}

export interface UniversalUploaderItem {
  id: string;
  file: File;
  originalFile: File;
  status: UniversalUploaderStatus;
  progress: number;
  error: UniversalUploaderError | null;
  name: string;
  size: number;
  type: string;
  optimized: boolean;
  compressionRatio: number;
  dimensions: UniversalUploaderDimensions | null;
  previewUrl: string | null;
  relativePath: string;
  uploadResponse: unknown;
  variants: UniversalUploaderVariant[];
  detectedType: string;
  warnings: string[];
  trustReport: UniversalUploaderTrustReport;
  performanceReport: UniversalUploaderPerformanceReport;
  before: UniversalUploaderFileSnapshot;
  after: UniversalUploaderFileSnapshot;
  chunkManifest: UniversalUploaderChunkManifest | null;
  resumeToken: string;
}

export interface UniversalUploaderVariantConfig {
  name?: string;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputFormat?: UniversalUploaderOutputFormat;
}

export interface UniversalUploaderPayload {
  items: UniversalUploaderItem[];
  files: File[];
  component: UniversalFileUploader;
}

export interface UniversalUploaderReadyPayload extends UniversalUploaderPayload {
  addedItems: UniversalUploaderItem[];
  addedFiles: File[];
}

export interface UniversalUploaderErrorPayload {
  errors: UniversalUploaderError[];
  component: UniversalFileUploader;
}

export interface UniversalUploaderProgressPayload {
  item: UniversalUploaderItem;
  progress: number;
  status: UniversalUploaderStatus;
  component: UniversalFileUploader;
}

export interface UniversalUploaderCompletePayload extends UniversalUploaderPayload {
  uploadedItems: UniversalUploaderItem[];
  uploadedFiles: File[];
  errors: UniversalUploaderError[];
}

export interface UniversalUploaderTransportPayload {
  item: UniversalUploaderItem;
  file: File;
  component: UniversalFileUploader;
  signal: AbortSignal;
  endpoint: string;
  headers: Record<string, string>;
  fieldName: string;
  onProgress: (progress: number) => void;
}

export type UniversalUploaderTransport = (
  payload: UniversalUploaderTransportPayload,
) => Promise<unknown> | unknown;

export interface UniversalUploaderChunkTransportAdapter {
  start?: (payload: UniversalUploaderTransportPayload & { manifest: UniversalUploaderChunkManifest }) => Promise<unknown> | unknown;
  resume?: (payload: UniversalUploaderTransportPayload & { manifest: UniversalUploaderChunkManifest }) => Promise<{ completedChunks?: number[] } | void> | { completedChunks?: number[] } | void;
  uploadChunk: (
    payload: UniversalUploaderTransportPayload & {
      manifest: UniversalUploaderChunkManifest;
      chunk: Blob;
      chunkIndex: number;
      chunkCount: number;
      chunkHash: string;
      start: number;
      end: number;
    },
  ) => Promise<unknown> | unknown;
  complete?: (payload: UniversalUploaderTransportPayload & { manifest: UniversalUploaderChunkManifest; responses: unknown[] }) => Promise<unknown> | unknown;
  abort?: (payload: UniversalUploaderTransportPayload & { manifest: UniversalUploaderChunkManifest | null }) => Promise<unknown> | unknown;
}

export declare class UniversalFileUploader extends HTMLElement {
  allowedTypes: string[];
  maxFileSize: string | number;
  maxTotalSize: string | number;
  minFileSize: string | number;
  maxFiles: number;
  multiple: boolean;
  dedupe: boolean;
  directory: boolean;
  capture: string;
  locale: string;
  labels: Record<string, string>;
  theme: UniversalUploaderTheme;
  view: UniversalUploaderView;
  autoUpload: boolean;
  transport: UniversalUploaderTransportName | UniversalUploaderTransport | UniversalUploaderChunkTransportAdapter;
  endpoint: string;
  headers:
    | Record<string, string>
    | ((payload: { item: UniversalUploaderItem; file: File; component: UniversalFileUploader }) => Record<string, string> | Promise<Record<string, string>>);
  fieldName: string;
  chunkSize: string | number;
  retryDelays: number[];
  persistSession: boolean | string;
  headless: boolean;
  preset: UniversalUploaderPreset;
  reportLevel: UniversalUploaderReportLevel;
  hashChunks: boolean;
  resumeUploads: boolean;
  reorderable: boolean;
  showReport: boolean;
  dangerousTypesPolicy: UniversalUploaderDangerousTypesPolicy;
  optimizeImages: boolean;
  outputFormat: UniversalUploaderOutputFormat;
  preferAvif: boolean;
  imageMaxWidth: number;
  imageMaxHeight: number;
  imageQuality: number;
  skipIfSmaller: boolean;
  preserveOriginal: boolean;
  variants: UniversalUploaderVariantConfig[];
  concurrency: number;

  readonly items: UniversalUploaderItem[];
  readonly files: File[];
  readonly errors: UniversalUploaderError[];

  onUploadSuccess?: (payload: UniversalUploaderReadyPayload) => void;
  onUploadError?: (payload: UniversalUploaderErrorPayload) => void;
  onChange?: (payload: UniversalUploaderPayload) => void;
  onProgress?: (payload: UniversalUploaderProgressPayload) => void;
  onRemove?: (payload: { item: UniversalUploaderItem; component: UniversalFileUploader }) => void;
  onUploadStart?: (payload: UniversalUploaderPayload) => void;
  onUploadComplete?: (payload: UniversalUploaderCompletePayload) => void;
  beforeValidate?: (payload: { item: UniversalUploaderItem; file: File; component: UniversalFileUploader }) => boolean | File | void | Promise<boolean | File | void>;
  beforeOptimize?: (payload: { item: UniversalUploaderItem; file: File; component: UniversalFileUploader }) => boolean | void | Promise<boolean | void>;
  afterOptimize?: (payload: { item: UniversalUploaderItem; result: unknown; component: UniversalFileUploader }) => File | void | Promise<File | void>;
  beforeUpload?: (payload: { item: UniversalUploaderItem; file: File; component: UniversalFileUploader }) => boolean | void | Promise<boolean | void>;

  addFiles(files: File[] | FileList): Promise<UniversalUploaderReadyPayload & { errors: UniversalUploaderError[] }>;
  upload(ids?: string[] | UniversalUploaderItem[]): Promise<UniversalUploaderCompletePayload & { uploaded: UniversalUploaderItem[] }>;
  uploadFile(idOrItem: string | UniversalUploaderItem): Promise<UniversalUploaderItem | null>;
  retryUpload(idOrItem: string | UniversalUploaderItem): Promise<unknown>;
  cancelUpload(idOrItem: string | UniversalUploaderItem): boolean;
  moveFile(idOrItem: string | UniversalUploaderItem, direction: -1 | 1): boolean;
  removeFile(idOrIndex: string | number): boolean;
  clear(): void;
  clearPersistedSession(): Promise<void>;
}

declare global {
  interface HTMLElementTagNameMap {
    "universal-file-uploader": UniversalFileUploader;
  }
}

