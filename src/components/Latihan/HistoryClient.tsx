'use client';

import { useState, useEffect, useTransition } from "react";
import { ExerciseItem } from "@/actions server/exerciseItem";
import { Button } from "../ui/button";
import { Search, TrashIcon, EditIcon } from "lucide-react";
import { deleteWorkout } from "@/actions server/historyCRUD";
import { useRouter } from "next/navigation";
import { EditWorkoutModal } from "./EditModal";

type Workout = {
   id: string;
   title: string;
   createdAt: Date;
   type: string;
   exercise: ExerciseItem[];
};

function DeleteWorkoutButton({id}: {id: string}) {
   const [isPending, startTransition] = useTransition();
   const router = useRouter();

   const handleDelete = () => {
      const confirmDelete = confirm('Yakin Mau Hapus Catatan Latihan Ini?');
      if (!confirmDelete) return;

      startTransition(async() => {
         await deleteWorkout(id);
         router.refresh();
      });
   };

   return(
      <Button
         variant='destructive'
         className="flex items-center gap 2"
         onClick={handleDelete}
         disabled={isPending}
         >
         <TrashIcon className="w-4 h-4"/>
         <span className="hidden lg:inline">{isPending ? 'Menghapus...' : 'Hapus Latihan'}</span>
      </Button>
   );
}


export function WorkoutListClient({workouts}: {workouts: Workout[] }) {
   const [searchTerm, setSearchTerm] = useState('')
   const [filteredsWorkouts,  setFilteredWorkouts] = useState(workouts);

   useEffect(() => {
      const filtered = workouts.filter((w) =>
      w.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredWorkouts(filtered);
   }, [searchTerm, workouts]);

   return (
      <>
         {/* Search Bar */}
         <div className='flex items-center bg-[#fffff3] w-[633px] px-4 py-2 mb-4 rounded-lg'>
            <div className="flex flex-row items-center w-full mr-4">
               <input
                  className="bg-transparent text-sm font-medium outline-none w-full py-1"
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Masukin Judul Latihan Kamu"
                  
               />

               <Button variant="ghost" size="icon" className="text-gray-500 hover:text-black -mr-6">
                  <Search className="w-3 h-3" />
               </Button>
            </div>
         </div>

         {/*Workout List*/}
         <div className='max-h-[400px] overflow-y-auto pr-2 scrollbar-custom'>
                  <div className='space-y-4'>
                     {filteredsWorkouts.map((workout) => (
                        <div key={workout.id} className='border p-4 rounded-lg shadow bg-[#fffff3]'>
                           <h2 className='text-lg font-semibold'>
                              {workout.title}
                           </h2>
                           <p className="text-sm text-gray-500">
                              {new Date(workout.createdAt).toLocaleDateString()}
                           </p>
                           <p className="text-sm text-gray-500">
                              {workout.type}
                           </p>
                           <ul className='mt-2 list-disc list-inside'>
                              {workout.exercise.map((ex) => (
                                 <li className="mt-2 list-disc list-inside">
                                    {ex.name} - {ex.sets } Set x {ex.reps} Repetisi ({ex.weight}kg)
                                 </li>
                              ))}
                           </ul>

                           <div className="flex items-center gap-4 mt-4">
                              <EditWorkoutModal workout={workout} />
                              <DeleteWorkoutButton id={workout.id}/>

                           </div>
                        </div>
                     ))}
                  </div>
               </div>
      </>
   );
}
