'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createWorkout } from '@/actions server/exercise';
import asset1 from '@/assets/Dumbell.png'
import Image from 'next/image';
import { ExerciseItem } from "@/actions server/exerciseItem";
import { LucideArrowUpDown } from 'lucide-react';

const workoutTypes = [
  'Full body', 'Upper body', 'Lower body', 'Chest',
  'Shoulder', 'Back', 'Arm', 'Leg', 'Cardio',
];

export const CatatLatihan = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [exercises, setExercises] = useState<ExerciseItem[]>([
    { name: '', sets: 0, reps: 0, weight: 0 },
  ]);

  const handleChangeExercise = (
    index: number,
    field: keyof ExerciseItem,
    value: string | number
  ) => {
    const updated = [...exercises];
    if (field === 'name') {
      updated[index][field] = value as string;
    } else {
      updated[index][field] = Number(value) as number;
    }
    setExercises(updated);
  };

  const addExerciseField = () => {
    setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0 }]);
  };

  const removeExerciseField = (index: number) => {
    const updated = exercises.filter((_, i) => i !== index);
    setExercises(updated);
  };

  const handleSubmit = async () => {
    try {
      await createWorkout(title, type, exercises);
      alert('Workout berhasil disimpan!');
      setTitle('');
      setType('');
      setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }]);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan workout');
    }
  };

  return (
    <section className='relative bg-gradient-to-b from-white to-yellow-400 py-24 dark:bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#FACC15,#000000_100%)] overflow-clip'>
      <div className='container'>
        <div className='className="max-w-[540px] mx-auto "'>
          <div className="flex justify-center">
            <div className="text-sm inline-flex font-semibold border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight dark:border-[#fff]/20 ">
              Simpan dan pantau latihanmu di sini.
            </div>
          </div>
          <h2 className="pb-2 text-center text-3xl md:text-[54px] md:leading-[64px] font-bold tracking-tighter bg-gradient-to-b from-yellow-400 to-orange-400 text-transparent bg-clip-text mt-5">
            Catat Latihan Kamu Sekarang
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-black dark:text-white mt-5">
            Mulai catat latihanmu hari ini — lihat seberapa jauh kamu telah berkembang!
          </p>
        </div>

        <div 
         className="mx-auto p-2 rounded-[24px] shadow-xl 
                   bg-white/30 backdrop-blur-md border border-white/20 
                  max-w-md sm:max-w-lg lg:max-w-2xl mt-5">

          {/* FORM INPUT */}
        
          <div className='flex items-center bg-white p-6 m-2 rounded-[20px]'>
            <div className='flex flex-col w-full mr-4'>
              <label className="text-sm text-gray-500 font-medium mb-1 py-1">
                Judul Latihan
              </label>
              <input 
                className="bg-transparent text-sm font-medium outline-none w-full py-1"
                value={title} 
                onChange={(e)  => setTitle(e.target.value) } 
                placeholder='Contoh : Push Day'
              />
            </div>
          </div>

          <div className='flex items-center bg-white p-6 m-2 rounded-[20px]'>
            <div className='flex flex-col w-full mr-4'>
                  <label className='text-sm text-gray-500 font-medium mb-1 py-1'>
                    Jenis Latihan
                  </label>
                  <select 
                    className="bg-transparent text-sm font-medium outline-none w-full py-1 text-[#a7a7a7]"
                    value={type}
                    onChange={(e) => setType(e.target.value)}>
                      <option
                        value='' disabled hidden>
                          Pilih Jenis Latihan
                      </option>
                      {workoutTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
                    </select>
            </div>
          </div>
          
          {/*Nama Latihan*/}

          {exercises.map ((exercise, index) => (
            <div key={index} className='max-w-sm mx-auto mb-5 p-2 rounded-[24px] shadow-xl bg-[#f7f7d3] sm:max-w-[480px] lg:max-w-2xl'>
              <div className='flex items-center bg-white p-6 m-2 rounded-[20px]'>
                <div className='flex flex-col w-full mr-4'>
                  <label className="text-sm text-gray-500 font-medium mb-1 py-1">
                    Nama Latihan
                  </label>
                  <input
                   placeholder='Contoh : Bench Press'
                   value = {exercise.name}
                   onChange={(e) => handleChangeExercise(index, 'name', e.target.value)}
                   className='bg-transparent text-sm font-medium outline-none w-full py-1'
                   />
                </div>
              </div>
                  
              <div key={index}>                    
                <div className='grid grid-cols-3 gap-4'>
                  <div className='flex items-center bg-white p-6 m-2 rounded-[20px]'>
                    <input
                      className="bg-transparent text-sm font-medium outline-none w-full py-1"
                      placeholder='Jumlah Set'
                      type ='number'
                      min='0'
                      value = {exercise.sets === 0 ? '' : exercise.sets}
                      onChange={(e) => handleChangeExercise(index, 'sets', e.target.value)}
                    />
                  </div>

                  <div className='flex items-center bg-white p-6 m-2 rounded-[20px]'>
                    <input
                      className="bg-transparent text-sm font-medium outline-none w-full py-1"
                      placeholder='Jumlah Repetisi'
                      type='number'
                      min='0'
                      value={exercise.reps === 0 ? '' : exercise.reps}
                      onChange={(e) => handleChangeExercise(index, 'reps', e.target.value)}
                    />
                  </div>

                  <div className='flex items-center bg-white p-6 m-2 rounded-[20px]'>
                    <input
                      className="bg-transparent text-sm font-medium outline-none w-full py-1"
                      placeholder='Beban (Kg)'
                      type = 'number'
                      min='0'
                      value ={exercise.weight === 0 ? '' : exercise.weight}
                      onChange={(e) => handleChangeExercise(index, 'weight', e.target.value)}
                    />
                  </div>
                  
                </div>
                

                {exercises.length > 1 && (
                  <Button variant='destructive' onClick={() => removeExerciseField(index)}>
                    Hapus Latihan
                  </Button>
                )}
              </div>
            </div>
          ))}

          <div className='flex items-center gap-2 mt-8 m-5'>
            <Button variant="default" onClick={addExerciseField}>
              + Tambah Latihan
            </Button>

            <Button className= 
            'bg-yellow-400 border border-black hover:bg-yellow-500 text-black dark:text-black' onClick={handleSubmit}>
              Simpan
            </Button>
          </div>
          
            <div>
              <Image
                width={150}
                height={150}
                src={asset1}
                alt='dumbell 1'
                className="lg:block absolute  -left-[200px] -top-[50px] transform rotate-[-30deg]
                hidden blur-sm opacity-95" 
              />
            </div>

            <div>
              <Image
                width={200}
                height={200}
                src={asset1}
                alt='dumbell 2'
                className="lg:block absolute  -right-[250px] -top-[30px] transform rotate-[-30deg]
                blur-sm opacity-95" 
              />
            </div>

            <div>
              <Image
                width={250}
                height={250}
                src={asset1}
                alt='dumbell 3'
                className="lg:block absolute  -left-[230px] -bottom-[20px] transform rotate-[-30deg]
                blur-sm opacity-95" 
              />
            </div>

            <div>
              <Image
                width={300}
                height={300}
                src={asset1}
                alt='dumbell 4'
                className="lg:block absolute -right-[280px] 
                -bottom-[100px] transform rotate-[30deg]
                blur-sm opacity-95" 
              />
            </div>
            
          </div>
      </div>
    </section>
  );
};
