import Compositor from './compositor.js'
import Timer from './timer.js'
import {loadLevel} from './loaders.js'
import {createAvatar} from './entities.js'
import {loadBackgroundSprites} from './sprites.js'
import {createBackgroundLayer, createSpriteLayer} from './layers.js'

import Keyboard from './keyboardState.js'

const canvas = document.querySelector('#screen')
const ctx = canvas.getContext('2d')

Promise.all([
    createAvatar(),
    loadBackgroundSprites(),
    loadLevel('1-1'),
    ]).then(([avatar, backgroundSprites, level]) => {
    const comp = new Compositor();

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites)
    comp.layers.push(backgroundLayer)

    const gravity = 2000
    avatar.pos.set(64, 180)
    avatar.vel.set(200, -600)

    const SPACE = 32;
    const input = new Keyboard();
    input.addMapping(SPACE, keyState => {
        if (keyState) {
            avatar.jump.start();
        } else {
            avatar.jump.cancel()
        }
        console.log(keyState)
    })
    input.listenTo(window);

    const spriteLayer = createSpriteLayer(avatar);
    comp.layers.push(spriteLayer);

    const timer = new Timer(1/60);

    timer.update = function update(deltaTime) {
        avatar.update(deltaTime);
        comp.draw(ctx)
        avatar.vel.y += gravity * deltaTime;
    }

    timer.start();
});