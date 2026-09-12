import { useState } from 'react';
import { regulations, Regulation, Jurisdiction, Status, Category } from './data/regulations';
import { FilterBar } from './components/FilterBar';
import { RegulationCard } from './components/RegulationCard';
import { RegulationDetail } from './components/RegulationDetail';
import { StatsOverview } from './components/StatsOverview';

function App() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  const filteredRegulations = regulations.filter((reg) => {
    if (selectedJurisdiction !== 'all' && reg.jurisdiction !== selectedJurisdiction) return false;
    if (selectedStatus !== 'all' && reg.status !== selectedStatus) return false;
    if (selectedCategory !== 'all' && reg.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Header */}
      <header className="border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-light tracking-tight text-neutral-900">
                Regulatory Change Monitor
              </h1>
              <p className="mt-1 text-sm text-neutral-500 font-light">
                EU, Irish & UK Legislation
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-400 uppercase tracking-wider">Last Updated</p>
              <p className="text-sm text-neutral-600 mt-0.5">
                {new Date().toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Introduction */}
          <p className="mt-6 text-sm text-neutral-600 leading-relaxed max-w-3xl">
            Intelligence platform tracking legislative developments across EU, Irish, UK and US financial services regulatory frameworks.
            Data sourced from official regulatory bodies including EUR-Lex, ESMA, EBA, EIOPA, Central Bank of Ireland, FCA, PRA, SEC and Federal Register.
          </p>
        </div>
      </header>

      {/* Stats */}
      <StatsOverview regulations={regulations} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Filters */}
        <FilterBar
          selectedJurisdiction={selectedJurisdiction}
          selectedStatus={selectedStatus}
          selectedCategory={selectedCategory}
          onJurisdictionChange={setSelectedJurisdiction}
          onStatusChange={setSelectedStatus}
          onCategoryChange={setSelectedCategory}
        />

        {/* Results count */}
        <div className="mt-8 mb-6 flex items-center justify-between">
          <p className="text-xs text-neutral-400 uppercase tracking-wider">
            {filteredRegulations.length} {filteredRegulations.length === 1 ? 'regulation' : 'regulations'}
          </p>
          <div className="h-px flex-1 ml-4 bg-neutral-100" />
        </div>

        {/* Regulations List */}
        <div className="space-y-3">
          {filteredRegulations.map((regulation) => (
            <RegulationCard
              key={regulation.id}
              regulation={regulation}
              onClick={() => setSelectedRegulation(regulation)}
            />
          ))}
        </div>

        {filteredRegulations.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-neutral-400 text-sm">No regulations match your current filters.</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedRegulation && (
        <RegulationDetail
          regulation={selectedRegulation}
          onClose={() => setSelectedRegulation(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-100 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <p className="text-xs text-neutral-400">
            Intelligence platform tracking legislative developments across Irish, UK, EU and US financial services regulatory frameworks.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-[10px] text-neutral-300 uppercase tracking-wider">Sources:</span>
            <span className="text-[10px] text-neutral-400">EUR-Lex</span>
            <span className="text-[10px] text-neutral-400">ESMA</span>
            <span className="text-[10px] text-neutral-400">EBA</span>
            <span className="text-[10px] text-neutral-400">EIOPA</span>
            <span className="text-[10px] text-neutral-400">Central Bank of Ireland</span>
            <span className="text-[10px] text-neutral-400">FCA</span>
            <span className="text-[10px] text-neutral-400">PRA</span>
            <span className="text-[10px] text-neutral-400">SEC</span>
            <span className="text-[10px] text-neutral-400">Federal Register</span>
            <span className="text-[10px] text-neutral-400">HM Treasury</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
