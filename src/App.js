import { useState, useMemo } from "react";

// ─── SEED DATA ────────────────────────────────────────────────────────────────

const LAZARD_BANKERS_SEED = [
  { id: "lb1", name: "David Kurz", title: "Managing Director", sector: "Industrials", email: "dkurz@lazard.com", phone: "+1 212 555 0101" },
  { id: "lb2", name: "Sarah Mitchell", title: "Managing Director", sector: "Healthcare", email: "smitchell@lazard.com", phone: "+1 212 555 0102" },
  { id: "lb3", name: "James Park", title: "Managing Director", sector: "TMT / Tech", email: "jpark@lazard.com", phone: "+1 212 555 0103" },
  { id: "lb4", name: "Rachel Torres", title: "Managing Director", sector: "Consumer & Retail", email: "rtorres@lazard.com", phone: "+1 212 555 0104" },
  { id: "lb5", name: "Michael Stern", title: "Managing Director", sector: "Energy", email: "mstern@lazard.com", phone: "+1 212 555 0105" },
  { id: "lb6", name: "Amanda Chen", title: "Managing Director", sector: "Financial Institutions", email: "achen@lazard.com", phone: "+1 212 555 0106" },
  { id: "lb7", name: "Tom Willard", title: "Vice President", sector: "Industrials", email: "twilliard@lazard.com", phone: "+1 212 555 0107" },
  { id: "lb8", name: "Priya Nair", title: "Vice President", sector: "Healthcare", email: "pnair@lazard.com", phone: "+1 212 555 0108" },
  { id: "lb9", name: "Kevin Zhao", title: "Vice President", sector: "TMT / Tech", email: "kzhao@lazard.com", phone: "+1 212 555 0109" },
  { id: "lb10", name: "Diana Walsh", title: "Vice President", sector: "Consumer & Retail", email: "dwalsh@lazard.com", phone: "+1 212 555 0110" },
];

const SPONSORS_SEED = [
  { id: "sp1", name: "KKR", aum: "$553B", dryPowder: "$28B", hq: "New York, NY", tier: 1, sectors: ["Industrials", "TMT / Tech", "Healthcare"], website: "kkr.com", notes: "Core Lazard relationship. Key historical mandates in industrials carve-outs." },
  { id: "sp2", name: "Blackstone", aum: "$1.1T", dryPowder: "$62B", hq: "New York, NY", tier: 1, sectors: ["Healthcare", "Consumer & Retail", "Financial Institutions"], website: "blackstone.com", notes: "Largest PE firm globally. PE, RE, Credit arms all active acquirers." },
  { id: "sp3", name: "Apollo", aum: "$651B", dryPowder: "$35B", hq: "New York, NY", tier: 1, sectors: ["Industrials", "Energy", "Financial Institutions"], website: "apollo.com", notes: "Hybrid credit/PE strategies. Very active on distressed and energy." },
  { id: "sp4", name: "Carlyle", aum: "$426B", dryPowder: "$19B", hq: "Washington, DC", tier: 1, sectors: ["Industrials", "Healthcare", "TMT / Tech"], website: "carlyle.com", notes: "Strong in aerospace & defense, government services. Long Lazard history." },
  { id: "sp5", name: "TPG", aum: "$222B", dryPowder: "$14B", hq: "Fort Worth, TX", tier: 1, sectors: ["Healthcare", "TMT / Tech", "Consumer & Retail"], website: "tpg.com", notes: "Growth and buyout. Active in tech-enabled services and healthcare." },
  { id: "sp6", name: "Warburg Pincus", aum: "$83B", dryPowder: "$9B", hq: "New York, NY", tier: 1, sectors: ["Healthcare", "Financial Institutions", "TMT / Tech"], website: "warburgpincus.com", notes: "Strong healthcare IT and fintech franchise. Long-hold mentality." },
  { id: "sp7", name: "Thoma Bravo", aum: "$134B", dryPowder: "$12B", hq: "San Francisco, CA", tier: 1, sectors: ["TMT / Tech"], website: "thomabravo.com", notes: "Dominant software PE. Highly active in cybersecurity and vertical SaaS." },
  { id: "sp8", name: "Vista Equity", aum: "$100B", dryPowder: "$11B", hq: "Austin, TX", tier: 1, sectors: ["TMT / Tech"], website: "vistaequitypartners.com", notes: "B2B software specialist. Very systematic acquirer with operational playbook." },
  { id: "sp9", name: "Hellman & Friedman", aum: "$95B", dryPowder: "$9B", hq: "San Francisco, CA", tier: 1, sectors: ["Financial Institutions", "TMT / Tech", "Healthcare"], website: "hf.com", notes: "Long-hold, high-conviction. Selective mandate work with top boutiques." },
  { id: "sp10", name: "Bain Capital", aum: "$185B", dryPowder: "$10B", hq: "Boston, MA", tier: 2, sectors: ["Healthcare", "Consumer & Retail", "Industrials"], website: "baincapital.com", notes: "Broad mandate across sectors. Strong in consumer and healthcare services." },
  { id: "sp11", name: "Francisco Partners", aum: "$45B", dryPowder: "$6B", hq: "San Francisco, CA", tier: 2, sectors: ["TMT / Tech"], website: "franciscopartners.com", notes: "Tech-focused buyouts. Cybersecurity add-on strategy active." },
  { id: "sp12", name: "Leonard Green", aum: "$70B", dryPowder: "$6B", hq: "Los Angeles, CA", tier: 2, sectors: ["Consumer & Retail", "Healthcare"], website: "leonardgreen.com", notes: "Consumer specialist. Retail, restaurants, healthcare services." },
];

const CONTACTS_SEED = [
  // KKR
  { id: "c1", sponsorId: "sp1", name: "Pete Stavros", title: "Co-Head of Americas PE", sector: "Industrials", email: "pstavros@kkr.com", phone: "+1 212 750 8300", linkedin: "linkedin.com/in/petestavros", recentDeals: ["CHC Group", "Engineered Controls", "Heartland BancCorp"], lastContacted: "2025-03-10", lazardMappings: ["lb1", "lb7"], notes: "Champion of employee ownership. Very relationship-driven. Prefers in-person." },
  { id: "c2", sponsorId: "sp1", name: "Walid Sarkis", title: "Partner, Healthcare", sector: "Healthcare", email: "wsarkis@kkr.com", phone: "+1 212 750 8301", linkedin: "linkedin.com/in/walidsarkis", recentDeals: ["WebMD", "BridgeBio", "Envision Healthcare"], lastContacted: "2025-02-15", lazardMappings: ["lb2", "lb8"], notes: "Key contact for KKR healthcare. Active on pharma services and physician groups." },
  { id: "c3", sponsorId: "sp1", name: "John Park", title: "Partner, TMT", sector: "TMT / Tech", email: "jpark@kkr.com", phone: "+1 650 433 7250", linkedin: "linkedin.com/in/johnparkkkr", recentDeals: ["GoDaddy", "Barracuda Networks", "Calabrio"], lastContacted: "2025-01-20", lazardMappings: ["lb3", "lb9"], notes: "West Coast based. Focused on software take-privates." },
  // Blackstone
  { id: "c4", sponsorId: "sp2", name: "David Blitzer", title: "Senior MD, Tactical Opportunities", sector: "Consumer & Retail", email: "dblitzer@blackstone.com", phone: "+1 212 583 5000", linkedin: "linkedin.com/in/davidblitzer", recentDeals: ["Bumble Bee Foods", "Refresco", "Elior Group"], lastContacted: "2025-03-18", lazardMappings: ["lb4", "lb10"], notes: "Covers broad consumer including food & bev and restaurant. Well-networked." },
  { id: "c5", sponsorId: "sp2", name: "Aris Kekedjian", title: "Managing Director, Healthcare", sector: "Healthcare", email: "akekedjian@blackstone.com", phone: "+1 212 583 5001", linkedin: "linkedin.com/in/ariskekedjian", recentDeals: ["Medline", "TeamHealth", "Lifescan"], lastContacted: "2025-02-20", lazardMappings: ["lb2", "lb8"], notes: "Strong relationships across hospital and med-device segments." },
  { id: "c6", sponsorId: "sp2", name: "Martin Brand", title: "Head of North America PE", sector: "Industrials", email: "mbrand@blackstone.com", phone: "+1 212 583 5002", linkedin: "linkedin.com/in/martinbrand", recentDeals: ["Chamberlain Group", "Copeland", "Gates Industrial"], lastContacted: "2025-01-08", lazardMappings: ["lb1", "lb7"], notes: "Primary industrial coverage contact at BX. Former McKinsey." },
  // Apollo
  { id: "c7", sponsorId: "sp3", name: "Matt Nord", title: "Co-Head of Private Equity", sector: "Industrials", email: "mnord@apollo.com", phone: "+1 212 515 3200", linkedin: "linkedin.com/in/mattnord", recentDeals: ["Arconic", "Rexnord", "Tech Olympic"], lastContacted: "2025-02-28", lazardMappings: ["lb1", "lb7"], notes: "Primarily industrials and chemicals. Aggressive on complex situations." },
  { id: "c8", sponsorId: "sp3", name: "Reed Rayman", title: "Partner, TMT", sector: "TMT / Tech", email: "rrayman@apollo.com", phone: "+1 212 515 3201", linkedin: "linkedin.com/in/reedrayman", recentDeals: ["Presidio", "Shutterfly", "Cox Media"], lastContacted: "2025-01-15", lazardMappings: ["lb3", "lb9"], notes: "Tech and media focus. Noted for complex carve-outs." },
  // Carlyle
  { id: "c9", sponsorId: "sp4", name: "Brian Bernasek", title: "Co-Head, Global Industrials", sector: "Industrials", email: "bbernasek@carlyle.com", phone: "+1 202 729 5626", linkedin: "linkedin.com/in/brianbernasek", recentDeals: ["StandardAero", "Hexion", "Allison Transmission"], lastContacted: "2025-01-15", lazardMappings: ["lb1", "lb7"], notes: "Defense and aerospace specialist. Long Carlyle tenure." },
  { id: "c10", sponsorId: "sp4", name: "Lauren Dillard", title: "Managing Director, Healthcare", sector: "Healthcare", email: "ldillard@carlyle.com", phone: "+1 202 729 5627", linkedin: "linkedin.com/in/laurendillard", recentDeals: ["MedRisk", "Ortho Clinical Diagnostics", "Envision"], lastContacted: "2025-02-01", lazardMappings: ["lb2", "lb8"], notes: "Very active in healthcare IT and diagnostics." },
  // TPG
  { id: "c11", sponsorId: "sp5", name: "Todd Sisitsky", title: "Co-CEO", sector: "Healthcare", email: "tsisitsky@tpg.com", phone: "+1 415 743 1500", linkedin: "linkedin.com/in/toddsisitsky", recentDeals: ["Convey Health", "Confluent Health", "LifeStance"], lastContacted: "2025-02-10", lazardMappings: ["lb2", "lb8"], notes: "Senior relationship. Healthcare platform and services focus." },
  { id: "c12", sponsorId: "sp5", name: "Nehal Raj", title: "Co-Managing Partner, Tech", sector: "TMT / Tech", email: "nraj@tpg.com", phone: "+1 415 743 1501", linkedin: "linkedin.com/in/nehalraj", recentDeals: ["McAfee", "Boomi", "DigiCert"], lastContacted: "2025-01-25", lazardMappings: ["lb3", "lb9"], notes: "Led several take-privates. Strong in security software." },
  // Warburg
  { id: "c13", sponsorId: "sp6", name: "Cary Davis", title: "Managing Director", sector: "Healthcare", email: "cdavis@warburgpincus.com", phone: "+1 212 878 0600", linkedin: "linkedin.com/in/carydavis", recentDeals: ["Alignment Healthcare", "Modernizing Medicine", "Teladoc"], lastContacted: "2025-03-05", lazardMappings: ["lb2", "lb8"], notes: "Healthcare IT and tech-enabled services. Very active dealmaker." },
  // Thoma Bravo
  { id: "c14", sponsorId: "sp7", name: "Orlando Bravo", title: "Founder & Managing Partner", sector: "TMT / Tech", email: "obravo@thomabravo.com", phone: "+1 415 263 2100", linkedin: "linkedin.com/in/orlandobravo", recentDeals: ["Proofpoint", "SolarWinds", "Ping Identity"], lastContacted: "2025-03-12", lazardMappings: ["lb3", "lb9"], notes: "Founder relationship — handled at MD level only. High-priority." },
  // Vista
  { id: "c15", sponsorId: "sp8", name: "Robert Smith", title: "Founder & CEO", sector: "TMT / Tech", email: "rsmith@vistaequitypartners.com", phone: "+1 512 730 2400", linkedin: "linkedin.com/in/robertsmithvista", recentDeals: ["Solera", "Ping Identity", "Cvent"], lastContacted: "2025-03-20", lazardMappings: ["lb3", "lb9"], notes: "Ultimate decision-maker. All Vista pitches route through his deal team." },
];

const ACTIVITIES_SEED = [
  { id: "a1", date: "2025-03-20", sponsorId: "sp8", contactId: "c15", lazardBankerId: "lb3", type: "Meeting", description: "Vertical SaaS pipeline discussion — 3 targets reviewed", outcome: "Positive", nextAction: "Send updated target tearsheets by 3/27", status: "Complete" },
  { id: "a2", date: "2025-03-18", sponsorId: "sp2", contactId: "c4", lazardBankerId: "lb4", type: "Pitch", description: "Sell-side advisory pitch — consumer food platform", outcome: "Shortlisted", nextAction: "Final round presentation week of 3/31", status: "Pending" },
  { id: "a3", date: "2025-03-12", sponsorId: "sp7", contactId: "c14", lazardBankerId: "lb3", type: "Meeting", description: "Quarterly coverage call — cybersecurity landscape", outcome: "Strong interest in managed security thesis", nextAction: "Prepare target list", status: "Complete" },
  { id: "a4", date: "2025-03-10", sponsorId: "sp1", contactId: "c1", lazardBankerId: "lb1", type: "Meeting", description: "Breakfast — industrial carve-out pipeline review", outcome: "Warm, active dialogue", nextAction: "Follow up on Q2 pipeline", status: "Complete" },
  { id: "a5", date: "2025-03-05", sponsorId: "sp6", contactId: "c13", lazardBankerId: "lb2", type: "Pitch", description: "Healthcare IT roll-up sell-side mandate pitch", outcome: "Shortlisted — final round", nextAction: "Prepare final pitch", status: "Pending" },
  { id: "a6", date: "2025-02-28", sponsorId: "sp3", contactId: "c7", lazardBankerId: "lb1", type: "Conference", description: "SuperReturn International — dinner + panel session", outcome: "New intro: Apollo energy team", nextAction: "Send follow-up note", status: "Complete" },
  { id: "a7", date: "2025-02-20", sponsorId: "sp2", contactId: "c5", lazardBankerId: "lb2", type: "Meeting", description: "Healthcare services platform — strategic options", outcome: "Exploring dual-track process", nextAction: "Draft process overview", status: "In Progress" },
  { id: "a8", date: "2025-02-10", sponsorId: "sp5", contactId: "c11", lazardBankerId: "lb2", type: "Pitch", description: "Healthcare services buy-side advisory", outcome: "Not selected", nextAction: "Re-engage Q3", status: "Lost" },
  { id: "a9", date: "2025-01-15", sponsorId: "sp4", contactId: "c9", lazardBankerId: "lb1", type: "Conference", description: "Defense tech symposium — intro to new Carlyle partner", outcome: "Strong intro", nextAction: "Schedule formal coverage meeting", status: "Complete" },
  { id: "a10", date: "2025-01-20", sponsorId: "sp1", contactId: "c3", lazardBankerId: "lb3", type: "Meeting", description: "Software take-private target screening", outcome: "3 targets provided for review", nextAction: "Follow up on feedback", status: "Complete" },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const SECTORS = ["Industrials", "Healthcare", "TMT / Tech", "Consumer & Retail", "Energy", "Financial Institutions"];
const TIERS = [1, 2, 3];
const ACTIVITY_TYPES = ["Meeting", "Pitch", "Conference", "Call"];
const STATUSES = ["Complete", "Pending", "In Progress", "Lost", "Won"];
const TITLES = ["Founder & CEO", "Founder & Managing Partner", "Co-CEO", "Senior MD", "Co-Head", "Head", "Managing Director", "Partner", "Co-Managing Partner", "Director", "Vice President", "Principal", "Associate"];
const LZ_TITLES = ["Managing Director", "Vice President", "Director", "Associate", "Analyst"];

const SECTOR_COLORS = {
  "Industrials": "#c9813a", "Healthcare": "#4caf82", "TMT / Tech": "#6b9bbb",
  "Consumer & Retail": "#b06bbb", "Energy": "#c9a84c", "Financial Institutions": "#6bbbb0",
};
const STATUS_COLORS = { "Complete": "#4caf82", "Pending": "#c9a84c", "In Progress": "#6b9bbb", "Lost": "#c0392b", "Won": "#27ae60" };
const TIER_COLORS = { 1: "#c9a84c", 2: "#6b9bbb", 3: "#666" };

function daysSince(dateStr) {
  if (!dateStr) return 999;
  return Math.floor((new Date("2025-03-26") - new Date(dateStr)) / 86400000);
}
function StallBadge({ date }) {
  const d = daysSince(date);
  const color = d > 60 ? "#e74c3c" : d > 30 ? "#c9a84c" : "#4caf82";
  return <span style={{ background: color + "22", color, border: `1px solid ${color}44`, borderRadius: 3, fontSize: 10, padding: "2px 7px", fontWeight: 600, whiteSpace: "nowrap" }}>{d > 0 ? `${d}d ago` : "Today"}</span>;
}
function SectorTag({ sector }) {
  const c = SECTOR_COLORS[sector] || "#666";
  return <span style={{ background: c + "18", color: c, border: `1px solid ${c}33`, borderRadius: 3, fontSize: 10, padding: "2px 7px", margin: "1px", display: "inline-block" }}>{sector}</span>;
}
function uid() { return Math.random().toString(36).slice(2, 9); }

// ─── MODAL SHELL ─────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, width = 640 }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#000c", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: 8, width, maxWidth: "95vw", maxHeight: "88vh", overflowY: "auto", padding: 28 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 18, color: "#c9a84c" }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#555", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── FORM FIELD ───────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
      {children}
    </div>
  );
}
const inputStyle = { background: "#111", border: "1px solid #2a2a2a", borderRadius: 4, color: "#e8e0d0", fontFamily: "'DM Mono',monospace", fontSize: 12, padding: "8px 11px", width: "100%", outline: "none" };
const selectStyle = { ...inputStyle, cursor: "pointer" };

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function LazardFSGCRM() {
  const [tab, setTab] = useState("dashboard");
  const [sponsors, setSponsors] = useState(SPONSORS_SEED);
  const [contacts, setContacts] = useState(CONTACTS_SEED);
  const [bankers, setBankers] = useState(LAZARD_BANKERS_SEED);
  const [activities, setActivities] = useState(ACTIVITIES_SEED);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [tierFilter, setTierFilter] = useState("All");

  // modals
  const [viewSponsor, setViewSponsor] = useState(null);
  const [viewContact, setViewContact] = useState(null);
  const [addSponsorOpen, setAddSponsorOpen] = useState(false);
  const [addContactOpen, setAddContactOpen] = useState(false);
  const [addActivityOpen, setAddActivityOpen] = useState(false);
  const [addBankerOpen, setAddBankerOpen] = useState(false);
  const [editSponsor, setEditSponsor] = useState(null);
  const [editContact, setEditContact] = useState(null);

  // ── helpers ──
  const getSponsor = id => sponsors.find(s => s.id === id);
  const getContact = id => contacts.find(c => c.id === id);
  const getBanker = id => bankers.find(b => b.id === id);
  const sponsorActivities = sponsorId => activities.filter(a => a.sponsorId === sponsorId);
  const contactActivities = contactId => activities.filter(a => a.contactId === contactId);
  const sponsorContacts = sponsorId => contacts.filter(c => c.sponsorId === sponsorId);
  const lastTouchForSponsor = sponsorId => {
    const acts = sponsorActivities(sponsorId);
    if (!acts.length) return null;
    return acts.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date;
  };
  const lastTouchForContact = contactId => {
    const acts = contactActivities(contactId);
    if (!acts.length) return null;
    return acts.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date;
  };

  // ── stats ──
  const stats = useMemo(() => ({
    tier1: sponsors.filter(s => s.tier === 1).length,
    contacts: contacts.length,
    pitches: activities.filter(a => a.type === "Pitch").length,
    meetings: activities.filter(a => a.type === "Meeting").length,
    stale: sponsors.filter(s => { const lt = lastTouchForSponsor(s.id); return !lt || daysSince(lt) > 45; }).length,
    pending: activities.filter(a => a.status === "Pending").length,
  }), [sponsors, contacts, activities]);

  // ── filtered lists ──
  const filteredSponsors = useMemo(() => sponsors.filter(s => {
    const ms = s.name.toLowerCase().includes(search.toLowerCase());
    const mt = tierFilter === "All" || s.tier === Number(tierFilter);
    const msec = sectorFilter === "All" || s.sectors.includes(sectorFilter);
    return ms && mt && msec;
  }), [sponsors, search, tierFilter, sectorFilter]);

  const filteredContacts = useMemo(() => contacts.filter(c => {
    const sp = getSponsor(c.sponsorId);
    const ms = c.name.toLowerCase().includes(search.toLowerCase()) || (sp && sp.name.toLowerCase().includes(search.toLowerCase()));
    const msec = sectorFilter === "All" || c.sector === sectorFilter;
    return ms && msec;
  }), [contacts, sponsors, search, sectorFilter]);

  const filteredActivities = useMemo(() => activities.filter(a => {
    const sp = getSponsor(a.sponsorId);
    const ct = getContact(a.contactId);
    const ms = (sp && sp.name.toLowerCase().includes(search.toLowerCase())) || (ct && ct.name.toLowerCase().includes(search.toLowerCase())) || a.description.toLowerCase().includes(search.toLowerCase());
    const mt = typeFilter === "All" || a.type === typeFilter;
    return ms && mt;
  }), [activities, sponsors, contacts, search, typeFilter]);

  // ── CRUD ──
  function saveSponsor(data) {
    if (data.id) setSponsors(prev => prev.map(s => s.id === data.id ? data : s));
    else setSponsors(prev => [...prev, { ...data, id: "sp" + uid() }]);
  }
  function saveContact(data) {
    if (data.id) setContacts(prev => prev.map(c => c.id === data.id ? data : c));
    else setContacts(prev => [...prev, { ...data, id: "c" + uid() }]);
  }
  function saveActivity(data) {
    setActivities(prev => [...prev, { ...data, id: "a" + uid() }]);
  }
  function saveBanker(data) {
    setBankers(prev => [...prev, { ...data, id: "lb" + uid() }]);
  }
  function deleteSponsor(id) {
    setSponsors(prev => prev.filter(s => s.id !== id));
    setContacts(prev => prev.filter(c => c.sponsorId !== id));
    setViewSponsor(null);
  }
  function deleteContact(id) {
    setContacts(prev => prev.filter(c => c.id !== id));
    setViewContact(null);
  }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:#111}
    ::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}
    body{background:#0d0d0d}
    .crm{min-height:100vh;background:#0d0d0d;color:#e8e0d0;font-family:'DM Mono',monospace}
    .hdr{background:#0f0f0f;border-bottom:1px solid #1e1e1e;padding:0 28px;display:flex;align-items:center;justify-content:space-between;height:54px;position:sticky;top:0;z-index:50}
    .hdr-logo{font-family:'Libre Baskerville',serif;font-size:14px;letter-spacing:.1em;color:#c9a84c}
    .hdr-sub{font-size:9px;color:#444;letter-spacing:.18em;text-transform:uppercase;margin-top:1px}
    .nav{display:flex;gap:1px}
    .nb{background:none;border:none;color:#555;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.12em;text-transform:uppercase;padding:7px 14px;cursor:pointer;border-radius:3px;transition:all .15s}
    .nb:hover{color:#c9a84c;background:#c9a84c0d}
    .nb.on{color:#c9a84c;background:#c9a84c14;border-bottom:2px solid #c9a84c;border-radius:3px 3px 0 0}
    .main{padding:24px 28px;max-width:1440px}
    .pg-title{font-family:'Libre Baskerville',serif;font-size:19px;color:#e8e0d0;margin-bottom:2px}
    .pg-sub{font-size:10px;color:#444;letter-spacing:.12em;margin-bottom:22px}
    .stats{display:grid;grid-template-columns:repeat(6,1fr);gap:10px;margin-bottom:28px}
    .stat{background:#111;border:1px solid #1e1e1e;border-radius:5px;padding:16px 14px}
    .sv{font-family:'Libre Baskerville',serif;font-size:26px;color:#c9a84c}
    .sl{font-size:9px;color:#444;letter-spacing:.14em;text-transform:uppercase;margin-top:3px}
    .toolbar{display:flex;gap:8px;margin-bottom:18px;align-items:center;flex-wrap:wrap}
    .si{background:#111;border:1px solid #1e1e1e;border-radius:3px;color:#e8e0d0;font-family:'DM Mono',monospace;font-size:11px;padding:7px 12px;width:220px;outline:none}
    .si:focus{border-color:#c9a84c55}
    .si::placeholder{color:#333}
    .fb{background:#111;border:1px solid #1e1e1e;border-radius:3px;color:#555;font-family:'DM Mono',monospace;font-size:10px;padding:7px 12px;cursor:pointer;transition:all .15s}
    .fb:hover,.fb.on{border-color:#c9a84c55;color:#c9a84c;background:#c9a84c0d}
    .add-btn{background:#c9a84c;border:none;border-radius:3px;color:#0d0d0d;font-family:'DM Mono',monospace;font-size:10px;font-weight:500;padding:7px 14px;cursor:pointer;letter-spacing:.05em;margin-left:auto;transition:opacity .15s}
    .add-btn:hover{opacity:.85}
    .tbl{width:100%;border-collapse:collapse;font-size:11px}
    .tbl th{text-align:left;font-size:9px;color:#444;letter-spacing:.14em;text-transform:uppercase;padding:7px 10px;border-bottom:1px solid #1a1a1a}
    .tbl td{padding:10px 10px;border-bottom:1px solid #161616;vertical-align:middle}
    .tbl tr:hover td{background:#131313;cursor:pointer}
    .sn{font-family:'Libre Baskerville',serif;font-size:12px;color:#e8e0d0}
    .twocol{display:grid;grid-template-columns:1fr 1fr;gap:18px}
    .panel{background:#111;border:1px solid #1e1e1e;border-radius:5px;padding:18px}
    .ptitle{font-size:9px;color:#444;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px;border-bottom:1px solid #191919;padding-bottom:8px}
    .arow{display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #161616;align-items:flex-start}
    .at{font-size:11px;color:#e8e0d0;margin-bottom:2px}
    .am{font-size:10px;color:#444}
    .chip{display:inline-flex;align-items:center;gap:5px;background:#1a1a1a;border:1px solid #222;border-radius:3px;padding:3px 8px;font-size:10px;color:#888}
    .mf{background:#111;border:1px solid #1e1e1e;border-radius:4px;padding:11px}
    .mfl{font-size:9px;color:#444;letter-spacing:.1em;text-transform:uppercase;margin-bottom:3px}
    .mfv{font-size:12px;color:#e8e0d0}
    .mgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
    .empty{color:#333;font-size:11px;padding:18px 0;text-align:center}
    .action-link{color:#c9a84c;text-decoration:none;font-size:10px;cursor:pointer;background:none;border:none;font-family:'DM Mono',monospace;padding:0}
    .action-link:hover{text-decoration:underline}
    .danger-btn{background:#c0392b22;border:1px solid #c0392b44;border-radius:3px;color:#e74c3c;font-family:'DM Mono',monospace;font-size:10px;padding:6px 12px;cursor:pointer}
    .map-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #191919}
    .arrow{color:#c9a84c;font-size:12px;flex-shrink:0}
    .banker-card{background:#0f0f0f;border:1px solid #1e1e1e;border-radius:4px;padding:8px 11px}
    .contact-card{background:#0f0f0f;border:1px solid #1e1e1e;border-radius:4px;padding:8px 11px;cursor:pointer}
    .contact-card:hover{border-color:#c9a84c44}
    .save-btn{background:#c9a84c;border:none;border-radius:3px;color:#0d0d0d;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;padding:9px 20px;cursor:pointer;margin-top:6px}
    .save-btn:hover{opacity:.85}
    .cancel-btn{background:#1a1a1a;border:1px solid #222;border-radius:3px;color:#888;font-family:'DM Mono',monospace;font-size:11px;padding:9px 16px;cursor:pointer;margin-top:6px;margin-left:8px}
  `;

  // ─── SPONSOR FORM ──────────────────────────────────────────────────────────
  function SponsorForm({ initial, onSave, onClose }) {
    const blank = { name: "", aum: "", dryPowder: "", hq: "", tier: 1, sectors: [], website: "", notes: "" };
    const [form, setForm] = useState(initial || blank);
    const toggleSector = s => setForm(f => ({ ...f, sectors: f.sectors.includes(s) ? f.sectors.filter(x => x !== s) : [...f.sectors, s] }));
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Firm Name"><input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. KKR" /></Field>
          <Field label="AUM"><input style={inputStyle} value={form.aum} onChange={e => setForm(f => ({ ...f, aum: e.target.value }))} placeholder="e.g. $50B" /></Field>
          <Field label="Dry Powder"><input style={inputStyle} value={form.dryPowder} onChange={e => setForm(f => ({ ...f, dryPowder: e.target.value }))} placeholder="e.g. $8B" /></Field>
          <Field label="HQ"><input style={inputStyle} value={form.hq} onChange={e => setForm(f => ({ ...f, hq: e.target.value }))} placeholder="e.g. New York, NY" /></Field>
          <Field label="Website"><input style={inputStyle} value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="e.g. kkr.com" /></Field>
          <Field label="Coverage Tier">
            <select style={selectStyle} value={form.tier} onChange={e => setForm(f => ({ ...f, tier: Number(e.target.value) }))}>
              {TIERS.map(t => <option key={t} value={t}>Tier {t}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Sector Focus">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {SECTORS.map(s => (
              <button key={s} onClick={() => toggleSector(s)} style={{ background: form.sectors.includes(s) ? SECTOR_COLORS[s] + "22" : "#111", border: `1px solid ${form.sectors.includes(s) ? SECTOR_COLORS[s] + "66" : "#222"}`, borderRadius: 3, color: form.sectors.includes(s) ? SECTOR_COLORS[s] : "#555", fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "5px 10px", cursor: "pointer" }}>{s}</button>
            ))}
          </div>
        </Field>
        <Field label="Notes"><textarea style={{ ...inputStyle, height: 70, resize: "vertical" }} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Relationship context, key notes..." /></Field>
        <button className="save-btn" onClick={() => { onSave(form); onClose(); }}>Save Firm</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    );
  }

  // ─── CONTACT FORM ──────────────────────────────────────────────────────────
  function ContactForm({ initial, onSave, onClose }) {
    const blank = { name: "", title: "", sponsorId: "", sector: "", email: "", phone: "", linkedin: "", recentDeals: [], lastContacted: "", lazardMappings: [], notes: "" };
    const [form, setForm] = useState(initial ? { ...initial, recentDeals: initial.recentDeals || [] } : blank);
    const [dealInput, setDealInput] = useState("");
    const toggleLz = id => setForm(f => ({ ...f, lazardMappings: f.lazardMappings.includes(id) ? f.lazardMappings.filter(x => x !== id) : [...f.lazardMappings, id] }));
    const addDeal = () => { if (dealInput.trim()) { setForm(f => ({ ...f, recentDeals: [...f.recentDeals, dealInput.trim()] })); setDealInput(""); } };
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Full Name"><input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Pete Stavros" /></Field>
          <Field label="Title">
            <select style={selectStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}>
              <option value="">Select title...</option>
              {TITLES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="PE Firm">
            <select style={selectStyle} value={form.sponsorId} onChange={e => setForm(f => ({ ...f, sponsorId: e.target.value }))}>
              <option value="">Select firm...</option>
              {sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Sector Coverage">
            <select style={selectStyle} value={form.sector} onChange={e => setForm(f => ({ ...f, sector: e.target.value }))}>
              <option value="">Select sector...</option>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Email"><input style={inputStyle} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="name@firm.com" /></Field>
          <Field label="Phone"><input style={inputStyle} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 212..." /></Field>
          <Field label="LinkedIn"><input style={inputStyle} value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="linkedin.com/in/..." /></Field>
          <Field label="Last Contacted"><input type="date" style={inputStyle} value={form.lastContacted} onChange={e => setForm(f => ({ ...f, lastContacted: e.target.value }))} /></Field>
        </div>
        <Field label="Recent Deals">
          <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <input style={{ ...inputStyle, flex: 1 }} value={dealInput} onChange={e => setDealInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addDeal()} placeholder="Add deal and press Enter..." />
            <button className="add-btn" style={{ marginLeft: 0 }} onClick={addDeal}>+ Add</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {form.recentDeals.map((d, i) => (
              <span key={i} className="chip">{d} <span style={{ cursor: "pointer", color: "#e74c3c" }} onClick={() => setForm(f => ({ ...f, recentDeals: f.recentDeals.filter((_, j) => j !== i) }))}>×</span></span>
            ))}
          </div>
        </Field>
        <Field label="Map to Lazard Bankers">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {bankers.map(b => (
              <button key={b.id} onClick={() => toggleLz(b.id)} style={{ background: form.lazardMappings.includes(b.id) ? "#c9a84c22" : "#111", border: `1px solid ${form.lazardMappings.includes(b.id) ? "#c9a84c66" : "#222"}`, borderRadius: 3, color: form.lazardMappings.includes(b.id) ? "#c9a84c" : "#555", fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "5px 10px", cursor: "pointer" }}>{b.name} · {b.sector}</button>
            ))}
          </div>
        </Field>
        <Field label="Notes"><textarea style={{ ...inputStyle, height: 70, resize: "vertical" }} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Relationship notes, personality, preferences..." /></Field>
        <button className="save-btn" onClick={() => { onSave(form); onClose(); }}>Save Contact</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    );
  }

  // ─── ACTIVITY FORM ────────────────────────────────────────────────────────
  function ActivityForm({ onSave, onClose }) {
    const [form, setForm] = useState({ date: "2025-03-26", sponsorId: "", contactId: "", lazardBankerId: "", type: "Meeting", description: "", outcome: "", nextAction: "", status: "Pending" });
    const availableContacts = contacts.filter(c => !form.sponsorId || c.sponsorId === form.sponsorId);
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Date"><input type="date" style={inputStyle} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></Field>
          <Field label="Activity Type">
            <select style={selectStyle} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
              {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="PE Firm">
            <select style={selectStyle} value={form.sponsorId} onChange={e => setForm(f => ({ ...f, sponsorId: e.target.value, contactId: "" }))}>
              <option value="">Select firm...</option>
              {sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>
          <Field label="Contact at Firm">
            <select style={selectStyle} value={form.contactId} onChange={e => setForm(f => ({ ...f, contactId: e.target.value }))}>
              <option value="">Select contact...</option>
              {availableContacts.map(c => <option key={c.id} value={c.id}>{c.name} · {c.title}</option>)}
            </select>
          </Field>
          <Field label="Lazard Banker">
            <select style={selectStyle} value={form.lazardBankerId} onChange={e => setForm(f => ({ ...f, lazardBankerId: e.target.value }))}>
              <option value="">Select banker...</option>
              {bankers.map(b => <option key={b.id} value={b.id}>{b.name} · {b.sector}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select style={selectStyle} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Description"><textarea style={{ ...inputStyle, height: 60, resize: "vertical" }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What was discussed?" /></Field>
        <Field label="Outcome"><input style={inputStyle} value={form.outcome} onChange={e => setForm(f => ({ ...f, outcome: e.target.value }))} placeholder="Key result or response..." /></Field>
        <Field label="Next Action"><input style={inputStyle} value={form.nextAction} onChange={e => setForm(f => ({ ...f, nextAction: e.target.value }))} placeholder="What needs to happen next?" /></Field>
        <button className="save-btn" onClick={() => { onSave(form); onClose(); }}>Log Activity</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    );
  }

  // ─── BANKER FORM ─────────────────────────────────────────────────────────
  function BankerForm({ onSave, onClose }) {
    const [form, setForm] = useState({ name: "", title: "Managing Director", sector: "Industrials", email: "", phone: "" });
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <Field label="Full Name"><input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. John Smith" /></Field>
          <Field label="Title">
            <select style={selectStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}>
              {LZ_TITLES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Sector">
            <select style={selectStyle} value={form.sector} onChange={e => setForm(f => ({ ...f, sector: e.target.value }))}>
              {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Email"><input style={inputStyle} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="name@lazard.com" /></Field>
          <Field label="Phone"><input style={inputStyle} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 212..." /></Field>
        </div>
        <button className="save-btn" onClick={() => { onSave(form); onClose(); }}>Add Banker</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    );
  }

  // ─── SPONSOR DETAIL MODAL ────────────────────────────────────────────────
  function SponsorDetail({ sponsor }) {
    const cts = sponsorContacts(sponsor.id);
    const acts = sponsorActivities(sponsor.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    const lt = lastTouchForSponsor(sponsor.id);
    return (
      <Modal title={sponsor.name} onClose={() => setViewSponsor(null)} width={780}>
        {lt && daysSince(lt) > 45 && <div style={{ background: "#c0392b11", border: "1px solid #c0392b33", borderRadius: 4, padding: "9px 13px", marginBottom: 14, fontSize: 11, color: "#e74c3c" }}>⚠ Coverage stale — last touchpoint {daysSince(lt)} days ago</div>}
        <div className="mgrid">
          <div className="mf"><div className="mfl">AUM</div><div className="mfv">{sponsor.aum}</div></div>
          <div className="mf"><div className="mfl">Dry Powder</div><div className="mfv" style={{ color: "#c9a84c" }}>{sponsor.dryPowder}</div></div>
          <div className="mf"><div className="mfl">HQ</div><div className="mfv">{sponsor.hq}</div></div>
          <div className="mf"><div className="mfl">Tier</div><div className="mfv" style={{ color: TIER_COLORS[sponsor.tier] }}>Tier {sponsor.tier}</div></div>
          <div className="mf"><div className="mfl">Last Touchpoint</div><div className="mfv">{lt ? <StallBadge date={lt} /> : <span style={{ color: "#444", fontSize: 11 }}>None logged</span>}</div></div>
          <div className="mf"><div className="mfl">Website</div><div className="mfv" style={{ color: "#6b9bbb", fontSize: 11 }}>{sponsor.website}</div></div>
        </div>
        <div className="mf" style={{ marginBottom: 14 }}><div className="mfl">Sector Focus</div><div style={{ marginTop: 5 }}>{sponsor.sectors.map(s => <SectorTag key={s} sector={s} />)}</div></div>
        <div className="mf" style={{ marginBottom: 18 }}><div className="mfl">Notes</div><div className="mfv" style={{ color: "#aaa", lineHeight: 1.6, marginTop: 4 }}>{sponsor.notes}</div></div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="ptitle" style={{ marginBottom: 0 }}>Contacts at {sponsor.name} ({cts.length})</div>
          <button className="add-btn" style={{ fontSize: 9, padding: "5px 10px" }} onClick={() => { setViewSponsor(null); setAddContactOpen(true); }}>+ Add Contact</button>
        </div>
        {cts.length === 0 ? <div className="empty">No contacts yet — add your first.</div> : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
            {cts.map(c => (
              <div key={c.id} className="contact-card" onClick={() => { setViewSponsor(null); setViewContact(c); }}>
                <div style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 12, color: "#e8e0d0" }}>{c.name}</div>
                <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{c.title}</div>
                <div style={{ marginTop: 4 }}><SectorTag sector={c.sector} /></div>
                <div style={{ marginTop: 5 }}>{c.lastContacted ? <StallBadge date={c.lastContacted} /> : <span style={{ color: "#333", fontSize: 10 }}>Never contacted</span>}</div>
              </div>
            ))}
          </div>
        )}
        <div className="ptitle">Activity History ({acts.length})</div>
        {acts.length === 0 ? <div className="empty">No activities logged.</div> : acts.slice(0, 5).map(a => {
          const bk = getBanker(a.lazardBankerId);
          const ct = getContact(a.contactId);
          return (
            <div className="arow" key={a.id}>
              <div style={{ flex: 1 }}>
                <div className="at">{a.type} — {a.date} {ct && <span style={{ color: "#555" }}>w/ {ct.name}</span>}</div>
                <div className="am">{a.description}</div>
                {bk && <div style={{ fontSize: 10, color: "#c9a84c55", marginTop: 2 }}>Lazard: {bk.name}</div>}
                {a.nextAction && <div style={{ fontSize: 10, color: "#c9a84c", marginTop: 3 }}>→ {a.nextAction}</div>}
              </div>
              <span style={{ background: STATUS_COLORS[a.status] + "22", color: STATUS_COLORS[a.status], border: `1px solid ${STATUS_COLORS[a.status]}44`, borderRadius: 3, fontSize: 9, padding: "2px 6px" }}>{a.status}</span>
            </div>
          );
        })}
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <button className="add-btn" onClick={() => { setViewSponsor(null); setAddActivityOpen(true); }}>+ Log Activity</button>
          <button style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 3, color: "#888", fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "7px 14px", cursor: "pointer" }} onClick={() => { setEditSponsor(sponsor); setViewSponsor(null); }}>Edit Firm</button>
          <button className="danger-btn" onClick={() => deleteSponsor(sponsor.id)}>Delete</button>
        </div>
      </Modal>
    );
  }

  // ─── CONTACT DETAIL MODAL ────────────────────────────────────────────────
  function ContactDetail({ contact }) {
    const sp = getSponsor(contact.sponsorId);
    const acts = contactActivities(contact.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    const mappedBankers = (contact.lazardMappings || []).map(id => getBanker(id)).filter(Boolean);
    return (
      <Modal title={contact.name} onClose={() => setViewContact(null)} width={720}>
        <div style={{ fontSize: 11, color: "#555", marginBottom: 14 }}>{contact.title} · {sp ? sp.name : "—"}</div>
        <div className="mgrid">
          <div className="mf"><div className="mfl">Sector</div><div><SectorTag sector={contact.sector} /></div></div>
          <div className="mf"><div className="mfl">Last Contacted</div><div>{contact.lastContacted ? <StallBadge date={contact.lastContacted} /> : <span style={{ color: "#333", fontSize: 11 }}>Never</span>}</div></div>
          <div className="mf"><div className="mfl">Email</div><div className="mfv" style={{ color: "#6b9bbb", fontSize: 11 }}>{contact.email}</div></div>
          <div className="mf"><div className="mfl">Phone</div><div className="mfv" style={{ fontSize: 11 }}>{contact.phone}</div></div>
        </div>
        {contact.linkedin && <div className="mf" style={{ marginBottom: 12 }}><div className="mfl">LinkedIn</div><div className="mfv" style={{ color: "#6b9bbb", fontSize: 11 }}>{contact.linkedin}</div></div>}
        {contact.recentDeals?.length > 0 && (
          <div className="mf" style={{ marginBottom: 14 }}>
            <div className="mfl">Known Deals</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 5 }}>{contact.recentDeals.map((d, i) => <span key={i} className="chip">{d}</span>)}</div>
          </div>
        )}
        {/* RELATIONSHIP MAPPING */}
        <div style={{ marginBottom: 18 }}>
          <div className="ptitle">Lazard Coverage Mapping</div>
          {mappedBankers.length === 0 ? <div className="empty">No Lazard bankers mapped yet.</div> : mappedBankers.map(b => (
            <div key={b.id} className="map-row">
              <div className="contact-card" style={{ flex: 1, cursor: "default" }}>
                <div style={{ fontSize: 11, color: "#e8e0d0" }}>{contact.name}</div>
                <div style={{ fontSize: 10, color: "#555" }}>{contact.title} · {sp?.name}</div>
                <SectorTag sector={contact.sector} />
              </div>
              <div className="arrow">⟷</div>
              <div className="banker-card" style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#c9a84c" }}>{b.name}</div>
                <div style={{ fontSize: 10, color: "#555" }}>{b.title} · Lazard {b.sector}</div>
              </div>
            </div>
          ))}
        </div>
        {contact.notes && <div className="mf" style={{ marginBottom: 14 }}><div className="mfl">Notes</div><div className="mfv" style={{ color: "#aaa", lineHeight: 1.6, marginTop: 4 }}>{contact.notes}</div></div>}
        <div className="ptitle">Activity History ({acts.length})</div>
        {acts.length === 0 ? <div className="empty">No activities logged for this contact.</div> : acts.slice(0, 4).map(a => (
          <div className="arow" key={a.id}>
            <div style={{ flex: 1 }}>
              <div className="at">{a.type} — {a.date}</div>
              <div className="am">{a.description}</div>
              {a.nextAction && <div style={{ fontSize: 10, color: "#c9a84c", marginTop: 3 }}>→ {a.nextAction}</div>}
            </div>
            <span style={{ background: STATUS_COLORS[a.status] + "22", color: STATUS_COLORS[a.status], border: `1px solid ${STATUS_COLORS[a.status]}44`, borderRadius: 3, fontSize: 9, padding: "2px 6px" }}>{a.status}</span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <button className="add-btn" onClick={() => { setViewContact(null); setAddActivityOpen(true); }}>+ Log Activity</button>
          <button style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 3, color: "#888", fontFamily: "'DM Mono',monospace", fontSize: 10, padding: "7px 14px", cursor: "pointer" }} onClick={() => { setEditContact(contact); setViewContact(null); }}>Edit Contact</button>
          <button className="danger-btn" onClick={() => deleteContact(contact.id)}>Delete</button>
        </div>
      </Modal>
    );
  }

  // ─── RELATIONSHIP MAP TAB ─────────────────────────────────────────────────
  function RelationshipMap() {
    const [filterSector, setFilterSector] = useState("All");
    const visibleContacts = contacts.filter(c => filterSector === "All" || c.sector === filterSector);
    return (
      <>
        <div className="pg-title">Relationship Map</div>
        <div className="pg-sub">LAZARD SECTOR BANKER ⟷ PE FIRM COVERAGE CONTACT</div>
        <div className="toolbar">
          {["All", ...SECTORS].map(s => (
            <button key={s} className={`fb ${filterSector === s ? "on" : ""}`} onClick={() => setFilterSector(s)} style={s !== "All" ? { borderLeftColor: (SECTOR_COLORS[s] || "#555") + "66" } : {}}>{s}</button>
          ))}
        </div>
        {SECTORS.filter(sec => filterSector === "All" || filterSector === sec).map(sec => {
          const sectorContacts = visibleContacts.filter(c => c.sector === sec);
          if (sectorContacts.length === 0) return null;
          const lzBankers = bankers.filter(b => b.sector === sec);
          return (
            <div key={sec} style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 3, height: 18, background: SECTOR_COLORS[sec], borderRadius: 2 }} />
                <div style={{ fontSize: 11, color: SECTOR_COLORS[sec], letterSpacing: "0.12em", textTransform: "uppercase" }}>{sec}</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "220px 40px 1fr", gap: 0 }}>
                <div>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8, padding: "0 10px" }}>Lazard Bankers</div>
                  {lzBankers.length === 0 ? <div style={{ color: "#333", fontSize: 11, padding: "0 10px" }}>None assigned</div> : lzBankers.map(b => (
                    <div key={b.id} className="banker-card" style={{ marginBottom: 6 }}>
                      <div style={{ fontSize: 11, color: "#c9a84c" }}>{b.name}</div>
                      <div style={{ fontSize: 10, color: "#555" }}>{b.title}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#2a2a2a", fontSize: 18 }}>⟷</div>
                <div>
                  <div style={{ fontSize: 9, color: "#444", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>PE Coverage Contacts</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 6 }}>
                    {sectorContacts.map(c => {
                      const sp = getSponsor(c.sponsorId);
                      const lt = c.lastContacted;
                      return (
                        <div key={c.id} className="contact-card" onClick={() => setViewContact(c)}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                              <div style={{ fontSize: 11, color: "#e8e0d0" }}>{c.name}</div>
                              <div style={{ fontSize: 10, color: "#555", marginTop: 1 }}>{sp?.name} · {c.title.split(",")[0]}</div>
                            </div>
                          </div>
                          <div style={{ marginTop: 5 }}>{lt ? <StallBadge date={lt} /> : <span style={{ color: "#333", fontSize: 10 }}>Never touched</span>}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="crm">
      <style>{css}</style>

      <div className="hdr">
        <div>
          <div className="hdr-logo">Lazard · FSG Coverage</div>
          <div className="hdr-sub">Financial Sponsors Group · Relationship Intelligence</div>
        </div>
        <nav className="nav">
          {[["dashboard","Dashboard"],["sponsors","Firms"],["contacts","Contacts"],["map","Coverage Map"],["activity","Activity"],["pitches","Pitches"],["team","LZ Team"]].map(([key, label]) => (
            <button key={key} className={`nb ${tab === key ? "on" : ""}`} onClick={() => { setTab(key); setSearch(""); setSectorFilter("All"); setTypeFilter("All"); setTierFilter("All"); }}>{label}</button>
          ))}
        </nav>
      </div>

      <div className="main">

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <>
            <div className="pg-title">Coverage Dashboard</div>
            <div className="pg-sub">Q1 2025 · FINANCIAL SPONSORS GROUP</div>
            <div className="stats">
              <div className="stat"><div className="sv">{sponsors.length}</div><div className="sl">Firms Covered</div></div>
              <div className="stat"><div className="sv">{stats.tier1}</div><div className="sl">Tier 1</div></div>
              <div className="stat"><div className="sv">{contacts.length}</div><div className="sl">PE Contacts</div></div>
              <div className="stat"><div className="sv">{stats.pitches}</div><div className="sl">Pitches Sent</div></div>
              <div className="stat"><div className="sv">{stats.meetings}</div><div className="sl">Meetings YTD</div></div>
              <div className="stat"><div className="sv" style={{ color: "#e74c3c" }}>{stats.stale}</div><div className="sl">Stale &gt;45d</div></div>
            </div>
            <div className="twocol">
              <div className="panel">
                <div className="ptitle">Recent Activity</div>
                {[...activities].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7).map(a => {
                  const sp = getSponsor(a.sponsorId);
                  const ct = getContact(a.contactId);
                  return (
                    <div className="arow" key={a.id}>
                      <div style={{ flex: 1 }}>
                        <div className="at">{sp?.name} {ct && <span style={{ color: "#555" }}>· {ct.name}</span>}</div>
                        <div className="am">{a.date} · {a.type} · {a.description.slice(0, 50)}{a.description.length > 50 ? "…" : ""}</div>
                      </div>
                      <span style={{ background: STATUS_COLORS[a.status] + "22", color: STATUS_COLORS[a.status], border: `1px solid ${STATUS_COLORS[a.status]}44`, borderRadius: 3, fontSize: 9, padding: "2px 6px" }}>{a.status}</span>
                    </div>
                  );
                })}
                <button className="add-btn" style={{ marginTop: 14 }} onClick={() => setAddActivityOpen(true)}>+ Log Activity</button>
              </div>
              <div className="panel">
                <div className="ptitle">Stale Coverage — Action Required</div>
                {sponsors.filter(s => { const lt = lastTouchForSponsor(s.id); return !lt || daysSince(lt) > 30; }).sort((a, b) => { const la = lastTouchForSponsor(a.id) || "2020-01-01"; const lb = lastTouchForSponsor(b.id) || "2020-01-01"; return new Date(la) - new Date(lb); }).slice(0, 7).map(s => {
                  const lt = lastTouchForSponsor(s.id);
                  return (
                    <div className="arow" key={s.id} onClick={() => setViewSponsor(s)} style={{ cursor: "pointer" }}>
                      <div style={{ flex: 1 }}>
                        <div className="at">{s.name} <span style={{ color: TIER_COLORS[s.tier], fontSize: 9 }}>T{s.tier}</span></div>
                        <div className="am">{s.sectors.slice(0, 2).join(", ")}</div>
                      </div>
                      {lt ? <StallBadge date={lt} /> : <span style={{ background: "#e74c3c22", color: "#e74c3c", border: "1px solid #e74c3c44", borderRadius: 3, fontSize: 9, padding: "2px 7px" }}>Never</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* FIRMS */}
        {tab === "sponsors" && (
          <>
            <div className="pg-title">PE Firm Universe</div>
            <div className="pg-sub">{sponsors.length} FIRMS TRACKED</div>
            <div className="toolbar">
              <input className="si" placeholder="Search firms..." value={search} onChange={e => setSearch(e.target.value)} />
              {["All","1","2","3"].map(t => <button key={t} className={`fb ${tierFilter===t?"on":""}`} onClick={() => setTierFilter(t)}>{t==="All"?"All Tiers":`Tier ${t}`}</button>)}
              {["All",...SECTORS].map(s => <button key={s} className={`fb ${sectorFilter===s?"on":""}`} onClick={() => setSectorFilter(s)} style={{ fontSize: 9 }}>{s}</button>)}
              <button className="add-btn" onClick={() => setAddSponsorOpen(true)}>+ Add Firm</button>
            </div>
            <table className="tbl">
              <thead><tr><th>Tier</th><th>Firm</th><th>AUM</th><th>Dry Powder</th><th>Sectors</th><th>Contacts</th><th>Last Touch</th></tr></thead>
              <tbody>
                {filteredSponsors.map(s => {
                  const lt = lastTouchForSponsor(s.id);
                  const nct = sponsorContacts(s.id).length;
                  return (
                    <tr key={s.id} onClick={() => setViewSponsor(s)}>
                      <td><span style={{ background: TIER_COLORS[s.tier] + "22", color: TIER_COLORS[s.tier], border: `1px solid ${TIER_COLORS[s.tier]}44`, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, fontSize: 10, fontWeight: 700 }}>{s.tier}</span></td>
                      <td><div className="sn">{s.name}</div><div style={{ fontSize: 9, color: "#444", marginTop: 1 }}>{s.hq}</div></td>
                      <td style={{ color: "#666" }}>{s.aum}</td>
                      <td style={{ color: "#c9a84c" }}>{s.dryPowder}</td>
                      <td>{s.sectors.slice(0, 2).map(sec => <SectorTag key={sec} sector={sec} />)}</td>
                      <td style={{ color: nct > 0 ? "#4caf82" : "#444" }}>{nct} contact{nct !== 1 ? "s" : ""}</td>
                      <td>{lt ? <StallBadge date={lt} /> : <span style={{ color: "#333", fontSize: 10 }}>Never</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredSponsors.length === 0 && <div className="empty">No firms match your filters.</div>}
          </>
        )}

        {/* CONTACTS */}
        {tab === "contacts" && (
          <>
            <div className="pg-title">PE Contacts</div>
            <div className="pg-sub">{contacts.length} CONTACTS ACROSS {sponsors.length} FIRMS</div>
            <div className="toolbar">
              <input className="si" placeholder="Search contacts or firms..." value={search} onChange={e => setSearch(e.target.value)} />
              {["All", ...SECTORS].map(s => <button key={s} className={`fb ${sectorFilter===s?"on":""}`} onClick={() => setSectorFilter(s)} style={{ fontSize: 9 }}>{s}</button>)}
              <button className="add-btn" onClick={() => setAddContactOpen(true)}>+ Add Contact</button>
            </div>
            <table className="tbl">
              <thead><tr><th>Contact</th><th>Firm</th><th>Title</th><th>Sector</th><th>Mapped to Lazard</th><th>Recent Deals</th><th>Last Touched</th></tr></thead>
              <tbody>
                {filteredContacts.map(c => {
                  const sp = getSponsor(c.sponsorId);
                  const mappedBankers = (c.lazardMappings || []).map(id => getBanker(id)).filter(Boolean);
                  return (
                    <tr key={c.id} onClick={() => setViewContact(c)}>
                      <td><div className="sn" style={{ fontSize: 12 }}>{c.name}</div></td>
                      <td style={{ color: "#888", fontSize: 11 }}>{sp?.name || "—"}</td>
                      <td style={{ color: "#555", fontSize: 10 }}>{c.title}</td>
                      <td><SectorTag sector={c.sector} /></td>
                      <td>{mappedBankers.length > 0 ? mappedBankers.map(b => <span key={b.id} style={{ background: "#c9a84c11", color: "#c9a84c66", border: "1px solid #c9a84c22", borderRadius: 3, fontSize: 9, padding: "1px 5px", marginRight: 3 }}>{b.name.split(" ")[1]}</span>) : <span style={{ color: "#333", fontSize: 10 }}>Unmapped</span>}</td>
                      <td style={{ fontSize: 10 }}>{c.recentDeals?.slice(0, 1).map((d, i) => <span key={i} className="chip">{d}</span>)}{c.recentDeals?.length > 1 && <span style={{ color: "#444", fontSize: 9 }}> +{c.recentDeals.length - 1}</span>}</td>
                      <td>{c.lastContacted ? <StallBadge date={c.lastContacted} /> : <span style={{ color: "#333", fontSize: 10 }}>Never</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredContacts.length === 0 && <div className="empty">No contacts match your filters.</div>}
          </>
        )}

        {/* COVERAGE MAP */}
        {tab === "map" && <RelationshipMap />}

        {/* ACTIVITY */}
        {tab === "activity" && (
          <>
            <div className="pg-title">Activity Log</div>
            <div className="pg-sub">ALL TOUCHPOINTS · MEETINGS · PITCHES · CONFERENCES</div>
            <div className="toolbar">
              <input className="si" placeholder="Search activity..." value={search} onChange={e => setSearch(e.target.value)} />
              {["All","Meeting","Pitch","Conference","Call"].map(t => <button key={t} className={`fb ${typeFilter===t?"on":""}`} onClick={() => setTypeFilter(t)}>{t}</button>)}
              <button className="add-btn" onClick={() => setAddActivityOpen(true)}>+ Log Activity</button>
            </div>
            <table className="tbl">
              <thead><tr><th>Date</th><th>Firm</th><th>Contact</th><th>Lazard Banker</th><th>Type</th><th>Description</th><th>Next Action</th><th>Status</th></tr></thead>
              <tbody>
                {[...filteredActivities].sort((a, b) => new Date(b.date) - new Date(a.date)).map(a => {
                  const sp = getSponsor(a.sponsorId);
                  const ct = getContact(a.contactId);
                  const bk = getBanker(a.lazardBankerId);
                  return (
                    <tr key={a.id}>
                      <td style={{ color: "#555", fontSize: 10, whiteSpace: "nowrap" }}>{a.date}</td>
                      <td><span className="sn" style={{ fontSize: 11 }}>{sp?.name || "—"}</span></td>
                      <td style={{ color: "#888", fontSize: 10 }}>{ct?.name || "—"}</td>
                      <td style={{ color: "#c9a84c66", fontSize: 10 }}>{bk?.name || "—"}</td>
                      <td style={{ fontSize: 10 }}>{a.type}</td>
                      <td style={{ color: "#888", fontSize: 10, maxWidth: 200 }}>{a.description}</td>
                      <td style={{ color: "#c9a84c", fontSize: 10, maxWidth: 160 }}>{a.nextAction}</td>
                      <td><span style={{ background: STATUS_COLORS[a.status] + "22", color: STATUS_COLORS[a.status], border: `1px solid ${STATUS_COLORS[a.status]}44`, borderRadius: 3, fontSize: 9, padding: "2px 6px" }}>{a.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredActivities.length === 0 && <div className="empty">No activities match your filters.</div>}
          </>
        )}

        {/* PITCHES */}
        {tab === "pitches" && (
          <>
            <div className="pg-title">Pitch Tracker</div>
            <div className="pg-sub">MANDATE PIPELINE · WIN / LOSS / PENDING</div>
            <div className="toolbar">
              <input className="si" placeholder="Search pitches..." value={search} onChange={e => setSearch(e.target.value)} />
              {["All", ...STATUSES].map(s => <button key={s} className={`fb ${typeFilter===s?"on":""}`} onClick={() => setTypeFilter(s)}>{s}</button>)}
              <button className="add-btn" onClick={() => setAddActivityOpen(true)}>+ Log Pitch</button>
            </div>
            <table className="tbl">
              <thead><tr><th>Date</th><th>Firm</th><th>Contact</th><th>Mandate</th><th>Outcome</th><th>Next Action</th><th>Status</th></tr></thead>
              <tbody>
                {activities.filter(a => a.type === "Pitch").filter(a => {
                  const sp = getSponsor(a.sponsorId);
                  const ms = !search || (sp && sp.name.toLowerCase().includes(search.toLowerCase())) || a.description.toLowerCase().includes(search.toLowerCase());
                  const mst = typeFilter === "All" || a.status === typeFilter;
                  return ms && mst;
                }).sort((a, b) => new Date(b.date) - new Date(a.date)).map(a => {
                  const sp = getSponsor(a.sponsorId);
                  const ct = getContact(a.contactId);
                  return (
                    <tr key={a.id}>
                      <td style={{ color: "#555", fontSize: 10 }}>{a.date}</td>
                      <td><span className="sn" style={{ fontSize: 11 }}>{sp?.name || "—"}</span></td>
                      <td style={{ color: "#888", fontSize: 10 }}>{ct?.name || "—"}</td>
                      <td style={{ color: "#aaa", fontSize: 10, maxWidth: 200 }}>{a.description}</td>
                      <td style={{ color: "#888", fontSize: 10 }}>{a.outcome}</td>
                      <td style={{ color: "#c9a84c", fontSize: 10 }}>{a.nextAction}</td>
                      <td><span style={{ background: STATUS_COLORS[a.status] + "22", color: STATUS_COLORS[a.status], border: `1px solid ${STATUS_COLORS[a.status]}44`, borderRadius: 3, fontSize: 9, padding: "2px 6px" }}>{a.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

        {/* LAZARD TEAM */}
        {tab === "team" && (
          <>
            <div className="pg-title">Lazard FSG Team</div>
            <div className="pg-sub">INTERNAL BANKER DIRECTORY · SECTOR ASSIGNMENTS</div>
            <div className="toolbar">
              <input className="si" placeholder="Search team..." value={search} onChange={e => setSearch(e.target.value)} />
              {["All", ...SECTORS].map(s => <button key={s} className={`fb ${sectorFilter===s?"on":""}`} onClick={() => setSectorFilter(s)} style={{ fontSize: 9 }}>{s}</button>)}
              <button className="add-btn" onClick={() => setAddBankerOpen(true)}>+ Add Banker</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 12 }}>
              {bankers.filter(b => {
                const ms = b.name.toLowerCase().includes(search.toLowerCase());
                const msec = sectorFilter === "All" || b.sector === sectorFilter;
                return ms && msec;
              }).map(b => {
                const coveredContacts = contacts.filter(c => (c.lazardMappings || []).includes(b.id));
                return (
                  <div key={b.id} style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 5, padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 13, color: "#e8e0d0" }}>{b.name}</div>
                        <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{b.title}</div>
                      </div>
                      <SectorTag sector={b.sector} />
                    </div>
                    <div style={{ marginTop: 10, fontSize: 10, color: "#444" }}>{b.email}</div>
                    <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>{b.phone}</div>
                    <div style={{ marginTop: 12 }}>
                      <div style={{ fontSize: 9, color: "#333", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Covering {coveredContacts.length} PE contact{coveredContacts.length !== 1 ? "s" : ""}</div>
                      {coveredContacts.slice(0, 3).map(c => {
                        const sp = getSponsor(c.sponsorId);
                        return <div key={c.id} style={{ fontSize: 10, color: "#666", marginBottom: 2 }}>· {c.name} ({sp?.name})</div>;
                      })}
                      {coveredContacts.length > 3 && <div style={{ fontSize: 10, color: "#444" }}>+ {coveredContacts.length - 3} more</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* MODALS */}
      {viewSponsor && <SponsorDetail sponsor={viewSponsor} />}
      {viewContact && <ContactDetail contact={viewContact} />}
      {addSponsorOpen && <Modal title="Add PE Firm" onClose={() => setAddSponsorOpen(false)} width={680}><SponsorForm onSave={saveSponsor} onClose={() => setAddSponsorOpen(false)} /></Modal>}
      {editSponsor && <Modal title={`Edit — ${editSponsor.name}`} onClose={() => setEditSponsor(null)} width={680}><SponsorForm initial={editSponsor} onSave={saveSponsor} onClose={() => setEditSponsor(null)} /></Modal>}
      {addContactOpen && <Modal title="Add PE Contact" onClose={() => setAddContactOpen(false)} width={700}><ContactForm onSave={saveContact} onClose={() => setAddContactOpen(false)} /></Modal>}
      {editContact && <Modal title={`Edit — ${editContact.name}`} onClose={() => setEditContact(null)} width={700}><ContactForm initial={editContact} onSave={saveContact} onClose={() => setEditContact(null)} /></Modal>}
      {addActivityOpen && <Modal title="Log Activity" onClose={() => setAddActivityOpen(false)} width={660}><ActivityForm onSave={saveActivity} onClose={() => setAddActivityOpen(false)} /></Modal>}
      {addBankerOpen && <Modal title="Add Lazard Banker" onClose={() => setAddBankerOpen(false)} width={560}><BankerForm onSave={saveBanker} onClose={() => setAddBankerOpen(false)} /></Modal>}
    </div>
  );
}
