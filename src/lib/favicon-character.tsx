type CharacterIconProps = {
  size: number;
};

/**
 * 귀여운 캐릭터 파비콘.
 * satori(ImageResponse) 제약(복잡한 SVG path 미지원) 때문에
 * div + borderRadius 조합만으로 동글동글한 캐릭터 얼굴을 그립니다.
 */
export function CharacterIcon({ size }: CharacterIconProps) {
  const s = size / 32; // 32px 기준 스케일 비율

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* 몸통 */}
      <div
        style={{
          position: 'relative',
          width: 28 * s,
          height: 28 * s,
          borderRadius: '50%',
          background: '#6B3FA0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 정수리 하이라이트 */}
        <div
          style={{
            position: 'absolute',
            top: 4 * s,
            left: 6 * s,
            width: 6 * s,
            height: 4 * s,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.35)',
          }}
        />

        {/* 왼쪽 볼 */}
        <div
          style={{
            position: 'absolute',
            top: 17 * s,
            left: 3 * s,
            width: 4.5 * s,
            height: 3 * s,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.45)',
          }}
        />
        {/* 오른쪽 볼 */}
        <div
          style={{
            position: 'absolute',
            top: 17 * s,
            right: 3 * s,
            width: 4.5 * s,
            height: 3 * s,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.45)',
          }}
        />

        {/* 눈 (흰자 + 눈동자) */}
        <div style={{ display: 'flex', gap: 6 * s, marginBottom: 3 * s }}>
          <div
            style={{
              width: 6 * s,
              height: 7 * s,
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: 1 * s,
            }}
          >
            <div
              style={{
                width: 3 * s,
                height: 3 * s,
                borderRadius: '50%',
                background: '#24292f',
              }}
            />
          </div>
          <div
            style={{
              width: 6 * s,
              height: 7 * s,
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: 1 * s,
            }}
          >
            <div
              style={{
                width: 3 * s,
                height: 3 * s,
                borderRadius: '50%',
                background: '#24292f',
              }}
            />
          </div>
        </div>

        {/* 웃는 입 */}
        <div
          style={{
            position: 'absolute',
            bottom: 7 * s,
            width: 7 * s,
            height: 3.5 * s,
            borderBottom: `${1.6 * s}px solid #ffffff`,
            borderLeft: `${1.6 * s}px solid transparent`,
            borderRight: `${1.6 * s}px solid transparent`,
            borderRadius: '0 0 50% 50%',
          }}
        />
      </div>
    </div>
  );
}
