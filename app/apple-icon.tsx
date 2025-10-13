import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

// Apple icon generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: "linear-gradient(135deg, #2563eb 0%, #9333ea 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          borderRadius: "20%",
        }}
      >
        N
      </div>
    ),
    {
      ...size,
    }
  );
}
