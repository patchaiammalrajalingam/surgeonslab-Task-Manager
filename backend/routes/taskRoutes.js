const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");



/* =========================================
   CREATE TASK
========================================= */

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {
    try {

      const task = await Task.create(
        req.body
      );

      res.json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);



/* =========================================
   GET ALL TASKS
========================================= */

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      let tasks;

      // ADMIN GET ALL TASKS

      if (
        req.user.role === "admin"
      ) {

        tasks =
          await Task.find()
            .populate(
              "assignedTo",
              "name email"
            );

      } else {

        // USER GET OWN TASKS

        tasks =
          await Task.find({
            assignedTo:
              req.user.id,
          }).populate(
            "assignedTo",
            "name email"
          );
      }

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);



/* =========================================
   GET SINGLE TASK
========================================= */

router.get(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const task =
        await Task.findById(
          req.params.id
        ).populate(
          "assignedTo",
          "name email"
        );

      if (!task) {

        return res.status(404).json({
          message:
            "Task not found",
        });
      }

      res.json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);



/* =========================================
   UPDATE TASK
========================================= */

router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const task = await Task.findById(req.params.id);

      if (!task) {

        return res.status(404).json({
          message: "Task not found",
        });

      }

      // USER CAN ONLY UPDATE STATUS

      if (req.user.role === "user") {

        task.status = req.body.status;

      }

      // ADMIN CAN UPDATE EVERYTHING

      if (req.user.role === "admin") {

        Object.assign(task, req.body);

      }

      await task.save();

      res.json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  }
);


/* =========================================
   DELETE TASK
========================================= */

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  async (req, res) => {

    try {

      const task =
        await Task.findByIdAndDelete(
          req.params.id
        );

      if (!task) {

        return res.status(404).json({
          message:
            "Task not found",
        });
      }

      res.json({
        message:
          "Task deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });
    }
  }
);



module.exports = router;