"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const getFragmentShader = (colors: string[]) => `
  uniform float u_time;
  varying vec2 vUv;
  
  // Ashima's 3D Simplex Noise
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  
  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    // Generate organic noise based on UV and time
    float noise1 = snoise(vec3(vUv * 1.5, u_time * 0.15));
    float noise2 = snoise(vec3(vUv * 2.0 - vec2(10.0), u_time * 0.1));
    float noise3 = snoise(vec3(vUv * 3.0 + vec2(5.0), u_time * 0.2));
    
    // Smooth the noise
    float n1 = noise1 * 0.5 + 0.5;
    float n2 = noise2 * 0.5 + 0.5;
    float n3 = noise3 * 0.5 + 0.5;

    // Dynamically injected colors
    vec3 col1 = vec3(${colors[0]});
    vec3 col2 = vec3(${colors[1]});
    vec3 col3 = vec3(${colors[2]});
    vec3 col4 = vec3(${colors[3]});
    vec3 col5 = vec3(${colors[4]});

    // Mix colors based on noise patterns
    vec3 mix1 = mix(col5, col1, smoothstep(0.3, 0.7, n1));
    vec3 mix2 = mix(mix1, col3, smoothstep(0.4, 0.8, n2));
    vec3 finalColor = mix(mix2, col4, smoothstep(0.5, 0.9, n3));
    
    // Add subtle grain/noise
    float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
    finalColor -= grain * 0.05;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export type Theme = "navy" | "ocean" | "mint" | "cream" | "gold";

const themeColors: Record<Theme, string[]> = {
  navy: [
    "0.039, 0.239, 0.384",
    "0.242, 0.402, 0.523",
    "0.445, 0.564, 0.661",
    "0.648, 0.726, 0.800",
    "0.851, 0.889, 0.938"
  ],
  ocean: [
    "0.235, 0.553, 0.678",
    "0.394, 0.645, 0.751",
    "0.553, 0.736, 0.823",
    "0.712, 0.828, 0.895",
    "0.871, 0.920, 0.968"
  ],
  mint: [
    "0.663, 0.902, 0.890",
    "0.546, 0.745, 0.744",
    "0.429, 0.588, 0.597",
    "0.312, 0.431, 0.450",
    "0.195, 0.275, 0.304"
  ],
  cream: [
    "0.969, 0.969, 0.949",
    "0.791, 0.798, 0.791",
    "0.613, 0.628, 0.632",
    "0.435, 0.458, 0.474",
    "0.256, 0.288, 0.315"
  ],
  gold: [
    "0.949, 0.773, 0.486",
    "0.775, 0.642, 0.420",
    "0.601, 0.511, 0.355",
    "0.427, 0.380, 0.289",
    "0.253, 0.249, 0.223"
  ]
};

const GradientPlane = ({ theme }: { theme: Theme }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
    }),
    []
  );

  const fragmentShader = useMemo(() => getFragmentShader(themeColors[theme]), [theme]);

  useFrame((state) => {
    if (meshRef.current) {
      // @ts-expect-error - accessing uniforms dynamically
      meshRef.current.material.uniforms.u_time.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const WebGLFluidGradient = ({ theme = "ocean" }: { theme?: Theme }) => {
  return (
    <div className="absolute inset-0 h-full w-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <GradientPlane theme={theme} />
      </Canvas>
    </div>
  );
};
