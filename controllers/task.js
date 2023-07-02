import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return next(new ErrorHandler("Tittle is required", 404));
    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "task added succesfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (res, req, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new ErrorHandler("Invalid id", 404));
    task.isCompleted = !task.isCompleted;
    task.save();
    res.status(204).json({
      success: true,
      message: "task updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (res, req, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return next(new ErrorHandler("Invalid id", 404));
    task.deleteOne();
    res.status(200).json({
      success: true,
      message: "task deleted",
    });
  } catch (error) {
    next(error);
  }
};
