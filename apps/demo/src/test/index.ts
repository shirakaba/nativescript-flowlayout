import "./setup";

import { initializeTestContext } from "./context";
import { test as insertionTest } from "./insertion";

export function runAllTestSuites(
  context: Parameters<typeof initializeTestContext>[0],
) {
  initializeTestContext(context);
  insertionTest.run();
}
