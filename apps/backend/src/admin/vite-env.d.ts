/// <reference types="vite/client" />

import * as React from "react"

declare module "react" {
  interface Attributes {
    children?: React.ReactNode;
  }
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    children?: React.ReactNode;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}