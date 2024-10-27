// import com {} importa apenas o Router de dentro do express
import { Router } from 'express'
import { listaUsers, paginaAddUser, addUser, deleteUser } from '../controllers/users-controller.js'

const router = Router()

router.get('/', listaUsers)

router.get('/addUser', paginaAddUser)

router.post('/addUser', addUser)

router.get('/deleteUser/:id', deleteUser)

export default router