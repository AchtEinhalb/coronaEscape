export default class Compositor {
    constructor(){
        this.layers = []
    }
    draw(ctx){
        this.layers.forEach(layers => {
            layers(ctx)
        })
    }
}