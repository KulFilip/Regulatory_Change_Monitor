// EUR-Lex API integration for EU regulations
// Documentation: https://eur-lex.europa.eu/content/help/data-reuse/webservice.html

export interface EURLexDocument {
  celex: string;
  title: string;
  type: string;
  date: string;
  summary?: string;
  url: string;
}

export interface EURLexSearchParams {
  query?: string;
  type?: string;
  dateFrom?: string;
  dateTo?: string;
  pageSize?: number;
}

// EUR-Lex webservice endpoint (requires registration for full access)
const EURLEX_BASE_URL = 'https://eur-lex.europa.eu';

// Public search endpoint (limited access)
export async function searchEURLex(params: EURLexSearchParams): Promise<EURLexDocument[]> {
  try {
    // EUR-Lex provides SPARQL endpoint for public queries
    const sparqlQuery = buildSPARQLQuery(params);
    
    const response = await fetch(`${EURLEX_BASE_URL}/sparql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/sparql-results+json',
      },
      body: new URLSearchParams({
        query: sparqlQuery,
        format: 'json'
      })
    });

    if (!response.ok) {
      throw new Error(`EUR-Lex API error: ${response.status}`);
    }

    const data = await response.json();
    return parseSPARQLResults(data);
  } catch (error) {
    console.error('EUR-Lex fetch error:', error);
    return [];
  }
}

function buildSPARQLQuery(params: EURLexSearchParams): string {
  let query = `
    PREFIX cdm: <http://publications.europa.eu/ontology/cdm#>
    PREFIX dct: <http://purl.org/dc/terms/>
    
    SELECT ?celex ?title ?type ?date ?summary ?url
    WHERE {
      ?resource cdm:resource_legal_id_celex ?celex .
      ?resource dct:title ?title .
      ?resource cdm:resource_legal_type ?type .
      ?resource cdm:resource_legal_date_document ?date .
      OPTIONAL { ?resource dct:description ?summary }
      BIND(CONCAT("https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex:", ?celex) AS ?url)
  `;

  if (params.query) {
    query += `
      FILTER(CONTAINS(LCASE(?title), LCASE("${params.query}")) || 
             CONTAINS(LCASE(?summary), LCASE("${params.query}")))
    `;
  }

  if (params.type) {
    query += `
      FILTER(?type = "${params.type}")
    `;
  }

  if (params.dateFrom) {
    query += `
      FILTER(?date >= "${params.dateFrom}"^^xsd:date)
    `;
  }

  if (params.dateTo) {
    query += `
      FILTER(?date <= "${params.dateTo}"^^xsd:date)
    `;
  }

  query += `
    }
    ORDER BY DESC(?date)
    LIMIT ${params.pageSize || 50}
  `;

  return query;
}

function parseSPARQLResults(data: any): EURLexDocument[] {
  if (!data.results || !data.results.bindings) {
    return [];
  }

  return data.results.bindings.map((binding: any) => ({
    celex: binding.celex?.value || '',
    title: binding.title?.value || '',
    type: binding.type?.value || '',
    date: binding.date?.value || '',
    summary: binding.summary?.value || '',
    url: binding.url?.value || ''
  }));
}

// Fetch specific financial regulations
export async function fetchFinancialRegulations(): Promise<EURLexDocument[]> {
  return searchEURLex({
    query: 'financial services banking investment',
    pageSize: 100
  });
}

// Fetch recent regulations (last 30 days)
export async function fetchRecentRegulations(): Promise<EURLexDocument[]> {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  return searchEURLex({
    dateFrom: thirtyDaysAgo.toISOString().split('T')[0],
    dateTo: today.toISOString().split('T')[0],
    pageSize: 50
  });
}
