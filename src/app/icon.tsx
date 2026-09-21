import { ImageResponse } from 'next/og';
import { CharacterIcon } from '@/lib/favicon-character';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function Icon() {
  return new ImageResponse(<CharacterIcon size={32} />, { ...size });
}
