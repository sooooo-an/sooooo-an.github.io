# sooooo-an.github.io

안수경 개인 포트폴리오 사이트. Next.js(App Router) 정적 export + GitHub Pages로 배포합니다.

## 실행 방법

```bash
npm install
npm run dev       # 로컬 개발 서버 (http://localhost:3000)
npm run build     # 정적 빌드 (prebuild → next build → postbuild(pagefind) 순으로 실행됨)
npm run start     # out/ 디렉터리를 정적으로 서빙 (serve 사용)
```

`npm run build` 는 다음 순서로 동작합니다.

1. `prebuild` — `scripts/generate-static-files.mjs` 실행: `public/rss.xml`,
   `public/sitemap.xml`, `public/robots.txt` 생성
2. `next build` — 정적 페이지 빌드 (`output: 'export'`)
3. `postbuild` — `pagefind --site out --output-subdir _pagefind` 실행해
   `/writing/` 검색 인덱스 생성

## 콘텐츠 추가 방법

### 글(Writing)

`src/content/{tech|review|thoughts}/*.mdx` 에 파일을 추가합니다. 카테고리는
정확히 세 개만 존재하며, slug ↔ 한글 라벨 매핑은 `src/lib/categories.ts` 에서
관리합니다.

| slug     | 라벨    |
| -------- | ------- |
| tech     | 기술    |
| review   | 서평    |
| thoughts | 개인생각 |

frontmatter 필드:

| 필드          | 타입      | 설명                                   |
| ------------- | --------- | -------------------------------------- |
| `title`       | string    | 글 제목                                |
| `date`        | string    | `YYYY-MM-DD` 형식                      |
| `description` | string    | 목록/OG에 노출되는 한 줄 설명          |
| `category`    | string    | `tech` \| `review` \| `thoughts`       |
| `tags`        | string[]  | 태그 목록                              |
| `featured`    | boolean   | 홈 화면 "대표 글" 노출 여부            |
| `draft`       | boolean   | `true`면 production 빌드에서 제외      |

### 프로젝트(Projects)

`src/content/projects/*.mdx` 에 파일을 추가합니다.

| 필드       | 타입     | 설명                         |
| ---------- | -------- | ---------------------------- |
| `title`    | string   | 프로젝트명                   |
| `summary`  | string   | 한 줄 요약                   |
| `role`     | string   | 담당 역할                    |
| `period`   | string   | 기간                          |
| `stack`    | string[] | 사용 기술 스택               |
| `proves`   | string[] | 이 프로젝트가 증명하는 역량  |
| `featured` | boolean  | 홈 화면 "대표 프로젝트" 노출 |
| `order`    | number   | 목록 정렬 순서 (작을수록 위) |

## 직접 채워야 할 값

- **Giscus**: `src/lib/site.ts` 의 `giscus.repo / repoId / category / categoryId` 값을
  채워야 글 상세 페이지 하단에 댓글창이 표시됩니다. 비어 있으면 댓글 컴포넌트는
  렌더링되지 않습니다. https://giscus.app 에서 레포에 맞는 값을 발급받으세요.
- **Umami Analytics**: `src/lib/site.ts` 의 `analytics.umamiWebsiteId`,
  `analytics.umamiSrc` 값을 채우면 `<head>`에 스크립트가 삽입됩니다.
- **이력서 PDF**: `public/resume.pdf` 파일이 아직 없습니다. About/Resume 페이지의
  다운로드 링크(`/resume.pdf`)는 미리 만들어져 있으니, 실제 이력서 PDF 파일을
  `public/resume.pdf` 경로에 추가하면 됩니다.

## OG 이미지 관련 참고

`src/app/opengraph-image.tsx`, `src/app/writing/[slug]/opengraph-image.tsx`,
`src/app/projects/[slug]/opengraph-image.tsx` 는 `next/og`의 `ImageResponse`로
한글 텍스트를 렌더링합니다. `ImageResponse`는 기본적으로 Google Fonts에서
동적으로 폰트를 fetch하는데, 네트워크가 차단된 샌드박스 환경(로컬 빌드 검증
환경)에서는 이 fetch가 실패해 콘솔에 `Failed to load dynamic font` 경고가
출력됩니다. 이 경고는 빌드를 실패시키지 않으며, 네트워크가 열려 있는
GitHub Actions 환경에서는 정상적으로 폰트를 불러와 이미지가 생성됩니다.

## 배포 방법

GitHub 저장소 설정에서 **Settings → Pages → Build and deployment → Source**를
**GitHub Actions**로 지정하면, `main` 브랜치에 push할 때마다
`.github/workflows/deploy.yml` 워크플로우가 실행되어 `npm run build` 결과물
(`out/`)을 GitHub Pages에 자동 배포합니다.

## Google Analytics (GA4)

`src/lib/site.ts` 의 `analytics.gaMeasurementId` 에 측정 ID(`G-XXXXXXXXXX`)를 넣으면 GA4 스크립트가 주입된다. 빈 문자열이면 스크립트를 넣지 않는다.

발급 방법:

1. https://analytics.google.com 에서 속성(Property) 생성
2. 데이터 스트림 → 웹 → URL `https://sooooo-an.github.io` 등록
3. 생성된 측정 ID(`G-` 로 시작)를 `gaMeasurementId` 에 입력

검색 유입 키워드를 보려면 Search Console(https://search.google.com/search-console)에 사이트를 등록하고 GA4 속성과 연동한다.

## 자동 번역 (한글 → 영어)

`src/content/**/*.mdx` 에 새 글이나 새 프로젝트 케이스 스터디를 추가하면,
GitHub Actions가 Google Gemini API를 사용해 `src/content-en/**` 에 영어 번역본을
자동으로 생성해 커밋합니다.

- **변경 감지 기반 재번역**: 한국어 원문의 해시(sha256)를 영문 파일의
  frontmatter `sourceHash` 에 기록해두고, 다음 실행 시 원문 해시와 비교합니다.
  `content-en` 파일이 없거나 원문이 바뀌어 해시가 달라지면 다시 번역합니다.
  즉 신규 글은 물론, 기존 글의 한국어 원문을 나중에 수정해도 자동으로
  재번역됩니다.
- **동작 시점**: `main` 브랜치에 `src/content/**/*.mdx` 변경이 포함된
  push가 있을 때 `.github/workflows/translate.yml` 워크플로가 실행되어
  변경되거나 신규인 파일을 번역하고, 결과를 `github-actions[bot]` 명의로
  자동 커밋·푸시합니다. 이 커밋이 다시 `deploy.yml` 을 트리거해 번역이
  반영된 최신 상태로 배포됩니다.

### 필요한 설정

레포 **Settings → Secrets and variables → Actions → New repository secret**
에서 `GEMINI_API_KEY` 를 등록해야 워크플로가 정상 동작합니다. Google AI Studio
(https://aistudio.google.com/apikey) 에서 무료로 발급받을 수 있습니다. (키가 없으면
번역 스텝이 즉시 에러로 종료되고, 사이트 배포 자체에는 영향을 주지 않습니다.)

### 로컬에서 직접 번역 테스트하기

```bash
# 프로젝트 루트에 .env.local 파일 생성 (.env* 는 .gitignore 에 포함되어 커밋되지 않음)
echo "GEMINI_API_KEY=AIza..." > .env.local

npm run translate
```

### 영문 번역을 강제로 다시 하고 싶다면

한국어 원문을 수정하면 자동으로 재번역 대상이 되므로 보통은 별도 조치가
필요 없습니다. 원문을 건드리지 않고도 강제로 재번역하고 싶다면, 해당
`src/content-en/<category>/<slug>.mdx` 파일의 frontmatter에서 `sourceHash`
줄을 지우거나 파일 자체를 삭제한 뒤 다시 push(또는 로컬에서
`npm run translate` 재실행)하면 됩니다.
