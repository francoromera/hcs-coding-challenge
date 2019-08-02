const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const error = require('../helpers/response').error;
const withSession = require('../helpers/middleware').withSession;

router.get('/', withSession, async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.session.userId }).exec();
    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', withSession, async (req, res, next) => {
  try {
    const task = await Task.findOne({ user: req.session.userId, _id: req.params.id }).exec();
    if (!task) {
      return error(next, 404, 'Task not found');
    }
    return res.json(task);
  } catch (error) {
    return next(error);
  }
});

router.post('/', withSession, async (req, res, next) => {
  if (!req.body.description || !req.body.due) {
    return error(next, 400, 'Description and due date are required');
  }
  try {
    const result = await Task.create({
      description: req.body.description,
      due: req.body.due,
      user: req.session.userId
    });
    return res.redirect(`/task/${result._id}`);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id', withSession, async (req, res, next) => {
  try {
    const task = await Task.findOne({ user: req.session.userId, _id: req.params.id }).exec();
    if (!task) {
      return error(next, 404, 'Task not found');
    }
    if (req.body.description) {
      task.description = req.body.description;
    }
    if (req.body.due) {
      task.due = req.body.due;
    }
    await task.save();
    return res.json(task);
  } catch (error) {
    return next(error);
  }
});

router.put('/:id', withSession, async (req, res, next) => {
  try {
    if (!req.body.description || !req.body.due) {
      return error(next, 400, 'Description and due date are required');
    }
    const task = await Task.findOne({ user: req.session.userId, _id: req.params.id }).exec();
    if (!task) {
      return error(next, 404, 'Task not found');
    }
    task.description = req.body.description;
    task.due = req.body.due;
    await task.save();
    return res.json(task);
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', withSession, async (req, res, next) => {
  try {
    const task = await Task.findOne({ user: req.session.userId, _id: req.params.id }).exec();
    if (!task) {
      return error(next, 404, 'Task not found');
    }
    await task.remove();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
