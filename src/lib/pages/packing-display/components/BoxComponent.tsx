'use client';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

type Props = {
  position: [x: number, y: number, z: number];
  isHighlighted?: boolean; // ハイライト用プロパティ（オプショナル）
};

export const BoxComponent: React.FC<Props> = (props) => {
  const { position, isHighlighted = false } = props; // デフォルト値として false を設定
  const mesh = useRef<Mesh | null>(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // ボックスの色を決定
  const color = isHighlighted
    ? 'blue' // ハイライトされているときは緑
    : hovered
      ? 'hotpink' // ホバーされているときはピンク
      : 'orange'; // それ以外はオレンジ

  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export type BoxProps = {
  defaultL: number;
  defaultW: number;
  defaultH: number;
  volume: number;
  l: number;
  w: number;
  h: number;
  isPositioned: boolean;
  x: number;
  y: number;
  z: number;
  lastL: number;
  lastW: number;
  lastH: number;
};
