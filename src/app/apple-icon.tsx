import { ImageResponse } from 'next/og';
import { CharacterIcon } from '@/lib/favicon-character';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function AppleIcon() {
  return new ImageResponse(<CharacterIcon size={180} />, { ...size });
}
