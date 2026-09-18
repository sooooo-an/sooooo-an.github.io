import { ImageResponse } from 'next/og';
import { getAllPosts, getPostBySlug } from '@/lib/content';
import { categoryLabel } from '@/lib/categories';

export const alt = '글 대표 이미지';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? '안수경';
  const meta = post ? `${categoryLabel(post.category)} · ${post.date}` : '';

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
        <div style={{ fontSize: 20, color: '#1F6F50', letterSpacing: 2 }}>
          {meta}
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
      </div>
    ),
    { ...size }
  );
}
