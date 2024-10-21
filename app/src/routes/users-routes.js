// import com {} importa apenas o Router de dentro do express
import { Router } from 'express'
import { listaUsers, paginaAddUser, addUser } from '../controllers/users-controller.js'

const router = Router()


router.get('/addUser', paginaAddUser)

router.post('/addUser', addUser)

export default router