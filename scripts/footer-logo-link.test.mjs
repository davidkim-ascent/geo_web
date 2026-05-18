import fs from "node:fs";

const footer = fs.readFileSync("src/components/layout/Footer.tsx", "utf8");

if (!footer.includes('<Link href="/" className="inline-flex items-center" aria-label="Go to home">') || !footer.includes('src="/ascent-geo-logo.png"')) {
  throw new Error("Footer logo is not linked to the home page.");
}

console.log("Footer logo link expectation passed.");
