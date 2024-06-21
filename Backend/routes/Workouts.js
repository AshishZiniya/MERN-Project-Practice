const express = require("express")
const Workout = require('../Models/Workout')
const router = express.Router()
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../Controllers/workoutControllers')

router.get('/', getWorkouts)

router.get('/:id', getWorkout)

router.post('/', createWorkout)

router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)

module.exports = router