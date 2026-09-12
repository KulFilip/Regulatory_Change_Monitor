import { Jurisdiction, Status, Category } from '../data/regulations';

interface FilterBarProps {
  selectedJurisdiction: Jurisdiction | 'all';
  selectedStatus: Status | 'all';
  selectedCategory: Category | 'all';
  onJurisdictionChange: (value: Jurisdiction | 'all') => void;
  onStatusChange: (value: Status | 'all') => void;
  onCategoryChange: (value: Category | 'all') => void;
}

const jurisdictions: (Jurisdiction | 'all')[] = ['all', 'EU', 'Ireland', 'UK', 'US'];
const statuses: (Status | 'all')[] = ['all', 'proposed', 'consultation', 'enacted', 'amended', 'withdrawn'];
const categories: (Category | 'all')[] = ['all', 'Banking', 'Markets', 'Insurance', 'Payments', 'Crypto', 'ESG', 'Data', 'AML', 'AI', 'Resilience'];

export function FilterBar({
  selectedJurisdiction,
  selectedStatus,
  selectedCategory,
  onJurisdictionChange,
  onStatusChange,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="space-y-5">
      {/* Jurisdiction */}
      <div>
        <label className="text-xs text-neutral-400 uppercase tracking-wider block mb-2.5">
          Jurisdiction
        </label>
        <div className="flex flex-wrap gap-2">
          {jurisdictions.map((j) => (
            <button
              key={j}
              onClick={() => onJurisdictionChange(j)}
              className={`px-3.5 py-1.5 text-xs rounded-full transition-all duration-200 ${
                selectedJurisdiction === j
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {j === 'all' ? 'All' : j}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="text-xs text-neutral-400 uppercase tracking-wider block mb-2.5">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`px-3.5 py-1.5 text-xs rounded-full transition-all duration-200 ${
                selectedStatus === s
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {s === 'all' ? 'All' : capitalize(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs text-neutral-400 uppercase tracking-wider block mb-2.5">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onCategoryChange(c)}
              className={`px-3.5 py-1.5 text-xs rounded-full transition-all duration-200 ${
                selectedCategory === c
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
