import { getWorkoutsByUser } from "@/actions/schedule";

export default async function WorkoutList() {
  const workouts = await getWorkoutsByUser();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Catatan Latihan</h1>
        <div className="space-y-6">
        {workouts.map((workout) => (
            <div key={workout.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{workout.title}</h2>
            <p className="text-sm text-gray-500">{workout.type}</p>
            <ul className="mt-2 space-y-1 text-sm">
                {workout.exercise.map((ex) => (
                <li key={ex.id}>
                    {ex.name} – {ex.sets} set × {ex.reps} rep @ {ex.weight} kg
                </li>
                ))}
            </ul>
            </div>
        ))}
        </div>
    </div>
  );
}
