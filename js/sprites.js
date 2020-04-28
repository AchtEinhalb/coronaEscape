import SpriteSheet from './SpriteSheet.js'
import {loadImage} from './loaders.js'

export function loadAvatarSprite(){
    return loadImage('/img/characters.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16)
        sprites.define('idle',276, 44, 16, 16)
        return sprites;
    });
}
