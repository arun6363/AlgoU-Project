import { body } from "express-validator";
import Problem from "../models/Problem.js"
import CreatedBy from "../models/CreatedBy.js";


export const problemValidationRules = () =>
    [
        body("id")
            .isLength({ min: 4, max: 4 })
            .withMessage("problem id must be at 4 characters")
            .notEmpty()
            .withMessage(" problem id is required"),
        body("title")
            .notEmpty()
            .withMessage("problem title is required"),
        body("statement")
            .notEmpty()
            .withMessage("problem statement is required"),
        body("difficulty")
            .notEmpty()
            .withMessage("problem difficulty is required"),
        body("input")
            .notEmpty()
            .withMessage("input is required"),
        body("output")
            .notEmpty()
            .withMessage("output is required"),
        body("constraints")
            .notEmpty()
            .withMessage("constraints are required"),
        body("tags")
            .notEmpty()
            .withMessage("tags are required"),
    ]

const createproblem = async (req, res) => {
    const { id, title, statement, difficulty, input, output, constraints, tags, username } = req.body;

    // if(username == null) return res.status(400).json({msg:"username not found"});
    const existingProblem = await Problem.findOne({ id })
    if (existingProblem) {
        // console.log("existing\n",existingProblem)
        return res.status(400).json({ msg: "Problem with id already exists" })
    }

    const constraints_arr = constraints.split(",")
    const tags_arr = tags.split(",")
    const currentProblem = await Problem.create({ id, title, statement, difficulty, input, output, constraints: constraints_arr, tags: tags_arr })
    const currentuser = await CreatedBy.create({ id, username })

    return res.status(200).json({ id, title, statement, input, output, constraints_arr, tags_arr });

}

const deleteproblem = async (req, res) => {

}

const fetchproblems = async (req, res) => {
    const response = await Problem.find({}, { _id: 0, id: 1, title: 1, difficulty: 1 })
    res.status(200).json(response)
}

const getproblembyid = async (req, res) => {
    const { id } = req.params;
    const data = await Problem.findOne({ id }, { _id: 0 });

    return res.status(200).json(data);
}

const editproblem = async (req, res) => {

}

const getcreatedproblems = async (req, res) => {
    const  {username} = req.query;
    const response = await CreatedBy.aggregate([
        {
            $match: { username }   
        },
        {
            $lookup: {
                from: "problems",     
                localField: "id",     
                foreignField: "id",   
                as: "problem"
            }
        },
        {
            $unwind: "$problem"
        },
        {
            $project: {
                _id: 0,
                problemId: "$problem.id",
                title: "$problem.title"
            }
        }
    ]);
    res.status(200).json(response);

}

export { createproblem, deleteproblem, fetchproblems, editproblem, getproblembyid, getcreatedproblems }