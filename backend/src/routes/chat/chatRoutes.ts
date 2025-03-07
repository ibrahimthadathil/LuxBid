import { chat_Controller } from '@/controller/implements/chat/chatController'
import { AuthMiddleWare } from '@/middleware/user/AuthMiddleware'
import {Router} from 'express'
import { upload } from '@/utils/multer_Utils'

const chatRoute = Router()
chatRoute.get('/chatGroups',AuthMiddleWare,chat_Controller.fetchChatGroups.bind(chat_Controller))
chatRoute.get('/messages/:categoryId',AuthMiddleWare, chat_Controller.getMessagesBycategory.bind(chat_Controller))
chatRoute.post('/sendMessage/:id',AuthMiddleWare,upload.array('attachments',5),chat_Controller.sendMessage.bind(chat_Controller))
chatRoute.put('/messages/:messageId/reaction', AuthMiddleWare, chat_Controller.addReaction.bind(chat_Controller));

export default chatRoute