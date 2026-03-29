import { useState, useMemo, useEffect } from "react";

function useWindowWidth() {
  const [w, setW] = useState(window.innerWidth);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const LAZARD_BANKERS_SEED = [
  // Industrials
  { id: "lb1", name: "David Kurz", title: "Managing Director", sector: "Industrials", email: "dkurz@lazard.com", phone: "+1 212 632 6101" },
  { id: "lb2", name: "Tom Willard", title: "Managing Director", sector: "Industrials", email: "twilliard@lazard.com", phone: "+1 212 632 6102" },
  { id: "lb3", name: "Chris Okeke", title: "Vice President", sector: "Industrials", email: "cokeke@lazard.com", phone: "+1 212 632 6103" },
  { id: "lb4", name: "Mia Sorenson", title: "Vice President", sector: "Industrials", email: "msorenson@lazard.com", phone: "+1 212 632 6104" },
  // Healthcare
  { id: "lb5", name: "Sarah Mitchell", title: "Managing Director", sector: "Healthcare", email: "smitchell@lazard.com", phone: "+1 212 632 6105" },
  { id: "lb6", name: "Priya Nair", title: "Managing Director", sector: "Healthcare", email: "pnair@lazard.com", phone: "+1 212 632 6106" },
  { id: "lb7", name: "Daniel Reyes", title: "Vice President", sector: "Healthcare", email: "dreyes@lazard.com", phone: "+1 212 632 6107" },
  { id: "lb8", name: "Jessica Tan", title: "Vice President", sector: "Healthcare", email: "jtan@lazard.com", phone: "+1 212 632 6108" },
  // TMT / Tech
  { id: "lb9", name: "James Park", title: "Managing Director", sector: "TMT / Tech", email: "jpark@lazard.com", phone: "+1 212 632 6109" },
  { id: "lb10", name: "Kevin Zhao", title: "Managing Director", sector: "TMT / Tech", email: "kzhao@lazard.com", phone: "+1 212 632 6110" },
  { id: "lb11", name: "Alicia Drummond", title: "Vice President", sector: "TMT / Tech", email: "adrummond@lazard.com", phone: "+1 212 632 6111" },
  { id: "lb12", name: "Marcus Webb", title: "Vice President", sector: "TMT / Tech", email: "mwebb@lazard.com", phone: "+1 212 632 6112" },
  // Consumer & Retail
  { id: "lb13", name: "Rachel Torres", title: "Managing Director", sector: "Consumer & Retail", email: "rtorres@lazard.com", phone: "+1 212 632 6113" },
  { id: "lb14", name: "Diana Walsh", title: "Vice President", sector: "Consumer & Retail", email: "dwalsh@lazard.com", phone: "+1 212 632 6114" },
  { id: "lb15", name: "Omar Haddad", title: "Vice President", sector: "Consumer & Retail", email: "ohaddad@lazard.com", phone: "+1 212 632 6115" },
  // Energy
  { id: "lb16", name: "Michael Stern", title: "Managing Director", sector: "Energy", email: "mstern@lazard.com", phone: "+1 212 632 6116" },
  { id: "lb17", name: "Natalie Cruz", title: "Vice President", sector: "Energy", email: "ncruz@lazard.com", phone: "+1 212 632 6117" },
  // Financial Institutions
  { id: "lb18", name: "Amanda Chen", title: "Managing Director", sector: "Financial Institutions", email: "achen@lazard.com", phone: "+1 212 632 6118" },
  { id: "lb19", name: "Ryan Patel", title: "Vice President", sector: "Financial Institutions", email: "rpatel@lazard.com", phone: "+1 212 632 6119" },
  // Sponsor Coverage Bankers (cross-sector, firm relationship owners)
  { id: "lb20", name: "Bill Hart", title: "Managing Director", sector: "Sponsor Coverage", sponsorCoverage: true, sponsorFirms: ["sp1","sp2","sp3","sp4","sp9"], email: "bhart@lazard.com", phone: "+1 212 632 6120" },
  { id: "lb21", name: "Taylor Auman", title: "Director", sector: "Sponsor Coverage", sponsorCoverage: true, sponsorFirms: ["sp1","sp5","sp6","sp10","sp12"], email: "tauman@lazard.com", phone: "+1 212 632 6121" },
  { id: "lb22", name: "Courtney Haydon", title: "Managing Director", sector: "Sponsor Coverage", sponsorCoverage: true, sponsorFirms: ["sp2","sp3","sp7","sp8","sp11"], email: "chaydon@lazard.com", phone: "+1 212 632 6122" },
  { id: "lb23", name: "Adam Cady", title: "Managing Director", sector: "Sponsor Coverage", sponsorCoverage: true, sponsorFirms: ["sp4","sp5","sp7","sp9","sp11"], email: "acady@lazard.com", phone: "+1 212 632 6123" },
  { id: "lb24", name: "Teddy Henderson", title: "Director", sector: "Sponsor Coverage", sponsorCoverage: true, sponsorFirms: ["sp1","sp2","sp6","sp8","sp10"], email: "thenderson@lazard.com", phone: "+1 212 632 6124" },
  { id: "lb25", name: "Daniel Gajewski", title: "Managing Director", sector: "Sponsor Coverage", sponsorCoverage: true, sponsorFirms: ["sp13","sp14","sp15","sp16","sp17"], email: "dgajewski@lazard.com", phone: "+1 212 632 6125" },
];

const SPONSORS_SEED = [
  { id: "sp1", name: "KKR", aum: "$553B", dealsYTD: 7, hq: "New York, NY", tier: 1, sectors: ["Industrials", "TMT / Tech", "Healthcare"], website: "kkr.com", notes: "Core Lazard relationship. Key historical mandates in industrials carve-outs." },
  { id: "sp2", name: "Blackstone", aum: "$1.1T", dealsYTD: 11, hq: "New York, NY", tier: 1, sectors: ["Healthcare", "Consumer & Retail", "Financial Institutions"], website: "blackstone.com", notes: "Largest PE firm globally. PE, RE, Credit arms all active acquirers." },
  { id: "sp3", name: "Apollo", aum: "$651B", dealsYTD: 9, hq: "New York, NY", tier: 1, sectors: ["Industrials", "Energy", "Financial Institutions"], website: "apollo.com", notes: "Hybrid credit/PE strategies. Very active on distressed and energy." },
  { id: "sp4", name: "Carlyle", aum: "$426B", dealsYTD: 6, hq: "Washington, DC", tier: 1, sectors: ["Industrials", "Healthcare", "TMT / Tech"], website: "carlyle.com", notes: "Strong in aerospace & defense, government services. Long Lazard history." },
  { id: "sp5", name: "TPG", aum: "$222B", dealsYTD: 5, hq: "Fort Worth, TX", tier: 1, sectors: ["Healthcare", "TMT / Tech", "Consumer & Retail"], website: "tpg.com", notes: "Growth and buyout. Active in tech-enabled services and healthcare." },
  { id: "sp6", name: "Warburg Pincus", aum: "$83B", dealsYTD: 4, hq: "New York, NY", tier: 1, sectors: ["Healthcare", "Financial Institutions", "TMT / Tech"], website: "warburgpincus.com", notes: "Strong healthcare IT and fintech franchise." },
  { id: "sp7", name: "Thoma Bravo", aum: "$134B", dealsYTD: 8, hq: "San Francisco, CA", tier: 1, sectors: ["TMT / Tech"], website: "thomabravo.com", notes: "Dominant software PE. Highly active in cybersecurity and vertical SaaS." },
  { id: "sp8", name: "Vista Equity", aum: "$100B", dealsYTD: 6, hq: "Austin, TX", tier: 1, sectors: ["TMT / Tech"], website: "vistaequitypartners.com", notes: "B2B software specialist. Very systematic acquirer with operational playbook." },
  { id: "sp9", name: "Hellman & Friedman", aum: "$95B", dealsYTD: 3, hq: "San Francisco, CA", tier: 1, sectors: ["Financial Institutions", "TMT / Tech", "Healthcare"], website: "hf.com", notes: "Long-hold, high-conviction. Selective mandate work with top boutiques." },
  { id: "sp10", name: "Bain Capital", aum: "$185B", dealsYTD: 5, hq: "Boston, MA", tier: 2, sectors: ["Healthcare", "Consumer & Retail", "Industrials"], website: "baincapital.com", notes: "Broad mandate across sectors. Strong in consumer and healthcare services." },
  { id: "sp11", name: "Francisco Partners", aum: "$45B", dealsYTD: 4, hq: "San Francisco, CA", tier: 2, sectors: ["TMT / Tech"], website: "franciscopartners.com", notes: "Tech-focused buyouts. Cybersecurity add-on strategy active." },
  { id: "sp12", name: "Leonard Green", aum: "$70B", dealsYTD: 3, hq: "Los Angeles, CA", tier: 2, sectors: ["Consumer & Retail", "Healthcare"], website: "leonardgreen.com", notes: "Consumer specialist. Retail, restaurants, healthcare services." },
  { id: "sp13", name: "Rockefeller Capital Management", aum: "$42B", dealsYTD: 4, hq: "New York, NY", tier: 1, sectors: ["Industrials", "Consumer & Retail", "Healthcare", "Financial Institutions"], website: "rockco.com", notes: "Multi-generational family office with active direct investment arm. Co-invests alongside PE sponsors. Strong appetite for industrials and consumer. Daniel's primary family office relationship." },
  { id: "sp14", name: "Pritzker Private Capital", aum: "$18B", dealsYTD: 3, hq: "Chicago, IL", tier: 1, sectors: ["Industrials", "Healthcare", "Consumer & Retail"], website: "pritzker.com", notes: "Pritzker family investment vehicle. Focuses on middle-market buyouts in manufacturing, healthcare services, and specialty distribution. Long-hold approach, minimal leverage." },
  { id: "sp15", name: "Cascade Investment", aum: "$60B+", dealsYTD: 2, hq: "Kirkland, WA", tier: 1, sectors: ["Industrials", "Energy", "Financial Institutions"], website: "cascadeinvestment.com", notes: "Bill Gates family office. One of largest single-family offices globally. Highly selective, long-duration capital. Active in infrastructure, energy transition, and industrial platforms." },
  { id: "sp16", name: "Iconiq Capital", aum: "$80B", dealsYTD: 5, hq: "San Francisco, CA", tier: 1, sectors: ["TMT / Tech", "Healthcare", "Financial Institutions"], website: "iconiqcapital.com", notes: "Multi-family office serving tech founders and executives. Active growth equity and buyout platform. Strong tech and healthcare IT focus — aligned with Lazard's core deal flow." },
  { id: "sp17", name: "Soros Fund Management", aum: "$25B", dealsYTD: 3, hq: "New York, NY", tier: 1, sectors: ["Financial Institutions", "TMT / Tech", "Healthcare"], website: "soros.com", notes: "George Soros family office. Broad mandate across public and private markets. Private equity co-invest program active and growing. Key relationship for FSG given deal flow across all sectors." },
];

const CONTACTS_SEED = [
  // KKR — deal team contacts
  { id: "c1", sponsorId: "sp1", name: "Ryan Stanton", title: "Vice President", sector: "Industrials", email: "rstanton@kkr.com", phone: "+1 212 750 8310", linkedin: "linkedin.com/in/ryanstanton", recentDeals: [{ name: "CHC Group", sector: "Industrials", year: 2024 }, { name: "Engineered Controls", sector: "Industrials", year: 2023 }], lastContacted: "2025-03-24", lazardMappings: ["lb1", "lb3", "lb20", "lb24"], notes: "Day-to-day deal contact for KKR industrials. Screens all inbound deal flow before escalating to senior team. Quick to respond via email." },
  { id: "c2", sponsorId: "sp1", name: "Lauren Kim", title: "Principal", sector: "Healthcare", email: "lkim@kkr.com", phone: "+1 212 750 8311", linkedin: "linkedin.com/in/laurenkim", recentDeals: [{ name: "WebMD Health", sector: "Healthcare", year: 2024 }, { name: "Covenant Surgical", sector: "Healthcare", year: 2023 }], lastContacted: "2025-03-16", lazardMappings: ["lb5", "lb7", "lb20", "lb21"], notes: "Covers physician group roll-ups and healthcare IT. Former BCG. Very analytical, wants detailed comps upfront." },
  { id: "c3", sponsorId: "sp1", name: "Daniel Cho", title: "Vice President", sector: "TMT / Tech", email: "dcho@kkr.com", phone: "+1 650 433 7260", linkedin: "linkedin.com/in/danielcho", recentDeals: [{ name: "Barracuda Networks", sector: "TMT / Tech", year: 2023 }, { name: "Calabrio", sector: "TMT / Tech", year: 2024 }], lastContacted: "2025-03-22", lazardMappings: ["lb9", "lb11", "lb20", "lb24"], notes: "SF-based. Focuses on vertical SaaS and security software take-privates. Prefers calls over email." },
  // Blackstone — deal team contacts
  { id: "c4", sponsorId: "sp2", name: "Stephanie Ruiz", title: "Vice President", sector: "Consumer & Retail", email: "sruiz@blackstone.com", phone: "+1 212 583 5020", linkedin: "linkedin.com/in/stephanieruiz", recentDeals: [{ name: "Tropical Smoothie Cafe", sector: "Consumer & Retail", year: 2024 }, { name: "Refresco", sector: "Consumer & Retail", year: 2023 }], lastContacted: "2025-03-21", lazardMappings: ["lb13", "lb14", "lb20", "lb22"], notes: "Primary coverage for BX consumer. Handles all initial process conversations. Strong on food & bev and restaurant brands." },
  { id: "c5", sponsorId: "sp2", name: "Andrew Fielding", title: "Principal", sector: "Healthcare", email: "afielding@blackstone.com", phone: "+1 212 583 5021", linkedin: "linkedin.com/in/andrewfielding", recentDeals: [{ name: "Medline Industries", sector: "Healthcare", year: 2024 }, { name: "Lifescan", sector: "Healthcare", year: 2023 }], lastContacted: "2025-03-22", lazardMappings: ["lb5", "lb7", "lb20", "lb22", "lb24"], notes: "Runs HC deal process for BX PE. Strong in med-tech and hospital services. Responsive but very process-oriented." },
  { id: "c6", sponsorId: "sp2", name: "Marcus Lin", title: "Vice President", sector: "Industrials", email: "mlin@blackstone.com", phone: "+1 212 583 5022", linkedin: "linkedin.com/in/marcuslin", recentDeals: [{ name: "Chamberlain Group", sector: "Industrials", year: 2024 }, { name: "Gates Industrial", sector: "Industrials", year: 2023 }], lastContacted: "2025-03-25", lazardMappings: ["lb1", "lb3", "lb20", "lb24"], notes: "Industrial VP at BX. Covers manufacturing, distribution, specialty chemicals. Intro via SuperReturn 2024." },
  // Apollo — deal team contacts
  { id: "c7", sponsorId: "sp3", name: "Kevin Tran", title: "Vice President", sector: "Industrials", email: "ktran@apollo.com", phone: "+1 212 515 3210", linkedin: "linkedin.com/in/kevintran", recentDeals: [{ name: "Arconic", sector: "Industrials", year: 2024 }, { name: "Rexnord Water", sector: "Industrials", year: 2023 }], lastContacted: "2025-03-19", lazardMappings: ["lb1", "lb4", "lb20"], notes: "Runs deal execution for Apollo industrials. Aggressive on pricing and timelines. Best reached by phone." },
  { id: "c8", sponsorId: "sp3", name: "Priya Mehta", title: "Principal", sector: "TMT / Tech", email: "pmehta@apollo.com", phone: "+1 212 515 3211", linkedin: "linkedin.com/in/priyamehta", recentDeals: [{ name: "Presidio", sector: "TMT / Tech", year: 2024 }, { name: "Cox Media Group", sector: "TMT / Tech", year: 2023 }], lastContacted: "2025-03-23", lazardMappings: ["lb9", "lb12", "lb20"], notes: "Apollo tech and media. Focuses on carve-outs and complex situations. Former GS TMT." },
  { id: "c9", sponsorId: "sp3", name: "William Torres", title: "Vice President", sector: "Energy", email: "wtorres@apollo.com", phone: "+1 212 515 3212", linkedin: "linkedin.com/in/williamtorres", recentDeals: [{ name: "Maxim Power", sector: "Energy", year: 2024 }, { name: "Calfrac Well Services", sector: "Energy", year: 2023 }], lastContacted: "2025-03-11", lazardMappings: ["lb16", "lb17", "lb22"], notes: "Apollo energy VP. Covers upstream, midstream and power. Very active on distressed energy situations." },
  // Carlyle — deal team contacts
  { id: "c10", sponsorId: "sp4", name: "Jason Merritt", title: "Vice President", sector: "Industrials", email: "jmerritt@carlyle.com", phone: "+1 202 729 5640", linkedin: "linkedin.com/in/jasonmerritt", recentDeals: [{ name: "StandardAero", sector: "Industrials", year: 2024 }, { name: "Chromalloy", sector: "Industrials", year: 2023 }], lastContacted: "2025-03-15", lazardMappings: ["lb1", "lb3", "lb20", "lb23"], notes: "Carlyle industrials VP. Aerospace and defense focus. DC-based. Former Booz Allen." },
  { id: "c11", sponsorId: "sp4", name: "Emily Hartman", title: "Principal", sector: "Healthcare", email: "ehartman@carlyle.com", phone: "+1 202 729 5641", linkedin: "linkedin.com/in/emilyhartman", recentDeals: [{ name: "MedRisk", sector: "Healthcare", year: 2024 }, { name: "Ortho Clinical Diagnostics", sector: "Healthcare", year: 2023 }], lastContacted: "2025-03-26", lazardMappings: ["lb5", "lb8", "lb23"], notes: "HC principal covering diagnostics and physician services. Very detail-oriented, sends structured NDA requests." },
  // TPG — deal team contacts
  { id: "c12", sponsorId: "sp5", name: "Brandon Wu", title: "Vice President", sector: "Healthcare", email: "bwu@tpg.com", phone: "+1 415 743 1510", linkedin: "linkedin.com/in/brandonwu", recentDeals: [{ name: "Convey Health Solutions", sector: "Healthcare", year: 2024 }, { name: "LifeStance Health", sector: "Healthcare", year: 2023 }], lastContacted: "2025-02-10", lazardMappings: ["lb5", "lb7", "lb23"], notes: "TPG HC deal team. Covers tech-enabled services and value-based care. SF-based. Former KPCB." },
  { id: "c13", sponsorId: "sp5", name: "Samantha Osei", title: "Principal", sector: "TMT / Tech", email: "sosei@tpg.com", phone: "+1 415 743 1511", linkedin: "linkedin.com/in/samanthaosei", recentDeals: [{ name: "McAfee Enterprise", sector: "TMT / Tech", year: 2024 }, { name: "DigiCert", sector: "TMT / Tech", year: 2023 }], lastContacted: "2025-03-23", lazardMappings: ["lb9", "lb11", "lb23"], notes: "Leads tech deal execution. Cybersecurity and SaaS specialist. Fast mover on take-privates." },
  // Warburg Pincus — deal team contacts
  { id: "c14", sponsorId: "sp6", name: "Michael Bassett", title: "Vice President", sector: "Healthcare", email: "mbassett@warburgpincus.com", phone: "+1 212 878 0610", linkedin: "linkedin.com/in/michaelbassett", recentDeals: [{ name: "Modernizing Medicine", sector: "Healthcare", year: 2024 }, { name: "Alignment Healthcare", sector: "Healthcare", year: 2023 }], lastContacted: "2025-01-20", lazardMappings: ["lb5", "lb8", "lb21", "lb24"], notes: "WP healthcare VP. Healthcare IT and digital health focus. Very relationship-driven, quarterly check-ins preferred." },
  { id: "c15", sponsorId: "sp6", name: "Aisha Patel", title: "Principal", sector: "Financial Institutions", email: "apatel@warburgpincus.com", phone: "+1 212 878 0611", linkedin: "linkedin.com/in/aishapatel", recentDeals: [{ name: "CURO Financial", sector: "Financial Institutions", year: 2024 }, { name: "AmeriLife", sector: "Financial Institutions", year: 2023 }], lastContacted: "2025-01-08", lazardMappings: ["lb18", "lb19", "lb21"], notes: "Covers fintech and specialty finance. Former Morgan Stanley FIG. Methodical process approach." },
  // Thoma Bravo — deal team contacts
  { id: "c16", sponsorId: "sp7", name: "Chris Haddad", title: "Vice President", sector: "TMT / Tech", email: "chaddad@thomabravo.com", phone: "+1 415 263 2110", linkedin: "linkedin.com/in/chrishaddad", recentDeals: [{ name: "Proofpoint", sector: "TMT / Tech", year: 2024 }, { name: "Ping Identity", sector: "TMT / Tech", year: 2023 }], lastContacted: "2025-03-25", lazardMappings: ["lb9", "lb11", "lb22", "lb23"], notes: "Primary Thoma Bravo deal contact. Covers cybersecurity and identity software. Very systematic — uses TB's standard operating model." },
  { id: "c17", sponsorId: "sp7", name: "Natalie Brooks", title: "Principal", sector: "TMT / Tech", email: "nbrooks@thomabravo.com", phone: "+1 415 263 2111", linkedin: "linkedin.com/in/nataliebrooks", recentDeals: [{ name: "Sophos", sector: "TMT / Tech", year: 2024 }, { name: "ConnectWise", sector: "TMT / Tech", year: 2023 }], lastContacted: "2025-02-27", lazardMappings: ["lb9", "lb12", "lb22"], notes: "Covers vertical SaaS and MSP software. Prefers founder-led situations with strong NRR." },
  // Vista Equity — deal team contacts
  { id: "c18", sponsorId: "sp8", name: "Tyler Johnson", title: "Vice President", sector: "TMT / Tech", email: "tjohnson@vistaequitypartners.com", phone: "+1 512 730 2410", linkedin: "linkedin.com/in/tylerjohnson", recentDeals: [{ name: "Solera Holdings", sector: "TMT / Tech", year: 2024 }, { name: "Cvent", sector: "TMT / Tech", year: 2023 }], lastContacted: "2025-03-22", lazardMappings: ["lb9", "lb11", "lb22", "lb24"], notes: "Vista B2B software VP. All deals must fit Vista Value Creation Plan criteria. Very data-driven screening process." },
  // Hellman & Friedman — deal team contacts
  { id: "c19", sponsorId: "sp9", name: "Sophie Nakamura", title: "Vice President", sector: "Financial Institutions", email: "snakamura@hf.com", phone: "+1 415 788 5110", linkedin: "linkedin.com/in/sophienakamura", recentDeals: [{ name: "Roper Technologies (div)", sector: "Financial Institutions", year: 2024 }, { name: "Asure Software", sector: "Financial Institutions", year: 2023 }], lastContacted: "2025-01-28", lazardMappings: ["lb18", "lb19", "lb20"], notes: "H&F FIG and software deal team. Selective and deliberate process approach. Long-hold mindset — 7-10yr horizon." },
  { id: "c20", sponsorId: "sp9", name: "Derek Sullivan", title: "Principal", sector: "TMT / Tech", email: "dsullivan@hf.com", phone: "+1 415 788 5111", linkedin: "linkedin.com/in/dereksullivan", recentDeals: [{ name: "Verint Systems", sector: "TMT / Tech", year: 2024 }, { name: "Zerto", sector: "TMT / Tech", year: 2023 }], lastContacted: "2025-01-22", lazardMappings: ["lb9", "lb12", "lb23"], notes: "H&F tech deals. High-conviction approach — fewer deals, higher ownership. Conservative on leverage." },
  // Bain Capital — deal team contacts
  { id: "c21", sponsorId: "sp10", name: "Elena Vasquez", title: "Vice President", sector: "Consumer & Retail", email: "evasquez@baincapital.com", phone: "+1 617 516 2010", linkedin: "linkedin.com/in/elenavasquez", recentDeals: [{ name: "Canada Goose", sector: "Consumer & Retail", year: 2024 }, { name: "Varsity Brands", sector: "Consumer & Retail", year: 2023 }], lastContacted: "2025-02-14", lazardMappings: ["lb13", "lb15", "lb21"], notes: "Bain consumer VP. Brand-focused strategy. Former Bain & Co. consultant. Very structured on diligence." },
  { id: "c22", sponsorId: "sp10", name: "James Okonkwo", title: "Principal", sector: "Healthcare", email: "jokonkwo@baincapital.com", phone: "+1 617 516 2011", linkedin: "linkedin.com/in/jamesokonkwo", recentDeals: [{ name: "Waystar", sector: "Healthcare", year: 2024 }, { name: "Ensemble Health Partners", sector: "Healthcare", year: 2023 }], lastContacted: "2025-03-20", lazardMappings: ["lb5", "lb7", "lb21", "lb24"], notes: "Bain HC principal. Revenue cycle and healthcare IT focus. Strong network in hospital systems." },
  // Francisco Partners — deal team contacts
  { id: "c23", sponsorId: "sp11", name: "Amy Chen", title: "Vice President", sector: "TMT / Tech", email: "achen@franciscopartners.com", phone: "+1 415 418 2810", linkedin: "linkedin.com/in/amychen", recentDeals: [{ name: "Barracuda (add-on)", sector: "TMT / Tech", year: 2024 }, { name: "Forcepoint", sector: "TMT / Tech", year: 2023 }], lastContacted: "2025-03-05", lazardMappings: ["lb9", "lb11"], notes: "FP cybersecurity and network security focus. Prefers add-on acquisitions for existing platforms." },
  // Leonard Green — deal team contacts
  { id: "c24", sponsorId: "sp12", name: "Marcus Webb", title: "Vice President", sector: "Consumer & Retail", email: "mwebb@leonardgreen.com", phone: "+1 310 954 0410", linkedin: "linkedin.com/in/marcuswebb", recentDeals: [{ name: "SRS Distribution", sector: "Consumer & Retail", year: 2024 }, { name: "BJ's Wholesale", sector: "Consumer & Retail", year: 2023 }], lastContacted: "2025-03-09", lazardMappings: ["lb13", "lb14", "lb21"], notes: "LGP consumer VP. Specialty retail and distribution focus. LA-based. Relationship warm but overdue for touchpoint." },
  // Rockefeller Capital Management
  { id: "c25", sponsorId: "sp13", name: "James Griffith", title: "Managing Director", sector: "Industrials", email: "jgriffith@rockco.com", phone: "+1 212 549 5100", linkedin: "linkedin.com/in/jamesgriffith", recentDeals: [{ name: "Haynes Wire Company", sector: "Industrials", year: 2024 }, { name: "Vertex Aerospace", sector: "Industrials", year: 2023 }], lastContacted: "2025-03-21", lazardMappings: ["lb1", "lb25"], notes: "Head of direct investments at Rockefeller. Drives all co-invest and direct deal decisions. Former KKR industrials. Extremely well-networked across family office community." },
  { id: "c26", sponsorId: "sp13", name: "Sarah Oduya", title: "Principal", sector: "Healthcare", email: "soduya@rockco.com", phone: "+1 212 549 5101", linkedin: "linkedin.com/in/sarahoduya", recentDeals: [{ name: "Integra LifeSciences (co-invest)", sector: "Healthcare", year: 2024 }, { name: "Covenant Physician Partners", sector: "Healthcare", year: 2023 }], lastContacted: "2025-03-14", lazardMappings: ["lb5", "lb25"], notes: "Healthcare principal at Rockefeller. Focuses on healthcare services and med-tech co-investments. Prefers to come in alongside top-tier PE sponsors." },
  // Pritzker Private Capital
  { id: "c27", sponsorId: "sp14", name: "Tom Bagley", title: "Managing Director", sector: "Industrials", email: "tbagley@pritzker.com", phone: "+1 312 977 4100", linkedin: "linkedin.com/in/tombagley", recentDeals: [{ name: "Genco Industries", sector: "Industrials", year: 2024 }, { name: "Nortek Air Solutions", sector: "Industrials", year: 2023 }], lastContacted: "2025-03-18", lazardMappings: ["lb1", "lb25"], notes: "Senior deal lead at Pritzker. Covers manufacturing and specialty industrial. Chicago-based. Very selective — only 2-3 new deals per year. Relationship-first approach." },
  { id: "c28", sponsorId: "sp14", name: "Claire Donovan", title: "Vice President", sector: "Healthcare", email: "cdonovan@pritzker.com", phone: "+1 312 977 4101", linkedin: "linkedin.com/in/clairedonovan", recentDeals: [{ name: "Confluent Medical", sector: "Healthcare", year: 2024 }, { name: "Surgery Partners (add-on)", sector: "Healthcare", year: 2023 }], lastContacted: "2025-02-28", lazardMappings: ["lb5", "lb25"], notes: "Healthcare VP. Covers physician services and healthcare manufacturing. Former Baird HC investment banking." },
  // Cascade Investment
  { id: "c29", sponsorId: "sp15", name: "Michael Larson", title: "Managing Director", sector: "Industrials", email: "mlarson@cascadeinvestment.com", phone: "+1 425 452 4000", linkedin: "linkedin.com/in/michaellarson", recentDeals: [{ name: "Deere & Company stake", sector: "Industrials", year: 2024 }, { name: "AutoNation", sector: "Consumer & Retail", year: 2023 }], lastContacted: "2025-03-10", lazardMappings: ["lb1", "lb25"], notes: "CIO of Cascade — longest-tenured Gates family office exec. Highly private, relationship-driven. One of the most important family office relationships in the country. Very selective with advisors." },
  // Iconiq Capital
  { id: "c30", sponsorId: "sp16", name: "Will Griffith", title: "Managing Director", sector: "TMT / Tech", email: "wgriffith@iconiqcapital.com", phone: "+1 415 814 5600", linkedin: "linkedin.com/in/willgriffith", recentDeals: [{ name: "ServiceTitan", sector: "TMT / Tech", year: 2024 }, { name: "Zendesk (co-invest)", sector: "TMT / Tech", year: 2023 }], lastContacted: "2025-03-22", lazardMappings: ["lb9", "lb25"], notes: "Co-head of Iconiq growth equity. Covers enterprise software and fintech. Represents multiple prominent tech family clients. Very active — 5-6 new investments per year." },
  { id: "c31", sponsorId: "sp16", name: "Divya Sharma", title: "Principal", sector: "Healthcare", email: "dsharma@iconiqcapital.com", phone: "+1 415 814 5601", linkedin: "linkedin.com/in/divyasharma", recentDeals: [{ name: "Included Health", sector: "Healthcare", year: 2024 }, { name: "Cityblock Health", sector: "Healthcare", year: 2023 }], lastContacted: "2025-03-15", lazardMappings: ["lb5", "lb25"], notes: "Iconiq healthcare principal. Digital health and healthcare IT focus. Covers co-investments alongside TPG, Warburg, and other HC-focused sponsors." },
  // Soros Fund Management
  { id: "c32", sponsorId: "sp17", name: "Dawn Fitzpatrick", title: "Managing Director", sector: "Financial Institutions", email: "dfitzpatrick@soros.com", phone: "+1 212 548 5600", linkedin: "linkedin.com/in/dawnfitzpatrick", recentDeals: [{ name: "Pagaya Technologies", sector: "Financial Institutions", year: 2024 }, { name: "Blend Labs", sector: "TMT / Tech", year: 2023 }], lastContacted: "2025-03-20", lazardMappings: ["lb18", "lb25"], notes: "CIO of Soros Fund Management. Oversees the full private investment program. Key decision-maker on all direct PE co-investments. Strong fintech and financial services focus." },
  { id: "c33", sponsorId: "sp17", name: "Ryan Brennan", title: "Principal", sector: "TMT / Tech", email: "rbrennan@soros.com", phone: "+1 212 548 5601", linkedin: "linkedin.com/in/ryanbrennan", recentDeals: [{ name: "Shield AI", sector: "TMT / Tech", year: 2024 }, { name: "Socure", sector: "Financial Institutions", year: 2023 }], lastContacted: "2025-03-17", lazardMappings: ["lb9", "lb25"], notes: "Heads Soros private tech investments. Covers enterprise software, defense tech, and AI. Former Andreessen Horowitz. Active across growth and buyout." },
];

const ACTIVITIES_SEED = [
  // ── Existing sector banker activities ────────────────────────────────────
  { id: "a1", date: "2025-03-20", sponsorId: "sp8", contactId: "c18", lazardBankerId: "lb9", type: "Meeting", description: "Vertical SaaS pipeline discussion", notes: "Tyler walked through Vista's active screening criteria — NTM ARR <4x, must be B2B, >85% recurring revenue. Reviewed 3 targets we sourced. Strong interest in the compliance software vertical. Asked for updated comps by 3/27.", outcome: "Positive — follow-up scheduled", nextAction: "Send updated target tearsheets by 3/27", status: "Complete" },
  { id: "a2", date: "2025-03-18", sponsorId: "sp2", contactId: "c4", lazardBankerId: "lb13", type: "Pitch", description: "Sell-side advisory pitch — consumer food platform", notes: "Full pitch delivered to Stephanie and two senior partners. Rachel led credentials. Competing against Evercore and GS. BX focused on our consumer transaction experience and speed to close track record.", outcome: "Shortlisted — 3 banks in final round", nextAction: "Final round presentation week of 3/31", portcoId: "pc6", status: "Pending" },
  { id: "a3", date: "2025-03-12", sponsorId: "sp7", contactId: "c16", lazardBankerId: "lb9", type: "Meeting", description: "Quarterly coverage — cybersecurity landscape", notes: "Chris flagged active interest in managed security services roll-up. Budget $500M–$2B. Wants proprietary targets not yet in process. Natalie also joined — first time meeting her.", outcome: "Strong interest in managed security thesis", nextAction: "Prepare curated target list — 10 names by 3/26", status: "Complete" },
  { id: "a4", date: "2025-03-10", sponsorId: "sp1", contactId: "c1", lazardBankerId: "lb1", type: "Meeting", description: "Breakfast — industrial carve-out pipeline", notes: "Ryan walked through KKR's Q2 pipeline. Two potential sell-side situations in specialty chemicals and industrial services. David led relationship conversation. Warm tone — strong existing relationship.", outcome: "Active dialogue on 2 live situations", nextAction: "Follow up on specialty chemicals situation by 3/20", status: "Complete" },
  { id: "a5", date: "2025-01-10", sponsorId: "sp6", contactId: "c14", lazardBankerId: "lb5", type: "Pitch", description: "Healthcare IT roll-up sell-side mandate", notes: "Sarah led credentials. Michael very focused on our healthcare IT transaction comp set and process management. Asked specifically about our experience with strategic buyers in HIT space.", outcome: "Shortlisted — final round", nextAction: "Prepare final pitch with updated HIT transaction comps", portcoId: "pc14", status: "Pending" },
  { id: "a6", date: "2025-02-28", sponsorId: "sp3", contactId: "c7", lazardBankerId: "lb1", type: "Conference", description: "SuperReturn International — dinner + panel", notes: "Sat next to Kevin Tran at dinner. Discussed industrial supply chain opportunities in post-tariff environment. Kevin flagged two situations Apollo is looking to exit H2 2025.", outcome: "New intro: William Torres (Apollo Energy VP)", nextAction: "Send follow-up note to William Torres", status: "Complete" },
  { id: "a7", date: "2025-02-20", sponsorId: "sp2", contactId: "c5", lazardBankerId: "lb5", type: "Meeting", description: "Healthcare services platform — strategic options", notes: "Andrew is exploring dual-track for portfolio company (~$800M rev, 14% EBITDA margin). Lazard positioned well as lead advisor if process launches Q2.", outcome: "Dual-track process under consideration", nextAction: "Draft preliminary process overview memo", status: "In Progress" },
  { id: "a8", date: "2025-02-10", sponsorId: "sp5", contactId: "c12", lazardBankerId: "lb5", type: "Pitch", description: "Healthcare services buy-side advisory", notes: "Lost to Centerview. Brandon cited existing Centerview relationship and fee structure as deciding factors.", outcome: "Not selected — lost to Centerview", nextAction: "Re-engage Brandon on next mandate — target Q3", dealId: "d5", portcoId: "pc12", status: "Lost" },
  { id: "a9", date: "2025-01-15", sponsorId: "sp4", contactId: "c10", lazardBankerId: "lb1", type: "Conference", description: "Defense tech symposium", notes: "Introduced to Jason Merritt (Carlyle industrials VP) at symposium dinner. Emily Hartman also attended — first meeting. Jason flagged potential StandardAero add-on in H1 2025.", outcome: "Strong intro to Jason Merritt and Emily Hartman", nextAction: "Schedule formal coverage meeting for both", status: "Complete" },
  { id: "a10", date: "2025-01-20", sponsorId: "sp1", contactId: "c3", lazardBankerId: "lb9", type: "Meeting", description: "Software take-private target screening", notes: "Daniel reviewed 3 targets across vertical SaaS. Most interested in compliance and workforce management software.", outcome: "3 targets provided — 1 flagged for deeper dive", nextAction: "Run detailed analysis on compliance software target", status: "Complete" },

  // ── Bill Hart (lb20) — KKR, Blackstone, Apollo, Carlyle, H&F ─────────────
  { id: "a11", date: "2025-03-24", sponsorId: "sp1", contactId: "c1", lazardBankerId: "lb20", type: "Meeting", description: "KKR relationship check-in — Q1 pipeline review", notes: "Bill met with Ryan and two senior KKR partners. Discussed Lazard's recent industrials credentials and Q2 deal flow. KKR flagged 2 potential sell-side processes they're evaluating advisors for.", outcome: "Strong relationship reaffirmed, 2 mandates in view", nextAction: "Follow up with credentials package by 3/28", status: "Complete" },
  { id: "a12", date: "2025-03-22", sponsorId: "sp2", contactId: "c5", lazardBankerId: "lb20", type: "Meeting", description: "Blackstone HC coverage — Medline strategic review", notes: "Bill and Andrew Fielding discussed Medline's potential partial exit timeline. BX evaluating options for H2 2025. Bill introduced new Lazard HC MD to the relationship.", outcome: "Lazard positioned for any Medline process", nextAction: "Prepare Medline situation analysis", status: "In Progress" },
  { id: "a13", date: "2025-03-19", sponsorId: "sp3", contactId: "c7", lazardBankerId: "lb20", type: "Call", description: "Apollo — Arconic carve-out follow-up", notes: "Bill followed up on the Arconic aerospace carve-out. Kevin confirmed Apollo is considering a formal process in H2. Lazard well-positioned given prior carve-out work.", outcome: "Mandate likely Q3 — stay close", nextAction: "Send updated carve-out process overview", status: "Complete" },
  { id: "a14", date: "2025-03-15", sponsorId: "sp4", contactId: "c10", lazardBankerId: "lb20", type: "Meeting", description: "Carlyle — annual relationship dinner", notes: "Dinner with Jason Merritt and Carlyle's Head of Capital Markets. Bill covered Lazard's 2025 pipeline and strategic priorities. Carlyle expressed interest in Lazard for upcoming aerospace situation.", outcome: "Relationship strengthened at senior level", nextAction: "Schedule follow-up call on StandardAero", status: "Complete" },
  { id: "a15", date: "2025-01-18", sponsorId: "sp9", contactId: "c19", lazardBankerId: "lb20", type: "Meeting", description: "H&F — coverage initiation meeting", notes: "First formal meeting between Bill and H&F deal team. Sophie Nakamura and Derek Sullivan attended. Discussed Lazard's FIG and software credentials. H&F selects advisors very carefully.", outcome: "Good first meeting — relationship building stage", nextAction: "Send tailored credentials deck for H&F focus sectors", status: "Complete" },
  { id: "a16", date: "2025-02-25", sponsorId: "sp1", contactId: "c2", lazardBankerId: "lb20", type: "Pitch", description: "KKR WebMD — sell-side advisory pitch", notes: "Bill led the pitch alongside Sarah Mitchell. KKR team focused on Lazard's healthcare digital track record and process management. Three banks shortlisted.", outcome: "Shortlisted — final round decision pending", nextAction: "Prepare final pitch materials", dealId: "d2", portcoId: "pc2", status: "Pending" },
  { id: "a17", date: "2025-02-18", sponsorId: "sp2", contactId: "c6", lazardBankerId: "lb20", type: "Call", description: "Blackstone Chamberlain Group — mandate discussion", notes: "Bill confirmed Lazard mandate for Chamberlain sell-side. Discussed timeline and process structure with Marcus Lin. Expected to launch formal process Q2 2025.", outcome: "Mandate confirmed", nextAction: "Kick off internal process team", status: "Complete" },
  { id: "a18", date: "2025-02-05", sponsorId: "sp3", contactId: "c8", lazardBankerId: "lb20", type: "Conference", description: "DealMaker Summit — Apollo TMT roundtable", notes: "Bill attended roundtable with Apollo TMT team. Priya Mehta flagged interest in Lazard for upcoming software carve-out. Exchanged contacts with two new Apollo principals.", outcome: "New relationship: Priya Mehta TMT", nextAction: "Schedule follow-up call with Priya", status: "Complete" },

  // ── Courtney Haydon (lb22) — Blackstone, Apollo, Thoma Bravo, Vista ───────
  { id: "a19", date: "2025-03-25", sponsorId: "sp7", contactId: "c16", lazardBankerId: "lb22", type: "Meeting", description: "Thoma Bravo — Proofpoint exit strategy discussion", notes: "Courtney met with Chris Haddad and TB's Head of Portfolio. Discussed Proofpoint exit optionality — strategic sale vs IPO. Lazard well positioned given cybersecurity M&A credentials.", outcome: "Lazard on short list for any Proofpoint process", nextAction: "Prepare Proofpoint exit analysis", status: "In Progress" },
  { id: "a20", date: "2025-03-21", sponsorId: "sp2", contactId: "c4", lazardBankerId: "lb22", type: "Call", description: "Blackstone consumer — quarterly pipeline call", notes: "Courtney and Stephanie Ruiz discussed BX consumer pipeline. Two potential sell-side situations flagged for H2. BX evaluating advisors for both.", outcome: "Lazard flagged for both situations", nextAction: "Send consumer sector update and relevant credentials", status: "Complete" },
  { id: "a21", date: "2025-03-17", sponsorId: "sp8", contactId: "c18", lazardBankerId: "lb22", type: "Meeting", description: "Vista Equity — relationship breakfast", notes: "Courtney met Tyler Johnson and Vista's COO. Discussed Vista's buy-and-build strategy and Lazard's role as buy-side advisor on upcoming add-ons for Solera.", outcome: "Buy-side role confirmed for next Solera add-on", nextAction: "Set up call with Vista deal team on Solera targets", status: "Complete" },
  { id: "a22", date: "2025-03-11", sponsorId: "sp3", contactId: "c9", lazardBankerId: "lb22", type: "Meeting", description: "Apollo energy — Maxim Power exit planning", notes: "Courtney met with William Torres on Maxim Power sale timeline. Apollo targeting H2 2025 launch. Lazard energy team highly relevant given Maxim's power generation profile.", outcome: "Lazard being considered for sell-side mandate", nextAction: "Prepare power sector M&A credentials", status: "In Progress" },
  { id: "a23", date: "2025-02-27", sponsorId: "sp7", contactId: "c17", lazardBankerId: "lb22", type: "Call", description: "Thoma Bravo — ConnectWise add-on pipeline", notes: "Call with Natalie Brooks on ConnectWise's add-on acquisition pipeline. TB looking at 3 MSP software targets. Lazard positioned as buy-side advisor.", outcome: "Lazard engaged on buy-side screening", nextAction: "Prepare target list for ConnectWise platform", status: "Complete" },
  { id: "a24", date: "2025-02-12", sponsorId: "sp2", contactId: "c5", lazardBankerId: "lb22", type: "Pitch", description: "Blackstone HC — Medline advisory pitch", notes: "Courtney and Sarah Mitchell pitched BX HC team on Medline strategic advisory. Competing with JPM and Goldman. BX focused on Lazard's HC distribution and carve-out track record.", outcome: "Advancing to final round", nextAction: "Final presentation scheduled for 3/15", portcoId: "pc4", dealId: "d6", status: "Pending" },

  // ── Adam Cady (lb23) — Carlyle, TPG, Thoma Bravo, H&F ───────────────────
  { id: "a25", date: "2025-03-26", sponsorId: "sp4", contactId: "c11", lazardBankerId: "lb23", type: "Meeting", description: "Carlyle HC — MedRisk strategic options", notes: "Adam and Emily Hartman discussed MedRisk exit options. Carlyle considering sale to strategic or larger managed care platform. Lazard HC team well placed.", outcome: "Lazard positioned for MedRisk mandate", nextAction: "Send managed care M&A comps", status: "In Progress" },
  { id: "a26", date: "2025-03-23", sponsorId: "sp5", contactId: "c13", lazardBankerId: "lb23", type: "Meeting", description: "TPG — McAfee Enterprise dual-track discussion", notes: "Adam met Samantha Osei and TPG's Head of Portfolio. McAfee Enterprise dual-track gaining momentum. Lazard pitching both sell-side and buy-side advisory roles.", outcome: "Lazard in pole position for McAfee mandate", nextAction: "Prepare dual-track process proposal", status: "Pending" },
  { id: "a27", date: "2025-03-18", sponsorId: "sp7", contactId: "c16", lazardBankerId: "lb23", type: "Call", description: "Thoma Bravo — annual banker review", notes: "Adam participated in TB's annual advisor review call. Discussed Lazard's software M&A pipeline and recent credentials. TB confirmed Lazard remains on preferred advisor list.", outcome: "Preferred advisor status maintained", nextAction: "Send updated software credentials deck", status: "Complete" },
  { id: "a28", date: "2025-01-22", sponsorId: "sp9", contactId: "c20", lazardBankerId: "lb23", type: "Meeting", description: "H&F — Derek Sullivan introductory meeting", notes: "Adam met Derek Sullivan for the first time. Covered Lazard's tech M&A and take-private capabilities. Derek runs H&F's TMT deals — key relationship to develop.", outcome: "Good intro — Derek receptive", nextAction: "Follow up with software take-private credentials", status: "Complete" },
  { id: "a29", date: "2025-02-22", sponsorId: "sp4", contactId: "c10", lazardBankerId: "lb23", type: "Pitch", description: "Carlyle — StandardAero re-IPO or sale advisory", notes: "Adam led pitch with David Kurz. Jason Merritt and Carlyle CFO attended. Lazard positioning for dual-track mandate. Strong credentials from prior aero/defense work.", outcome: "Shortlisted — 2 banks remaining", nextAction: "Final round scheduled for 3/10", portcoId: "pc10", dealId: "d7", status: "Pending" },
  { id: "a30", date: "2025-02-08", sponsorId: "sp5", contactId: "c12", lazardBankerId: "lb23", type: "Call", description: "TPG — Convey Health post-process debrief", notes: "Adam debriefed with Brandon Wu following lost Convey pitch. Brandon acknowledged Lazard's strong process credentials but Centerview had deeper HC IT relationship. Agreed to stay in touch.", outcome: "Relationship maintained post-loss", nextAction: "Re-engage TPG on next HIT mandate", status: "Complete" },

  // ── Taylor Auman (lb21) — KKR, TPG, Warburg, Bain, Leonard Green ────────
  { id: "a31", date: "2025-01-14", sponsorId: "sp6", contactId: "c14", lazardBankerId: "lb21", type: "Meeting", description: "Warburg Pincus — HC coverage meeting", notes: "Taylor and Michael Bassett discussed WP's HC IT pipeline. Modernizing Medicine exit being explored for 2026. Taylor flagged Lazard's specialty EHR transaction experience.", outcome: "Lazard on WP's shortlist for ModMed process", nextAction: "Send EHR and HC IT M&A credentials", status: "Complete" },
  { id: "a32", date: "2025-03-20", sponsorId: "sp10", contactId: "c22", lazardBankerId: "lb21", type: "Call", description: "Bain Capital — Waystar secondary or IPO path", notes: "Taylor spoke with James Okonkwo about Waystar options. Bain evaluating whether to pursue IPO or strategic sale given current market. Lazard well positioned on both paths.", outcome: "Lazard being considered for Waystar process", nextAction: "Prepare Waystar dual-track analysis", status: "In Progress" },
  { id: "a33", date: "2025-03-16", sponsorId: "sp1", contactId: "c2", lazardBankerId: "lb21", type: "Meeting", description: "KKR — WebMD dual-track prep meeting", notes: "Taylor joined Bill Hart and Sarah Mitchell for WebMD pitch prep. Aligned on key messages, pricing approach, and process structure for the final pitch round.", outcome: "Team aligned on final pitch strategy", nextAction: "Final pitch delivery week of 3/31", status: "In Progress" },
  { id: "a34", date: "2025-03-09", sponsorId: "sp12", contactId: "c24", lazardBankerId: "lb21", type: "Meeting", description: "Leonard Green — coverage re-engagement", notes: "Taylor met Marcus Webb at LGP's NY office. Relationship had gone quiet — last touchpoint was December. Discussed LGP's 2025 deal plans and Lazard's consumer credentials.", outcome: "Relationship re-engaged", nextAction: "Invite Marcus to Lazard consumer sector dinner", status: "Complete" },
  { id: "a35", date: "2025-01-08", sponsorId: "sp6", contactId: "c15", lazardBankerId: "lb21", type: "Call", description: "Warburg Pincus FIG — Aisha Patel quarterly check-in", notes: "Taylor and Aisha discussed WP's fintech pipeline. Several portfolio companies evaluating bolt-on acquisitions. Lazard FIG team well positioned for advisory work.", outcome: "Ongoing dialogue on 2 WP fintech situations", nextAction: "Introduce Lazard FIG MD to Aisha", status: "Complete" },
  { id: "a36", date: "2025-02-14", sponsorId: "sp10", contactId: "c21", lazardBankerId: "lb21", type: "Meeting", description: "Bain Capital consumer — Elena Vasquez coverage", notes: "Taylor met Elena Vasquez for quarterly coverage meeting. Bain evaluating next consumer exit — Varsity Brands being monitored for 2025-2026 sale window.", outcome: "Lazard flagged as preferred advisor for Varsity Brands", nextAction: "Send consumer/retail M&A comps for Varsity", status: "Complete" },

  // ── Teddy Henderson (lb24) — KKR, Blackstone, Warburg, Vista, Bain ───────
  { id: "a37", date: "2025-03-25", sponsorId: "sp2", contactId: "c6", lazardBankerId: "lb24", type: "Meeting", description: "Blackstone — Chamberlain Group process kickoff", notes: "Teddy and Marcus Lin kicked off the Chamberlain process internally. Discussed buyer universe, timing, and Lazard's role. Process expected to launch formally in Q2.", outcome: "Process on track for Q2 launch", nextAction: "Prepare initial buyer universe memo", status: "In Progress" },
  { id: "a38", date: "2025-03-22", sponsorId: "sp1", contactId: "c3", lazardBankerId: "lb24", type: "Call", description: "KKR TMT — Barracuda add-on pipeline call", notes: "Teddy and Daniel Cho discussed Barracuda's active add-on pipeline. Two cybersecurity targets being evaluated. Lazard pitching buy-side advisory for at least one.", outcome: "Lazard pitching on Barracuda add-on", nextAction: "Prepare target analysis for Barracuda platform", status: "Pending" },
  { id: "a39", date: "2025-03-14", sponsorId: "sp8", contactId: "c18", lazardBankerId: "lb24", type: "Meeting", description: "Vista Equity — Solera add-on strategy session", notes: "Teddy met Tyler Johnson on Solera's add-on strategy. Vista evaluating 3 automotive data targets in Europe. Lazard's cross-border M&A capability a key differentiator.", outcome: "Lazard engaged for Solera European add-on", nextAction: "Prepare European automotive data target analysis", status: "In Progress" },
  { id: "a40", date: "2025-01-20", sponsorId: "sp6", contactId: "c14", lazardBankerId: "lb24", type: "Conference", description: "J.P. Morgan Healthcare Conference — WP dinner", notes: "Teddy and Michael Bassett attended JPM HC conference together. Discussed Modernizing Medicine positioning and HC IT market dynamics. Strong relationship moment.", outcome: "Relationship deepened at conference", nextAction: "Follow up on ModMed exit timeline", status: "Complete" },
  { id: "a41", date: "2025-02-24", sponsorId: "sp10", contactId: "c22", lazardBankerId: "lb24", type: "Call", description: "Bain Capital — Waystar IPO readiness call", notes: "Teddy joined Taylor Auman on Waystar IPO readiness call with James Okonkwo. Discussed market window and dual-track optionality. Lazard well positioned for either path.", outcome: "Lazard shortlisted for Waystar process", nextAction: "Prepare Waystar process overview", status: "In Progress" },
  { id: "a42", date: "2025-02-17", sponsorId: "sp2", contactId: "c5", lazardBankerId: "lb24", type: "Pitch", description: "Blackstone — Medline sell-side advisory pitch", notes: "Teddy and Courtney Haydon pitched BX HC team. Strong credentials presentation covering Lazard's HC distribution and services track record. Competing with JPM.", outcome: "Advanced to final round", nextAction: "Final presentation on 3/15", portcoId: "pc4", dealId: "d6", status: "Pending" },

  // ── Daniel Gajewski (lb25) — Family Office Coverage ──────────────────────
  { id: "a43", date: "2025-03-24", sponsorId: "sp13", contactId: "c25", lazardBankerId: "lb25", type: "Meeting", description: "Rockefeller — Q1 deal flow and co-invest pipeline", notes: "Daniel met James Griffith at Rockefeller HQ. Reviewed Lazard deal flow across industrials and consumer. James flagged two co-invest opportunities alongside KKR and Apollo.", outcome: "2 co-invest opportunities flagged — both industrials", nextAction: "Send deal teasers for both situations by 3/28", status: "Complete" },
  { id: "a44", date: "2025-03-22", sponsorId: "sp16", contactId: "c30", lazardBankerId: "lb25", type: "Meeting", description: "Iconiq — enterprise software co-invest discussion", notes: "Daniel met Will Griffith on Iconiq's active software co-invest pipeline. Iconiq looking to participate in 2-3 take-private processes in H1. Lazard positioned as preferred advisor.", outcome: "Lazard on Iconiq preferred advisor list", nextAction: "Share upcoming software take-private pipeline", status: "Complete" },
  { id: "a45", date: "2025-03-20", sponsorId: "sp17", contactId: "c32", lazardBankerId: "lb25", type: "Call", description: "Soros — fintech co-investment call", notes: "Daniel and Dawn Fitzpatrick discussed Soros's growing PE co-investment program. Soros looking to deploy –2B in PE co-investments in 2025. Lazard deal flow highly relevant.", outcome: "Soros actively building PE co-invest pipeline", nextAction: "Schedule in-person meeting to present Lazard deal flow", status: "In Progress" },
  { id: "a46", date: "2025-03-18", sponsorId: "sp14", contactId: "c27", lazardBankerId: "lb25", type: "Meeting", description: "Pritzker — industrials deal flow review", notes: "Daniel flew to Chicago for lunch with Tom Bagley. Tom expressed strong interest in specialty manufacturing situations in the 00M–.5B range. Lazard credentials resonated.", outcome: "Active dialogue — 1 live situation shared", nextAction: "Follow up on specialty HVAC situation", status: "In Progress" },
  { id: "a47", date: "2025-03-15", sponsorId: "sp16", contactId: "c31", lazardBankerId: "lb25", type: "Meeting", description: "Iconiq healthcare — digital health co-invest", notes: "Daniel introduced Divya Sharma to Lazard HC team. Iconiq looking to back 2-3 growth companies alongside Warburg and TPG. Lazard HC deal flow highly complementary.", outcome: "Iconiq engaged on HC co-invest alongside Lazard mandates", nextAction: "Loop in Sarah Mitchell on Iconiq HC pipeline", status: "Complete" },
  { id: "a48", date: "2025-03-12", sponsorId: "sp15", contactId: "c29", lazardBankerId: "lb25", type: "Meeting", description: "Cascade — relationship meeting with Michael Larson", notes: "Daniel secured rare in-person meeting with Michael Larson in Kirkland. Discussed Cascade's long-duration industrial M&A focus. Significant relationship milestone — Cascade rarely engages advisors.", outcome: "Cascade open to Lazard on select industrials situations", nextAction: "Send Lazard industrials and infrastructure credentials", status: "Complete" },
  { id: "a49", date: "2025-03-10", sponsorId: "sp13", contactId: "c26", lazardBankerId: "lb25", type: "Call", description: "Rockefeller HC — Sarah Oduya coverage call", notes: "Daniel introduced Sarah Oduya to Lazard healthcare team. Sarah covers HC co-investments for Rockefeller. Looking to participate in 1-2 healthcare processes alongside top-tier sponsors in 2025.", outcome: "Rockefeller HC co-invest pipeline established", nextAction: "Share upcoming Lazard HC mandates where co-invest relevant", status: "Complete" },
  { id: "a50", date: "2025-03-05", sponsorId: "sp17", contactId: "c33", lazardBankerId: "lb25", type: "Meeting", description: "Soros — private tech investments meeting", notes: "Daniel met Ryan Brennan on Soros's private tech program. Ryan covers defense tech and enterprise software. Strong interest in Lazard's software and defense M&A pipeline.", outcome: "Lazard flagged as advisor for Shield AI follow-on", nextAction: "Prepare defense tech sector update for Ryan", status: "In Progress" },
  { id: "a51", date: "2025-02-26", sponsorId: "sp14", contactId: "c28", lazardBankerId: "lb25", type: "Call", description: "Pritzker HC — Claire Donovan introductory call", notes: "Daniel connected Claire Donovan with Lazard HC team. Pritzker evaluating physician services add-ons for existing platform. Lazard HC credentials well-received.", outcome: "Pritzker HC pipeline dialogue initiated", nextAction: "Send physician services M&A comps", status: "Complete" },
  { id: "a52", date: "2025-02-20", sponsorId: "sp15", contactId: "c29", lazardBankerId: "lb25", type: "Call", description: "Cascade — follow-up call post introductory meeting", notes: "Follow-up with Michael Larson. Discussed Cascade's interest in large-cap industrials. Michael confirmed Cascade would co-invest alongside Carlyle or Apollo on the right deal.", outcome: "Co-invest appetite confirmed for right situation", nextAction: "Flag any relevant Carlyle/Apollo industrial co-invest opportunities", status: "Complete" },
];

const PORTCOS_SEED = [
  // KKR
  { id: "pc1", sponsorId: "sp1", name: "CHC Group", sector: "Industrials", description: "Global provider of helicopter services to the offshore energy industry. KKR acquired in 2019 via restructuring. Core revenue from oil & gas transport contracts.", status: "Active", revenue: "$1.1B", ebitda: "$180M", investmentYear: 2019, contactId: "c1", notes: "Potential exit situation being monitored for H2 2025. Lazard has relationship context from prior restructuring." },
  { id: "pc2", sponsorId: "sp1", name: "WebMD Health", sector: "Healthcare", description: "Leading digital health information platform serving consumers and healthcare professionals. Revenue driven by pharma advertising and subscription services.", status: "Exploring Exit", revenue: "$700M", ebitda: "$210M", investmentYear: 2017, contactId: "c2", notes: "Lauren Kim has flagged dual-track as likely path. Lazard should position for sell-side mandate." },
  { id: "pc3", sponsorId: "sp1", name: "Barracuda Networks", sector: "TMT / Tech", description: "Cloud-first cybersecurity company focused on email security, network security, and data protection for SMBs and enterprises.", status: "Active", revenue: "$520M", ebitda: "$95M", investmentYear: 2022, contactId: "c3", notes: "Add-on acquisition strategy underway. Daniel has flagged 2 targets for Barracuda platform." },
  // Blackstone
  { id: "pc4", sponsorId: "sp2", name: "Medline Industries", sector: "Healthcare", description: "Largest privately held manufacturer and distributor of medical supplies in the US. Serves hospitals, nursing homes, and home health agencies.", status: "Active", revenue: "$21B", ebitda: "$1.4B", investmentYear: 2021, contactId: "c5", notes: "One of largest PE deals ever. Andrew Fielding leads for BX. Lazard track record in healthcare distribution relevant here." },
  { id: "pc5", sponsorId: "sp2", name: "Chamberlain Group", sector: "Industrials", description: "Global leader in access control solutions — garage door openers, gates, and smart home access products. B2B and B2C channels.", status: "Exploring Exit", revenue: "$2.0B", ebitda: "$420M", investmentYear: 2021, contactId: "c6", notes: "Marcus Lin handling. Dual-track likely in 2025. Strategic interest from several large industrials." },
  { id: "pc6", sponsorId: "sp2", name: "Tropical Smoothie Cafe", sector: "Consumer & Retail", description: "Fast-casual franchise with 1,400+ locations across the US. Blackstone acquired in 2023. Strong unit economics and franchise royalty model.", status: "Active", revenue: "$900M", ebitda: "$70M", investmentYear: 2020, contactId: "c4", notes: "Stephanie's primary portco. Franchise platform performing well post-acquisition. Stephanie primary coverage. Potential sell-side in 2026." },
  // Apollo
  { id: "pc7", sponsorId: "sp3", name: "Arconic", sector: "Industrials", description: "Manufacturer of aluminum rolled products, extrusions, and forgings for aerospace, automotive, and industrial markets.", status: "Active", revenue: "$5.7B", ebitda: "$580M", investmentYear: 2022, contactId: "c7", notes: "Kevin Tran day-to-day. Large complex industrial — potential for carve-out of aerospace segment." },
  { id: "pc8", sponsorId: "sp3", name: "Presidio", sector: "TMT / Tech", description: "IT solutions and managed services provider focused on cybersecurity, cloud, and digital transformation for mid-market enterprises.", status: "Active", revenue: "$3.8B", ebitda: "$320M", investmentYear: 2019, contactId: "c8", notes: "Priya Mehta coverage. Add-on activity ongoing. Possible take-private candidate for re-IPO path." },
  { id: "pc9", sponsorId: "sp3", name: "Maxim Power", sector: "Energy", description: "Independent power producer operating natural gas and renewable energy assets across North America.", status: "Exploring Exit", revenue: "$340M", ebitda: "$95M", investmentYear: 2021, contactId: "c9", notes: "William Torres flagged potential sale process H2 2025. Lazard energy team should be positioned." },
  // Carlyle
  { id: "pc10", sponsorId: "sp4", name: "StandardAero", sector: "Industrials", description: "One of the world's largest independent providers of aviation maintenance, repair and overhaul (MRO) services.", status: "Active", revenue: "$4.7B", ebitda: "$520M", investmentYear: 2019, contactId: "c10", notes: "Jason Merritt primary contact. IPO explored in 2024, pulled. Strategic sale or re-IPO likely path in 2025." },
  { id: "pc11", sponsorId: "sp4", name: "MedRisk", sector: "Healthcare", description: "Leading managed care solution for workers' compensation physical and occupational therapy. Tech-enabled services model.", status: "Active", revenue: "$260M", ebitda: "$65M", investmentYear: 2020, contactId: "c11", notes: "Emily Hartman coverage. Solid recurring revenue. Potential strategic sale to larger managed care platform." },
  // TPG
  { id: "pc12", sponsorId: "sp5", name: "Convey Health Solutions", sector: "Healthcare", description: "Technology and services company enabling health plans with member engagement, benefits administration, and government programs.", status: "Active", revenue: "$180M", ebitda: "$40M", investmentYear: 2021, contactId: "c12", notes: "Brandon Wu managing. Exploring strategic alternatives as market conditions improve for HIT assets." },
  { id: "pc13", sponsorId: "sp5", name: "McAfee Enterprise", sector: "TMT / Tech", description: "Enterprise cybersecurity software business carved out from McAfee. Provides endpoint, network, and cloud security solutions.", status: "Exploring Exit", revenue: "$1.4B", ebitda: "$380M", investmentYear: 2021, contactId: "c13", notes: "Samantha Osei flagged dual-track consideration. Lazard TMT team well positioned given prior software experience." },
  // Warburg Pincus
  { id: "pc14", sponsorId: "sp6", name: "Modernizing Medicine", sector: "Healthcare", description: "Specialty-specific EHR and practice management platform serving dermatology, ophthalmology, and other specialties.", status: "Active", revenue: "$310M", ebitda: "$55M", investmentYear: 2019, contactId: "c14", notes: "Michael Bassett primary. High NRR, strong retention. Likely sell-side process 2026." },
  // Thoma Bravo
  { id: "pc15", sponsorId: "sp7", name: "Proofpoint", sector: "TMT / Tech", description: "Enterprise cybersecurity and compliance company. Market leader in email security, threat intelligence, and information protection.", status: "Active", revenue: "$1.1B", ebitda: "$330M", investmentYear: 2021, contactId: "c16", notes: "Chris Haddad coverage. Largest take-private in cybersecurity history. Exit likely via strategic sale or IPO 2026." },
  { id: "pc16", sponsorId: "sp7", name: "ConnectWise", sector: "TMT / Tech", description: "Business management platform for technology solution providers — PSA, RMM, and cybersecurity tools for MSPs.", status: "Active", revenue: "$680M", ebitda: "$175M", investmentYear: 2019, contactId: "c17", notes: "Natalie Brooks managing. Organic and inorganic growth story. Add-on pipeline active." },
  // Vista
  { id: "pc17", sponsorId: "sp8", name: "Solera Holdings", sector: "TMT / Tech", description: "Global data and software company providing risk and asset management solutions to the automotive and insurance industries.", status: "Active", revenue: "$2.8B", ebitda: "$820M", investmentYear: 2021, contactId: "c18", notes: "Tyler Johnson day-to-day. Complex multi-product platform. Lazard relationship strong — prior work on adjacent assets." },
  // Bain Capital
  { id: "pc18", sponsorId: "sp10", name: "Waystar", sector: "Healthcare", description: "Cloud-based revenue cycle management technology serving hospitals, health systems, and physician groups.", status: "Active", revenue: "$820M", ebitda: "$290M", investmentYear: 2019, contactId: "c22", notes: "James Okonkwo primary. IPO filed 2024. Watching closely — secondary sale or strategic buyer alternative." },
];
const SECTORS = ["Industrials", "Healthcare", "TMT / Tech", "Consumer & Retail", "Energy", "Financial Institutions"];
const DEALS_SEED = [
  { id: "d1", name: "Chamberlain Group Sale", portcoId: "pc5", sellerSponsorId: "sp2", sector: "Industrials", lazardRole: "Sell-Side", status: "Mandated", description: "Blackstone exploring full sale of Chamberlain Group. Access control / smart home platform. Rev ~$2B, EBITDA ~$420M.", buySideFirms: ["sp1","sp4","sp3"], notes: "Lazard mandated sell-side. Process expected to launch Q2 2025. Strategic and financial buyer universe both relevant.", date: "2025-02-01" },
  { id: "d2", name: "WebMD Health Dual-Track", portcoId: "pc2", sellerSponsorId: "sp1", sector: "Healthcare", lazardRole: "Sell-Side", status: "Pitching", description: "KKR exploring sale or IPO of WebMD. Digital health platform, ~$700M rev. Lazard shortlisted for sell-side advisory.", buySideFirms: ["sp2","sp5","sp6"], notes: "Final pitch round week of 3/31. Competing against Evercore. Need to emphasize our HC digital track record.", date: "2025-03-05" },
  { id: "d3", name: "McAfee Enterprise Sell-Side", portcoId: "pc13", sellerSponsorId: "sp5", sector: "TMT / Tech", lazardRole: "Buy-Side", status: "Pitching", description: "TPG exploring dual-track for McAfee Enterprise. Lazard pitching KKR and Apollo as buy-side advisor for the acquisition.", buySideFirms: ["sp1","sp3"], notes: "Pitched KKR TMT team and Apollo. Both expressing interest. Sell-side process likely launches Q3.", date: "2025-01-25" },
  { id: "d4", name: "Arconic Aerospace Carve-Out", portcoId: "pc7", sellerSponsorId: "sp3", sector: "Industrials", lazardRole: "Sell-Side", status: "Closed Won", description: "Apollo sold Arconic aerospace segment to Carlyle. Lazard acted as sell-side advisor. $1.2B transaction.", buySideFirms: ["sp4"], notes: "Closed Q4 2024. Strong execution — used as credential in current pitches.", date: "2024-11-15" },
  { id: "d5", name: "Convey Health Strategic Sale", portcoId: "pc12", sellerSponsorId: "sp5", sector: "Healthcare", lazardRole: "Buy-Side", status: "Lost", description: "Lazard pitched Warburg Pincus as buy-side advisor to acquire Convey Health from TPG. Lost to Centerview.", buySideFirms: ["sp6"], notes: "Warburg went with Centerview on relationship. Re-engage on next WP HC opportunity.", date: "2025-02-10" },
  { id: "d6", name: "Medline Industries Strategic Advisory", portcoId: "pc4", sellerSponsorId: "sp2", sector: "Healthcare", lazardRole: "Sell-Side", status: "Pitching", description: "Blackstone exploring strategic options for Medline Industries including a potential partial exit or recapitalization. Lazard shortlisted for sell-side advisory. Competing with JPM and Goldman.", buySideFirms: [], notes: "Final round presentations scheduled 3/15. Courtney and Teddy both pitched. Strong HC distribution credentials — key differentiator vs. bulge brackets.", date: "2025-02-12" },
  { id: "d7", name: "StandardAero Sale or Re-IPO", portcoId: "pc10", sellerSponsorId: "sp4", sector: "Industrials", lazardRole: "Sell-Side", status: "Pitching", description: "Carlyle evaluating dual-track sale or re-IPO for StandardAero, one of the largest independent aviation MRO providers. Lazard shortlisted after strong credentials presentation.", buySideFirms: [], notes: "Adam Cady and David Kurz led the pitch. Carlyle narrowed to 2 banks. Decision expected by end of March. Aerospace & defense track record was the key credential.", date: "2025-02-22" },
];

const PORTCO_STATUSES = ["Active", "Exploring Exit", "Exited"];
const PORTCO_STATUS_STYLE = {
  "Active": { bg: "#EEF7F2", text: "#1d5c3a" },
  "Exploring Exit": { bg: "#FDF6EE", text: "#7a4a1a" },
  "Exited": { bg: "#f0f0f0", text: "#888" },
};
const DEAL_STATUSES = ["Pitching", "Mandated", "In Process", "Closed Won", "Lost"];
const DEAL_STATUS_STYLE = {
  "Pitching":    { bg: "#EEF2F7", text: "#1a3a5c" },
  "Mandated":    { bg: "#EEF7F2", text: "#1d5c3a" },
  "In Process":  { bg: "#FDF6EE", text: "#7a4a1a" },
  "Closed Won":  { bg: "#EEF7F2", text: "#1d5c3a" },
  "Lost":        { bg: "#FDF0EE", text: "#7a1a1a" },
};
const DEAL_ROLES = ["Sell-Side", "Buy-Side"];
const ACTIVITY_TYPES = ["Meeting", "Pitch", "Conference", "Call"];
const STATUSES = ["Complete", "Pending", "In Progress", "Lost", "Won"];
const TITLES = ["Founder & CEO", "Founder & Managing Partner", "Co-CEO", "Senior MD", "Co-Head", "Head", "Managing Director", "Partner", "Co-Managing Partner", "Director", "Vice President", "Principal", "Associate"];
const LZ_TITLES = ["Managing Director", "Vice President", "Director", "Associate", "Analyst"];

const SECTOR_COLOR = {
  "Industrials": { bg: "#EEF2F7", text: "#1a3a5c", border: "#C5D4E6" },
  "Healthcare": { bg: "#EEF7F2", text: "#1d5c3a", border: "#C5E0D2" },
  "TMT / Tech": { bg: "#EEF2F7", text: "#1a3a5c", border: "#C5D4E6" },
  "Consumer & Retail": { bg: "#F7EEF5", text: "#5c1a4a", border: "#E0C5DA" },
  "Energy": { bg: "#F7F3EE", text: "#5c3d1a", border: "#E0D2C5" },
  "Financial Institutions": { bg: "#EEF6F7", text: "#1a4a5c", border: "#C5DAE0" },
};
const STATUS_STYLE = {
  "Complete": { bg: "#EEF7F2", text: "#1d5c3a" },
  "Pending": { bg: "#FDF6EE", text: "#7a4a1a" },
  "In Progress": { bg: "#EEF2F7", text: "#1a3a5c" },
  "Lost": { bg: "#FDF0EE", text: "#7a1a1a" },
  "Won": { bg: "#EEF7F2", text: "#1d5c3a" },
};
const TIER_COLOR = { 1: "#1a3a5c", 2: "#7a4a1a", 3: "#666" };

function daysSince(d) { if (!d) return 999; return Math.floor((new Date("2025-03-26") - new Date(d)) / 86400000); }

function StallBadge({ date }) {
  const d = daysSince(date);
  const s = d > 60 ? { bg: "#FDF0EE", text: "#7a1a1a" } : d > 30 ? { bg: "#FDF6EE", text: "#7a4a1a" } : { bg: "#EEF7F2", text: "#1d5c3a" };
  return <span style={{ background: s.bg, color: s.text, borderRadius: 2, fontSize: 10, padding: "2px 8px", fontWeight: 500 }}>{d > 0 ? `${d}d ago` : "Today"}</span>;
}
function SectorTag({ sector }) {
  const s = SECTOR_COLOR[sector] || { bg: "#f0f0f0", text: "#333", border: "#ddd" };
  return <span style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}`, borderRadius: 2, fontSize: 10, padding: "2px 8px", marginRight: 3, display: "inline-block", fontWeight: 500 }}>{sector}</span>;
}
function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || { bg: "#f0f0f0", text: "#333" };
  return <span style={{ background: s.bg, color: s.text, borderRadius: 2, fontSize: 10, padding: "3px 9px", fontWeight: 600 }}>{status}</span>;
}
function BankerTag({ banker }) {
  if (banker?.sponsorCoverage) return <span style={{ background: "#FDF6EE", color: "#7a4a1a", border: "1px solid #E0D2C5", borderRadius: 2, fontSize: 10, padding: "2px 8px", fontWeight: 600 }}>Sponsor Coverage</span>;
  return <SectorTag sector={banker?.sector || ""} />;
}
function Avatar({ name = "?", size = 32 }) {
  const i = name.split(" ").map(n => n[0]).slice(0, 2).join("");
  return <div style={{ width: size, height: size, borderRadius: "50%", background: "#1a3a5c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.34, fontWeight: 700, flexShrink: 0, letterSpacing: 0 }}>{i}</div>;
}
function uid() { return Math.random().toString(36).slice(2, 9); }

const IS = { background: "#fafafa", border: "1px solid #ddd", borderRadius: 3, color: "#1a1a1a", fontFamily: "inherit", fontSize: 13, padding: "8px 11px", width: "100%", outline: "none" };
const SS = { ...IS, cursor: "pointer" };
const SaveBtn = { background: "#1a3a5c", border: "none", borderRadius: 3, color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "9px 20px", cursor: "pointer" };
const CancelBtn = { background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 3, color: "#666", fontFamily: "inherit", fontSize: 12, padding: "9px 16px", cursor: "pointer" };
const DangerBtn = { background: "#FDF0EE", border: "1px solid #f0c0b8", borderRadius: 3, color: "#7a1a1a", fontFamily: "inherit", fontSize: 12, padding: "9px 16px", cursor: "pointer" };

function Modal({ title, onClose, children, width = 640 }) {
  const isMob = window.innerWidth < 768;
  return (
    <div style={{ position: "fixed", inset: 0, background: "#00000040", zIndex: 300, display: "flex", alignItems: isMob ? "flex-end" : "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: isMob ? "12px 12px 0 0" : 4, width: isMob ? "100%" : width, maxWidth: "100vw", maxHeight: isMob ? "92vh" : "88vh", overflowY: "auto", boxShadow: "0 12px 48px rgba(26,58,92,0.15)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid #eee", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: 15, color: "#1a3a5c", fontWeight: 700 }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#bbb", fontSize: 20, cursor: "pointer", padding: "0 4px" }}>✕</button>
        </div>
        <div style={{ padding: isMob ? 16 : 24 }}>{children}</div>
      </div>
    </div>
  );
}

function Fld({ label, children }) {
  return <div style={{ marginBottom: 14 }}><div style={{ fontSize: 10, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5, fontWeight: 600 }}>{label}</div>{children}</div>;
}

// ─── FORMS ────────────────────────────────────────────────────────────────────
function SponsorForm({ initial, onSave, onClose }) {
  const [f, setF] = useState(initial || { name: "", aum: "", dealsYTD: 0, hq: "", tier: 1, sectors: [], website: "", notes: "" });
  const toggleSec = s => setF(p => ({ ...p, sectors: p.sectors.includes(s) ? p.sectors.filter(x => x !== s) : [...p.sectors, s] }));
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Fld label="Firm Name"><input style={IS} value={f.name} onChange={e => setF(p => ({ ...p, name: e.target.value }))} placeholder="e.g. KKR" /></Fld>
        <Fld label="AUM"><input style={IS} value={f.aum} onChange={e => setF(p => ({ ...p, aum: e.target.value }))} placeholder="e.g. $50B" /></Fld>
        <Fld label="Deals YTD"><input type="number" style={IS} value={f.dealsYTD} onChange={e => setF(p => ({ ...p, dealsYTD: Number(e.target.value) }))} /></Fld>
        <Fld label="HQ"><input style={IS} value={f.hq} onChange={e => setF(p => ({ ...p, hq: e.target.value }))} placeholder="e.g. New York, NY" /></Fld>
        <Fld label="Website"><input style={IS} value={f.website} onChange={e => setF(p => ({ ...p, website: e.target.value }))} /></Fld>
        <Fld label="Tier"><select style={SS} value={f.tier} onChange={e => setF(p => ({ ...p, tier: Number(e.target.value) }))}>{[1,2,3].map(t => <option key={t} value={t}>Tier {t}</option>)}</select></Fld>
      </div>
      <Fld label="Sectors"><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{SECTORS.map(s => <button key={s} onClick={() => toggleSec(s)} style={{ background: f.sectors.includes(s) ? SECTOR_COLOR[s]?.bg || "#eee" : "#f5f5f5", border: `1px solid ${f.sectors.includes(s) ? SECTOR_COLOR[s]?.border || "#ccc" : "#e0e0e0"}`, borderRadius: 2, color: f.sectors.includes(s) ? SECTOR_COLOR[s]?.text || "#333" : "#aaa", fontFamily: "inherit", fontSize: 11, padding: "5px 10px", cursor: "pointer" }}>{s}</button>)}</div></Fld>
      <Fld label="Notes"><textarea style={{ ...IS, height: 70, resize: "vertical" }} value={f.notes} onChange={e => setF(p => ({ ...p, notes: e.target.value }))} /></Fld>
      <div style={{ display: "flex", gap: 8 }}><button style={SaveBtn} onClick={() => { onSave(f); onClose(); }}>Save Firm</button><button style={CancelBtn} onClick={onClose}>Cancel</button></div>
    </div>
  );
}

function ContactForm({ initial, sponsors, bankers, onSave, onClose }) {
  const [f, setF] = useState(initial ? { ...initial, recentDeals: initial.recentDeals || [], lazardMappings: initial.lazardMappings || [] } : { name: "", title: "", sponsorId: "", sector: "", email: "", phone: "", linkedin: "", recentDeals: [], lastContacted: "", lazardMappings: ["lb20", "lb24", "lb21", "lb22", "lb23"], notes: "" });
  const [dn, setDn] = useState(""); const [ds, setDs] = useState("Industrials"); const [dy, setDy] = useState("2024");
  const toggleLz = id => setF(p => ({ ...p, lazardMappings: p.lazardMappings.includes(id) ? p.lazardMappings.filter(x => x !== id) : [...p.lazardMappings, id] }));
  const addDeal = () => { if (dn.trim()) { setF(p => ({ ...p, recentDeals: [...p.recentDeals, { name: dn.trim(), sector: ds, year: Number(dy) }] })); setDn(""); } };
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Fld label="Full Name"><input style={IS} value={f.name} onChange={e => setF(p => ({ ...p, name: e.target.value }))} /></Fld>
        <Fld label="Title"><select style={SS} value={f.title} onChange={e => setF(p => ({ ...p, title: e.target.value }))}><option value="">Select...</option>{TITLES.map(t => <option key={t} value={t}>{t}</option>)}</select></Fld>
        <Fld label="PE Firm"><select style={SS} value={f.sponsorId} onChange={e => setF(p => ({ ...p, sponsorId: e.target.value }))}><option value="">Select firm...</option>{sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Fld>
        <Fld label="Sector"><select style={SS} value={f.sector} onChange={e => setF(p => ({ ...p, sector: e.target.value }))}><option value="">Select...</option>{SECTORS.map(s => <option key={s} value={s}>{s}</option>)}</select></Fld>
        <Fld label="Email"><input style={IS} value={f.email} onChange={e => setF(p => ({ ...p, email: e.target.value }))} /></Fld>
        <Fld label="Phone"><input style={IS} value={f.phone} onChange={e => setF(p => ({ ...p, phone: e.target.value }))} /></Fld>
        <Fld label="LinkedIn"><input style={IS} value={f.linkedin} onChange={e => setF(p => ({ ...p, linkedin: e.target.value }))} /></Fld>
        <Fld label="Last Contacted"><input type="date" style={IS} value={f.lastContacted} onChange={e => setF(p => ({ ...p, lastContacted: e.target.value }))} /></Fld>
      </div>
      <Fld label="Deals">
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <input style={{ ...IS, flex: 2 }} value={dn} onChange={e => setDn(e.target.value)} onKeyDown={e => e.key === "Enter" && addDeal()} placeholder="Deal name..." />
          <select style={{ ...SS, flex: 1 }} value={ds} onChange={e => setDs(e.target.value)}>{SECTORS.map(s => <option key={s} value={s}>{s}</option>)}</select>
          <input style={{ ...IS, width: 72 }} value={dy} onChange={e => setDy(e.target.value)} placeholder="Year" />
          <button style={{ ...SaveBtn, padding: "8px 12px" }} onClick={addDeal}>+</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{f.recentDeals.map((d, i) => <span key={i} style={{ background: "#EEF2F7", border: "1px solid #C5D4E6", borderRadius: 2, fontSize: 11, color: "#1a3a5c", padding: "3px 8px", display: "inline-flex", gap: 5 }}>{d.name} · {d.sector} · {d.year} <span style={{ cursor: "pointer", color: "#aaa" }} onClick={() => setF(p => ({ ...p, recentDeals: p.recentDeals.filter((_, j) => j !== i) }))}>×</span></span>)}</div>
      </Fld>
      <Fld label="Map to Lazard Bankers"><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{bankers.map(b => <button key={b.id} onClick={() => toggleLz(b.id)} style={{ background: f.lazardMappings.includes(b.id) ? "#EEF2F7" : "#f5f5f5", border: `1px solid ${f.lazardMappings.includes(b.id) ? "#1a3a5c" : "#e0e0e0"}`, borderRadius: 2, color: f.lazardMappings.includes(b.id) ? "#1a3a5c" : "#aaa", fontFamily: "inherit", fontSize: 11, padding: "5px 10px", cursor: "pointer" }}>{b.name} · {b.sponsorCoverage ? "Sponsor Coverage" : b.sector}</button>)}</div></Fld>
      <Fld label="Notes"><textarea style={{ ...IS, height: 60, resize: "vertical" }} value={f.notes} onChange={e => setF(p => ({ ...p, notes: e.target.value }))} /></Fld>
      <div style={{ display: "flex", gap: 8 }}><button style={SaveBtn} onClick={() => { onSave(f); onClose(); }}>Save Contact</button><button style={CancelBtn} onClick={onClose}>Cancel</button></div>
    </div>
  );
}

function DealForm({ initial, sponsors, portcos, onSave, onClose }) {
  const blank = { name: "", portcoId: "", sellerSponsorId: "", sector: "Industrials", lazardRole: "Sell-Side", status: "Pitching", description: "", buySideFirms: [], notes: "", date: "2025-03-26" };
  const [f, setF] = useState(initial || blank);
  const toggleBuySide = id => setF(p => ({ ...p, buySideFirms: p.buySideFirms.includes(id) ? p.buySideFirms.filter(x => x !== id) : [...p.buySideFirms, id] }));
  const sellerPortcos = portcos.filter(p => !f.sellerSponsorId || p.sponsorId === f.sellerSponsorId);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Fld label="Deal Name"><input style={IS} value={f.name} onChange={e => setF(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Chamberlain Group Sale" /></Fld>
        <Fld label="Sector"><select style={SS} value={f.sector} onChange={e => setF(p => ({ ...p, sector: e.target.value }))}>{SECTORS.map(s => <option key={s} value={s}>{s}</option>)}</select></Fld>
        <Fld label="Sell-Side Firm (Seller)"><select style={SS} value={f.sellerSponsorId} onChange={e => setF(p => ({ ...p, sellerSponsorId: e.target.value, portcoId: "" }))}><option value="">Select firm...</option>{sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Fld>
        <Fld label="Portfolio Company (Asset)"><select style={SS} value={f.portcoId} onChange={e => setF(p => ({ ...p, portcoId: e.target.value }))}><option value="">Select portco...</option>{sellerPortcos.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></Fld>
        <Fld label="Lazard Role"><select style={SS} value={f.lazardRole} onChange={e => setF(p => ({ ...p, lazardRole: e.target.value }))}>{DEAL_ROLES.map(r => <option key={r} value={r}>{r}</option>)}</select></Fld>
        <Fld label="Deal Status"><select style={SS} value={f.status} onChange={e => setF(p => ({ ...p, status: e.target.value }))}>{DEAL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></Fld>
        <Fld label="Date"><input type="date" style={IS} value={f.date} onChange={e => setF(p => ({ ...p, date: e.target.value }))} /></Fld>
      </div>
      <Fld label="Buy-Side Firms Pitched">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {sponsors.filter(s => s.id !== f.sellerSponsorId).map(s => (
            <button key={s.id} onClick={() => toggleBuySide(s.id)} style={{ background: f.buySideFirms.includes(s.id) ? "#EEF2F7" : "#f5f5f5", border: `1px solid ${f.buySideFirms.includes(s.id) ? "#1a3a5c" : "#e0e0e0"}`, borderRadius: 2, color: f.buySideFirms.includes(s.id) ? "#1a3a5c" : "#aaa", fontFamily: "inherit", fontSize: 11, padding: "5px 10px", cursor: "pointer" }}>{s.name}</button>
          ))}
        </div>
      </Fld>
      <Fld label="Deal Description"><textarea style={{ ...IS, height: 70, resize: "vertical" }} value={f.description} onChange={e => setF(p => ({ ...p, description: e.target.value }))} placeholder="Asset description, transaction rationale, size..." /></Fld>
      <Fld label="Lazard Notes"><textarea style={{ ...IS, height: 60, resize: "vertical" }} value={f.notes} onChange={e => setF(p => ({ ...p, notes: e.target.value }))} placeholder="Process notes, competing banks, key next steps..." /></Fld>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button style={SaveBtn} onClick={() => { if (!f.name) { alert("Deal name required."); return; } onSave(f); onClose(); }}>{initial?.id ? "Save Changes" : "Add Deal"}</button>
        <button style={CancelBtn} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function PortcoForm({ initial, sponsorId, contacts, onSave, onClose }) {
  const blank = { name: "", sponsorId: sponsorId || "", sector: "Industrials", description: "", status: "Active", revenue: "", ebitda: "", investmentYear: new Date().getFullYear(), contactId: "", notes: "" };
  const [f, setF] = useState(initial || blank);
  const avail = contacts.filter(c => !f.sponsorId || c.sponsorId === f.sponsorId);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Fld label="Company Name"><input style={IS} value={f.name} onChange={e => setF(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Medline Industries" /></Fld>
        <Fld label="Sector"><select style={SS} value={f.sector} onChange={e => setF(p => ({ ...p, sector: e.target.value }))}>{SECTORS.map(s => <option key={s} value={s}>{s}</option>)}</select></Fld>
        <Fld label="Revenue"><input style={IS} value={f.revenue} onChange={e => setF(p => ({ ...p, revenue: e.target.value }))} placeholder="e.g. $1.2B" /></Fld>
        <Fld label="EBITDA"><input style={IS} value={f.ebitda} onChange={e => setF(p => ({ ...p, ebitda: e.target.value }))} placeholder="e.g. $240M" /></Fld>
        <Fld label="Investment Year"><input type="number" style={IS} value={f.investmentYear} onChange={e => setF(p => ({ ...p, investmentYear: Number(e.target.value) }))} /></Fld>
        <Fld label="Status"><select style={SS} value={f.status} onChange={e => setF(p => ({ ...p, status: e.target.value }))}>{PORTCO_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></Fld>
        <Fld label="PE Contact (Owner)" style={{ gridColumn: "1 / -1" }}><select style={SS} value={f.contactId} onChange={e => setF(p => ({ ...p, contactId: e.target.value }))}><option value="">Select contact...</option>{avail.map(c => <option key={c.id} value={c.id}>{c.name} · {c.title}</option>)}</select></Fld>
      </div>
      <Fld label="Company Description"><textarea style={{ ...IS, height: 80, resize: "vertical" }} value={f.description} onChange={e => setF(p => ({ ...p, description: e.target.value }))} placeholder="Business description, market position, key products/services..." /></Fld>
      <Fld label="Lazard Notes"><textarea style={{ ...IS, height: 60, resize: "vertical" }} value={f.notes} onChange={e => setF(p => ({ ...p, notes: e.target.value }))} placeholder="Relationship context, transaction angle, process notes..." /></Fld>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button style={SaveBtn} onClick={() => { if (!f.name) { alert("Company name required."); return; } onSave(f); onClose(); }}>{initial?.id ? "Save Changes" : "Add Portfolio Company"}</button>
        <button style={CancelBtn} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function ActivityForm({ initial, sponsors, contacts, bankers, portcos, deals, onSave, onClose }) {
  const [f, setF] = useState(initial || { date: "2025-03-26", sponsorId: "", contactId: "", lazardBankerId: "", portcoId: "", dealId: "", dealSide: "", type: "Meeting", description: "", notes: "", outcome: "", nextAction: "", status: "Pending" });
  const avail = contacts.filter(c => !f.sponsorId || c.sponsorId === f.sponsorId);
  const availPortcos = (portcos || []).filter(p => !f.sponsorId || p.sponsorId === f.sponsorId);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Fld label="Date"><input type="date" style={IS} value={f.date} onChange={e => setF(p => ({ ...p, date: e.target.value }))} /></Fld>
        <Fld label="Type"><select style={SS} value={f.type} onChange={e => setF(p => ({ ...p, type: e.target.value }))}>{ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></Fld>
        <Fld label="PE Firm"><select style={SS} value={f.sponsorId} onChange={e => setF(p => ({ ...p, sponsorId: e.target.value, contactId: "", portcoId: "" }))}><option value="">Select firm...</option>{sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Fld>
        <Fld label="Contact"><select style={SS} value={f.contactId} onChange={e => setF(p => ({ ...p, contactId: e.target.value }))}><option value="">Select contact...</option>{avail.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Fld>
        <Fld label="Deal Side"><select style={SS} value={f.dealSide || ""} onChange={e => setF(p => ({ ...p, dealSide: e.target.value }))}><option value="">None</option>{DEAL_ROLES.map(r => <option key={r} value={r}>{r}</option>)}</select></Fld>
        <Fld label="Linked Deal"><select style={SS} value={f.dealId || ""} onChange={e => setF(p => ({ ...p, dealId: e.target.value }))}><option value="">None</option>{(deals||[]).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></Fld>
        <Fld label="Portfolio Company"><select style={SS} value={f.portcoId || ""} onChange={e => setF(p => ({ ...p, portcoId: e.target.value }))}><option value="">None / General</option>{availPortcos.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></Fld>
        <Fld label="Lazard Banker"><select style={SS} value={f.lazardBankerId} onChange={e => setF(p => ({ ...p, lazardBankerId: e.target.value }))}><option value="">Select...</option>{bankers.map(b => <option key={b.id} value={b.id}>{b.name} · {b.sponsorCoverage ? "Sponsor Coverage" : b.sector}</option>)}</select></Fld>
        <Fld label="Status"><select style={SS} value={f.status} onChange={e => setF(p => ({ ...p, status: e.target.value }))}>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></Fld>
      </div>
      <Fld label="Description"><input style={IS} value={f.description} onChange={e => setF(p => ({ ...p, description: e.target.value }))} placeholder="Brief summary..." /></Fld>
      <Fld label="Detailed Notes"><textarea style={{ ...IS, height: 90, resize: "vertical" }} value={f.notes} onChange={e => setF(p => ({ ...p, notes: e.target.value }))} placeholder="Full notes, key discussion points, follow-ups discussed..." /></Fld>
      <Fld label="Outcome"><input style={IS} value={f.outcome} onChange={e => setF(p => ({ ...p, outcome: e.target.value }))} placeholder="Key result..." /></Fld>
      <Fld label="Next Action"><input style={IS} value={f.nextAction} onChange={e => setF(p => ({ ...p, nextAction: e.target.value }))} placeholder="What needs to happen next?" /></Fld>
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button style={SaveBtn} onClick={() => { if (!f.sponsorId) { alert("Please select a firm."); return; } onSave(f); onClose(); }}>{initial?.id ? "Save Changes" : "Log Activity"}</button>
        <button style={CancelBtn} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function BankerEditForm({ initial, onSave, onClose }) {
  const [f, setF] = useState({ ...initial });
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        <Fld label="Full Name"><input style={IS} value={f.name} onChange={e => setF(p=>({...p,name:e.target.value}))} /></Fld>
        <Fld label="Title"><select style={SS} value={f.title} onChange={e => setF(p=>({...p,title:e.target.value}))}>{LZ_TITLES.map(t=><option key={t} value={t}>{t}</option>)}</select></Fld>
        <Fld label="Sector"><select style={SS} value={f.sector} onChange={e => setF(p=>({...p,sector:e.target.value}))}>{["Sponsor Coverage",...SECTORS].map(s=><option key={s} value={s}>{s}</option>)}</select></Fld>
        <Fld label="Email"><input style={IS} value={f.email} onChange={e => setF(p=>({...p,email:e.target.value}))} /></Fld>
        <Fld label="Phone"><input style={IS} value={f.phone} onChange={e => setF(p=>({...p,phone:e.target.value}))} /></Fld>
      </div>
      <div style={{ display:"flex", gap:8, marginTop:8 }}>
        <button style={SaveBtn} onClick={() => onSave(f)}>Save Changes</button>
        <button style={CancelBtn} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const [tab, setTab] = useState("dashboard");
  const [sponsors, setSponsors] = useState(SPONSORS_SEED);
  const [contacts, setContacts] = useState(CONTACTS_SEED);
  const [bankers, setBankers] = useState(LAZARD_BANKERS_SEED);
  const [activities, setActivities] = useState(ACTIVITIES_SEED);
  const [portcos, setPortcos] = useState(PORTCOS_SEED);
  const [portcoModal, setPortcoModal] = useState(null);
  const [addPortcoOpen, setAddPortcoOpen] = useState(false);
  const [editPortcoD, setEditPortcoD] = useState(null);
  const [deals, setDeals] = useState(DEALS_SEED);
  const [dealModal, setDealModal] = useState(null);
  const [addDealOpen, setAddDealOpen] = useState(false);
  const [editDealD, setEditDealD] = useState(null);
  const [search, setSearch] = useState("");
  const [secF, setSecF] = useState("All");
  const [typeF, setTypeF] = useState("All");
  const [tierF, setTierF] = useState("All");
  const [firmF, setFirmF] = useState("All");
  const [firmPage, setFirmPage] = useState(null);
  const [contactPage, setContactPage] = useState(null);
  const [actDetail, setActDetail] = useState(null);
  const [editAct, setEditAct] = useState(null);
  const [addSponsor, setAddSponsor] = useState(false);
  const [editSponsorD, setEditSponsorD] = useState(null);
  const [addContact, setAddContact] = useState(false);
  const [editContactD, setEditContactD] = useState(null);
  const [addActivity, setAddActivity] = useState(false);
  const [addBanker, setAddBanker] = useState(false);
  const [bankerForm, setBankerForm] = useState({ name: "", title: "Managing Director", sector: "Industrials", email: "", phone: "" });
  const [bankerPage, setBankerPage] = useState(null); // banker id
  const [editBankerD, setEditBankerD] = useState(null);
  const [contactModal, setContactModal] = useState(null); // contact id — for firm page popup

  const getSponsor = id => sponsors.find(s => s.id === id);
  const getContact = id => contacts.find(c => c.id === id);
  const getBanker = id => bankers.find(b => b.id === id);
  const spActs = id => activities.filter(a => a.sponsorId === id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const ctActs = id => activities.filter(a => a.contactId === id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const spCts = id => contacts.filter(c => c.sponsorId === id);
  const ltSp = id => { const a = spActs(id); return a.length ? a[0].date : null; };
  const ltCt = id => { const a = ctActs(id); return a.length ? a[0].date : null; };

  const stats = useMemo(() => {
    const now = new Date("2025-03-26");
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const mtgsThisMonth = activities.filter(a => a.type === "Meeting" && new Date(a.date) >= monthStart).length;
    const pitchesInFlight = activities.filter(a => a.type === "Pitch" && a.status === "Pending").length;
    const overdueNextActions = activities.filter(a => {
      if (!a.nextAction || a.status === "Complete" || a.status === "Won" || a.status === "Lost") return false;
      return daysSince(a.date) >= 7;
    }).length;
    const t1Cold = sponsors.filter(s => {
      if (s.tier !== 1) return false;
      const lt = ltSp(s.id);
      return !lt || daysSince(lt) > 60;
    }).length;
    const exploringExit = portcos.filter(p => p.status === "Exploring Exit").length;
    return { mtgsThisMonth, pitchesInFlight, overdueNextActions, t1Cold, exploringExit };
  }, [sponsors, contacts, activities, portcos]);

  function saveSponsor(d) { if (d.id) setSponsors(p => p.map(s => s.id === d.id ? d : s)); else setSponsors(p => [...p, { ...d, id: "sp" + uid() }]); }
  function saveContact(d) { if (d.id) setContacts(p => p.map(c => c.id === d.id ? d : c)); else setContacts(p => [...p, { ...d, id: "c" + uid() }]); }
  function saveActivity(d) { if (d.id) setActivities(p => p.map(a => a.id === d.id ? d : a)); else setActivities(p => [...p, { ...d, id: "a" + uid() }]); }
  function delActivity(id) { setActivities(p => p.filter(a => a.id !== id)); setActDetail(null); }
  function delSponsor(id) { setSponsors(p => p.filter(s => s.id !== id)); setContacts(p => p.filter(c => c.sponsorId !== id)); setFirmPage(null); }
  function delContact(id) { setContacts(p => p.filter(c => c.id !== id)); setContactPage(null); }
  function saveBanker(d) { if (d.id) setBankers(p => p.map(b => b.id === d.id ? d : b)); else setBankers(p => [...p, { ...d, id: "lb" + uid() }]); }
  function delBanker(id) { setBankers(p => p.filter(b => b.id !== id)); setBankerPage(null); }
  const spPortcos = id => portcos.filter(p => p.sponsorId === id);
  const getPortco = id => portcos.find(p => p.id === id);
  const portcoActs = id => activities.filter(a => a.portcoId === id).sort((a, b) => new Date(b.date) - new Date(a.date));
  function savePortco(d) { if (d.id) setPortcos(p => p.map(x => x.id === d.id ? d : x)); else setPortcos(p => [...p, { ...d, id: "pc" + uid() }]); }
  function delPortco(id) { setPortcos(p => p.filter(x => x.id !== id)); setPortcoModal(null); }
  const getDeal = id => deals.find(d => d.id === id);
  const dealActs = id => activities.filter(a => a.dealId === id).sort((a, b) => new Date(b.date) - new Date(a.date));
  function saveDeal(d) { if (d.id) setDeals(p => p.map(x => x.id === d.id ? d : x)); else setDeals(p => [...p, { ...d, id: "d" + uid() }]); }
  function delDeal(id) { setDeals(p => p.filter(x => x.id !== id)); setDealModal(null); }

  const fSponsors = sponsors.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) && (tierF === "All" || s.tier === Number(tierF)) && (secF === "All" || s.sectors.includes(secF)));
  const fContacts = contacts.filter(c => { const sp = getSponsor(c.sponsorId); return (c.name.toLowerCase().includes(search.toLowerCase()) || (sp && sp.name.toLowerCase().includes(search.toLowerCase()))) && (secF === "All" || c.sector === secF); });
  const fActivities = [...activities].filter(a => { const sp = getSponsor(a.sponsorId); const ct = getContact(a.contactId); return ((sp && sp.name.toLowerCase().includes(search.toLowerCase())) || (ct && ct.name.toLowerCase().includes(search.toLowerCase())) || a.description.toLowerCase().includes(search.toLowerCase())) && (typeF === "All" || a.type === typeF); }).sort((a, b) => new Date(b.date) - new Date(a.date));

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#F5F5F3;font-family:'Inter',sans-serif;font-size:13px;color:#1a1a1a}
    ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:#f0f0f0}::-webkit-scrollbar-thumb{background:#ccc;border-radius:2px}
    .crm{min-height:100vh;background:#F5F5F3}
    .hdr{background:#fff;border-bottom:2px solid #1a3a5c;padding:0 32px;display:flex;align-items:center;justify-content:space-between;height:56px;position:sticky;top:0;z-index:50;box-shadow:0 2px 8px rgba(26,58,92,0.07)}
    .logo{display:flex;align-items:center;gap:12px}
    .lmark{width:32px;height:32px;background:#1a3a5c;display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Cormorant Garamond',Georgia,serif;font-size:19px;font-weight:600}
    .ltxt{font-family:'Cormorant Garamond',Georgia,serif;font-size:18px;color:#1a3a5c;font-weight:600;letter-spacing:0.04em}
    .lsub{font-size:9px;color:#aaa;letter-spacing:0.16em;text-transform:uppercase;margin-top:1px}
    .nav{display:flex}
    .nb{background:none;border:none;border-bottom:2px solid transparent;color:#aaa;font-family:'Inter',sans-serif;font-size:10px;letter-spacing:0.08em;text-transform:uppercase;padding:0 14px;height:56px;cursor:pointer;transition:all .15s;font-weight:500}
    .nb:hover{color:#1a3a5c}.nb.on{color:#1a3a5c;border-bottom-color:#1a3a5c;font-weight:600}
    .main{padding:28px 32px;max-width:1480px}
    .pghdr{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:22px}
    .pgtit{font-family:'Cormorant Garamond',Georgia,serif;font-size:26px;color:#1a3a5c;font-weight:600;line-height:1.1}
    .pgsub{font-size:10px;color:#bbb;letter-spacing:0.12em;text-transform:uppercase;margin-top:3px}
    .stats{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:26px}
    .stat{background:#fff;border:1px solid #eee;border-top:3px solid #1a3a5c;border-radius:3px;padding:16px 18px;box-shadow:0 1px 4px rgba(0,0,0,0.03)}
    .sv{font-family:'Cormorant Garamond',Georgia,serif;font-size:30px;color:#1a3a5c;font-weight:600;line-height:1}
    .sl{font-size:9px;color:#bbb;letter-spacing:0.14em;text-transform:uppercase;margin-top:4px;font-weight:600}
    .tb{display:flex;gap:8px;margin-bottom:16px;align-items:center;flex-wrap:wrap}
    .si{background:#fff;border:1px solid #e0e0e0;border-radius:3px;color:#1a1a1a;font-family:'Inter',sans-serif;font-size:12px;padding:7px 12px;width:220px;outline:none}
    .si:focus{border-color:#1a3a5c}
    .si::placeholder{color:#ccc}
    .fb{background:#fff;border:1px solid #e0e0e0;border-radius:3px;color:#aaa;font-family:'Inter',sans-serif;font-size:10px;padding:7px 12px;cursor:pointer;font-weight:500;transition:all .15s}
    .fb:hover,.fb.on{border-color:#1a3a5c;color:#1a3a5c;background:#EEF2F7}
    .abtn{background:#1a3a5c;border:none;border-radius:3px;color:#fff;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;padding:8px 16px;cursor:pointer;letter-spacing:0.02em}
    .abtn:hover{background:#15304d}
    .tbl{width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-radius:3px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.03)}
    .tbl th{text-align:left;font-size:9px;color:#bbb;letter-spacing:0.14em;text-transform:uppercase;padding:10px 14px;border-bottom:1px solid #f0f0f0;background:#fafafa;font-weight:700}
    .tbl td{padding:12px 14px;border-bottom:1px solid #f5f5f5;vertical-align:middle}
    .tbl tr:last-child td{border-bottom:none}
    .tbl tr:hover td{background:#fafafa;cursor:pointer}
    .sn{font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;color:#1a3a5c;font-weight:600}
    .twocol{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .panel{background:#fff;border:1px solid #eee;border-radius:3px;padding:20px;box-shadow:0 1px 4px rgba(0,0,0,0.03)}
    .ptit{font-size:9px;color:#bbb;letter-spacing:0.16em;text-transform:uppercase;margin-bottom:14px;border-bottom:1px solid #f0f0f0;padding-bottom:8px;font-weight:700}
    .arow{display:flex;gap:12px;padding:11px 0;border-bottom:1px solid #f5f5f5;align-items:flex-start;cursor:pointer;transition:background .1s}
    .arow:hover{background:#fafafa;margin:0 -4px;padding-left:4px;padding-right:4px;border-radius:2px}
    .arow:last-child{border-bottom:none}
    .at{font-size:12px;color:#1a1a1a;margin-bottom:2px;font-weight:500}
    .am{font-size:11px;color:#aaa}
    .empty{color:#ccc;font-size:12px;padding:20px 0;text-align:center}
    .fp{background:#fff;border:1px solid #eee;border-radius:3px;padding:28px;box-shadow:0 1px 4px rgba(0,0,0,0.03)}
    .backbtn{background:none;border:none;color:#1a3a5c;font-family:'Inter',sans-serif;font-size:12px;cursor:pointer;padding:0;display:flex;align-items:center;gap:5px;margin-bottom:20px;font-weight:500}
    .backbtn:hover{text-decoration:underline}
    .igrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}
    .ic{background:#fafafa;border:1px solid #f0f0f0;border-radius:3px;padding:12px}
    .il{font-size:9px;color:#bbb;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:3px;font-weight:700}
    .iv{font-size:13px;color:#1a1a1a;font-weight:500}
    .cc{background:#fafafa;border:1px solid #eee;border-radius:3px;padding:14px;cursor:pointer;transition:border-color .15s}
    .cc:hover{border-color:#1a3a5c}
    .mpill{background:#EEF2F7;border:1px solid #C5D4E6;border-radius:2px;padding:3px 9px;font-size:10px;color:#1a3a5c;display:inline-flex;align-items:center;gap:3px;font-weight:500;margin-right:3px}
    .divider{height:1px;background:#f0f0f0;margin:18px 0}
    @media(max-width:767px){
      .hdr{padding:0 16px;height:52px}
      .lsub{display:none}
      .nav{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
      .nav::-webkit-scrollbar{display:none}
      .nb{padding:0 10px;font-size:9px;height:52px;white-space:nowrap}
      .main{padding:16px}
      .pghdr{flex-direction:column;gap:10px;margin-bottom:16px}
      .pgtit{font-size:20px}
      .stats{grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:16px}
      .stat{padding:12px 14px}
      .sv{font-size:24px}
      .twocol{grid-template-columns:1fr;gap:12px}
      .tbl{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}
      .fp{padding:16px}
      .igrid{grid-template-columns:repeat(2,1fr)}
      .tb{gap:6px}
      .si{width:100%}
    }
  `;

  // ─── FIRM PAGE ──────────────────────────────────────────────────────────
  const sponsor = getSponsor(firmPage);
  const contact = getContact(contactPage);

  function FirmPage() {
    if (!sponsor) return null;
    const cts = spCts(sponsor.id);
    const acts = spActs(sponsor.id);
    const lt = ltSp(sponsor.id);
    return (
      <div className="fp">
        <button className="backbtn" onClick={() => setFirmPage(null)}>← Back to Firms</button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? 12 : 0 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ width: 46, height: 46, background: "#1a3a5c", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 700, borderRadius: 3, flexShrink: 0 }}>{sponsor.name[0]}</div>
            <div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 22 : 28, color: "#1a3a5c", fontWeight: 700 }}>{sponsor.name}</div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{sponsor.hq}{!isMobile && ` · ${sponsor.website}`}</div>
              <div style={{ marginTop: 5 }}>{sponsor.sectors.slice(0, isMobile ? 2 : 99).map(s => <SectorTag key={s} sector={s} />)}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button className="abtn" onClick={() => setAddActivity(true)}>+ Log Activity</button>
            {!isMobile && <><button style={CancelBtn} onClick={() => setEditSponsorD(sponsor)}>Edit</button><button style={DangerBtn} onClick={() => delSponsor(sponsor.id)}>Delete</button></>}
          </div>
        </div>
        {lt && daysSince(lt) > 45 && <div style={{ background: "#FDF0EE", border: "1px solid #f0c0b8", borderRadius: 3, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#7a1a1a" }}>⚠ Coverage stale — last touchpoint {daysSince(lt)} days ago</div>}
        <div className="igrid">
          <div className="ic"><div className="il">AUM</div><div className="iv">{sponsor.aum}</div></div>
          <div className="ic"><div className="il">Deals YTD</div><div className="iv" style={{ color: "#1a3a5c", fontFamily: "Cormorant Garamond, serif", fontSize: 18 }}>{sponsor.dealsYTD}</div></div>
          <div className="ic"><div className="il">Tier</div><div className="iv" style={{ color: TIER_COLOR[sponsor.tier] }}>Tier {sponsor.tier}</div></div>
          <div className="ic"><div className="il">Last Touch</div><div className="iv">{lt ? <StallBadge date={lt} /> : <span style={{ color: "#ccc", fontSize: 12 }}>None</span>}</div></div>
        </div>
        {sponsor.notes && <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 3, padding: 14, marginBottom: 20, fontSize: 12, color: "#666", lineHeight: 1.65 }}>{sponsor.notes}</div>}
        <div className="divider" />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div className="ptit" style={{ marginBottom: 0 }}>Contacts ({cts.length})</div>
          <button className="abtn" style={{ fontSize: 10, padding: "5px 12px" }} onClick={() => setAddContact(true)}>+ Add</button>
        </div>
        {cts.length === 0 ? <div className="empty">No contacts yet.</div> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
            {cts.map(c => {
              const lt2 = ltCt(c.id);
              const mapped = (c.lazardMappings || []).map(id => getBanker(id)).filter(Boolean);
              const recentActs = ctActs(c.id).slice(0, 5);
              return (
                <div key={c.id} style={{ background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 3, overflow: "hidden" }}>
                  {/* Contact header — opens modal */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", cursor: "pointer", background: "#fff", borderBottom: recentActs.length > 0 ? "1px solid #f0f0f0" : "none" }}
                    onClick={() => setContactModal(c.id)}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <Avatar name={c.name} size={36} />
                      <div>
                        <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 15, color: "#1a3a5c", fontWeight: 700 }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: "#aaa", marginTop: 1 }}>{c.title}</div>
                        <div style={{ marginTop: 4, display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                          <SectorTag sector={c.sector} />
                          {mapped.length > 0 ? mapped.map(b => <span key={b.id} className="mpill" style={{ fontSize: 10, cursor: "pointer" }} onClick={e => { e.stopPropagation(); setTab("team"); setBankerPage(b.id); }}>{b.name.split(" ")[0]}</span>) : <span style={{ color: "#ddd", fontSize: 10 }}>Unmapped</span>}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      {lt2 ? <StallBadge date={lt2} /> : <span style={{ color: "#ddd", fontSize: 10 }}>Never contacted</span>}
                      <span style={{ color: "#ccc", fontSize: 12 }}>→</span>
                    </div>
                  </div>
                  {/* Last 5 interactions */}
                  {recentActs.length > 0 && (
                    <div style={{ padding: "0 16px" }}>
                      {recentActs.map((a, idx) => {
                        const bk = getBanker(a.lazardBankerId);
                        return (
                          <div key={a.id} className="arow" style={{ paddingLeft: 0, paddingRight: 0 }}
                            onClick={() => setActDetail(a)}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 11, fontWeight: 500, color: "#1a1a1a" }}>{a.type} — {a.date}</div>
                              <div style={{ fontSize: 11, color: "#aaa" }}>{a.description}</div>
                              {bk && <div style={{ fontSize: 10, color: "#bbb", marginTop: 1 }}>Lazard: {bk.name}</div>}
                            </div>
                            <StatusBadge status={a.status} />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {recentActs.length === 0 && (
                    <div style={{ padding: "10px 16px", fontSize: 11, color: "#ccc" }}>No interactions logged yet</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className="divider" />
        {/* PORTFOLIO COMPANIES */}
        {(() => {
          const pcs = spPortcos(sponsor.id);
          return (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div className="ptit" style={{ marginBottom: 0 }}>Portfolio Companies ({pcs.length})</div>
                <button className="abtn" style={{ fontSize: 10, padding: "5px 12px" }} onClick={() => setAddPortcoOpen(true)}>+ Add</button>
              </div>
              {pcs.length === 0 ? <div className="empty" style={{ marginBottom: 16 }}>No portfolio companies added yet.</div> : (
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(260px,1fr))", gap: 10, marginBottom: 22 }}>
                  {pcs.map(pc => {
                    const pStatus = PORTCO_STATUS_STYLE[pc.status] || { bg: "#f0f0f0", text: "#888" };
                    const pcActs = portcoActs(pc.id);
                    const owner = getContact(pc.contactId);
                    const linkedDeal = deals.find(d => d.portcoId === pc.id);
                    return (
                      <div key={pc.id} onClick={() => setPortcoModal(pc.id)} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 3, padding: 14, cursor: "pointer", transition: "border-color .15s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "#1a3a5c"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e8e8"}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 14, color: "#1a3a5c", fontWeight: 700 }}>{pc.name}</div>
                          <span style={{ background: pStatus.bg, color: pStatus.text, borderRadius: 2, fontSize: 9, padding: "2px 7px", fontWeight: 600, whiteSpace: "nowrap", marginLeft: 6 }}>{pc.status}</span>
                        </div>
                        <SectorTag sector={pc.sector} />
                        <div style={{ fontSize: 11, color: "#aaa", marginTop: 6, lineHeight: 1.5 }}>{pc.description?.slice(0, 80)}{pc.description?.length > 80 ? "…" : ""}</div>
                        <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
                          {pc.revenue && <div><div style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em" }}>Revenue</div><div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>{pc.revenue}</div></div>}
                          {pc.ebitda && <div><div style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em" }}>EBITDA</div><div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>{pc.ebitda}</div></div>}
                          <div><div style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em" }}>Since</div><div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>{pc.investmentYear}</div></div>
                        </div>
                        {owner && <div style={{ marginTop: 8, fontSize: 10, color: "#aaa" }}>Owner: <span style={{ color: "#1a3a5c", fontWeight: 500 }}>{owner.name}</span></div>}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                          {pcActs.length > 0 && <div style={{ fontSize: 10, color: "#aaa" }}>{pcActs.length} interaction{pcActs.length !== 1 ? "s" : ""} logged</div>}
                          {linkedDeal && (
                            <span onClick={e => { e.stopPropagation(); setDealModal(linkedDeal.id); }}
                              style={{ fontSize: 10, color: "#1a3a5c", fontWeight: 600, textDecoration: "underline", textDecorationColor: "#C5D4E6", cursor: "pointer" }}>
                              {linkedDeal.lazardRole} Deal →
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          );
        })()}
        <div className="divider" />
        <div className="ptit">Activity ({acts.length})</div>
        {acts.length === 0 ? <div className="empty">No activities logged.</div> : acts.map(a => {
          const ct = getContact(a.contactId); const bk = getBanker(a.lazardBankerId); const pc = getPortco(a.portcoId);
          return (
            <div key={a.id} className="arow" onClick={() => setActDetail(a)}>
              <div style={{ flex: 1 }}>
                <div className="at">{a.type} — {a.date}{ct && <span style={{ color: "#aaa", fontWeight: 400 }}> with {ct.name}</span>}{pc && <span style={{ color: "#7a4a1a", fontWeight: 500 }}> · {pc.name}</span>}</div>
                <div className="am">{a.description}</div>
                {bk && <div style={{ fontSize: 10, color: "#bbb", marginTop: 2 }}>Lazard: {bk.name}</div>}
                {a.nextAction && <div style={{ fontSize: 11, color: "#1a3a5c", marginTop: 4, fontWeight: 500 }}>→ {a.nextAction}</div>}
              </div>
              <StatusBadge status={a.status} />
            </div>
          );
        })}
      </div>
    );
  }

  // ─── CONTACT PAGE ────────────────────────────────────────────────────────
  function ContactPage() {
    if (!contact) return null;
    const sp = getSponsor(contact.sponsorId);
    const acts = ctActs(contact.id);
    const mapped = (contact.lazardMappings || []).map(id => getBanker(id)).filter(Boolean);
    return (
      <div className="fp">
        <button className="backbtn" onClick={() => setContactPage(null)}>← Back</button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? 12 : 0 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Avatar name={contact.name} size={isMobile ? 40 : 52} />
            <div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: isMobile ? 20 : 26, color: "#1a3a5c", fontWeight: 700 }}>{contact.name}</div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{contact.title} · {sp?.name}</div>
              <div style={{ marginTop: 5 }}><SectorTag sector={contact.sector} /></div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button className="abtn" onClick={() => setAddActivity(true)}>+ Log Activity</button>
            {!isMobile && <><button style={CancelBtn} onClick={() => setEditContactD(contact)}>Edit</button><button style={DangerBtn} onClick={() => delContact(contact.id)}>Delete</button></>}
          </div>
        </div>
        <div className="igrid">
          <div className="ic"><div className="il">Email</div><div className="iv" style={{ fontSize: 11, color: "#1a3a5c" }}>{contact.email}</div></div>
          <div className="ic"><div className="il">Phone</div><div className="iv" style={{ fontSize: 11 }}>{contact.phone}</div></div>
          <div className="ic"><div className="il">LinkedIn</div><div className="iv" style={{ fontSize: 11, color: "#1a3a5c" }}>{contact.linkedin}</div></div>
          <div className="ic"><div className="il">Last Contacted</div><div>{contact.lastContacted ? <StallBadge date={contact.lastContacted} /> : <span style={{ color: "#ccc", fontSize: 11 }}>Never</span>}</div></div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div className="ptit">Lazard Coverage</div>
          {mapped.length === 0 ? <div className="empty">No Lazard bankers mapped.</div> : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {mapped.map(b => (
                <div key={b.id} onClick={() => { setTab("team"); setBankerPage(b.id); setContactPage(null); }}
                  style={{ display: "flex", alignItems: "center", gap: 12, background: "#EEF2F7", border: "1px solid #C5D4E6", borderRadius: 3, padding: "12px 16px", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#dce8f5"}
                  onMouseLeave={e => e.currentTarget.style.background = "#EEF2F7"}>
                  <Avatar name={b.name} size={32} />
                  <div>
                    <div style={{ fontSize: 13, color: "#1a3a5c", fontWeight: 700 }}>{b.name}</div>
                    <div style={{ fontSize: 10, color: "#7a9bb5", marginTop: 2 }}>{b.title} · {b.sponsorCoverage ? "Sponsor Coverage" : `Lazard ${b.sector}`}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {contact.recentDeals?.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="ptit">Deal History</div>
            <table className="tbl">
              <thead><tr><th>Deal</th><th>Sector</th><th>Year</th></tr></thead>
              <tbody>{contact.recentDeals.map((d, i) => <tr key={i}><td style={{ fontWeight: 500 }}>{d.name}</td><td><SectorTag sector={d.sector} /></td><td style={{ color: "#aaa" }}>{d.year}</td></tr>)}</tbody>
            </table>
          </div>
        )}
        {contact.notes && <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 3, padding: 14, marginBottom: 20, fontSize: 12, color: "#666", lineHeight: 1.65 }}>{contact.notes}</div>}
        <div className="ptit">Activity ({acts.length})</div>
        {acts.length === 0 ? <div className="empty">No activities logged.</div> : acts.map(a => (
          <div key={a.id} className="arow" onClick={() => setActDetail(a)}>
            <div style={{ flex: 1 }}><div className="at">{a.type} — {a.date}</div><div className="am">{a.description}</div>{a.nextAction && <div style={{ fontSize: 11, color: "#1a3a5c", marginTop: 4, fontWeight: 500 }}>→ {a.nextAction}</div>}</div>
            <StatusBadge status={a.status} />
          </div>
        ))}
      </div>
    );
  }

  // ─── COVERAGE MAP ────────────────────────────────────────────────────────
  function CoverageMap() {
    const [sf, setSf] = useState("All");
    const vis = sponsors.filter(s => sf === "All" || s.sectors.includes(sf));
    return (
      <>
        <div className="pghdr"><div><div className="pgtit">Coverage Map</div><div className="pgsub">PE Firm → Contacts → Lazard Banker</div></div></div>
        <div className="tb">{["All",...SECTORS].map(s => <button key={s} className={`fb ${sf===s?"on":""}`} onClick={() => setSf(s)} style={{ fontSize: 10 }}>{s}</button>)}</div>
        {vis.map(sp => {
          const cts = spCts(sp.id).filter(c => sf === "All" || c.sector === sf);
          if (cts.length === 0) return null;
          const lt = ltSp(sp.id);
          return (
            <div key={sp.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 3, marginBottom: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: "#fafafa", borderBottom: "1px solid #f0f0f0", cursor: "pointer" }} onClick={() => { setTab("sponsors"); setFirmPage(sp.id); }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, background: "#1a3a5c", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 700, borderRadius: 2 }}>{sp.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 17, color: "#1a3a5c", fontWeight: 700 }}>{sp.name}</div>
                    <div style={{ fontSize: 10, color: "#aaa" }}>{sp.aum} AUM · {sp.dealsYTD} deals YTD · Tier {sp.tier}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>{lt ? <StallBadge date={lt} /> : <span style={{ color: "#ddd", fontSize: 11 }}>Never touched</span>}<span style={{ color: "#ddd" }}>→</span></div>
              </div>
              <div style={{ padding: "12px 20px" }}>
                {cts.map(c => {
                  const mapped = (c.lazardMappings || []).map(id => getBanker(id)).filter(Boolean);
                  const lt2 = ltCt(c.id);
                  return (
                    <div key={c.id} style={{ display: "grid", gridTemplateColumns: "1fr 28px 1fr", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setContactPage(c.id)}>
                        <Avatar name={c.name} size={32} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{c.name}</div>
                          <div style={{ fontSize: 10, color: "#aaa" }}>{c.title}</div>
                          <div style={{ marginTop: 3, display: "flex", gap: 4, flexWrap: "wrap" }}><SectorTag sector={c.sector} />{lt2 && <StallBadge date={lt2} />}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "center", color: "#ddd" }}>⟷</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {mapped.length === 0 ? <span style={{ color: "#ccc", fontSize: 11 }}>No banker mapped</span> : mapped.map(b => <div key={b.id} className="mpill">{b.name}<span style={{ color: "#7a9bb5", fontWeight: 400 }}> · {b.sponsorCoverage ? "Sponsor Coverage" : b.sector}</span></div>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  // ─── ACTIVITY DETAIL ─────────────────────────────────────────────────────
  function ActDetail() {
    const a = actDetail;
    const sp = getSponsor(a.sponsorId); const ct = getContact(a.contactId); const bk = getBanker(a.lazardBankerId); const pc = getPortco(a.portcoId); const dl = getDeal(a.dealId);
    const linkStyle = { color: "#1a3a5c", fontWeight: 600, cursor: "pointer", textDecoration: "underline", textDecorationColor: "#C5D4E6", fontSize: 13 };
    const goToFirm = () => { setActDetail(null); setTab("sponsors"); setFirmPage(sp.id); };
    const goToContact = () => { setActDetail(null); setContactPage(ct.id); };
    const goToBanker = () => { setActDetail(null); setTab("team"); setBankerPage(bk.id); };
    const goToPortco = () => { setActDetail(null); setPortcoModal(pc.id); };
    const goToDeal = () => { setActDetail(null); setDealModal(dl.id); };
    return (
      <Modal title={`${a.type} — ${a.date}`} onClose={() => setActDetail(null)} width={580}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div className="ic"><div className="il">Firm</div><div className="iv">{sp ? <span style={linkStyle} onClick={goToFirm}>{sp.name}</span> : "—"}</div></div>
          <div className="ic"><div className="il">Contact</div><div className="iv">{ct ? <span style={linkStyle} onClick={goToContact}>{ct.name}</span> : "—"}</div></div>
          <div className="ic"><div className="il">Lazard Banker</div><div className="iv">{bk ? <span style={linkStyle} onClick={goToBanker}>{bk.name}</span> : "—"}</div></div>
          <div className="ic"><div className="il">Status</div><div><StatusBadge status={a.status} /></div></div>
          {pc && <div className="ic"><div className="il">Portfolio Company</div><div className="iv"><span style={linkStyle} onClick={goToPortco}>{pc.name}</span></div></div>}
          {dl && <div className="ic"><div className="il">Deal</div><div className="iv"><span style={linkStyle} onClick={goToDeal}>{dl.name}</span></div></div>}
          {a.dealSide && <div className="ic"><div className="il">Deal Side</div><div><span style={{ background: a.dealSide === "Sell-Side" ? "#EEF2F7" : "#EEF7F2", color: a.dealSide === "Sell-Side" ? "#1a3a5c" : "#1d5c3a", borderRadius: 2, fontSize: 10, padding: "3px 9px", fontWeight: 600 }}>{a.dealSide}</span></div></div>}
        </div>
        <div className="ic" style={{ marginBottom: 10 }}><div className="il">Description</div><div className="iv" style={{ fontSize: 12, marginTop: 3 }}>{a.description}</div></div>
        {a.notes && <div className="ic" style={{ marginBottom: 10, background: "#fafafa" }}><div className="il">Notes</div><div style={{ fontSize: 12, color: "#444", lineHeight: 1.7, marginTop: 4 }}>{a.notes}</div></div>}
        {a.outcome && <div className="ic" style={{ marginBottom: 10 }}><div className="il">Outcome</div><div className="iv" style={{ fontSize: 12, marginTop: 3 }}>{a.outcome}</div></div>}
        {a.nextAction && <div style={{ background: "#EEF2F7", border: "1px solid #C5D4E6", borderRadius: 3, padding: "10px 14px", marginBottom: 16 }}><div style={{ fontSize: 9, color: "#7a9bb5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3, fontWeight: 700 }}>Next Action</div><div style={{ fontSize: 12, color: "#1a3a5c", fontWeight: 600 }}>→ {a.nextAction}</div></div>}
        <div style={{ display: "flex", gap: 8 }}>
          <button style={SaveBtn} onClick={() => { setActDetail(null); setEditAct(a); }}>Edit</button>
          <button style={DangerBtn} onClick={() => delActivity(a.id)}>Delete</button>
          <button style={CancelBtn} onClick={() => setActDetail(null)}>Close</button>
        </div>
      </Modal>
    );
  }

  // ─── CONTACT MODAL (from firm page) ──────────────────────────────────────
  function ContactModal() {
    const c = getContact(contactModal);
    if (!c) return null;
    const sp = getSponsor(c.sponsorId);
    const mapped = (c.lazardMappings || []).map(id => getBanker(id)).filter(Boolean);
    const recentActs = ctActs(c.id).slice(0, 5);
    return (
      <Modal title={c.name} onClose={() => setContactModal(null)} width={620}>
        {/* Header */}
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
          <Avatar name={c.name} size={48} />
          <div>
            <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, color: "#1a3a5c", fontWeight: 700 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>{c.title} · {sp?.name}</div>
            <div style={{ marginTop: 5 }}><SectorTag sector={c.sector} /></div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            {c.lastContacted ? <StallBadge date={c.lastContacted} /> : <span style={{ color: "#ddd", fontSize: 11 }}>Never contacted</span>}
          </div>
        </div>

        {/* Contact info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <div className="ic"><div className="il">Email</div><div className="iv" style={{ fontSize: 11, color: "#1a3a5c" }}>{c.email || "—"}</div></div>
          <div className="ic"><div className="il">Phone</div><div className="iv" style={{ fontSize: 11 }}>{c.phone || "—"}</div></div>
          {c.linkedin && <div className="ic" style={{ gridColumn: "1 / -1" }}><div className="il">LinkedIn</div><div className="iv" style={{ fontSize: 11, color: "#1a3a5c" }}>{c.linkedin}</div></div>}
        </div>

        {/* Lazard coverage */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 9, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>Lazard Coverage</div>
          {mapped.length === 0
            ? <div style={{ color: "#ccc", fontSize: 12 }}>No Lazard bankers mapped</div>
            : <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {mapped.map(b => (
                  <div key={b.id} onClick={() => { setContactModal(null); setTab("team"); setBankerPage(b.id); }}
                    style={{ display: "flex", alignItems: "center", gap: 10, background: "#EEF2F7", border: "1px solid #C5D4E6", borderRadius: 3, padding: "9px 14px", cursor: "pointer", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#dce8f5"}
                    onMouseLeave={e => e.currentTarget.style.background = "#EEF2F7"}>
                    <Avatar name={b.name} size={28} />
                    <div>
                      <div style={{ fontSize: 12, color: "#1a3a5c", fontWeight: 700 }}>{b.name}</div>
                      <div style={{ fontSize: 10, color: "#7a9bb5", marginTop: 1 }}>{b.title} · {b.sponsorCoverage ? "Sponsor Coverage" : b.sector}</div>
                    </div>
                  </div>
                ))}
              </div>
          }
        </div>

        {/* Notes */}
        {c.notes && (
          <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 3, padding: 12, marginBottom: 18, fontSize: 12, color: "#666", lineHeight: 1.65 }}>
            {c.notes}
          </div>
        )}

        {/* Recent meetings */}
        <div>
          <div style={{ fontSize: 9, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
            Recent Interactions ({recentActs.length})
          </div>
          {recentActs.length === 0
            ? <div style={{ color: "#ccc", fontSize: 12 }}>No interactions logged yet</div>
            : recentActs.map(a => {
                const bk = getBanker(a.lazardBankerId);
                return (
                  <div key={a.id} className="arow" onClick={() => { setContactModal(null); setActDetail(a); }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "#1a1a1a" }}>{a.type} — {a.date}</div>
                      <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>{a.description}</div>
                      {bk && <div style={{ fontSize: 10, color: "#bbb", marginTop: 1 }}>Lazard: {bk.name}</div>}
                      {a.nextAction && <div style={{ fontSize: 11, color: "#1a3a5c", marginTop: 3, fontWeight: 500 }}>→ {a.nextAction}</div>}
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                );
              })
          }
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, paddingTop: 16, borderTop: "1px solid #f0f0f0" }}>
          <button style={SaveBtn} onClick={() => { setContactModal(null); setAddActivity(true); }}>+ Log Activity</button>
          <button style={CancelBtn} onClick={() => { setContactModal(null); setContactPage(c.id); }}>Full Profile →</button>
          <button style={CancelBtn} onClick={() => setContactModal(null)}>Close</button>
        </div>
      </Modal>
    );
  }

  // ─── DASHBOARD COMPONENT ─────────────────────────────────────────────────
  function Dashboard() {
    const [activePanel, setActivePanel] = useState(null);
    const togglePanel = key => setActivePanel(p => p === key ? null : key);
    const statStyle = key => ({
      cursor: "pointer", transition: "all .15s",
      borderTop: `3px solid ${activePanel === key ? "#1a3a5c" : "#eee"}`,
      background: activePanel === key ? "#EEF2F7" : "#fff",
    });
    const mtgsMonth = [...activities].filter(a => {
      const monthStart = new Date("2025-03-01");
      return a.type === "Meeting" && new Date(a.date) >= monthStart;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
    const pitchesInFlight = activities.filter(a => a.type === "Pitch" && a.status === "Pending").sort((a, b) => new Date(b.date) - new Date(a.date));
    const overdueList = activities.filter(a => {
      if (!a.nextAction || a.status === "Complete" || a.status === "Won" || a.status === "Lost") return false;
      return daysSince(a.date) >= 7;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    const t1ColdList = sponsors.filter(s => {
      if (s.tier !== 1) return false;
      const lt = ltSp(s.id);
      return !lt || daysSince(lt) > 60;
    }).sort((a, b) => { const la = ltSp(a.id)||"2020-01-01"; const lb = ltSp(b.id)||"2020-01-01"; return new Date(la)-new Date(lb); });
    const exitingPortcos = portcos.filter(p => p.status === "Exploring Exit");

    const panelRow = (key, content) => activePanel === key ? (
      <div style={{ background: "#fff", border: "2px solid #1a3a5c", borderRadius: 3, padding: "20px 24px", marginBottom: 16, boxShadow: "0 4px 16px rgba(26,58,92,0.08)" }}>
        {content}
      </div>
    ) : null;

    return (
      <>
        <div className="pghdr"><div><div className="pgtit">Coverage Dashboard</div><div className="pgsub">Q1 2025 · Financial Sponsors Group</div></div><button className="abtn" onClick={() => setAddActivity(true)}>+ Log Activity</button></div>
        <div className="stats">
          <div className="stat" style={statStyle("mtgs")} onClick={() => togglePanel("mtgs")}><div className="sv">{stats.mtgsThisMonth}</div><div className="sl">Meetings This Month</div></div>
          <div className="stat" style={statStyle("pitches")} onClick={() => togglePanel("pitches")}><div className="sv" style={{ color: stats.pitchesInFlight > 0 ? "#1a3a5c" : "#bbb" }}>{stats.pitchesInFlight}</div><div className="sl">Pitches in Flight</div></div>
          <div className="stat" style={statStyle("overdue")} onClick={() => togglePanel("overdue")}><div className="sv" style={{ color: stats.overdueNextActions > 0 ? "#7a4a1a" : "#bbb" }}>{stats.overdueNextActions}</div><div className="sl">Overdue Follow-ups</div></div>
          <div className="stat" style={statStyle("cold")} onClick={() => togglePanel("cold")}><div className="sv" style={{ color: stats.t1Cold > 0 ? "#7a1a1a" : "#bbb" }}>{stats.t1Cold}</div><div className="sl">Tier 1 Gone Cold</div></div>
          <div className="stat" style={statStyle("exit")} onClick={() => togglePanel("exit")}><div className="sv" style={{ color: stats.exploringExit > 0 ? "#5c3d1a" : "#bbb" }}>{stats.exploringExit}</div><div className="sl">Portcos Exploring Exit</div></div>
        </div>
        {panelRow("mtgs", <>
          <div className="ptit">Meetings This Month ({mtgsMonth.length})</div>
          {mtgsMonth.length === 0 ? <div className="empty">No meetings logged this month yet.</div> : mtgsMonth.map(a => {
            const sp = getSponsor(a.sponsorId); const ct = getContact(a.contactId); const bk = getBanker(a.lazardBankerId);
            return <div key={a.id} className="arow" onClick={() => setActDetail(a)}><div style={{ flex: 1 }}><div className="at">{sp?.name}{ct && <span style={{ color: "#aaa", fontWeight: 400 }}> · {ct.name}</span>}</div><div className="am">{a.date} · {a.description.slice(0,70)}{a.description.length>70?"…":""}</div>{bk && <div className="am">Lazard: {bk.name}</div>}</div><StatusBadge status={a.status} /></div>;
          })}
        </>)}
        {panelRow("pitches", <>
          <div className="ptit">Pitches in Flight ({pitchesInFlight.length})</div>
          {pitchesInFlight.length === 0 ? <div className="empty">No active pitches.</div> : pitchesInFlight.map(a => {
            const sp = getSponsor(a.sponsorId); const ct = getContact(a.contactId); const bk = getBanker(a.lazardBankerId);
            return <div key={a.id} className="arow" onClick={() => setActDetail(a)}><div style={{ flex: 1 }}><div className="at">{sp?.name}{ct && <span style={{ color: "#aaa", fontWeight: 400 }}> · {ct.name}</span>}</div><div className="am">{a.date} · {a.description}</div>{a.nextAction && <div className="am" style={{ color: "#1a3a5c", fontWeight: 500 }}>→ {a.nextAction}</div>}{bk && <div className="am">Lazard: {bk.name}</div>}</div><StatusBadge status={a.status} /></div>;
          })}
        </>)}
        {panelRow("overdue", <>
          <div className="ptit">Overdue Follow-ups ({overdueList.length})</div>
          {overdueList.length === 0 ? <div className="empty">No overdue follow-ups ✓</div> : overdueList.map(a => {
            const sp = getSponsor(a.sponsorId); const ct = getContact(a.contactId);
            return <div key={a.id} className="arow" onClick={() => setActDetail(a)}><div style={{ flex: 1 }}><div className="at">{sp?.name}{ct && <span style={{ color: "#aaa", fontWeight: 400 }}> · {ct.name}</span>}</div><div className="am" style={{ color: "#7a4a1a", fontWeight: 500 }}>→ {a.nextAction}</div><div className="am">{a.date} · {daysSince(a.date)} days overdue</div></div><StatusBadge status={a.status} /></div>;
          })}
        </>)}
        {panelRow("cold", <>
          <div className="ptit">Tier 1 Gone Cold — 60+ Days ({t1ColdList.length})</div>
          {t1ColdList.length === 0 ? <div className="empty">All Tier 1 firms touched in last 60 days ✓</div> : t1ColdList.map(s => {
            const lt = ltSp(s.id);
            return <div key={s.id} className="arow" onClick={() => { setTab("sponsors"); setFirmPage(s.id); }}><div style={{ flex: 1 }}><div className="at">{s.name}</div><div className="am">{s.sectors.slice(0,2).join(", ")} · {s.hq}</div></div>{lt ? <StallBadge date={lt} /> : <span style={{ background: "#FDF0EE", color: "#7a1a1a", borderRadius: 2, fontSize: 10, padding: "2px 8px", fontWeight: 500 }}>Never</span>}</div>;
          })}
        </>)}
        {panelRow("exit", <>
          <div className="ptit">Portcos Exploring Exit ({exitingPortcos.length})</div>
          {exitingPortcos.length === 0 ? <div className="empty">No portcos currently exploring exit.</div> : exitingPortcos.map(p => {
            const sp = getSponsor(p.sponsorId); const owner = getContact(p.contactId);
            return <div key={p.id} className="arow" onClick={() => setPortcoModal(p.id)}><div style={{ flex: 1 }}><div className="at">{p.name} <span style={{ color: "#aaa", fontWeight: 400, fontSize: 11 }}>· {sp?.name}</span></div><div className="am">{p.sector}{owner && ` · Owned by ${owner.name}`}</div>{(p.revenue||p.ebitda) && <div className="am">Rev {p.revenue}{p.ebitda?` · EBITDA ${p.ebitda}`:""}</div>}</div><span style={{ background: "#FDF6EE", color: "#7a4a1a", borderRadius: 2, fontSize: 10, padding: "2px 8px", fontWeight: 600, whiteSpace: "nowrap" }}>Exploring Exit</span></div>;
          })}
        </>)}
        <div className="twocol">
          <div className="panel">
            <div className="ptit">Recent Activity</div>
            {[...activities].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 7).map(a => {
              const sp = getSponsor(a.sponsorId); const ct = getContact(a.contactId); const pc = getPortco(a.portcoId);
              return <div key={a.id} className="arow" onClick={() => setActDetail(a)}><div style={{ flex: 1 }}><div className="at">{sp?.name}{ct && <span style={{ color: "#aaa", fontWeight: 400 }}> · {ct.name}</span>}{pc && <span style={{ color: "#7a4a1a", fontWeight: 500 }}> · {pc.name}</span>}</div><div className="am">{a.date} · {a.type} · {a.description.slice(0,52)}{a.description.length>52?"…":""}</div></div><StatusBadge status={a.status} /></div>;
            })}
          </div>
          <div className="panel">
            <div className="ptit">Tier 1 Gone Cold — 60+ Days</div>
            {t1ColdList.map(s => { const lt = ltSp(s.id); return <div key={s.id} className="arow" onClick={() => { setTab("sponsors"); setFirmPage(s.id); }}><div style={{ flex: 1 }}><div className="at">{s.name}</div><div className="am">{s.sectors.slice(0,2).join(", ")}</div></div>{lt ? <StallBadge date={lt} /> : <span style={{ background: "#FDF0EE", color: "#7a1a1a", borderRadius: 2, fontSize: 10, padding: "2px 8px", fontWeight: 500 }}>Never</span>}</div>; })}
            {t1ColdList.length === 0 && <div className="empty">All Tier 1 firms touched in last 60 days ✓</div>}
          </div>
        </div>
        <div className="twocol" style={{ marginTop: 16 }}>
          <div className="panel">
            <div className="ptit">Overdue Follow-ups</div>
            {overdueList.slice(0,7).map(a => { const sp = getSponsor(a.sponsorId); const ct = getContact(a.contactId); return <div key={a.id} className="arow" onClick={() => setActDetail(a)}><div style={{ flex: 1 }}><div className="at">{sp?.name}{ct && <span style={{ color: "#aaa", fontWeight: 400 }}> · {ct.name}</span>}</div><div className="am" style={{ color: "#7a4a1a" }}>→ {a.nextAction}</div><div className="am">{a.date} · {daysSince(a.date)}d ago</div></div><StatusBadge status={a.status} /></div>; })}
            {overdueList.length === 0 && <div className="empty">No overdue follow-ups ✓</div>}
          </div>
          <div className="panel">
            <div className="ptit">Portcos Exploring Exit</div>
            {exitingPortcos.map(p => { const sp = getSponsor(p.sponsorId); const owner = getContact(p.contactId); return <div key={p.id} className="arow" onClick={() => setPortcoModal(p.id)}><div style={{ flex: 1 }}><div className="at">{p.name} <span style={{ fontSize: 10, color: "#aaa" }}>· {sp?.name}</span></div><div className="am">{p.sector}{owner && ` · ${owner.name}`}</div>{p.revenue && <div className="am">Rev {p.revenue}{p.ebitda?` · EBITDA ${p.ebitda}`:""}</div>}</div><span style={{ background: "#FDF6EE", color: "#7a4a1a", borderRadius: 2, fontSize: 10, padding: "2px 8px", fontWeight: 600, whiteSpace: "nowrap" }}>Exploring Exit</span></div>; })}
            {exitingPortcos.length === 0 && <div className="empty">No portcos currently exploring exit</div>}
          </div>
        </div>
      </>
    );
  }

  // ─── BANKER PAGE COMPONENT ────────────────────────────────────────────────
  function BankerPage() {
    const b = bankers.find(x => x.id === bankerPage);
    if (!b) return null;
    const covered = contacts.filter(c => (c.lazardMappings||[]).includes(b.id));
    const bActs = activities.filter(a => a.lazardBankerId === b.id).sort((a,x)=>new Date(x.date)-new Date(a.date));
    const mtgs = bActs.filter(a => a.type === "Meeting" || a.type === "Call");
    const pitches = bActs.filter(a => a.type === "Pitch");
    const confs = bActs.filter(a => a.type === "Conference");
    return (
      <div className="fp">
        <button className="backbtn" onClick={() => setBankerPage(null)}>← Back to Team</button>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? 12 : 0 }}>
          <div style={{ display:"flex", gap:14, alignItems:"center" }}>
            <Avatar name={b.name} size={isMobile ? 40 : 52} />
            <div>
              <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize: isMobile ? 20 : 26, color:"#1a3a5c", fontWeight:700 }}>{b.name}</div>
              <div style={{ fontSize:11, color:"#aaa", marginTop:2 }}>{b.title} · Lazard</div>
              <div style={{ marginTop:5 }}><BankerTag banker={b} /></div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, flexShrink:0 }}>
            <button className="abtn" onClick={() => setAddActivity(true)}>+ Log Activity</button>
            {!isMobile && <><button style={CancelBtn} onClick={() => setEditBankerD(b)}>Edit</button><button style={DangerBtn} onClick={() => delBanker(b.id)}>Delete</button></>}
          </div>
        </div>
        <div className="igrid">
          <div className="ic"><div className="il">Email</div><div className="iv" style={{ fontSize:11, color:"#1a3a5c" }}>{b.email}</div></div>
          <div className="ic"><div className="il">Phone</div><div className="iv" style={{ fontSize:11 }}>{b.phone}</div></div>
          <div className="ic"><div className="il">Total Activities</div><div className="iv" style={{ fontFamily:"Cormorant Garamond,serif", fontSize:20 }}>{bActs.length}</div></div>
          <div className="ic"><div className="il">Meetings & Calls</div><div className="iv" style={{ fontFamily:"Cormorant Garamond,serif", fontSize:20 }}>{mtgs.length}</div></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
          <div className="ic" style={{ textAlign:"center" }}><div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:26, color:"#1a3a5c", fontWeight:700 }}>{mtgs.length}</div><div style={{ fontSize:9, color:"#bbb", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:2 }}>Meetings & Calls</div></div>
          <div className="ic" style={{ textAlign:"center" }}><div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:26, color:"#1a3a5c", fontWeight:700 }}>{pitches.length}</div><div style={{ fontSize:9, color:"#bbb", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:2 }}>Pitches</div></div>
          <div className="ic" style={{ textAlign:"center" }}><div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:26, color:"#1a3a5c", fontWeight:700 }}>{confs.length}</div><div style={{ fontSize:9, color:"#bbb", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:2 }}>Conferences</div></div>
        </div>
        <div className="divider" />
        <div style={{ marginBottom:20 }}>
          <div className="ptit">{b.sponsorCoverage ? "PE Firms Covered" : "PE Contacts Covered"} ({b.sponsorCoverage ? (b.sponsorFirms||[]).length : covered.length})</div>
          {b.sponsorCoverage ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:8 }}>
              {(b.sponsorFirms||[]).map(spId => {
                const sp = getSponsor(spId); if (!sp) return null;
                const lt = ltSp(sp.id);
                return <div key={spId} className="cc" onClick={() => { setTab("sponsors"); setFirmPage(sp.id); setBankerPage(null); }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <div style={{ width:32, height:32, background:"#1a3a5c", borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontFamily:"Cormorant Garamond,serif", fontSize:15, fontWeight:700 }}>{sp.name[0]}</div>
                    <div><div style={{ fontSize:13, fontWeight:600, color:"#1a3a5c", fontFamily:"Cormorant Garamond,serif" }}>{sp.name}</div><div style={{ fontSize:10, color:"#aaa" }}>{sp.aum} · Tier {sp.tier}</div></div>
                  </div>
                  <div style={{ marginTop:6 }}>{lt ? <StallBadge date={lt} /> : <span style={{ color:"#ddd", fontSize:10 }}>Never touched</span>}</div>
                </div>;
              })}
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:8 }}>
              {covered.map(c => { const sp = getSponsor(c.sponsorId); return <div key={c.id} className="cc" onClick={() => setContactPage(c.id)}><div style={{ display:"flex", gap:8, alignItems:"center" }}><Avatar name={c.name} size={28} /><div><div style={{ fontSize:12, fontWeight:600, color:"#1a1a1a" }}>{c.name}</div><div style={{ fontSize:10, color:"#aaa" }}>{sp?.name}</div></div></div><div style={{ marginTop:5 }}><SectorTag sector={c.sector} /></div></div>; })}
            </div>
          )}
        </div>
        <div className="divider" />
        <div className="ptit">All Activity ({bActs.length})</div>
        {bActs.length === 0 ? <div className="empty">No activities logged for this banker.</div> : bActs.map(a => {
          const sp = getSponsor(a.sponsorId); const ct = getContact(a.contactId);
          return <div key={a.id} className="arow" onClick={() => setActDetail(a)}><div style={{ flex:1 }}><div className="at">{a.type} — {a.date}{sp && <span style={{ color:"#aaa", fontWeight:400 }}> · {sp.name}</span>}{ct && <span style={{ color:"#aaa", fontWeight:400 }}> · {ct.name}</span>}</div><div className="am">{a.description}</div>{a.nextAction && <div style={{ fontSize:11, color:"#1a3a5c", marginTop:4, fontWeight:500 }}>→ {a.nextAction}</div>}</div><StatusBadge status={a.status} /></div>;
        })}
      </div>
    );
  }
  // ─── EXPORT TAB ───────────────────────────────────────────────────────────
  function ExportTab() {
    const EXPORTS = [
      { key: "activity", label: "Activity Log", desc: "All meetings, calls, pitches and conferences with notes, outcomes and next actions", count: activities.length },
      { key: "deals", label: "Deals", desc: "Buy-side and sell-side deal tracker with seller firms, buy-side targets and status", count: deals.length },
      { key: "portcos", label: "Portfolio Companies", desc: "All portcos with financials, sector, status and PE owner contact", count: portcos.length },
      { key: "team", label: "Lazard Team", desc: "Internal banker directory with sector assignments and contact info", count: bankers.length },
    ];
    const [selected, setSelected] = useState({ activity: true, deals: true, portcos: true, team: true });
    const [exporting, setExporting] = useState(false);
    const toggle = key => setSelected(p => ({ ...p, [key]: !p[key] }));
    const anySelected = Object.values(selected).some(Boolean);

    // ── Colour palette ─────────────────────────────────────────────────────
    const NAVY      = "1A3A5C";   // Lazard navy — headers, titles
    const NAVY_MID  = "2E567A";   // slightly lighter navy — sub-headers
    const NAVY_PALE = "D6E4F0";   // pale navy — even rows
    const NAVY_XPALE= "EEF4FB";   // very pale — odd rows (still tinted)
    const GOLD      = "C9A84C";   // gold accent — section labels
    const GOLD_PALE = "FDF6E3";   // pale gold — KPI value cells
    const WHITE     = "FFFFFF";
    const BORDER    = "8AAFD4";   // medium blue border

    // thin navy border applied to every cell
    const border = (weight = "thin") => ({
      top:    { style: weight, color: { rgb: BORDER } },
      bottom: { style: weight, color: { rgb: BORDER } },
      left:   { style: weight, color: { rgb: BORDER } },
      right:  { style: weight, color: { rgb: BORDER } },
    });

    // Header row — deep navy fill, white bold Arial
    const hdrS = {
      font:      { bold: true, color: { rgb: WHITE }, name: "Arial", sz: 10 },
      fill:      { patternType: "solid", fgColor: { rgb: NAVY } },
      alignment: { horizontal: "center", vertical: "center" },
      border:    border("medium"),
    };
    // Even data rows — pale navy tint
    const evenS = {
      font:      { name: "Arial", sz: 10, color: { rgb: "1A1A1A" } },
      fill:      { patternType: "solid", fgColor: { rgb: NAVY_PALE } },
      alignment: { vertical: "center" },
      border:    border(),
    };
    // Odd data rows — very pale navy (still tinted, not white)
    const oddS = {
      font:      { name: "Arial", sz: 10, color: { rgb: "1A1A1A" } },
      fill:      { patternType: "solid", fgColor: { rgb: NAVY_XPALE } },
      alignment: { vertical: "center" },
      border:    border(),
    };
    const boldS = s => ({ ...s, font: { ...s.font, bold: true } });
    // Navy mid — sub-section header rows inside dashboard tables
    const subHdrS = {
      font:      { bold: true, color: { rgb: WHITE }, name: "Arial", sz: 10 },
      fill:      { patternType: "solid", fgColor: { rgb: NAVY_MID } },
      alignment: { horizontal: "left", vertical: "center" },
      border:    border("medium"),
    };
    // Gold section label
    const goldS = {
      font:      { bold: true, color: { rgb: "7A5200" }, name: "Arial", sz: 11 },
      fill:      { patternType: "solid", fgColor: { rgb: GOLD } },
      alignment: { horizontal: "left", vertical: "center" },
      border:    border("medium"),
    };
    // KPI label cells
    const kpiLblS = {
      font:      { bold: true, color: { rgb: NAVY }, name: "Arial", sz: 9 },
      fill:      { patternType: "solid", fgColor: { rgb: NAVY_PALE } },
      alignment: { horizontal: "center", vertical: "center" },
      border:    border("medium"),
    };
    // KPI value cells — large navy number on pale gold
    const kpiValS = {
      font:      { bold: true, color: { rgb: NAVY }, name: "Arial", sz: 22 },
      fill:      { patternType: "solid", fgColor: { rgb: GOLD_PALE } },
      alignment: { horizontal: "center", vertical: "center" },
      border:    border("medium"),
    };
    // Title styles
    const titleS = {
      font:      { bold: true, color: { rgb: WHITE }, name: "Arial", sz: 16 },
      fill:      { patternType: "solid", fgColor: { rgb: NAVY } },
      alignment: { horizontal: "left", vertical: "center" },
      border:    border("medium"),
    };
    const subtitleS = {
      font:      { bold: false, color: { rgb: NAVY_PALE }, name: "Arial", sz: 10 },
      fill:      { patternType: "solid", fgColor: { rgb: NAVY } },
      alignment: { horizontal: "left", vertical: "center" },
      border:    border(),
    };

    // Apply cell style helper
    const sc = (ws, addr, style) => { if (ws[addr]) ws[addr].s = style; };
    const scRow = (ws, row, cols, style) =>
      cols.forEach((_, ci) => sc(ws, String.fromCharCode(65 + ci) + row, style));

    // ── Style a data sheet (header + alternating rows + borders) ───────────
    const styleSheet = (ws, cols, nRows) => {
      if (!ws["!ref"]) return;
      scRow(ws, 1, cols, hdrS);
      for (let r = 2; r <= nRows + 1; r++) {
        const base = r % 2 === 0 ? evenS : oddS;
        cols.forEach((_, ci) => {
          const addr = String.fromCharCode(65 + ci) + r;
          sc(ws, addr, ci === 0 ? boldS(base) : base);
        });
      }
      ws["!freeze"] = { xSplit: 0, ySplit: 1, topLeftCell: "A2" };
      ws["!rows"] = [{ hpt: 24 }];
    };

    const buildAndStyle = (XLSX, rows, cols) => {
      const header = cols.map(c => c.label);
      const data = rows.map(row =>
        cols.map(c => { const v = c.get(row); return v == null ? "" : String(v); })
      );
      const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
      styleSheet(ws, cols, rows.length);
      return ws;
    };

    // ── Dashboard sheet ────────────────────────────────────────────────────
    const buildDashboard = (XLSX) => {
      const now = new Date("2025-03-26");
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      const mtgsMonth     = activities.filter(a => a.type === "Meeting" && new Date(a.date) >= monthStart).length;
      const pitchesFlying = activities.filter(a => a.type === "Pitch" && a.status === "Pending").length;
      const overdueCount  = activities.filter(a => a.nextAction && a.status !== "Complete" && a.status !== "Won" && a.status !== "Lost" && Math.floor((now - new Date(a.date)) / 86400000) >= 7).length;
      const t1cold        = sponsors.filter(s => { if (s.tier !== 1) return false; const aa = activities.filter(a => a.sponsorId === s.id); if (!aa.length) return true; return Math.floor((now - new Date(Math.max(...aa.map(a => new Date(a.date))))) / 86400000) > 60; }).length;
      const exitCount     = portcos.filter(p => p.status === "Exploring Exit").length;
      const wonP          = activities.filter(a => a.type === "Pitch" && a.status === "Won").length;
      const closedP       = activities.filter(a => a.type === "Pitch" && (a.status === "Won" || a.status === "Lost")).length;
      const winRate       = closedP > 0 ? Math.round((wonP / closedP) * 100) + "%" : "N/A";

      const byType = {};
      ACTIVITY_TYPES.forEach(t => { byType[t] = activities.filter(a => a.type === t).length; });
      const byFirm = sponsors.map(s => ({ name: s.name, count: activities.filter(a => a.sponsorId === s.id).length }))
        .sort((a, b) => b.count - a.count).slice(0, 8);

      const COLS = ["A","B","C","D","E","F"];

      // Build row-by-row so we know exact row numbers for styling
      const rows = [
        ["LAZARD · FINANCIAL SPONSORS GROUP", "", "", "", "", ""],           // 1
        [`FSG Coverage Intelligence  ·  As of ${now.toISOString().slice(0,10)}`, "", "", "", "", ""], // 2
        ["", "", "", "", "", ""],                                              // 3
        ["KEY METRICS", "", "", "", "", ""],                                  // 4
        ["Meetings This Month", "Pitches in Flight", "Overdue Follow-ups", "Tier 1 Gone Cold (60d+)", "Portcos Exploring Exit", "Pitch Win Rate"], // 5
        [mtgsMonth, pitchesFlying, overdueCount, t1cold, exitCount, winRate], // 6
        ["", "", "", "", "", ""],                                              // 7
        ["ACTIVITY BREAKDOWN", "", "", "", "", ""],                           // 8
        ["Type", "Count", "", "Firm", "Touchpoints", ""],                     // 9
      ];
      const actTypeStart = rows.length + 1; // 10
      ACTIVITY_TYPES.forEach((t, i) => rows.push([t, byType[t], "", byFirm[i]?.name || "", byFirm[i]?.count || "", ""]));
      const extraFirms = byFirm.slice(ACTIVITY_TYPES.length);
      extraFirms.forEach(f => rows.push(["", "", "", f.name, f.count, ""]));
      rows.push(["", "", "", "", "", ""]);                                     // spacer
      rows.push(["DEAL PIPELINE", "", "", "", "", ""]);
      const dealHdrRow = rows.length; // row number (1-based) for deal header
      rows.push(["Deal Name", "Role", "Status", "Seller", "Asset", "Date"]);
      const dealDataStart = rows.length + 1;
      deals.forEach(d => rows.push([d.name, d.lazardRole, d.status, getSponsor(d.sellerSponsorId)?.name || "", getPortco(d.portcoId)?.name || "", d.date]));
      rows.push(["", "", "", "", "", ""]);
      rows.push(["PORTCOS EXPLORING EXIT", "", "", "", "", ""]);
      const exitHdrRow = rows.length;
      rows.push(["Company", "Firm", "Sector", "Revenue", "EBITDA", "PE Owner"]);
      const exitDataStart = rows.length + 1;
      const exitPortcos = portcos.filter(p => p.status === "Exploring Exit");
      exitPortcos.forEach(p => rows.push([p.name, getSponsor(p.sponsorId)?.name || "", p.sector, p.revenue || "", p.ebitda || "", getContact(p.contactId)?.name || ""]));

      const ws = XLSX.utils.aoa_to_sheet(rows);

      // ── Apply styles row by row ──
      // Title rows
      COLS.forEach(c => sc(ws, c+"1", titleS));
      COLS.forEach(c => sc(ws, c+"2", subtitleS));
      // Empty row 3 — navy fill to keep the band going
      COLS.forEach(c => sc(ws, c+"3", { fill: { patternType: "solid", fgColor: { rgb: NAVY } }, border: border() }));
      // KEY METRICS section
      COLS.forEach(c => sc(ws, c+"4", goldS));
      COLS.forEach(c => sc(ws, c+"5", kpiLblS));
      COLS.forEach(c => sc(ws, c+"6", kpiValS));
      // Empty row 7
      COLS.forEach(c => sc(ws, c+"7", { fill: { patternType: "solid", fgColor: { rgb: NAVY_XPALE } }, border: border() }));
      // ACTIVITY BREAKDOWN section header
      COLS.forEach(c => sc(ws, c+"8", goldS));
      // Activity table header (row 9)
      COLS.forEach(c => sc(ws, c+"9", subHdrS));
      // Activity data rows with alternating fills
      const actRowCount = ACTIVITY_TYPES.length + extraFirms.length;
      for (let r = 0; r < actRowCount; r++) {
        const excelR = 10 + r;
        const base = r % 2 === 0 ? evenS : oddS;
        COLS.forEach((c, ci) => sc(ws, c + excelR, ci === 0 || ci === 3 ? boldS(base) : base));
      }
      // Deal pipeline section
      const dealSectionR = 10 + actRowCount + 1;
      COLS.forEach(c => sc(ws, c + dealSectionR, goldS));
      COLS.forEach(c => sc(ws, c + (dealSectionR + 1), subHdrS));
      deals.forEach((_, i) => {
        const excelR = dealSectionR + 2 + i;
        const base = i % 2 === 0 ? evenS : oddS;
        COLS.forEach((c, ci) => sc(ws, c + excelR, ci === 0 ? boldS(base) : base));
      });
      // Portcos exit section
      const exitSectionR = dealSectionR + 2 + deals.length + 1;
      COLS.forEach(c => sc(ws, c + exitSectionR, goldS));
      COLS.forEach(c => sc(ws, c + (exitSectionR + 1), subHdrS));
      exitPortcos.forEach((_, i) => {
        const excelR = exitSectionR + 2 + i;
        const base = i % 2 === 0 ? evenS : oddS;
        COLS.forEach((c, ci) => sc(ws, c + excelR, ci === 0 ? boldS(base) : base));
      });

      ws["!cols"] = [30, 20, 22, 28, 24, 16].map(w => ({ wch: w }));
      ws["!rows"] = [{ hpt: 36 }, { hpt: 18 }, { hpt: 6 }, { hpt: 18 }, { hpt: 22 }, { hpt: 40 }];
      ws["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
        { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } },
        { s: { r: 3, c: 0 }, e: { r: 3, c: 5 } },
      ];

      return ws;
    };

    const doExport = async () => {
      setExporting(true);
      try {
        // Serialize live app data to send to the Python export API
        const payload = {
          selected,
          activities: [...activities].sort((a, b) => new Date(b.date) - new Date(a.date)).map(a => ({
            date: a.date, type: a.type,
            firm: getSponsor(a.sponsorId)?.name || "",
            contact: getContact(a.contactId)?.name || "",
            banker: getBanker(a.lazardBankerId)?.name || "",
            dealSide: a.dealSide || "",
            deal: getDeal(a.dealId)?.name || "",
            portco: getPortco(a.portcoId)?.name || "",
            description: a.description || "",
            notes: a.notes || "",
            outcome: a.outcome || "",
            nextAction: a.nextAction || "",
            status: a.status || "",
          })),
          deals: [...deals].sort((a, b) => new Date(b.date) - new Date(a.date)).map(d => ({
            name: d.name, date: d.date, role: d.lazardRole, status: d.status,
            sector: d.sector,
            seller: getSponsor(d.sellerSponsorId)?.name || "",
            portco: getPortco(d.portcoId)?.name || "",
            buyside: (d.buySideFirms || []).map(id => getSponsor(id)?.name).filter(Boolean).join(", "),
            description: d.description || "",
            notes: d.notes || "",
          })),
          portcos: [...portcos].sort((a, b) => a.name.localeCompare(b.name)).map(p => ({
            name: p.name,
            firm: getSponsor(p.sponsorId)?.name || "",
            sector: p.sector, status: p.status,
            revenue: p.revenue || "", ebitda: p.ebitda || "",
            year: p.investmentYear,
            owner: getContact(p.contactId)?.name || "",
            notes: p.notes || "",
          })),
          team: [...bankers].sort((a, b) => (a.sponsorCoverage ? 0 : 1) - (b.sponsorCoverage ? 0 : 1) || a.name.localeCompare(b.name)).map(b => ({
            name: b.name, title: b.title,
            role: b.sponsorCoverage ? "Sponsor Coverage" : b.sector,
            email: b.email, phone: b.phone,
            coverage: b.sponsorCoverage
              ? (b.sponsorFirms || []).map(id => getSponsor(id)?.name).filter(Boolean).join(", ")
              : contacts.filter(c => (c.lazardMappings || []).includes(b.id)).map(c => `${getSponsor(c.sponsorId)?.name} (${c.name})`).join("; "),
            activitiesYTD: activities.filter(a => a.lazardBankerId === b.id).length,
          })),
        };

        const res = await fetch("/api/export", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || `Server error ${res.status}`);
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Lazard_FSG_Export_${new Date().toISOString().slice(0, 10)}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
      } catch(e) {
        alert("Export failed: " + e.message);
      }
      setExporting(false);
    };

    return (
      <div style={{ maxWidth: 680 }}>
        <div className="pghdr">
          <div><div className="pgtit">Export Data</div><div className="pgsub">Download selected datasets as a formatted Excel workbook</div></div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 3, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.03)", marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 18 }}>Select Sheets to Include</div>
          {EXPORTS.map(ex => (
            <div key={ex.key} onClick={() => toggle(ex.key)}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 3, cursor: "pointer", marginBottom: 8, background: selected[ex.key] ? "#EEF2F7" : "#fafafa", border: `1px solid ${selected[ex.key] ? "#C5D4E6" : "#eee"}`, transition: "all .15s" }}>
              <div style={{ width: 20, height: 20, borderRadius: 3, border: `2px solid ${selected[ex.key] ? "#1a3a5c" : "#ccc"}`, background: selected[ex.key] ? "#1a3a5c" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .15s" }}>
                {selected[ex.key] && <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, lineHeight: 1 }}>✓</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: selected[ex.key] ? "#1a3a5c" : "#666", fontFamily: "Cormorant Garamond, serif" }}>{ex.label}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{ex.desc}</div>
              </div>
              <div style={{ fontSize: 11, color: "#bbb", whiteSpace: "nowrap" }}>{ex.count} rows</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 3, padding: "16px 20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 20 }}>📊</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>
              {Object.values(selected).filter(Boolean).length} sheet{Object.values(selected).filter(Boolean).length !== 1 ? "s" : ""} selected
            </div>
            <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>
              File: <span style={{ fontWeight: 500, color: "#666" }}>Lazard_FSG_Export_{new Date().toISOString().slice(0,10)}.xlsx</span>
            </div>
          </div>
          <button onClick={doExport} disabled={!anySelected || exporting}
            style={{ marginLeft: "auto", background: anySelected ? "#1a3a5c" : "#ccc", border: "none", borderRadius: 3, color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "10px 24px", cursor: anySelected ? "pointer" : "not-allowed", opacity: exporting ? 0.7 : 1 }}>
            {exporting ? "Generating…" : "⬇ Download Excel"}
          </button>
        </div>
        <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 3, padding: "12px 16px" }}>
          <div style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>What's included</div>
          <div style={{ fontSize: 11, color: "#888", lineHeight: 1.8 }}>
            Each selected dataset exports as a separate tab. All linked fields are resolved — firm names, contact names, and banker names are written out in full. The file opens directly in Excel or Google Sheets.
          </div>
        </div>
      </div>
    );
  }

  function PortcoModal() {
    const pc = getPortco(portcoModal);
    if (!pc) return null;
    const sp = getSponsor(pc.sponsorId);
    const owner = getContact(pc.contactId);
    const acts = portcoActs(pc.id);
    const pStatus = PORTCO_STATUS_STYLE[pc.status] || { bg: "#f0f0f0", text: "#888" };
    return (
      <Modal title={pc.name} onClose={() => setPortcoModal(null)} width={660}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <SectorTag sector={pc.sector} />
              <span style={{ background: pStatus.bg, color: pStatus.text, borderRadius: 2, fontSize: 10, padding: "2px 8px", fontWeight: 600 }}>{pc.status}</span>
            </div>
            <div style={{ fontSize: 11, color: "#aaa" }}>
              {sp?.name} portfolio · Invested {pc.investmentYear}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="abtn" style={{ fontSize: 10, padding: "6px 12px" }} onClick={() => { setPortcoModal(null); setAddActivity(true); }}>+ Log Activity</button>
            <button style={CancelBtn} onClick={() => { setEditPortcoD(pc); setPortcoModal(null); }}>Edit</button>
            <button style={DangerBtn} onClick={() => delPortco(pc.id)}>Delete</button>
          </div>
        </div>

        {/* Financials */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
          {pc.revenue && <div className="ic"><div className="il">Revenue</div><div className="iv" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18 }}>{pc.revenue}</div></div>}
          {pc.ebitda && <div className="ic"><div className="il">EBITDA</div><div className="iv" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18 }}>{pc.ebitda}</div></div>}
          <div className="ic"><div className="il">Investment Year</div><div className="iv" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18 }}>{pc.investmentYear}</div></div>
        </div>

        {/* Description */}
        {pc.description && (
          <div className="ic" style={{ marginBottom: 14 }}>
            <div className="il">Company Overview</div>
            <div style={{ fontSize: 12, color: "#444", lineHeight: 1.7, marginTop: 4 }}>{pc.description}</div>
          </div>
        )}

        {/* PE Owner */}
        {owner && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>PE Contact Owner</div>
            <div onClick={() => { setPortcoModal(null); setContactModal(owner.id); }}
              style={{ display: "flex", alignItems: "center", gap: 12, background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 3, padding: "11px 14px", cursor: "pointer", transition: "border-color .15s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#1a3a5c"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e8e8"}>
              <Avatar name={owner.name} size={32} />
              <div>
                <div style={{ fontSize: 13, color: "#1a3a5c", fontWeight: 600 }}>{owner.name}</div>
                <div style={{ fontSize: 10, color: "#aaa", marginTop: 1 }}>{owner.title} · {sp?.name}</div>
              </div>
            </div>
          </div>
        )}

        {/* Lazard Notes */}
        {pc.notes && (
          <div style={{ background: "#EEF2F7", border: "1px solid #C5D4E6", borderRadius: 3, padding: "11px 14px", marginBottom: 18 }}>
            <div style={{ fontSize: 9, color: "#7a9bb5", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>Lazard Notes</div>
            <div style={{ fontSize: 12, color: "#1a3a5c", lineHeight: 1.65 }}>{pc.notes}</div>
          </div>
        )}

        {/* Linked Deals & Pitches */}
        {(() => {
          const linkedDeals = deals.filter(d => d.portcoId === pc.id);
          if (linkedDeals.length === 0) return null;
          return (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 9, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
                Deals & Pitches ({linkedDeals.length})
              </div>
              {linkedDeals.map(d => {
                const ds = DEAL_STATUS_STYLE[d.status] || { bg: "#f0f0f0", text: "#888" };
                const roleColor = d.lazardRole === "Sell-Side" ? { bg: "#EEF2F7", text: "#1a3a5c" } : { bg: "#EEF7F2", text: "#1d5c3a" };
                const dActs = dealActs(d.id);
                return (
                  <div key={d.id} style={{ border: "1px solid #e8e8e8", borderRadius: 3, marginBottom: 10, overflow: "hidden" }}>
                    {/* Deal header — clickable */}
                    <div onClick={() => { setPortcoModal(null); setDealModal(d.id); }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", background: "#fafafa", borderBottom: dActs.length > 0 ? "1px solid #f0f0f0" : "none", cursor: "pointer" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#EEF2F7"}
                      onMouseLeave={e => e.currentTarget.style.background = "#fafafa"}>
                      <div>
                        <div style={{ fontSize: 13, color: "#1a3a5c", fontWeight: 700, fontFamily: "Cormorant Garamond, serif" }}>{d.name}</div>
                        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                          <span style={{ background: roleColor.bg, color: roleColor.text, borderRadius: 2, fontSize: 9, padding: "2px 7px", fontWeight: 700 }}>{d.lazardRole}</span>
                          <span style={{ background: ds.bg, color: ds.text, borderRadius: 2, fontSize: 9, padding: "2px 7px", fontWeight: 600 }}>{d.status}</span>
                        </div>
                      </div>
                      <span style={{ color: "#ccc", fontSize: 12 }}>→</span>
                    </div>
                    {/* Pitch activities for this deal */}
                    {dActs.length > 0 && (
                      <div style={{ padding: "0 14px" }}>
                        {dActs.map(a => {
                          const ct = getContact(a.contactId);
                          const bk = getBanker(a.lazardBankerId);
                          return (
                            <div key={a.id} className="arow" onClick={() => { setPortcoModal(null); setActDetail(a); }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, fontWeight: 500, color: "#1a1a1a" }}>{a.type} — {a.date}{ct && <span style={{ color: "#aaa", fontWeight: 400 }}> · {ct.name}</span>}</div>
                                <div style={{ fontSize: 11, color: "#aaa" }}>{a.description}</div>
                                {bk && <div style={{ fontSize: 10, color: "#bbb", marginTop: 1 }}>Lazard: {bk.name}</div>}
                                {a.nextAction && <div style={{ fontSize: 11, color: "#1a3a5c", marginTop: 2, fontWeight: 500 }}>→ {a.nextAction}</div>}
                              </div>
                              <StatusBadge status={a.status} />
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {dActs.length === 0 && (
                      <div style={{ padding: "10px 14px", fontSize: 11, color: "#ccc" }}>No pitch activity logged yet</div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* Activity */}
        <div>
          <div style={{ fontSize: 9, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
            Activity ({acts.length})
          </div>
          {acts.length === 0
            ? <div style={{ color: "#ccc", fontSize: 12 }}>No activities tagged to this company yet.</div>
            : acts.map(a => {
                const ct = getContact(a.contactId);
                const bk = getBanker(a.lazardBankerId);
                return (
                  <div key={a.id} className="arow" onClick={() => { setPortcoModal(null); setActDetail(a); }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "#1a1a1a" }}>{a.type} — {a.date}{ct && <span style={{ color: "#aaa", fontWeight: 400 }}> · {ct.name}</span>}</div>
                      <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>{a.description}</div>
                      {bk && <div style={{ fontSize: 10, color: "#bbb", marginTop: 1 }}>Lazard: {bk.name}</div>}
                      {a.nextAction && <div style={{ fontSize: 11, color: "#1a3a5c", marginTop: 3, fontWeight: 500 }}>→ {a.nextAction}</div>}
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                );
              })
          }
        </div>
      </Modal>
    );
  }

  // ─── DEAL MODAL ───────────────────────────────────────────────────────────
  function DealModal() {
    const d = getDeal(dealModal);
    if (!d) return null;
    const seller = getSponsor(d.sellerSponsorId);
    const pc = getPortco(d.portcoId);
    const buySide = (d.buySideFirms || []).map(id => getSponsor(id)).filter(Boolean);
    const acts = dealActs(d.id);
    const ds = DEAL_STATUS_STYLE[d.status] || { bg: "#f0f0f0", text: "#888" };
    const roleColor = d.lazardRole === "Sell-Side" ? { bg: "#EEF2F7", text: "#1a3a5c" } : { bg: "#EEF7F2", text: "#1d5c3a" };
    return (
      <Modal title={d.name} onClose={() => setDealModal(null)} width={700}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 18 }}>
          <span style={{ background: roleColor.bg, color: roleColor.text, borderRadius: 2, fontSize: 11, padding: "3px 10px", fontWeight: 700 }}>{d.lazardRole}</span>
          <span style={{ background: ds.bg, color: ds.text, borderRadius: 2, fontSize: 11, padding: "3px 10px", fontWeight: 600 }}>{d.status}</span>
          <SectorTag sector={d.sector} />
          <span style={{ color: "#bbb", fontSize: 11, marginLeft: "auto" }}>{d.date}</span>
        </div>

        {/* Description */}
        {d.description && <div className="ic" style={{ marginBottom: 14 }}><div className="il">Deal Overview</div><div style={{ fontSize: 12, color: "#444", lineHeight: 1.7, marginTop: 4 }}>{d.description}</div></div>}

        {/* Sell side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 9, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Sell-Side (Seller)</div>
            {seller ? (
              <div onClick={() => { setDealModal(null); setTab("sponsors"); setFirmPage(seller.id); }}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 3, padding: "10px 12px", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#1a3a5c"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e8e8"}>
                <div style={{ width: 30, height: 30, background: "#1a3a5c", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Cormorant Garamond, serif", fontSize: 14, fontWeight: 700 }}>{seller.name[0]}</div>
                <div><div style={{ fontSize: 12, color: "#1a3a5c", fontWeight: 700 }}>{seller.name}</div><div style={{ fontSize: 10, color: "#aaa" }}>Seller</div></div>
              </div>
            ) : <div style={{ color: "#ccc", fontSize: 12 }}>—</div>}
            {pc && (
              <div onClick={() => { setDealModal(null); setPortcoModal(pc.id); }}
                style={{ marginTop: 8, background: "#FDF6EE", border: "1px solid #E0D2C5", borderRadius: 3, padding: "9px 12px", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#7a4a1a"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#E0D2C5"}>
                <div style={{ fontSize: 11, color: "#7a4a1a", fontWeight: 600 }}>{pc.name}</div>
                <div style={{ fontSize: 10, color: "#aaa", marginTop: 1 }}>Asset · {pc.sector}{pc.revenue ? ` · Rev ${pc.revenue}` : ""}</div>
              </div>
            )}
          </div>
          <div>
            <div style={{ fontSize: 9, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Buy-Side Firms Pitched ({buySide.length})</div>
            {buySide.length === 0 ? <div style={{ color: "#ccc", fontSize: 12 }}>None pitched yet</div> : buySide.map(s => (
              <div key={s.id} onClick={() => { setDealModal(null); setTab("sponsors"); setFirmPage(s.id); }}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 3, padding: "8px 12px", cursor: "pointer", marginBottom: 6 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#1a3a5c"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e8e8"}>
                <div style={{ width: 26, height: 26, background: "#EEF2F7", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", color: "#1a3a5c", fontFamily: "Cormorant Garamond, serif", fontSize: 13, fontWeight: 700 }}>{s.name[0]}</div>
                <div style={{ fontSize: 12, color: "#1a3a5c", fontWeight: 600 }}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {d.notes && <div style={{ background: "#EEF2F7", border: "1px solid #C5D4E6", borderRadius: 3, padding: "11px 14px", marginBottom: 18 }}><div style={{ fontSize: 9, color: "#7a9bb5", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>Lazard Notes</div><div style={{ fontSize: 12, color: "#1a3a5c", lineHeight: 1.65 }}>{d.notes}</div></div>}

        {/* Activity */}
        <div>
          <div style={{ fontSize: 9, color: "#bbb", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>Activity ({acts.length})</div>
          {acts.length === 0 ? <div style={{ color: "#ccc", fontSize: 12 }}>No activities linked to this deal yet.</div> : acts.map(a => {
            const sp = getSponsor(a.sponsorId); const ct = getContact(a.contactId);
            return <div key={a.id} className="arow" onClick={() => { setDealModal(null); setActDetail(a); }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{a.type} — {a.date}{ct && <span style={{ color: "#aaa", fontWeight: 400 }}> · {ct.name}</span>}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>{a.description}</div>
                {a.dealSide && <span style={{ background: a.dealSide === "Sell-Side" ? "#EEF2F7" : "#EEF7F2", color: a.dealSide === "Sell-Side" ? "#1a3a5c" : "#1d5c3a", borderRadius: 2, fontSize: 9, padding: "1px 6px", fontWeight: 600, marginTop: 3, display: "inline-block" }}>{a.dealSide}</span>}
              </div>
              <StatusBadge status={a.status} />
            </div>;
          })}
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 20, paddingTop: 16, borderTop: "1px solid #f0f0f0" }}>
          <button className="abtn" onClick={() => { setDealModal(null); setAddActivity(true); }}>+ Log Activity</button>
          <button style={CancelBtn} onClick={() => { setEditDealD(d); setDealModal(null); }}>Edit</button>
          <button style={DangerBtn} onClick={() => delDeal(d.id)}>Delete</button>
        </div>
      </Modal>
    );
  }

  const TABS = [["dashboard","Dashboard"],["sponsors","Firms"],["contacts","Contacts"],["map","Coverage Map"],["activity","Activity Log"],["deals","Deals"],["pitches","Pitches"],["team","LZ Team"],["export","Export"]];

  return (
    <div className="crm">
      <style>{css}</style>
      <div className="hdr">
        <div className="logo">
          <div className="lmark">L</div>
          <div><div className="ltxt">Lazard</div><div className="lsub">Sponsor Coverage</div></div>
        </div>
        <nav className="nav">
          {TABS.map(([k, l]) => <button key={k} className={`nb ${tab===k?"on":""}`} onClick={() => { setTab(k); setFirmPage(null); setContactPage(null); setBankerPage(null); setSearch(""); setSecF("All"); setTypeF("All"); setTierF("All"); setFirmF("All"); }}>{l}</button>)}
        </nav>
      </div>

      <div className="main">

        {tab === "sponsors" && firmPage && <FirmPage />}
        {contactPage && <ContactPage />}

        {/* DASHBOARD */}
        {tab === "dashboard" && !contactPage && <Dashboard />}

        {/* FIRMS */}
        {tab === "sponsors" && !firmPage && (
          <>
            <div className="pghdr"><div><div className="pgtit">PE Firm Universe</div><div className="pgsub">{sponsors.length} Firms Tracked</div></div><button className="abtn" onClick={() => setAddSponsor(true)}>+ Add Firm</button></div>
            <div className="tb">
              <input className="si" placeholder="Search firms..." value={search} onChange={e => setSearch(e.target.value)} />
              {["All","1","2","3"].map(t => <button key={t} className={`fb ${tierF===t?"on":""}`} onClick={() => setTierF(t)}>{t==="All"?"All Tiers":`T${t}`}</button>)}
              {!isMobile && ["All",...SECTORS].map(s => <button key={s} className={`fb ${secF===s?"on":""}`} onClick={() => setSecF(s)} style={{ fontSize: 9 }}>{s}</button>)}
            </div>
            {isMobile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {fSponsors.map(s => { const lt = ltSp(s.id); const nc = spCts(s.id).length; return (
                  <div key={s.id} onClick={() => setFirmPage(s.id)} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 3, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div>
                        <div className="sn">{s.name}</div>
                        <div style={{ fontSize: 10, color: "#aaa", marginTop: 2 }}>{s.hq}</div>
                      </div>
                      <span style={{ background: TIER_COLOR[s.tier]+"14", color: TIER_COLOR[s.tier], border:`1px solid ${TIER_COLOR[s.tier]}30`, borderRadius:"50%", display:"inline-flex", alignItems:"center", justifyContent:"center", width:22, height:22, fontSize:10, fontWeight:700 }}>{s.tier}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>{s.sectors.slice(0,2).map(sec => <SectorTag key={sec} sector={sec} />)}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 11, color: "#aaa" }}>{s.aum} · {nc} contacts</div>
                      {lt ? <StallBadge date={lt} /> : <span style={{ color:"#ddd", fontSize:11 }}>Never touched</span>}
                    </div>
                  </div>
                );})}
              </div>
            ) : (
              <table className="tbl">
                <thead><tr><th>Tier</th><th>Firm</th><th>AUM</th><th>Deals YTD</th><th>Sectors</th><th>Contacts</th><th>Last Touch</th></tr></thead>
                <tbody>{fSponsors.map(s => { const lt = ltSp(s.id); const nc = spCts(s.id).length; return <tr key={s.id} onClick={() => setFirmPage(s.id)}><td><span style={{ background: TIER_COLOR[s.tier]+"14", color: TIER_COLOR[s.tier], border:`1px solid ${TIER_COLOR[s.tier]}30`, borderRadius:"50%", display:"inline-flex", alignItems:"center", justifyContent:"center", width:22, height:22, fontSize:10, fontWeight:700 }}>{s.tier}</span></td><td><div className="sn">{s.name}</div><div style={{ fontSize:10, color:"#bbb", marginTop:1 }}>{s.hq}</div></td><td style={{ color:"#666" }}>{s.aum}</td><td style={{ color:"#1a3a5c", fontFamily:"Cormorant Garamond,serif", fontSize:17, fontWeight:600 }}>{s.dealsYTD}</td><td>{s.sectors.slice(0,2).map(sec => <SectorTag key={sec} sector={sec} />)}</td><td style={{ color: nc>0?"#1d5c3a":"#ccc" }}>{nc}</td><td>{lt ? <StallBadge date={lt} /> : <span style={{ color:"#ddd", fontSize:11 }}>Never</span>}</td></tr>; })}</tbody>
              </table>
            )}
          </>
        )}

        {/* CONTACTS */}
        {tab === "contacts" && !contactPage && (
          <>
            <div className="pghdr"><div><div className="pgtit">PE Contacts</div><div className="pgsub">{contacts.length} Contacts Across {sponsors.length} Firms</div></div><button className="abtn" onClick={() => setAddContact(true)}>+ Add Contact</button></div>
            <div className="tb">
              <input className="si" placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} />
              {!isMobile && ["All",...SECTORS].map(s => <button key={s} className={`fb ${secF===s?"on":""}`} onClick={() => setSecF(s)} style={{ fontSize: 9 }}>{s}</button>)}
            </div>
            {isMobile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {fContacts.map(c => { const sp = getSponsor(c.sponsorId); const mapped = (c.lazardMappings||[]).map(id=>getBanker(id)).filter(Boolean); return (
                  <div key={c.id} onClick={() => setContactPage(c.id)} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 3, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                      <Avatar name={c.name} size={36} />
                      <div style={{ flex: 1 }}>
                        <div className="sn" style={{ fontSize: 13 }}>{c.name}</div>
                        <div style={{ fontSize: 10, color: "#aaa" }}>{c.title} · {sp?.name}</div>
                      </div>
                      {c.lastContacted ? <StallBadge date={c.lastContacted} /> : <span style={{ color:"#ddd", fontSize:10 }}>Never</span>}
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                      <SectorTag sector={c.sector} />
                      {mapped.slice(0,3).map(b => <span key={b.id} className="mpill" style={{ fontSize:9 }}>{b.name.split(" ")[0]}</span>)}
                    </div>
                  </div>
                );})}
              </div>
            ) : (
              <table className="tbl">
                <thead><tr><th>Contact</th><th>Firm</th><th>Sector</th><th>Lazard Coverage</th><th>Deals</th><th>Last Touched</th></tr></thead>
                <tbody>{fContacts.map(c => { const sp = getSponsor(c.sponsorId); const mapped = (c.lazardMappings||[]).map(id=>getBanker(id)).filter(Boolean); return <tr key={c.id} onClick={() => setContactPage(c.id)}><td><div style={{ display:"flex", gap:8, alignItems:"center" }}><Avatar name={c.name} size={28} /><div><div className="sn" style={{ fontSize:13 }}>{c.name}</div><div style={{ fontSize:10, color:"#aaa" }}>{c.title}</div></div></div></td><td style={{ color:"#666", fontSize:12 }}>{sp?.name||"—"}</td><td><SectorTag sector={c.sector} /></td><td>{mapped.length>0 ? mapped.map(b=><span key={b.id} className="mpill" style={{ fontSize:10 }}>{b.name.split(" ")[0]}</span>) : <span style={{ color:"#ccc", fontSize:11 }}>Unmapped</span>}</td><td style={{ fontSize:11, color:"#aaa" }}>{c.recentDeals?.length||0}</td><td>{c.lastContacted ? <StallBadge date={c.lastContacted} /> : <span style={{ color:"#ddd", fontSize:11 }}>Never</span>}</td></tr>; })}</tbody>
              </table>
            )}
          </>
        )}

        {/* COVERAGE MAP */}
        {tab === "map" && !contactPage && <CoverageMap />}

        {/* ACTIVITY */}
        {tab === "activity" && !contactPage && (
          <>
            <div className="pghdr"><div><div className="pgtit">Activity Log</div><div className="pgsub">All Touchpoints · Click to View Details</div></div><button className="abtn" onClick={() => setAddActivity(true)}>+ Log Activity</button></div>
            <div className="tb">
              <input className="si" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
              <select className="si" style={{ width: isMobile ? "100%" : 160 }} value={firmF} onChange={e => setFirmF(e.target.value)}>
                <option value="All">All Firms</option>
                {sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {["All","Meeting","Pitch","Conference","Call"].map(t => <button key={t} className={`fb ${typeF===t?"on":""}`} onClick={() => setTypeF(t)}>{t}</button>)}
            </div>
            {isMobile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {fActivities.filter(a => firmF === "All" || a.sponsorId === firmF).map(a => { const sp=getSponsor(a.sponsorId); const ct=getContact(a.contactId); const bk=getBanker(a.lazardBankerId); return (
                  <div key={a.id} onClick={() => setActDetail(a)} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 3, padding: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>{sp?.name||"—"}</div>
                        <div style={{ fontSize: 10, color: "#aaa" }}>{a.date} · {a.type}{ct ? ` · ${ct.name}` : ""}</div>
                      </div>
                      <StatusBadge status={a.status} />
                    </div>
                    <div style={{ fontSize: 11, color: "#666", marginBottom: a.nextAction ? 6 : 0 }}>{a.description}</div>
                    {a.nextAction && <div style={{ fontSize: 11, color: "#1a3a5c", fontWeight: 500 }}>→ {a.nextAction}</div>}
                  </div>
                );})}
              </div>
            ) : (
              <table className="tbl">
                <thead><tr><th>Date</th><th>Firm</th><th>Contact</th><th>Portco</th><th>Lazard Banker</th><th>Type</th><th>Description</th><th>Next Action</th><th>Status</th></tr></thead>
                <tbody>{fActivities.filter(a => firmF === "All" || a.sponsorId === firmF).map(a => { const sp=getSponsor(a.sponsorId); const ct=getContact(a.contactId); const bk=getBanker(a.lazardBankerId); const pc=getPortco(a.portcoId); return <tr key={a.id} onClick={() => setActDetail(a)}><td style={{ color:"#aaa", fontSize:11, whiteSpace:"nowrap" }}>{a.date}</td><td><span className="sn" style={{ fontSize:12 }}>{sp?.name||"—"}</span></td><td style={{ color:"#666", fontSize:11 }}>{ct?.name||"—"}</td><td style={{ fontSize:11 }}>{pc ? <span style={{ background:"#FDF6EE", color:"#7a4a1a", borderRadius:2, fontSize:10, padding:"2px 7px", fontWeight:500 }}>{pc.name}</span> : <span style={{ color:"#ddd" }}>—</span>}</td><td style={{ color:"#1a3a5c", fontSize:11 }}>{bk?.name||"—"}</td><td style={{ fontSize:11 }}>{a.type}</td><td style={{ color:"#666", fontSize:11, maxWidth:160 }}>{a.description}</td><td style={{ color:"#1a3a5c", fontSize:11, maxWidth:140, fontWeight:500 }}>{a.nextAction}</td><td><StatusBadge status={a.status} /></td></tr>; })}</tbody>
              </table>
            )}
          </>
        )}

        {/* DEALS */}
        {tab === "deals" && !contactPage && (
          <>
            <div className="pghdr"><div><div className="pgtit">Deal Tracker</div><div className="pgsub">Buy-Side & Sell-Side Mandates · Pipeline</div></div><button className="abtn" onClick={() => setAddDealOpen(true)}>+ Add Deal</button></div>
            <div className="tb">
              <input className="si" placeholder="Search deals..." value={search} onChange={e => setSearch(e.target.value)} />
              <select className="si" style={{ width: 150 }} value={firmF} onChange={e => setFirmF(e.target.value)}>
                <option value="All">All Firms</option>
                {sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {["All",...DEAL_STATUSES].map(s => <button key={s} className={`fb ${typeF===s?"on":""}`} onClick={() => setTypeF(s)} style={{ fontSize: 10 }}>{s}</button>)}
              {["All",...DEAL_ROLES].map(r => <button key={r} className={`fb ${secF===r?"on":""}`} onClick={() => setSecF(r)}>{r}</button>)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {deals.filter(d => {
                const ms = d.name.toLowerCase().includes(search.toLowerCase()) || (getSponsor(d.sellerSponsorId)?.name || "").toLowerCase().includes(search.toLowerCase());
                const mst = typeF === "All" || d.status === typeF;
                const mr = secF === "All" || d.lazardRole === secF;
                const mf = firmF === "All" || d.sellerSponsorId === firmF;
                return ms && mst && mr && mf;
              }).sort((a, b) => new Date(b.date) - new Date(a.date)).map(d => {
                const seller = getSponsor(d.sellerSponsorId);
                const pc = getPortco(d.portcoId);
                const buySide = (d.buySideFirms || []).map(id => getSponsor(id)).filter(Boolean);
                const ds = DEAL_STATUS_STYLE[d.status] || { bg: "#f0f0f0", text: "#888" };
                const roleColor = d.lazardRole === "Sell-Side" ? { bg: "#EEF2F7", text: "#1a3a5c" } : { bg: "#EEF7F2", text: "#1d5c3a" };
                const dActs = dealActs(d.id);
                return (
                  <div key={d.id} onClick={() => setDealModal(d.id)} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 3, padding: "18px 20px", cursor: "pointer", transition: "border-color .15s", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "#1a3a5c"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "#e8e8e8"}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                          <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 17, color: "#1a3a5c", fontWeight: 700 }}>{d.name}</div>
                          <span style={{ background: roleColor.bg, color: roleColor.text, borderRadius: 2, fontSize: 10, padding: "2px 8px", fontWeight: 700 }}>{d.lazardRole}</span>
                          <span style={{ background: ds.bg, color: ds.text, borderRadius: 2, fontSize: 10, padding: "2px 8px", fontWeight: 600 }}>{d.status}</span>
                          <SectorTag sector={d.sector} />
                        </div>
                        <div style={{ fontSize: 12, color: "#666", marginBottom: 10, lineHeight: 1.5 }}>{d.description?.slice(0, 100)}{d.description?.length > 100 ? "…" : ""}</div>
                        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                          <div>
                            <div style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Seller</div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a1a" }}>{seller?.name || "—"}{pc && <span style={{ color: "#7a4a1a" }}> · {pc.name}</span>}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Buy-Side Pitched</div>
                            <div style={{ fontSize: 12, color: "#1a1a1a" }}>{buySide.length > 0 ? buySide.map(s => s.name).join(", ") : <span style={{ color: "#ccc" }}>None</span>}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Activities</div>
                            <div style={{ fontSize: 12, color: "#1a1a1a" }}>{dActs.length}</div>
                          </div>
                          <div style={{ marginLeft: "auto" }}>
                            <div style={{ fontSize: 9, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Date</div>
                            <div style={{ fontSize: 12, color: "#aaa" }}>{d.date}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {deals.length === 0 && <div className="empty">No deals tracked yet. Add your first deal.</div>}
            </div>
          </>
        )}

        {/* PITCHES */}
        {tab === "pitches" && !contactPage && (
          <>
            <div className="pghdr"><div><div className="pgtit">Pitch Tracker</div><div className="pgsub">Mandate Pipeline</div></div><button className="abtn" onClick={() => setAddActivity(true)}>+ Log Pitch</button></div>
            <div className="tb">
              <input className="si" placeholder="Search pitches..." value={search} onChange={e => setSearch(e.target.value)} />
              {["All",...STATUSES].map(s => <button key={s} className={`fb ${typeF===s?"on":""}`} onClick={() => setTypeF(s)}>{s}</button>)}
            </div>
            <table className="tbl">
              <thead><tr><th>Date</th><th>Firm</th><th>Contact</th><th>Mandate</th><th>Outcome</th><th>Next Action</th><th>Status</th></tr></thead>
              <tbody>{activities.filter(a=>a.type==="Pitch").filter(a => { const sp=getSponsor(a.sponsorId); const ms=!search||(sp&&sp.name.toLowerCase().includes(search.toLowerCase()))||a.description.toLowerCase().includes(search.toLowerCase()); const mst=typeF==="All"||a.status===typeF; return ms&&mst; }).sort((a,b)=>new Date(b.date)-new Date(a.date)).map(a => { const sp=getSponsor(a.sponsorId); const ct=getContact(a.contactId); return <tr key={a.id} onClick={() => setActDetail(a)}><td style={{ color:"#aaa", fontSize:11 }}>{a.date}</td><td><span className="sn" style={{ fontSize:12 }}>{sp?.name||"—"}</span></td><td style={{ color:"#666", fontSize:11 }}>{ct?.name||"—"}</td><td style={{ color:"#444", fontSize:11, maxWidth:200 }}>{a.description}</td><td style={{ color:"#666", fontSize:11 }}>{a.outcome}</td><td style={{ color:"#1a3a5c", fontSize:11, fontWeight:500 }}>{a.nextAction}</td><td><StatusBadge status={a.status} /></td></tr>; })}</tbody>
            </table>
          </>
        )}

        {/* TEAM */}
        {tab === "team" && !contactPage && !bankerPage && (
          <>
            <div className="pghdr"><div><div className="pgtit">Lazard Team</div><div className="pgsub">Internal Banker Directory</div></div><button className="abtn" onClick={() => setAddBanker(true)}>+ Add Banker</button></div>
            <div className="tb">
              <input className="si" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
              {!isMobile && ["All","Sponsor Coverage",...SECTORS].map(s => <button key={s} className={`fb ${secF===s?"on":""}`} onClick={() => setSecF(s)} style={{ fontSize:9 }}>{s}</button>)}
              {isMobile && <select className="si" style={{ flex: 1 }} value={secF} onChange={e => setSecF(e.target.value)}><option value="All">All Roles</option><option value="Sponsor Coverage">Sponsor Coverage</option>{SECTORS.map(s => <option key={s} value={s}>{s}</option>)}</select>}
            </div>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill,minmax(270px,1fr))", gap: isMobile ? 10 : 12 }}>
              {bankers.filter(b=>b.name.toLowerCase().includes(search.toLowerCase())&&(secF==="All"||b.sector===secF||( secF==="Sponsor Coverage"&&b.sponsorCoverage))).map(b => {
                const covered = contacts.filter(c=>(c.lazardMappings||[]).includes(b.id));
                const bActs = activities.filter(a=>a.lazardBankerId===b.id);
                return (
                  <div key={b.id} onClick={() => setBankerPage(b.id)} style={{ background:"#fff", border:"1px solid #eee", borderRadius:3, padding:18, boxShadow:"0 1px 4px rgba(0,0,0,0.03)", cursor:"pointer", transition:"border-color .15s" }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#1a3a5c"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="#eee"}>
                    <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
                      <Avatar name={b.name} size={40} />
                      <div>
                        <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:16, color:"#1a3a5c", fontWeight:700 }}>{b.name}</div>
                        <div style={{ fontSize:10, color:"#aaa" }}>{b.title}</div>
                        <BankerTag banker={b} />
                      </div>
                    </div>
                    <div style={{ fontSize:11, color:"#aaa", marginBottom:2 }}>{b.email}</div>
                    <div style={{ fontSize:11, color:"#aaa", marginBottom:12 }}>{b.phone}</div>
                    <div style={{ display:"flex", gap:16 }}>
                      <div><div style={{ fontSize:18, color:"#1a3a5c", fontFamily:"Cormorant Garamond,serif", fontWeight:700 }}>{covered.length}</div><div style={{ fontSize:9, color:"#bbb", textTransform:"uppercase", letterSpacing:"0.1em" }}>Contacts</div></div>
                      <div><div style={{ fontSize:18, color:"#1a3a5c", fontFamily:"Cormorant Garamond,serif", fontWeight:700 }}>{bActs.length}</div><div style={{ fontSize:9, color:"#bbb", textTransform:"uppercase", letterSpacing:"0.1em" }}>Activities</div></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* BANKER PAGE */}
        {tab === "team" && bankerPage && !contactPage && <BankerPage />}

        {/* EXPORT */}
        {tab === "export" && <ExportTab />}
      </div>

      {/* MODALS */}
      {actDetail && <ActDetail />}
      {contactModal && <ContactModal />}
      {portcoModal && <PortcoModal />}
      {dealModal && <DealModal />}
      {editAct && <Modal title="Edit Activity" onClose={() => setEditAct(null)} width={700}><ActivityForm initial={editAct} sponsors={sponsors} contacts={contacts} bankers={bankers} portcos={portcos} deals={deals} onSave={saveActivity} onClose={() => setEditAct(null)} /></Modal>}
      {addSponsor && <Modal title="Add PE Firm" onClose={() => setAddSponsor(false)} width={680}><SponsorForm onSave={saveSponsor} onClose={() => setAddSponsor(false)} /></Modal>}
      {editSponsorD && <Modal title={`Edit — ${editSponsorD.name}`} onClose={() => setEditSponsorD(null)} width={680}><SponsorForm initial={editSponsorD} onSave={saveSponsor} onClose={() => setEditSponsorD(null)} /></Modal>}
      {addContact && <Modal title="Add PE Contact" onClose={() => setAddContact(false)} width={720}><ContactForm sponsors={sponsors} bankers={bankers} onSave={saveContact} onClose={() => setAddContact(false)} /></Modal>}
      {editContactD && <Modal title={`Edit — ${editContactD.name}`} onClose={() => setEditContactD(null)} width={720}><ContactForm initial={editContactD} sponsors={sponsors} bankers={bankers} onSave={saveContact} onClose={() => setEditContactD(null)} /></Modal>}
      {addActivity && <Modal title="Log Activity" onClose={() => setAddActivity(false)} width={700}><ActivityForm sponsors={sponsors} contacts={contacts} bankers={bankers} portcos={portcos} deals={deals} onSave={saveActivity} onClose={() => setAddActivity(false)} /></Modal>}
      {addPortcoOpen && <Modal title="Add Portfolio Company" onClose={() => setAddPortcoOpen(false)} width={680}><PortcoForm sponsorId={firmPage} contacts={contacts} onSave={savePortco} onClose={() => setAddPortcoOpen(false)} /></Modal>}
      {editPortcoD && <Modal title={`Edit — ${editPortcoD.name}`} onClose={() => setEditPortcoD(null)} width={680}><PortcoForm initial={editPortcoD} sponsorId={editPortcoD.sponsorId} contacts={contacts} onSave={savePortco} onClose={() => setEditPortcoD(null)} /></Modal>}
      {addDealOpen && <Modal title="Add Deal" onClose={() => setAddDealOpen(false)} width={720}><DealForm sponsors={sponsors} portcos={portcos} onSave={saveDeal} onClose={() => setAddDealOpen(false)} /></Modal>}
      {editDealD && <Modal title={`Edit — ${editDealD.name}`} onClose={() => setEditDealD(null)} width={720}><DealForm initial={editDealD} sponsors={sponsors} portcos={portcos} onSave={saveDeal} onClose={() => setEditDealD(null)} /></Modal>}
      {addBanker && <Modal title="Add Lazard Banker" onClose={() => setAddBanker(false)} width={520}>
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <Fld label="Full Name"><input style={IS} value={bankerForm.name} onChange={e => setBankerForm(p=>({...p,name:e.target.value}))} /></Fld>
            <Fld label="Title"><select style={SS} value={bankerForm.title} onChange={e => setBankerForm(p=>({...p,title:e.target.value}))}>{LZ_TITLES.map(t=><option key={t} value={t}>{t}</option>)}</select></Fld>
            <Fld label="Sector"><select style={SS} value={bankerForm.sector} onChange={e => setBankerForm(p=>({...p,sector:e.target.value}))}>{SECTORS.map(s=><option key={s} value={s}>{s}</option>)}</select></Fld>
            <Fld label="Email"><input style={IS} value={bankerForm.email} onChange={e => setBankerForm(p=>({...p,email:e.target.value}))} /></Fld>
            <Fld label="Phone"><input style={IS} value={bankerForm.phone} onChange={e => setBankerForm(p=>({...p,phone:e.target.value}))} /></Fld>
          </div>
          <div style={{ display:"flex", gap:8, marginTop:8 }}>
            <button style={SaveBtn} onClick={() => { saveBanker(bankerForm); setBankerForm({name:"",title:"Managing Director",sector:"Industrials",email:"",phone:""}); setAddBanker(false); }}>Add Banker</button>
            <button style={CancelBtn} onClick={() => setAddBanker(false)}>Cancel</button>
          </div>
        </div>
      </Modal>}
      {editBankerD && <Modal title={`Edit — ${editBankerD.name}`} onClose={() => setEditBankerD(null)} width={520}><BankerEditForm initial={editBankerD} onSave={b => { saveBanker(b); setEditBankerD(null); }} onClose={() => setEditBankerD(null)} /></Modal>}
    </div>
  );
}