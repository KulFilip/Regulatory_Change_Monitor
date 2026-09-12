import { Regulation } from '../data/regulations';

interface StatsOverviewProps {
  regulations: Regulation[];
}

export function StatsOverview({ regulations }: StatsOverviewProps) {
  const total = regulations.length;
  const enacted = regulations.filter((r) => r.status === 'enacted').length;
  const consultation = regulations.filter((r) => r.status === 'consultation').length;
  const proposed = regulations.filter((r) => r.status === 'proposed').length;
  const highImpact = regulations.filter((r) => r.impact === 'high').length;

  const stats = [
    { label: 'Total Tracked', value: total, accent: false },
    { label: 'Enacted', value: enacted, accent: false },
    { label: 'In Consultation', value: consultation, accent: false },
    { label: 'Proposed', value: proposed, accent: false },
    { label: 'High Impact', value: highImpact, accent: true },
  ];

  return (
    <div className="border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-5 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-2xl font-light ${stat.accent ? 'text-red-600' : 'text-neutral-900'}`}>
                {stat.value}
              </p>
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
