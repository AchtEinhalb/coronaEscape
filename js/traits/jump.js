import {Trait} from '../entity.js'

export default class Jump extends Trait {
    constructor() {
        super('jump')

        this.ok = 0
        this.duration = 0.4
        this.engageTime = 0
        this.requestTime = 0
        this.gracePeriod = 0.1
        this.velocity = 200
        this.boost = 0.3
    }
    get falling(){
        return this.ok < 0
    }
    start(){
        this.requestTime = this.gracePeriod
    }
    cancel(){
        this.engageTime = 0
        this.requestTime = 0
    }

    obstruct(entity, side){
        if(side === 'bottom'){
            this.ok = 1
        } else if(side === 'top'){
            this.cancel()
        }
    }

    update(entity, deltaTime){
        if(this.requestTime > 0){
            if(this.ok > 0){
                this.engageTime = this.duration
                this.requestTime = 0
            }
            this.requestTime -= deltaTime
        }
        if (this.engageTime > 0){
            entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.boost)
            this.engageTime -= deltaTime
        }
        this.ok--
    }
}
