import express from "express"
import {AskQuestion} from "../controllers/Questions.js"
import {getAllQuestions,deleteQuestion,voteQuestion} from "../controllers/Questions.js"
import auth from "../middlewares/auth.js";


const router=express.Router();

router.post('/Ask', auth, AskQuestion)
router.get('/get',getAllQuestions);  // getting getAllquestions from controllers/question.js
router.delete('/delete/:id', auth,deleteQuestion);  
// the above code here we are using a delete request to delete a question and sending the id of that particular question to be deleted
router.patch('/vote/:id',auth,voteQuestion);

export default router;