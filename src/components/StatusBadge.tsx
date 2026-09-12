import { Status } from '../data/regulations';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  proposed: {
    label: 'Proposed',
    className: 'bg-amber-50 text-amber-700',
  },
  consultation: {
    label: 'Consultation',
    className: 'bg-blue-50 text-blue-700',
  },
  enacted: {
    label: 'Enacted',
    className: 'bg-emerald-50 text-emerald-700',
  },
  amended: {
    label: 'Amended',
    className: 'bg-violet-50 text-violet-700',
  },
  withdrawn: {
    label: 'Withdrawn',
    className: 'bg-neutral-100 text-neutral-500',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}
