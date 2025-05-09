const BLUR_CONST = 20
const THRESHOLD_CONST = 0.3

let bSize = 100
let scl = 1.4

let shapes = []
let sprites = {}

function setup() {
  createCanvas(windowHeight, windowHeight)
  background(0)
  noStroke()

  makeSprites()

  for (let i = 0; i < 20; i++) {
    const angle  = random(TWO_PI)
    const radius = random(0, width * 0.4)           // ← wider spread
    const x      = width / 2 + cos(angle) * radius
    const y      = height / 2 + sin(angle) * radius
    const type   = random(['circle', 'rect', 'tri'])
    shapes.push({ x, y, s: randomGaussian(1, 0.5), type })
  }

  imageMode(CENTER)
  drawScene()
  noLoop()
}

function makeSprites() {
  sprites.circle = makeSprite(g => {
    g.ellipse(bSize * 2, bSize * 2, bSize, bSize)
  })
  sprites.rect = makeSprite(g => {
    g.rectMode(CENTER)
    g.rect(bSize * 2, bSize * 2, bSize, bSize)
  })
  sprites.tri = makeSprite(g => {
    const cx = bSize * 2, cy = bSize * 2, r = bSize / 2
    g.triangle(cx, cy - r, cx - r, cy + r, cx + r, cy + r)
  })
}

function makeSprite(drawFn) {
  const g = createGraphics(bSize * 4, bSize * 4)
  g.background(0, 0)
  g.fill(255)
  g.noStroke()
  drawFn(g)
  g.filter(BLUR, BLUR_CONST)
  return g
}

function drawScene() {
  blendMode(BLEND)
  background(0)

  for (const sh of shapes) {
    push()
    translate(sh.x, sh.y)
    scale(sh.s * scl)
    image(sprites[sh.type], 0, 0)
    pop()
  }

  filter(THRESHOLD, THRESHOLD_CONST)
  blendMode(BLEND)
}
