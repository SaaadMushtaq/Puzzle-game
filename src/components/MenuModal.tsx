import React, { FC } from "react";
import { RiImageAddFill } from "react-icons/ri";
import {
  difficultyLevel,
  restart,
  getDifficulty,
  initializePieces,
  fileChangedHandler,
} from "../helpers/canvasManipulation";
import { sizeRefType } from "../JigsawPuzzle";
import Piece from "../Piece";
interface menuModalProps {
  itemsRef: React.MutableRefObject<HTMLDivElement | null>;
  sizeRef: React.MutableRefObject<sizeRefType>;
  topButtonsRef: React.MutableRefObject<HTMLDivElement | null>;
  PIECES: React.MutableRefObject<Piece[]>;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  helperCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  scaler: number;
  imgRef: any;
  contextRef: any;
  helperContextRef: any;
  mainContainerRef: React.MutableRefObject<HTMLDivElement | null>;
  setImgUrl: React.Dispatch<any>;
}

const MenuModal: FC<menuModalProps> = ({
  itemsRef,
  sizeRef,
  topButtonsRef,
  PIECES,
  canvasRef,
  helperCanvasRef,
  scaler,
  imgRef,
  contextRef,
  helperContextRef,
  mainContainerRef,

  setImgUrl,
}) => {
  const difficultyHandler = (e: any) => {
    const temp = getDifficulty(e.target.value);
    initializePieces(temp.row, temp.column, topButtonsRef, sizeRef, PIECES);
  };

  return (
    <div id="menuItems" ref={itemsRef}>
      <div id="menu">
        <div id="controls">
          Difficulty
          <br />
          <select id="difficulty" onChange={(e) => difficultyHandler(e)}>
            {difficultyLevel.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
          <br />
          <br />
          <button
            onClick={() =>
              restart(
                PIECES,
                canvasRef,
                mainContainerRef,
                topButtonsRef,
                itemsRef
              )
            }
          >
            Start
          </button>
        </div>
      </div>
      <input
        className="chooseFile"
        type="file"
        id="file"
        accept="image/*"
        onChange={(e) =>
          fileChangedHandler(
            e,
            canvasRef,
            helperCanvasRef,
            scaler,
            sizeRef,
            imgRef,
            topButtonsRef,
            PIECES,
            contextRef,
            helperContextRef,
            setImgUrl,
            mainContainerRef
          )
        }
      />
      <label htmlFor="file">
        <RiImageAddFill width={"20px"} height={"20px"} /> Choose a Photo
      </label>
    </div>
  );
};

export default MenuModal;
