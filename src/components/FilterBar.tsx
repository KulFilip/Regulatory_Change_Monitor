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
    <div className="space-y-6">
      {/* Jurisdiction */}
      <div>
        <label className="text-xs text-neutral-400 uppercase tracking-wider block mb-3 font-medium">
          Jurisdiction
        </label>
        <div className="flex flex-wrap gap-2">
          {jurisdictions.map((j) => (
            <button
              key={j}
              type="button"
              onClick={() => onJurisdictionChange(j)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 border ${
                selectedJurisdiction === j
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
              }`}
            >
              {j === 'all' ? 'All' : j}
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="text-xs text-neutral-400 uppercase tracking-wider block mb-3 font-medium">
          Status
        </label>
        <div className="flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onStatusChange(s)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 border ${
                selectedStatus === s
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
              }`}
            >
              {s === 'all' ? 'All' : capitalize(s)}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-xs text-neutral-400 uppercase tracking-wider block mb-3 font-medium">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCategoryChange(c)}
              className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 border ${
                selectedCategory === c
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
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
