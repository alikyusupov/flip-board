import {
  Component,
  ElementRef,
  DestroyRef,
  afterNextRender,
  viewChild,
  inject,
  input,
  computed,
  effect,
} from '@angular/core';

interface Letter {
  currentChar: string;
  targetChar: string;
  nextChar: string;
  isFlipping: boolean;
  flipStartTime: number;
  flipProgress: number;
  flipDuration: number;
  flipDirection: string;
}

interface FlapPalette {
  flapBg: string;
  flapBgLight: string;
  flapBgDark: string;
  text: string;
  divider: string;
  hinge: string;
  shadow: string;
}

export type FlapBoardTheme = 'dark' | 'light';
export type FlapBoardSize = 'sm' | 'md' | 'lg';

const DEFAULT_WORDS: string[] = [
  'TOKYO',
  'LONDON',
  'NEW YORK',
  'PARIS',
  'BERLIN',
  'AMSTERDAM',
  'DUBAI',
  'SINGAPORE',
  'SYDNEY',
  'ROME',
  'HONG KONG',
  'ISTANBUL',
];

const SIZE_MAX_WIDTH_PX: Record<FlapBoardSize, number> = {
  sm: 480,
  md: 720,
  lg: 960,
};

const DARK_PALETTE: FlapPalette = {
  flapBg: '#161616',
  flapBgLight: '#232323',
  flapBgDark: '#0d0d0d',
  text: '#e9e6dc',
  divider: '#050505',
  hinge: '#3a3a3a',
  shadow: 'rgba(0,0,0,0.6)',
};

const LIGHT_PALETTE: FlapPalette = {
  flapBg: '#e4e4e1',
  flapBgLight: '#f4f4f2',
  flapBgDark: '#cfcfcb',
  text: '#161616',
  divider: '#b8b8b3',
  hinge: '#a5a5a0',
  shadow: 'rgba(0,0,0,0.2)',
};

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'flip-board',
  templateUrl: './flip-board.html',
  styles: [],
})
export class FlapBoardComponent {
  readonly theme = input<FlapBoardTheme>('dark');
  readonly size = input<FlapBoardSize>('sm');
  readonly words = input<string[]>(DEFAULT_WORDS);
  readonly loop = input<boolean>(false);

  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('splitCanvas');
  private readonly containerRef = viewChild.required<ElementRef<HTMLElement>>('boardContainer');
  private readonly destroyRef = inject(DestroyRef);

  private readonly effectiveWords = computed(() =>
    this.words().length > 0 ? this.words() : DEFAULT_WORDS
  );

  private readonly columns = computed(() =>
    Math.max(1, ...this.effectiveWords().map((word) => word.length))
  );

  private readonly palette = computed<FlapPalette>(() =>
    this.theme() === 'light' ? LIGHT_PALETTE : DARK_PALETTE
  );

  readonly maxWidthPx = computed(() => SIZE_MAX_WIDTH_PX[this.size()]);

  private ctx!: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private dpr = 1;

  private readonly GAP = 6;
  private readonly CELL_ASPECT = 100 / 64;

  private WIDTH = 900;
  private HEIGHT = 140;
  private CELL_WIDTH = 64;
  private CELL_HEIGHT = 100;

  private readonly FLAP_RADIUS = 4;

  private readonly FLIP_DURATION_MIN = 400;
  private readonly FLIP_DURATION_MAX = 800;
  private readonly LETTER_CHANGE_INTERVAL = 2200;
  private readonly BLANK_HOLD_MS = 400;

  private board!: Letter[];
  private currentDestIndex = 0;
  private lastWordChangeTime = 0;

  constructor() {
    afterNextRender(() => {
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.initializeCanvas();
      this.resetBoard();
      this.startAnimation();

      this.resizeObserver = new ResizeObserver(() => this.setupCanvasSize());
      this.resizeObserver.observe(this.containerRef().nativeElement);
    });

    effect(() => {
      this.columns();
      if (!this.ctx) return;
      this.resetBoard();
      this.setupCanvasSize();
    });

    this.destroyRef.onDestroy(() => {
      if (this.animationId !== null) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      this.resizeObserver?.disconnect();
      this.resizeObserver = null;
    });
  }

  onCanvasClick(): void {
    if (!this.loop()) return;

    const words = this.effectiveWords();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const now = performance.now();
    this.setTargetWord(randomWord, now);
    this.lastWordChangeTime = now;
  }

  private resetBoard(): void {
    this.currentDestIndex = 0;
    this.board = this.createBoard(' ');
    this.lastWordChangeTime = performance.now();

    setTimeout(() => {
      const now = performance.now();
      this.setTargetWord(this.effectiveWords()[0], now);
      this.lastWordChangeTime = now;
    }, this.BLANK_HOLD_MS);
  }

  private initializeCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.setupRoundRect();
    this.setupCanvasSize();
  }

  private setupCanvasSize(): void {
    const container = this.containerRef().nativeElement;
    const canvas = this.canvasRef().nativeElement;
    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    const columns = this.columns();
    this.WIDTH = containerWidth;
    this.CELL_WIDTH = (this.WIDTH - (columns - 1) * this.GAP) / columns;
    this.CELL_HEIGHT = this.CELL_WIDTH * this.CELL_ASPECT;
    this.HEIGHT = this.CELL_HEIGHT;

    canvas.width = this.WIDTH * this.dpr;
    canvas.height = this.HEIGHT * this.dpr;
    canvas.style.width = `${this.WIDTH}px`;
    canvas.style.height = `${this.HEIGHT}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private setupRoundRect(): void {
    if (!(CanvasRenderingContext2D.prototype as any).roundRect) {
      (CanvasRenderingContext2D.prototype as any).roundRect = function (
        x: number,
        y: number,
        w: number,
        h: number,
        r: number
      ) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.moveTo(x + r, y);
        this.lineTo(x + w - r, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r);
        this.lineTo(x + w, y + h - r);
        this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this.lineTo(x + r, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r);
        this.lineTo(x, y + r);
        this.quadraticCurveTo(x, y, x + r, y);
        this.closePath();
        return this;
      };
    }
  }

  private createBoard(initialWord: string): Letter[] {
    const columns = this.columns();
    const chars = initialWord.padEnd(columns, ' ').split('');
    return chars.slice(0, columns).map((c) => this.createLetter(c));
  }

  private createLetter(initialChar: string): Letter {
    return {
      currentChar: initialChar,
      targetChar: initialChar,
      nextChar: initialChar,
      isFlipping: false,
      flipStartTime: 0,
      flipProgress: 0,
      flipDuration: this.randomFlipDuration(),
      flipDirection: 'down',
    };
  }

  private randomFlipDuration(): number {
    return (
      this.FLIP_DURATION_MIN +
      Math.random() * (this.FLIP_DURATION_MAX - this.FLIP_DURATION_MIN)
    );
  }

  private setTargetWord(word: string, currentTimestamp: number): void {
    const columns = this.columns();
    const chars = word.padEnd(columns, ' ').split('');

    for (let i = 0; i < columns; i++) {
      const targetChar = chars[i];
      const letter = this.board[i];

      if (letter.currentChar !== targetChar || letter.isFlipping) {
        const staggerDelay = Math.random() * 150;
        setTimeout(() => {
          this.startFlip(letter, targetChar, performance.now());
        }, staggerDelay);
      }
    }
  }

  private startFlip(
    letter: Letter,
    newChar: string,
    currentTimestamp: number
  ): void {
    if (letter.isFlipping) {
      letter.targetChar = newChar;
      letter.nextChar = newChar;
      return;
    }

    if (newChar === letter.currentChar) return;

    letter.targetChar = newChar;
    letter.nextChar = newChar;
    letter.isFlipping = true;
    letter.flipStartTime = currentTimestamp;
    letter.flipProgress = 0;
    letter.flipDuration = this.randomFlipDuration();
    letter.flipDirection = 'down';
  }

  private updateLetter(letter: Letter, currentTimestamp: number): void {
    if (!letter.isFlipping) return;

    const elapsed = currentTimestamp - letter.flipStartTime;
    const progress = Math.min(elapsed / letter.flipDuration, 1.0);

    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    letter.flipProgress = eased;

    if (progress >= 1.0) {
      letter.currentChar = letter.targetChar;
      letter.isFlipping = false;
      letter.flipProgress = 0;
      letter.nextChar = letter.currentChar;
    }
  }

  private autoChangeWord(now: number): void {
    if (!this.loop()) return;

    if (now - this.lastWordChangeTime >= this.LETTER_CHANGE_INTERVAL) {
      const words = this.effectiveWords();
      this.currentDestIndex = (this.currentDestIndex + 1) % words.length;
      this.setTargetWord(words[this.currentDestIndex], now);
      this.lastWordChangeTime = now;
    }
  }

  private startAnimation(): void {
    const animate = (timestamp: number) => {
      if (this.animationId === null) return;

      for (const letter of this.board) {
        this.updateLetter(letter, timestamp);
      }

      this.autoChangeWord(timestamp);
      this.draw();

      this.animationId = requestAnimationFrame(animate);
    };

    this.animationId = requestAnimationFrame(animate);
  }

  private draw(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.drawFlapCells(ctx, 0, 0);
  }

  private drawFlapCells(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number
  ): void {
    for (let i = 0; i < this.columns(); i++) {
      const cellX = startX + i * (this.CELL_WIDTH + this.GAP);
      this.drawFlapCell(ctx, this.board[i], cellX, startY);
    }
  }

  private drawFlapCell(
    ctx: CanvasRenderingContext2D,
    letter: Letter,
    x: number,
    y: number
  ): void {
    const w = this.CELL_WIDTH;
    const h = this.CELL_HEIGHT;
    const palette = this.palette();

    ctx.save();
    ctx.shadowColor = palette.shadow;
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();
    (ctx as any).roundRect(x, y, w, h, this.FLAP_RADIUS);
    ctx.clip();

    ctx.fillStyle = palette.flapBg;
    ctx.fillRect(x, y, w, h);

    this.drawHinge(ctx, x, y, w, h, palette);

    if (!letter.isFlipping) {
      this.drawCharInCell(ctx, letter.currentChar, x, y, w, h, palette);
    } else {
      this.drawFlippingAnimation(ctx, letter, x, y, w, h, palette);
    }

    ctx.restore();
    this.drawCellBorder(ctx, x, y, w, h, palette);
  }

  private drawHinge(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    palette: FlapPalette
  ): void {
    ctx.save();
    ctx.strokeStyle = palette.divider;
    ctx.lineWidth = Math.max(1.5, w * 0.035);
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y + 2);
    ctx.lineTo(x + w / 2, y + h - 2);
    ctx.stroke();

    ctx.fillStyle = palette.hinge;
    const dotSpacing = h / 6;
    for (let dotY = y + dotSpacing; dotY < y + h - dotSpacing / 2; dotY += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x + w / 2, dotY, Math.max(1, w * 0.03), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  private drawFlippingAnimation(
    ctx: CanvasRenderingContext2D,
    letter: Letter,
    x: number,
    y: number,
    w: number,
    h: number,
    palette: FlapPalette
  ): void {
    const progress = letter.flipProgress;
    const halfH = h / 2;

    let topScaleY: number, bottomScaleY: number;
    let topChar: string, bottomChar: string;

    if (progress <= 0.5) {
      const t = progress / 0.5;
      topScaleY = 1 - t;
      bottomScaleY = 0;
      topChar = letter.currentChar;
      bottomChar = letter.currentChar;
    } else {
      const t = (progress - 0.5) / 0.5;
      topScaleY = 0;
      bottomScaleY = t;
      topChar = letter.nextChar;
      bottomChar = letter.nextChar;
    }

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, halfH);
    ctx.clip();
    const topCenterY = y + halfH / 2;
    ctx.translate(x + w / 2, topCenterY);
    ctx.scale(1, topScaleY);
    ctx.translate(-(x + w / 2), -topCenterY);
    this.drawCharInCell(ctx, topChar, x, y, w, h, palette);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y + halfH, w, halfH);
    ctx.clip();
    const bottomCenterY = y + halfH + halfH / 2;
    ctx.translate(x + w / 2, bottomCenterY);
    ctx.scale(1, bottomScaleY);
    ctx.translate(-(x + w / 2), -bottomCenterY);
    this.drawCharInCell(ctx, bottomChar, x, y, w, h, palette);
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = palette.divider;
    ctx.lineWidth = Math.max(1.5, w * 0.035);
    ctx.beginPath();
    ctx.moveTo(x + 2, y + halfH);
    ctx.lineTo(x + w - 2, y + halfH);
    ctx.stroke();
    ctx.restore();
  }

  private drawCharInCell(
    ctx: CanvasRenderingContext2D,
    char: string,
    x: number,
    y: number,
    w: number,
    h: number,
    palette: FlapPalette
  ): void {
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, palette.flapBgLight);
    grad.addColorStop(0.5, palette.flapBg);
    grad.addColorStop(1, palette.flapBgDark);
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);

    ctx.save();
    ctx.fillStyle = palette.text;
    ctx.font = `bold ${Math.round(w * 0.78)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const displayChar = char === ' ' ? '' : char;
    ctx.fillText(displayChar, x + w / 2, y + h / 2 - 1);
    ctx.restore();
  }

  private drawCellBorder(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    palette: FlapPalette
  ): void {
    ctx.save();
    ctx.strokeStyle = palette.divider;
    ctx.lineWidth = Math.max(1, w * 0.03);
    ctx.beginPath();
    (ctx as any).roundRect(x, y, w, h, this.FLAP_RADIUS);
    ctx.stroke();
    ctx.restore();
  }
}
