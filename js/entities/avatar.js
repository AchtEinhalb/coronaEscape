import Entity from '../entity.js'
import Jump from '../traits/jump.js'
import Go from '../traits/go.js'
import {loadSpriteSheet} from '../loaders.js'
import {createAnimation} from '../animation.js'

export function loadAvatar() {
    return loadSpriteSheet('avatar').then(createAvatarFactory)
}
function createAvatarFactory(sprite){
    const runAnimation = createAnimation(['run1', 'run2', 'run3'], 10)
    function routeFrame(avatar){
        if(avatar.jump.falling){
            return 'jump'
        }
        if(avatar.go.distance > 0){
            if((avatar.vel.x > 0 && avatar.go.dir < 0) || (avatar.vel.x < 0 && avatar.go.dir > 0)){
                return 'break'
            }
            return runAnimation(avatar.go.distance)
        }
        return 'idle'
    }
    function setSprintState(sprintOn){
        this.go.dragValue = sprintOn ? 1/5000 : 1/1000
    }
    function drawAvatar(ctx){
        sprite.draw(routeFrame(this), ctx, 0, 0, this.go.facing < 0)
    }
    return function createAvatar(){
        const avatar = new Entity()
        avatar.size.set(14, 16)
        avatar.addTrait(new Go())
        avatar.addTrait(new Jump())
        avatar.sprint = setSprintState
        avatar.draw = drawAvatar
        avatar.sprint(false)
        return avatar
    }
}
