'use client';
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BoxComponent } from './BoxComponent';
import { ContainerComponent } from './ContainerComponent';

export const CanvasComponent: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみレンダリングするためのフラグを設定
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [boxPositions, setBoxPositions] = useState<
    [x: number, y: number, z: number][]
  >([]);
  const [currentBoxCount, setCurrentBoxCount] = useState(0);

  // ボックスを配置する関数
  const generateBoxPositions = (L: number, W: number, H: number) => {
    const positions: [number, number, number][] = [];
    const boxSize = 1; // ボックスのサイズ
    const offsetX = -(L * boxSize) / 2 + 0.5; // コンテナの中心を基準にXオフセット
    const offsetY = -(W * boxSize) / 2 + 0.5; // コンテナの中心を基準にYオフセット
    const offsetZ = -(H * boxSize) / 2 + 0.5; // コンテナの中心を基準にZオフセット

    for (let x = 0; x < L; x++) {
      for (let y = 0; y < W; y++) {
        for (let z = 0; z < H; z++) {
          positions.push([
            x * boxSize + offsetX,
            y * boxSize + offsetY,
            z * boxSize + offsetZ,
          ]);
        }
      }
    }
    return positions;
  };

  // コンテナのサイズ
  const containerL = 10;
  const containerW = 5;
  const containerH = 5;

  // ボックスの全体位置を計算
  const allBoxPositions = generateBoxPositions(
    containerL,
    containerW,
    containerH
  );

  // ボタンを押したときの処理
  const handleNextBox = () => {
    if (currentBoxCount < allBoxPositions.length) {
      setBoxPositions((prev) => [...prev, allBoxPositions[currentBoxCount]]);
      setCurrentBoxCount((prev) => prev + 1);
    }
  };

  if (!isClient) {
    return null; // サーバーサイドではレンダリングしない
  }

  return (
    <div
      style={{ width: '100vw', height: '100vh', backgroundColor: 'whitesmoke' }}
    >
      <Canvas camera={{ position: [15, 15, 15], fov: 50 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* コンテナを描画 */}
        <ContainerComponent
          L={containerL + 1}
          W={containerW + 1}
          H={containerH + 1}
        />
        {/* ボックスをコンテナ内に配置 */}
        {boxPositions.map((position, index) => (
          <BoxComponent
            key={index}
            position={position}
            isHighlighted={index === currentBoxCount - 1} // 直近のBoxを判定
          />
        ))}
        {/* OrbitControlsを追加して、視点操作を可能にする */}
        <OrbitControls />
      </Canvas>
      {/* 進むボタン */}
      <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
        <button
          onClick={handleNextBox}
          style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
          disabled={currentBoxCount >= allBoxPositions.length} // 全ボックスが配置済みの場合ボタンを無効化
        >
          進む
        </button>
      </div>
    </div>
  );
};
