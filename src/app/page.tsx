import { CallToAction } from "@/components/Landing page/CTA";
import { Footer } from "@/components/footer";
<<<<<<< HEAD
import { Hero } from "@/components/Landing page/Hero";
import { Product } from "@/components/Landing page/Product";
import { Testimonials } from "@/components/Landing page/Testimonial";
import { TextScroll } from "@/components/Landing page/Textscroll";
=======
import { Hero } from "@/components/Hero";
import { Product } from "@/components/Product";
import { Testimonials } from "@/components/Testimonial";
import { TextScroll } from "@/components/Textscroll";
import prisma from "@/lib/prisma"; // ✅ gunakan default import
>>>>>>> ea6fda7e99e7f495c6a1088d85d386d4163970ec

export default async function Home() {
  const recommendations = await prisma.recommendation.findMany({
    include: {
      admin: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
<<<<<<< HEAD
      <Hero/>
      <TextScroll/>
      <Product/>
      <Testimonials/>
      <CallToAction/>
=======
      <Hero />
      <TextScroll />
      <Product />
      <Testimonials />

      {/* ✅ Section Rekomendasi */}
      <section className="bg-gray-50 py-12 px-4 sm:px-8 md:px-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Rekomendasi Admin</h2>
        {recommendations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2">{rec.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Tipe:</strong> {rec.type}
                </p>
                <p className="text-gray-700 mb-3">{rec.description}</p>
                <p className="text-xs text-gray-500">Oleh: {rec.admin.username}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Belum ada rekomendasi yang tersedia.</p>
        )}
      </section>

      <CallToAction />
      <Footer />
>>>>>>> ea6fda7e99e7f495c6a1088d85d386d4163970ec
    </>
  );
}
