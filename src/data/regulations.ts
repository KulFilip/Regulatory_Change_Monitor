export type Jurisdiction = 'EU' | 'Ireland' | 'UK' | 'US';
export type Status = 'proposed' | 'consultation' | 'enacted' | 'amended' | 'withdrawn';
export type Impact = 'high' | 'medium' | 'low';
export type Category = 'Banking' | 'Markets' | 'Insurance' | 'Payments' | 'Crypto' | 'ESG' | 'Data' | 'AML' | 'AI' | 'Resilience';

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
  source: string;
}

export const regulations: Regulation[] = [
  // ─── EU ───────────────────────────────────────────────────
  {
    id: 'eu-1',
    title: 'Capital Markets Union — Savings and Investments Union Package',
    jurisdiction: 'EU',
    status: 'proposed',
    impact: 'high',
    category: 'Markets',
    date: '2026-01-15',
    summary: 'Major legislative package to fully integrate EU financial markets, significantly expanding ESMA\'s supervisory role over trading venues, CCPs, CSDs and all crypto-asset service providers.',
    body: 'The European Commission\'s December 2025 package consists of a master regulation and master directive amending existing capital market legislation. Key proposals include streamlining fund authorisation and marketing, removing barriers to DLT innovation, and establishing a Settlement Finality Regulation. Extensive negotiation by EU Parliament and Council expected throughout 2026.',
    reference: 'COM(2025) 2893',
    source: 'European Commission'
  },
  {
    id: 'eu-2',
    title: 'Markets in Crypto-Assets Regulation (MiCAR) — Full Application',
    jurisdiction: 'EU',
    status: 'enacted',
    impact: 'high',
    category: 'Crypto',
    date: '2024-12-30',
    summary: 'Full application of MiCAR provisions including authorisation requirements for CASPs and prudential safeguards for significant asset-referenced tokens and e-money tokens.',
    body: 'Regulation (EU) 2023/1114 now fully applicable. France, Austria and Italy have proposed amendments including stricter rules for platforms targeting EU investors from outside the EU. Commission under pressure to clarify multi-issuance stablecoin treatment in light of ESRB systemic risk report and US GENIUS Act.',
    reference: 'Regulation (EU) 2023/1114',
    source: 'EUR-Lex / ESMA'
  },
  {
    id: 'eu-3',
    title: 'Digital Operational Resilience Act (DORA) — Implementation Phase',
    jurisdiction: 'EU',
    status: 'enacted',
    impact: 'high',
    category: 'Resilience',
    date: '2025-01-17',
    summary: 'ICT risk management framework for financial entities now in force. Joint Committee overseeing critical third-party provider designation and annual oversight plans.',
    body: 'Regulation (EU) 2022/2554 applied since January 2025. First list of designated critical third-party providers issued November 2025. ESAs jointly exercising oversight mandate. Commission reporting on whether DORA or auditing standards best strengthen digital resilience for statutory auditors. Pan-European Systemic Cyber Incident Coordination Framework being strengthened.',
    reference: 'Regulation (EU) 2022/2554',
    source: 'EUR-Lex / ESAs Joint Committee'
  },
  {
    id: 'eu-4',
    title: 'PSD3 & Payment Services Regulation (PSR)',
    jurisdiction: 'EU',
    status: 'amended',
    impact: 'high',
    category: 'Payments',
    date: '2025-11-01',
    summary: 'Political agreement reached on new payments framework replacing PSD2 and EMD. EBA tasked with developing 40 implementing technical standards across PSD3 (18) and PSR (22).',
    body: 'New framework introduces verification of payee scheme, fraud reimbursement rules, enhanced open banking provisions removing data access barriers, and clarified relationship with MiCAR. Financial Data Access Regulation dovetails with the payments package to lay foundations for open finance. Final form expected during Cypriot EU Council presidency (Jan–Jun 2026).',
    reference: 'COM(2023) 366 & 365',
    source: 'European Commission / EBA'
  },
  {
    id: 'eu-5',
    title: 'CRR3 / CRD6 — Banking Package Implementation',
    jurisdiction: 'EU',
    status: 'amended',
    impact: 'high',
    category: 'Banking',
    date: '2026-01-01',
    summary: 'Finalisation of Basel III standards transposition into EU law. EBA focused on implementation guidance and supervisory convergence across member states.',
    body: 'Capital Requirements Regulation (CRR3) and Directive (CRD6) implementing Basel III final standards. EBA 2026 work programme prioritises finalising implementation, advancing supervisory convergence, and developing remaining regulatory technical standards. ECB recommendations on simplifying prudential reporting fed into Commission\'s banking system report.',
    reference: 'Regulation (EU) 2024/1623 / Directive (EU) 2024/1765',
    source: 'EBA / European Commission'
  },
  {
    id: 'eu-6',
    title: 'AI in Financial Services — ESA Joint Statement on Frontier AI',
    jurisdiction: 'EU',
    status: 'consultation',
    impact: 'high',
    category: 'AI',
    date: '2026-07-31',
    summary: 'EBA, EIOPA and ESMA call for enhanced governance and consistent supervision to mitigate ICT risks from frontier AI models in the EU financial sector.',
    body: 'Joint statement (31 July 2026) addresses risks from large-scale AI models deployed in financial services. EU Parliament resolution (November 2025) concerns regulatory overlaps between AI Act and financial services legislation. ESAs exploring AI-powered supervisory tools including anomaly detection and market abuse prevention. Digital omnibus package expected to simplify some AI rules.',
    reference: 'JC 2026 05',
    source: 'EBA / EIOPA / ESMA Joint Committee'
  },
  {
    id: 'eu-7',
    title: 'Financial Data Access Regulation (Open Finance)',
    jurisdiction: 'EU',
    status: 'proposed',
    impact: 'medium',
    category: 'Data',
    date: '2026-06-30',
    summary: 'Landmark initiative to enable consumers to allow third-party financial information service providers to access their financial data across virtually all financial services sectors.',
    body: 'Institutional agreement not yet reached; expected to be finalised during Cypriot presidency of EU Council (Jan–Jun 2026). Regulation will establish permissions data sharing scheme, designate financial information service providers, and create the legal basis for open finance in the EU.',
    reference: 'COM(2023) 281',
    source: 'European Commission'
  },
  {
    id: 'eu-8',
    title: 'Corporate Sustainability Reporting Directive (CSRD) — Phase 2',
    jurisdiction: 'EU',
    status: 'enacted',
    impact: 'medium',
    category: 'ESG',
    date: '2025-01-01',
    summary: 'Second wave of sustainability reporting obligations for large undertakings. Assurance of sustainability information aligned with European Sustainability Reporting Standards (ESRS).',
    body: 'Directive (EU) 2022/2464 phased implementation continues. Large undertakings reporting on FY2025. EFRAG developing sector-specific ESRS. Simplification agenda under review following industry feedback on reporting burden.',
    reference: 'Directive (EU) 2022/2464',
    source: 'EUR-Lex / EFRAG'
  },
  {
    id: 'eu-9',
    title: 'EU Simplification Agenda — Financial Services Omnibus',
    jurisdiction: 'EU',
    status: 'consultation',
    impact: 'medium',
    category: 'Banking',
    date: '2026-03-01',
    summary: 'EU Council agreed principles (December 2025) for simplifying financial services regulation. Focus on eliminating unnecessary requirements, aligning definitions, and removing duplications.',
    body: 'Council conclusions (ST-16463-2025) call for maintaining key pillars while simplifying through consistency-building. ECB recommendations on supervisory reporting simplification published December 2025. Commission preparing banking system report for 2026. Joint Committee exploring simplification within its remit.',
    reference: 'ST-16463-2025-INIT',
    source: 'EU Council / European Commission'
  },
  {
    id: 'eu-10',
    title: 'ESA Bilateral Margin Requirements — Proposed Amendments',
    jurisdiction: 'EU',
    status: 'consultation',
    impact: 'low',
    category: 'Markets',
    date: '2026-08-03',
    summary: 'EBA, EIOPA and ESMA propose amendments to simplify the bilateral margin framework for counterparties subject to initial margin requirements.',
    body: 'Proposed amendments aim to simplify the bilateral margin framework, reducing operational complexity for in-scope counterparties while maintaining risk mitigation objectives. Consultation open for stakeholder feedback.',
    reference: 'JC 2026 CP',
    source: 'EBA / EIOPA / ESMA'
  },

  // ─── IRELAND ──────────────────────────────────────────────
  {
    id: 'ie-1',
    title: 'Central Bank 2026 Regulatory & Supervisory Outlook',
    jurisdiction: 'Ireland',
    status: 'enacted',
    impact: 'high',
    category: 'Banking',
    date: '2026-02-26',
    summary: 'Central Bank of Ireland sets out key financial sector risks and supervisory priorities for 2026, including streamlining gatekeeping, supervision, and regulatory reporting for fund service providers.',
    body: 'The RSO identifies climate risk, cyber resilience, and financial crime as priority areas. Overhaul of fund authorisation processes and supervisory approach for fund service providers. Enhanced focus on operational resilience and consumer protection outcomes.',
    reference: 'RSO 2026',
    source: 'Central Bank of Ireland'
  },
  {
    id: 'ie-2',
    title: 'CRD VI National Discretions — Transposition',
    jurisdiction: 'Ireland',
    status: 'consultation',
    impact: 'high',
    category: 'Banking',
    date: '2026-01-10',
    summary: 'Ireland consulting on exercise of CRD VI national discretions. Transposition deadline of 10 January 2026. Key decisions on remuneration, proportionality, and supervisory powers.',
    body: 'Department of Finance consultation on how Ireland will exercise available national discretions under the CRD6 banking package. Areas include remuneration rules, proportionality thresholds, and enhanced supervisory tools. Alignment with broader EU banking union developments.',
    reference: 'CRD6 Transposition CP',
    source: 'Department of Finance / Central Bank of Ireland'
  },
  {
    id: 'ie-3',
    title: 'Individual Accountability Framework (IAF) — SEAR Implementation',
    jurisdiction: 'Ireland',
    status: 'enacted',
    impact: 'high',
    category: 'Banking',
    date: '2023-12-15',
    summary: 'Senior Executive Accountability Regime requiring prescribed responsibilities, conduct standards, and enhanced Fitness & Probity regime for all regulated financial service providers.',
    body: 'Central Bank (Individual Accountability Framework) Act 2023 introduces SEAR for banks, insurance firms, investment firms, and fund management companies. Mandatory Statements of Responsibilities, management responsibility maps, and prescribed supervisory approval processes. Central Bank publishing sector-specific guidance throughout 2024-2026.',
    reference: 'Central Bank Act 2023',
    source: 'Central Bank of Ireland / Oireachtas'
  },
  {
    id: 'ie-4',
    title: 'Regulatory Impact Assessment — Consultation on Evolving Regulation',
    jurisdiction: 'Ireland',
    status: 'consultation',
    impact: 'medium',
    category: 'Banking',
    date: '2026-06-22',
    summary: 'Central Bank of Ireland launches public consultation on its approach to Regulatory Impact Assessment (RIA) and evolving regulatory methodology.',
    body: 'Consultation seeks views on how the Central Bank assesses the impact of proposed regulations on firms, consumers, and markets. Part of broader transparency and evidence-based policymaking initiative. Stakeholder engagement expected to shape future regulatory approach.',
    reference: 'CP 2026/06',
    source: 'Central Bank of Ireland'
  },
  {
    id: 'ie-5',
    title: 'Consumer Protection Code Review (CP148)',
    jurisdiction: 'Ireland',
    status: 'consultation',
    impact: 'medium',
    category: 'Banking',
    date: '2025-06-30',
    summary: 'Central Bank consultation on modernising the Consumer Protection Code with enhanced product governance requirements and updated information disclosure standards.',
    body: 'CP148 proposes updates to information disclosure, suitability assessments, and product governance for retail financial products. Alignment with Consumer Duty principles and enhanced vulnerable customer protections. Industry response period extended to allow comprehensive feedback.',
    reference: 'CP148',
    source: 'Central Bank of Ireland'
  },
  {
    id: 'ie-6',
    title: 'Anti-Money Laundering & Counter-Terrorist Financing Bill',
    jurisdiction: 'Ireland',
    status: 'proposed',
    impact: 'high',
    category: 'AML',
    date: '2025-09-15',
    summary: 'Transposition of EU AML/CFT package into Irish law. New beneficial ownership requirements, enhanced due diligence, and alignment with forthcoming EU AML Authority framework.',
    body: 'General Scheme published for consolidation and strengthening of Ireland\'s AML framework. Enhanced CDD measures, alignment with EU AML Regulation (directly applicable), and preparation for supervision by new EU AML Authority. Professional services firms supervision potentially transferring to Central Bank.',
    reference: 'General Scheme 2025',
    source: 'Department of Justice / Oireachtas'
  },
  {
    id: 'ie-7',
    title: 'Insurance Distribution Directive Review (CP152)',
    jurisdiction: 'Ireland',
    status: 'consultation',
    impact: 'low',
    category: 'Insurance',
    date: '2025-10-01',
    summary: 'Central Bank review of IDD implementation focusing on product oversight, governance, and inducements rules for insurance distribution.',
    body: 'Consultation on amendments to Insurance Distribution Regulations 2021 addressing product value assessment, distribution strategy requirements, and alignment with enhanced consumer protection standards.',
    reference: 'CP152',
    source: 'Central Bank of Ireland'
  },

  // ─── UK ───────────────────────────────────────────────────
  {
    id: 'uk-1',
    title: 'Basel 3.1 — New UK Capital Accord',
    jurisdiction: 'UK',
    status: 'enacted',
    impact: 'high',
    category: 'Banking',
    date: '2026-01-01',
    summary: 'PRA implements Basel 3.1 standards through the new UK Capital Accord, described as a "very significant programme initiative" for CROs, CFOs, and Senior Management in 2026.',
    body: 'Prudential Regulation Authority\'s comprehensive implementation of Basel 3.1 output floor, credit risk standardised and IRB approaches, operational risk framework, and CVA risk. PRA Business Plan 2026/27 prioritises efficient implementation while managing costs. Significant data and systems changes required for all in-scope firms.',
    reference: 'PRA PS1/24 & Rulebook Instrument 2024',
    source: 'Bank of England / PRA'
  },
  {
    id: 'uk-2',
    title: 'Targeted Support — New Regulated Activity',
    jurisdiction: 'UK',
    status: 'enacted',
    impact: 'high',
    category: 'Markets',
    date: '2026-04-01',
    summary: 'New standalone regulated activity enabling firms to provide targeted support to consumer groups without full personalised advice requirements. Part of advice-guidance boundary review.',
    body: 'HM Treasury legislation (draft) creates new regulated activity under FSMA 2000 via amendments to RAO 2001. FCA confirmed rules ready for April 2026 commencement. Designed to encourage pension investment by allowing firms to give more than information but less than full advice, reducing costs for consumers.',
    reference: 'FSMA 2000 (RAO) Amendment Order 2026',
    source: 'HM Treasury / FCA (PS25/22)'
  },
  {
    id: 'uk-3',
    title: 'Consumer Composite Investments (CCI) Regime',
    jurisdiction: 'UK',
    status: 'enacted',
    impact: 'high',
    category: 'Markets',
    date: '2026-04-06',
    summary: 'New UK regime replacing PRIIPs and UCITS KID requirements with flexible disclosure framework driven by Consumer Duty "consumer understanding" outcome.',
    body: 'CCI covers all investments where returns depend on underlying/reference assets: funds, insurance-based investments, structured products, deposits, derivatives. Firms may start complying from 6 April 2026, mandatory by 8 June 2027. Key metrics required for product comparison but firms decide presentation format.',
    reference: 'FCA PS25/20',
    source: 'FCA / HM Treasury'
  },
  {
    id: 'uk-4',
    title: 'Payment Safeguarding — Enhanced Requirements',
    jurisdiction: 'UK',
    status: 'enacted',
    impact: 'medium',
    category: 'Payments',
    date: '2026-05-01',
    summary: 'FCA bolsters safeguarding requirements for e-money and payments firms: named senior manager oversight, resolution packs, annual external audit, and enhanced third-party due diligence.',
    body: 'Changes require appropriate organisational arrangements for relevant funds, senior manager allocation, resolution packs with third-party details, enhanced due diligence on safeguarding providers, and annual external audit with prescribed reporting format. Further reforms under consideration.',
    reference: 'FCA PS24/xx & PSR 2026',
    source: 'FCA'
  },
  {
    id: 'uk-5',
    title: 'Buy-Now-Pay-Later (Deferred Payment Credit) Regulation',
    jurisdiction: 'UK',
    status: 'enacted',
    impact: 'medium',
    category: 'Payments',
    date: '2026-07-01',
    summary: 'Third-party deferred payment credit agreements come within FCA regulatory perimeter. Interest-free loans repayable in ≤12 instalments over ≤12 months now require authorisation.',
    body: 'Changes to RAO article 60F exemption bring DPC within scope of consumer credit regulation. Merchant-provided loans remain exempt. Firms already authorised need permission variations; new entrants require full authorisation. Referral and arrangement activities also captured with exemption for own-product arrangements.',
    reference: 'RAO Amendment Order 2026',
    source: 'HM Treasury / FCA'
  },
  {
    id: 'uk-6',
    title: 'Non-Financial Misconduct Rules — Extension to All Firms',
    jurisdiction: 'UK',
    status: 'enacted',
    impact: 'medium',
    category: 'Banking',
    date: '2026-09-01',
    summary: 'FCA extends non-financial misconduct rules (bullying, harassment, violence) under COCON to all regulated firms, not just banks. Applies to all staff in connection with work activities.',
    body: 'PS25/23 confirms extension from 1 September 2026. Serious misconduct including bullying, harassment, and workplace violence now breach FCA Rules when engaged in by COCON staff against any colleague. FCA published flowcharts and guidance on application. D&I proposals not taken forward separately.',
    reference: 'FCA PS25/23',
    source: 'FCA'
  },
  {
    id: 'uk-7',
    title: 'FCA Regulatory Initiatives Grid — 10th Edition',
    jurisdiction: 'UK',
    status: 'amended',
    impact: 'medium',
    category: 'Markets',
    date: '2026-05-01',
    summary: 'Updated grid of regulatory initiatives designed to strengthen foundations for growth while ensuring financial stability. Covers wholesale markets, securitisation, and consumer reforms.',
    body: '10th edition (May 2026) reflects ongoing regulatory pipeline including further securitisation rule changes, consumer mortgage regime reform, SM&CR updates, provisional licence regime for start-ups, and AML supervision changes bringing professional services firms under FCA remit.',
    reference: 'FCA Regulatory Initiatives Grid 10th Ed.',
    source: 'FCA / HM Treasury / PRA'
  },
  {
    id: 'uk-8',
    title: 'SM&CR Reform — Certification Regime Changes',
    jurisdiction: 'UK',
    status: 'proposed',
    impact: 'medium',
    category: 'Banking',
    date: '2026-06-01',
    summary: 'Expected mid-2026 reforms to Senior Managers and Certification Regime: removing certification regime from legislation, replacing with flexible regulator-run regime, and potentially reducing senior management functions requiring approval.',
    body: 'Proposed changes aim to reduce regulatory burden while maintaining accountability. Certification regime moved from primary legislation to regulator rules. Possible reduction in number of Senior Management Functions requiring regulatory pre-approval. Consultation expected in H1 2026.',
    reference: 'SM&CR Review CP',
    source: 'HM Treasury / FCA / PRA'
  },
  {
    id: 'uk-9',
    title: 'FCA Asset Manager Regime Reform',
    jurisdiction: 'UK',
    status: 'consultation',
    impact: 'medium',
    category: 'Markets',
    date: '2026-07-16',
    summary: 'FCA and HM Treasury publish package of measures reforming UK regulatory regime for asset managers. Consultation on fund manager regime overhaul.',
    body: 'Comprehensive review of asset management regulation including authorisation requirements, governance standards, and investor protection rules. Part of wider Edinburgh/Leeds Reforms programme to enhance UK competitiveness post-Brexit.',
    reference: 'FCA CP26/xx',
    source: 'FCA / HM Treasury'
  },
  {
    id: 'uk-10',
    title: 'PRA Business Plan 2026/27',
    jurisdiction: 'UK',
    status: 'enacted',
    impact: 'medium',
    category: 'Banking',
    date: '2026-04-01',
    summary: 'PRA sets priorities for 2026/27: increasing efficiency and productivity, tightly managing costs, and completing Basel 3.1 implementation alongside ongoing supervisory work.',
    body: 'Business plan aligns with wider Bank of England objectives. Key workstreams include Basel 3.1 completion, insurance solvency reform, resolution framework updates, and climate risk integration into supervisory approach. Emphasis on proportionate, evidence-based regulation.',
    reference: 'PRA Business Plan 2026/27',
    source: 'Bank of England / PRA'
  },

  // ─── US ───────────────────────────────────────────────────
  {
    id: 'us-1',
    title: 'SEC — Regulation Crypto Assets',
    jurisdiction: 'US',
    status: 'proposed',
    impact: 'high',
    category: 'Crypto',
    date: '2026-08-21',
    summary: 'SEC proposes comprehensive regulatory framework for crypto assets following Crypto Task Force recommendations. Includes innovation exemption for automated market makers and tokenized assets.',
    body: 'Federal Register publication (August 2026) follows March 2026 interpretation on federal securities law application to crypto assets. Crypto Task Force (established January 2025) developed comprehensive framework. Proposed rule addresses registration, disclosure, and market structure for digital asset trading.',
    reference: '17 CFR Parts 230, 240, 249 (Proposed)',
    source: 'SEC / Federal Register'
  },
  {
    id: 'us-2',
    title: 'GENIUS Act — Stablecoin Regulatory Framework',
    jurisdiction: 'US',
    status: 'enacted',
    impact: 'high',
    category: 'Crypto',
    date: '2025-07-18',
    summary: 'Guiding and Establishing National Innovation for US Stablecoins Act establishes federal framework for payment stablecoins including reserve requirements and issuer supervision.',
    body: 'Landmark legislation creating comprehensive federal oversight of stablecoin issuers. Reserve asset requirements, redemption rights, and supervisory framework for bank and non-bank issuers. Sets stage for stablecoins to enter core finance in 2026. Interplay with EU MiCAR stablecoin regime creating cross-border compliance considerations.',
    reference: 'Public Law 119-xx (GENIUS Act)',
    source: 'US Congress / Federal Reserve'
  },
  {
    id: 'us-3',
    title: 'Basel III Endgame — Revised Capital Requirements',
    jurisdiction: 'US',
    status: 'amended',
    impact: 'high',
    category: 'Banking',
    date: '2025-04-01',
    summary: 'Federal agencies\' revised proposal for Basel III implementation with significant modifications to operational risk and credit valuation adjustment calculations for large banking organisations.',
    body: 'OCC, Federal Reserve, and FDIC revised NPR (Docket No. OP-1779) incorporating extensive industry feedback on 2023 proposal. Key modifications to output floor calibration, operational risk methodology, and CVA risk framework. Comment period closed; final rule expected late 2025/early 2026.',
    reference: 'Docket No. OP-1779',
    source: 'Federal Reserve / OCC / FDIC'
  },
  {
    id: 'us-4',
    title: 'SEC Cybersecurity Disclosure Rules — Enforcement Phase',
    jurisdiction: 'US',
    status: 'enacted',
    impact: 'medium',
    category: 'Data',
    date: '2024-12-18',
    summary: 'Mandatory Form 8-K disclosure within 4 business days of material cybersecurity incidents plus annual 10-K risk governance disclosures now in full enforcement.',
    body: 'Final rules (17 CFR Parts 229, 239, 240, 249 & 270) require timely disclosure of material cybersecurity incidents and annual reporting on risk management, strategy, and governance. SEC actively monitoring compliance and pursuing enforcement actions for deficient disclosures.',
    reference: 'SEC Final Rule 33-11216',
    source: 'SEC'
  },
  {
    id: 'us-5',
    title: 'AI in Financial Services — Interagency Guidance',
    jurisdiction: 'US',
    status: 'consultation',
    impact: 'high',
    category: 'AI',
    date: '2025-08-15',
    summary: 'Joint OCC, Federal Reserve, and FDIC guidance on model risk management, fair lending compliance, and consumer protection in AI/ML applications by banking organisations.',
    body: 'Interagency request for information and draft guidance on use of artificial intelligence including generative AI by banking organisations. Addresses model risk management framework expectations, fair lending and ECOA compliance, UDAAP considerations, and third-party AI vendor oversight. White House Executive Order on financial technology innovation (May 2026) provides additional policy direction.',
    reference: 'Interagency RFI 2025 / EO 2026',
    source: 'OCC / Federal Reserve / FDIC / White House'
  },
  {
    id: 'us-6',
    title: 'CLARITY Act — Digital Asset Market Clarity',
    jurisdiction: 'US',
    status: 'proposed',
    impact: 'medium',
    category: 'Crypto',
    date: '2026-01-15',
    summary: 'Digital Asset Market Clarity Act proposing CFTC/SEC jurisdictional boundaries for digital assets, registration framework for digital asset exchanges, and customer protection standards.',
    body: 'Bipartisan legislation establishing clear division of regulatory authority between SEC (securities) and CFTC (commodities) for digital assets. Creates registration framework for digital asset trading platforms and custody requirements. Works alongside GENIUS Act and SEC Regulation Crypto Assets to form comprehensive US digital asset framework.',
    reference: 'H.R. xxxx / S. xxxx (119th Congress)',
    source: 'US Congress'
  },
];
