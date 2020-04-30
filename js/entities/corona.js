import Entity from '../entity.js'
import {loadSpriteSheet} from '../loaders.js'
import {createAnimation} from '../animation.js'

export function loadCorona() {
    return loadSpriteSheet('corona').then(createCoronaFactory)
}
function createCoronaFactory(sprite){
    const floatAnimation = sprite.animations.get('float')
    function drawCorona(ctx){
        sprite.draw(floatAnimation(this.lifetime), ctx, 0, 0)
    }
    return function createCorona(){
        const corona = new Entity()
        corona.size.set(16, 16)
        corona.floatRange = 30
        corona.addTrait({
            NAME: 'float',
            speed: -30,
            obstruct(corona, side){
                if(side === 'left' || side === 'right'){
                    this.speed = -this.speed
                }
            },
            update(corona){
                
                corona.vel.x = this.speed
            }
        })

        corona.draw = drawCorona
        return corona
    }
}
