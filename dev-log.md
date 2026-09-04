## 2026-09-04 11:00
- 사이트맵을 정적 파일에서 Next.js 동적 `src/app/sitemap.ts`로 전환 — 앞선 사이트맵 누락 문제(수동 관리로 8개 아티클 누락)의 재발 방지
  - `src/lib/lab-articles.ts` 신규 생성: `LAB_ARTICLES` 배열과 `ArticleThumbnailVariant` 타입을 `LabArticles.tsx`/`ArticleThumbnail.tsx`에서 분리해 서버(sitemap.ts)에서도 안전하게 import 가능하도록 함
  - `LabArticles.tsx`, `ArticleThumbnail.tsx`는 새 공용 파일을 참조하도록 리팩터링 (동작 변화 없음)
  - `public/sitemap.xml` 정적 파일 삭제, 이제 `/lab-articles.ts`의 `LAB_ARTICLES`에 새 아티클을 등록하기만 하면 사이트맵에 자동 반영됨 — AGENTS.md의 "새 아티클 추가 시" 섹션에도 명시
  - `scripts/sitemap-static.test.mjs`를 정적 파일 대신 `sitemap()` 함수를 직접 호출해 검증하도록 갱신 (`node --import tsx scripts/sitemap-static.test.mjs`로 실행)

## 2026-09-04 10:00
**원인**
- `public/sitemap.xml`이 정적 파일로 수동 관리되고 있었는데, 최근 신규 아티클 추가 시 갱신이 누락되어 9개 URL만 등록된 상태로 방치됨(lab 아티클 8개, services/shindan/framework/why-ascent 페이지 4개 누락, what-is-llmo 포함)

**영향 범위**
1. `/lab/what-is-llmo` 등 8개 lab 아티클과 주요 마케팅 페이지 4개가 구글 검색에 발견·재크롤링되는 속도가 느려짐
2. 사이트 전체의 색인 우선순위 신호(sitemap 내 priority/changefreq)가 최신 콘텐츠에 반영되지 않음
3. GEO/LLMO 최적화를 표방하는 사이트 자체가 AI/검색엔진에 구조를 제대로 노출하지 못하는 상태였음

**재발 방지 테스트**
- 신규 lab 아티클 추가 시 `public/sitemap.xml`에도 함께 등록하는 것을 체크리스트화 (AGENTS.md의 "새 아티클 추가 시" 섹션에 추가 필요)

- sitemap.xml 전체 재구성: 공개 페이지 26개 전부 등록(기존 9개 → 26개), lastmod는 각 파일의 git 마지막 커밋일 기준, 약관/프라이버시/특정상거래법 페이지는 SEO가치 낮아 제외
- what-is-llmo 페이지에 JSON-LD 구조화 데이터 3종 추가(Article, FAQPage, BreadcrumbList) — 사이트 전체에 JSON-LD가 전무했던 문제의 첫 적용 사례
  - `src/lib/seo.ts`에 `buildArticleJsonLd`/`buildFaqJsonLd`/`buildBreadcrumbJsonLd` 헬퍼 신규 추가 (다른 아티클에도 재사용 가능)
  - FAQPage는 기존 FAQ_ITEMS 배열 재사용, `</script>` 이스케이프 처리로 XSS 방지

## 2026-09-03 19:00
- lab 아티클 전체(17개)의 히어로 "LENGTH" 표시값을 실제 렌더링된 본문 글자수(Playwright로 .article-body innerText 측정) 기준 500자 단위 반올림으로 재보정
  - what-is-llmo: 約11,000文字 → 約30,000文字 (원문 복원 이후 대폭 누락되어 있던 값)
  - ai-agent-site 約5,000→約4,500, geo-llmo-company 約8,000→約5,000, entity 約8,000→約6,500, ai-citation-self-check 約3,000→約4,500, adobe-ai-traffic 約6,000→約5,000, geo-watcher-process 約6,000→約6,500, llmo-eeat 約7,000→約4,000, geo-llmo-tools 約6,500→約10,500
  - 나머지 8개(chatgpt-vs-google-seo/seo-geo/brand-cep/query-fan-out/ai-cited-article/ai-citation-comparison/ai-shopping-agent/ecommerce-aeo-geo)는 반올림 결과 기존값과 동일해 변경 없음
  - 이 필드는 프로젝트 전체가 자동 계산 없이 수동 하드코딩하는 기존 패턴이라, 구조는 유지하고 값만 실측치로 보정

## 2026-09-03 18:30
- 사이트 전역에서 본문 중 "LLMO" 텍스트를 찾아 `/lab/what-is-llmo`로 내부링크 추가 (총 14곳)
  - lab 아티클 10개: chatgpt-vs-google-seo, entity, geo-llmo-company, query-fan-out, ai-cited-article, geo-watcher-process, llmo-eeat, ai-citation-comparison, geo-llmo-tools, ecommerce-aeo-geo
  - 그 외 페이지 4개: contact, framework, services(hero+FAQ 2곳), shindan, watcher, why-ascent, 홈(page.tsx), lab 랜딩(lab/page.tsx)
  - services/ServicesFAQ.tsx는 FAQ 데이터가 문자열 배열이라 `a` 필드 타입을 React.ReactNode로 변경해 링크 삽입
  - TOC 컴포넌트(ArticleTOC 3종), PositioningMap.tsx, ai-citation-self-check, LabArticles.tsx는 본문 문장 후보가 없어 제외
- 홈페이지 하단 3카드 그리드의 "AIエージェントはウェブサイトをどう見るのか" 카드를 what-is-llmo 아티클 카드로 교체

## 2026-09-03 17:30
- what-is-llmo "LLMO専任組織に必要な4つの役割" 섹션: 4개 역할(SEO・コンテンツ/デジタルPR/プロダクト・営業/Webエンジニアリング)의 主な役割/主なタスク를 텍스트+리스트에서 2열 article-table(article-table--2col)로 변경
- globals.css의 .article-table__head, .article-table__row에 열 구분선(border-left) 추가 — 전역 클래스라 15개 아티클(query-fan-out, brand-cep, entity 등) 전체 테이블에 적용됨

## 2026-09-03 17:00
- what-is-llmo 아티클 본문 중 "GEO Watcher" 텍스트 3곳(ステップ1 소개 문단, KPI① 도입 문단, KPI② 도입 문단)에 https://geo.ascentnet.co.jp/watcher 외부 링크 추가 (FAQ 배열 내 언급은 문자열 구조상 제외)

## 2026-09-03 16:30
- what-is-llmo 아티클 UI 개선
  - CEP 순서 리스트 직후에 brand-cep의 `TypingPromptCard` 컴포넌트 삽입 (LLMO対策においてプロンプト設計にCEPを取り入れる方法については 문장 위)
  - 5단계 사이클 다이어그램을 정적 이미지에서 watcher 페이지 참조 인터랙티브 컴포넌트(`FiveStepCycle`)로 교체, 배경 하늘색 제거
  - h4 소제목 추가: 「ここで重要になるのがCEPです。」「もう一つのポイントは、「連続する質問」として設計することです」
  - "ステップ4．LLMOをモニタリング" → "ステップ4．モニタリング"로 수정
  - 개선 6개 카테고리 소제목(エンティティ/コンテンツ構造/明確性/権威/技術/継続管理)을 캡션 박스 스타일 `<p>`에서 `<h4 className="article-h4">`로 변경 (24자 초과하는 エンティティ 항목은 style 오버라이드 적용)
  - 4개 TIP박스 색상을 파란색 계열로 통일, 출전 리스트에 arxiv 링크 추가
  - h1/h2 타이틀 등 여러 임의 축약분 사용자 지적으로 원문 복원 완료 (재발 방지 규칙 메모리 등록)

## 2026-09-03 15:00
- what-is-llmo 아티클 전수 재검증: 원본 검토완료본과 페이지 전체를 줄 단위로 대조하여 임의로 요약·축약했던 부분을 모두 원문 그대로 복원
  - 引用/推薦 표: 4번째 열("確認すべき診断ポイント") 복원, TERM_COMPARISON 표도 4번째 열("主なプラットフォーム") 복원
  - 軸①差別化情報価値: 축약됐던 3개 문단(GEO研究 인용, 예시문, 결과문) 복원
  - 軸②エンティティ最適化: 11개 세부항목(6+5개)을 4개로 축약했던 것 원문 그대로 복원
  - 軸③構造化コンテンツ: TIP박스 5개 항목(3개로 축약됨), 마무리 문단, 마루티포맷 5개 항목 복원
  - 軸⑤権威・言及: 도입문단, TIP박스 도입문, ピラーページ 연결 문단 2개, E-E-A-T의 Experience/Expertise/Authoritativeness/Trustworthiness 4개 하위설명 전부 복원
  - ステップ3(CEP): 도입문단 표현, クエリファンアウト TIP 예시문 복원
  - ステップ4: "LLMOのKPI、すなわち..." 문장 복원
  - ステップ5改善: 6개 카테고리(エンティティ/コンテンツ構造/明確性/権威/技術/継続管理) 세부항목을 임의 축약했던 것 전부 원문 그대로 복원
  - KPI①②③: GEO Watcher 대상 LLM 나열, Share of Voice 세부문구, 감정분석 질문 7개(3개로 축약됨) 복원
  - 組織4역할: 각 역할의 "主な役割"/"主なタスク" 소제목+세부항목 16개를 1문장 요약으로 대체했던 것 전부 원문 구조로 복원
  - 5단계 프로세스 도입부, 결론부 마지막 문단("本記事で紹介した5つの評価軸...") 복원
- 재발 방지: "원문 임의 편집 금지" 메모리 규칙 신설(feedback_no-content-editing.md) — 향후 원문→아티클 변환 시 임의 요약/축약/재구성 절대 금지, 항목 단위 1:1 대조 필수

## 2026-09-03 14:15
- what-is-llmo 아티클 재검수: "LLMO KPI別の詳細ガイド" 세부 진단 질문 12개(引用/言及/推薦/ネガティブシグナル 각 3개)의 본문 내용은 복원하되, 소제목("LLMO KPI別の詳細ガイド（確認すべき質問の高度化）") 자체만 제거 — 直前에 소제목과 본문을 통째로 삭제한 것이 잘못이었음
- 모든 article-table(용어비교/引用·推薦/질문패턴)의 상단 여백을 marginTop:0으로 통일해 본문-테이블 간 간격 축소, 하단 여백은 기존 유지

## 2026-09-03 13:30
- what-is-llmo 아티클 검수 반영: 원본에서 통째로 누락됐던 "LLMO KPI別の詳細ガイド"(引用/言及/推薦/ネガティブシグナル 각 3개씩 총 12개 세부 진단 질문) 섹션 복원
- "LLMOの5つの核心軸とは？AIが評価する仕組み" h3/h2 중복 헤딩 제거, 설명 문단을 올바른 섹션(h2 아래)으로 이동
- 인용구(article-quote__text) 폰트 -5px 조정, 도입부 감수자 박스에 사진 추가, 실시간검색/학습·캐시 방식을 2열 카드+검은 헤더로 재구성
- 업종별 AI 유입 막대그래프 아래 4개 업종 상세 지표 리스트 추가, 하단에 있던 동일 내용 중복 블록 제거

## 2026-09-03 12:00
- lab 아티클 신규 추가: 「LLMOとは？意味・SEOとの違いから対策方法まで完全ガイド」(`/lab/what-is-llmo`)
- 사용자 검토완료본 `GEO_contents/LLMOとは（日本語版チェック済み）.docx` 내용을 기준으로 본문 작성 (10개 섹션, 4가지 이유 / 5개 핵심축 / 5단계 프로세스 / 4개 KPI / 4개 조직역할 / FAQ 11개)
- 원본 이미지 7개(ChatGPT답변예, Apple검색결과, 구조화콘텐츠예, 5단계사이클, Watcher브랜드등록/가시성/SoV 화면) 모두 포함, ArticleThumbnail에 `what-is-llmo` variant 신규 추가
- 감수자/출전 박스는 article-note-panel 패턴 재사용, LabArticles.tsx POSTS 배열에 등록(날짜 2026.09.03 기준 그리드 최상단 자동 노출 확인)

## 2026-09-03 11:30
- 아티클 페이지 배경색을 #FDFDFB → #FFFFFE로 미세 조정 (`.article-page`, `.article-shell`만 변경, 사이트 전역 --bg 변수는 유지)

## 2026-09-02 00:40
- 아티클 좌측 목차(TOC) 폰트 사이즈 전역 +2px 확대: `globals.css`의 `.article-toc__item`, `.article-toc__index` 11px → 13px (모든 lab 아티클 페이지 공통 적용, `.article-toc__title`은 inherit로 자동 반영)

## 2026-09-02 00:30
- query-fan-out 아티클 재검수 반영: 「AIによる概要とAIモードの違い」테이블 wrapper에 누락된 `my-6` 여백 클래스 추가(테이블 바로 아래 소제목이 붙어있던 문제 해결)
- 出典・参考 리스트가 `article-list`(18px, 큰 파란 불릿)를 써서 감수자 텍스트보다 과도하게 커 보이던 문제 수정 → `article-note-panel__text--muted` 톤(13px, 작은 텍스트 불릿)으로 통일
- 재발 방지를 위해 "아티클 테이블 하단 여백 / 감수자·출전 박스 포맷" 규칙을 메모리에 저장

## 2026-09-02 00:20
- query-fan-out 아티클 소제목 시맨틱 수정: `<p className="font-bold text-[15px]">`로 처리되던 10개 소제목(AIによる概要、ファンアウトの語源 등)을 `<h3 className="article-h4">`로 교체해 h2→h3 문서 구조를 올바르게 정리

## 2026-09-02 00:10
- query-fan-out 아티클 검수 반영: 히어로 아래 커스텀 감수자 박스 제거, まとめ 섹션 하단에 geo-llmo-tools와 동일한 `article-note-panel` 2열 레이아웃(감수자 사진 포함 + 출전・参考 리스트)으로 교체
- shimada.png 아바타 이미지를 query-fan-out 폴더에 복사해 사용

## 2026-09-02 00:00
- lab 아티클 신규 추가: 「クエリファンアウトとは？GEO・LLMO対策への活用方法も解説！」(`/lab/query-fan-out`)
- docs 폴더의 원본 docx(クエリファンアウト.docx)를 기반으로 본문 작성, ArticleThumbnail에 `query-fan-out` variant 신규 추가
- LabArticles.tsx POSTS 배열에 추가(날짜순 자동 정렬로 그리드 최상단 노출 확인)

## 2026-09-01 13:21
- `What Is LLMO_ Optimize Content for AI & Large Language Models.pdf`의 본문, 비교표, 체크리스트, 프롬프트 예시를 자연스러운 한국어 Markdown 번역본으로 정리

## 2026-08-13 00:40
- Watcher スタンダードプラン 카드 배경색을 검정(#0B0B0E) → 네이비(#0a1a3d)로 변경
- docs 정리: 오래된 임시 문서(01. GEO리뉴얼-홈.docx, new.docx) 삭제, watcher-lp.docx 갱신본 반영

## 2026-08-13 00:30
- Watcher 料金プラン 비교표 아래에 プロジェクト数(=ブランド) 설명 각주 추가
- 하단 「料金・プランについて問い合わせる」 링크 삭제

## 2026-08-13 00:15
- Watcher 料金プラン: 月払い/年払い 가격을 GEO-Watcher 실제 STRIPE_PLANS 월額(29,800/39,800/79,800円)과 일치시킴
- 연간 선택 시 월환산가 표시 제거, add-on 안내 문구 다듬기(10個, 박스 강조 스타일)
- 月払い/年払い 토글 각 버튼에 「（税込）」 표시 추가

## 2026-08-12 23:50
- GEO-Watcher 프로젝트에서 Stripe 결제 연동 인계서(16/17/18/19/22번 문서) docs/ 폴더로 복사
- Watcher 料金プラン을 PricingSection.tsx 클라이언트 컴포넌트로 분리, 月払い/年払い 토글 및 プロンプト追加オプション(+10個) 체크박스 구현
- 각 플랜 CTA를 https://geo-watcher.ascentnet.co.jp/signup?plan=...&annual=...&promptAddonEnabled=... 로 연동 (GEO-Watcher 인계서의 가입→자동チェックアウト 흐름 준수)
- 가격/모델 개수를 GEO-Watcher 실제 STRIPE_PLANS 데이터와 일치시킴 (light/standard/advanced 월額29,800/39,800/79,800円, 年額298,000/398,000/798,000円)
- 料金プラン 상단에 5단계 이용 흐름 안내 및 Stripe 안전결제 안내 문구 추가

## 2026-08-12 22:40
- Watcher 料金プラン 섹션 재구성: カスタマイズプラン을 4열 카드/비교표에서 분리, 3개 플랜만 카드+비교표로 유지
- 비교표를 왼쪽 라벨 열(項目/AIモデル 등) + 3개 플랜 열 구조로 재구성해 위쪽 카드와 세로 정렬이 정확히 일치하도록 개선
- カスタマイズプラン을 비교표 하단에 별도의 가로형 카드로 배치
- FAQ 섹션 FREQUENTLY ASKED 라벨 제거, 상단 여백 축소
- Index/Watcher 히어로 서브카피 최대 너비 및 폰트 컬러 조정

## 2026-08-12 21:30
- Watcher 히어로 타이틀 구조 재편: h3(GEO・LLMO・AIO対策は月額コンサルなしで、これひとつ。)와 h1(AI 対策ツール GEO Watcher) 2단으로 분리
- h1 영어 부분(AI/GEO Watcher)에 NiveauGrotesk 폰트 적용(53px), 일본어 部分(対策ツール)만 Pretendard JP 별도 크기(49px) 적용
- h1 전역 사이즈(--fs-display)를 1200px 이상 데스크탑에서 52px 고정되도록 조정 (clamp 기준값 변경)

## 2026-08-12 18:40
- Watcher 主要機能 섹션(#features) 신규 구현: ガイド付きデモ(GuidedDemo 클라이언트 컴포넌트, STEP 1~5 인터랙티브 투어) 추가
- AI可視性/プロンプトモニタリング/シェア・オブ・ボイス/引用URL分析 4개 기능을 이미지+텍스트 지그재그 레이아웃으로 구성, public/watcher-demo/ 이미지 추가
- Watcher 選ばれる理由 섹션(#reasons) 신규 구현: h2/h3 + 6개 카드(파란 헤더 구분), 카드 제목 핵심 문구 하늘색 형광펜, h2 노란 형광펜
- StepsSection·ReasonsSection 배경을 그라데이션 없는 파란 단색(#d4e8f7)으로 통일
- 앵커 네비게이션에 主要機能(#features), 選ばれる理由(#reasons) 링크 복원
- 料金プラン 제목 가운데 정렬

## 2026-08-12 20:15
- Watcher スポットサポート 섹션(#support) 신규 구현: h2/h3 구조, 2개 카드(プロンプト設計サポート/コンテンツ改善診断), spot01/spot02 이미지, 가격 테이블, 말풍선 태그
- 選ばれる理由 6개 카드: 테두리 제거, 말풍선 헤더(노란색 #ffcc00) + 번호 배지로 재구성
- 顧客の声(#testimonials) 3열 카드 레이아웃으로 변경, 헤드라인을 파란 말풍선(#0066ff, 위쪽 꼬리)으로 표시
- 主要機能 4개 기능 설명 제목 파란색 + 하늘색 형광펜, 데모/기능 사이 간격 축소
- CTA 섹션 캘린더 버튼 아래 HeroLogoMark(수상 배지) 추가
- 전역 폰트 사이즈 세부 조정 다수

## 2026-08-12 16:25
- h2 전역 사이즈 조정: `--fs-section-title` clamp(30px, 3.2vw, 40px)
- Watcher 히어로 AI 로고와 h1 간격을 인덱스 페이지와 동일하게 통일 (로고 mb-8, h1 mt 제거)

## 2026-08-12 16:10
- 폰트 사이즈 전역 통일: h1 `--fs-display` clamp(36px, 3.4vw, 50px), h2 `--fs-section-title` clamp(32px, 3.2vw, 42px)
- 각 페이지 h1 인라인 clamp 값을 `--fs-display` 변수로 일괄 교체 (shindan/framework/lab/services/why-ascent/whitepaper/contact/wp-side)
- Watcher StepsSection을 상단 5-1-2, 하단 4-3 사이클 레이아웃으로 재구성 (Flexbox 기반, 직선 화살표)
- Watcher 히어로 하단에 앵커 네비게이션 추가, 각 섹션 라벨·구분선 제거, 배경 화이트 통일
- Contact 페이지 히어로 배경을 하늘색 그라데이션으로 변경, 폰트 컬러 조정, 버튼 레이아웃 및 FAQ 항목 수정

## 2026-08-11 23:05
- 로컬 개발 서버를 `npm run dev`로 재실행하고 `http://localhost:3000` 기동 상태를 확인

## 2026-08-11 11:40
- 과제 카드에 `Design/mkt-stress.png`와 `Design/sales-stress.png` 원형 이미지를 삽입하고 중앙 정렬로 정리

## 2026-08-11 11:35
- 과제 섹션 상단에 흰색 라운드 안내 영역과 `こんなお悩みありませんか？` 문구 삽입

## 2026-08-11 11:30
- `目的によって異なる、GEO・LLMO対策の課題。` 섹션 좌우 카드의 원형 이미지 2개 제거 및 상단 여백 정리

## 2026-08-11 11:25
- 히어로 CTA 버튼 아이콘·텍스트 간격을 `gap-3`에서 `gap-0`으로 3단계 축소

## 2026-08-11 11:20
- 히어로 CTA 버튼 아이콘·텍스트 간격을 `gap-5`에서 `gap-3`으로 2단계 축소

## 2026-08-11 11:15
- 히어로 CTA 버튼의 강제 `gap-0` 제거, 아이콘·텍스트 간격은 링크의 `gap-5`만 사용하도록 정리

## 2026-08-11 11:10
- 히어로 양쪽 CTA 버튼의 아이콘·텍스트 간격을 `gap-5`로 추가 확대

## 2026-08-11 11:05
- 히어로 양쪽 CTA 버튼의 아이콘과 텍스트 간격을 `gap-4`로 넓혀 가독성 개선

## 2026-08-11 11:00
- 히어로 양쪽 그래프 프리뷰에 동일한 `3:2` 비율과 고정 flex 동작을 적용해 이미지 높이를 통일

## 2026-08-11 10:55
- 히어로 양쪽 CTA 버튼의 높이와 내부 링크 영역을 동일하게 고정하고, 아이콘·굵은 텍스트를 함께 중앙 정렬

## 2026-08-11 09:11
- 홈 `ChallengesSection` 하단 디바이더를 흰 배경 위 직선형 사선 SVG로 변경
- `scripts/challenges-divider.test.mjs` 회귀 테스트 추가로 하단 디바이더 마크업 고정

## 2026-08-03 16:20
- ホームページ・ヘッダーナビをGEOリニューアル設計書（docs/superpowers/specs/2026-08-03-home-renewal-design.md）に基づき刷新
- ヘッダー: Home/GEO Watcher/GEO診断/GEO LABの4項目構成に変更
- トップページ: Hero新コピー化、2ソリューション紹介/課題提示/解決フローの3セクション新設、SearchShift/Servicesセクション削除、GEO Labリード文更新、CTAセクションを2ボタン構成に変更
- 2ソリューション紹介セクションにdocx原本イラスト（GEO Watcher/GEO診断カード）を追加
- HeroにAIモデルロゴ（ChatGPT/Claude/Gemini/Perplexity/Copilot/Google AI）のストリップを追加
- Hero CTAをカレンダー予約ボタンから対象者別2ボタン（GEO Watcher/GEO診断）に変更し、共通Button variant(cta/ctaOutline)に統一

## 2026-07-16 17:50
- 로컬 개발 서버 실행: `npm run dev`로 Next.js 서버를 띄우고 `http://localhost:3000` 응답을 확인

## 2026-07-14 15:55
- 로컬 개발 서버 상태 확인: 동일 프로젝트의 `next dev`가 이미 실행 중임을 확인하고 `http://localhost:3000` 응답을 검증

## 2026-06-30 11:30
- 4개 주요 페이지 SEO 메타데이터 변경: 서비스, Ascent의 강점, Framework, 문의 페이지의 타이틀 및 디스크립션 문구를 일괄 갱신

## 2026-06-30 11:22
- SEO 메타데이터 변경: 기본 설정 및 메인 페이지의 타이틀/디스크립션을 사용자 지정 문구로 일괄 변경
  - 변경 타이틀: `GEO・AIO・LLMOによるAI検索最適化 | Ascent GEO` (기본 및 메인 타이틀 공통)
  - 변경 디스크립션: `GEO・AIO・LLMOによるAI検索最適化を支援。特許分析と検索データに基づく戦略設計から、AI検索でのブランドプレゼンスを継続的に可視化・改善するモニタリングツール「GEO Watcher」まで、株式会社 Ascent Networksが提供します。` (기본 및 메인 디스크립션 공통)

## 2026-06-22 14:19
- `/lab` 하단 카드 순서 조정: `LLMOにおけるE-E-A-Tの重要性`를 첫 카드로 이동하고 전용 `llmo-eeat` 썸네일 variant를 추가

## 2026-06-22 14:17
- `LLMOにおけるE-E-A-Tの重要性` 아티클 추가: `/lab/llmo-eeat` 신규 라우트와 TOC 생성, `LabArticles.tsx` 목록 카드 연결

## 2026-06-13 09:11
- 전역 SEO 기본 설명 문구 수정: `src/lib/seo.ts`의 기본 description을 `AI検索時代、推測ではなく、データと特許に基づくブランド戦略。`로 교체

## 2026-06-09 15:59
- zip 기반 텍스트 갱신: index / services / lab / framework / why-ascent / CTA의 GEO 문구를 GEO(LLMO) 기준으로 정리하고 관련 프레임워크 라벨과 FAQ 문안을 일괄 수정

## 2026-06-08 10:08
- GEO Lab 페이지 Soro Blog 임베드: `src/app/lab/page.tsx` 하단에 외부 블로그 피드 노출을 위한 div 및 `next/script` 연동 추가

## 2026-05-24 13:05
- 컨택폼 완료 페이지 URL 확인: `/contact/thanks` (full URL: `https://geo.ascentnet.co.jp/contact/thanks`)

## 2026-05-24 13:00
- 화이트페이퍼 완료 페이지 URL 확인: `/whitepaper/downloaded` (full URL: `https://geo.ascentnet.co.jp/whitepaper/downloaded`)

## 2026-05-24 10:30
- 화이트페이퍼 어드민 알림 메일 구현: 다운로드 시 geo@ascentnet.co.jp로 폼 내용 포함 발송 (WhitepaperAdminEmail 신규 작성)
- PDF 재업로드 로직 제거: 매 요청마다 로컬 파일 읽어 Storage 업로드하던 불필요한 처리 삭제
- contact/whitepaper API 필수 필드 validation 추가: 빈 바디 요청 DB 도달 전 400 차단
- 사용자/어드민 메일 수신 확인 완료

## 2026-05-24 09:30
- 컨택폼 메일 발송 버그 수정: Vercel Production 환경변수 `RESEND_API_KEY`, `RESEND_FROM_EMAIL` 빈 값 → 재등록. `CONTACT_ADMIN_EMAIL`이 `geo.ascent@ascentnet.co.jp`로 잘못 설정돼 있어 `geo@ascentnet.co.jp`로 수정. 재배포 후 사용자/어드민 메일 수신 확인 완료.

## 2026-05-24
- 화이트페이퍼 PDF 교체: `docs/Ascent_GEO_Service.pdf`를 Supabase Storage(`whitepaper-assets/whitepaper.pdf`)에 업로드(upsert). `whitepaper-download.ts`의 소스 파일명도 업데이트.

## 2026-05-23
- Google Analytics (G-H7YRT79KK0) 연동: `layout.tsx`에 `next/script` `afterInteractive` 전략으로 GA4 태그 추가

## 2026-05-22 19:10
- `/services` Packagesセクションをサービス紹介資料PDF 18ページ内容に全面刷新：Standard Plan / Multi-Brand Plan の2プラン構成に変更、各プランの説明・機能リスト・アイコン・CTAボタンを更新

## 2026-05-22 18:01
- `public/robots.txt`와 `public/llms.txt`를 정적 파일로 추가하고, 사이트 도메인을 `geo.ascentnet.co.jp`로 맞춤

## 2026-05-22 17:57
- `public/sitemap.xml`을 정적 파일로 추가하고, `privacy`/`thanks` 및 noindex 페이지를 제외한 절대 URL 목록으로 정리함

## 2026-05-22 17:51
- 문의/화이트페이퍼 메일 발신자를 `no-reply@ascentnet.co.jp`로, 어드민 수신자를 `geo@ascentnet.co.jp`로 정리하고 회귀 테스트를 맞춤

## 2026-05-22 17:49
- /whitepaper의 잘못된 토큰 접근을 /whitepaper/denied로 분리하고, DeniedAccess 전용 안내 페이지를 연결

## 2026-05-22 17:44
- /whitepaper의 잘못된 접근 흐름을 e2e 재확인: 직접 접근 및 bad token 모두 /whitepaper/downloaded로 유지되는지 검증

## 2026-05-22 17:42
- /whitepaper 폼 제출, Resend 메일 수신, 토큰 링크 클릭, private Supabase bucket signed URL PDF 응답까지 end-to-end 검증 완료

## 2026-05-22 17:32
- /whitepaper 다운로드를 private bucket + 메일 토큰 + Supabase service role 기반 signed URL 경유 방식으로 정리하고, 접근 실패 시 잘못된 접근 페이지로 보내도록 수정

## 2026-05-22 17:24
- /whitepaper 다운로드를 private Supabase bucket + 메일 토큰 검증 + 잘못된 접근 페이지 리다이렉트 방식으로 전환

## 2026-05-22 17:17
- /whitepaper 다운로드 링크를 Supabase Storage 공개 URL 기반으로 전환하고, Storage 버킷/정책 마이그레이션을 추가

## 2026-05-22 17:08
- /whitepaper 폼 제출 후 메일 링크가 실제 GEO 서비스 소개 자료 PDF 다운로드를 트리거하도록 API/첨부 응답을 연결

## 2026-05-22 17:03
- /whitepaper ヒーロータイトルの強調表示を हटして、通常テキストに調整

## 2026-05-22 16:59
- /whitepaper を GEO サービス紹介資料 PDF ベースに再構成し、デザインを維持したまま文言を全面更新

## 2026-05-22 16:28
- 비-DNS 정리: ESLint가 `.claude` worktree까지 스캔하던 문제를 제외하고, `Header` 링크 정리 / `ai-agent-site` 코드 예시 따옴표 수정 / `brand-cep` reduced-motion effect 경고를 정리해 lint를 통과시킴

## 2026-05-21
- Q2 → Q1 수정: Adobe AIトラフィックレポート 제목 전체 (adobe-ai-traffic/page.tsx, LabArticles.tsx, RelatedResearchSection.tsx, page.tsx) Q2를 Q1로 일괄 수정
- /lab/page.tsx featuredSide 카드 타이틀 폰트사이즈 18px → 20px 변경

## 2026-05-21 (버그 재발 기록)
- article-list__item 내 `<strong>` 직접 자식 배치 버그 재발 — 텍스트가 한 글자씩 세로 나열됨

**원인**
- `article-list__item`이 `display: grid; grid-template-columns: 22px 1fr`인 그리드 컨테이너. `<strong>` 태그가 직접 자식으로 있으면 grid item 2(1fr)를 차지하고, 뒤따르는 텍스트 노드가 grid item 3(암묵 컬럼·22px 폭)에 밀려 1문자씩 세로 나열됨.

**영향 범위**
1. `/lab/ai-shopping-agent` s8 まとめ 섹션의 3개 리스트 항목
2. `article-list__item` 구조를 사용하는 모든 아티클 페이지 (동일 패턴 존재 시)
3. 좁은 폭(22px) 컬럼에서 일본어 텍스트가 강제 줄바꿈되어 레이아웃 붕괴

**재발 방지 테스트**
- `<strong>ラベル：</strong>続きテキスト` 패턴 작성 후 렌더링 확인 → 세로 나열이면 버그 발생
- 올바른 패턴: `<span><strong>ラベル：</strong>続きテキスト</span>` 으로 반드시 단일 span 래핑

## 2026-05-21
- 新アーティクル追加: `/lab/ai-shopping-agent`（AIショッピングの登場とエージェンティックコマース）
  - `src/app/lab/ai-shopping-agent/page.tsx` + `ArticleTOC.tsx` 作成（8セクション構成）
  - `ArticleThumbnail.tsx` に `ai-shopping-agent` バリアント追加
  - `LabArticles.tsx` POSTS 配列に追記
  - `RelatedResearchSection.tsx` に記事追加・型拡張

## 2026-05-20 10:50
- 문의 API의 발신자/관리자 메일 기본값을 `geo@ascentnet.co.jp`로 통일하고, 관련 회귀 테스트를 추가함

## 2026-05-20 10:26
- 푸터 전역 연락처를 `geo@ascentnet.co.jp`에서 `TEL: 03-3527-3963`로 교체하고, 로고 홈 링크를 `Link`로 정리함

## 2026-05-20 10:19
- 아티클 페이지 `/lab/geo-llmo-company`, `/lab/seo-geo`, `/lab/brand-cep`, `/lab/ai-agent-site`, `/lab/adobe-ai-traffic`의 하단 CTA를 전역 공통 `SeoGeoCTASection`으로 통일하고, 무료상담 전용 카피를 제거함

## 2026-05-20 10:03
- `/lab/geo-llmo-company` 하단 `監修` 문구에서 "Samsung Japanをはじめとする企業のAI Visibility改善を支援。" 문장을 삭제하고, 회귀 테스트를 추가함

## 2026-05-20 17:00
- 홈 SERP 카드: 제목·수치·설명 업데이트 — Ahrefs 2025/2026 데이터 기준, CTR −34.5%→−58% 반영

## 2026-05-20 15:30
- FrameworkSection: 5 Phase Loop SVG에 ripple 파동 애니메이션 추가 (CSS blur, 중앙 마스크 처리)
- FrameworkSection: 노드 원 배경 #1e2a52, 비활성 테두리 제거
- 홈 SEO時代 카드: 레드 계열 다크 그라디언트 배경 적용
- 홈 AI 成長 카드: 그래프 끝점 잘림 수정 (overflow visible, 끝점 385,6으로 조정)

## 2026-05-20 00:24
- CTA 공통 `相談する` 버튼의 흰색 테두리 제거: `ui-cta-button` border를 transparent로 변경

## 2026-05-20 
- **Lab 페이지 레이아웃 수정**: `/lab`
  - Featured 섹션 오른쪽 2개 카드 높이를 왼쪽 큰 카드와 동일하게 맞춤 (flex stretch)
  - LabArticles 중복 렌더링 제거 — page.tsx Featured 섹션과 겹치던 가운데 줄 삭제
  - LabArticles를 POSTS[2] 이후만 3열 그리드로 렌더링하도록 단순화

## 2026-05-19 19:30
- **新規アーティクルページ作成**: `/lab/ai-agent-site`
  - AIエージェントがサイトを認識する3つの方法（画面画像・構造・組み合わせ）の解説記事
  - ArticleTOC / page.tsx 作成（11セクション構成）
  - コードブロック用 `.article-code` スタイルを globals.css に追加
  - LabArticles・ArticleThumbnail（`ai-agent-site`バリアント追加）・RelatedResearchSection 更新
  - メタタイトル・ディスクリプション・OGタグ日本語で設定済み
  - ビルド確認済み

## 2026-05-19 18:00
- **新規アーティクルページ作成**: `/lab/adobe-ai-traffic`
  - Adobe Digital Insights 2026 Q2 AIトラフィックレポートの解説記事
  - 6種のSVGグラフコンポーネントを実装（AdobeCharts.tsx）：業界別増加率棒グラフ、リテール比較バー、旅行CVR差折れ線、業界別エンゲージメント比較、世代別ドーナツ、テクノロジー購入カテゴリ横棒
  - ArticleTOC / page.tsx 作成
  - LabArticlesの4番目カード（「SEO と GEO は、何が決定的に違うのか」）を新記事に差し替え
  - ArticleThumbnail に `adobe-ai-traffic` バリアント追加（バーチャートビジュアル）
  - RelatedResearchSection に新記事エントリを追加
  - ビルド確認済み（静的ページとして生成）

## 2026-05-20 00:40
- **Framework 5각형 다이어그램 디테일 개선** (FrameworkLoop.tsx)
  - 5각형 내부 `#0d1b3e` 단색 (그라디언트 제거), 바깥 점선 `#1e3a6e` opacity 0.5 + 120초 시계방향 회전
  - 파동 애니메이션: `r: 2 → 34`, 8초/2.6초 간격, strokeWidth 2.5 + blur stdDeviation 4 (선 안보이게)
  - 코어 배경 원 `r=12`, 중앙 텍스트 "Ascentの" + "GEO Framework" 동일 스타일
  - 노드 카드: `#1a3a7a` 2.5px 테두리, 호버 시 배경 반전
  - 詳しく見る → 버튼 폰트사이즈 13px으로 축소 (globals.css)

## 2026-05-19 23:50
- **Framework 페이지 [ 01 ] LOOP 다이어그램 완전 재설계** (FrameworkLoop.tsx, framework/page.tsx)
  - FrameworkLoop: 단순 흰 카드+얇은 선 → 딥네이비 다크 컨테이너 + 풀 SVG 리디자인
  - 배경: `radial-gradient(#0b1a3a, #020818)` + 격자 그리드 오버레이 + 앰비언트 블로브
  - 오빗 링 2개(외부 대시, 내부 대시) + 스포크 라인(센터→노드) + 화살표 마커 아크 엣지
  - 노드: 각 Phase별 `#7ab6ff / #5c8dff / #3d7eff / #0070f3` 개별 컬러 + 글로우 링 3레이어
  - 노드 카드: `radial-gradient(bgFrom, #020818)` 배경, 상단 accent 라인, 호버 시 glow 강화
  - 센터: `0 0 32px #0070f330` 글로우 원형 + "GEO LOOP" 레이블
  - FrameworkOverview 섹션: 섹션 레이블 블루 글로우 도트, 헤드라인 2컬럼 레이아웃, 모바일 폴백 카드 추가

## 2026-05-19 23:30
- **카드 비주얼 컬러 팔레트 교체** (page.tsx, globals.css) — ascent-hp.vercel.app 참조
  - 기존 `#1452FF / #6B8FFF` → 참조 사이트 팔레트 `#0070f3 / #3d7eff / #7ab6ff`로 전면 교체
  - 차트 카드 배경: 단색 `#0B0B0E` → `radial-gradient(#0b2260 / #161a30 / #112030, #0a0a12 70%)` 딥네이비 계열
  - SERP 감소 차트: `#0e1b3e → #010108` 딥다크 배경 + `#cd2e3a / #ff5c73` 레드 라인
  - AI 성장 차트: `#0b2260 → #000` 딥블루 배경 + `#0070f3 → #7ab6ff` 그라디언트 라인
  - Services 비주얼 4종: 각각 `#112030 / #161a30 / #122430 / #0b2260` radial-gradient 배경
  - tag-blue: 단색 → `linear-gradient(90deg, #0070f3, #3d7eff)` + glow shadow
  - tag-dark: 테두리/텍스트 `#7ab6ff1a / #7ab6ff80`으로 교체

## 2026-05-19 23:10
- **인덱스 카드 그래프 비주얼 강화** (src/app/page.tsx)
  - `SearchShiftSection`: SERP 감소 차트 — 레드→오렌지 멀티 그라디언트 라인, 글로우 이펙트, 데이터 포인트+펄스 애니메이션, 그리드 라인 추가
  - AI 성장 차트 — 블루→라이트블루 그라디언트, 글로우, 끝점 펄스 링 애니메이션
  - `ServicesSection` 비주얼 4종 강화:
    - Question Cluster: 5단계 블루 그라디언트 바, 글로우 라벨, 배경 블러 포인트
    - GAP 분석 도넛: 그라디언트 스트로크+글로우 레이어, 스코어 그라디언트 텍스트, GAP 바 추가
    - Passage Structure: 항목별 스코어 표기, 그라디언트 바, AI CITATION READY 배지
    - Citation Trend: 최신 바 그라디언트+글로우, MoM 수치, 12-week 레이블

## 2026-05-19 22:30
- **아티클 공통 디자인 개선** (globals.css / geo-llmo-company, seo-geo 페이지)
  - **포지셔닝 맵**: 이미지 → SVG+React 컴포넌트(`PositioningMap.tsx`)로 교체. 7개 원 각각 독립 float 애니메이션, 배경 투명, 테두리/그림자 제거. 회사명 Ascent Networks → Ascent GEO. 원 크기 통일(r=32)
  - **FAQ**: 배경을 단색에서 Q(네이비 `#0F1F4A`) / A(크림 `#F2F0EA`) 2분할 구조로 재디자인. FAQ 아이템들이 `gap: 2px`로 이어붙어 하나의 블록처럼 보이도록 처리. Q 레이블 블루, A 레이블 그레이
  - **테이블**: 별도 수정 없음 (기존 스타일 유지)
  - **관련기사·인용**: 별도 수정 없음 (기존 스타일 유지)

## 2026-05-19 20:59
- 상단 메뉴와 하단 푸터의 내부 페이지 링크를 표준 `<a>`로 변경해 클릭 시 강제 리로드되도록 정리함

## 2026-05-19 20:58
- `geo-llmo-company` 포지셔닝 맵 이미지에 미세한 좌우/상하 흔들림 애니메이션(`map-jitter`)을 추가해 그래프 원들이 살아 움직이는 느낌을 강화함

## 2026-05-19 20:56
- `geo-llmo-company` 하단 정보 패널의 `監修` / `出典・参考` 라벨 폰트를 2px 키워 시각적 위계를 강화함

## 2026-05-19 20:55
- `geo-llmo-company` 아티클 하단의 `監修` / `出典・参考` 영역을 카드형 패널로 재디자인해 가독성과 시각적 정리를 개선함

## 2026-05-19 20:53
- 서비스 페이지의 4단계 요약 영역을 삭제하고, 서비스 섹션 간 여백을 `py-[112px]`로 재조정함

## 2026-05-19 20:52
- 데스크탑 공통 콘텐츠 폭을 이전값 `1280px`로 롤백해 전체 레이아웃 폭을 복구함

## 2026-05-19 20:50
- `/lab/ai-overview` 아티클 페이지와 TOC를 삭제하고, 관련 카드 데이터에서도 제외해 라우트와 노출을 완전히 제거함

## 2026-05-19 20:48
- 아티클 하단 관련 카드 데이터를 실제 존재하는 Lab 아티클 4개만으로 재구성하고, 현재 글을 제외한 3개만 노출되도록 정리함

## 2026-05-19 20:47
- 관련 리서치 섹션 공통 제목을 `関連記事`로 변경해 아티클 하단 노출 영역의 라벨을 통일함

## 2026-05-19 20:44
- 아티클 공통 하단에 현재 글을 제외한 관련 리서치 3개 카드를 노출하는 `RelatedResearchSection`을 추가하고, Lab 아티클 4개 페이지에 일괄 적용함

## 2026-05-19 20:38
- `geo-llmo-company` 아티클의 마지막 섹션 제목을 `まとめ : 自社に合う1社を見極めるために -`로 수정하고 TOC 표기도 맞춤

## 2026-05-19 20:33
- 아티클 본문 핵심 문장을 공통 quote 스타일로 전환하고, AI Overview / Brand CEP / SEO-GEO / GEO LLMO 비교 글의 강조 블록을 인용 디자인으로 교체함

## 2026-05-19 20:25
- 데스크탑 공통 콘텐츠 폭을 `1280px`에서 `1152px`로 10% 축소하고, 헤더/푸터/홈/랩/서비스/프레임워크/아티클 래퍼에 일괄 적용함

## 2026-05-19 20:22
- 홈 GEO Lab 인덱스의 3번째 카드에 `geo-llmo-company` 아티클을 반영하고, 기존 placeholder 카드를 새 비교 글로 교체함

## 2026-05-19 20:19
- 아티클 공통 테이블 레이아웃 조정: 첫 번째 열이 더 좁아지도록 `.article-table__head`와 `.article-table__row`의 3열 비율을 변경함

## 2026-05-19 20:17
- `docs/GEO_LLMO対策おすすめ会社7選_比較記事.docx` 원문 기준으로 `/lab/geo-llmo-company`를 재작성하고, 7개 회사 비교·포지셔닝 맵·선정 기준·비용·FAQ까지 본문을 문서 흐름에 맞게 교체함

## 2026-05-19 20:12
- GEO/LLMO 아티클의 META INFORMATION 박스를 본문에서 제거하고, 관련 키워드를 `metadata.keywords`로 이동함

## 2026-05-19 20:10
- 아티클 테이블 폰트 크기를 추가로 축소: `.article-table__head`와 `.article-table__cell`을 `calc(var(--fs-body) - 2px)`로 조정

## 2026-05-19 20:09
- 아티클 테이블 전역 폰트 크기를 1px 축소: `.article-table__head`와 `.article-table__cell`에 `calc(var(--fs-body) - 1px)` 적용

## 2026-05-19 19:35
- 새 아티클 페이지 `/lab/geo-llmo-company` 추가: GEO/LLMO 추천 회사 7선 비교 글을 기존 아티클 패턴으로 구현하고, Lab 목록/썸네일/목차를 함께 갱신함
- 빌드 통과 확인, 변경 파일 기준 ESLint도 정상 통과함

## 2026-05-19 17:00
- 각 페이지 SEO 타이틀/메타를 최종 목록으로 재정렬: Home, Why Ascent, Framework, Lab, Services, Contact 문구를 요청한 LLMO 버전으로 갱신함

## 2026-05-19 16:48
- Services 페이지 SEO 타이틀을 `GEO・LLMO Services | Ascent GEO・LLMOのサービス詳細 - 株式会社 Ascent Networks`로 변경하고 회귀 테스트를 갱신함

## 2026-05-19 16:45
- 각 페이지 SEO 타이틀/메타 설명 정리: Home, Why Ascent, Framework, Services, GEO Lab, SEO GEO, Brand CEP에 이미지 기준 메타를 반영하고 회귀 테스트를 추가함

## 2026-05-19 11:15
- 전 페이지 SEO/OG 메타 정리: 공통 메타 헬퍼와 루트 `metadataBase`를 추가하고, 모든 주요 페이지에 OG/twitter 이미지 및 canonical 태그를 적용함

## 2026-05-19 10:25
- 도메인/Resend 잔여 항목 점검: 현재 코드에는 `metadataBase`/canonical/redirect 설정이 없고, Resend 발신주소는 아직 `onboarding@resend.dev` 기본값이 남아 있어 환경변수 교체와 Resend 도메인 인증이 핵심 남은 작업임을 확인함

## 2026-05-19 10:21
- GEO Lab 카드와 Why Ascent 히어로의 모바일 오버플로우를 정리하고, 공통 아티클 썸네일 컴포넌트를 추가해 홈과 Lab 카드 비주얼을 통일함

## 2026-05-19 10:13
- 아티클 카드 썸네일을 본문 상단 이미지 스타일의 다크 배경 레이어로 통일함: 홈 인덱스 GEO Lab 카드와 `/lab` 카드 뷰에 `seo-geo` / `brand-cep` 이미지 썸네일을 반영하고, 공통 썸네일 컴포넌트를 추가함

## 2026-05-19 07:43
- why-ascent 페이지 Intent 섹션 모바일 레이아웃 수정: 모바일에서 MONTHLY AVG. 키워드 블록을 상단에, 3개 인텐트 박스를 하단 수직 배치 (`flex-col` → `sm:flex-row`)

## 2026-05-19 08:09
- 아티클 페이지 모바일 가로 스크롤 수정: `article-h2` 줄바꿈 허용, 본문 미디어 `max-width: 100%` 적용, 모바일 메타/표/원칙 카드 레이아웃 보강
- 회귀 방지용 `scripts/article-mobile-overflow.test.mjs` 추가

## 2026-05-18 23:22
- 인덱스 화면의 지표 카드 수치를 `−58% → −28%`, `+700% → +240%`로 조정함

## 2026-05-18 23:18
- brand-cep 타이핑 프롬프트 카드의 반복 재생을 제거하고 1회만 타이핑되도록 수정함

## 2026-05-18 23:13
- 공통 CTA의 상담하기 버튼 기본 색상을 블루로 변경함

## 2026-05-18 23:09
- brand-cep 타이핑 프롬프트 카드의 프레임을 고정하고 내부 텍스트만 반복 타이핑되도록 정리함

## 2026-05-18 23:07
- brand-cep 타이핑 애니메이션을 2회 반복 후 정지하도록 조정함

## 2026-05-18 23:05
- brand-cep 본문 중간 이미지를 Typing Prompt 애니메이션 카드로 교체하고, 상단 이미지는 유지함

## 2026-05-18 22:05
- why-ascent 인텐트 헤드라인에서 `真の顧客` 양쪽 괄호 제거

## 2026-05-18 21:15
- why-ascent 페이지 내부링크 삽입
  - W/01 특허 섹션 "GEO を設計" → /framework
  - W/02·A 인텐트 섹션 "リスニングマインド" → /services, "GEO 設計" → /framework
  - W/02·C CEP 섹션 "CEP(Category Entry Point)" → /lab/brand-cep, "CEPベースの質問と対応コンテンツ" → /services
  - W/02·B 검색경로 섹션 "質問クラスター" → /services

## 2026-05-18 21:00
- 홈페이지 내부링크 연결: Why Ascent 4개 카드 `詳しく見る →` → `/why-ascent` 또는 `/framework`
- Services 4개 카드 `詳しく見る →` → `/services`
- FrameworkSection 5단계 토글 버튼 → `/framework` (hover 시 활성 표시 유지)
- 로컬 서버 재시작

## 2026-05-18 20:30
- brand-cep 아티클 본문 상단에 lm-cep-finder.png 삽입
- brand-cep s9 섹션 마지막 문단 하단에 동일 이미지 재삽입
- 아티클 히어로 h1 타이틀 폰트 굵기 800 → 500(Medium)으로 조정

## 2026-05-18 20:10
- 아티클 페이지 폰트 통일: `.article-page *` 스코프로 JetBrains Mono 및 font-mono 계열을 모두 Pretendard JP로 재정의
- globals.css 내 article 영역 JetBrains Mono 4개 선언도 Pretendard JP로 교체

## 2026-05-18 19:55
- lab/LabArticles: "検索の変化" 카드 제거, brand-cep를 두 번째 위치로 이동
- lab/page: featuredSide 첫 번째 항목을 brand-cep로 교체, 두 카드 모두 Link 연결
- 인덱스 page: GeoLabSection large 카드를 brand-cep 아티클로 교체, 태그 동적 렌더링 및 Link 연결

## 2026-05-18 19:30
- 신규 아티클 페이지 추가: `/lab/brand-cep` — 「AI検索時代のブランド戦略：キーワードではなく、CEPを制覇せよ」
- seo-geo와 동일한 레이아웃(히어로, TOC, article-body, CTA) 적용, 섹션 10개
- LabArticles.tsx에 새 아티클 카드 추가 및 Link 연결 처리

## 2026-05-18 16:56
- 전역의 10px / 11px 라벨성 텍스트를 +1px 조정해 섹션 보조 라벨과 mono 메타의 가독성을 올림.

## 2026-05-18 16:54
- 전역 타이포 크기 조정: 섹션 라벨, 본문 카피, 작은 본문, 버튼, 헤더 브랜드/내비/CTA를 각각 +1px씩 확대함.

## 2026-05-18 16:49
- 히로 로고를 `Ascent` 흰색 / `GEO` 파란색 분리 버전으로 바꾸고, Home / Why Ascent / Framework / Services / GEO Lab / Contact 히로 영역에 동일하게 삽입함.

## 2026-05-18 16:45
- index 히로의 로고를 흰색 버전(`ascent-geo-logo-white.png`)으로 교체해 어두운 배경에서 더 잘 보이도록 조정함.

## 2026-05-18 16:43
- index 히로의 CTA 아래에 `Ascent-GEO` 로고 PNG를 적당한 크기로 삽입함.

## 2026-05-18 16:40
- 푸터 로고를 홈 링크로 감싸서 클릭 시 index(`/`)로 이동하도록 수정함.

## 2026-05-18 16:33
- 사이트 브랜드 로고를 `Design/Ascent-GEO-Logo.png`에서 `public/ascent-geo-logo.png`로 옮겨 헤더와 푸터에 적용함.

## 2026-05-18 16:17
- Contact 페이지 문구 수정: 히어로의 설명을 Brand Visibility / Brand Position 중심으로 바꾸고, FAQ의 효과 측정 답변을 각 모델별露出 트래킹 기준으로 교체함.

## 2026-05-18 15:54
- Services 페이지 문구 수정: 10점 GAP 분석, 4항목 스코어링, Authority/Slack 알림 제거, 모니터링 문구와 패키지/FAQ 카피를 GEO診断・FULL SUPPORT 기준으로 정리함.

## 2026-05-18 15:49
- Framework 페이지 문구 수정: 히어로, 4개 단계 카드, 중앙 루프 카드의 텍스트를 `質問分析 / GAP分析 / GEOに特化したコンテンツ対策 / モニタリング` 기준으로 정리하고 회귀 테스트를 추가함.

## 2026-05-18 15:46
- Why Ascent CEP 문구를 요청한 원문 그대로 재정렬: `消費者の「CEP(Category Entry Point)」に / 基づくGEO施策が可能。` 형식으로 수정함.

## 2026-05-18 15:37
- Why Ascent 문구 수정: 히어로 3본 카피, Embedding Similarity 설명, CEP 표기, Search Path 설명을 요청한 문장으로 교체하고 AI Retrieval Structure 항목을 제거함.

## 2026-05-18 15:35
- 하단 CTA 통일: Home / Why Ascent / Framework / Services / GEO Lab의 CTA를 `/lab/seo-geo`와 동일한 GEO 상담 문구로 교체하고 공통 컴포넌트로 묶음.

## 2026-05-18 15:25
- 홈 인덱스 문구 갱신: hero/era/framework/services 문구를 `文脈・意図ベースでの評価`, `検索経路探索`, `GEO Framework` 등 새 표현으로 교체하고 검증 스크립트를 추가함.

## 2026-05-18 15:18
- 아티클 TOC의 `CONTENTS` 라벨 폰트만 키우고, 목차의 기존 디자인과 구조는 그대로 유지함.

## 2026-05-18 15:18
- 폰트 정책을 정리해 본문과 헤딩은 Pretendard JP로, 라벨/코드는 JetBrains Mono로만 쓰도록 serif 강조를 제거함.

## 2026-05-18 15:14
- 아티클 TOC와 본문 섹션의 `§` 표기를 모두 제거하고, 목차 디자인은 `lab/ai-overview` 톤에 맞게 더 작은 공통 스타일로 정리함.

## 2026-05-18 15:12
- 아티클 TOC와 섹션 번호의 `§` 표기를 다시 복원해, 이전 디자인 톤을 유지하도록 되돌림.

## 2026-05-18 15:11
- 아티클 TOC와 섹션 번호의 `§` 기호를 모두 제거하고, 번호만 보이도록 공통 표기를 통일함.

## 2026-05-18 15:10
- 아티클 TOC 전체(`CONTENTS`, `§01`~`§09`, 제목)을 `article css`로 옮기고 폰트 크기를 +3 조정해 두 아티클에 공통 적용함.

## 2026-05-18 15:08
- 아티클 TOC의 `[ CONTENTS ]` 헤더 폰트 크기를 2px 키워 가독성을 높임.

## 2026-05-18 15:08
- `lab` 아티클 목록에서 요청한 4개 카드(`AI 検索構造`, `検索の変化`, `GEO Writing`, `KPI`)를 삭제해 나머지 카드만 보이도록 정리함.

## 2026-05-18 15:07
- `lab` 아티클 목록의 카테고리 필터 영역(`ALL`, `検索の変化`, `SEO vs GEO`, `AI 検索構造`, `GEO Writing`, `KPI`)을 삭제하고 전체 카드 목록만 노출되도록 정리함.

## 2026-05-18 15:07
- `lab` 상단 featured 카드에서 지정한 2개 사이드 박스를 제거해, 왼쪽 메인 카드 + 오른쪽 2개 카드 구조로 정리함.

## 2026-05-18 15:03
- `lab` 메인 featured 카드에 `lab/seo-geo` 아티클을 올리고, 하단 아티클 목록은 `AI Overview` 글이 1번째로 보이도록 순서를 조정함.

## 2026-05-18 14:41
- `lab/seo-geo` 아티클 CTA 텍스트 폭을 다시 넓혀 2/3 느낌에 맞추고, 테이블 헤더를 본문 볼드로 유지한 채 히로 규칙을 더 낮게 정리함.

## 2026-05-18 14:40
- `lab/seo-geo` 아티클 규칙 보강: 테이블 헤더를 본문 폰트 볼드로 바꾸고, 아티클 히로를 더 낮게 축소했으며 테스트 기대값도 새 규칙에 맞게 갱신함.

## 2026-05-18 14:38
- `lab/seo-geo` 아티클 CSS 조정: 본문 H2를 줄바꿈 없이 고정하고 본문 폰트를 바디 크기로 통일했으며, FAQ 질문은 H4로 내리고 CTA 본문 잘림도 보정함.

## 2026-05-18 14:36
- `lab/seo-geo` 아티클 조정: 7개 원칙 카드를 다크 테마로 바꾸고 FAQ 배경을 화이트로 정리했으며, CTA 왼쪽 본문이 잘리지 않도록 폭을 넓힘.

## 2026-05-18 14:33
- `lab/seo-geo` 아티클 수정: CTA 비율을 2:1로 조정하고, GEO 원칙 7개를 카드형으로 바꾸었으며, 본문 상단에 `seo-geo.png` 이미지를 삽입함.

## 2026-05-18 14:30
- 아티클 공통 스타일 정리: `article css`를 정의하고 `lab/seo-geo`의 비교표를 카드형 테이블로 바꾸었으며, 하단 CTA를 주요 메뉴와 같은 공통 CTA 섹션으로 삽입함.

## 2026-05-18 14:12
- `lab/seo-geo` 기사 추가: 원문 `seo geo.txt`를 그대로 유지한 채 `lab-ai-overview` 스타일의 GEO Lab 아티클 레이아웃으로 구성하고, 랩 목록에도 노출되도록 연결함.

## 2026-05-17 23:49
- 주요 히로 배경 가시성 개선: 공통 그라데이션에 광원 레이어를 추가해 색이 카드와 오버레이에 묻히지 않도록 조정함.

## 2026-05-17 23:42
- 모든 주요 히로를 공통 그라데이션/고정 높이로 통일: `--hero-gradient`와 `--hero-height`를 도입해 Home, Why Ascent, Framework, Services, GEO Lab, Contact에 같은 톤과 높이를 적용함.

## 2026-05-17 23:33
- Why Ascent 히로 배경도 그라데이션으로 변경: `#042A4E → #58052F`를 적용해 단색 배경을 대체하고 회귀 테스트를 추가함.

## 2026-05-17 23:27
- 홈 히어로 그라데이션의 파란쪽만 조정: 전역 색상은 유지하고 `#052F58`를 `#042A4E`로 바꿔 히어로 배경만 수정함.

## 2026-05-17 23:22
- 홈 히어로 배경을 2컬러 그라데이션으로 조정: `#052F58` → `#58052F` 그라데이션을 적용하고 회귀 테스트를 갱신함.

## 2026-05-17 23:18
- 홈 히어로 배경색 변경: `src/app/page.tsx`의 HeroSection 배경을 `#052F58`로 맞추고, 회귀 테스트를 추가함.

## 2026-05-17 12:20
- PageSpeed 대응: `SplitSection`/`CTASection`를 서버 컴포넌트로 되돌리고, 홈의 `ContactForm`·`FrameworkSection`을 dynamic import로 분리해 초기 JS 부담을 줄임.

## 2026-05-17 12:16
- 폼/메일 참고 문서 생성: `FORM_EMAIL_REFERENCE.md`에 Contact/Whitepaper 검증, Resend 메일, Supabase 저장, 완료 페이지 접근 제어 흐름을 정리함.

## 2026-05-17 10:58
- 컨택폼/화이트페이퍼 검증: 정상 제출로 `/contact/thanks`와 `/whitepaper/downloaded`에 각각 접속됨을 확인하고, 쿠키 없는 직통 요청은 일본어 차단 화면으로 막히는지 재확인함.

## 2026-05-17 10:51
- 완료 페이지 차단 문구 일본어화: 직접 접근 차단 화면의 헤드라인과 설명을 일본어로 정리하고 빌드로 확인함.

## 2026-05-17 10:50
- 완료 페이지 직접 접근 차단: `/contact/thanks`와 `/whitepaper/downloaded`를 정상 흐름 쿠키가 없으면 `잘못된 접근입니다`로 막고 noindex를 적용함.

## 2026-05-17 10:45
- 브라우저 검증: 데스크톱과 iPad Air 폭에서 홈/문의 페이지의 핵심 히어로, CTA, 폼, FAQ가 정상 렌더링됨

## 2026-05-17 10:33
- SEO 정적화 정리: 공개 페이지를 서버 컴포넌트로 되돌리고, 상호작용은 client island로 분리했으며 metadata와 `force-static`를 보강하고 빌드를 통과함.

## 2026-05-17 10:23
- 프로젝트 렌더링 구조 확인: Next.js App Router 기반이며, 주요 페이지는 클라이언트 컴포넌트로 구성된 하이브리드 구조인지 검토함.

## 2026-05-15 21:11
- Why Ascent 히로 컨택폼 모바일 정렬 수정: 폼 래퍼를 `mx-auto lg:ml-auto lg:mr-0`로 바꿔 모바일에서는 가운데, 데스크톱에서는 우측 정렬되도록 조정하고 회귀 테스트를 추가함.

## 2026-05-15 18:41
- Why Ascent 레이아웃 완성버전 기록: W/02·B Search Path를 PATH 01 기본 동작형으로 마무리하고, 상단/하단 메타와 여백을 정리한 현재 구성을 기준 버전으로 확정.

## 2026-05-15 18:40
- Why Ascent W/02·B 기본 탭을 PATH 01로 변경하고, 섹션 하단 여백을 축소: Search Path 패널 초기 상태를 通勤目的로 시작하게 했으며 CTA 앞 간격도 더 줄임.

## 2026-05-15 18:38
- Why Ascent W/02·B 오른쪽 패널 상단 정렬 보정: Search Path 패널 래퍼에 `lg:-mt-10 xl:-mt-12`를 적용해 `検索経路に基づき、GEOに...` 제목 높이에 더 가깝게 끌어올림.

## 2026-05-15 18:35
- Why Ascent W/02·B 오른쪽 패널 메타 정리: `SEARCH PATH · ... REAL-DATA SAMPLE` 상단과 `SEED · ... CLUSTER · ...` 하단을 삭제하고, 스텝 카드 간격도 더 촘촘하게 축소.

## 2026-05-15 18:34
- Why Ascent W/02·B Search Path 탭을 동작형으로 전환: PATH 01/02/03이 상태를 바꾸도록 클라이언트 컴포넌트로 분리하고, PATH 01과 PATH 02 전환을 브라우저에서 확인.

## 2026-05-15 18:29
- Why Ascent W/02·B 오른쪽 패널 테두리 제거: 바깥 래퍼, 내부 래퍼, 탭/카드/하단 구분선의 border를 모두 제거해 평면형 패널로 정리.

## 2026-05-15 18:24
- Why Ascent W/02·B 좌측 설명 블록 복구: 오른쪽 Search Path 패널은 유지하고, `検索経路に基づき...` 왼쪽 텍스트 영역을 다시 살려 2열 구성을 복원.

## 2026-05-15 18:07
- Why Ascent W/02·B 상단 인트로 블록 제거: `一つの質問は、決して単独で存在しない。` 헤더와 설명 문단을 삭제하고, 좌측 설명 + 우측 Search Path 패널만 남김.

## 2026-05-15 18:06
- Why Ascent W/02·B 오른쪽 패널을 `search-path-section.html` 기반으로 직접 렌더하도록 수정: iframe 대신 PATH 03 포함 패널을 페이지 내 JSX로 배치해 빈 흰 박스 문제를 해결.

## 2026-05-15 17:58
- Why Ascent W/02·B レイアウトを修正: テキストを左、SEARCH JOURNEY ダイアグラムを右に並べる2列構成へ戻し、文言はそのまま維持。

## 2026-05-15 17:55
- Why Ascent W/02·B 섹션을 롤백: `search-path-section.html` iframe과 좌측 축약 카피를 제거하고, 기존 SEARCH JOURNEY 다이어그램 + 설명문 + CTA 전 레이아웃을 복구.

## 2026-05-15 17:53
- Why Ascent W/02·B の左側説明を 롤백: 「一つの質問は、決して単独で存在しない。」と GEO 核心の callout を復元し、右側の `search-path-section.html` iframe は維持。

## 2026-05-15 17:25
- Services ページの h2 টাইポグラフィを他ページに統一: section 見出しを `font-bold / leading-[var(--lh-heading)] / tracking-[-0.02em]` に揃え、JSX 内の引用符を lint 対応でエスケープ。

## 2026-05-15 17:22
- Why Ascent の CEP 3カードをダークテーマ化: 背景を黒基調に切り替え、白文字・暗い factor 面・強めの影で視認性を向上。

## 2026-05-15 17:21
- Why Ascent の CEP 3カードを強調: lucide アイコンを追加し、カードごとに異なるアクセントカラー・ティント・上部ラインを付けて視認性を改善。

## 2026-05-15 17:16
- Why Ascent の W/02·C 見出しを更新: 「人がAIに問うのは、キーワードではなくCEPである。」へ日本語化し、CEP強調のまま整形。

## 2026-05-15 17:14
- Why Ascent W/02·B と CTA の間に白い余白を追加: Section 4 の下パディングを調整し、CTASection を `mt-24 md:mt-32` で包んで下部 CTA との分離を明確化。

## 2026-05-15 17:10
- Why Ascent W/02·B と CTA の間に余白を追加: Section 4 の下パディングを増やし、下部 CTA との距離を確保。

## 2026-05-15 17:08
- Why Ascent W/02·B の説明文を修正: 「Ascentはユーザーが...」と「例えば、「電動自転車」...」の間の改行を削除し、1つの段落として連結。

## 2026-05-15 17:07
- Why Ascent の W/02·B Search Path セクションを更新: 見出しを「検索経路に基づき、GEOに極めて有利な連続的質問クラスターを設計」に変更し、SEARCH JOURNEY 図版を見出し直下へ移動、説明文の段落順を整理。

## 2026-05-15 15:17
- Why Ascent 페이지 업데이트: 원본 디자인 시안(`why-ascent-section2.png`, `3`, `4`)에 맞춰 기존 'W/02 — Intent Intelligence' 및 'W/03 — Methodology Detail' 섹션을 삭제하고, Search Intent(W/02·A), CEP × GEO(W/02·C), Search Path(W/02·B) 등 3개 신규 섹션으로 전면 개편 삽입.
- W/02·A Search Intent 섹션의 다이어그램 SVG 연결선이 노드 박스를 가리지 않도록 z-index(계층) 수정 (`z-0`, `relative z-10` 적용).
- W/02·A Search Intent 섹션의 메인 헤드라인과 서브 헤드라인 텍스트 스왑 ("キーワードの背後にいる「真の顧客」を見つめる"를 메인 타이틀로 변경).
- W/02·A Search Intent 섹션 본문 텍스트를 Ascent 리스닝마인드 솔루션의 잠재고객 자동 분류 기능 및 Search Intent 기반 GEO 설계에 대한 설명으로 변경 (일본어 번역 반영).
- W/02·C CEP × GEO 섹션 텍스트 수정: 헤드라인을 "キーワードではなく状況である"에서 "CEPである"로 변경, 서브 헤드라인을 "「生活文脈(CEP)」に基づくGEO施策が可能"로 변경, 본문의 "文脈ベースのコンテンツ"를 "CEPベースの質問と対応コンテンツ"로 상세화.
- W/02·C CEP × GEO 섹션 레이아웃 변경: 데이터에서 CEP 04 항목을 삭제하고, 좌우 2단 배치를 수직 구조로 변경 (상단에 텍스트 전체 너비 배치, 하단에 3개의 카드를 3-column 그리드로 배치). 불필요한 'SAMPLE' 레이블 문구를 삭제하고 메인 헤드라인과 서브 헤드라인 사이, 그리고 텍스트와 카드 사이의 상하단 여백을 타이트하게 축소.
- W/02·B Search Path 섹션 전면 개편: 서치 저니 설계 텍스트를 다이어트하고 핵심 메시지(연속적 질문 클러스터 설계)를 강조하는 방향으로 문구 대폭 수정 및 중간 상세 설명 단락 삭제. 하단의 데이터 시각화 다이어그램을 전기자전거 시장(Persona A, B, C) 검색 경로 예시 기반 다크 테마 UI로 신규 구현.

## 2026-05-14 — ⭐ 모바일 레이아웃까지 완료 버전
- **롤백 기준점** commit: `981c3e1`
- 완료 범위: 전 페이지 모바일 레이아웃 수정

---

## 2026-05-14 — 모바일 뷰 버그 상세 기록 (재발 방지 포함)

### 수정 파일 목록
- `src/components/layout/Header.tsx`
- `src/components/layout/CTASection.tsx`
- `src/components/ui/button.tsx`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/framework/page.tsx`
- `src/app/lab/ai-overview/page.tsx`

---

### BUG-01 · 햄버거 메뉴 화면 벗어남 (인덱스, framework 공통)

**원인**
- `Header.tsx` 내부 컨테이너에 `px-10`(40px) 고정 패딩 → 모바일 뷰포트(360px~)에서 햄버거 버튼이 오른쪽으로 밀려 잘림

**수정**
- `px-10` → `px-4 sm:px-6 lg:px-10` (반응형 패딩)
- 파일: `src/components/layout/Header.tsx:12`

**재발 방지**
- Header 컨테이너에 고정 `px-10` 재사용 금지. 반드시 `px-4 sm:px-6 lg:px-10` 패턴 유지

---

### BUG-02 · 히어로 h1 오버플로우 (인덱스, framework)

**원인**
- `fontSize: clamp(44px, 4.86vw, 65px)` — 모바일 최솟값 44px가 360px 뷰포트에서 너무 큼
- `wordBreak: "keep-all"` — 일본어에는 효과 없이 영문 단어만 묶어 레이아웃 파괴

**수정**
- clamp 하한 44px → 32px
- `wordBreak: keep-all` 제거
- 파일: `src/app/page.tsx:188`, `src/app/framework/page.tsx:310`

**재발 방지**
- 일본어 h1에 `wordBreak: keep-all` 사용 금지 (효과 없음)
- 모바일 최솟값은 32px 이하로 설정

---

### BUG-03 · CTASection 버튼/텍스트 잘림 (전 페이지 공통 CTA)

**원인**
- 바깥 컨테이너 `px-10` + 카드 내부 `p-12` 이중 패딩 중첩 → 모바일에서 콘텐츠가 뷰포트 밖으로 밀림

**수정**
- `px-10` → `px-4 sm:px-6 lg:px-10`
- `p-12` → `p-6 sm:p-8 lg:p-12`
- 파일: `src/components/layout/CTASection.tsx:32-34`

**재발 방지**
- CTA 카드처럼 이중 패딩 구조에서는 반드시 양쪽 모두 반응형 패딩 적용

---

### BUG-04 · ct-hero-wrap 오버플로우 (contact 페이지)

**원인**
- `grid-template-columns: 1.1fr 1fr` → 단일 컬럼 전환 breakpoint가 `max-width: 900px`인데, padding 0 20px 적용은 `max-width: 768px`에만 있음
- 900~768px 구간(대부분의 Android 기기)에서 패딩 40px 유지 → 오버플로우

**수정**
- 900px breakpoint에 `padding: 0 20px` 추가
- 768px 중복 선언 제거
- 파일: `src/app/globals.css:1432`

**재발 방지**
- grid-template-columns 변환 breakpoint와 padding 변환 breakpoint를 반드시 동일하게 맞출 것

---

### BUG-05 · GEO Framework 5각형 SVG + fw-step 카드 오버플로우 (인덱스)

**원인 A — SVG 다이어그램**
- `fw-grid`가 `grid-template-columns: 1.1fr 1fr` 고정 → 모바일에서 첫 번째 컬럼(SVG)이 절반 폭만 차지하고 잘림
- `@media (max-width: 768px)`에서 첫 컬럼 숨김 처리했으나, 실제 모바일 기기는 768~1024px 구간도 포함

**수정 A**
- `fw-grid` 기본을 `grid-template-columns: 1fr`로, `@media (min-width: 1025px)`에서만 2컬럼 전환
- `@media (max-width: 1024px)` 첫 컬럼 `display: none`
- 파일: `src/app/globals.css:502-553`

**원인 B — fw-step 카드**
- `grid-template-columns: 56px 1fr auto`에서 `1fr`이 `minmax(0, 1fr)`이 아니어서 텍스트 콘텐츠 크기만큼 팽창
- `Button` 컴포넌트가 `inline-flex` → 폭 제한 없이 늘어남
- Button cva 기본 클래스에 `whitespace-nowrap` 전역 적용 → `.meta`의 `text-overflow: ellipsis` 무효화

**수정 B**
- `fw-step grid-template-columns: 56px minmax(0, 1fr) auto`
- `fw-step`에 `width: 100%; box-sizing: border-box; min-width: 0` 추가
- `fw-list`에 `overflow: hidden`, `> *`에 `min-width: 0; width: 100%` 추가
- Button cva 기본 클래스에서 `whitespace-nowrap` 제거
- 파일: `src/app/globals.css:580-590`, `src/components/ui/button.tsx:8`

**재발 방지**
- CSS grid에서 텍스트를 담는 컬럼은 반드시 `minmax(0, 1fr)` 사용
- `inline-flex` 요소를 grid 셀 안에 넣을 때는 `min-width: 0; width: 100%` 명시
- Button cva 기본 클래스에 `whitespace-nowrap` 재추가 금지

---

### BUG-06 · GEO Lab h2 잘림 (인덱스)

**원인**
- `whitespace-nowrap` 클래스가 h2에 적용되어 한 줄 강제 → 모바일에서 뷰포트 밖으로 넘침

**수정**
- `whitespace-nowrap` 제거
- 파일: `src/app/page.tsx:806`

**재발 방지**
- 모바일 대응이 필요한 h2/h3에 `whitespace-nowrap` 사용 금지

---

### BUG-07 · framework 페이지 5각형 다이어그램 모바일 오버플로우

**원인**
- `FrameworkLoop` 컴포넌트: `position: absolute`로 배치된 노드 카드(`width: 200px`)들이 모바일 뷰포트보다 넓은 SVG 좌표계 기준으로 배치됨

**수정**
- `<FrameworkLoop />`를 `<div className="hidden lg:block">` 으로 감싸 모바일에서 숨김
- 파일: `src/app/framework/page.tsx:366`

**재발 방지**
- absolute 좌표 기반 SVG/canvas 다이어그램은 모바일에서 숨김 처리 후 대체 UI 제공

---

### BUG-08 · 블로그 TOC가 본문을 덮음 (ai-overview 페이지)

**원인**
- `grid-cols-[220px_1fr]`에서 TOC(220px)가 모바일에서도 그리드 첫 번째 컬럼으로 렌더링
- `sticky top-[100px]`으로 고정되어 스크롤 시 본문 위에 겹침

**수정**
- `<ArticleTOC />`를 `<div className="hidden lg:block">` 으로 감싸 모바일 숨김
- 섹션 패딩 `px-10` → `px-4 sm:px-6 lg:px-10`
- 파일: `src/app/lab/ai-overview/page.tsx:84-86`

**재발 방지**
- sticky TOC는 반드시 `hidden lg:block` 처리. 모바일에서는 TOC 없이 본문만 표시

## 2026-05-13 23:59 — ⭐ 레이아웃 디자인 완료 버전
- **롤백 기준점** commit: `4449d8c`
- 완료 범위: 전 페이지 히로 섹션 통일(배경 애니메이션, h1 타이포, 상단 여백), 네비 링크 정상화, whitepaper downloaded 페이지, ai-overview 페이지, services/lab/why-ascent/framework 신규 제작
- 롤백 명령: `git checkout 4449d8c` (확인용) 또는 `git revert`

## 2026-05-13 20:30
- `/whitepaper/downloaded` 페이지 신규 제작: 다운로드 완료 화면. 다크 배경(radial gradient + grid + scan line 애니메이션), 상태 스탬프, TicketId(client 랜덤 ID), 진행바 100% 애니메이션, 대체 링크, 전화 컨택 블록.
- `DownloadForm.tsx` 리다이렉트 연결: 제출 성공 시 `setSubmitted(true)` 인라인 성공 표시 → `router.push('/whitepaper/downloaded')`로 교체.

## 2026-05-13 18:10
- Services 페이지 신규 제작: `/services` 라우트 추가. SubHero(다크 배경 + ContactForm), 4서비스 개요 quad, 4개 서비스 섹션(AuditVis/GapVis/ContentVis/MonitorVis 시각화 컴포넌트 포함), Packages(2 플랜), FAQ(아코디언), CTA까지 완성. `Services.html` 원본 구조 기준.

## 2026-05-13 16:44
- Framework `fw-loop` 원본 재보정: `fw-loop` 컨테이너를 원본 HTML 좌표/크기로 되돌리고 중앙 링과 텍스트를 인라인 스타일로 정리해 서버 빌드 호환성을 유지함

## 2026-05-13 16:39
- Framework 원본 재정렬: 공통 ContactForm을 외곽 프레임 없이 직접 사용하고, 5フェーズ 루프를 원본 좌표형 다이어그램으로 되돌리며, 단계별 브레이크다운 카드를 원본형 시각 블록으로 재구성함

## 2026-05-13 16:32
- Framework 독립 페이지 추가: `Framework.html` 원본 흐름을 바탕으로 히어로, 5단계 루프, 단계별 브레이크다운, FAQ, 공통 CTA를 구현하고 상단/푸터의 Framework 링크를 `/framework`로 연결함

## 2026-05-13 16:25
- Why Ascent 히로 정리: breadcrumb(Home / Why Ascent) 삭제하고 상단 여백을 더 줄여 첫 화면 진입 높이를 압축함

## 2026-05-13 16:22
- Why Ascent 세부 조정: 히로의 24H 리플레이 텍스트 제거 및 높이 축소, GEO Framework 하단 라인/여백 축소, CTA를 홈의 공통 CTASection으로 교체함

## 2026-05-13 16:30
- 캘린더 예약 링크 프로덕션 미반영 수정: NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL 환경변수를 Vercel 프로덕션에 등록 후 재배포

## 2026-05-13 16:15
- Why Ascent 원본 재정렬: 실제 HTML 원본 구조에 맞춰 독립 페이지를 히어로, 특허, Listening Mind, 4본柱, CTA 순으로 재구성하고 공통 ContactForm은 그대로 재사용함

## 2026-05-13 16:04
- Why Ascent 독립 페이지 추가: 상단/하단 공통 메뉴의 Why Ascent 링크를 `/why-ascent`로 연결하고, index의 공통 ContactForm을 그대로 재사용한 히어로 페이지를 구현함

## 2026-05-13 16:10
- 프라이버시 폴리시 전면 개정: 제1조~제9조 정식 방침으로 교체, 박스 레이아웃 → 바디 텍스트 레이아웃 변경, 연락처 privacy@ascentnet.co.jp 반영, 프로덕션 배포 완료

## 2026-05-13 14:32
- 예약 CTA 문구를 일본어로 통일: `無料相談予約（Googleカレンダー）`로 홈/컨택트/푸터/스펙 문서 전체 반영

## 2026-05-13 14:28
- Google Calendar 예약 CTA를 새 탭으로 열도록 변경: 공통 링크 속성 헬퍼 추가 후 홈/컨택트/푸터 예약 진입점에 적용

## 2026-05-13 14:27
- Google Calendar 예약 흐름 단순화: `/calendar-booking` 중간 페이지 삭제, CTA를 Google 예약 URL 직접 연결로 전환

## 2026-05-13 14:23
- /contact 예약 카드 설명에서 잔여 `Zoom` 문구 제거, Google Calendar 예약 흐름과 카피 일치시킴

## 2026-05-13 13:50
- Google Calendar 예약 URL 환경변수 연결 완료: `NEXT_PUBLIC_GOOGLE_CALENDAR_BOOKING_URL` 반영 후 `/calendar-booking` 리다이렉트 경로 빌드 검증 완료

## 2026-05-13 13:45
- `/calendar-booking` 페이지 보강: 예약 요약 카드(시간/점심/주말/공휴일/Meet) 추가, booking config 요약 헬퍼 분리, 버튼/링크 흐름 재검증

## 2026-05-13 13:35
- Google Calendar 예약 링크 구조 조정: footer를 텍스트 링크로 롤백하고, 예약 CTA는 `/calendar-booking` 내부 경로로 고정해 실제 Google URL 리다이렉트가 가능하도록 변경

## 2026-05-13 13:35
- Google Calendar 예약 연동 요건정의 문서 추가: 무료 버전 기준, JST 시간대, 주말/점심시간/공휴일 제외, Meet 자동 생성, 메일 발송 검토 항목 정리

## 2026-05-13 13:35
- Google Calendar 예약 연동 1차 구현: 예약 설정 상수/공통 버튼 모듈 추가, 홈/푸터/컨택트 CTA를 예약 링크로 연결, 예약 설정 테스트 추가

## 2026-05-13 13:23
- /contact 전화 상담 번호/시간 줄을 왼쪽 정렬로 조정해 카드 본문과 정렬 통일

## 2026-05-13 13:22
- /contact 3개 채널 텍스트 폰트 크기 공통 +2px 조정

## 2026-05-13 13:22
- /contact 전화번호를 텍스트로 변경해 링크 제거

## 2026-05-13 13:21
- /contact 전화 상담 아이콘을 카드 아이콘 톤에 맞춰 통일, 블루 강조 제거

## 2026-05-13 13:21
- /contact 전화 상담 영역 디자인 보강: 전화기 아이콘 추가 및 텍스트 블록 카드화

## 2026-05-13 13:20
- /contact 레이아웃 조정: 전화 상담을 카드에서 텍스트로 분리하고, 캘린더/자료다운로드 아래로 이동

## 2026-05-13 13:17
- 개발 서버 실행: `npm run dev`로 Next.js dev 서버 기동, `http://localhost:3000` 200 응답 확인

## 2026-05-12 (작업)
- Contact 전용 페이지 `/contact/page.tsx` 신규 생성
  - 다크 Hero 섹션 (전화/캘린더/자료 채널 카드 + 공통 ContactForm 삽입)
  - FAQ accordion 섹션 (10개 항목)
  - globals.css에 `.ct-hero`, `.ct-faq` 등 Contact 전용 CSS 추가
- Header Nav 및 CTA 버튼 링크: `#contact` → `/contact` 로 변경
- 홈 page.tsx Hero/CTA 버튼 링크도 `/contact` 로 변경
## 2026-08-11 09:18
- 홈 `ChallengesSection` 하단 사선 디바이더의 높이를 확장해 중앙 꼭짓점이 레퍼런스처럼 깊게 내려오도록 조정
- 디바이더 회귀 테스트의 SVG 높이와 polygon 좌표 갱신

## 2026-08-11 09:19
- 사선 디바이더 뒤에 파란 수평 띠가 생기지 않도록 하단 여백을 디바이더 앞 콘텐츠 래퍼로 이동
## 2026-08-11 09:27
- `GEO Watcher` 솔루션 카드의 라벨·제목·설명을 중앙 정렬하고 좌우 파란 사선 강조 요소 추가
## 2026-08-11 09:34
- `GEO Watcher` 좌우 파란 강조선을 일정 굵기 막대에서 상단이 두껍고 하단이 얇아지는 테이퍼드 SVG로 변경
## 2026-08-11 09:40
- 오른쪽 `GEO診断レポート` 솔루션 카드에도 중앙 정렬과 좌우 테이퍼드 파란 강조선 적용
## 2026-08-11 09:47
- 전역 본문 폰트 토큰 `--fs-body`를 `17px`에서 `18px`로 조정
## 2026-08-11 09:55
- `GEO Watcherで` 제목 글자 하단에 노란 형광펜 강조 효과 추가
## 2026-08-11 10:02
- `GEO診断ツールで` 제목 글자 하단에도 노란 형광펜 강조 효과 적용
## 2026-08-11 10:09
- 홈 목적별 과제 카드의 핵심 문구 4개를 `h3` 시맨틱 제목으로 변경
## 2026-08-11 10:16
- 프로세스 화살표 컨테이너의 하단 여백을 제거해 다음 카드와의 간격 축소
## 2026-08-11 10:22
- 프로세스 단계 그리드 간격을 `gap-3`에서 `gap-1`로 줄여 화살표와 다음 카드 사이를 추가 축소
## 2026-08-11 10:29
- `ChallengesSection` 배경을 상단 진한 블루에서 하단 연한 블루로 이어지는 그라데이션으로 변경
## 2026-08-11 10:36
- 히어로 설명의 `モニタリングツール「GEO Watcher」` 문구에 하단 형광펜 강조 효과 적용
## 2026-08-11 10:42
- 히어로 설명의 `営業提案につなげたい企業には「GEO診断レポート」` 문구에도 형광펜 강조 효과 적용
## 2026-08-11 10:48
- 히어로 첫 번째 형광펜 범위를 `「GEO Watcher」`에서 `モニタリングツール「GEO Watcher」` 전체로 확장
## 2026-08-11 10:55
- 왼쪽 목적 카드 상단에 파란색 `h3` 제목 `モニタリングツール「GEO Watcher」` 추가
## 2026-08-11 10:45
- 히어로 왼쪽 카드의 태그 묶음을 분리해 오른쪽 카드와 동일한 상단 리듬으로 정렬

## 2026-08-11 10:40
- 히어로 상단 두 카드 CTA 버튼 텍스트에 굵은 스타일 적용

## 2026-08-11 10:39
- 히어로 상단 카드 CTA 버튼 문구를 `GEO Watcherをもっと見る`, `GEO診断レポートをもっと見る`로 변경

## 2026-08-11 10:38
- 히어로 오른쪽 카드의 태그 폰트 크기를 왼쪽 카드 태그와 동일한 `--fs-label-sm` 기준으로 조정

## 2026-08-11 10:37
- 히어로 상단 두 카드 CTA 버튼에 원형 화살표 아이콘 추가
- 두 CTA 버튼 폭을 동일한 `320px` 기준으로 정렬

## 2026-08-11 10:32
- 전역 `h3` 기준 크기를 `31px`에서 `26px`로 축소

## 2026-08-11 10:31
- 왼쪽 카드 상단 h3 문구를 `AI対策ツール「GEO Watcher」`로 변경

## 2026-08-11 10:30
- 카드 상단 h3 블루 형광펜 색상을 더 연한 톤으로 조정

## 2026-08-11 10:29
- 카드 상단 h3의 블루 형광펜 색상과 두께를 조정해 화면에서 더 잘 보이도록 개선

## 2026-08-11 10:27
- 카드 상단 `モニタリングツール「GEO Watcher」`, `法人営業向け「GEO診断レポート」` h3에 연한 블루 형광펜 강조 적용

## 2026-08-11 10:26
- 오른쪽 카드의 `診断結果を、自社の提案資料として使える`, `自社仕様のレポートにカスタマイズ`를 굵은 본문 크기로 조정

## 2026-08-11 10:23
- 오른쪽 카드에 파란색 `h3` 제목 `法人営業向け「GEO診断レポート」` 삽입
- 오른쪽 카드 핵심 문구 h3도 전역 h3 크기(`--fs-h3`)를 사용하도록 정렬

## 2026-08-11 10:22
- 왼쪽 카드의 `モニタリングツール「GEO Watcher」` h3가 전역 h3 크기(`--fs-h3`)를 사용하도록 수정

## 2026-08-11 09:41
- 전역 `h3` 기준 크기를 `27px`에서 `31px`로 확대

## 2026-08-11 11:04
- 전역 `h3` 크기를 `24px`에서 `27px`로 확대
- 왼쪽 카드의 두 핵심 문구는 `var(--fs-body)` 크기의 굵은 본문 스타일로 조정
## 2026-08-11 23:02
- 데스크탑 최상단 메뉴 사이 구분선 `|` 추가, 모바일 메뉴는 유지

## 2026-08-11 22:55
- 최상단 활성 메뉴 형광펜 두께를 25% 수준으로 축소해 텍스트를 덜 덮도록 조정

## 2026-08-11 22:47
- 최상단 데스크톱 메뉴의 현재 선택 상태에 하늘색 형광펜 효과 추가: pathname 기반 활성 판별 및 GEO LAB 하위 경로 대응

## 2026-08-11 22:34
- 인덱스 히어로 섹션의 2개 솔루션 카드에 은은한 입체감 스타일 추가: 보더, 상단 하이라이트, 이중 그림자 적용
- 히어로 카드 하이라이트 레이어가 텍스트를 흐리게 덮는 문제 수정: 레이어 z-index 조정 및 보더/그림자 대비 보강
- 히어로 카드 상단 라벨 잘림 및 텍스트 뿌연 현상 수정: overflow visible 처리, 상단 하이라이트 레이어 제거
