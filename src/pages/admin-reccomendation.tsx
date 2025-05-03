'use client';

import { useState, useEffect } from "react";

// Tipe data rekomendasi
type Recommendation = {
  id: string;
  title: string;
  type: string;
  description: string;
};

type AdminRecommendationPageProps = {
  someProp?: string; // Contoh tipe props jika ada properti tertentu
};

export default function AdminRecommendationPage(props: AdminRecommendationPageProps) { // Explicitly define the type of props here
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Fungsi untuk mengambil data rekomendasi dari API
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

  // Fetch data rekomendasi saat pertama kali halaman dimuat
  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Fungsi untuk menambahkan rekomendasi baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, type, description }),
      });
      if (!response.ok) throw new Error("Gagal menambahkan rekomendasi");
      alert("Rekomendasi berhasil ditambahkan!");
      setTitle("");
      setType("");
      setDescription("");
      fetchRecommendations(); // Refresh daftar rekomendasi
    } catch (error) {
      console.error("Gagal menambahkan rekomendasi:", error);
    }
  };

  // Fungsi untuk menghapus rekomendasi
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/recommendations/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Gagal menghapus rekomendasi");
      alert("Rekomendasi berhasil dihapus!");
      fetchRecommendations(); // Refresh daftar rekomendasi
    } catch (error) {
      console.error("Gagal menghapus rekomendasi:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin: Tambahkan Rekomendasi Latihan</h1>

      {/* Form untuk input rekomendasi */}
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Tambah Rekomendasi Baru</h2>
        <input
          type="text"
          placeholder="Judul Rekomendasi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Jenis Latihan"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        ></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Tambah Rekomendasi
        </button>
      </form>

      {/* Daftar rekomendasi latihan */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Daftar Rekomendasi</h2>
        {recommendations.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-3">Judul</th>
                <th className="border-b p-3">Jenis</th>
                <th className="border-b p-3">Deskripsi</th>
                <th className="border-b p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((rec) => (
                <tr key={rec.id}>
                  <td className="border-b p-3">{rec.title}</td>
                  <td className="border-b p-3">{rec.type}</td>
                  <td className="border-b p-3">{rec.description}</td>
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