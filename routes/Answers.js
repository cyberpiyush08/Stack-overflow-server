import express from "express";
import {postAnswer,deleteAnswer} from '../controllers/Answers.js'
import auth from "../middlewares/auth.js";

const router=express.Router();

router.patch('/post/:id',auth,postAnswer)      // patch is used to update a particular record in the database (lec12  7:28)
router.patch('/delete/:id',auth,deleteAnswer)  //  here patch is  used to update an answer  part after deleteing the particular answer and not the entire answer record

export default router;