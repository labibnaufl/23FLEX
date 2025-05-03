"use client";

import { useState } from "react";

export default function AdminRecommendationForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const adminId = "ISI_DENGAN_ID_ADMIN_YANG_VALID"; // Bisa ambil dari Prisma Studio dulu

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/recommendation", {
      method: "POST",
      body: JSON.stringify({ title, type, description, adminId }),
    });

    if (res.ok) {
      alert("Rekomendasi berhasil disimpan!");
      setTitle("");
      setType("");
      setDescription("");
    } else {
      alert("Gagal menyimpan rekomendasi");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Tipe"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      ></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Simpan Rekomendasi
      </button>
    </form>
  );
}
