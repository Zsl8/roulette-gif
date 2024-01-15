import { createCanvas, loadImage } from 'canvas'
import GIFEncoder from 'gifencoder'
import { buffer } from 'node:stream/consumers'
import { WheelInterface, CenterInterface, CircleInterface, FullFrameInterface, CreateGifInterface, ImaesInterface } from '../interfaces'
import { getRandomNumber } from '../utils/functions';

class Wheel {
    defaultAngle: any

    async createGif({
        slots,
        stream,
        wheelStroke,
        slotStroke,
        imageStroke,
        text,
        arrow,
        winnerSlotColor
    }: CreateGifInterface) {
        const encoder = new GIFEncoder(420, 420);
        const encoderStream = encoder.createReadStream();

        encoder.start()
        encoder.setRepeat(-1)
        encoder.setDelay(33)
        encoder.setQuality(10)
        encoder.setTransparent(0)

        let randomFrames = getRandomNumber(100, 100000)
        let lastData: any = ''

        slots = await this.drawImages({ slots, imageStroke })

        for (var i = randomFrames; i < randomFrames + 400; i++) {
            let frame = i * 3

            if (i - randomFrames < 200) {
                if (i / 6 === Number((i / 6).toFixed(0))) {
                    let { ctx, buffer, winner }: any = await this.drawFullFrame({ frame, slots, wheelStroke, slotStroke, text, arrow, winnerSlotColor })

                    encoder.setDelay(50)
                    encoder.addFrame(ctx);

                    lastData = { winner, lastFrame: buffer }
                }
            } else if (i - randomFrames < 230) {
                if (i / 5 === Number((i / 5).toFixed(0))) {
                    let { ctx, buffer, winner }: any = await this.drawFullFrame({ frame, slots, wheelStroke, slotStroke, text, arrow, winnerSlotColor })

                    encoder.setDelay(40)
                    encoder.addFrame(ctx);

                    lastData = { winner, lastFrame: buffer }
                }
            } else if (i - randomFrames < 270) {
                if (i / 4 === Number((i / 4).toFixed(0))) {
                    let { ctx, buffer, winner }: any = await this.drawFullFrame({ frame, slots, wheelStroke, slotStroke, text, arrow, winnerSlotColor })

                    encoder.setDelay(40)
                    encoder.addFrame(ctx);

                    lastData = { winner, lastFrame: buffer }
                }
            } else if (i - randomFrames < 300) {
                if (i / 3 === Number((i / 3).toFixed(0))) {
                    let { ctx, buffer, winner }: any = await this.drawFullFrame({ frame, slots, wheelStroke, slotStroke, text, arrow, winnerSlotColor })

                    encoder.setDelay(40)
                    encoder.addFrame(ctx);

                    lastData = { winner, lastFrame: buffer }
                }
            } else if (i - randomFrames < 350) {
                if (Boolean(i % 2)) {
                    let { ctx, buffer, winner }: any = await this.drawFullFrame({ frame, slots, wheelStroke, slotStroke, text, arrow, winnerSlotColor })

                    encoder.addFrame(ctx);

                    lastData = { winner, lastFrame: buffer }
                }
            } else {
                let { ctx, buffer, winner }: any = await this.drawFullFrame({ frame, slots, wheelStroke, slotStroke, text, arrow, winnerSlotColor })

                encoder.addFrame(ctx);

                lastData = { winner, lastFrame: buffer }
            }
        }

        await encoder.finish();
        return stream ?
            {
                stream: encoderStream,
                winner: lastData.winner,
                lastFrame: lastData.lastFrame
            }
            :
            {
                buffer: await buffer(encoderStream),
                winner: lastData.winner,
                lastFrame: lastData.lastFrame
            }
    }

    private async drawFullFrame({
        frame,
        slots,
        wheelStroke,
        slotStroke,
        text,
        arrow,
        winnerSlotColor
    }: FullFrameInterface) {
        let { buffer: wheel, winner }: any = this.drawWheel({ frame, slots, wheelStroke, slotStroke, text, winnerSlotColor })
        let { canvas, ctx }: any = await this.drawCenter({ wheel, winner, arrow })

        return {
            buffer: canvas.toBuffer(),
            ctx,
            winner
        }
    }

    private drawWheel({ frame, slots, wheelStroke, slotStroke, text, winnerSlotColor }: WheelInterface) {
        const canvas = createCanvas(420, 420);
        const ctx = canvas.getContext('2d');

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 180;
        const winningSlotIndex = Math.floor((frame / (radius * 4 / slots.length))) % slots.length;

        const winningSlot = slots[winningSlotIndex];

        ctx.translate(centerX, centerY);
        ctx.rotate(-frame * Math.PI / (radius * 2));
        ctx.translate(-centerX, -centerY);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

        if (wheelStroke) {
            ctx.lineWidth = wheelStroke.width;
            ctx.strokeStyle = wheelStroke.color;
            ctx.stroke();
        }

        const numSlots = slots.length;
        const slotAngle = (Math.PI * 2) / numSlots;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < numSlots; i++) {
            let angle = i * slotAngle;
            let slotWidth = slotAngle;

            const startX = centerX + radius * Math.cos(angle);
            const startY = centerY + radius * Math.sin(angle);

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + slotWidth);
            ctx.closePath();

            if (winnerSlotColor && winningSlotIndex === i) {
                ctx.fillStyle = winnerSlotColor
            } else {
                if (slots[i].color !== undefined) {
                    ctx.fillStyle = slots[i].color
                } else {
                    ctx.fillStyle = i % 2 === 0 ? '#9e94fd' : '#867FD4'
                }
            }

            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(startX, startY);

            if (slotStroke) {
                ctx.lineWidth = i === 0 ? slotStroke.width + 1 : slotStroke.width;
                ctx.strokeStyle = slotStroke.color;
                ctx.stroke();
            }

            let nameToDisplay = slots[i].username;
            let numberToDisplay = slots[i].number

            if (!nameToDisplay) throw new Error('Slot name is required')

            nameToDisplay = nameToDisplay.length > 7 ? nameToDisplay.slice(0, 6) + '..' : nameToDisplay

            let textWidth = ctx.measureText(nameToDisplay).width;
            let slotRadius = radius;

            if (text) {
                ctx.fillStyle = text.color
                ctx.font = `bold ${text.size}px Arial`;
            } else {
                ctx.fillStyle = 'white'
                ctx.font = `bold 14px Arial`;
            }

            const textAngle = angle + slotWidth / 2;

            const slotCenterX = centerX + (slotRadius * 0.85) * Math.cos(textAngle);
            const slotCenterY = centerY + (slotRadius * 0.85) * Math.sin(textAngle);

            ctx.save();
            ctx.translate(slotCenterX, slotCenterY);
            ctx.rotate(textAngle);
            ctx.fillText(numberToDisplay ? numberToDisplay + ' - ' + nameToDisplay : nameToDisplay, -20, 0);
            ctx.restore();
        }

        return {
            buffer: canvas.toBuffer(),
            winner: winningSlot
        }
    }

    private async drawImages({ slots, imageStroke }: ImaesInterface) {
        this.defaultAngle = await loadImage('https://github.com/Zsl8/roulette-gif/blob/main/images/arrow.png?raw=true')
        for (const slot of slots) {
            if (slot.image) {
                try {
                    let image: any = await this.drawCircle({
                        image: slot.image,
                        stroke: imageStroke?.color,
                        weight: imageStroke?.width
                    })

                    slot.ctxImage = image
                } catch (err) {

                }
            }
        }

        return slots
    }

    private async drawCenter({ wheel, arrow, winner }: CenterInterface) {
        const canvas = createCanvas(420, 420);
        const ctx = canvas.getContext('2d')

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        let angle;

        if (arrow) {
            try {
                angle = await loadImage(arrow)
            } catch (err) {
                angle = this.defaultAngle
            }
        } else {
            angle = this.defaultAngle
        }

        let background = await loadImage(wheel)
        ctx.drawImage(background, 0, 0);
        ctx.drawImage(angle, canvas.width - 57, centerY - 30 / 2, 30, 30);

        if (winner.ctxImage) {
            try {
                const imageSize = 100;
                const imageX = centerX - imageSize / 2;
                const imageY = centerY - imageSize / 2;
                ctx.drawImage(winner.ctxImage, imageX, imageY, imageSize, imageSize);
            } catch (err) {
                throw err
            }
        }

        return { canvas, ctx }
    }

    private async drawCircle({ image, stroke, fill, weight: width }: CircleInterface) {
        return new Promise(async (resolve, reject) => {
            try {
                let canvas = createCanvas(1024, 1024);
                let ctx = canvas.getContext("2d");

                let weight;

                if (width) {
                    weight = width * 8
                } else {
                    weight = 40
                }

                let x: any, y: any, w: any, h: any;
                x = y = weight;

                w = canvas.width - weight * 2;
                h = canvas.height - weight * 2;
                ctx.lineWidth = weight * 2;

                if (stroke) {
                    ctx.strokeStyle = stroke;
                }

                if (fill) {
                    ctx.fillStyle = fill;
                }

                ctx.beginPath();
                ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2, true);
                if (stroke) ctx.stroke();
                if (fill) ctx.fill();
                ctx.clip();

                if (image) {
                    try {
                        image = await loadImage(image);
                    } catch (e) {
                        image = false;
                    }
                    if (image) ctx.drawImage(image, x, y, w, h);
                }

                resolve(image ? await loadImage(canvas.toBuffer()) : false)
            } catch (e) {
                reject(`drawCircle:\n ${e}`)
            }
        })
    }
}

export default Wheel
