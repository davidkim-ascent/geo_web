READ FIRST

이 파일은 모든 작업 전에 반드시 먼저 읽는다.
이 규칙을 확인하지 않고는 검색, 수정, 응답을 시작하지 않는다.

# Agent Rules

## 3-Tier Agent Structure
All tasks must be routed through the appropriate tier based on complexity.

### Tier Definitions

| Tier | Model | Role | Trigger Condition |
|------|-------|------|-------------------|
| Advisor | Claude Opus | Strategy & judgment | Blocked 2+ times, architecture decisions, complex tradeoffs |
| Main | Claude Sonnet | Orchestration & execution | Default for all tasks |
| Worker | Claude Haiku | Simple repetitive tasks | Search, file ops, build checks, data extraction |

### Routing Rules
**Use Worker (Haiku) when:**
- Searching files or grepping code
- Reading and summarizing files
- Running build/lint/test commands
- Extracting structured data from outputs
- Any task completable in a single, predictable step

**Use Advisor (Opus) when:**
- Stuck on the same problem after 2 attempts
- Choosing between architectural approaches
- Validating quality of a completed deliverable
- Evaluating complex tradeoffs with no clear answer

**Advisor constraints:**
- Never executes tasks directly — advises only
- Presents 2–3 alternatives with tradeoffs
- Recommends one option with explicit reasoning
- Hands execution back to Main after advising
- May execute directly only with explicit user approval

### Codex Integration (Second Opinion)
Codex (OpenAI CLI) acts as an independent reviewer — not a tier in the hierarchy, but a separate voice.

### Reasoning Effort Mapping

| Claude Tier | Codex Equivalent | Flag | Use When |
|-------------|-----------------|------|----------|
| Advisor (Opus) | `xhigh` reasoning | `--xhigh` | Architecture review, complex design decisions |
| Main (Sonnet) | `high` reasoning | default | Code review, general tasks |
| Worker (Haiku) | `medium` reasoning | `-c 'model_reasoning_effort="medium"'` | Quick lookups, simple queries |

# Bug Fix Rule
수정했던 문제가 반복되거나, 같은문제 반복, 매우 중요한 기능부의 에러의 경우, 사용자가 따로 지시하지 않아도 자동으로 아래와 같은 포맷으로 dev-log.md에 기록하고 우선 참조한다. 

**원인**
- 문제가 발생한 직접 원인 1개

**영향 범위**
1. 수정한 코드가 직접 영향을 주는 화면/기능
2. 같은 데이터/상태/API를 공유하는 기능
3. 에러, 로딩, 권한, 캐시 등 간접 영향 흐름

**재발 방지 테스트**
- 버그가 다시 생기는 조건에서 기대 결과가 유지되는지 확인

# 깃허브 커밋 룰 
origin/main과 로컬 변경사항을 전체 비교한 뒤, 누락 없이 검토하고 필요한 변경만 모두 커밋한 다음 푸시하라.
커밋 전에 API KEY 노출을 체크하라.

# dev-log.md 작업이력 관리
모든 작업 완료 후 dev-log.md 파일에 작업 이력을 기록한다.
- dev-log.md 파일이 없으면 새로 생성한다.
- 가장 최근 작업내역이 파일 상단에 오도록 작성한다.
- 날짜와 시간을 반드시 함께 기록한다.
- 작업 내용은 간결하게 요약한다.

**형식 예시:**
```
## 2026-05-12 14:30
- 로그인 버그 수정: 세션 만료 시 리다이렉트 누락 해결
```

# /lab 페이지 카드 배열 구조

## 파일 구조
- `src/app/lab/page.tsx` — Featured 섹션 (하드코딩)
- `src/app/lab/LabArticles.tsx` — 하단 그리드 (POSTS 배열 기반)

## 레이아웃 규칙
1. **Featured 섹션** (`page.tsx`): 왼쪽 큰 카드 1개 + 오른쪽 2개 카드 (세로 배치, 같은 높이)
   - 왼쪽: SEO/GEO 아티클 (하드코딩)
   - 오른쪽: `featuredSide` 배열 — GEO/LLMO, 브랜드전략 (하드코딩)
2. **하단 그리드** (`LabArticles.tsx`): `POSTS.slice(3)` 부터 3열 그리드
   - POSTS[0~2]는 Featured 섹션과 중복이므로 제외
   - 카드가 3개 미만이면 빈 칸으로 유지 (중복 콘텐츠 넣지 말 것)

## 새 아티클 추가 시
- **작성 전에 반드시 메타 제목(title)과 메타 디스크립션(description)을 먼저 제시하고 사용자 컨펌을 받은 후 본문을 작성한다.**
- `LabArticles.tsx`의 `POSTS` 배열에 추가 (index 3 이후)
- Featured 섹션에 올릴 경우 `page.tsx`의 `featuredSide` 배열 수정
- Featured 배치(왼쪽 큰 카드 + 오른쪽 2개)는 사용자 지시가 없는 한 그대로 유지한다
- 하단 그리드(`LabArticles.tsx`)는 Featured에 노출된 것을 제외하고, 날짜 내림차순(최신순)으로 자동 정렬한다 (`POSTS` 배열 순서에 의존하지 말 것 — `gridPosts`는 `date` 기준 정렬 로직으로 처리)

# アーティクルページ作成ガイドライン

## h2見出しの折り返し（再発バグ）
- グローバルCSSの `.article-h2` は `max-width: 24ch; white-space: nowrap` が設定されているため、**24文字を超える見出しは画面右にはみ出して切れる**
- 24文字を超える `<h2 className="article-h2">` には必ず `style={{ maxWidth: "none", whiteSpace: "normal" }}` を追加すること
  ```tsx
  <h2 className="article-h2" style={{ maxWidth: "none", whiteSpace: "normal" }}>長い見出しテキスト</h2>
  ```
- グローバルCSS自体は変更しない（他ページへの影響を避けるため、該当h2にインラインで上書きする）

## テーブル・カード群の見出しはキャプションボックスにしない
- `bg-[#F2F0EA] px-5 py-3 font-mono text-[11px] tracking-[0.18em] text-[#6B6B73] uppercase` の**グレー背景キャプションボックスは使用しない**（テーブルやカードリストと二重の箱に見えてしまうバグの原因）
- 代わりに、見出しはテーブル・カード群の直前に**太字テキスト**として配置する
  ```tsx
  <p className="mt-8 mb-3 font-bold text-[15px] text-[#0B0B0E]">見出しテキスト</p>
  <div className="overflow-hidden rounded-xl border border-[#E6E4DD]">
    <div className="article-table" style={{ margin: 0 }}>...</div>
  </div>
  ```
- `.article-table` 自体に `margin: 32px 0` が設定されているため、直前に見出しを置く場合は `style={{ margin: 0 }}` で上書きし、余白の二重発生を防ぐこと

## テーブルのカラム幅
- `article-table` は div ベースの構造を使う（`<table>` HTML は使用禁止）
- 構造: `.article-table` > `.article-table__head` > `<div>` × 列数、`.article-table__row` > `.article-table__cell` × 列数
- デフォルト（3列）: `--table-cols` の初期値が `0.82fr 1.09fr 1.09fr` に設定済み。style 指定不要。
- **2列テーブルの場合は必ず** `.article-table` に `article-table--2col` クラスを追加すること（`style` での `--table-cols` 指定は効かない）
  ```tsx
  <div className="article-table article-table--2col">
    <div className="article-table__head"><div>列1</div><div>列2</div></div>
    <div className="article-table__row">
      <div className="article-table__cell article-table__cell--label">...</div>
      <div className="article-table__cell">...</div>
    </div>
  </div>
  ```
- 3列テーブルの例:
  ```tsx
  <div className="article-table">
    <div className="article-table__head"><div>列1</div><div>列2</div><div>列3</div></div>
    {rows.map(row => (
      <div key={row[0]} className="article-table__row">
        <div className="article-table__cell article-table__cell--label">{row[0]}</div>
        <div className="article-table__cell">{row[1]}</div>
        <div className="article-table__cell">{row[2]}</div>
      </div>
    ))}
  </div>
  ```

## 日本語テキストのセル内改行問題
- `・`（中点）区切りの長い日本語テキストをテーブルセルやリストに入れると、`・` の位置で不自然な改行が起きる
- **対処法**: 項目をセル内に `・` 区切りではなく、`、`（読点）区切りで列挙する。または各項目を別行・別セルに分ける
- `<strong>カテゴリー名：</strong>属性1・属性2...` の形式は使用しない。代わりにテーブルで「カテゴリー | 属性リスト」として分離する
- `<strong>` タグは `whitespace-nowrap` を付けてラベルが途中で折れないようにすること

## article-list__item 内の `<strong>` 禁止パターン（再発バグ）

**原因**: `article-list__item` は `display: grid; grid-template-columns: 22px 1fr` のグリッドコンテナ。直接の子要素がすべてgrid itemになるため、`<strong>`が列2（1fr）を占有し、**後続テキストノードが列3（暗黙列・22px幅）に押し出されて1文字ずつ縦に並ぶ**。

**禁止パターン（バグが発生する）**:
```tsx
<li className="article-list__item">
  <span className="article-list__bullet">•</span>
  <strong>ラベル：</strong>続きのテキスト  {/* ← <strong>とテキストが別々のgrid itemになる */}
</li>
```

**正しいパターン（必ずこの形式にする）**:
```tsx
<li className="article-list__item">
  <span className="article-list__bullet">•</span>
  <span><strong>ラベル：</strong>続きのテキスト</span>  {/* ← <span>で包んで単一grid itemにする */}
</li>
```

- `<strong>`・`<em>`・`<a>`など**インライン要素を直接 article-list__item の子として書いてはいけない**
- bullet の次に来る内容は必ず単一の要素（テキストノード or `<span>` ラッパー）にまとめること

# test-driven-development
Red-Green-Refactor 사이클 준수. 실패하는 테스트를 먼저 작성하고, 이를 통과하는 최소한의 코드를 짠 뒤 구조 개선.