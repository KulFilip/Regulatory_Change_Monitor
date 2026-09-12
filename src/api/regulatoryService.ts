// Unified Regulatory Data Service
// Combines data from EUR-Lex, FCA, and Central Bank of Ireland

import { Regulation } from '../data/regulations';
import { fetchFinancialRegulations, fetchRecentRegulations, EURLexDocument } from './eurlex';
import { fetchFCARegulations, FCARegulation } from './fca';
import { fetchCBIRegulations, CBIRegulation } from './cbi';

interface CachedData {
  regulations: Regulation[];
  lastUpdated: number;
  source: string;
}

const CACHE_KEY = 'regulatory_data_cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Convert EUR-Lex documents to our Regulation format
function convertEURLexToRegulation(doc: EURLexDocument): Regulation {
  return {
    id: `eurlex-${doc.celex}`,
    title: doc.title,
    jurisdiction: 'EU',
    status: 'enacted', // EUR-Lex typically shows enacted legislation
    impact: 'medium',
    category: categorizeByTitle(doc.title),
    date: doc.date,
    summary: doc.summary || doc.title,
    body: doc.summary || doc.title,
    reference: doc.celex,
    source: 'EUR-Lex'
  };
}

// Convert FCA regulations to our format
function convertFCAToRegulation(reg: FCARegulation): Regulation {
  return {
    id: reg.id,
    title: reg.title,
    jurisdiction: 'UK',
    status: mapFCAStatus(reg.status),
    impact: 'medium',
    category: reg.category as Regulation['category'],
    date: reg.date,
    summary: reg.summary,
    body: reg.summary,
    reference: reg.reference,
    source: 'FCA'
  };
}

// Convert CBI regulations to our format
function convertCBIToRegulation(reg: CBIRegulation): Regulation {
  return {
    id: reg.id,
    title: reg.title,
    jurisdiction: 'Ireland',
    status: mapCBIStatus(reg.status),
    impact: 'medium',
    category: reg.category as Regulation['category'],
    date: reg.date,
    summary: reg.summary,
    body: reg.summary,
    reference: reg.reference,
    source: 'Central Bank of Ireland'
  };
}

function mapFCAStatus(status: FCARegulation['status']): Regulation['status'] {
  switch (status) {
    case 'active': return 'enacted';
    case 'consultation': return 'consultation';
    case 'proposed': return 'proposed';
    case 'withdrawn': return 'withdrawn';
    default: return 'enacted';
  }
}

function mapCBIStatus(status: CBIRegulation['status']): Regulation['status'] {
  switch (status) {
    case 'active': return 'enacted';
    case 'consultation': return 'consultation';
    case 'proposed': return 'proposed';
    case 'withdrawn': return 'withdrawn';
    default: return 'enacted';
  }
}

function categorizeByTitle(title: string): Regulation['category'] {
  const lower = title.toLowerCase();
  
  if (lower.includes('banking') || lower.includes('credit') || lower.includes('capital')) return 'Banking';
  if (lower.includes('market') || lower.includes('securities') || lower.includes('investment')) return 'Markets';
  if (lower.includes('insurance') || lower.includes('pension')) return 'Insurance';
  if (lower.includes('payment') || lower.includes('transfer')) return 'Payments';
  if (lower.includes('crypto') || lower.includes('digital asset')) return 'Crypto';
  if (lower.includes('sustainability') || lower.includes('esg') || lower.includes('green')) return 'ESG';
  if (lower.includes('data') || lower.includes('privacy')) return 'Data';
  if (lower.includes('aml') || lower.includes('money laundering')) return 'AML';
  if (lower.includes('ai') || lower.includes('artificial intelligence')) return 'AI';
  if (lower.includes('resilience') || lower.includes('cyber') || lower.includes('operational')) return 'Resilience';
  
  return 'Banking';
}

// Fetch all regulatory data from all sources
export async function fetchAllRegulations(): Promise<Regulation[]> {
  try {
    // Fetch from all sources in parallel
    const [eurlexDocs, fcaRegs, cbiRegs] = await Promise.allSettled([
      fetchRecentRegulations(),
      fetchFCARegulations(),
      fetchCBIRegulations()
    ]);

    const regulations: Regulation[] = [];

    // Process EUR-Lex results
    if (eurlexDocs.status === 'fulfilled') {
      regulations.push(...eurlexDocs.value.map(convertEURLexToRegulation));
    }

    // Process FCA results
    if (fcaRegs.status === 'fulfilled') {
      regulations.push(...fcaRegs.value.map(convertFCAToRegulation));
    }

    // Process CBI results
    if (cbiRegs.status === 'fulfilled') {
      regulations.push(...cbiRegs.value.map(convertCBIToRegulation));
    }

    return regulations;
  } catch (error) {
    console.error('Error fetching regulations:', error);
    return [];
  }
}

// Get cached data or fetch fresh data
export async function getRegulations(): Promise<{ data: Regulation[]; lastUpdated: number; source: string }> {
  // Check cache first
  const cached = getCachedData();
  if (cached && Date.now() - cached.lastUpdated < CACHE_DURATION) {
    return {
      data: cached.regulations,
      lastUpdated: cached.lastUpdated,
      source: 'cache'
    };
  }

  // Fetch fresh data
  const regulations = await fetchAllRegulations();
  
  // Cache the results
  if (regulations.length > 0) {
    cacheData(regulations);
  }

  return {
    data: regulations,
    lastUpdated: Date.now(),
    source: 'api'
  };
}

function getCachedData(): CachedData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error('Error reading cache:', error);
  }
  return null;
}

function cacheData(regulations: Regulation[]): void {
  try {
    const data: CachedData = {
      regulations,
      lastUpdated: Date.now(),
      source: 'api'
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error caching data:', error);
  }
}

// Clear cache
export function clearCache(): void {
  localStorage.removeItem(CACHE_KEY);
}

// Force refresh data
export async function refreshRegulations(): Promise<Regulation[]> {
  clearCache();
  const regulations = await fetchAllRegulations();
  if (regulations.length > 0) {
    cacheData(regulations);
  }
  return regulations;
}
