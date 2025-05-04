'use client';

import { useState, useEffect } from "react";

// Tipe data recommendation
type Recommendation = {
  id: string;
  title: string; // Judul latihan baru
  type: string; // Jenis latihan
  exercises: ExerciseItem[];
};

type ExerciseItem = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
};

export default function RecommendationPage() {
  // State untuk judul, jenis latihan, dan daftar latihan
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [exercises, setExercises] = useState<ExerciseItem[]>([
    { name: '', sets: 0, reps: 0, weight: 0 },
  ]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Fetch rekomendasi saat pertama kali halaman dimuat
  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Fungsi mengambil rekomendasi dari API
  const fetchRecommendations = async () => {
    try {
      const response = await fetch("/api/recommendations", { method: "GET" });
      if (!response.ok) throw new Error("Gagal mengambil data rekomendasi");
      const data: Recommendation[] = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Gagal mengambil rekomendasi:", error);
    }
  };

  // Menambahkan latihan baru ke daftar
  const addExerciseField = () => {
    setExercises([...exercises, { name: '', sets: 0, reps: 0, weight: 0 }]);
  };

  // Menghapus latihan tertentu
  const removeExerciseField = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  // Perubahan pada setiap latihan dalam daftar
  const handleChangeExercise = (
    index: number,
    field: keyof ExerciseItem,
    value: string | number
  ) => {
    const updated = [...exercises];
    if (field === 'name') {
      updated[index][field] = value as string;
    } else {
      updated[index][field] = Number(value);
    }
    setExercises(updated);
  };

  // Menambahkan rekomendasi baru (dengan judul latihan dan banyak latihan)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, type, exercises }),
      });
      if (!response.ok) throw new Error("Gagal menambahkan rekomendasi");
      alert("Rekomendasi berhasil ditambahkan!");
      setTitle("");
      setType("");
      setExercises([{ name: '', sets: 0, reps: 0, weight: 0 }]);
      fetchRecommendations(); // Refresh daftar rekomendasi
    } catch (error) {
      console.error("Gagal menambahkan rekomendasi:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Rekomendasi Latihan</h1>

      {/* Form untuk input rekomendasi */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Tambah Rekomendasi Baru</h2>
        <input
          type="text"
          placeholder="Judul Latihan (misal: Push Day)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Jenis Latihan (misal: Chest, Back, Legs)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        <div className="space-y-4">
          <h3 className="font-semibold">Latihan dalam rekomendasi ini</h3>
          {exercises.map((exercise, index) => (
            <div key={index} className="border p-4 rounded space-y-2">
              <input
                type="text"
                placeholder="Nama Latihan"
                value={exercise.name}
                onChange={(e) => handleChangeExercise(index, 'name', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  placeholder="Set"
                  value={exercise.sets}
                  onChange={(e) => handleChangeExercise(index, 'sets', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Repetisi"
                  value={exercise.reps}
                  onChange={(e) => handleChangeExercise(index, 'reps', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Beban (kg)"
                  value={exercise.weight}
                  onChange={(e) => handleChangeExercise(index, 'weight', e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              {exercises.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExerciseField(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addExerciseField}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            + Tambah Latihan
          </button>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4">
          Simpan Rekomendasi
        </button>
      </form>

      {/* Daftar rekomendasi */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Rekomendasi</h2>
        {recommendations.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-3">Judul Latihan</th>
                <th className="border-b p-3">Jenis Latihan</th>
                <th className="border-b p-3">Detail Latihan</th>
                <th className="border-b p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec) => (
                <tr key={rec.id}>
                  <td className="border-b p-3">{rec.title}</td>
                  <td className="border-b p-3">{rec.type}</td>
                  <td className="border-b p-3">
                    {rec.exercises.map((ex) => (
                      <p key={ex.name}>{ex.name} - {ex.sets}x{ex.reps} ({ex.weight}kg)</p>
                    ))}
                  </td>
                  <td className="border-b p-3">
                    <button
                      onClick={() => handleDelete(rec.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Belum ada rekomendasi tersedia.</p>
        )}
      </section>
    </div>
  );
}
