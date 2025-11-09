import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Turbopack uses this project directory as the workspace root.
  // This avoids Next inferring the workspace root incorrectly when there are
  // multiple lockfiles on the machine.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
