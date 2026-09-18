'use client';

import { useEffect } from 'react';

/**
 * output:'export' 정적 export 환경에서는 next-intl 같은 미들웨어 기반
 * locale 처리를 쓸 수 없고, root layout의 <html> 태그는 하나뿐이라
 * lang 속성을 라우트별로 서버에서 다르게 내려줄 수 없다.
 * 대신 클라이언트에서 mount 시 documentElement.lang 을 갱신한다.
 */
export default function SetHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);

  return null;
}
