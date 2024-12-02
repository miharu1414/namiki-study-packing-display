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
      {/* コンテナの立方体を作成 */}
      <boxGeometry args={[L, W, H]} />
      <meshStandardMaterial
        color="lightblue"
        transparent={true} // 透過を有効にする
        opacity={0.3} // 透過の度合いを設定（0: 完全に透明, 1: 完全に不透明）
      />
    </mesh>
  );
};
