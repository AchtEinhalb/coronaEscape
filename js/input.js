import Keyboard from './keyboardState.js'

export function setupKeyboard(avatar){
    
    const input = new Keyboard()
    input.addMapping('ArrowUp', keyState => {
        if (keyState) {
            avatar.jump.start()
        } else {
            avatar.jump.cancel()
        }
        //console.log(keyState)
    })
    input.addMapping('ShiftLeft', keyState => {
        avatar.sprint(keyState)
    })
    input.addMapping('ArrowRight', keyState => {
        avatar.go.dir += keyState ? 1 : -1
    })
    input.addMapping('ArrowLeft', keyState => {
        avatar.go.dir += keyState ? -1 : 1
    })
    return input
}