import GithubSlugger from 'github-slugger';

// rehype-slug 내부적으로 github-slugger를 사용하므로, TOC 추출 시에도
// 동일한 인스턴스/로직으로 slug를 생성해 id가 서로 일치하도록 한다.
export function createSlugger() {
  return new GithubSlugger();
}
