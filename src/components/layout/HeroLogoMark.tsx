import Image from "next/image";

export function HeroLogoMark() {
  return (
    <div className="mt-8 flex items-center justify-start">
      <Image
        src="/ascent-geo-logo-split.png"
        alt="ASCENT GEO"
        width={3317}
        height={552}
        className="h-[32px] w-auto sm:h-[38px]"
      />
    </div>
  );
}
