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
  Layers3,
  LockKeyhole,
  Menu,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { portals, type PortalScope } from './portals';

type SearchRun = {
  name: string;
  portals: string[];
};

const jurisdictionCount = new Set(portals.map((portal) => portal.state)).size;

function portalFlags(value: boolean) {
  return Object.fromEntries(portals.map((portal) => [portal.id, value])) as Record<string, boolean>;
}

function initialSelection() {
  return Object.fromEntries(
    portals.map((portal) => [portal.id, portal.id === 'mn-mcro' || portal.id === 'wi-wcca']),
  ) as Record<string, boolean>;
}

function parseName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return {
    first: parts.at(0) ?? '',
    middle: parts.length > 2 ? parts.slice(1, -1).join(' ') : '',
    last: parts.length > 1 ? parts.at(-1) ?? '' : '',
  };
}

export default function Home() {
  const [selected, setSelected] = useState<Record<string, boolean>>(initialSelection);
  const [name, setName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [railQuery, setRailQuery] = useState('');
  const [directoryQuery, setDirectoryQuery] = useState('');
  const [scopeFilter, setScopeFilter] = useState<'All' | PortalScope>('All');
  const [showAllSources, setShowAllSources] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [matchMode, setMatchMode] = useState<'broad' | 'exact'>('broad');
  const [showConsent, setShowConsent] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [searchRun, setSearchRun] = useState<SearchRun | null>(null);
  const [opened, setOpened] = useState<Record<string, boolean>>(() => portalFlags(false));
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const selectedCount = useMemo(() => portals.filter((portal) => selected[portal.id]).length, [selected]);
  const reviewedCount = searchRun ? searchRun.portals.filter((id) => opened[id]).length : 0;
  const nameParts = parseName(searchRun?.name ?? name);

  const railPortals = useMemo(() => {
    const query = railQuery.trim().toLowerCase();
    if (!query) return portals;
    return portals.filter((portal) => `${portal.state} ${portal.short} ${portal.name}`.toLowerCase().includes(query));
  }, [railQuery]);

  const directoryPortals = useMemo(() => {
    const query = directoryQuery.trim().toLowerCase();
    return portals.filter((portal) => {
      const matchesQuery = !query || `${portal.state} ${portal.short} ${portal.name} ${portal.coverage}`.toLowerCase().includes(query);
      const matchesScope = scopeFilter === 'All' || portal.scope === scopeFilter;
      return matchesQuery && matchesScope;
    });
  }, [directoryQuery, scopeFilter]);

  const visibleDirectoryPortals = showAllSources || directoryQuery || scopeFilter !== 'All'
    ? directoryPortals
    : directoryPortals.slice(0, 12);

  function togglePortal(id: string) {
    setSelected((current) => ({ ...current, [id]: !current[id] }));
  }

  function toggleAll() {
    setSelected(portalFlags(selectedCount !== portals.length));
  }

  function selectDirectoryResults() {
    setSelected((current) => ({
      ...current,
      ...Object.fromEntries(directoryPortals.map((portal) => [portal.id, true])),
    }));
  }

  function prepareSearch() {
    const nextRun: SearchRun = {
      name: name.trim(),
      portals: portals.filter((portal) => selected[portal.id]).map((portal) => portal.id),
    };
    setSearchRun(nextRun);
    setOpened(portalFlags(false));
    setCopied(false);
    setMenuOpen(false);
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

  function openPortal(id: string) {
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
          <span className="coverage-total"><i /> {portals.length} public portals</span>
          <button className="help-button" type="button" onClick={() => setShowInfo(true)}><CircleHelp size={16} /> How it works</button>
          <button className="menu-button" type="button" aria-label="Toggle jurisdictions" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Menu size={21} /></button>
        </div>
      </header>

      <div className="workspace" id="top">
        {menuOpen && <button className="rail-scrim" type="button" aria-label="Close jurisdictions" onClick={() => setMenuOpen(false)} />}
        <aside className={`source-rail ${menuOpen ? 'open' : ''}`} aria-label="Court sources">
          <div className="rail-heading">
            <div>
              <p>COURT PORTALS</p>
              <span>{selectedCount} of {portals.length} selected</span>
            </div>
            <button type="button" onClick={toggleAll}>{selectedCount === portals.length ? 'Clear' : 'All'}</button>
          </div>

          <label className="rail-search">
            <Search size={14} />
            <input value={railQuery} onChange={(event) => setRailQuery(event.target.value)} placeholder="Filter states or portals" aria-label="Filter state court portals" />
            {railQuery && <button type="button" aria-label="Clear filter" onClick={() => setRailQuery('')}><X size={13} /></button>}
          </label>

          <div className="state-list">
            {railPortals.map((portal) => (
              <button
                className={`state-row ${selected[portal.id] ? 'selected' : ''}`}
                key={portal.id}
                type="button"
                onClick={() => togglePortal(portal.id)}
                aria-pressed={selected[portal.id]}
                title={`${portal.state}: ${portal.name}`}
              >
                <span className="state-code">{portal.short}</span>
                <span className="state-copy"><strong>{portal.state}</strong><small>{portal.name}</small></span>
                <span className="check-box">{selected[portal.id] && <Check size={13} strokeWidth={3} />}</span>
              </button>
            ))}
            {railPortals.length === 0 && <p className="empty-rail">No public portals match that filter.</p>}
          </div>

          <div className="coverage-card">
            <div className="coverage-icon"><Layers3 size={17} /></div>
            <p><strong>{portals.length} verified entry points</strong><span>Covering {jurisdictionCount} states and jurisdictions, with statewide and local scope labeled.</span></p>
            <button type="button" onClick={() => setShowInfo(true)}>About coverage <ArrowRight size={13} /></button>
          </div>
        </aside>

        <section className="main-content" id="search">
          <div className="eyebrow"><span /> PUBLIC RECORD NAVIGATOR</div>
          <h1>Search court records<br />across state lines.</h1>
          <p className="lede">Prepare one name search, choose from {portals.length} public court portals, then review records directly with each official source.</p>

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
            <p><strong>Official sources, no hidden database.</strong> CourtAtlas helps you navigate public portals; records remain on the issuing court or clerk&apos;s website.</p>
          </div>

          {searchRun && (
            <section className="search-workspace" ref={resultsRef} aria-live="polite">
              <div className="workspace-heading">
                <div>
                  <p>SEARCH WORKSPACE</p>
                  <h2>Review public court portals</h2>
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
                      <div><strong>{portal.name}</strong><span className={opened[portal.id] ? 'done-status' : ''}>{opened[portal.id] ? 'Opened' : portal.scope}</span></div>
                      <p>{portal.accessNote}{portal.availabilityNote && <> {portal.availabilityNote}</>}</p>
                    </div>
                    <button type="button" onClick={() => openPortal(portal.id)}>{opened[portal.id] ? 'Open again' : 'Copy name & open'} <ExternalLink size={14} /></button>
                  </article>
                ))}
              </div>

              <div className="handoff-note">
                <Info size={17} />
                <p><strong>Why the extra step?</strong> Courts control their own forms, notices, accounts, and CAPTCHAs. CourtAtlas never bypasses those safeguards or collects the records you view.</p>
                {reviewedCount < searchRun.portals.length && <button type="button" onClick={openNextPortal}>Open next portal <ArrowRight size={14} /></button>}
              </div>
            </section>
          )}

          <section className="sources-section" id="sources">
            <div className="section-title">
              <div><p>PUBLIC SOURCE DIRECTORY</p><h2>{portals.length} court portals in {jurisdictionCount} jurisdictions</h2></div>
              <span><i /> Official court or clerk entry points</span>
            </div>

            <div className="directory-tools">
              <label><Search size={15} /><input value={directoryQuery} onChange={(event) => { setDirectoryQuery(event.target.value); setShowAllSources(true); }} placeholder="Search state, court, or county" aria-label="Search source directory" /></label>
              <div className="scope-tabs" aria-label="Filter by coverage scope">
                {(['All', 'Statewide', 'Limited', 'County'] as const).map((scope) => <button type="button" className={scopeFilter === scope ? 'active' : ''} onClick={() => { setScopeFilter(scope); setShowAllSources(true); }} key={scope}>{scope}</button>)}
              </div>
              <button className="select-results" type="button" disabled={directoryPortals.length === 0} onClick={selectDirectoryResults}>Select {directoryPortals.length}</button>
            </div>

            <div className="directory-summary"><span>Showing {visibleDirectoryPortals.length} of {directoryPortals.length}</span><span><i className="statewide-dot" /> Statewide <i className="limited-dot" /> Limited <i className="county-dot" /> County</span></div>

            <div className="portal-grid">
              {visibleDirectoryPortals.map((portal) => (
                <article className={`portal-card ${selected[portal.id] ? 'selected-card' : ''}`} key={portal.id}>
                  <div className="portal-top">
                    <button className={`portal-seal ${selected[portal.id] ? 'selected' : ''}`} type="button" aria-label={`${selected[portal.id] ? 'Deselect' : 'Select'} ${portal.name}`} aria-pressed={selected[portal.id]} onClick={() => togglePortal(portal.id)}>{selected[portal.id] ? <Check size={14} /> : portal.short}</button>
                    <span className={`scope-pill ${portal.scope.toLowerCase()}`}><i /> {portal.scope}</span>
                  </div>
                  <p className="portal-state">{portal.state.toUpperCase()} · {portal.access.toUpperCase()}</p>
                  <h3>{portal.name}</h3>
                  <p>{portal.coverage}</p>
                  {portal.availabilityNote && <p className="portal-availability"><AlertTriangle size={13} aria-hidden="true" />{portal.availabilityNote}</p>}
                  <div className="card-actions">
                    <button type="button" onClick={() => togglePortal(portal.id)}>{selected[portal.id] ? 'Selected' : 'Add to search'}</button>
                    <a href={portal.url} target="_blank" rel="noreferrer" aria-label={`Visit ${portal.name}`}>Official portal <ExternalLink size={13} /></a>
                  </div>
                </article>
              ))}
            </div>

            {directoryPortals.length === 0 && <div className="empty-directory"><Search size={20} /><strong>No portals found</strong><span>Try a state name, court name, or a different scope.</span></div>}
            {!showAllSources && directoryPortals.length > visibleDirectoryPortals.length && <button className="show-all-button" type="button" onClick={() => setShowAllSources(true)}>Show all {directoryPortals.length} portals <ArrowRight size={14} /></button>}
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
            <p className="modal-lede">CourtAtlas prepares your search and sends you to the selected public portals. It does not retrieve, store, or verify court records.</p>
            <ul>
              <li><CheckCircle2 size={17} /><span><strong>Official court or clerk websites</strong> open in separate tabs.</span></li>
              <li><CheckCircle2 size={17} /><span><strong>Your search name is copied</strong> so you can paste it into each form.</span></li>
              <li><AlertTriangle size={17} /><span><strong>Each source&apos;s terms apply,</strong> including notices, accounts, or CAPTCHA.</span></li>
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
              <div><span>01</span><p><strong>Choose court portals</strong>Filter {portals.length} sources by state and coverage, then select only the ones you need.</p></div>
              <div><span>02</span><p><strong>Prepare the name</strong>CourtAtlas separates the name into useful fields and copies it for each portal.</p></div>
              <div><span>03</span><p><strong>Review at the source</strong>Open each public portal and complete its required terms or verification steps.</p></div>
            </div>
            <div className="roadmap-note"><Info size={17} /><p><strong>Coverage is intentionally precise</strong> {portals.length} entry points cover {jurisdictionCount} jurisdictions. County and limited-court sources are labeled so they are never mistaken for statewide coverage.</p></div>
            <button className="confirm-button" type="button" onClick={() => setShowInfo(false)}>Got it</button>
          </section>
        </div>
      )}
    </main>
  );
}
