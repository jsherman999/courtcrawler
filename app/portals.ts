export type PortalScope = 'Statewide' | 'Limited' | 'County';
export type PortalAccess = 'Open search' | 'Court notice' | 'Free account';

export type CourtPortal = {
  id: string;
  state: string;
  short: string;
  name: string;
  coverage: string;
  scope: PortalScope;
  access: PortalAccess;
  url: string;
  accessNote: string;
  availabilityNote?: string;
};

export const portals: CourtPortal[] = [
  {
    id: 'ak-courtview', state: 'Alaska', short: 'AK', name: 'CourtView',
    coverage: 'Trial courts statewide', scope: 'Statewide', access: 'Court notice',
    url: 'https://records.courts.alaska.gov/eaccess/home.page',
    accessNote: 'Search Alaska trial court cases after accepting the court notice.',
  },
  {
    id: 'az-public-access', state: 'Arizona', short: 'AZ', name: 'Public Access to Court Information',
    coverage: 'Participating Arizona courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://apps.supremecourt.az.gov/publicaccess/caselookup.aspx',
    accessNote: 'Coverage depends on each Arizona court submitting case information.',
  },
  {
    id: 'ar-courtconnect', state: 'Arkansas', short: 'AR', name: 'CourtConnect',
    coverage: 'Participating circuit and district courts', scope: 'Statewide', access: 'Open search',
    url: 'https://caseinfo.arcourts.gov/cconnect/PROD/public/ck_public_qry_main.cp_main_idx',
    accessNote: 'Search public Arkansas case information by party name.',
  },
  {
    id: 'ca-san-diego', state: 'California', short: 'CA', name: 'San Diego Court Index',
    coverage: 'San Diego County Superior Court', scope: 'County', access: 'Court notice',
    url: 'https://courtindex.sdcourt.ca.gov/CISPublic/enter',
    accessNote: 'San Diego County provides a public name index with its own access notice.',
  },
  {
    id: 'ca-orange', state: 'California', short: 'CA', name: 'Orange County Case Access',
    coverage: 'Orange County Superior Court', scope: 'County', access: 'Court notice',
    url: 'https://www.occourts.org/online-services/case-access',
    accessNote: 'Choose the appropriate Orange County case access service by case type.',
  },
  {
    id: 'ct-civil', state: 'Connecticut', short: 'CT', name: 'Civil / Family Case Look-up',
    coverage: 'Civil, family, housing, and small claims', scope: 'Statewide', access: 'Open search',
    url: 'https://civilinquiry.jud.ct.gov/',
    accessNote: 'Search Connecticut civil, family, housing, and small-claims matters.',
  },
  {
    id: 'ct-criminal', state: 'Connecticut', short: 'CT', name: 'Criminal / Motor Vehicle Look-up',
    coverage: 'Criminal and motor vehicle cases', scope: 'Statewide', access: 'Open search',
    url: 'https://www.jud2.ct.gov/crdockets/SearchByDefDisp.aspx',
    accessNote: 'Search Connecticut criminal and motor-vehicle cases by defendant.',
  },
  {
    id: 'dc-portal', state: 'District of Columbia', short: 'DC', name: 'DC Courts Case Search',
    coverage: 'Superior Court cases', scope: 'Statewide', access: 'Court notice',
    url: 'https://portal-dc.tylertech.cloud/Portal/',
    accessNote: 'Search public Superior Court records through the DC Courts portal.',
  },
  {
    id: 'fl-broward', state: 'Florida', short: 'FL', name: 'Broward Clerk Case Search',
    coverage: 'Broward County courts', scope: 'County', access: 'Court notice',
    url: 'https://www.browardclerk.org/Web2',
    accessNote: 'Broward County court records are available through the elected clerk.',
  },
  {
    id: 'fl-palm-beach', state: 'Florida', short: 'FL', name: 'Palm Beach eCaseView',
    coverage: 'Palm Beach County courts', scope: 'County', access: 'Court notice',
    url: 'https://appsgp.mypalmbeachclerk.com/eCaseView/',
    accessNote: 'Search Palm Beach County court cases after accepting the clerk notice.',
  },
  {
    id: 'fl-hillsborough', state: 'Florida', short: 'FL', name: 'Hillsborough HOVER',
    coverage: 'Hillsborough County courts', scope: 'County', access: 'Open search',
    url: 'https://hover.hillsclerk.com/html/case/caseSearch.html',
    accessNote: 'Search Hillsborough County official records and court cases.',
  },
  {
    id: 'fl-orange', state: 'Florida', short: 'FL', name: 'Orange County My eClerk',
    coverage: 'Orange County courts', scope: 'County', access: 'Court notice',
    url: 'https://myeclerk.myorangeclerk.com/Cases/Search',
    accessNote: 'Search Orange County court cases through the official clerk portal.',
  },
  {
    id: 'ga-research', state: 'Georgia', short: 'GA', name: 're:SearchGA',
    coverage: 'Participating Georgia courts', scope: 'Statewide', access: 'Free account',
    url: 'https://researchga.tylerhost.net/CourtRecordsSearch/Home#!/home',
    accessNote: 'A free account may be required; document access can carry separate fees.',
  },
  {
    id: 'hi-ecourt', state: 'Hawaii', short: 'HI', name: 'eCourt Kōkua',
    coverage: 'Hawaii trial and appellate courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://www.courts.state.hi.us/legal_references/records/search_court_records',
    accessNote: 'The Judiciary landing page routes to the current public case-search system.',
  },
  {
    id: 'id-icourt', state: 'Idaho', short: 'ID', name: 'iCourt Portal',
    coverage: 'Idaho state courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://mycourts.idaho.gov/odysseyportal',
    accessNote: 'Search public Idaho case information after accepting portal terms.',
  },
  {
    id: 'il-research', state: 'Illinois', short: 'IL', name: 're:SearchIL',
    coverage: 'Participating Illinois circuit courts', scope: 'Statewide', access: 'Free account',
    url: 'https://researchil.tylerhost.net/CourtRecordsSearch/Home#!/home',
    accessNote: 'A free account may be required; availability varies by circuit court.',
  },
  {
    id: 'in-mycase', state: 'Indiana', short: 'IN', name: 'MyCase',
    coverage: 'Indiana trial and appellate courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://public.courts.in.gov/mycase/#/vw/Search',
    accessNote: 'Search non-confidential Indiana cases by party name.',
  },
  {
    id: 'ia-courts-online', state: 'Iowa', short: 'IA', name: 'Iowa Courts Online Search',
    coverage: 'Iowa district and appellate courts', scope: 'Statewide', access: 'Open search',
    url: 'https://www.iowacourts.state.ia.us/ESAWebApp/DefaultFrame',
    accessNote: 'Use the public guest search for Iowa case information.',
  },
  {
    id: 'ks-portal', state: 'Kansas', short: 'KS', name: 'Kansas District Court Public Access',
    coverage: 'Kansas district courts on the centralized system', scope: 'Statewide', access: 'Court notice',
    url: 'https://prodportal.kscourts.org/ProdPortal/',
    accessNote: 'Search participating Kansas district court case information.',
  },
  {
    id: 'la-orleans', state: 'Louisiana', short: 'LA', name: 'Orleans Parish Civil Inquiry',
    coverage: 'Orleans Parish civil district court', scope: 'County', access: 'Open search',
    url: 'https://civilinquiry.opclerkofcourt.com/',
    accessNote: 'Search civil cases maintained by the Orleans Parish Clerk of Court.',
  },
  {
    id: 'me-portal', state: 'Maine', short: 'ME', name: 'Maine eCourts Public Portal',
    coverage: 'Courts using Maine eCourts', scope: 'Statewide', access: 'Court notice',
    url: 'https://publicportal.courts.maine.gov/Portal/',
    accessNote: 'Coverage continues to expand as courts move onto Maine eCourts.',
  },
  {
    id: 'md-case-search', state: 'Maryland', short: 'MD', name: 'Maryland Judiciary Case Search',
    coverage: 'Maryland trial and appellate courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://casesearch.courts.state.md.us/casesearch/',
    accessNote: 'Accept the Judiciary notice before searching Maryland case records.',
  },
  {
    id: 'ma-trial-court', state: 'Massachusetts', short: 'MA', name: 'Massachusetts Trial Court Case Access',
    coverage: 'Massachusetts Trial Court departments', scope: 'Statewide', access: 'Open search',
    url: 'https://www.masscourts.org/eservices/home.page.2',
    accessNote: 'Select a court department, division, and party-search tab.',
  },
  {
    id: 'mi-micourt', state: 'Michigan', short: 'MI', name: 'MiCOURT Case Search',
    coverage: 'Participating Michigan courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://micourt.courts.michigan.gov/case-search/',
    accessNote: 'Choose courts or search participating Michigan courts by name.',
  },
  {
    id: 'mn-mcro', state: 'Minnesota', short: 'MN', name: 'Minnesota Court Records Online',
    coverage: 'District courts statewide', scope: 'Statewide', access: 'Court notice',
    url: 'https://publicaccess.courts.state.mn.us/CaseSearch',
    accessNote: 'First and last name are required by MCRO.',
  },
  {
    id: 'mo-casenet', state: 'Missouri', short: 'MO', name: 'Case.net',
    coverage: 'Missouri state courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://www.courts.mo.gov/cnet/welcome.do',
    accessNote: 'Accept Missouri Courts terms before a litigant name search.',
  },
  {
    id: 'mt-district', state: 'Montana', short: 'MT', name: 'Montana District Court Public Access',
    coverage: 'Participating district courts', scope: 'Limited', access: 'Court notice',
    url: 'https://dcportal.pubcourts.mt.gov/fullcourtweb/start.do',
    accessNote: 'Coverage is limited to Montana district courts in the public portal.',
  },
  {
    id: 'nv-clark', state: 'Nevada', short: 'NV', name: 'Clark County Court Portal',
    coverage: 'Eighth Judicial District Court', scope: 'County', access: 'Court notice',
    url: 'https://www.clarkcountycourts.us/Portal/',
    accessNote: 'Search Clark County District Court cases after accepting portal terms.',
  },
  {
    id: 'nv-washoe', state: 'Nevada', short: 'NV', name: 'Washoe County Case Inquiry',
    coverage: 'Second Judicial District Court', scope: 'County', access: 'Open search',
    url: 'https://www.washoecourts.com/Query/',
    accessNote: 'Search Washoe County District Court cases by person or company.',
  },
  {
    id: 'nh-portal', state: 'New Hampshire', short: 'NH', name: 'New Hampshire Case Access Portal',
    coverage: 'New Hampshire Circuit, Superior, and Supreme Courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://odypa.nhecourt.us/portal',
    accessNote: 'Use Smart Search after accepting New Hampshire court terms.',
  },
  {
    id: 'nj-public-access', state: 'New Jersey', short: 'NJ', name: 'New Jersey Public Access',
    coverage: 'New Jersey court case information', scope: 'Statewide', access: 'Court notice',
    url: 'https://portal.njcourts.gov/webe5/MPAWeb/index.jsp',
    accessNote: 'Select a public case-search service from the New Jersey portal.',
  },
  {
    id: 'nm-case-lookup', state: 'New Mexico', short: 'NM', name: 'New Mexico Case Lookup',
    coverage: 'District, Magistrate, Metropolitan, and appellate courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://caselookup.nmcourts.gov/caselookup/app',
    accessNote: 'Search New Mexico case information after accepting the court disclaimer.',
  },
  {
    id: 'ny-webcivil', state: 'New York', short: 'NY', name: 'WebCivil Supreme',
    coverage: 'Supreme Court civil cases', scope: 'Limited', access: 'Open search',
    url: 'https://iapps.courts.state.ny.us/webcivil/FCASMain',
    accessNote: 'Search New York Supreme Court civil cases by party name.',
  },
  {
    id: 'ny-webcriminal', state: 'New York', short: 'NY', name: 'WebCriminal',
    coverage: 'Criminal cases with future appearances', scope: 'Limited', access: 'Court notice',
    url: 'https://iapps.courts.state.ny.us/webcrim_attorney/DefendantSearch',
    accessNote: 'Search public New York criminal case information by defendant.',
  },
  {
    id: 'nc-ecourts', state: 'North Carolina', short: 'NC', name: 'North Carolina eCourts Portal',
    coverage: 'Counties live on eCourts', scope: 'Statewide', access: 'Court notice',
    url: 'https://portal-nc.tylertech.cloud/Portal/',
    accessNote: 'Coverage follows the statewide eCourts rollout by county.',
  },
  {
    id: 'nd-public-search', state: 'North Dakota', short: 'ND', name: 'North Dakota District Court Search',
    coverage: 'District courts statewide', scope: 'Statewide', access: 'Court notice',
    url: 'https://publicsearch.ndcourts.gov/default.aspx',
    accessNote: 'Select a district and search North Dakota case records by name.',
  },
  {
    id: 'oh-cuyahoga', state: 'Ohio', short: 'OH', name: 'Cuyahoga County Common Pleas Docket',
    coverage: 'Cuyahoga County Court of Common Pleas', scope: 'County', access: 'Open search',
    url: 'https://cpdocket.cp.cuyahogacounty.gov/Search.aspx',
    accessNote: 'Search Cuyahoga County Common Pleas cases by civil or criminal party.',
  },
  {
    id: 'oh-franklin-municipal', state: 'Ohio', short: 'OH', name: 'Franklin County Municipal Court Search',
    coverage: 'Franklin County Municipal Court', scope: 'County', access: 'Open search',
    url: 'https://www.fcmcclerk.com/case/search',
    accessNote: 'Search Franklin County Municipal Court cases by name.',
  },
  {
    id: 'ok-oscn', state: 'Oklahoma', short: 'OK', name: 'OSCN Docket Search',
    coverage: 'Appellate courts and participating district courts', scope: 'Limited', access: 'Open search',
    url: 'https://www.oscn.net/dockets/Search.aspx',
    accessNote: 'OSCN includes appellate cases and participating Oklahoma counties.',
  },
  {
    id: 'or-circuit-tax', state: 'Oregon', short: 'OR', name: 'Oregon Circuit / Tax Court Search',
    coverage: 'Circuit courts statewide and Tax Court; excludes municipal and justice courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://webportal.courts.oregon.gov/portal/',
    accessNote: 'Free basic case information; no account or document downloads. In Smart Search, enter the name as Last, First. Protected cases are excluded.',
    availabilityNote: 'Unavailable when checked October 5, 2026. Check OJD Records and Calendar Search for service updates.',
  },
  {
    id: 'or-appellate', state: 'Oregon', short: 'OR', name: 'Oregon Appellate Public Portal',
    coverage: 'Supreme Court and Court of Appeals; excludes trial courts', scope: 'Limited', access: 'Open search',
    url: 'https://trportal.courts.oregon.gov/portal/search',
    accessNote: 'Search public appellate cases or parties without an account. Clear Exclude Closed Cases to include historical cases. Anonymous access does not include documents.',
  },
  {
    id: 'pa-ujs', state: 'Pennsylvania', short: 'PA', name: 'UJS Web Portal Case Search',
    coverage: 'Pennsylvania appellate, common pleas, and magisterial courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://ujsportal.pacourts.us/CaseSearch',
    accessNote: 'Choose participant name search and accept the Unified Judicial System terms.',
  },
  {
    id: 'ri-public-portal', state: 'Rhode Island', short: 'RI', name: 'Rhode Island Judiciary Public Portal',
    coverage: 'Rhode Island state courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://publicportal.courts.ri.gov/PublicPortal/',
    accessNote: 'Use Smart Search after accepting the Rhode Island Judiciary notice.',
  },
  {
    id: 'sc-public-index', state: 'South Carolina', short: 'SC', name: 'South Carolina Public Index',
    coverage: 'Circuit and summary courts by county', scope: 'Statewide', access: 'Court notice',
    url: 'https://publicindex.sccourts.org/',
    accessNote: 'Choose a county before searching South Carolina public court records.',
  },
  {
    id: 'tn-appellate', state: 'Tennessee', short: 'TN', name: 'Tennessee Public Case History',
    coverage: 'Supreme Court and intermediate appellate courts', scope: 'Limited', access: 'Open search',
    url: 'https://www.tncourts.gov/courts/supreme-court/public-case-history',
    accessNote: 'This source covers Tennessee appellate cases, not local trial courts.',
  },
  {
    id: 'tx-research', state: 'Texas', short: 'TX', name: 're:SearchTX',
    coverage: 'Participating Texas courts', scope: 'Statewide', access: 'Free account',
    url: 'https://research.txcourts.gov/CourtRecordsSearch/Home#!/home',
    accessNote: 'A free account may be required; coverage and documents vary by court.',
  },
  {
    id: 'vt-public-portal', state: 'Vermont', short: 'VT', name: 'Vermont Judiciary Public Portal',
    coverage: 'Vermont Superior and Judicial Bureau cases', scope: 'Statewide', access: 'Court notice',
    url: 'https://portal.vtcourts.gov/Portal',
    accessNote: 'Use Smart Search after accepting Vermont Judiciary portal terms.',
  },
  {
    id: 'va-ocis', state: 'Virginia', short: 'VA', name: 'Online Case Information System 2.0',
    coverage: 'Participating circuit and general district courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://eapps.courts.state.va.us/ocis/landing',
    accessNote: 'Select circuit or district court coverage and accept Virginia court terms.',
  },
  {
    id: 'wa-odyssey', state: 'Washington', short: 'WA', name: 'Washington Odyssey Portal',
    coverage: 'Participating Superior Courts', scope: 'Statewide', access: 'Court notice',
    url: 'https://odysseyportal.courts.wa.gov/ODYPORTAL/',
    accessNote: 'Search participating Washington Superior Courts through Odyssey.',
  },
  {
    id: 'wi-wcca', state: 'Wisconsin', short: 'WI', name: 'Wisconsin Circuit Court Access',
    coverage: 'Circuit courts statewide', scope: 'Statewide', access: 'Court notice',
    url: 'https://wcca.wicourts.gov/case.html',
    accessNote: 'WCCA may require its own notice and CAPTCHA.',
  },
  {
    id: 'wy-supreme', state: 'Wyoming', short: 'WY', name: 'Wyoming Public Docket Search',
    coverage: 'Wyoming Supreme Court docket', scope: 'Limited', access: 'Open search',
    url: 'https://efiling.courts.state.wy.us/public/caseSearch.do',
    accessNote: 'This source covers the Wyoming Supreme Court docket, not trial courts.',
  },
];
