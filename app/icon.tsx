import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

// Icon generation
export default function Icon() {
  try {
    // Try to use TOMO.jpg as favicon
    const imagePath = join(process.cwd(), "public", "images", "TOMO.jpg");
    const imageBuffer = readFileSync(imagePath);
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
    
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20%",
            overflow: "hidden",
          }}
        >
          <img
            src={base64Image}
            alt="TOMO"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    // Fallback to original design if TOMO.jpg fails
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 24,
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
          T
        </div>
      ),
      {
        ...size,
      }
    );
  }
}
