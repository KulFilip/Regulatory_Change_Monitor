import { Regulation } from '../data/regulations';
import { StatusBadge } from './StatusBadge';
import { JurisdictionBadge } from './JurisdictionBadge';

interface RegulationCardProps {
  regulation: Regulation;
  onClick: () => void;
}

export function RegulationCard({ regulation, onClick }: RegulationCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-5 rounded-lg border border-neutral-100 hover:border-neutral-200 hover:shadow-sm transition-all duration-200 group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2">
            <JurisdictionBadge jurisdiction={regulation.jurisdiction} />
            <StatusBadge status={regulation.status} />
            {regulation.impact === 'high' && (
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider text-red-600 bg-red-50 rounded-full">
                High Impact
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors">
            {regulation.title}
          </h3>
          <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed line-clamp-2">
            {regulation.summary}
          </p>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-[11px] text-neutral-400">{regulation.category}</span>
            <span className="text-neutral-200">·</span>
            <span className="text-[11px] text-neutral-400">{regulation.source}</span>
            <span className="text-neutral-200">·</span>
            <span className="text-[11px] text-neutral-400">{regulation.reference}</span>
          </div>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-[11px] text-neutral-400">
            {formatDate(regulation.date)}
          </p>
        </div>
      </div>
    </button>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IE', { day: 'numeric', month: 'short', year: 'numeric' });
}
