import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Domina las matemáticas con ChronoMaths
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Mejora tus habilidades matemáticas con ejercicios cronometrados y desafíos personalizados. Aprende a tu ritmo y lleva un registro de tu progreso.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/auth"
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                Comenzar ahora
              </Link>
              <Link
                href="#caracteristicas"
                className=" bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg border border-gray-200 transition duration-200 shadow-md hover:shadow-lg"
              >
                Conoce más
              </Link>
            </div>
          </div>

          <section id="caracteristicas" className="mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">¿Por qué elegir ChronoMaths?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Ejercicios cronometrados',
                  description: 'Mejora tu velocidad y precisión con desafíos contra el reloj.',
                  icon: '⏱️'
                },
                {
                  title: 'Seguimiento de progreso',
                  description: 'Observa tu mejora con estadísticas detalladas de tu rendimiento.',
                  icon: '📊'
                },
                {
                  title: 'Aprendizaje personalizado',
                  description: 'Ejercicios adaptados a tu nivel y ritmo de aprendizaje.',
                  icon: '🎯'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-100 hover:gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-24 bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Listo para comenzar?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Únete a miles de estudiantes que ya están mejorando sus habilidades matemáticas con ChronoMaths.
            </p>
            <Link
              href="/auth"
              className="inline-block bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Empieza gratis
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} ChronoMaths. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
