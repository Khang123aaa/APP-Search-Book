// Augment globalThis to include HermesInternal used by the RN template.
declare global {
  interface GlobalThis {
    HermesInternal?: any;
  }
}

// Also provide a broad declaration for `global` (used in many RN templates):
// (We avoid declaring `var global` here to satisfy lint rules; code uses `(global as any)` where needed.)

export {};
