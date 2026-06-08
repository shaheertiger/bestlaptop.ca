import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon (iOS home screen). Generated at build time, no binary asset.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b5ff1",
          color: "#ffffff",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        BL
      </div>
    ),
    size,
  );
}
