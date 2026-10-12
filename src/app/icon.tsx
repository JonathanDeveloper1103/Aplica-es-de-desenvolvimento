import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Monograma do profissional (VT) em verde-oliva.
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
          background: "#414b35",
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#eae3d7",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "serif",
          }}
        >
          VT
        </div>
      </div>
    ),
    { ...size },
  );
}
