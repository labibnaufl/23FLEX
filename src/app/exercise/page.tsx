'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createWorkout } from '@/actions/exercise';

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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Catat Latihan</h1>

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
  );
}
