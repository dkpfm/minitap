import _ from 'underscore'
import * as Matter from 'matter-js'
import { ref } from 'vue'

export default function () {
  if (process.client) {
    var Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite

    const USE_RENDERER = false

    // create an engine
    var engine = Engine.create()
    engine.gravity.y = 0
    // engine.positionIterations = 10
    engine.constraintIterations = 3

    // create a renderer
    let render
    if (USE_RENDERER) {
      render = Render.create({
        element: document.body,
        engine: engine
      })
      render.canvas.style.position = 'fixed'
      render.canvas.style.transform = 'scale(0.75)'
      render.canvas.style.opacity = 0.8
    }

    const center = Bodies.circle(0, 0, 200)
    Composite.add(engine.world, [center])
    if (USE_RENDERER) {
      Render.lookAt(render, [center], Matter.Vector.create(1000, 1000))
    }

    // create two boxes and a ground
    const circles = []
    const circlesData = []
    function spawn({ remove = false } = {}) {
      const radius = 50 + Math.random() * 150
      const circ = Bodies.circle(
        (Math.random() - 0.5) * 1200,
        (Math.random() - 0.5) * 1200,
        radius
      )
      circ.frictionAir = 0.9
      circ.friction = 0.1
      circ.slop = 0.1
      circles.push(circ)
      circlesData.push({ radius })
      Composite.add(engine.world, [circ])

      if (remove) {
        Composite.remove(engine.world, [circles.shift()])
        circlesData.shift()
      }
    }
    _.times(70, spawn)

    // run the renderer
    if (USE_RENDERER) {
      Render.run(render)
    }

    // create runner
    var runner = Runner.create()

    // run the engine
    Runner.run(runner, engine)

    const force = Matter.Vector.create(0, 1)
    const circlesState = ref([])
    function tick() {
      requestAnimationFrame(tick)
      circles.forEach((c) => {
        force.x = -c.position.x * 0.0001
        force.y = -c.position.y * 0.0001
        Matter.Body.applyForce(c, c.position, force)
      })
      circlesState.value = circles.map((c, i) => ({
        id: c.id,
        pos: { x: c.position.x, y: -c.position.y },
        scale: circlesData[i].radius
      }))
    }
    tick()

    return {
      circlesState,
      spawn
    }
  } else {
    return {
      circlesState: { value: [] },
      spawn: () => {}
    }
  }
}
