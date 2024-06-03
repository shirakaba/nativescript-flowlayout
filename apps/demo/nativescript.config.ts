import type { NativeScriptConfig } from "@nativescript/core";

export default {
  id: "org.nativescript.demo",
  appPath: "src",
  appResourcesPath: "App_Resources",
  android: {
    v8Flags: "--expose_gc",
    markingMode: "none",
  },
  cli: {
    packageManager: "npm",
  },
} as NativeScriptConfig;
