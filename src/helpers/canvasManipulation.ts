import Piece from "../Piece";
import Resizer from "react-image-file-resizer";
import { sizeRefType } from "../JigsawPuzzle";

export const handleResizer = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  helperCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  scaler: number,
  sizeRef: React.MutableRefObject<sizeRefType>,
  imgRef: any,
  mainContainerRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  if (
    canvasRef.current &&
    helperCanvasRef.current &&
    mainContainerRef.current
  ) {
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    helperCanvasRef.current.width = window.innerWidth;
    helperCanvasRef.current.height = window.innerHeight;

    let resizer =
      scaler *
      Math.min(
        mainContainerRef.current.offsetWidth / 300,
        mainContainerRef.current.offsetHeight / 320
      );

    sizeRef.current.width = resizer * 300;
    sizeRef.current.height = resizer * 320;
    sizeRef.current.x = window.innerWidth / 2 - sizeRef.current.width / 2;
    sizeRef.current.y = window.innerHeight / 2 - sizeRef.current.height / 2;
  }
};

export const getRandomColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgb(${red},${green},${blue})`;
};
const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const randomizePieces = (PIECES: any, mainContainerRef: any) => {
  let max =
    window.innerWidth > 450
      ? (window.innerWidth - 450) / 2 + 450
      : window.innerWidth - 20;
  let min = window.innerWidth > 450 ? max - 450 + 10 : 20;
  let hMax = mainContainerRef.current.clientHeight - 100;
  for (let i = 0; i < PIECES.current.length; i++) {
    let loc = {
      x: Math.random() * (max - 50 - min) + min,

      y: Math.random() * (window.innerHeight - 100 - 100 + 1) + 100,
    };
    PIECES.current[i].x = loc.x;
    PIECES.current[i].y = loc.y;
    PIECES.current[i].correct = false;

    console.log(Math.random() * (hMax - 200 + 1 + 200));
  }
};

export const getDifficulty = (level: string) => {
  switch (level) {
    case "2x2":
      return { row: 2, column: 2 };

    case "3x3":
      return { row: 3, column: 3 };

    case "4x4":
      return { row: 4, column: 4 };

    case "5x5":
      return { row: 5, column: 5 };

    case "6x6":
      return { row: 6, column: 6 };

    case "7x7":
      return { row: 7, column: 7 };

    case "8x8":
      return { row: 8, column: 8 };

    case "9x9":
      return { row: 9, column: 9 };

    case "10x10":
      return { row: 10, column: 10 };

    case "11x11":
      return { row: 11, column: 11 };

    case "12x12":
      return { row: 12, column: 12 };

    case "13x13":
      return { row: 13, column: 13 };

    default:
      return { row: 4, column: 4 };
  }
};

export const initializePieces = (
  rows: number,
  columns: number,
  topButtonsRef: React.MutableRefObject<HTMLDivElement | null>,
  sizeRef: React.MutableRefObject<sizeRefType>,
  PIECES: React.MutableRefObject<Piece[]>
) => {
  if (topButtonsRef.current) {
    topButtonsRef.current.style.display = "none";
  }
  sizeRef.current.rows = rows;
  sizeRef.current.columns = columns;

  PIECES.current = [];
  let uniqueRandomColors: string[] = [];
  let id = 1;
  for (let i = 0; i < sizeRef.current.rows; i++) {
    for (let j = 0; j < sizeRef.current.columns; j++) {
      let color = getRandomColor();
      while (uniqueRandomColors.includes(color)) {
        color = getRandomColor();
      }
      PIECES.current.push(new Piece(id, i, j, sizeRef.current, color));
      id++;
    }
  }

  let cnt = 0;
  for (let i = 0; i < sizeRef.current.rows; i++) {
    for (let j = 0; j < sizeRef.current.columns; j++) {
      const piece = PIECES.current[cnt];

      if (i === sizeRef.current.rows - 1) {
        piece.bottom = null;
      } else {
        const sgn = Math.random() - 0.5 < 0 ? -1 : 1;
        piece.bottom = sgn * (Math.random() * 0.4 + 0.3);
      }

      if (j === sizeRef.current.columns - 1) {
        piece.right = null;
      } else {
        const sgn = Math.random() - 0.5 < 0 ? -1 : 1;
        piece.right = sgn * (Math.random() * 0.4 + 0.3);
      }

      if (j === 0) {
        piece.left = null;
      } else {
        piece.left = -PIECES.current[cnt - 1].right;
      }

      if (i === 0) {
        piece.top = null;
      } else {
        piece.top = -PIECES.current[cnt - sizeRef.current.columns].bottom;
      }

      cnt++;
    }
  }
};

export const restart = (
  PIECES: any,
  canvasRef: any,
  mainContainerRef: any,
  topButtonsRef: any,
  itemsRef: any
) => {
  randomizePieces(PIECES, mainContainerRef);

  itemsRef.current.style.display = "none";
  topButtonsRef.current.style.display = "flex";
};

export const updateCanvas = (
  contextRef: any,
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  helperContextRef: any,
  helperCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  imgRef: any,
  sizeRef: React.MutableRefObject<sizeRefType>,
  PIECES: React.MutableRefObject<Piece[]>
) => {
  if (canvasRef.current && helperCanvasRef.current) {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    helperContextRef.current.clearRect(
      0,
      0,
      helperCanvasRef.current.width,
      helperCanvasRef.current.height
    );

    contextRef.current.globalAlpha = 0.5;

    contextRef.current.drawImage(
      imgRef.current,
      sizeRef.current.x,
      sizeRef.current.y,
      sizeRef.current.width,
      sizeRef.current.height
    );

    contextRef.current.globalAlpha = 1;

    for (let i = 0; i < PIECES.current.length; i++) {
      PIECES.current[i].draw(
        contextRef.current,
        imgRef.current,
        sizeRef.current
      );
      PIECES.current[i].draw(
        helperContextRef.current,
        imgRef.current,
        sizeRef.current,
        false
      );
    }
    requestAnimationFrame(() => {
      updateCanvas(
        contextRef,
        canvasRef,
        helperContextRef,
        helperCanvasRef,
        imgRef,
        sizeRef,
        PIECES
      );
    });
  }
};

export const fileChangedHandler = (
  event: any,
  canvasRef: any,
  helperCanvasRef: any,
  scaler: number,
  sizeRef: any,
  imgRef: any,
  topButtonsRef: any,
  PIECES: any,
  contextRef: any,
  helperContextRef: any,
  setImgUrl: React.Dispatch<any>,
  mainContainerRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  if (event.target.files[0]) {
    try {
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        350,
        "JPEG",
        100,
        0,
        (uri) => {
          setImgUrl(uri);
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
        },
        "base64",
        300,
        350
      );
    } catch (err) {
      console.log(err);
    }
  }
};

export const difficultyLevel = [
  "2x2",
  "3x3",
  "4x4",
  "5x5",
  "6x6",
  "7x7",
  "8x8",
  "9x9",
  "10x10",
  "12x12",
  "13x13",
];
