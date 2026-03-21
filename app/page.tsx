import { Table } from '@/components/Table';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="space-y-3">
          <p className="text-sm font-medium text-gray-500">⚽ Tabla oficial</p>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Torneo Interno de Futbol de TR
            </h1>
            <p className="max-w-2xl text-sm text-gray-600 sm:text-base">
              Datos temporales cargados para asegurar una compilación estable y un despliegue exitoso en Vercel.
            </p>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            <p>Ordenado por puntos, diferencia de gol y goles a favor.</p>
            <div className="flex flex-wrap gap-4">
              <span>✅ Victoria</span>
              <span>➖ Empate</span>
              <span>❌ Derrota</span>
            </div>
          </div>

          <Table />
        </section>
      </div>
    </main>
  );
}
