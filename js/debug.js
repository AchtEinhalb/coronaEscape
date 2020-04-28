export function mouseControl(canvas, entity, frame){
    let lastEvent;
    ['mousedown', 'mousemove'].forEach(eventName =>{
        canvas.addEventListener(eventName, event =>{
            if(event.buttons === 1){
                entity.vel.set(0,0)
                entity.pos.set(event.offsetX + -frame.pos.x, event.offsetY + -frame.pos.x)
            } else if(event.buttons === 2 && lastEvent && lastEvent.type === 'mousemove'){
                frame.pos.x -= event.offsetX - lastEvent.offsetX
            }
            lastEvent = event
        })
    })
    canvas.addEventListener('contextmenu', event => {
        event.preventDefault()
    })
}