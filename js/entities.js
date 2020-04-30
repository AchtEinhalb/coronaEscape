import {loadAvatar} from './entities/avatar.js'
import {loadCorona} from './entities/corona.js'


export function loadEntities(){
    const entityFactories = {}
    function addAs(name){
        return factory => entityFactories[name] = factory
    }
    return Promise.all([
        loadAvatar().then(addAs('avatar')),
        loadCorona().then(addAs('corona')),
    ]).then(() => entityFactories)
}