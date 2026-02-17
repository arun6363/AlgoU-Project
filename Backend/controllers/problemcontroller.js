import { body } from "express-validator";
import Problem from "../models/Problem.js"
import CreatedBy from "../models/CreatedBy.js";
import Testcase from "../models/Testcase.js"
import User from "../models/User.js"
import solvedProblem from "../models/solvedProblems.js";

export const problemValidationRules = () =>
    [
        body("id")
            .isInt({ min: 1, max: 1000 })
            .withMessage("problem id must be between 1 & 1000")
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
        body("timelimit")
            .isInt({ max: 4 })
            .withMessage("Max time limit 4secs")
            .notEmpty()
            .withMessage("problem Time limit is required"),
        body("input")
            .notEmpty()
            .withMessage("input type is required"),
        body("output")
            .notEmpty()
            .withMessage("output type is required"),
        body("constraints")
            .notEmpty()
            .withMessage("constraints are required"),
        body("tags")
            .notEmpty()
            .withMessage("tags are required"),
        body("inputTestcase")
            .notEmpty()
            .withMessage("Input testcase is required"),
        body("outputTestcase")
            .notEmpty()
            .withMessage("Output testcase is required"),
    ]

const createproblem = async (req, res) => {
    const { id, title, statement, timelimit, difficulty, input, output, constraints, tags, username, inputTestcase, outputTestcase } = req.body;

    // console.log(req.body);

    const existingProblem = await Problem.findOne({ id })
    if (existingProblem) {
        return res.status(400).json({ msg: "Problem with id already exists" })
    }

    const constraints_arr = constraints.split(",")
    // const inputs_arr = input.split(".")
    const tags_arr = tags.split(",")
    const input_tc_arr = inputTestcase.split(",")
    const output_tc_arr = outputTestcase.split(',')

    for (let i = 0; i < input_tc_arr.length; i++) {
        const cleaned = input_tc_arr[i].replace(/\n+$/, "");
        await Testcase.create({ id, input: cleaned, output: output_tc_arr[i] });
    }
    const currentProblem = await Problem.create({ id, title, statement, difficulty, timelimit, input, output, constraints, tags, input_testcase: inputTestcase, output_testcase: outputTestcase })
    const currentuser = await CreatedBy.create({ id, username })

    return res.status(200).json({ id, title, statement, input, output, constraints_arr, tags_arr });

}

const deleteproblem = async (req, res) => {
    const { id } = req.body;
    // console.log(id);
    await Problem.deleteOne({ id: id });
    await CreatedBy.deleteMany({ id: id });
    await Testcase.deleteMany({ id: id });
    res.status(200).json({ msg: "Success" });
}

const fetchproblems = async (req, res) => {
    const response = await Problem.find({}, { _id: 0, id: 1, title: 1, difficulty: 1 })
    // console.log(response);
    res.status(200).json(response)
}

const getproblembyid = async (req, res) => {
    const { id } = req.params;
    const data = await Problem.findOne({ id }, { _id: 0 });

    return res.status(200).json(data);
}

const editproblem = async (req, res) => {
    const { id, title, statement, difficulty, timelimit, input, output, constraints, tags, username, inputTestcase, outputTestcase } = req.body;
    // console.log(constraints,tags)
    const problem = await Problem.findOne({ id });
    problem.title = title;
    problem.statement = statement;
    problem.difficulty = difficulty;
    problem.timelimit = timelimit;
    problem.input = input;
    problem.output = output;
    problem.constraints = constraints;
    problem.tags = tags;
    problem.username = username;
    problem.input_testcase = inputTestcase;
    problem.output_testcase = outputTestcase;

    problem.save();
    await Testcase.deleteMany({ id });
    const input_tc_arr = inputTestcase.split(",")
    const output_tc_arr = outputTestcase.split(',')
    for (let i = 0; i < input_tc_arr.length; i++) {
        const cleaned = input_tc_arr[i].replace(/\n+$/, "");
        await Testcase.create({ id, input: cleaned, output: output_tc_arr[i] });
    }

    return res.status(200).json({ msg: "Problem updated successfully" });
}

const getcreatedproblems = async (req, res) => {
    const { username } = req.query;
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
                id: "$problem.id",
                title: "$problem.title",
                difficulty: "$problem.difficulty",
            }
        }
    ]);
    // console.log("created", response)
    res.status(200).json(response);
}

const getsolvedproblems = async (req, res) => {
    const { username } = req.query;
    const response = await solvedProblem.aggregate([
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
                id: "$problem.id",
                title: "$problem.title",
                difficulty: "$problem.difficulty",
            }
        }
    ]);
    // console.log("created", response)
    res.status(200).json(response);
}

const fetchTestcase = async (req, res) => {
    const { id } = req.body;
    const result = await Testcase.find({ id }, { _id: 0, id: 1, input: 1, output: 1 }).limit(2);
    // console.log(result);

    return res.status(200).json(result);
}
const fetchtestcase_submit = async (req, res) => {
    const { id } = req.body;
    const result = await Testcase.find({ id }, { _id: 0, id: 1, input: 1, output: 1 });
    // console.log(result);

    return res.status(200).json(result);
}

const fetchdata = async (req, res) => {
    const { username } = req.body;
    const total_problems = await Problem.countDocuments();

    res.status(200).json({ total_problems});
}

const fetchdata_user = async (req, res) => {
    const { username } = req.body;
    const total_problems = await Problem.countDocuments();
    // cons solved_problems = await Solved.countDocuments({username});
    res.status(200).json({ total_problems,solved_problems:0});
}

const updateSolved = async(req,res)=>{
    const {username,id,title} = req.body;

    const solved = await solvedProblem.findOne({id,username})

    if(!solved)
        await solvedProblem.create({username,id,title});

}

const deleteaccount = async (req, res) => {
    const { username } = req.body;
    console.log(username)
    const response = await CreatedBy.findOne({ username }, { id: 1, _id: 0 })
    console.log("id", response)
    await User.deleteOne({ username });
    await CreatedBy.deleteMany({ username })
    if (response != null) {
        await Testcase.deleteMany({ id: response.id });
        await Problem.deleteOne({ id: response.id })
    }

    res.status(200).json('deleted Successfully');
}



export { createproblem, deleteproblem, fetchproblems, editproblem, getproblembyid, getcreatedproblems,getsolvedproblems, fetchTestcase,fetchtestcase_submit, fetchdata,fetchdata_user, deleteaccount, updateSolved}