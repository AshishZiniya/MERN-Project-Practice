const Workout = require('../Models/Workout')
const mongoose = require('mongoose')

// Create New Workout

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields',emptyFields})
    }

    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//Get All Workouts

const getWorkouts = async (req, res) => {
    const workout = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workout)
}

//Get a single Workouts

const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({ error: 'No Such Workout' })
    }

    res.status(200).json(workout)
}

// delete a Workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: 'No Such Workout' })
    }

    res.status(200).json(workout)
}

// Update a Workout

const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No Such Workout' })
    }

    const workout = Workout.findOneAndUpdate({ _id: id })

    if (!workout) {
        return res.status(404).json({ error: 'No Such Workout' })
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}