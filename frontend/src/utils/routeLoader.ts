import { lazy } from "react";

export const lazyLoad = (
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) => lazy(importFunc);
