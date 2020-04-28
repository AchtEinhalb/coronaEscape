export function createBackgroundLayer(level, sprites){
    const tiles = level.tiles
    const resolver = level.tileCollider.tiles

    const buffer = document.createElement('canvas')
    buffer.width = 256 + 16
    buffer.height = 240

    const ctx = buffer.getContext('2d')
    const bg = document.querySelector('#bg')

    let startIndex, endIndex
    function proxyDraw(drawFrom, drawTo){
        if(drawFrom === startIndex && drawTo === endIndex){
            return
        }

        startIndex = drawFrom
        endIndex = drawTo

        ctx.clearRect(0, 0, buffer.width, buffer.height)
        for(let x= startIndex; x<= endIndex; ++x){
            const col = tiles.grid[x]
            if(col){
                col.forEach((tile, y) => {
                    sprites.drawTile(tile.name, ctx, x - startIndex, y)
                })
            }
        }
    }

    return function drawBackgroundLayer(ctx, frame){
        const drawWidth = resolver.toIndex(frame.size.x)
        const drawFrom = resolver.toIndex(frame.pos.x)
        const drawTo = drawFrom + drawWidth
        proxyDraw(drawFrom, drawTo)
        ctx.drawImage(bg, -frame.pos.x, -frame.pos.y, 720, buffer.height)
        ctx.drawImage(buffer, -frame.pos.x % 16, -frame.pos.y)
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
export function createFrameLayer(frameToDraw){
    return function drawFrameRect(ctx, fromFrame){
        ctx.strokeStyle = 'purple'
        ctx.beginPath()
        ctx.rect(frameToDraw.pos.x-fromFrame.pos.x, frameToDraw.pos.y-fromFrame.pos.y, frameToDraw.size.x, frameToDraw.size.y)
        ctx.stroke()
    }
}