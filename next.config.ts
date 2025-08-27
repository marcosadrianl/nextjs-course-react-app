import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://192.168.1.56:3000", // tu PC en la red local
    "http://localhost:3000", // acceso normal en tu máquina
  ],
};

export default nextConfig;
