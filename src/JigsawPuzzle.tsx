import React, { useEffect, useRef, useState } from "react";
import {
  handleResizer,
  initializePieces,
  updateCanvas,
} from "./helpers/canvasManipulation";
import { addEventListeners } from "./helpers/mouseControls";
import Piece from "./Piece";
import ControlButtons from "./components/ControlButtons";
import MenuModal from "./components/MenuModal";
import SuccessModal from "./components/SuccessModal";
import CanvasImage from "./components/CanvasImage";

export interface sizeRefType {
  x: number;
  y: number;
  width: number;
  height: number;
  rows: number;
  columns: number;
}

const completeApplauseAudio = new Audio("/audio/applause.wav");
completeApplauseAudio.volume = 0.2;

const CamPuzzle = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const helperCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<any>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const contextRef = useRef<any>();
  const helperContextRef = useRef<any>();
  const PIECES = useRef<Piece[]>([]);
  const selectedPiece = useRef<any>(null);
  const topButtonsRef = useRef<HTMLDivElement | null>(null);
  const sizeRef = useRef<sizeRefType>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rows: 2,
    columns: 2,
  });

  const [success, setSuccess] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<any>("/images/backupPuzzle.jpg");

  const scaler = 0.8;
  useEffect(() => {
    if (!contextRef.current && !helperContextRef.current) {
      contextRef.current = canvasRef.current?.getContext("2d", {
        willReadFrequently: true,
      });
      helperContextRef.current = helperCanvasRef.current?.getContext("2d", {
        willReadFrequently: true,
      });
    }
    addEventListeners(
      canvasRef,
      helperContextRef,
      selectedPiece,
      PIECES,
      setSuccess
    );

    if (imgRef.current) {
      handleResizer(
        canvasRef,
        helperCanvasRef,
        scaler,
        sizeRef,
        imgRef,
        mainContainerRef
      );
      initializePieces(
        sizeRef.current.rows,
        sizeRef.current.columns,
        topButtonsRef,
        sizeRef,
        PIECES
      );
      updateCanvas(
        contextRef,
        canvasRef,
        helperContextRef,
        helperCanvasRef,
        imgRef,
        sizeRef,
        PIECES
      );
    }
    if (itemsRef.current) {
      itemsRef.current.style.display = "block";
    }
  }, []);

  return (
    <div className="appContainer">
      <div className="mainContainer" ref={mainContainerRef}>
        <div ref={topButtonsRef} className="topButtons">
          <ControlButtons
            topButtonsRef={topButtonsRef}
            itemsRef={itemsRef}
            sizeRef={sizeRef}
            PIECES={PIECES}
            canvasRef={canvasRef}
            mainContainerRef={mainContainerRef}
          />
        </div>
        <CanvasImage
          canvasRef={canvasRef}
          helperCanvasRef={helperCanvasRef}
          imgRef={imgRef}
          imgUrl={imgUrl}
        />
        <MenuModal
          itemsRef={itemsRef}
          sizeRef={sizeRef}
          topButtonsRef={topButtonsRef}
          PIECES={PIECES}
          canvasRef={canvasRef}
          helperCanvasRef={helperCanvasRef}
          scaler={scaler}
          imgRef={imgRef}
          contextRef={contextRef}
          helperContextRef={helperContextRef}
          mainContainerRef={mainContainerRef}
          setImgUrl={setImgUrl}
        />
        <SuccessModal
          success={success}
          setSuccess={setSuccess}
          itemsRef={itemsRef}
          topButtonsRef={topButtonsRef}
        />
      </div>
    </div>
  );
};

export default CamPuzzle;
