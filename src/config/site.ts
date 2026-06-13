// Business configuration — fill in TODOs before launch.
// Keep all contact info, areas and copy here so edits never touch components.

export const SITE_CONFIG = {
  // ─── Business identity ───────────────────────────────────────────────────
  businessName: 'TODO: Business Name',       // e.g. "Dublin Mobile Detailing"
  tagline: 'Premium Mobile Detailing. We Come to You.',

  // ─── Contact ────────────────────────────────────────────────────────────
  phone: '+353 TODO',                         // e.g. "+353 87 123 4567"
  phoneDisplay: 'TODO Phone',                 // shown in UI, e.g. "087 123 4567"
  whatsapp: '+353TODO',                       // no spaces/dashes — used in wa.me link
  email: 'TODO@example.com',

  // ─── Social ─────────────────────────────────────────────────────────────
  social: {
    instagram: 'https://instagram.com/TODO',
    tiktok: 'https://tiktok.com/@TODO',
    facebook: 'https://facebook.com/TODO',
  },

  // ─── Hours ──────────────────────────────────────────────────────────────
  hours: 'Mon–Sat 8am–7pm · Sun 9am–5pm',   // TODO: confirm with client

  // ─── Reviews / trust ────────────────────────────────────────────────────
  googleRating: '5.0',     // TODO: replace with real Google rating
  reviewCount: '47',       // TODO: replace with real review count
  carsDetailed: '200+',    // TODO: update counter
  yearsActive: '3',        // TODO: update

  // ─── Eircode routing keys covered ───────────────────────────────────────
  // First 3 chars of an Irish Eircode (e.g. "D04"). Add/remove as needed.
  coveredEircodes: [
    'D01','D02','D03','D04','D05','D06','D07','D08','D09','D10',
    'D11','D12','D13','D14','D15','D16','D17','D18','D20','D22','D24',
    'A94','A96',
  ],

  // ─── Service areas (for SEO block + LocalBusiness schema) ───────────────
  areas: [
    'Clontarf', 'Drumcondra', 'Glasnevin', 'Phibsborough',
    'Rathgar', 'Rathmines', 'Ranelagh', 'Donnybrook',
    'Ballsbridge', 'Sandymount', 'Ringsend', 'Portobello',
    "Harold's Cross", 'Terenure', 'Templeogue', 'Crumlin',
    'Drimnagh', 'Inchicore', 'Kilmainham', 'Stoneybatter',
    'Cabra', 'Finglas', 'Artane', 'Raheny',
    'Sutton', 'Howth', 'Malahide', 'Swords',
    'Blanchardstown', 'Castleknock', 'Lucan', 'Clondalkin',
    'Tallaght', 'Dundrum', 'Stillorgan', 'Blackrock',
    'Dún Laoghaire', 'Dalkey', 'Killiney',
  ],

  // ─── Form ───────────────────────────────────────────────────────────────
  formspreeId: 'TODO_FORM_ID',              // get free endpoint at formspree.io

  // ─── SEO / meta ─────────────────────────────────────────────────────────
  seo: {
    title: 'Mobile Car Detailing Dublin | We Come to You',
    description:
      'Premium mobile car detailing in Dublin. We bring the studio to your door — fully insured, own water & power. Get an instant estimate.',
    url: 'https://TODO.ie',                  // TODO: set production domain
    ogImage: '/og-image.jpg',
  },
} as const
