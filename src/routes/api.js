import express from 'express'
import _ from 'lodash'
import url from 'url'

const router = express.Router()

router.get('/torrent', (req, res) => {
    const {
        torrent
    } = req.query

    if (!torrent) return res.json({
        status: 500,
        message: 'No Torrent Specified'
    })


})


export default router