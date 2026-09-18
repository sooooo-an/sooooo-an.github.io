import { ImageResponse } from 'next/og';
import { getAllProjects, getProjectBySlug } from '@/lib/content';

export const alt = '프로젝트 대표 이미지';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? '안수경';
  const summary = project?.summary ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          background: '#ffffff',
        }}
      >
        <div style={{ fontSize: 20, color: '#6B3FA0', letterSpacing: 2 }}>
          PROJECT
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#24292f',
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 24, color: '#6b7280', marginTop: 20, maxWidth: 900 }}>
          {summary}
        </div>
      </div>
    ),
    { ...size }
  );
}
