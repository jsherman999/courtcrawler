'use client';

import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clipboard,
  ExternalLink,
  FileSearch,
  Info,
  Landmark,
  LockKeyhole,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { FormEvent, useMemo, useRef, useState } from 'react';

type PortalKey = 'mn' | 'wi';

type SearchRun = {
  name: string;
  portals: PortalKey[];
};

const portals = [
  {
    id: 'mn' as const,
    state: 'Minnesota',
    short: 'MN',
    name: 'Minnesota Court Records Online',
    detail: 'Statewide district court case search',
    url: 'https://publicaccess.courts.state.mn.us/CaseSearch',
    accessNote: 'First and last name are required by MCRO.',
  },
  {
    id: 'wi' as const,
    state: 'Wisconsin',
    short: 'WI',
    name: 'Wisconsin Circuit Court Access',
    detail: 'Statewide circuit court case search',
    url: 'https://wcca.wicourts.gov/case.html',
    accessNote: 'WCCA may require its own notice and CAPTCHA.',
  },
];

function parseName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return {
    first: parts.at(0) ?? '',
    middle: parts.length > 2 ? parts.slice(1, -1).join(' ') : '',
    last: parts.length > 1 ? parts.at(-1) ?? '' : '',
  };
}

export default function Home() {
  const [selected, setSelected] = useState<Record<PortalKey, boolean>>({ mn: true, wi: true });
  const [name, setName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [matchMode, setMatchMode] = useState<'broad' | 'exact'>('broad');
  const [showConsent, setShowConsent] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [searchRun, setSearchRun] = useState<SearchRun | null>(null);
  const [opened, setOpened] = useState<Record<PortalKey, boolean>>({ mn: false, wi: false });
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const selectedCount = useMemo(() => Object.values(selected).filter(Boolean).length, [selected]);
  const reviewedCount = searchRun ? searchRun.portals.filter((id) => opened[id]).length : 0;
  const nameParts = parseName(searchRun?.name ?? name);

  function togglePortal(id: PortalKey) {
    setSelected((current) => ({ ...current, [id]: !current[id] }));
  }

  function toggleAll() {
    const next = selectedCount !== portals.length;
    setSelected({ mn: next, wi: next });
  }

  function prepareSearch() {
    const nextRun: SearchRun = {
      name: name.trim(),
      portals: portals.filter((portal) => selected[portal.id]).map((portal) => portal.id),
    };
    setSearchRun(nextRun);
    setOpened({ mn: false, wi: false });
    setCopied(false);
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || selectedCount === 0) return;
    if (consentAccepted) {
      prepareSearch();
    } else {
      setConsentChecked(false);
      setShowConsent(true);
    }
  }

  function confirmSearch() {
    if (!consentChecked) return;
    setConsentAccepted(true);
    setShowConsent(false);
    prepareSearch();
  }

  async function copySearchName() {
    if (!searchRun) return;
    try {
      await navigator.clipboard.writeText(searchRun.name);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function openPortal(id: PortalKey) {
    const portal = portals.find((item) => item.id === id);
    if (!portal || !searchRun) return;
    navigator.clipboard.writeText(searchRun.name).catch(() => undefined);
    window.open(portal.url, '_blank', 'noopener,noreferrer');
    setOpened((current) => ({ ...current, [id]: true }));
  }

  function openNextPortal() {
    const nextId = searchRun?.portals.find((id) => !opened[id]);
    if (nextId) openPortal(nextId);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="CourtAtlas home">
          <span className="brand-mark"><Landmark size={20} strokeWidth={2.25} /></span>
          <span>Court<span>Atlas</span></span>
        </a>
        <nav aria-label="Primary navigation">
          <a className="active" href="#search">Search</a>
          <a href="#sources">Sources</a>
          <a href="#about">About</a>
        </nav>
        <div className="header-actions">
          <button className="help-button" type="button" onClick={() => setShowInfo(true)}><CircleHelp size={16} /> How it works</button>
          <button className="menu-button" type="button" aria-label="Toggle jurisdictions" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button>
        </div>
      </header>

      <div className="workspace" id="top">
        <aside className={`source-rail ${menuOpen ? 'open' : ''}`} aria-label="Court sources">
          <div className="rail-heading">
            <div>
              <p>JURISDICTIONS</p>
              <span>{selectedCount} of {portals.length} selected</span>
            </div>
            <button type="button" onClick={toggleAll}>{selectedCount === portals.length ? 'Clear' : 'All'}</button>
          </div>

          <div className="state-list">
            {portals.map((portal) => (
              <button
                className={`state-row ${selected[portal.id] ? 'selected' : ''}`}
                key={portal.id}
                type="button"
                onClick={() => togglePortal(portal.id)}
                aria-pressed={selected[portal.id]}
              >
                <span className="state-code">{portal.short}</span>
                <span className="state-copy"><strong>{portal.state}</strong><small>1 public portal</small></span>
                <span className="check-box">{selected[portal.id] && <Check size={13} strokeWidth={3} />}</span>
              </button>
            ))}
          </div>

          <div className="coverage-card">
            <div className="coverage-icon"><Landmark size={17} /></div>
            <p><strong>2 state systems</strong><span>More public sources can be added as their access rules are verified.</span></p>
            <button type="button" onClick={() => setShowInfo(true)}>View roadmap <ArrowRight size={13} /></button>
          </div>
        </aside>

        <section className="main-content" id="search">
          <div className="eyebrow"><span /> PUBLIC RECORD NAVIGATOR</div>
          <h1>Search court records<br />across state lines.</h1>
          <p className="lede">Start one search, then review records directly in each state&apos;s official public court system.</p>

          <form className="search-panel" onSubmit={submitSearch}>
            <label htmlFor="name-search">PERSON&apos;S FULL NAME</label>
            <div className="search-control">
              <Search size={20} aria-hidden="true" />
              <input
                id="name-search"
                type="search"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Jordan A. Miller"
                autoComplete="off"
                aria-describedby="name-help"
              />
              <button type="submit" disabled={!name.trim() || selectedCount === 0}>
                Search {selectedCount || ''} {selectedCount === 1 ? 'portal' : 'portals'} <ArrowRight size={17} />
              </button>
            </div>
            <div className="search-options">
              <button type="button" aria-expanded={optionsOpen} onClick={() => setOptionsOpen(!optionsOpen)}><SlidersHorizontal size={15} /> Search options <ChevronDown className={optionsOpen ? 'rotated' : ''} size={14} /></button>
              <span id="name-help"><LockKeyhole size={14} /> Search terms stay on your device</span>
            </div>
            {optionsOpen && (
              <div className="options-drawer">
                <span>NAME MATCH GUIDANCE</span>
                <label><input type="radio" name="match" checked={matchMode === 'broad'} onChange={() => setMatchMode('broad')} /> <strong>Broad</strong><small>Start with the name as entered; adjust on each court site.</small></label>
                <label><input type="radio" name="match" checked={matchMode === 'exact'} onChange={() => setMatchMode('exact')} /> <strong>Exact</strong><small>Use the complete spelling, including middle name.</small></label>
              </div>
            )}
          </form>

          <div className="trust-note">
            <ShieldCheck size={19} />
            <p><strong>Official sources, no hidden database.</strong> CourtAtlas helps you navigate public portals; records remain on the issuing court&apos;s website.</p>
          </div>

          {searchRun && (
            <section className="search-workspace" ref={resultsRef} aria-live="polite">
              <div className="workspace-heading">
                <div>
                  <p>SEARCH WORKSPACE</p>
                  <h2>Review official court portals</h2>
                </div>
                <span>{reviewedCount} of {searchRun.portals.length} opened</span>
              </div>

              <div className="name-summary">
                <div className="summary-main">
                  <span className="summary-icon"><Search size={18} /></span>
                  <div><small>SEARCHING FOR</small><strong>{searchRun.name}</strong></div>
                </div>
                <div className="parsed-name" aria-label="Suggested name fields">
                  <span><small>First</small>{nameParts.first || '—'}</span>
                  {nameParts.middle && <span><small>Middle</small>{nameParts.middle}</span>}
                  <span><small>Last</small>{nameParts.last || '—'}</span>
                </div>
                <button type="button" onClick={copySearchName}>{copied ? <Check size={14} /> : <Clipboard size={14} />}{copied ? 'Copied' : 'Copy name'}</button>
              </div>

              <div className="progress-track" aria-label={`${reviewedCount} of ${searchRun.portals.length} portals opened`}><span style={{ width: `${(reviewedCount / searchRun.portals.length) * 100}%` }} /></div>

              <div className="launch-list">
                {portals.filter((portal) => searchRun.portals.includes(portal.id)).map((portal, index) => (
                  <article className={opened[portal.id] ? 'opened' : ''} key={portal.id}>
                    <span className="step-number">{opened[portal.id] ? <Check size={15} /> : index + 1}</span>
                    <span className="launch-seal">{portal.short}</span>
                    <div className="launch-copy">
                      <div><strong>{portal.name}</strong><span className={opened[portal.id] ? 'done-status' : ''}>{opened[portal.id] ? 'Opened' : 'Ready'}</span></div>
                      <p>{portal.accessNote}</p>
                    </div>
                    <button type="button" onClick={() => openPortal(portal.id)}>{opened[portal.id] ? 'Open again' : 'Copy name & open'} <ExternalLink size={14} /></button>
                  </article>
                ))}
              </div>

              <div className="handoff-note">
                <Info size={17} />
                <p><strong>Why the extra step?</strong> State courts control their own search forms, notices, and CAPTCHAs. CourtAtlas never bypasses those safeguards or collects the records you view.</p>
                {reviewedCount < searchRun.portals.length && <button type="button" onClick={openNextPortal}>Open next portal <ArrowRight size={14} /></button>}
              </div>
            </section>
          )}

          <section className="sources-section" id="sources">
            <div className="section-title">
              <div><p>CONNECTED SOURCES</p><h2>Ready to search</h2></div>
              <span><i /> {portals.length} portals available</span>
            </div>
            <div className="portal-grid">
              {portals.map((portal) => (
                <article className={`portal-card ${selected[portal.id] ? '' : 'muted'}`} key={portal.id}>
                  <div className="portal-top">
                    <span className="portal-seal">{portal.short}</span>
                    <span className="official-pill"><i /> Official source</span>
                  </div>
                  <p className="portal-state">{portal.state.toUpperCase()}</p>
                  <h3>{portal.name}</h3>
                  <p>{portal.detail}</p>
                  <a href={portal.url} target="_blank" rel="noreferrer">Visit official portal <ArrowRight size={14} /></a>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>

      <footer id="about">
        <span><FileSearch size={15} /> CourtAtlas</span>
        <p>Not a government service. Always verify records with the originating court.</p>
      </footer>

      {showConsent && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowConsent(false)}>
          <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="consent-title">
            <button className="modal-close" type="button" aria-label="Close" onClick={() => setShowConsent(false)}><X size={19} /></button>
            <span className="modal-icon"><ShieldCheck size={22} /></span>
            <p className="modal-kicker">PUBLIC ACCESS NOTICE</p>
            <h2 id="consent-title">Before you continue</h2>
            <p className="modal-lede">CourtAtlas prepares your search and sends you to the selected official portals. It does not retrieve, store, or verify court records.</p>
            <ul>
              <li><CheckCircle2 size={17} /><span><strong>Official court websites</strong> open in separate tabs.</span></li>
              <li><CheckCircle2 size={17} /><span><strong>Your search name is copied</strong> so you can paste it into each form.</span></li>
              <li><AlertTriangle size={17} /><span><strong>Each court&apos;s terms apply,</strong> including any notices or CAPTCHA.</span></li>
            </ul>
            <label className="consent-check"><input type="checkbox" checked={consentChecked} onChange={(event) => setConsentChecked(event.target.checked)} /><span>I understand that court records may be incomplete or outdated and must be verified with the originating court.</span></label>
            <button className="confirm-button" type="button" disabled={!consentChecked} onClick={confirmSearch}>Prepare my search <ArrowRight size={16} /></button>
          </section>
        </div>
      )}

      {showInfo && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowInfo(false)}>
          <section className="modal-card info-modal" role="dialog" aria-modal="true" aria-labelledby="info-title">
            <button className="modal-close" type="button" aria-label="Close" onClick={() => setShowInfo(false)}><X size={19} /></button>
            <span className="modal-icon"><Landmark size={22} /></span>
            <p className="modal-kicker">HOW IT WORKS</p>
            <h2 id="info-title">One calm starting point.</h2>
            <div className="how-steps">
              <div><span>01</span><p><strong>Choose jurisdictions</strong>Select only the state court systems you need.</p></div>
              <div><span>02</span><p><strong>Prepare the name</strong>CourtAtlas separates the name into useful fields.</p></div>
              <div><span>03</span><p><strong>Review at the source</strong>Open each official portal and complete its required steps.</p></div>
            </div>
            <div className="roadmap-note"><Info size={17} /><p><strong>Coverage roadmap</strong> Minnesota and Wisconsin are the first verified sources. Additional state and county portals can be added provider by provider.</p></div>
            <button className="confirm-button" type="button" onClick={() => setShowInfo(false)}>Got it</button>
          </section>
        </div>
      )}
    </main>
  );
}
