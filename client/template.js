import Visualizer from './classes/visualizer'

const state = {
  particles: [],
  count: 30,
  speed: 1,
  size: 85,
  hue: 0,
  saturation: 20,
  lightness: 20,
  colorRate: 1,
  stroke: 'inverse',
  background: 'inverse'
}

export default class Template extends Visualizer {
  constructor () {
    super({ volumeSmoothing: 100 })
  }

  hooks () {
    this.sync.on('tatum', tatum => {
    })

    this.sync.on('segment', segment => {

    })

    this.sync.on('beat', beat => {
      state.hue += 20
    })

    this.sync.on('bar', bar => {

    })

    this.sync.on('section', section => {

    })
  }

  paint ({ ctx, height, width, now }) {
    // this.sync.volume
    // this.sync.tatum
    // this.sync.segment
    // this.sync.beat
    // this.sync.bar
    // this.sync.section
    ctx.fillStyle = `hsl(${state.hue}, 50%, 50%)`
    ctx.fillRect(0, 0, width/2, height/2)
    if (state.hue >= 360) {
      state.hue = 0
    }
    state.hue += state.colorRate

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
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.radius = Math.random() * particleSize
    this.speedX = Math.random() * particleSpeed
    this.speedY = Math.random() * particleSpeed
  }

  draw(ctx) {
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

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x + this.radius > canvas.width
      || this.x - this.radius < 0) {
      this.speedX = -this.speedX
    }

    if (this.y + this.radius > canvas.height
      || this.y - this.radius < 0) {
      this.speedY = -this.speedY
    }
    this.draw()
  }
}

function init() {
  for (let i = 0; i < particleCount; i++) {
    particlesArray.push(new Particle())
  }
}

function animate() {
  for (let i = 0; i < particlesArray.length; i++) {
    const element = particlesArray[i]
    element.update()
  }
  requestAnimationFrame(animate)
}

function reInit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  particlesArray.length = 0
  init()
}