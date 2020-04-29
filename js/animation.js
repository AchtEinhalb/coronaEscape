export function createAnimation(frames, frameRate){
    return function resolveFrame(distance){
        const frameIndex = Math.floor(distance / frameRate) % frames.length
        const frameName = frames[frameIndex]
        return frameName
    }
}