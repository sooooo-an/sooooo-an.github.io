import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="content-wide not-found">
      <h1 className="hero-name" style={{ fontSize: 32 }}>
        페이지를 찾을 수 없습니다
      </h1>
      <p style={{ color: 'var(--color-meta)', margin: '16px 0 32px' }}>
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link href="/" className="btn btn-primary">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
