export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: "Housekeeping" | "Boiler treatment" | "Water treatment" | "Construction" | "Industrial";
  summary: string;
  applications: string[];
  image: string;
  accent: string;
};

export const products: Product[] = [
  { id: "D1", slug: "bathroom-cleaner", name: "Bathroom Cleaner", shortName: "D1", category: "Housekeeping", summary: "Daily cleaning and sanitizing for bathroom floors, tiles, sinks and fittings.", applications: ["Bathrooms", "Tiles", "Wash basins"], image: "/products/D1.png", accent: "#1769d2" },
  { id: "D2", slug: "all-purpose-cleaner", name: "All Purpose Cleaner", shortName: "D2", category: "Housekeeping", summary: "A versatile cleaner for routine soil and stains on washable hard surfaces.", applications: ["Floors", "Counters", "Hard surfaces"], image: "/products/D2.png", accent: "#2563eb" },
  { id: "D3", slug: "glass-cleaner", name: "Glass Cleaner", shortName: "D3", category: "Housekeeping", summary: "Fast glass and mirror cleaning designed for a clear, low-residue finish.", applications: ["Glass", "Mirrors", "Windows"], image: "/products/D3.png", accent: "#0284c7" },
  { id: "D4", slug: "furniture-cleaner", name: "Furniture Cleaner", shortName: "D4", category: "Housekeeping", summary: "Routine cleaning and shine for suitable finished furniture surfaces.", applications: ["Office furniture", "Wood finishes", "Fixtures"], image: "/products/D4.png", accent: "#2257a8" },
  { id: "D5", slug: "air-freshener", name: "Air Freshener", shortName: "D5", category: "Housekeeping", summary: "Liquid room freshener for commercial and workplace environments.", applications: ["Offices", "Hospitality", "Common areas"], image: "/products/D5.png", accent: "#3878d8" },
  { id: "D6", slug: "toilet-bowl-cleaner", name: "Toilet Bowl Cleaner", shortName: "D6", category: "Housekeeping", summary: "Targeted toilet bowl cleaner for routine mineral and soil removal.", applications: ["Toilet bowls", "Commercial washrooms", "Facilities"], image: "/products/D6.png", accent: "#1556b4" },
  { id: "D7", slug: "floor-cleaner-concentrate", name: "Floor Cleaner Concentrate", shortName: "D7", category: "Housekeeping", summary: "Concentrated cleaner for demanding floor and washable surface maintenance.", applications: ["Floors", "Workshops", "Commercial spaces"], image: "/products/D7.png", accent: "#0e75bd" },
  { id: "D8", slug: "kettle-descaler", name: "Kettle Descaler", shortName: "D8", category: "Industrial", summary: "Descaling product for suitable kettles, equipment and mineral deposits.", applications: ["Kettles", "Small equipment", "Scale removal"], image: "/products/D8.png", accent: "#294e91" },
  { id: "D9", slug: "hard-stain-remover", name: "Hard Stain Remover", shortName: "D9", category: "Housekeeping", summary: "Specialist cleaner for persistent water marks on compatible bathroom surfaces.", applications: ["Bathroom walls", "Fittings", "Mineral stains"], image: "/products/D9.png", accent: "#315fc4" },
  { id: "770", slug: "boiler-antiscalant-770", name: "Boiler Antiscalant 770", shortName: "770", category: "Boiler treatment", summary: "Boiler feed-water treatment used to control scale and sludge formation.", applications: ["Boiler feed water", "Scale control", "Sludge control"], image: "/brochure/laboratory.webp", accent: "#086e9d" },
  { id: "790", slug: "oxygen-scavenger-790", name: "Oxygen Scavenger 790", shortName: "790", category: "Boiler treatment", summary: "Feed-water treatment intended to reduce dissolved oxygen and corrosion risk.", applications: ["Boiler feed water", "Corrosion control", "Tube protection"], image: "/brochure/industrial-boiler.webp", accent: "#0d5fa8" },
  { id: "741", slug: "ph-booster-741", name: "pH Booster 741", shortName: "741", category: "Boiler treatment", summary: "Treatment used to counter a fall in water pH after salt removal.", applications: ["Boiler systems", "RO permeate", "pH adjustment"], image: "/brochure/ro-system.webp", accent: "#1282b7" },
  { id: "FP1", slug: "fireside-powder", name: "Fireside Powder", shortName: "FP", category: "Boiler treatment", summary: "Fireside additive for furnace operation, slag control and carbon-deposit reduction.", applications: ["Boiler furnaces", "Slag control", "Fuel-side treatment"], image: "/brochure/industrial-boiler.webp", accent: "#164e87" },
  { id: "RO1", slug: "ro-antiscalant", name: "RO Antiscalant", shortName: "RO", category: "Water treatment", summary: "Membrane-treatment chemical used to help prevent scaling in reverse-osmosis systems.", applications: ["RO membranes", "Feed-water treatment", "TDS-management systems"], image: "/brochure/industrial-ro.webp", accent: "#087ea4" },
  { id: "CT1", slug: "cooling-tower-antiscalant", name: "Cooling Tower Antiscalant", shortName: "CT", category: "Water treatment", summary: "Application-led scale-control treatment for recirculating cooling-water systems.", applications: ["Cooling towers", "Recirculating water", "Scale control"], image: "/brochure/cooling-tower.webp", accent: "#0369a1" },
  { id: "BIO", slug: "cooling-water-biocide", name: "Cooling Water Biocide", shortName: "BIO", category: "Water treatment", summary: "Microbiological-control treatment for suitable cooling-tower programs.", applications: ["Cooling towers", "Bacterial control", "Water hygiene"], image: "/brochure/cooling-tower.webp", accent: "#0f749c" },
  { id: "AC1", slug: "anticorrosion-chemical", name: "Anticorrosion Chemical", shortName: "AC", category: "Water treatment", summary: "Corrosion-control chemistry selected around the system, water quality and operating conditions.", applications: ["Cooling systems", "Process water", "Metal protection"], image: "/brochure/laboratory.webp", accent: "#1d6396" },
  { id: "DS1", slug: "industrial-descaling-programme", name: "Industrial Descaling Programme", shortName: "DS", category: "Industrial", summary: "A reviewed cleaning program for scale removal in boilers, heat exchangers and compatible equipment.", applications: ["Boilers", "Heat exchangers", "Pipework"], image: "/brochure/descaling-result.webp", accent: "#165f8f" },
  { id: "WT1", slug: "water-treatment-programme", name: "Water Treatment Programme", shortName: "WT", category: "Water treatment", summary: "Application-led treatment enquiries for boilers, cooling towers, RO systems, softeners and resins.", applications: ["Boilers", "Cooling towers", "RO systems"], image: "/brochure/water-softener.webp", accent: "#0369a1" }
];

export const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))] as const;
export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
