import Image from "next/image";

export function HeroLogoMark() {
  return (
    <div style={{ marginTop: "48px" }} className="flex flex-col gap-8">
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-start gap-2">
          <Image
            src="/red-herring-logo.png"
            alt="RED HERRING"
            width={168}
            height={116}
            className="h-[134px] w-auto"
          />
          <p className="text-[12px] text-[#4e4e51]">グローバル TOP 100 技術企業</p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <Image
            src="/jma-logo.jpg"
            alt="JMA"
            width={116}
            height={116}
            className="h-[134px] w-auto"
          />
          <p className="text-[12px] text-[#4e4e51]">公益社団法人日本マーケティング協会会員社</p>
        </div>
      </div>

      <div className="flex items-center justify-start">
        <Image
          src="/ascent-geo-logo.png"
          alt="ASCENT GEO"
          width={3317}
          height={552}
          className="h-[32px] w-auto sm:h-[38px]"
        />
      </div>
    </div>
  );
}
