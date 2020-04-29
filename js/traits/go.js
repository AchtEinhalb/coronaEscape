import {Trait} from '../entity.js'

export default class Go extends Trait {
    constructor() {
        super('go')

        this.dir = 0
        this.acceleration = 500
        this.deceleration = 300
        this.dragValue = 1/5000
        this.facing = 1
        this.distance = 0
    }
    update(entity, deltaTime){
        const absoluteVel = Math.abs(entity.vel.x)

        if(this.dir !== 0){
            entity.vel.x += this.acceleration * deltaTime * this.dir
            if(entity.jump){
                if(entity.jump.falling === false){
                    this.facing = this.dir
                }
            } else {
                this.facing = this.dir
            }
            
        } else if(entity.vel.x !== 0) {
            const decel = Math.min(absoluteVel, this.deceleration * deltaTime)
            entity.vel.x += entity.vel.x > 0 ? -decel : decel
        } else {
            this.distance = 0
        }
        const drag = this.dragValue * entity.vel.x * absoluteVel
        entity.vel.x -= drag
        this.distance += absoluteVel * deltaTime
    }
}
