// FCA Handbook API integration for UK financial regulations
// Documentation: https://www.fca.org.uk/firms/financial-services-register

export interface FCARegulation {
  id: string;
  title: string;
  reference: string;
  status: 'active' | 'consultation' | 'proposed' | 'withdrawn';
  date: string;
  summary: string;
  category: string;
  url: string;
}

export interface FCASearchParams {
  keyword?: string;
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

// FCA Handbook API endpoint
const FCA_API_BASE = 'https://www.fca.org.uk';

// Fetch FCA regulatory updates
export async function fetchFCARegulations(params?: FCASearchParams): Promise<FCARegulation[]> {
  try {
    // FCA provides RSS feeds and public pages for regulatory updates
    const response = await fetch(`${FCA_API_BASE}/news/rss`, {
      headers: {
        'Accept': 'application/rss+xml'
      }
    });

    if (!response.ok) {
      throw new Error(`FCA API error: ${response.status}`);
    }

    const text = await response.text();
    return parseFCARssFeed(text, params);
  } catch (error) {
    console.error('FCA fetch error:', error);
    return getFallbackFCAData();
  }
}

function parseFCARssFeed(rssText: string, params?: FCASearchParams): FCARegulation[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssText, 'text/xml');
  const items = xmlDoc.querySelectorAll('item');
  
  const regulations: FCARegulation[] = [];

  items.forEach((item) => {
    const title = item.querySelector('title')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const category = item.querySelector('category')?.textContent || 'General';

    // Filter for regulatory content
    if (isRegulatoryContent(title, description)) {
      regulations.push({
        id: `fca-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        reference: extractReference(title),
        status: determineStatus(title, description),
        date: new Date(pubDate).toISOString().split('T')[0],
        summary: cleanDescription(description),
        category: category,
        url: link
      });
    }
  });

  // Apply filters
  let filtered = regulations;
  
  if (params?.keyword) {
    const keyword = params.keyword.toLowerCase();
    filtered = filtered.filter(r => 
      r.title.toLowerCase().includes(keyword) || 
      r.summary.toLowerCase().includes(keyword)
    );
  }

  if (params?.status) {
    filtered = filtered.filter(r => r.status === params.status);
  }

  if (params?.category) {
    filtered = filtered.filter(r => r.category === params.category);
  }

  return filtered.slice(0, 50);
}

function isRegulatoryContent(title: string, description: string): boolean {
  const regulatoryKeywords = [
    'regulation', 'rule', 'guidance', 'consultation', 'policy',
    'final', 'proposed', 'amendment', 'directive', 'handbook'
  ];
  
  const text = (title + ' ' + description).toLowerCase();
  return regulatoryKeywords.some(keyword => text.includes(keyword));
}

function extractReference(title: string): string {
  // Extract reference like PS25/20, CP24/15, etc.
  const match = title.match(/\b(PS|CP|FG|GC)\d{2}\/\d{2,3}\b/);
  return match ? match[0] : 'N/A';
}

function determineStatus(title: string, description: string): FCARegulation['status'] {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('consultation') || text.includes('cp')) return 'consultation';
  if (text.includes('proposed') || text.includes('draft')) return 'proposed';
  if (text.includes('withdrawn') || text.includes('cancelled')) return 'withdrawn';
  if (text.includes('final') || text.includes('implemented')) return 'active';
  
  return 'active';
}

function cleanDescription(description: string): string {
  // Remove HTML tags and clean up
  return description
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 300);
}

// Fallback data when API is unavailable
function getFallbackFCAData(): FCARegulation[] {
  return [
    {
      id: 'fca-fallback-1',
      title: 'Consumer Composite Investments (CCI) Regime',
      reference: 'PS25/20',
      status: 'active',
      date: '2026-04-06',
      summary: 'New UK regime replacing PRIIPs and UCITS KID requirements with flexible disclosure framework.',
      category: 'Markets',
      url: 'https://www.fca.org.uk/publication/policy-statement/ps25-20'
    },
    {
      id: 'fca-fallback-2',
      title: 'Non-Financial Misconduct Rules Extension',
      reference: 'PS25/23',
      status: 'active',
      date: '2026-09-01',
      summary: 'Extension of non-financial misconduct rules to all regulated firms.',
      category: 'Governance',
      url: 'https://www.fca.org.uk/publication/policy-statement/ps25-23'
    }
  ];
}

// Fetch FCA consultation papers
export async function fetchFCAConsultations(): Promise<FCARegulation[]> {
  return fetchFCARegulations({ status: 'consultation' });
}

// Fetch FCA final rules
export async function fetchFCAFinalRules(): Promise<FCARegulation[]> {
  return fetchFCARegulations({ status: 'active' });
}
