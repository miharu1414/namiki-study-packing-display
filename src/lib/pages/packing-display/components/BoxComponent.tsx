'use client';
import { useRef, useState } from 'react';
import * as THREE from 'three'; // THREEをインポート
import { Mesh } from 'three'; // EdgesGeometryやLineBasicMaterialをインポート

type Props = {
  position: [x: number, y: number, z: number];
  dimensions: [xLength: number, yWidth: number, zHeight: number];
  isHighlighted?: boolean;
};

export const BoxComponent: React.FC<Props> = (props) => {
  const { position, dimensions, isHighlighted = false } = props;
  const mesh = useRef<Mesh | null>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const color = isHighlighted
    ? '#ff6347' // 最新ボックス: トマトレッド
    : hovered
      ? 'hotpink' // ホバー時: ホットピンク
      : '#98fb98'; // 他のボックス: 薄い緑

  // EdgesGeometryを使ってエッジを取得
  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(...dimensions));

  // // 線のスタイルを定義
  // const lineMaterial = new THREE.LineBasicMaterial({
  //   color: '#000000', // エッジの色
  //   linewidth: 2, // 線の太さ（WebGL2では無効かもしれませんが、書いておきます）
  // });

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={dimensions} />
      <meshStandardMaterial color={color} />

      {/* エッジの描画 */}
      <lineSegments geometry={edges}>
        {/* ここで lineMaterial を適用 */}
        <lineBasicMaterial color="#000000" linewidth={2} />
      </lineSegments>
    </mesh>
  );
};
