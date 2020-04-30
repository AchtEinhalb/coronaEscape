import Frame from './frame.js'
import Timer from './timer.js'
import {createLevelLoader} from './loaders/level.js'
import {loadEntities} from './entities.js'
import {createCollisionLayer, createFrameLayer} from './layers.js'
import {setupKeyboard} from './input.js'
import {mouseControl} from './debug.js'

async function main(canvas){
    const ctx = canvas.getContext('2d')
    const entityFactory = await loadEntities()
    const loadLevel = await createLevelLoader(entityFactory)
    const level = await loadLevel('1-1')
    const frame = new Frame()

    const avatar = entityFactory.avatar()
    avatar.pos.set(64, 64)
    
    level.entities.add(avatar)

    level.comp.layers.push(createCollisionLayer(level))
    const input = setupKeyboard(avatar)
    input.listenTo(window);
    // mouseControl(canvas, avatar, frame)

    const timer = new Timer(1/60)
    timer.update = function update(deltaTime) {
        level.update(deltaTime)
        ctx.drawImage(bg, -frame.pos.x, -frame.pos.y, 2000, 240)
        if(avatar.pos.x > 100){
            frame.pos.x = avatar.pos.x - 100
        }
        if(avatar.pos.y > 225){
            avatar.pos.x = 60
            avatar.pos.y = 60
            frame.pos.x = avatar.pos.x - 60
         }
        level.comp.draw(ctx, frame)
    }
    timer.start()
}
const canvas = document.querySelector('#screen')
main(canvas)