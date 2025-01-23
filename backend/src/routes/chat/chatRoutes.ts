import { chat_Controller } from '@/controller/implements/chat/chatController'
import { AuthMiddleWare } from '@/middleware/user/AuthMiddleware'
import {Router} from 'express'

const chatRoute = Router()
chatRoute.get('/chatGroups',AuthMiddleWare,chat_Controller.fetchChatGroups.bind(chat_Controller))
chatRoute.get('/messages/:categoryId',AuthMiddleWare, chat_Controller.getMessagesBycategory.bind(chat_Controller))
chatRoute.post('/sendMessage/:id',AuthMiddleWare,chat_Controller.sendMessage.bind(chat_Controller))
export default chatRoute