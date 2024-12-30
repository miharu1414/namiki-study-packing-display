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

  const currentBox = boxes[currentBoxCount]; // 現在のボックス情報
  const nextBox = boxes[currentBoxCount + 1]; // 次のボックス情報

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
            L={containerSize.L / 100 + 2} // x方向の幅
            W={containerSize.H / 100 + 2} // y方向の高さ
            H={containerSize.W / 100 + 2} // z方向の奥行き
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

      {/* 現在のボックス情報と次のボックス情報 */}
      <div
        style={{
          position: 'absolute',
          top: '120px',
          left: '10px',
          width: '250px',
          height: '200px',
          backgroundColor: '#ecf0f1',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 10,
        }}
      >
        <h3 style={{ color: '#2c3e50' }}>現在の荷物</h3>
        {currentBox ? (
          <div>
            <p style={{ color: '#2c3e50' }}>
              <strong>サイズ:</strong> {currentBox.l} x {currentBox.w} x{' '}
              {currentBox.h}
            </p>
            <p style={{ color: '#2c3e50' }}>
              <strong>位置:</strong> x: {currentBox.position.x}, y:{' '}
              {currentBox.position.y}, z: {currentBox.position.z}
            </p>
          </div>
        ) : (
          <p style={{ color: '#2c3e50' }}>現在の荷物はありません。</p>
        )}

        <br />
        <h3 style={{ color: '#2c3e50' }}>次の荷物</h3>
        {nextBox ? (
          <div>
            <p style={{ color: '#2c3e50' }}>
              <strong>サイズ:</strong> {nextBox.l} x {nextBox.w} x {nextBox.h}
            </p>
            <p style={{ color: '#2c3e50' }}>
              <strong>位置:</strong> x: {nextBox.position.x}, y:{' '}
              {nextBox.position.y}, z: {nextBox.position.z}
            </p>
          </div>
        ) : (
          <p style={{ color: '#2c3e50' }}>次の荷物はありません。</p>
        )}
      </div>

      {/* 次のボックスの形状を確認するためのプレビュー用Canvas */}
      <div
        style={{
          position: 'absolute',
          top: '400px', // 現在のボックス情報の下に配置
          left: '10px',
          width: '250px',
          height: '250px', // 高さを増加
          backgroundColor: '#ecf0f1',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 10,
        }}
      >
        <h3 style={{ color: '#2c3e50' }}>次の荷物のプレビュー</h3>
        {nextBox && containerSize ? (
          <Canvas camera={{ position: [5, 5, 10], fov: 50 }}>
            {' '}
            {/* 斜め上から見るようにカメラ位置を調整 */}
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* Boxの位置は固定され、カメラが斜め上から見る */}
            <BoxComponent
              position={[
                0, // x座標を固定
                0, // y座標を固定
                0, // z座標を固定
              ]}
              dimensions={[
                nextBox.l / 100, // x方向の長さ
                nextBox.h / 100, // y方向の高さ
                nextBox.w / 100, // z方向の幅
              ]}
              isHighlighted={true} // 仮のプレビューなのでハイライト
            />
            <OrbitControls />
          </Canvas>
        ) : (
          <>
            <br />
            <p style={{ color: '#2c3e50' }}>次の荷物はありません。</p>
          </>
        )}
      </div>
      {/* ボタン */}
      <div
        style={{
          position: 'absolute',
          top: '70px',
          left: '10px',
          zIndex: 10,
        }}
      >
        <button
          onClick={handleNextBox}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#3498db',
            color: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = '#2980b9')
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = '#3498db')
          }
          disabled={currentBoxCount >= boxes.length}
        >
          進む
        </button>
      </div>
    </div>
  );
};
