import express from 'express'
import api from './routes/api'
import mainRoutes from './routes/main'

const app = express()


app.use('/api', api)

app.get('/*', mainRoutes)

app.listen(3000, () => console.log('We are cooking @ port 3000!'))