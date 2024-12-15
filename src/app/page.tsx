import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <main className="max-w-7xl mx-auto">
        <div className="py-6">
          <h1 className="text-3xl font-bold mb-2 text-white">
            Grind 169 questions
          </h1>
          <p className="text-sm text-gray-400">
            Spaced Repetition Study App
          </p>
        </div>

        {/* You can keep or remove the existing content as needed */}
      </main>
    </div>
  );
}
