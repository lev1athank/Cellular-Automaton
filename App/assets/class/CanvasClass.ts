import { IPrintData } from '../interface/GameState.interface'
import { settings } from '../../../src/store/settingCanvas/settingCanvas'
import { TlistPix, Tsize } from './../type/Size'

export class CanvasClass {

    private liveCountEl: HTMLElement
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    private isMove: boolean = false


    private dataPix: number[] = new Array(settings.width * settings.height).fill(0)
    private livePix: TlistPix[] = []
    private deadPix: TlistPix[] = []
    private liveCount: number = 0
    private activePrint: IPrintData | null = null


    private interval: number = 0

    constructor(canvas: HTMLCanvasElement, countLiveEl: HTMLElement) {
        this.canvas = canvas
        this.liveCountEl = countLiveEl

        this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false
        this.ctx.imageSmoothingQuality = "high"
        this.init()
    }

    private setMouseEvents(): void {
        this.canvas.addEventListener('mousemove', mouse => {
            if (settings.isRun) return
            if (!settings.isPrint && this.isMove) {
                if (mouse.which == 1)
                    this.drawPix(mouse.offsetX, mouse.offsetY, 0, true)
                else {
                    this.delete({ x: mouse.offsetX, y: mouse.offsetY })
                    this.drawMesh()
                }
            }
            else if (settings.isPrint) {
                this.previewPrint(mouse.offsetX, mouse.offsetY)
            }

        })
        this.canvas.addEventListener('mousedown', () => this.isMove = true)
        this.canvas.addEventListener('mouseup', () => this.isMove = false)
        this.canvas.addEventListener('mouseleave', () => {
            if (settings.isRun) return
            this.delete({ x: 0, y: 0, width: this.canvas.width, height: this.canvas.height })
            this.drawMesh()
            this.renderCanvas()



        });

        this.canvas.addEventListener('click', mouse => {
            if (settings.isRun) return

            if (settings.isPrint)
                this.drawPrint(mouse.offsetX, mouse.offsetY)
            else
                this.drawPix(mouse.offsetX, mouse.offsetY, 0, true)
        })
    }

    public setPrintMode = (isPrint: boolean, activePrint: IPrintData | null) => {
        settings.isPrint = isPrint
        this.activePrint = activePrint
    }

    private init(): void {
        this.setMouseEvents()

        this.setBgColor(settings.bgColor)
        this.updateSizeCanvas()
        this.drawMesh()
    }

    private drawPix(x: number, y: number, neighbors: number, isSave?: boolean): void {


        this.ctx.beginPath()
        const rgb: string | undefined = settings.colorsPix.find(el => el.neighbors == neighbors)?.rgb

        this.ctx.fillStyle = rgb == undefined ? settings.colorsPix[0].rgb : rgb

        this.ctx.fillRect(x - x % settings.sizePix, y - y % settings.sizePix, settings.sizePix, settings.sizePix)
        this.ctx.stroke()

        if (isSave)
            this.dataPix[(x - x % settings.sizePix) / settings.sizePix + (((y - y % settings.sizePix)) / settings.sizePix) * settings.width] = 1

    }

    private previewPrint(x: number, y: number): void {

        this.delete({ x: 0, y: 0, width: this.canvas.width, height: this.canvas.height })
        this.drawMesh()
        this.renderCanvas()
        if (!this.activePrint) return
        for (let pixY = this.activePrint?.height; pixY--;)
            for (let pixX = this.activePrint?.width; pixX--;) {
                if (this.activePrint.print[pixX + pixY * this.activePrint.width]) {
                    this.drawPix(((x - x % settings.sizePix) + pixX * settings.sizePix), ((y - y % settings.sizePix) + pixY * settings.sizePix), 0, false)
                }
            }


    }

    private drawPrint(x: number, y: number): void {
        if (!this.activePrint) return
        for (let pixY = this.activePrint?.height; pixY--;)
            for (let pixX = this.activePrint?.width; pixX--;) {
                if (this.activePrint.print[pixX + pixY * this.activePrint.width]) {
                    this.drawPix(((x - x % settings.sizePix) + pixX * settings.sizePix), ((y - y % settings.sizePix) + pixY * settings.sizePix), 0, true)
                }
            }
    }

    private setBgColor(rgb: string) {
        this.canvas.style.backgroundColor = rgb
    }

    private delete(s: Tsize): void {
        this.ctx.clearRect(s.x - s.x % settings.sizePix, s.y - s.y % settings.sizePix, s.width || settings.sizePix, s.height || settings.sizePix)

        if (s.width == null && s.height == null) {

            const pxId = (s.x - s.x % settings.sizePix) / settings.sizePix + (((s.y - s.y % settings.sizePix)) / settings.sizePix) * settings.width
            this.dataPix[pxId] = 0
        }

    }

    public setSizeCanvas(width: number, height: number): void {
        settings.width = width
        settings.height = height
        this.updateSizeCanvas()
    }

    public setSizePix(sizePix: number): void {
        settings.sizePix = sizePix
        this.updateSizeCanvas()
        this.drawMesh()
    }
    public setFieldSize(size: { width?: number, height?: number }): void {
        settings.width = size.width || settings.width
        settings.height = size.height || settings.height
        this.updateSizeCanvas()
        this.drawMesh()
    }

    private updateSizeCanvas(): void {
        this.canvas.width = settings.width * settings.sizePix
        this.canvas.height = settings.height * settings.sizePix

        this.dataPix = new Array(settings.width * settings.height).fill(0)

    }

    private recalculation(): void {

        for (let live = this.livePix.length; live--;) {
            this.dataPix[this.livePix[live].id] = this.livePix[live].neighbors
        }
        for (let dead = this.deadPix.length; dead--;) {
            this.dataPix[this.deadPix[dead].id] = 0
        }

        this.deadPix = []
        this.livePix = []
    }

    private check(): void {

        for (let i = this.dataPix.length; i--;) {
            let neighbors = 0
            if (this.dataPix[i + 1] && (i % settings.width != 0 || settings.rules.noEdges)) neighbors++
            if (this.dataPix[i - 1] && (i % settings.width != 0 || settings.rules.noEdges)) neighbors++
            if (this.dataPix[i + settings.width]) neighbors++
            if (this.dataPix[i + settings.width + 1]) neighbors++
            if (this.dataPix[i + settings.width - 1]) neighbors++
            if (this.dataPix[i - settings.width]) neighbors++
            if (this.dataPix[i - settings.width - 1]) neighbors++
            if (this.dataPix[i - settings.width + 1]) neighbors++

            if (settings.emerges.indexOf(neighbors) !== -1 && this.dataPix[i] == 0)
                this.livePix.push({
                    id: i,
                    neighbors: neighbors == 0 ? -1 : neighbors,
                })
            else if (settings.survives.indexOf(neighbors) == -1 && this.dataPix[i] !== 0)
                this.deadPix.push({
                    id: i,
                    neighbors: neighbors,

                })
            else if (settings.survives.indexOf(neighbors) !== -1 && this.dataPix[i] !== 0) {
                console.log(i, neighbors);

                this.dataPix[i] = neighbors == 0 ? -1 : neighbors
            }

        }
        console.log(settings.colorsPix);
        
        this.dataPix.forEach(el => {

            if (el !== 0)
                console.log(el);
        }
        )

        this.recalculation()
        this.delete({ x: 0, y: 0, width: settings.width * settings.sizePix, height: settings.height * settings.sizePix })
        this.renderCanvas()
    }



    private drawMesh(): void {
        this.ctx.beginPath()
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = "rgb(0, 0, 0)"
        for (let x = settings.sizePix; x < this.canvas.width; x += settings.sizePix) {
            this.ctx.moveTo(x, 0)
            this.ctx.lineTo(x, this.canvas.height)
        }
        for (let y = settings.sizePix; y < this.canvas.height; y += settings.sizePix) {
            this.ctx.moveTo(0, y)
            this.ctx.lineTo(this.canvas.width, y)
        }
        this.ctx.stroke();
    }

    private renderCanvas(): void {
        for (let i = this.dataPix.length; i--;) {
            if (this.dataPix[i])
                this.drawPix(i % settings.width * settings.sizePix, Math.floor(i / settings.width) * settings.sizePix, this.dataPix[i], false)

        }
    }



    public restart(IsSaveData: boolean): void {

        settings.isRun = false
        clearInterval(this.interval)
        this.delete({ x: 0, y: 0, width: this.canvas.width, height: this.canvas.height })
        this.drawMesh()

        if (IsSaveData)
            this.renderCanvas()
        else {
            this.dataPix = new Array(settings.width * settings.height).fill(0)
            this.setLiveCount(0)

        }


    }

    private setLiveCount(count: number): void {
        count ? this.liveCount++ : this.liveCount = 0
        this.liveCountEl.innerText = "прошло жизней:" + this.liveCount.toString()
    }

    public start(): void {
        settings.isRun = true
        this.setMoveSpeed(settings.timeUp)
    }

    public setMoveSpeed(speed: number): void {
        settings.timeUp = speed
        if (!settings.isRun) return
        clearInterval(this.interval)
        this.interval = setInterval(() => {
            this.check()
            this.setLiveCount(1)
        }, 1000 / (settings.timeUp * (settings.rules.fastSpeed ? 2 : 1)))
    }

    private randomPixId(): number {
        const id: number = Math.floor(Math.random() * this.dataPix.length)

        if (this.dataPix[id] > 0)
            return this.randomPixId()
        else
            return id
    }

    public fill(percentage: number): void {
        this.delete({ x: 0, y: 0, width: settings.width * settings.sizePix, height: settings.height * settings.sizePix })
        this.dataPix = new Array(settings.width * settings.height).fill(0)

        const percent: number = Math.floor(this.dataPix.length / 100 * percentage)

        for (let count = percent; count--;) {
            this.dataPix[this.randomPixId()] = 1

        }
        this.renderCanvas()
        this.drawMesh()
    }


}

