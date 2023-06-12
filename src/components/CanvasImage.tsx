import React, { FC } from "react";

interface canvasImageProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  helperCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  imgRef: any;
  imgUrl: any;
}

const CanvasImage: FC<canvasImageProps> = ({
  canvasRef,
  helperCanvasRef,
  imgRef,
  imgUrl,
}) => {
  return (
    <>
      <canvas ref={canvasRef} width="450px" />
      <canvas ref={helperCanvasRef} width="450px" style={{ display: "none" }} />
      <img
        ref={imgRef}
        src={imgUrl}
        alt="Puzzle display"
        style={{
          width: "450px",
          height: "750px",
          objectFit: "fill",
        }}
      />
    </>
  );
};

export default CanvasImage;
