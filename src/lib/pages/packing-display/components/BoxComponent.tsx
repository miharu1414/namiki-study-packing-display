'use client';
import { useRef, useState } from 'react';

import { Mesh } from 'three';

type Props = {
  position: [x: number, y: number, z: number];
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

export const BoxComponent: React.FC<Props> = (props) => {
  const mesh = useRef<Mesh | null>(null); // 修正
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // mesh.currentがnullでないことを確認してからフレーム更新
  // useFrame(() => {
  //   if (mesh.current) {
  //     mesh.current.rotation.x += 0.01;
  //   }
  // });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};
