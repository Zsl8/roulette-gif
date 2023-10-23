export interface ImaesInterface {
    slots: [{
        username: string,
        number: number,
        color?: any,
        image?: string,
        ctxImage?: any
    }],
    imageStroke?: {
        width: number,
        color: string | '#000'
    },
}

export interface WheelInterface {
    frame: number,
    slots: [{
        username: string,
        number: number,
        color?: any,
        image?: string,
        ctxImage?: any
    }],
    text?: {
        color: string | 'white',
        size: number | 14
    },
    wheelStroke?: {
        width: number,
        color: string | '#000'
    },
    imageStroke?: {
        width: number,
        color: string | '#000'
    },
    slotStroke?: {
        width: number,
        color: string | '#000'
    },
    winnerSlotColor?: any
}

export interface CenterInterface {
    arrow?: string,
    wheel: any,
    winner: {
        username: string,
        number: number,
        color?: any,
        image?: string,
        ctxImage?: any
    },
}

export interface CircleInterface {
    image: any,
    fill?: string | null,
    stroke?: string | null,
    weight?: number | 5
}

export interface FullFrameInterface {
    frame: number,
    slots: [{
        username: string,
        number: number,
        color?: any,
        image?: string,
        ctxImage?: any
    }],
    wheelStroke?: {
        width: number,
        color: string | '#000'
    },
    slotStroke?: {
        width: number,
        color: string | '#000'
    },
    text?: {
        color: string | 'white',
        size: number | 14
    },
    arrow?: string,
    winnerSlotColor?: any
}

export interface CreateGifInterface {
    frame: number,
    stream: boolean | false,
    slots: [{
        username: string,
        number: number,
        color?: any,
        image?: string,
        ctxImage?: any
    }],
    wheelStroke?: {
        width: number,
        color: string | '#000'
    },
    slotStroke?: {
        width: number,
        color: string | '#000'
    },
    imageStroke?: {
        width: number,
        color: string | '#000'
    },
    text?: {
        color: string | 'white',
        size: number | 14
    },
    arrow?: string,
    winnerSlotColor?: any
}