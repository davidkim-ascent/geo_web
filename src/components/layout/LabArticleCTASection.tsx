import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { CalendarBookingButton } from "@/components/contact/CalendarBookingButton";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { DEFAULT_BLOCKED_EMAIL_DOMAINS } from "@/lib/contact-blocking";

const voice1Image = "/design-assets/voice1.png";
const voice2Image = "/design-assets/voice2.png";
const voice3Image = "/design-assets/voice3.png";

export function LabArticleCTASection() {
  return (
    <section
      id="contact"
      className="relative py-10 lg:py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #e8f4fb 0%, #d4e8f7 50%, #c8dff5 100%)" }}
    >
      <div className="max-w-[var(--ui-content-width)] mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
        <div>
          <div className="font-mono tracking-[0.18em] uppercase text-[#003393] mb-5" style={{ fontSize: "var(--fs-label-xxs)" }}>
            AI検索で選ばれるための一歩を、ここから
          </div>
          <h2
            className="text-[#0B0B0E] font-bold leading-[var(--lh-heading)] tracking-[-0.02em]"
            style={{ fontSize: "var(--fs-section-title)" }}
          >
            <span className="text-marker-highlight">AI検索で選ばれるための</span><br />一歩を、ここから。
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              variant="cta"
              className="flex-1 !w-auto !min-w-0 !max-w-none !h-[52px] justify-center text-center px-6 !bg-[#003393] hover:!bg-[#0f3de0]" style={{ fontSize: "var(--fs-label)" }}
            >
              <Link href="/watcher">GEO Watcherを見る →</Link>
            </Button>
            <Button
              asChild
              variant="cta"
              className="flex-1 !w-auto !min-w-0 !max-w-none !h-[52px] justify-center text-center px-6 !bg-[#003393] hover:!bg-[#0f3de0]" style={{ fontSize: "var(--fs-label)" }}
            >
              <Link href="/shindan">GEO診断レポートを見る →</Link>
            </Button>
          </div>
          <div className="mt-3">
            <CalendarBookingButton className="!w-full !min-w-0 !max-w-none !h-[52px] !justify-start text-left px-6 gap-2 !bg-transparent !border !border-[#003393] !text-[#003393] hover:!bg-[#003393] hover:!text-white hover:!border-[#003393]">
              <Calendar size={16} />
              無料相談予約（Googleカレンダー）
            </CalendarBookingButton>
          </div>

          {/* Reviews */}
          <div className="mt-8 grid grid-cols-1 gap-4">
              {[
                {
                  name: "EC運営担当者",
                  role: "化粧品・自社EC",
                  review: "GEO Watcherは、主要な計測機能をツール内で利用でき、苦手だったプロンプト設計だけを、1回単位で依頼できました。毎月の追加費用が発生しないため、社内でも説明しやすく、導入までスムーズに進められました。",
                  image: voice1Image,
                  rating: 5,
                },
                {
                  name: "広報・マーケティング担当者",
                  role: "地方製造業",
                  review: "GEO Watcherは、検索データやビッグデータを長年扱ってきた企業が開発しているため、計測データの信頼性にも安心感がありました。複数のAIにおける自社と競合の変化を、継続的に確認できる点も、社内で導入を決める後押しになりました。",
                  image: voice2Image,
                  rating: 5,
                },
                {
                  name: "マーケティングマネージャー",
                  role: "BtoB SaaS企業",
                  review: "GEO Watcherに切り替えてからは、毎日のデータで言及率や引用URLの変化を追えるため、施策後の反応を早い段階で確認できます。複数のAIの回答原文やグラフもまとめて共有でき、社内報告の根拠として使いやすくなりました。",
                  image: voice3Image,
                  rating: 5,
                },
              ].map((reviewer) => (
                <div key={reviewer.name} className="rounded-lg bg-white p-4 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-[80px] w-[80px] rounded-full overflow-hidden bg-gray-200">
                      {reviewer.image && (
                        <Image
                          src={reviewer.image}
                          alt={reviewer.name}
                          width={80}
                          height={80}
                          className={`h-full w-full object-cover ${reviewer.name === "広報・マーケティング担当者" ? "scale-200 -translate-y-1" : ""}`}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="mb-2 text-[14px] leading-[1.5] text-[#4e4e51]">
                      {reviewer.review}
                    </p>
                    <div className="border-t border-[#e0e0e0] pt-2">
                      <p className="font-bold text-[#0B0B0E] leading-[1.2]" style={{ fontSize: "var(--fs-body-xsm)" }}>
                        {reviewer.name}
                      </p>
                      <p className="text-[#999] leading-[1.2]" style={{ fontSize: "var(--fs-label-xs)" }}>
                        {reviewer.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="w-full max-w-[560px] mx-auto lg:ml-auto lg:mr-0">
          <ContactForm blockedEmailDomains={DEFAULT_BLOCKED_EMAIL_DOMAINS} />
        </div>
      </div>
    </section>
  );
}
