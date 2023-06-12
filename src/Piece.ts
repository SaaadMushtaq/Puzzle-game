const successAudio = new Audio("/audio/success.wav");
successAudio.volume = 0.2;

const distance = (p1: any, p2: any) => {
  return Math.sqrt(
    (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
  );
};

export default class Piece {
  id: number;
  rowIndex: number;
  colIndex: number;
  x: number;
  y: number;
  xCorrect: number;
  yCorrect: number;
  width: number;
  height: number;
  correct: boolean;
  top: any;
  left: any;
  right: any;
  bottom: any;
  color: string;

  constructor(
    id: number,
    rowIndex: number,
    colIndex: number,
    sizeRef: any,
    color: string
  ) {
    this.id = id;
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.x = sizeRef.x + (sizeRef.width * this.colIndex) / sizeRef.columns;
    this.y = sizeRef.y + (sizeRef.height * this.rowIndex) / sizeRef.rows;
    this.width = sizeRef.width / sizeRef.columns;
    this.height = sizeRef.height / sizeRef.rows;
    this.xCorrect = this.x;
    this.yCorrect = this.y;
    this.correct = true;
    this.top = null;
    this.left = null;
    this.right = null;
    this.bottom = null;
    this.color = color;
  }

  draw(context: any, image: any, sizeRef: any, useCam = true) {
    context.beginPath();

    const sz = Math.min(this.width, this.height);
    const neck = 0.05 * sz;
    const tabWidth = 0.3 * sz;
    const tabHeight = 0.3 * sz;

    //from top left
    context.moveTo(this.x, this.y);
    //to top right
    if (this.top) {
      context.lineTo(this.x + this.width * Math.abs(this.top) - neck, this.y);

      context.bezierCurveTo(
        this.x + this.width * Math.abs(this.top) - neck,
        this.y - tabHeight * Math.sign(this.top) * 0.2,

        this.x + this.width * Math.abs(this.top) - tabWidth,
        this.y - tabHeight * Math.sign(this.top),

        this.x + this.width * Math.abs(this.top),
        this.y - tabHeight * Math.sign(this.top)
      );

      context.bezierCurveTo(
        this.x + this.width * Math.abs(this.top) + tabWidth,
        this.y - tabHeight * Math.sign(this.top),

        this.x + this.width * Math.abs(this.top) + neck,
        this.y - tabHeight * Math.sign(this.top) * 0.2,

        this.x + this.width * Math.abs(this.top) + neck,
        this.y
      );
    }
    context.lineTo(this.x + this.width, this.y);
    //to bottom right
    if (this.right) {
      context.lineTo(
        this.x + this.width,
        this.y + this.height * Math.abs(this.right) - neck
      );
      context.bezierCurveTo(
        this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
        this.y + this.height * Math.abs(this.right) - neck,

        this.x + this.width - tabHeight * Math.sign(this.right),
        this.y + this.height * Math.abs(this.right) - tabWidth,

        this.x + this.width - tabHeight * Math.sign(this.right),
        this.y + this.height * Math.abs(this.right)
      );
      context.bezierCurveTo(
        this.x + this.width - tabHeight * Math.sign(this.right),
        this.y + this.height * Math.abs(this.right) + tabWidth,

        this.x + this.width - tabHeight * Math.sign(this.right) * 0.2,
        this.y + this.height * Math.abs(this.right) + neck,

        this.x + this.width,
        this.y + this.height * Math.abs(this.right) + neck
      );
    }
    context.lineTo(this.x + this.width, this.y + this.height);
    //to bottom left
    if (this.bottom) {
      context.lineTo(
        this.x + this.width * Math.abs(this.bottom) + neck,
        this.y + this.height
      );
      context.bezierCurveTo(
        this.x + this.width * Math.abs(this.bottom) + neck,
        this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,

        this.x + this.width * Math.abs(this.bottom) + tabWidth,
        this.y + this.height + tabHeight * Math.sign(this.bottom),

        this.x + this.width * Math.abs(this.bottom),
        this.y + this.height + tabHeight * Math.sign(this.bottom)
      );
      context.bezierCurveTo(
        this.x + this.width * Math.abs(this.bottom) - tabWidth,
        this.y + this.height + tabHeight * Math.sign(this.bottom),

        this.x + this.width * Math.abs(this.bottom) - neck,
        this.y + this.height + tabHeight * Math.sign(this.bottom) * 0.2,

        this.x + this.width * Math.abs(this.bottom) - neck,
        this.y + this.height
      );
    }
    context.lineTo(this.x, this.y + this.height);
    //to top left
    if (this.left) {
      context.lineTo(this.x, this.y + this.height * Math.abs(this.left) + neck);
      context.bezierCurveTo(
        this.x + tabHeight * Math.sign(this.left) * 0.2,
        this.y + this.height * Math.abs(this.left) + neck,

        this.x + tabHeight * Math.sign(this.left),
        this.y + this.height * Math.abs(this.left) + tabWidth,

        this.x + tabHeight * Math.sign(this.left),
        this.y + this.height * Math.abs(this.left)
      );
      context.bezierCurveTo(
        this.x + tabHeight * Math.sign(this.left),
        this.y + this.height * Math.abs(this.left) - tabWidth,

        this.x + tabHeight * Math.sign(this.left) * 0.2,
        this.y + this.height * Math.abs(this.left) - neck,

        this.x,
        this.y + this.height * Math.abs(this.left) - neck
      );
    }
    context.lineTo(this.x, this.y);

    context.save();
    context.clip();

    const scaledTabHeight =
      Math.min(image.width / sizeRef.columns, image.height / sizeRef.rows) *
      (tabHeight / sz);

    if (useCam) {
      context.drawImage(
        image,
        (this.colIndex * image.width) / sizeRef.columns - scaledTabHeight,
        (this.rowIndex * image.height) / sizeRef.rows - scaledTabHeight,
        image.width / sizeRef.columns + scaledTabHeight * 2,
        image.height / sizeRef.rows + scaledTabHeight * 2,
        this.x - tabHeight,
        this.y - tabHeight,
        this.width + tabHeight * 2,
        this.height + tabHeight * 2
      );
    } else {
      context.fillStyle = this.color;
      context.fillRect(
        this.x - tabHeight,
        this.y - tabHeight,
        this.width + tabHeight * 2,
        this.height * tabHeight * 2
      );
    }

    context.restore();

    context.stroke();
  }

  isClose() {
    if (
      distance(
        { x: this.x, y: this.y },
        { x: this.xCorrect, y: this.yCorrect }
      ) <
      this.width / 3
    ) {
      return true;
    }
    return false;
  }
  snap() {
    this.x = this.xCorrect;
    this.y = this.yCorrect;
    this.correct = true;
    successAudio.play();
  }
}
