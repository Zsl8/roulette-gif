export function getRandomNumber(min: number, max: number) {
    return Number((Math.random() * (max - min) + min).toFixed(0))
}