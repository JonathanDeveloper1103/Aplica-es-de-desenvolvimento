import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Monograma provisório — substituir pela logo real assim que disponível.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#123a2c",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#cdac6e",
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "serif",
          }}
        >
          LC
        </div>
      </div>
    ),
    { ...size },
  );
}
