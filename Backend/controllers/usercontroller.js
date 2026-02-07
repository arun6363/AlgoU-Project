import  Problem  from "../models/Problem.js"
import CreatedBy from "../models/CreatedBy.js";

const userprofile = async(req,res)=>{
    const {username} = req.body; 
    const data = await CreatedBy.aggregate([
        // {"$match":{username:username}},
       {
        $group: {
          _id: username,
          totalSolved: { $sum: 1 }
        }
      }
    ])

    return res.status(200).json(data[0]);
}

export default userprofile;