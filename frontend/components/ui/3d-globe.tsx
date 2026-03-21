"use client";
import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

export interface Marker {
  lat: number;
  lng: number;
  label?: string;
}

export interface GlobeConfig {
  atmosphereColor?: string;
  atmosphereIntensity?: number;
  bumpScale?: number;
  autoRotateSpeed?: number;
}

export function Globe3D({
  className,
  markers = [],
  config = {},
  onMarkerClick,
  onMarkerHover,
}: {
  className?: string;
  markers?: any[];
  config?: GlobeConfig;
  onMarkerClick?: (marker: any) => void;
  onMarkerHover?: (marker: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: markers.map(m => ({ location: [m.lat, m.lng], size: 0.05 })),
      onRender: (state) => {
        state.phi = phi;
        phi += (config.autoRotateSpeed || 0.01);
      },
    });

    return () => {
      globe.destroy();
    };
  }, [markers, config]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", maxWidth: "100%", aspectRatio: "1" }}
      className={cn("mx-auto", className)}
    />
  );
}
