![roulette-gif Logo](https://cdn.discordapp.com/attachments/340778753523187722/1165802053247975504/image.png?ex=65482cc5&is=6535b7c5&hm=aab3c2bca3c68f9e0d5797873e6a4c304be5eaa6e0ff8f976af1054e7191c584&)

<br />

# roulette-gif
<a href="https://www.npmjs.com/package/roulette-gif"><img src="https://img.shields.io/npm/v/roulette-gif.svg" alt="Npm version" /></a>
<a href="https://www.npmjs.com/package/roulette-gif"><img src="https://img.shields.io/npm/dt/roulette-gif.svg?maxAge=3600" alt="Npm downloads" /></a>
<a href="https://discord.gg/hSCbm4TKv4"><img src="https://img.shields.io/static/v1?label=Support%20Server&message=HL%20Services&color=867FD4" alt="Support server" /></a>
<br />
This is a node.js package that allows you to make a roulette gif image as easy as possible

## Installation
```sh
$ npm install roulette-gif
```
```sh
$ yarn add roulette-gif
```

# Features

- Simple & easy to use 
- You can edit everything in the wheel

# Support

Join our support server for any question [HL Services](https://discord.gg/hSCbm4TKv4)

## Getting Started

At first you need to [install the package](#installation)

```js
const { Wheel } = require('roulette-gif')
const wheel = new Wheel()

let slots = [
  {
    username: "Zaid",
    number: 1,
    image: 'Some avatar url'  // Must be png or any supported image by canvas
  },
  {
    username: "Ahmed",
    number: 2,
    image: 'Some avatar url'
  },
]

let { 
  buffer, 
  winner, 
  lastFrame 
} = await wheel.createGif({
  slots,
  stream: false, // Set it to true if you want to return stream insted of buffer
  wheelStroke: {
    color: '#fff',
    width: 5
  },
  slotStroke: {
    color: '#fff',
    width: 5
  },
  imageStroke: {
    color: '#fff',
    width: 5
  },
})
```
You can use the `buffer` to send the roulette gif or save it and if you want to get a `stream` insted of buffer you can use `stream: true`<br />
The `lastFrame` variable is a buffer of the last image in the gif<br />
The `winner` variable returns the winner slot

## Options

| Variable | Required | Default | Description | Type |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| stream | `false` | `false` | Choice to return a buffer or stream | `Boolean` |
| slots | `true` | `null` | The slots array of the users | `Array` |
| wheelStroke | `false` | `{ width: 0, color: '#fff' }` | The stroke object of the wheel | `Object` |
| slotStroke | `false` | `{ width: 0, color: '#fff' }` | The stroke object of the slot | `Object` |
| imageStroke | `false` | `{ width: 0, color: '#fff' }` | The stroke object of the center image | `Object` |
| text | `false` | `{ color: '#fff', size: 14 }` | The text options | `Object` |
| arrow | `false` | `Simple arrow` | Use url image to change the wheel arrow | `URL Image` |

## Examples

- Send the wheel in discord
```js
let { buffer, winner } wheel.createGif({ 
  slots
})

<Interaction | Channel>.send({ 
  files: [{ attachment: buffer, name: "roulette.png" }],
  content: `Congratulations ${winner.username} 🎉 you won`
})
```

- Custom arrow
```js
wheel.createGif({
  slots,
  arrow: 'https://example.com/arrow.png'
})
```

- Custom wheel stroke
```js
wheel.createGif({
  slots,
  wheelStroke: {
    color: 'red', // You can use hexCodes here
    width: 5
  }
})
```

- Custom slot stroke
```js
wheel.createGif({
  slots,
  slotStroke: {
    color: 'purple', // You can use hexCodes here
    width: 5
  }
})
```

- Custom image stroke
```js
wheel.createGif({
  slots,
  imageStroke: {
    color: 'green', // You can use hexCodes here
    width: 5
  }
})
```

- Custom text
```js
wheel.createGif({
  slots,
  text: {
    color: 'blue', // You can use hexCodes here
    size: 10
  }
})
```

## Developer
- Discord [zd8](https://discord.com/channels/@me/306656522438443009)
- Discord Server [HL Service](https://discord.gg/hSCbm4TKv4)
- Github [zsl8](https://github.com/Zsl8)