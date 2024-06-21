import { useState } from "react";
import { useWorkoutContext } from './useWorkoutContext'

export default function WorkoutForm() {
    const { dispatch } = useWorkoutContext()

    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, reps, load };

        try {
            const response = await fetch('/api/workouts', {
                method: 'POST',
                body: JSON.stringify(workout),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (!response.ok) {
                if (json.emptyFields) {
                    setEmptyFields(json.emptyFields);
                }
                throw new Error(json.error);
            }

            setTitle('');
            setReps('');
            setLoad('');
            setError('');
            setEmptyFields([]);
            console.log('New Workout Added', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
        } catch (error) {
            console.error('Error adding workout:', error.message);
            setError(error.message);
        }
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};
