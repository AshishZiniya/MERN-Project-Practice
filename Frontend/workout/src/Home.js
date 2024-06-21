import { useEffect } from "react";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutForm from "./WorkoutForm";
import { useWorkoutContext } from './useWorkoutContext';

export default function Home() {
    const { workouts, dispatch } = useWorkoutContext(); // Destructure workouts directly from context

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/workouts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                // Assuming json is an array, dispatch it directly
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [dispatch]); // No need to include dispatch in dependency array

    return (
        <div className="home">
            <div className="workouts">
                {Array.isArray(workouts) && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}
