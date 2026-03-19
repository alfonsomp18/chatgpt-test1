import { Table } from '@/components/Table';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.20),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-card sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-emerald-200">
                <span>⚽</span>
                Standings oficiales
              </p>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Torneo Interno de Futbol de TR
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
                Consulta la tabla general del torneo con los datos actualizados y orden automático por puntos en forma ascendente.
                Consulta la tabla general del torneo, con estadísticas completas, orden automático por puntos y rendimiento reciente por equipo.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm backdrop-blur-sm">
              <div>
                <p className="text-2xl font-bold text-white">5</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Equipos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Jornadas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Top 3</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Destacado</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Tabla de posiciones</h2>
              <p className="text-sm text-slate-600">
                Desliza horizontalmente en móvil para ver todas las columnas.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm">✅ Victoria</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm">➖ Empate</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 shadow-sm">❌ Derrota</span>
            </div>
          </div>

          <Table />
        </section>
      </div>
    </main>
  );
}
