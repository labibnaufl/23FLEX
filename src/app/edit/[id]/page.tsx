'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { getWorkoutById, updateWorkout } from '@/actions/schedule';
import { useParams } from 'next/navigation';

type ExerciseItem = {
  id?: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

const workoutTypes = [
  'Full body', 'Upper body', 'Lower body', 'Chest',
  'Shoulder', 'Back', 'Arm', 'Leg', 'Cardio',
];

export default function EditExercisePage() {
  const { id } = useParams(); // Ambil ID workout dari URL
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const workout = await getWorkoutById(id as string);
        setTitle(title);
        setType(type);
        setExercises(exercises);
      } catch (err) {
        alert('Gagal mengambil data workout');
        console.error(err);
      }
    }

    if (id) fetchWorkout();
  }, [id]);

  const handleChangeExercise = (
    index: number,
    field: keyof ExerciseItem,
    value: string | number
  ) => {
    const updated = [...exercises];
    if (field === 'name') {
        updated[index].name = value as string;
    } else if (field === 'sets') {
        updated[index].sets = Number(value);
    } else if (field === 'reps') {
        updated[index].reps = Number(value);
    } else if (field === 'weight') {
        updated[index].weight = Number(value);
    }
    setExercises(updated);

  };

  const handleSubmit = async () => {
    try {
      await updateWorkout(id as string, title, type, exercises);
      alert('Workout berhasil diperbarui!');
      router.push('/dashboard'); // Ganti ke halaman sesuai alurmu
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui workout');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Catatan Latihan</h1>

      <div className="space-y-2">
        <Label>Judul Latihan</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
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
          </div>
        ))}
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        Simpan Perubahan
      </Button>
    </div>
  );
}
