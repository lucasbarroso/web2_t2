// import com {} importa apenas o Router de dentro do express
import { Router } from 'express'
import { listaUsers, paginaAddUser, addUser, deleteUser, userById, updateUser, paginaUpdateUser } from '../controllers/users-controller.js'

const router = Router()

router.get('/', listaUsers)

router.get('/addUser', paginaAddUser)

router.post('/addUser', addUser)

router.get('/updateUser/:id', paginaUpdateUser)

router.post('/updateUser', updateUser)

router.get('/deleteUser/:id', deleteUser)

router.get('/user/:id', userById)

export default router