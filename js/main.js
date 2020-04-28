import Frame from './frame.js'
import Timer from './timer.js'
import {loadLevel} from './loaders.js'
import {createAvatar} from './entities.js'
import {createCollisionLayer} from './layers.js'
import {setupKeyboard} from './input.js'
import {mouseControl} from './debug.js'

const canvas = document.querySelector('#screen')
const ctx = canvas.getContext('2d')

Promise.all([
    createAvatar(),
    loadLevel('1-1'),
    ]).then(([avatar, level]) => {
        const frame = new Frame()
        window.frame = frame

        avatar.pos.set(64, 64)

        level.comp.layers.push(createCollisionLayer(level))

        level.entities.add(avatar)

        const input = setupKeyboard(avatar)

        input.listenTo(window);
        mouseControl(canvas, avatar, frame)

        const timer = new Timer(1/60)

        timer.update = function update(deltaTime) {
            level.update(deltaTime)
            level.comp.draw(ctx, frame)
        }
        timer.start()
});