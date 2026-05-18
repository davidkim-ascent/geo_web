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
