import { Table } from '@/components/Table';
import { computeStandings } from '@/lib/standings';

export default function StandingsPage() {
  const standings = computeStandings();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-gray-500">⚽ Vista general</p>
        <h1 className="text-3xl font-bold tracking-tight">Tabla Principal</h1>
        <p className="max-w-3xl text-sm text-gray-600 sm:text-base">
          La tabla se calcula automáticamente desde los partidos completados. Los puntos, goles y forma reciente se derivan del historial de encuentros.
        </p>
      </header>

      <Table standings={standings} />
    </section>
  );
}
