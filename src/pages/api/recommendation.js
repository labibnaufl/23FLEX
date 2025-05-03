import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Validasi body data
    const { title, type, description } = req.body; // Hindari JSON.parse

    // Periksa data input kosong atau tidak valid
    if (!title || !type || !description) {
      return res.status(400).json({ error: "Semua field wajib diisi." });
    }

    try {
      const recommendation = await prisma.recommendation.create({
        data: { title, type, description },
      });
      res.status(200).json(recommendation);
    } catch (error) {
      console.error("Gagal menambahkan rekomendasi:", error.message);
      res.status(500).json({ error: "Gagal menambahkan rekomendasi." });
    }
  } else if (req.method === "GET") {
    try {
      const recommendations = await prisma.recommendation.findMany({
        orderBy: { createdAt: "desc" },
      });
      res.status(200).json(recommendations);
    } catch (error) {
      console.error("Gagal mengambil rekomendasi:", error.message);
      res.status(500).json({ error: "Gagal mengambil rekomendasi." });
    }
  } else {
    res.status(405).json({ error: "Method tidak diizinkan." });
  }
}
