'use client';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

type Props = {
  position: [x: number, y: number, z: number];
  dimensions: [xLength: number, yWidth: number, zHeight: number]; // ボックスのサイズ
  isHighlighted?: boolean; // ハイライト用プロパティ（オプショナル）
};

export const BoxComponent: React.FC<Props> = (props) => {
  const { position, dimensions, isHighlighted = false } = props;
  const mesh = useRef<Mesh | null>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const color = isHighlighted ? 'blue' : hovered ? 'hotpink' : 'orange';

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* サイズを指定した直方体 */}
      <boxGeometry args={dimensions} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
