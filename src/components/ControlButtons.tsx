import React, { FC } from "react";
import { restart, initializePieces } from "../helpers/canvasManipulation";
import { sizeRefType } from "../JigsawPuzzle";
import Piece from "../Piece";

interface controlButtonProps {
  topButtonsRef: React.MutableRefObject<HTMLDivElement | null>;
  itemsRef: React.MutableRefObject<HTMLDivElement | null>;
  sizeRef: React.MutableRefObject<sizeRefType>;
  PIECES: React.MutableRefObject<Piece[]>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  mainContainerRef: React.MutableRefObject<HTMLDivElement | null>;
}

const ControlButtons: FC<controlButtonProps> = ({
  topButtonsRef,
  itemsRef,
  sizeRef,
  PIECES,
  canvasRef,
  mainContainerRef,
}) => {
  return (
    <div>
      <button
        onClick={() =>
          restart(PIECES, canvasRef, mainContainerRef, topButtonsRef, itemsRef)
        }
        className="startAgainBtn"
      >
        Play Again
      </button>

      <button
        onClick={() => {
          if (itemsRef.current) {
            itemsRef.current.style.display = "block";
            initializePieces(
              sizeRef.current.rows,
              sizeRef.current.columns,
              topButtonsRef,
              sizeRef,
              PIECES
            );
          }
        }}
        className="newGameBtn"
      >
        New Game
      </button>
    </div>
  );
};

export default ControlButtons;
