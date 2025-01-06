'use client';
import { useRef, useState } from 'react';
import * as THREE from 'three'; // THREEをインポート
import { Mesh } from 'three'; // EdgesGeometryやLineBasicMaterialをインポート

type Props = {
  position: [x: number, y: number, z: number];
  dimensions: [xLength: number, yWidth: number, zHeight: number];
  isHighlighted?: boolean; // 最新のボックスを特定
  color?: string; // 色をプロパティとして渡す
};

export const BoxComponent: React.FC<Props> = (props) => {
  const { position, dimensions, isHighlighted = false, color } = props;
  const mesh = useRef<Mesh | null>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // `color`プロパティが渡されていなければ、デフォルトの色を決定
  const boxColor = isHighlighted
    ? '#ff6347' // 最新ボックス: トマトレッド
    : color || (hovered ? 'hotpink' : '#98fb98'); // 色が指定されていなければホバー時やデフォルト色

  // EdgesGeometryを使ってエッジを取得
  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(...dimensions));

  return (
    <mesh
      position={position}
      ref={mesh}
      // scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={dimensions} />
      <meshStandardMaterial color={boxColor} />

      {/* エッジの描画 */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#000000" linewidth={2} />
      </lineSegments>
    </mesh>
  );
};
