import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Monograma provisório — substituir pela logo real do escritório assim que disponível.
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
          background: "#0f2340",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#a9803f",
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "serif",
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size },
  );
}
