export type Jurisdiction = 'EU' | 'Ireland' | 'UK' | 'US';
export type Status = 'proposed' | 'consultation' | 'enacted' | 'amended' | 'withdrawn';
export type Impact = 'high' | 'medium' | 'low';
export type Category = 'Banking' | 'Markets' | 'Insurance' | 'Payments' | 'Crypto' | 'ESG' | 'Data' | 'AML';

export interface Regulation {
  id: string;
  title: string;
  jurisdiction: Jurisdiction;
  status: Status;
  impact: Impact;
  category: Category;
  date: string;
  summary: string;
  body: string;
  reference: string;
}

export const regulations: Regulation[] = [
  {
    id: '1',
    title: 'Digital Operational Resilience Act (DORA)',
    jurisdiction: 'EU',
    status: 'enacted',
    impact: 'high',
    category: 'Banking',
    date: '2025-01-17',
    summary: 'ICT risk management requirements for financial entities, including incident reporting and third-party risk oversight.',
    body: 'Regulation (EU) 2022/2554 establishing a comprehensive framework for digital operational resilience in the financial sector.',
    reference: 'Regulation (EU) 2022/2554'
  },
  {
    id: '2',
    title: 'Markets in Crypto-Assets Regulation (MiCA)',
    jurisdiction: 'EU',
    status: 'enacted',
    impact: 'high',
    category: 'Crypto',
    date: '2024-12-30',
    summary: 'Comprehensive regulatory framework for crypto-asset service providers, stablecoins, and token issuance across the EU.',
    body: 'Full application of MiCA provisions including authorisation requirements for CASPs and prudential safeguards for significant asset-referenced tokens.',
    reference: 'Regulation (EU) 2023/1114'
  },
  {
    id: '3',
    title: 'Corporate Sustainability Reporting Directive (CSRD)',
    jurisdiction: 'EU',
    status: 'enacted',
    impact: 'medium',
    category: 'ESG',
    date: '2025-01-01',
    summary: 'Expanded sustainability reporting obligations for large undertakings and listed SMEs with phased implementation.',
    body: 'Directive requiring assurance of sustainability information and alignment with European Sustainability Reporting Standards (ESRS).',
    reference: 'Directive (EU) 2022/2464'
  },
  {
    id: '4',
    title: 'Individual Accountability Framework',
    jurisdiction: 'Ireland',
    status: 'enacted',
    impact: 'high',
    category: 'Banking',
    date: '2023-12-15',
    summary: 'Senior executive accountability regime requiring prescribed responsibilities and fitness & probity enhancements.',
    body: 'Central Bank (Individual Accountability Framework) Act 2023 introducing SEAR, conduct standards, and enhanced F&P regime for regulated financial service providers.',
    reference: 'Central Bank Act 2023'
  },
  {
    id: '5',
    title: 'Consumer Protection Code Review',
    jurisdiction: 'Ireland',
    status: 'consultation',
    impact: 'medium',
    category: 'Banking',
    date: '2025-06-30',
    summary: 'Central Bank consultation on modernising the Consumer Protection Code with enhanced product governance requirements.',
    body: 'CP148 consultation proposing updates to information disclosure, suitability assessments, and product governance for retail financial products.',
    reference: 'CP148'
  },
  {
    id: '6',
    title: 'Anti-Money Laundering & Counter-Terrorist Financing Bill',
    jurisdiction: 'Ireland',
    status: 'proposed',
    impact: 'high',
    category: 'AML',
    date: '2025-09-15',
    summary: 'Transposition of EU AML/CFT package into Irish law with new beneficial ownership and due diligence requirements.',
    body: 'Legislative proposals to consolidate and strengthen Ireland\'s AML framework, including enhanced CDD measures and alignment with the new EU AML Authority framework.',
    reference: 'General Scheme 2025'
  },
  {
    id: '7',
    title: 'Financial Services and Markets Act 2023',
    jurisdiction: 'UK',
    status: 'enacted',
    impact: 'high',
    category: 'Markets',
    date: '2024-01-01',
    summary: 'Post-Brexit regulatory framework overhaul including wholesale market review and designated activity regime.',
    body: 'FSMA 2023 revoking retained EU law and establishing new UK-specific regulatory frameworks for financial markets, including the future regulatory framework for financial services.',
    reference: 'FSMA 2023 (c.29)'
  },
  {
    id: '8',
    title: 'Edinburgh Reforms — Implementation Phase',
    jurisdiction: 'UK',
    status: 'amended',
    impact: 'medium',
    category: 'Markets',
    date: '2025-03-31',
    summary: 'Ongoing implementation of wholesale markets review, Solvency II reform, and retail investment regime changes.',
    body: 'FCA and PRA consultations on retail distribution review, consumer duty enhancements, and Solvency II calibration adjustments.',
    reference: 'HMT Policy Paper 2024'
  },
  {
    id: '9',
    title: 'Cryptoasset Regulation — CP24/20',
    jurisdiction: 'UK',
    status: 'consultation',
    impact: 'high',
    category: 'Crypto',
    date: '2025-07-31',
    summary: 'FCA consultation on full regulatory perimeter for cryptoasset activities including staking, lending, and custody.',
    body: 'Consultation paper on authorisation requirements, conduct rules, and prudential standards for cryptoasset service providers operating in the UK.',
    reference: 'FCA CP24/20'
  },
  {
    id: '10',
    title: 'Payment Services Regulation (PSR)',
    jurisdiction: 'UK',
    status: 'proposed',
    impact: 'medium',
    category: 'Payments',
    date: '2025-11-30',
    summary: 'Replacement of PSR 2017 with new framework addressing open banking, e-money, and faster payments obligations.',
    body: 'Draft regulations implementing the future payments regulatory framework including new variable recurring payments and confirmation of payee mandates.',
    reference: 'PSR 2025 (Draft)'
  },
  {
    id: '11',
    title: 'SEC Cybersecurity Disclosure Rules',
    jurisdiction: 'US',
    status: 'enacted',
    impact: 'medium',
    category: 'Data',
    date: '2024-12-18',
    summary: 'Mandatory disclosure of material cybersecurity incidents and annual risk management strategy reporting for public companies.',
    body: 'Final rules requiring Form 8-K disclosure within 4 business days of determining a cybersecurity incident is material, plus annual 10-K risk governance disclosures.',
    reference: '17 CFR Parts 229, 239, 240, 249 & 270'
  },
  {
    id: '12',
    title: 'Basel III Endgame — Capital Requirements',
    jurisdiction: 'US',
    status: 'amended',
    impact: 'high',
    category: 'Banking',
    date: '2025-04-01',
    summary: 'Revised proposal for implementing Basel III final standards with significant modifications to operational risk and credit valuation adjustments.',
    body: 'Federal agencies\' revised notice of proposed rulemaking on capital requirements for large banking organisations, incorporating feedback on the 2023 proposal.',
    reference: 'Docket No. OP-1779'
  },
  {
    id: '13',
    title: 'AI in Financial Services Guidance',
    jurisdiction: 'US',
    status: 'consultation',
    impact: 'medium',
    category: 'Data',
    date: '2025-08-15',
    summary: 'Interagency request for information on use of artificial intelligence by banking organisations and associated risks.',
    body: 'Joint OCC, Federal Reserve, and FDIC guidance on model risk management, fair lending compliance, and consumer protection in AI/ML applications.',
    reference: 'RFI Docket No. 2025-001'
  },
  {
    id: '14',
    title: 'Data Act — Financial Sector Application',
    jurisdiction: 'EU',
    status: 'enacted',
    impact: 'low',
    category: 'Data',
    date: '2025-09-12',
    summary: 'Data sharing obligations and switching provisions applicable to financial services data portability requirements.',
    body: 'Regulation (EU) 2023/2854 on harmonised rules on fair access to and use of data, with specific provisions for financial sector data sharing.',
    reference: 'Regulation (EU) 2023/2854'
  },
  {
    id: '15',
    title: 'Insurance Distribution Directive Review',
    jurisdiction: 'Ireland',
    status: 'consultation',
    impact: 'low',
    category: 'Insurance',
    date: '2025-10-01',
    summary: 'Central Bank review of IDD implementation with focus on product oversight, governance, and inducements rules.',
    body: 'Consultation on amendments to Insurance Distribution Regulations 2021 addressing product value assessment and distribution strategy requirements.',
    reference: 'CP152'
  },
  {
    id: '16',
    title: 'FCA Consumer Duty — Portfolio Assessment',
    jurisdiction: 'UK',
    status: 'amended',
    impact: 'medium',
    category: 'Markets',
    date: '2025-05-15',
    summary: 'FCA multi-firm review findings on Consumer Duty implementation with guidance on price/value assessments and product governance.',
    body: 'FG25/1 providing updated guidance on firms\' obligations under the Consumer Duty principle, including good outcomes testing and vulnerable customer provisions.',
    reference: 'FG25/1'
  }
];
