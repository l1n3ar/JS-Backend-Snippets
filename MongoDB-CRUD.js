
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalsModel');

//@desc : Get all your goals
//@route : GET /api/goals
//@access : private
const getGoals = asyncHandler(async (req, res, next) => {
  const goals = await Goal.find();
  res.status(200).send(goals);
});

//@desc : Create a goal
//@route : POST /api/goals
//@access : private
const createGoal = asyncHandler(async (req, res, next) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please enter a text field');
  } else {
    const newGoal = await Goal.create({
      text: req.body.text,
    });
    res.status(200).send(newGoal);
  }
});

//@desc : Edit an existing goal
//@route : PUT /api/goals/:id
//@access : private
const editGoal = asyncHandler(async (req, res, next) => {
  const goalToBeUpdated = await Goal.findById(req.params.id);
  if (!goalToBeUpdated) {
    res.status(400);
    throw new Error('Goal not found');
  } else {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
      },
      {
        new: true,
      }
    );
    res.status(200).send(updatedGoal);
  }
});

//@desc : Delete an existing goal
//@route : DELETE /api/goals/:id
//@access : private
const deleteGoal = asyncHandler(async (req, res, next) => {
  const goalToBeDeleted = await Goal.findById(req.params.id);
  if (!goalToBeDeleted) {
    res.status(400);
    throw new Error('Goal Not Found');
  } else {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedGoal);
  }
});

module.exports = {
  getGoals,
  createGoal,
  editGoal,
  deleteGoal,
};
