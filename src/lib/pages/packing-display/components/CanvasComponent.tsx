'use client';
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BoxComponent } from './BoxComponent';
import { ContainerComponent } from './ContainerComponent';

export const CanvasComponent: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [containerSize, setContainerSize] = useState<{
    L: number;
    W: number;
    H: number;
  } | null>(null);
  const [boxes, setBoxes] = useState<
    {
      l: number;
      w: number;
      h: number;
      position: { x: number; y: number; z: number };
    }[]
  >([]);
  const [currentBoxCount, setCurrentBoxCount] = useState(0);

  // クライアントサイドでのみレンダリングするためのフラグを設定
  useEffect(() => {
    setIsClient(true);
  }, []);

  // JSON ファイルのアップロード時にデータを読み取る
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setContainerSize(json.container);
        setBoxes(json.boxes);
        setCurrentBoxCount(0); // 初期化
      } catch (error) {
        console.error('JSON parsing error:', error);
        alert('有効な JSON ファイルをアップロードしてください');
      }
    };
    reader.readAsText(file);
  };

  // ボタンを押したときの処理
  const handleNextBox = () => {
    if (currentBoxCount < boxes.length) {
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
      {/* ファイルアップロード */}
      <div
        style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}
      >
        <input
          type="file"
          accept="application/json"
          onChange={handleFileUpload}
          style={{ marginBottom: '10px' }}
        />
      </div>

      <Canvas camera={{ position: [15, 15, 15], fov: 50 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* コンテナを描画 */}
        {containerSize && (
          <ContainerComponent
            L={containerSize.L / 100} // x方向の幅
            W={containerSize.H / 100} // y方向の高さ
            H={containerSize.W / 100} // z方向の奥行き
          />
        )}

        {/* ボックスを描画 */}
        {boxes.slice(0, currentBoxCount).map((box, index) => (
          <BoxComponent
            key={index}
            position={[
              box.position.x / 100 - containerSize!.L / 200 + box.l / 200, // x座標調整
              box.position.z / 100 - containerSize!.H / 200 + box.h / 200, // y座標調整
              box.position.y / 100 - containerSize!.W / 200 + box.w / 200, // z座標調整
            ]}
            dimensions={[
              box.l / 100, // x方向の長さ
              box.h / 100, // y方向の高さ
              box.w / 100, // z方向の幅
            ]}
            isHighlighted={index === currentBoxCount - 1}
          />
        ))}
        <OrbitControls />
      </Canvas>

      {/* ボタン */}
      <div
        style={{ position: 'absolute', top: '50px', left: '10px', zIndex: 10 }}
      >
        <button
          onClick={handleNextBox}
          style={{ padding: '10px', fontSize: '16px', cursor: 'pointer' }}
          disabled={currentBoxCount >= boxes.length} // 全ボックスが配置済みの場合ボタンを無効化
        >
          進む
        </button>
      </div>
    </div>
  );
};
