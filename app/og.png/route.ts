import { ImageResponse } from "next/og";

// Emitted as a real /og.png file (correct image/png MIME on GitHub Pages),
// unlike the extensionless opengraph-image file convention. Generated at build.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#101a26",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#e8a13d",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Kathmandu, Nepal
        </div>
        <div
          style={{
            color: "#f7f8f6",
            fontSize: 104,
            fontWeight: 700,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          Yuhanna Kapali
        </div>
        <div
          style={{
            color: "#8fa3b0",
            fontSize: 34,
            marginTop: 28,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Software engineer. Writing about building things, the films I watch,
          and the trails above Kathmandu.
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
