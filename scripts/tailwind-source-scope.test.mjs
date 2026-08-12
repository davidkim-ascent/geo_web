import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";

const result = spawnSync("npm", ["run", "build"], {
  cwd: new URL("..", import.meta.url),
  encoding: "utf8",
  env: {
    ...process.env,
    CI: "1",
  },
});

assert.equal(
  result.status,
  0,
  [
    "expected `npm run build` to complete without Tailwind/PostCSS parsing errors",
    result.stdout,
    result.stderr,
  ]
    .filter(Boolean)
    .join("\n\n"),
);

console.log("tailwind-source-scope test passed");
