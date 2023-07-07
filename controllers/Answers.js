import mongoose from "mongoose";
import Questions from '../models/Questions.js'

export const postAnswer = async(req,res) =>{
    const{id:_id}=req.params;   // the id is been replced with _id which is retrieved from routers/answers.js
    const { noOfAnswers, answerBody, userAnswered,userId } = req.body;
    
    // the below function will check if the particular id is there is the mongo database or not if  not there then 
    // return 404 message question unavailable
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable") 
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try{
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, {  // here the Questions is the schema in the mongodb
            $addToSet: { answer: [{ answerBody, userAnswered, userId }] }, // here we have used addToSet as we have to update the answer
          }); // this will find the particular id and update the answer(declared in the mongodb) in the mongodb as well as in application
          res.status(200).json(updatedQuestion)
    
        }catch(error){
        console.log(error);
        res.status(400).json("error in updating")
    }
  };
    const updateNoOfQuestions = async (_id, noOfAnswers) => {
        try {
          await Questions.findByIdAndUpdate(_id, {
            $set: { noOfAnswers: noOfAnswers },    // here set is used as we have to replace the entire value
          });
        } catch (error) {
          console.log(error);
        }
      };

  // lec 14 40:00
    export const deleteAnswer = async (req,res) =>{
      const{ id:_id} = req.params;
      const {answerId,noOfAnswers}=req.body;

      if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable") // for checking valid question id 
      }
      if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("answer unavailable") // for checking valid answer id 
      }
      updateNoOfQuestions(_id,noOfAnswers)

      try{
          await Questions.updateOne(
            { _id },
            { $pull: { answer: { _id: answerId } } } // generally pull means it will go to the answer array and pull the _id from it and delete that  particular answer   
          )
          res.status(200).json({ message: "Successfully deleted..." });
      }
      catch(error){
        console.log(error);
        res.status(405).json(error)
      }


    }



// import mongoose from "mongoose";
// import Questions from "../models/Questions.js";

// export const postAnswer = async (req, res) => {
//   const { id: _id } = req.params;
//   const { noOfAnswers, answerBody, userAnswered } = req.body;
//   const userId = req.userId;
//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     return res.status(404).send("question unavailable...");
//   }

//   updateNoOfQuestions(_id, noOfAnswers);
//   try {
//     const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
//       $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
//     });
//     res.status(200).json(updatedQuestion);
//   } catch (error) {
//     res.status(400).json("error in updating");
//   }
// };

// const updateNoOfQuestions = async (_id, noOfAnswers) => {
//   try {
//     await Questions.findByIdAndUpdate(_id, {
//       $set: { noOfAnswers: noOfAnswers },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };