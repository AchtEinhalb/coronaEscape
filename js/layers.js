export function createBackgroundLayer(level, sprites){
    const buffer = document.createElement('canvas')
    buffer.width = 2048
    buffer.height = 240

    const ctx = buffer.getContext('2d')

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, ctx, x, y)
    })

    return function drawBackgroundLayer(ctx, frame){
        ctx.drawImage(buffer, -frame.pos.x, -frame.pos.y)
    }
}
export function createSpriteLayer(entities){
    const spriteBuffer = document.createElement('canvas')
    spriteBuffer.width = 64
    spriteBuffer.height = 64

    return function drawSpriteLayer(ctx){
        entities.forEach(entity => {
            entity.draw(ctx)
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
    return function drawCollision(ctx){
        ctx.strokeStyle = 'blue'
        resolvedTiles.forEach(({x, y}) => {
            ctx.beginPath()
            ctx.rect(x*tileSize, y*tileSize, tileSize, tileSize)
            ctx.stroke()
        })

        ctx.strokeStyle = 'red'
        level.entities.forEach(entity => {
            ctx.beginPath()
            ctx.rect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y)
            ctx.stroke()
        })

        resolvedTiles.length = 0
    }
}