import { validationResult } from "express-validator"

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return validation errors in a standard JSON format
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validateRequest