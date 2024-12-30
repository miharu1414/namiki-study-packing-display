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

  // 形状のインデックスに基づく色割り当て
  const [shapeColors, setShapeColors] = useState<Map<string, string>>(
    new Map()
  );

  const shapeColorsList = [
    '#ff6347',
    '#ff1493',
    '#ff8c00',
    '#ffff00',
    '#98fb98',
    '#00bfff',
    '#dda0dd',
    '#adff2f',
    '#f0e68c',
    '#f08080', // 10種類の色
  ];

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

  // 同じ形状のボックスに色を付けるための処理
  const getShapeColor = (box: { l: number; w: number; h: number }) => {
    const shapeKey = [box.l, box.w, box.h].sort().join('-');
    if (!shapeColors.has(shapeKey)) {
      // 新しい形状の場合、色を割り当て
      const colorIndex = shapeColors.size % shapeColorsList.length; // 10種類の色の循環
      setShapeColors(
        (prev) => new Map(prev.set(shapeKey, shapeColorsList[colorIndex]))
      );
    }
    return shapeColors.get(shapeKey) || '#98fb98'; // 既存の色があればそれを返す
  };

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
            isHighlighted={index === currentBoxCount} // 最新のボックスだけハイライト
            color={index === currentBoxCount ? '#ff6347' : getShapeColor(box)} // 最新のボックスにはオレンジ色、それ以外は形状に基づく色
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
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <BoxComponent
              position={[0, 0, 0]}
              dimensions={[nextBox.l / 100, nextBox.h / 100, nextBox.w / 100]}
              isHighlighted={true} // 仮のプレビューなのでハイライト
              color="#ff6347" // 最新の荷物として色を設定
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
        >
          次のボックス
        </button>
      </div>
    </div>
  );
};
