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
- `LabArticles.tsx`의 `POSTS` 배열에 추가 (index 3 이후)
- Featured 섹션에 올릴 경우 `page.tsx`의 `featuredSide` 배열 수정

# test-driven-development
Red-Green-Refactor 사이클 준수. 실패하는 테스트를 먼저 작성하고, 이를 통과하는 최소한의 코드를 짠 뒤 구조 개선.