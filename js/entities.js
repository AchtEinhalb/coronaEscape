import Entity from './entity.js'
import Jump from './traits/jump.js'
import Go from './traits/go.js'
import Velocity from './traits/velocity.js'
import {loadAvatarSprite} from './sprites.js'

export function createAvatar() {
    return loadAvatarSprite().then(sprite => {
        const avatar = new Entity()
        avatar.size.set(14, 16)

        avatar.addTrait(new Go())
        avatar.addTrait(new Jump())
        // avatar.addTrait(new Velocity())
        
        avatar.draw = function drawAvatar(ctx){
            sprite.draw('idle', ctx, this.pos.x, this.pos.y)
        }
        return avatar
    })
}