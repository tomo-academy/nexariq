import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "NEXARIQ - AI Chatbot powered by xAI Grok";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #581c87 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: "120px",
              height: "120px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L2 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12V22"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L22 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Brand Name */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #60a5fa 0%, #c084fc 100%)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "-2px",
            }}
          >
            NEXARIQ
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "32px",
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: "500",
            }}
          >
            AI Chatbot powered by xAI Grok
          </div>

          {/* Features */}
          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "20px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#60a5fa",
                }}
              />
              Intelligent Conversations
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "20px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#c084fc",
                }}
              />
              Multiple Grok Models
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "20px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#60a5fa",
                }}
              />
              Real-time Responses
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
