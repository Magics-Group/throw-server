import express from 'express'
import url from 'url'
import needle from 'needle'
import path from 'path'
import mime from 'mime'


const router = express.Router()

router.get('/', (req, res) => {
    res.send('Nothing here yet, Soon.')
})

router.get('/:id', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

    const id = req.params.id
    const direct = true || id.contains('.')

    if (direct) {
        res.writeHead(200, {
            'Content-Type': mime.lookup(path.extname(id)),
            'Transfer-Encoding': 'chunked'
        })
        return needle.get(`http://i.imgur.com/${id}`).pipe(res)
    }
})

export default router