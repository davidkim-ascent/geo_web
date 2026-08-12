import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const header = readFileSync(new URL("../src/components/layout/Header.tsx", import.meta.url), "utf8");
const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

assert.match(header, /usePathname/, "Header should read the current pathname");
assert.match(header, /ui-header-nav-link--active/, "Header should apply an active nav class");
assert.match(header, /pathname === item\.href \|\| \(item\.href !== "\/" && pathname\.startsWith\(item\.href \+ "\/"\)\)/, "Header should treat nested routes as active for non-home nav items");
assert.match(header, /ui-header-nav-separator/, "Header should render desktop separators between menu items");

assert.match(css, /\.ui-header-nav-link--active/, "Header CSS should define an active nav state");
assert.match(css, /text-marker-highlight-blue|linear-gradient\(transparent/, "Active nav state should use a marker-style highlight treatment");
assert.match(css, /\.ui-header-nav-separator/, "Header CSS should define desktop separator styling");

console.log("header-nav-active test passed");
