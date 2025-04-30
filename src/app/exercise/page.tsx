'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createWorkout } from '@/actions/exercise';
import Image from "next/image";
import asset1 from "@/assets/Kettle.png"

type ExerciseItem = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

const workoutTypes = [
  'Full body', 'Upper body', 'Lower body', 'Chest',
  'Shoulder', 'Back', 'Arm', 'Leg', 'Cardio',
];

export default function AddExercisePage() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [exercises, setExercises] = useState<ExerciseItem[]>([
    { name: '', sets: 0, reps: 0, weight: 0 },
  ]);

  // ✅ Fix TS2322 error with type assertion
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
    <section className="min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_top_left,#fACC15,#FFFFFF_100%)] dark:bg-[radial-gradient(ellipse_200%_100%_at_top_left,#FACC15,#000000_100%)]">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-md px-6 py-4 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b  from-yellow-400 to-orange-400 text-transparent bg-clip-text mt-6 text-">Catat Latihan</h1>

          <div className="space-y-2">
            <Label>Judul Latihan</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Push Day" />
          </div>

          <div className="space-y-2">
            <Label>Jenis Latihan</Label>
            <select
              className="w-full border rounded p-2"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Pilih jenis latihan</option>
              {workoutTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <Label>Latihan yang Dilakukan</Label>
            {exercises.map((exercise, index) => (
              <div key={index} className="space-y-2 border p-4 rounded">
                <Input
                  placeholder="Nama Latihan"
                  value={exercise.name}
                  onChange={(e) => handleChangeExercise(index, 'name', e.target.value)}
                />
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    type="number"
                    placeholder="Set"
                    value={exercise.sets}
                    onChange={(e) => handleChangeExercise(index, 'sets', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Repetisi"
                    value={exercise.reps}
                    onChange={(e) => handleChangeExercise(index, 'reps', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Weight"
                    value={exercise.weight}
                    onChange={(e) => handleChangeExercise(index, 'weight', e.target.value)}
                  />
                </div>
                {exercises.length > 1 && (
                  <Button variant="destructive" onClick={() => removeExerciseField(index)}>
                    Hapus
                  </Button>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={addExerciseField}>
              + Tambah Latihan
            </Button>
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Simpan
          </Button>
        </div>
        {/* Gambar */}
        <div className="mt-20 md:mt-0 md:flex-1 relative">
          <Image className="hidden lg:block absolute top-[-550px] right-[650px] blur-sm opacity-95" 
          src={asset1} 
          alt="Kettle" 
          width={150} 
          />
          <Image className="hidden lg:block absolute top-[-250px] right-[650px] blur-sm opacity-95" 
          src={asset1} 
          alt="Kettle" 
          width={250} 
          />
          <Image className="hidden lg:block absolute top-[-600px] left-[700px] blur-sm opacity-95"
          src={asset1} 
          alt="Kettle"  
          width={250} 
          />
          <Image className="hidden lg:block absolute top-[-250px] left-[600px] blur-sm opacity-95" 
          src={asset1} 
          alt="Dumbell" 
          width={300} 
          />
        </div>
      </div>
    </section>
  );
}
