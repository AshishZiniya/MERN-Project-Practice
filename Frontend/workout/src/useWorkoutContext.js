import { useContext } from "react";
import { WorkoutContext } from "./WorkoutContext";

export function useWorkoutContext() { // Changed to named export
    const context = useContext(WorkoutContext);

    if (!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutContextProvider');
    }

    return context;
}
