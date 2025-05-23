'use client'

import {
   Dialog, 
   DialogContent, 
   DialogHeader, 
   DialogTitle, 
   DialogTrigger} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { EditIcon } from 'lucide-react';
import { useState } from 'react';
import { ExerciseItem } from '@/actions server/exerciseItem';
import { updateWorkout } from '@/actions server/historyCRUD';

type Workout = {
   id: string;
   title: string;
   createdAt: Date;
   type: string;
   exercise: ExerciseItem[];
};

export function EditWorkoutModal({workout}: {workout: Workout}) {
   const [open, setOpen] = useState(false);
   const [title, setTitle] = useState(workout.title);
   const [type, setType] = useState(workout.type);
   const [exercise, setExercise] = useState<ExerciseItem[]>(workout.exercise);

   const handleChangeExercise = (
      index: number,
      field: keyof ExerciseItem,
      value: string | number
   ) => {
      const updated = [...exercise];
      if (field === 'name') {
         updated[index][field] = value as string;
      } else {
         updated[index][field] = Number(value);
      }
      setExercise(updated);
   };

   const addExerciseField = () => {
      setExercise([...exercise, {name: " ", sets: 0, reps: 0, weight: 0}]);
   };

   const removeExerciseField = (index: number) => {
      const updated = exercise.filter((_, i) => i !== index);
      setExercise(updated);
    };

    const handleSubmit = async () => {
      try {
        await updateWorkout(workout.id, title, type, exercise);
        alert('Workout berhasil diperbarui!');
        setOpen(false);
      } catch (err) {
        console.error(err);
        alert('Gagal memperbarui workout');
      }
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
          <EditIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Edit Latihan</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle
          className="text-center text-sm md:text-[54px] md:leading-[64px] font-bold tracking-tighter bg-gradient-to-b from-yellow-400 to-orange-400 text-transparent bg-clip-text">
            Edit Latihan</DialogTitle>
        </DialogHeader>

      <div className='mb-3'>
               <div className='flex items-center border border-gray-400 bg-white p-6 m-2 rounded-[20px]'>
                  <div className='flex flex-col w-full mr-4'>
                     <label className="text-sm text-gray-500 font-medium py-1">Judul Latihan</label>
                     <input 
                     className="bg-transparent text-sm font-medium outline-none w-full py-1"
                     value={title} 
                     onChange={(e) => 
                     setTitle(e.target.value)} />
                  </div>
               </div>

               <div className='flex items-center border border-gray-400 bg-white p-6 m-2 rounded-[20px]'>
                  <div className='flex flex-col w-full mr-4'>
                     <label className="text-sm text-gray-500 font-medium mb-1 py-1">Jenis Latihan</label>
                     <select
                     className="bg-transparent text-sm font-medium outline-none w-full py-1"
                     value={type}
                     onChange={(e) => setType(e.target.value)}
                     >
                        <option value="">Pilih jenis latihan</option>
                        {[
                           'Full body', 'Upper body', 'Lower body', 'Chest',
                           'Shoulder', 'Back', 'Arm', 'Leg', 'Cardio',
                           ].map((t) => (
                           <option key={t} value={t}>{t}</option>
                        ))}
                     </select>
                  </div>
               </div>

               <div className='flex items-center border border-gray-400 bg-white p-6 m-2 rounded-[20px]'>
                  <div className='flex flex-col w-full mr-4'>
                     <label className="text-sm text-gray-500 font-medium mb-1 py-1">Latihan yang Dilakukan</label>
                     {exercise.map((exercise, index) => (

                        <div key={index} className="mt-4" >
                           <input
                              placeholder="Nama Latihan"
                              value={exercise.name}
                              onChange={(e) => handleChangeExercise(index, 'name', e.target.value)}
                              className='flex w-full items-center border border-gray-400 bg-white p-6 m-2 rounded-[20px]'
                           />

                           <div className="grid grid-cols-3 gap-2">
                              <input
                              className='flex items-center border border-gray-400 bg-white p-6 m-2 rounded-[20px]'
                              type="number"
                              placeholder="Sets"
                              value={exercise.sets}
                              onChange={(e) => handleChangeExercise(index, 'sets', e.target.value)
                                 
                              }
                              />

                              <input
                              className='flex items-center border border-gray-400 bg-white p-6 m-2 rounded-[20px]'
                              type="number"
                              placeholder="Repetisi"
                              value={exercise.reps}
                              onChange={(e) => handleChangeExercise(index, 'reps', e.target.value)}
                              />

                              <input
                              className='flex items-center border border-gray-400 bg-white p-6 m-2 rounded-[20px]'
                              type="number"
                              placeholder="Berat (kg)"
                              value={exercise.weight}
                              onChange={(e) => handleChangeExercise(index, 'weight', e.target.value)}
                              />
                           </div>

                           <Button variant="destructive" onClick={() => removeExerciseField(index)}>
                              Hapus
                           </Button>
                        </div>
                      ))}
                  </div>
               </div>
            <Button variant="outline" onClick={addExerciseField}>+ Tambah Latihan</Button>
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit}>
            Simpan Perubahan
          </Button>
      </DialogContent>
    </Dialog>
    );

}