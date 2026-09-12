import { Regulation } from '../data/regulations';
import { StatusBadge } from './StatusBadge';
import { JurisdictionBadge } from './JurisdictionBadge';
import { useEffect } from 'react';

interface RegulationDetailProps {
  regulation: Regulation;
  onClose: () => void;
}

export function RegulationDetail({ regulation, onClose }: RegulationDetailProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl mx-4 mt-20 mb-10 bg-white rounded-xl shadow-2xl border border-neutral-100 overflow-hidden animate-in">
        {/* Header */}
        <div className="p-8 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-8">
              <div className="flex items-center gap-2.5 mb-4">
                <JurisdictionBadge jurisdiction={regulation.jurisdiction} />
                <StatusBadge status={regulation.status} />
                <span className="text-[11px] text-neutral-400">{regulation.category}</span>
              </div>
              <h2 className="text-lg font-medium text-neutral-900 leading-snug">
                {regulation.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-600"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 pt-6">
          {/* Meta grid */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-lg mb-6">
            <div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1">Reference</p>
              <p className="text-xs text-neutral-700 font-medium">{regulation.reference}</p>
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1">Effective Date</p>
              <p className="text-xs text-neutral-700 font-medium">
                {new Date(regulation.date).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-wider mb-1">Impact Level</p>
              <p className={`text-xs font-medium ${
                regulation.impact === 'high' ? 'text-red-600' :
                regulation.impact === 'medium' ? 'text-amber-600' : 'text-neutral-600'
              }`}>
                {regulation.impact.charAt(0).toUpperCase() + regulation.impact.slice(1)}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h3 className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">Summary</h3>
            <p className="text-sm text-neutral-700 leading-relaxed">{regulation.summary}</p>
          </div>

          {/* Details */}
          <div className="mb-6">
            <h3 className="text-[10px] text-neutral-400 uppercase tracking-wider mb-2">Details</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{regulation.body}</p>
          </div>

          {/* Key Actions */}
          <div>
            <h3 className="text-[10px] text-neutral-400 uppercase tracking-wider mb-3">Key Considerations</h3>
            <div className="space-y-2">
              <KeyAction text={`Monitor ${regulation.jurisdiction} regulatory body publications for implementation guidance`} />
              <KeyAction text="Assess impact on current compliance framework and operational processes" />
              <KeyAction text="Review affected business lines and update internal policies accordingly" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-neutral-100 bg-neutral-50/50">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-neutral-400">
              Classification: {regulation.impact === 'high' ? 'Priority Review Required' : 'Standard Review'}
            </p>
            <button
              onClick={onClose}
              className="text-xs text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function KeyAction({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-1.5 w-1 h-1 rounded-full bg-neutral-300 flex-shrink-0" />
      <p className="text-xs text-neutral-600 leading-relaxed">{text}</p>
    </div>
  );
}
