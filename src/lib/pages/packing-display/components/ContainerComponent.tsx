'use client';
import React from 'react';

type Props = {
  children?: React.FC;
  L: number; // 長さ
  W: number; // 幅
  H: number; // 高さ
};

// コンテナコンポーネント
export const ContainerComponent: React.FC<Props> = ({ L, W, H }) => {
  return (
    <mesh>
      {/* コンテナの直方体を作成 */}
      <boxGeometry args={[L, W, H]} /> {/* x: 長さ, y: 高さ, z: 幅 */}
      <meshStandardMaterial
        color="lightblue"
        transparent={true}
        opacity={0.3}
      />
    </mesh>
  );
};
