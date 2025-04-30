'use server';

import { Button } from '@/components/ui/button';
import { getWorkoutByUser } from "@/actions/schedule";
import Link from 'next/link';
import { EditIcon, PlusIcon } from 'lucide-react';
import DeleteWorkoutButton from '@/components/DeleteWorkoutButton';
import Image from "next/image";
import asset1 from "@/assets/Dumbell.png"

export default async function WorkoutList() {
  const workouts = await getWorkoutByUser();

  return (
<section className="min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_top_right,#fACC15,#FFFFFF_100%)] dark:bg-[radial-gradient(ellipse_200%_100%_at_top_right,#FACC15,#000000_100%)]">      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-md px-6 py-4 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b  from-yellow-400 to-orange-400 text-transparent bg-clip-text mt-6 text-">Catatan Latihan</h1>
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
                <div className="flex items-center gap-4 mt-4">
                  <Button asChild>
                      <Link 
                      href={`/edit/${workout.id}`}
                      className="flex items-center gap-2 bg-yellow-500 text-white hover:bg-yellow-600"
                      >
                        <EditIcon className="w-4 h-4" />
                        <span>Edit</span>
                      </Link>
                  </Button>
                  <DeleteWorkoutButton id={workout.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
          {/* Gambar */}
          <div className="mt-20 md:mt-0 md:flex-1 relative">
            <Image className="hidden lg:block absolute top-[-550px] right-[650px] transform rotate-[-30deg] blur-sm opacity-95" 
            src={asset1} 
            alt="Dumbell" 
            width={250} 
            />
            <Image className="hidden lg:block absolute top-[-250px] right-[650px] transform rotate-[-30deg] blur-sm opacity-95" 
            src={asset1} 
            alt="Dumbell" 
            width={250} 
            />
            <Image className="hidden lg:block absolute top-[-600px] left-[700px] transform rotate-[30deg] blur-sm opacity-95"
            src={asset1} 
            alt="Dumbell"  
            width={350} 
            />
            <Image className="hidden lg:block absolute top-[-250px] left-[600px] transform rotate-[30deg] blur-sm opacity-95" 
            src={asset1} 
            alt="Dumbell" 
            width={300} 
            />
          </div>
      </div>
    </section>
  );
}
