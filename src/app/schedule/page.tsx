'use server';

import { Button } from '@/components/ui/button';
import { getWorkoutByUser } from "@/actions/schedule";
import Link from 'next/link';
import { EditIcon, PlusIcon } from 'lucide-react';
import DeleteWorkoutButton from '@/components/DeleteWorkoutButton';

export default async function WorkoutList() {
  const workouts = await getWorkoutByUser();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Catatan Latihan</h1>
        <Button asChild className="flex items-center gap-2">
          <Link href="/exercise">
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Tambah Latihan</span>
          </Link>
        </Button>
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
            <Button variant="ghost" className="flex items-center gap-2" asChild>
                <Link href={`/edit/${workout.id}`}>
                  <EditIcon className="w-4 h-4" />
                  <span className="hidden lg:inline">Edit</span>
                </Link>
            </Button>
            <DeleteWorkoutButton id={workout.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
