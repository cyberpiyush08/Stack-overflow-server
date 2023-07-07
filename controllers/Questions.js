import Questions from "../models/Questions.js";
import mongoose from "mongoose";

export const AskQuestion =async (req,res)=>{
    const postQuestionData=req.body;
    const postQuestion=new Questions(postQuestionData)
    try{
        await postQuestion.save();
        res.status(200).json("Posted a aqustion successfully")
    }catch(error){
            console.log(error);
            res.status(409).json("Couldn't post a new question")
    }
}


export const getAllQuestions=async (req,res)=>{
        try{
            const questionList=await Questions.find();   // this is the question schema from mongo db which conatin all the list of data
            // and it will find the data and give the data to the questionList.
            res.status(200).json(questionList);
        }catch(error){
                console.log(error);
                res.status(404).json({message:error.message});
        }
}


export const deleteQuestion = async (req,res)=>{
    const {id:_id}=req.params;  //params is  the parameter available in the url here id paramerter is there _id 
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable...") //here it is checking whether the _id provided the id is presen or not
    } 
    try{
            await Questions.findByIdAndRemove(_id); // the question having the particular id will be removed from database
            res.status(200).json({message:"Successfully deleted..."})
    }catch(error){
            res.status(404).json({message:error.message})
    }
}

export const voteQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const { value } = req.body;
    const userId = req.userId;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable...");
    }
  
    try {
      const question = await Questions.findById(_id);
      const upIndex = question.upVote.findIndex((id) => id === String(userId));
      const downIndex = question.downVote.findIndex(
        (id) => id === String(userId)
      );
  
      if (value === "upVote") {
        if (downIndex !== -1) {                             // if the users already downvoted that it will remove from the downvote array
          question.downVote = question.downVote.filter(
            (id) => id !== String(userId)
          );
        }
        if (upIndex === -1) {                           // if it is  new user than it will add its vote to upvote
          question.upVote.push(userId);
        } else {
          question.upVote = question.upVote.filter((id) => id !== String(userId));  // if the user already upvoted than it will remove frpm uupvote array
        }


      } else if (value === "downVote") {
        if (upIndex !== -1) {
          question.upVote = question.upVote.filter((id) => id !== String(userId));
        }
        if (downIndex === -1) {
          question.downVote.push(userId);
        } else {
          question.downVote = question.downVote.filter(
            (id) => id !== String(userId)
          );
        }
      }


      await Questions.findByIdAndUpdate(_id, question);
      res.status(200).json({ message: "voted successfully..." });
      
    } catch (error) {
      res.status(404).json({ message: "id not found" });
    }
  };

// import Questions from "../models/Questions.js";
// import mongoose from "mongoose";

// export const AskQuestion = async (req, res) => {
//   const postQuestionData = req.body;
//   const userId = req.userId;
//   const postQuestion = new Questions({ ...postQuestionData, userId });
//   try {
//     await postQuestion.save();
//     res.status(200).json("Posted a question successfully");
//   } catch (error) {
//     console.log(error);
//     res.status(409).json("Couldn't post a new question");
//   }
// };

// export const getAllQuestions = async (req, res) => {
//   try {
//     const questionList = await Questions.find().sort({ askedOn: -1 });
//     res.status(200).json(questionList);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };



// export const deleteQuestion = async (req, res) => {
//   const { id: _id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     return res.status(404).send("question unavailable...");
//   }

//   try {
//     await Questions.findByIdAndRemove(_id);
//     res.status(200).json({ message: "successfully deleted..." });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
