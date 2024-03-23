import { ICanvas } from './../interface/Canvas'
import { Tsize } from './../type/Size'

export class CanvasClass {
    public settings: ICanvas = {
        width: 50,
        height: 50,
        sizePix: 15,
        emerges: [3],
        survives: [2, 3],
        bgColor: "rgb(255, 255, 255)",
        timeUp: 1
    }
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    private isMove: boolean = false
    private isRun: boolean = false

    private dataPix: number[] = new Array(this.settings.width * this.settings.height).fill(0)
    private livePix: number[] = []
    private deadPix: number[] = []

    private interval: number = 0

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false
        this.ctx.imageSmoothingQuality = "high"
        this.init()
    }

    setMouseEvents(state: boolean):void {
        if(state) {
            this.canvas.addEventListener('mousemove', mouse => {
                if (this.isMove && !this.isRun) {
                    if (mouse.which == 1)
                        this.drawPix(mouse.offsetX, mouse.offsetY)
                    else {
                        this.delete({ x: mouse.offsetX, y: mouse.offsetY })
                        this.drawMesh()
                    }
    
                }
    
            })
            this.canvas.addEventListener('mousedown', () => this.isMove = true)
            this.canvas.addEventListener('mouseup', () => this.isMove = false)
            this.canvas.addEventListener('click', mouse => this.drawPix(mouse.offsetX, mouse.offsetY))
    
        }else {
            this.canvas.addEventListener('mousemove', ()=>{})
            this.canvas.addEventListener('mousedown', ()=>{})
            this.canvas.addEventListener('mouseup', ()=>{})
            this.canvas.addEventListener('click', ()=>{})
    
        }
    }

    private init(): void {
        this.setMouseEvents(true)

        this.setBgColor(this.settings.bgColor)
        this.updateSizeCanvas()
        this.drawMesh()
    }

    private drawPix(x: number, y: number): void {
        this.ctx.beginPath()
        this.ctx.fillRect(x - x % this.settings.sizePix, y - y % this.settings.sizePix, this.settings.sizePix, this.settings.sizePix)
        this.ctx.stroke()

        const pxId = (x - x % this.settings.sizePix) / this.settings.sizePix + (((y - y % this.settings.sizePix)) / this.settings.sizePix) * this.settings.width
        this.dataPix[pxId] = 2

    }

    private setBgColor(rgb: string) {
        this.canvas.style.backgroundColor = rgb
    }

    private delete(s: Tsize): void {
        this.ctx.clearRect(s.x - s.x % this.settings.sizePix, s.y - s.y % this.settings.sizePix, s.width || this.settings.sizePix, s.height || this.settings.sizePix)

        if (s.width == null && s.height == null) {

            const pxId = (s.x - s.x % this.settings.sizePix) / this.settings.sizePix + (((s.y - s.y % this.settings.sizePix)) / this.settings.sizePix) * this.settings.width
            this.dataPix[pxId] = 0
        }

    }

    public setSizeCanvas(width: number, height: number): void {
        this.settings.width = width
        this.settings.height = height
        this.updateSizeCanvas()
    }

    public setSizePix(sizePix: number): void {
        this.settings.sizePix = sizePix
        this.updateSizeCanvas()
    }

    private updateSizeCanvas(): void {
        this.canvas.width = this.settings.width * this.settings.sizePix
        this.canvas.height = this.settings.height * this.settings.sizePix

        this.dataPix = new Array(this.settings.width * this.settings.height).fill(0)

    }

    private recalculation(): void {

        console.log(this.dataPix.filter(el=>el));
        
        for (let live = this.livePix.length; live--;) {
            this.dataPix[this.livePix[live]] = 1
        }
        for (let dead = this.deadPix.length; dead--;) {
            this.dataPix[this.deadPix[dead]] = 0
        }

        this.deadPix = new Array(this.settings.width * this.settings.height).fill(0)
        this.livePix = []

    }

    private check(): void {
        for (let i = this.dataPix.length; i--;) {
            let neighbors = 0
            if (this.dataPix[i + 1] && i % this.settings.width != 0) neighbors++
            if (this.dataPix[i - 1] && i % this.settings.width != 0) neighbors++
            if (this.dataPix[i + this.settings.width]) neighbors++
            if (this.dataPix[i + this.settings.width + 1]) neighbors++
            if (this.dataPix[i + this.settings.width - 1]) neighbors++
            if (this.dataPix[i - this.settings.width]) neighbors++
            if (this.dataPix[i - this.settings.width - 1]) neighbors++
            if (this.dataPix[i - this.settings.width + 1]) neighbors++

            if (!this.settings.emerges.indexOf(neighbors) && this.dataPix[i] == 0)
                this.livePix.push(i)

            else if (this.settings.survives.indexOf(neighbors) == -1 && this.dataPix[i] > 0)
                this.deadPix.push(i)

        }
        this.recalculation()
        this.delete({ x: 0, y: 0, width: this.settings.width * this.settings.sizePix, height: this.settings.height * this.settings.sizePix })
        this.renderCanvas()
    }



    private drawMesh(): void {
        this.ctx.beginPath()
        this.ctx.lineWidth = 2
        this.ctx.strokeStyle = "rgb(0, 0, 0)"
        for (let x = this.settings.sizePix; x < this.canvas.width; x += this.settings.sizePix) {
            this.ctx.moveTo(x, 0)
            this.ctx.lineTo(x, this.canvas.height)
        }
        for (let y = this.settings.sizePix; y < this.canvas.height; y += this.settings.sizePix) {
            this.ctx.moveTo(0, y)
            this.ctx.lineTo(this.canvas.width, y)
        }
        this.ctx.stroke();
    }

    private renderCanvas(): void {
        for (let i = this.dataPix.length; i--;) {

            if (this.dataPix[i])
                this.drawPix(i % this.settings.width * this.settings.sizePix, Math.floor(i / this.settings.width) * this.settings.sizePix)
        }
    }


    
    public restart(IsSaveData: boolean): void {

        this.isRun = false
        clearInterval(this.interval)
        this.delete({ x: 0, y: 0, width: this.canvas.width, height: this.canvas.height })
        this.drawMesh()

        if (IsSaveData)
            this.renderCanvas()
        else
        {
            this.dataPix = new Array(this.settings.width * this.settings.height).fill(0)
        }


    }

    public start(): void {
        this.isRun = true
        this.setMoveSpeed(this.settings.timeUp)
    }

    public setMoveSpeed(speed:number):void {
        this.settings.timeUp = speed
        clearInterval(this.interval)
        this.interval = setInterval(() => {
            this.check()
        }, 1000 / this.settings.timeUp)
    }


    


}

