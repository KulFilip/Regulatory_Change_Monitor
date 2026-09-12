// Central Bank of Ireland API integration
// Documentation: https://www.centralbank.ie/publication/consultation-papers

export interface CBIRegulation {
  id: string;
  title: string;
  reference: string;
  status: 'active' | 'consultation' | 'proposed' | 'withdrawn';
  date: string;
  summary: string;
  category: string;
  url: string;
}

export interface CBISearchParams {
  keyword?: string;
  type?: 'consultation' | 'regulation' | 'guidance';
  dateFrom?: string;
}

const CBI_BASE_URL = 'https://www.centralbank.ie';

export async function fetchCBIRegulations(params?: CBISearchParams): Promise<CBIRegulation[]> {
  try {
    // CBI provides RSS feeds for publications
    const response = await fetch(`${CBI_BASE_URL}/news-and-events/press-releases/rss`, {
      headers: {
        'Accept': 'application/rss+xml'
      }
    });

    if (!response.ok) {
      throw new Error(`CBI API error: ${response.status}`);
    }

    const text = await response.text();
    return parseCBIRssFeed(text, params);
  } catch (error) {
    console.error('CBI fetch error:', error);
    return getFallbackCBIData();
  }
}

function parseCBIRssFeed(rssText: string, params?: CBISearchParams): CBIRegulation[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssText, 'text/xml');
  const items = xmlDoc.querySelectorAll('item');
  
  const regulations: CBIRegulation[] = [];

  items.forEach((item) => {
    const title = item.querySelector('title')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const pubDate = item.querySelector('pubDate')?.textContent || '';

    if (isRegulatoryContent(title, description)) {
      regulations.push({
        id: `cbi-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: title,
        reference: extractCBIReference(title),
        status: determineCBIStatus(title, description),
        date: new Date(pubDate).toISOString().split('T')[0],
        summary: cleanCBIDescription(description),
        category: 'Banking',
        url: link
      });
    }
  });

  let filtered = regulations;
  
  if (params?.keyword) {
    const keyword = params.keyword.toLowerCase();
    filtered = filtered.filter(r => 
      r.title.toLowerCase().includes(keyword) || 
      r.summary.toLowerCase().includes(keyword)
    );
  }

  if (params?.type === 'consultation') {
    filtered = filtered.filter(r => r.status === 'consultation');
  }

  return filtered.slice(0, 50);
}

function isRegulatoryContent(title: string, description: string): boolean {
  const keywords = [
    'consultation', 'regulation', 'directive', 'framework',
    'guidance', 'policy', 'supervisory', 'prudential'
  ];
  
  const text = (title + ' ' + description).toLowerCase();
  return keywords.some(keyword => text.includes(keyword));
}

function extractCBIReference(title: string): string {
  const match = title.match(/\bCP\d{3}\b/);
  return match ? match[0] : 'N/A';
}

function determineCBIStatus(title: string, description: string): CBIRegulation['status'] {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('consultation') || text.includes('cp')) return 'consultation';
  if (text.includes('proposed') || text.includes('draft')) return 'proposed';
  if (text.includes('final') || text.includes('implemented')) return 'active';
  
  return 'active';
}

function cleanCBIDescription(description: string): string {
  return description
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 300);
}

function getFallbackCBIData(): CBIRegulation[] {
  return [
    {
      id: 'cbi-fallback-1',
      title: 'Central Bank 2026 Regulatory & Supervisory Outlook',
      reference: 'RSO 2026',
      status: 'active',
      date: '2026-02-26',
      summary: 'Key financial sector risks and supervisory priorities for 2026.',
      category: 'Banking',
      url: 'https://www.centralbank.ie/publication/regulatory---supervisory-outlook-report'
    },
    {
      id: 'cbi-fallback-2',
      title: 'Individual Accountability Framework Implementation',
      reference: 'IAF 2023',
      status: 'active',
      date: '2023-12-15',
      summary: 'Senior Executive Accountability Regime requiring prescribed responsibilities.',
      category: 'Governance',
      url: 'https://www.centralbank.ie/regulation/how-we-regulate/supervision/individual-accountability-framework'
    }
  ];
}

export async function fetchCBIConsultations(): Promise<CBIRegulation[]> {
  return fetchCBIRegulations({ type: 'consultation' });
}
