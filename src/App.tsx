import { useState, useEffect } from 'react';
import { regulations as staticRegulations, Regulation, Jurisdiction, Status, Category } from './data/regulations';
import { getRegulations, refreshRegulations } from './api/regulatoryService';
import { FilterBar } from './components/FilterBar';
import { RegulationCard } from './components/RegulationCard';
import { RegulationDetail } from './components/RegulationDetail';
import { StatsOverview } from './components/StatsOverview';

type DataSource = 'static' | 'live';

function App() {
  const [dataSource, setDataSource] = useState<DataSource>('static');
  const [liveRegulations, setLiveRegulations] = useState<Regulation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<Jurisdiction | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<Status | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);

  const regulations = dataSource === 'live' && liveRegulations.length > 0 
    ? liveRegulations 
    : staticRegulations;

  // Fetch live data when switching to live mode
  useEffect(() => {
    if (dataSource === 'live') {
      fetchLiveData();
    }
  }, [dataSource]);

  async function fetchLiveData() {
    setIsLoading(true);
    setApiError(null);
    try {
      const result = await getRegulations();
      if (result.data.length > 0) {
        setLiveRegulations(result.data);
        setLastUpdated(result.lastUpdated);
      } else {
        setApiError('No data received from APIs. Showing static data.');
      }
    } catch (error) {
      setApiError('Failed to fetch live data. Showing static data.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRefresh() {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await refreshRegulations();
      if (data.length > 0) {
        setLiveRegulations(data);
        setLastUpdated(Date.now());
      } else {
        setApiError('No data received from APIs.');
      }
    } catch (error) {
      setApiError('Failed to refresh data.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

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

          {/* Data Source Toggle */}
          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 uppercase tracking-wider">Data Source:</span>
              <button
                type="button"
                onClick={() => setDataSource('static')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border ${
                  dataSource === 'static'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                Static Database ({staticRegulations.length} entries)
              </button>
              <button
                type="button"
                onClick={() => setDataSource('live')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 border ${
                  dataSource === 'live'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    dataSource === 'live' ? 'bg-white animate-pulse' : 'bg-emerald-400'
                  }`} />
                  Live API Feed
                </span>
              </button>
            </div>

            {dataSource === 'live' && (
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-medium rounded-full border border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Fetching...
                  </span>
                ) : (
                  '↻ Refresh'
                )}
              </button>
            )}

            {lastUpdated && dataSource === 'live' && (
              <span className="text-[11px] text-neutral-400">
                Fetched: {new Date(lastUpdated).toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>

          {/* API Error Notice */}
          {apiError && dataSource === 'live' && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-700">
                ⚠️ {apiError}
              </p>
              <p className="text-[11px] text-amber-600 mt-1">
                Note: Live API feeds may be blocked by CORS restrictions in browser environments. 
                For production use, a backend proxy server is recommended.
              </p>
            </div>
          )}
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
            {dataSource === 'live' && liveRegulations.length > 0 && (
              <span className="ml-2 text-emerald-600">● Live</span>
            )}
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
          <div className="mt-4 pt-4 border-t border-neutral-100">
            <p className="text-[10px] text-neutral-300">
              Live data feeds connect to official regulatory APIs. Browser CORS restrictions may limit direct access — 
              a backend proxy is recommended for production deployment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
