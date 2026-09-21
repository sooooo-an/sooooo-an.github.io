import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#6B3FA0',
        }}
      >
        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1,
            fontFamily: 'sans-serif',
          }}
        >
          s
        </div>
      </div>
    ),
    { ...size }
  );
}
