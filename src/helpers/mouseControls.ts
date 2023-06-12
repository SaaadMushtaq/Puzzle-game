import Piece from "../Piece";

const completeApplauseAudio = new Audio("/audio/applause.wav");
completeApplauseAudio.volume = 0.2;

const isComplete = (PIECES: React.MutableRefObject<Piece[]>) => {
  for (let i = 0; i < PIECES.current.length; i++) {
    if (PIECES.current[i].correct === false) {
      return false;
    }
  }
  return true;
};

const getPressedPieceByColor = (
  color: string,
  PIECES: React.MutableRefObject<Piece[]>
) => {
  for (let i = PIECES.current.length - 1; i >= 0; i--) {
    if (PIECES.current[i].color === color) {
      return PIECES.current[i];
    }
  }
  return null;
};

const onMouseDown = (
  evt: any,
  helperContextRef: any,
  selectedPiece: any,
  PIECES: React.MutableRefObject<Piece[]>
) => {
  const imgData = helperContextRef.current.getImageData(evt.x, evt.y, 1, 1);
  console.log(evt.x, evt.y);
  console.log(PIECES.current[0]);
  if (imgData.data[3] === 0) {
    return;
  }
  const clickedColor = `rgb(${imgData.data[0]},${imgData.data[1]},${imgData.data[2]})`;
  selectedPiece.current = getPressedPieceByColor(clickedColor, PIECES);

  if (selectedPiece.current !== null) {
    const index = PIECES.current.indexOf(selectedPiece.current);

    if (index > -1) {
      PIECES.current.splice(index, 1);
      PIECES.current.push(selectedPiece.current);
    }
    selectedPiece.current.offset = {
      x: evt.x - selectedPiece.current.x,
      y: evt.y - selectedPiece.current.y,
    };

    selectedPiece.current.correct = false;
  }
};

const onTouchStart = (
  evt: TouchEvent,
  helperContextRef: any,
  selectedPiece: any,
  PIECES: React.MutableRefObject<Piece[]>
) => {
  let loc = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
  onMouseDown(loc, helperContextRef, selectedPiece, PIECES);
};

const onMouseMove = (evt: any, selectedPiece: any) => {
  if (selectedPiece.current !== null) {
    selectedPiece.current.x = evt.x - selectedPiece.current.offset.x;
    selectedPiece.current.y = evt.y - selectedPiece.current.offset.y;
  }
};

const onTouchMove = (evt: any, selectedPiece: any) => {
  let loc = { x: evt.touches[0].clientX, y: evt.touches[0].clientY };
  onMouseMove(loc, selectedPiece);
};

const onMouseUp = (
  selectedPiece: any,
  PIECES: any,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (selectedPiece.current && selectedPiece.current.isClose()) {
    selectedPiece.current.snap();
    if (isComplete(PIECES.current)) {
      setTimeout(() => {
        completeApplauseAudio.play();
        setSuccess(true);
      }, 500);
    }
  }
  selectedPiece.current = null;
};

const onTouchEnd = (
  selectedPiece: any,
  PIECES: React.MutableRefObject<Piece[]>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  onMouseUp(selectedPiece, PIECES, setSuccess);
};

export const addEventListeners = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  helperContextRef: any,
  selectedPiece: any,
  PIECES: React.MutableRefObject<Piece[]>,
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (canvasRef.current) {
    canvasRef.current.addEventListener("mousedown", (e: MouseEvent) =>
      onMouseDown(e, helperContextRef, selectedPiece, PIECES)
    );
    canvasRef.current.addEventListener("mousemove", (e: MouseEvent) =>
      onMouseMove(e, selectedPiece)
    );
    canvasRef.current.addEventListener("mouseup", () =>
      onMouseUp(selectedPiece, PIECES, setSuccess)
    );

    canvasRef.current.addEventListener("touchstart", (e: TouchEvent) =>
      onTouchStart(e, helperContextRef, selectedPiece, PIECES)
    );
    canvasRef.current.addEventListener("touchmove", (e: TouchEvent) =>
      onTouchMove(e, selectedPiece)
    );
    canvasRef.current.addEventListener("touchend", () =>
      onTouchEnd(selectedPiece, PIECES, setSuccess)
    );
  }
};
