# WordPress → Next.js(Vercel) 이전 + Resend 메일 + SEO 설정 전체 순서

## 1. 전체 목표

기존 WordPress 사이트를 Next.js로 전환하고 Vercel에 배포합니다.

동시에 아래 4가지를 함께 처리합니다.

- 새 서브도메인 연결
- Resend 메일 발송 인증
- 기존 WordPress URL 301 리다이렉트
- Vercel의 noindex 상태 해제 및 SEO 설정

---

## 2. 사용할 도메인 구조 확정

예시:

```txt
웹사이트:
geo.ascentnet.co.jp

발신 메일:
no-reply@geo.ascentnet.co.jp

관리자 메일:
geo@ascentnet.co.jp
```

---

## 3. IDE에서 환경변수 기준 정리

`.env.local` 또는 환경변수 예시:

```env
RESEND_API_KEY=xxxxxxxx
RESEND_FROM_EMAIL=no-reply@geo.ascentnet.co.jp
CONTACT_ADMIN_EMAIL=geo@ascentnet.co.jp
NEXT_PUBLIC_SITE_URL=https://geo.ascentnet.co.jp
```

---

## 4. IDE에서 메일 코드 확인

메일 발송 코드에서 환경변수를 사용하도록 정리합니다.

```ts
from: process.env.RESEND_FROM_EMAIL
to: process.env.CONTACT_ADMIN_EMAIL
```

제거할 기본값:

```txt
onboarding@resend.dev
```

---

## 5. IDE에서 SEO 기본 설정 추가

파일:

```txt
src/app/layout.tsx
```

예시:

```ts
export const metadata = {
  metadataBase: new URL("https://geo.ascentnet.co.jp"),
  alternates: {
    canonical: "/",
  },
}
```

---

## 6. Vercel noindex 상태 해제 확인

현재 Vercel이 noindex 상태라면 아래 항목을 확인합니다.

### Vercel 설정 확인

Vercel → Project → Settings

확인 항목:

```txt
Deployment Protection
Password Protection
Vercel Authentication
```

Production 사이트에 보호 설정이 켜져 있으면 검색엔진 접근이 막힐 수 있습니다.

---

## 7. 코드에서 noindex 제거

아래 항목이 있는지 확인하고 Production에서는 제거합니다.

```html
<meta name="robots" content="noindex">
```

또는 Next.js metadata에 아래 설정이 있으면 제거합니다.

```ts
robots: {
  index: false,
  follow: false,
}
```

Production에서는 아래처럼 설정합니다.

```ts
robots: {
  index: true,
  follow: true,
}
```

---

## 8. robots.txt 확인

파일 위치 예시:

```txt
src/app/robots.ts
```

Production 기준 예시:

```ts
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://geo.ascentnet.co.jp/sitemap.xml",
  }
}
```

주의할 설정:

```txt
Disallow: /
```

이 값이 있으면 전체 사이트가 검색 차단됩니다.

---

## 9. sitemap.xml 설정

파일 위치 예시:

```txt
src/app/sitemap.ts
```

예시:

```ts
export default function sitemap() {
  return [
    {
      url: "https://geo.ascentnet.co.jp",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ]
}
```

페이지가 여러 개면 주요 URL을 모두 포함합니다.

---

## 10. Resend에서 도메인 추가

Resend Dashboard → Domains → Add Domain

추가:

```txt
geo.ascentnet.co.jp
```

---

## 11. Resend가 제공하는 DNS 값 확인

Resend가 아래 값을 자동 생성합니다.

### DKIM

```txt
Type: TXT
Name: resend._domainkey
```

### SPF

```txt
Type: TXT
Name: send
```

### Return-Path / Mail From

```txt
Type: MX
Name: send
Priority: 10
```

---

## 12. 도메인 관리자에서 Resend DNS 등록

도메인 DNS 관리 화면에서 Resend가 제공한 값을 그대로 등록합니다.

등록 대상:

- DKIM TXT
- SPF TXT
- MX

참고:

```txt
amazonses.com
feedback-smtp.ap-northeast-1.amazonses.com
```

이 값은 Resend 내부 메일 인프라 값입니다. 직접 AWS 설정은 필요 없습니다.

---

## 13. Resend Verify 완료 확인

Resend에서 상태를 확인합니다.

정상 상태:

```txt
Verified
Enable Sending
```

---

## 14. Vercel 프로젝트 생성 및 Git 연결

Vercel에서 Next.js 프로젝트를 Import합니다.

확인 항목:

```txt
GitHub 연결
Production Branch 설정
Build 성공 여부
```

---

## 15. Vercel 환경변수 등록

Vercel → Project → Settings → Environment Variables

등록:

```env
RESEND_API_KEY=xxxxxxxx
RESEND_FROM_EMAIL=no-reply@geo.ascentnet.co.jp
CONTACT_ADMIN_EMAIL=geo@ascentnet.co.jp
NEXT_PUBLIC_SITE_URL=https://geo.ascentnet.co.jp
```

환경변수 등록 후 반드시 재배포합니다.

---

## 16. Vercel에서 도메인 연결

Vercel → Project → Settings → Domains

추가:

```txt
geo.ascentnet.co.jp
```

---

## 17. 도메인 관리자에서 Vercel DNS 등록

Vercel이 제공하는 값을 DNS에 추가합니다.

일반적으로 아래 중 하나입니다.

```txt
A Record
CNAME Record
```

즉 DNS에는 아래 두 종류가 함께 존재합니다.

### Resend용

```txt
TXT
MX
```

### Vercel용

```txt
A
CNAME
```

---

## 18. 기존 WordPress URL 목록 정리

기존 URL을 수집합니다.

예시:

```txt
/contact
/service
/blog/seo-guide
```

새 Next.js URL과 1:1로 매핑합니다.

예시:

```txt
/contact → /contact
/old-service → /service
/blog/seo-guide → /blog/seo-guide
```

---

## 19. 301 리다이렉트 설정

SEO 유지를 위해 302가 아니라 301을 사용합니다.

파일:

```txt
next.config.js
```

예시:

```ts
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/old-page",
        destination: "/new-page",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

---

## 20. WordPress 서버 리다이렉트 확인

기존 WordPress 서버가 한동안 살아 있다면 서버 쪽에서도 301 리다이렉트를 설정할 수 있습니다.

Apache:

```txt
.htaccess
```

Nginx:

```txt
nginx.conf
```

Vercel로 도메인이 완전히 넘어가면 Next.js `redirects()` 기준으로 관리합니다.

---

## 21. canonical 설정 확인

각 페이지가 자기 자신을 canonical로 갖도록 설정합니다.

예시:

```ts
alternates: {
  canonical: "https://geo.ascentnet.co.jp/service",
}
```

중복 URL이 생기지 않도록 아래를 통일합니다.

```txt
https
www / non-www
trailing slash
대소문자
```

---

## 22. Open Graph 기본 설정

SNS 공유용 기본값을 설정합니다.

```ts
openGraph: {
  title: "페이지 제목",
  description: "페이지 설명",
  url: "https://geo.ascentnet.co.jp",
  siteName: "사이트명",
  type: "website",
}
```

---

## 23. 배포 전 최종 확인

확인 항목:

```txt
noindex 제거
robots.txt allow 확인
sitemap.xml 생성 확인
canonical 확인
301 redirect 확인
Resend Verified 확인
Vercel 환경변수 반영 확인
```

---

## 24. Production 배포

Vercel에서 Production Deploy를 진행합니다.

배포 후 확인 URL:

```txt
https://geo.ascentnet.co.jp
https://geo.ascentnet.co.jp/robots.txt
https://geo.ascentnet.co.jp/sitemap.xml
```

---

## 25. 실제 메일 테스트

폼 제출 후 아래를 확인합니다.

```txt
사용자 확인 메일 수신
관리자 메일 수신
스팸함 여부
반송 여부
DKIM/SPF 통과 여부
```

---

## 26. Google Search Console 설정

Search Console에서 새 도메인을 등록합니다.

진행 항목:

```txt
도메인 속성 등록
소유권 확인
sitemap.xml 제출
URL 검사
색인 생성 요청
```

---

## 27. 배포 후 SEO 체크

배포 후 1~2주 동안 확인합니다.

```txt
색인 상태
404 페이지
리다이렉트 오류
canonical 오류
sitemap 오류
검색 노출 변화
메일 반송률
```

---

## 28. 최종 작업 순서 요약

```txt
1. IDE에서 도메인/메일 환경변수 정리
2. IDE에서 noindex 제거 및 SEO metadata 추가
3. IDE에서 robots.txt, sitemap.xml 설정
4. Resend 도메인 추가
5. DNS에 Resend TXT/MX 등록
6. Resend Verify 확인
7. Vercel 프로젝트 연결
8. Vercel 환경변수 등록
9. Vercel 도메인 연결
10. DNS에 Vercel A/CNAME 등록
11. 기존 WordPress URL 수집
12. Next.js 301 redirect 설정
13. Production 배포
14. 메일 테스트
15. robots/sitemap/canonical 확인
16. Search Console 등록 및 sitemap 제출
17. 1~2주간 SEO 오류 모니터링
```