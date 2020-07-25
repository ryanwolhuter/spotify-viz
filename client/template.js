import Visualizer from './classes/visualizer'

const state = {
  particles: [],
  count: 30,
  speed: 1.5,
  size: 85,
  hue: 0,
  saturation: 80,
  lightness: 80,
  colorRate: 1,
  stroke: 'inverse',
  background: 'inverse',
  shrink: false
}

export default class Template extends Visualizer {
  constructor() {
    super({ volumeSmoothing: 100 })
    init(this.sketch.width, this.sketch.height)
  }

  hooks() {
    this.sync.on('tatum', tatum => {
    })

    this.sync.on('segment', segment => {
      state.particles.forEach(particle => {
        if (state.shrink) {
          particle.vibrate(-5)
        } else {
          particle.vibrate(5)
        }
      })
    })

    this.sync.on('beat', beat => {
      state.particles.forEach(particle => {
        if (state.shrink) {
          particle.vibrate(10)
        } else {
          particle.vibrate(-10)
        }
      })
      if (state.hue >= 360) {
        state.hue = 0
      }
      state.hue += 20
      this.sketch.ctx.fillStyle = `hsl(${state.hue}, ${state.saturation}%, ${state.lightness}%)`
    })

    this.sync.on('bar', bar => {
      state.shrink = !state.shrink
            state.particles.forEach(particle => {
        if (state.shrink) {
          particle.vibrate(-5)
        } else {
          particle.vibrate(5)
        }
      })
    })

    this.sync.on('section', section => {

    })
  }

  paint({ ctx, height, width, now }) {
    // this.sync.volume
    // this.sync.tatum
    // this.sync.segment
    // this.sync.beat
    // this.sync.bar
    // this.sync.section

    if (state.background === 'light') {
      document.body.style.backgroundColor = 'white'
    }
    if (state.background === 'dark') {
      document.body.style.backgroundColor = 'black'
    }
    if (state.background === 'match') {
      document.body.style.backgroundColor = `hsl(${state.hue}, ${state.saturation}%, ${state.lightness}%)`
    }
    if (state.background === 'inverse') {
      document.body.style.backgroundColor = `hsl(${360 - state.hue}, ${100 - state.saturation}%, ${100 - state.lightness}%)`
    }

    state.particles.forEach(particle => {
      particle.update(ctx, width, height)
    })
  }
}

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.radius = Math.random() * state.size
    this.speedX = Math.random() * state.speed
    this.speedY = Math.random() * state.speed
  }

  draw(ctx) {
    if (this.radius <= 0) {
      this.radius = 1
    }
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `hsl(${state.hue}, ${state.saturation}%, ${state.lightness}%)`
    ctx.fill()

    if (state.stroke === 'light') {
      ctx.strokeStyle = 'white'
    }
    if (state.stroke === 'dark') {
      ctx.strokeStyle = 'black'
    }
    if (state.stroke === 'match') {
      ctx.strokeStyle = `hsl(${state.hue}, ${state.saturation}%, ${state.lightness}%)`
    }
    if (state.stroke === 'inverse') {
      ctx.strokeStyle = `hsl(${360 - state.hue}, ${100 - state.saturation}%, ${100 - state.lightness}%)`
    }

    ctx.stroke()
  }

  update(ctx, width, height) {

    this.x += this.speedX
    this.y += this.speedY

    if (this.x + this.radius > width
      || this.x - this.radius < 0) {
      this.speedX = -this.speedX
    }

    if (this.y + this.radius > height
      || this.y - this.radius < 0) {
      this.speedY = -this.speedY
    }
    this.draw(ctx)
  }

  vibrate(amount) {
    this.radius += amount
  }
}

function init(width, height) {
  for (let i = 0; i < state.count; i++) {
    state.particles.push(new Particle(width, height))
  }
}

function reInit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  state.particles.length = 0
  init()
}