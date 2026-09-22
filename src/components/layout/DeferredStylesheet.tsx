function toStylesheet(id: string) {
  const link = document.getElementById(id) as HTMLLinkElement | null;
  if (!link) return;
  if (link.sheet) {
    link.rel = "stylesheet";
    return;
  }
  link.addEventListener("load", () => {
    link.rel = "stylesheet";
  });
}

export function DeferredStylesheet({ href, id }: { href: string; id: string }) {
  return (
    <>
      <link id={id} rel="preload" as="style" href={href} />
      <script dangerouslySetInnerHTML={{ __html: `(${toStylesheet.toString()})(${JSON.stringify(id)});` }} />
      <noscript>
        <link rel="stylesheet" href={href} />
      </noscript>
    </>
  );
}
