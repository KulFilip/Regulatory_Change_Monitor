import { Jurisdiction } from '../data/regulations';

interface JurisdictionBadgeProps {
  jurisdiction: Jurisdiction;
}

const jurisdictionConfig: Record<Jurisdiction, { label: string; className: string }> = {
  EU: {
    label: 'EU',
    className: 'bg-blue-50 text-blue-800',
  },
  Ireland: {
    label: 'IE',
    className: 'bg-emerald-50 text-emerald-800',
  },
  UK: {
    label: 'UK',
    className: 'bg-rose-50 text-rose-800',
  },
  US: {
    label: 'US',
    className: 'bg-indigo-50 text-indigo-800',
  },
};

export function JurisdictionBadge({ jurisdiction }: JurisdictionBadgeProps) {
  const config = jurisdictionConfig[jurisdiction];
  return (
    <span className={`px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}
