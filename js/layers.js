export function createBackgroundLayer(level, sprites){
    const buffer = document.createElement('canvas')
    buffer.width = 2048
    buffer.height = 240

    const ctx = buffer.getContext('2d')
    const bg = document.querySelector('#bg')
    bg.width = 2000
    bg.height = 240

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, ctx, x, y)
    })

    return function drawBackgroundLayer(ctx, frame){
        ctx.drawImage(bg, 0, 0, 720, buffer.height)
        ctx.drawImage(buffer, -frame.pos.x, -frame.pos.y)
    }
}
export function createSpriteLayer(entities, width = 64, height = 64){
    const spriteBuffer = document.createElement('canvas')
    spriteBuffer.width = width
    spriteBuffer.height = height
    const spriteBufferContext = spriteBuffer.getContext('2d')

    return function drawSpriteLayer(ctx, frame){
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0, 0, width, height)
            entity.draw(spriteBufferContext)

            ctx.drawImage(spriteBuffer, entity.pos.x - frame.pos.x, entity.pos.y - frame.pos.y)
        })
        
    }
}
export function createCollisionLayer(level){
    const resolvedTiles = []

    const tileResolver = level.tileCollider.tiles
    const tileSize = tileResolver.tileSize

    const getByIndexOriginal = tileResolver.getByIndex
    tileResolver.getByIndex = function getByIndexFake(x,y){
        resolvedTiles.push({x,y})
        
        return getByIndexOriginal.call(tileResolver, x, y)
    }
    return function drawCollision(ctx, frame){
        ctx.strokeStyle = 'blue'
        resolvedTiles.forEach(({x, y}) => {
            ctx.beginPath()
            ctx.rect(x*tileSize-frame.pos.x, y*tileSize-frame.pos.y, tileSize, tileSize)
            ctx.stroke()
        })

        ctx.strokeStyle = 'red'
        level.entities.forEach(entity => {
            ctx.beginPath()
            ctx.rect(entity.pos.x-frame.pos.x, entity.pos.y-frame.pos.y, entity.size.x, entity.size.y)
            ctx.stroke()
        })

        resolvedTiles.length = 0
    }
}