export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: "Boiler treatment" | "Water treatment" | "Industrial";
  summary: string;
  applications: string[];
  image: string;
  accent: string;
};

export const products: Product[] = [
  { id: "770", slug: "boiler-antiscalant-770", name: "Boiler Antiscalant 770", shortName: "770", category: "Boiler treatment", summary: "Boiler feed-water treatment used to control scale and sludge formation.", applications: ["Boiler feed water", "Scale control", "Sludge control"], image: "/products/industrial/boiler-antiscalant.webp", accent: "#086e9d" },
  { id: "790", slug: "oxygen-scavenger-790", name: "Oxygen Scavenger 790", shortName: "790", category: "Boiler treatment", summary: "Feed-water treatment intended to reduce dissolved oxygen and corrosion risk.", applications: ["Boiler feed water", "Corrosion control", "Tube protection"], image: "/products/industrial/oxygen-scavenger.webp", accent: "#0d5fa8" },
  { id: "741", slug: "ph-booster-741", name: "pH Booster 741", shortName: "741", category: "Boiler treatment", summary: "Treatment used to counter a fall in water pH after salt removal.", applications: ["Boiler systems", "RO permeate", "pH adjustment"], image: "/products/industrial/ph-booster.webp", accent: "#1282b7" },
  { id: "FP1", slug: "fireside-powder", name: "Fireside Powder", shortName: "FP", category: "Boiler treatment", summary: "Fireside additive for furnace operation, slag control and carbon-deposit reduction.", applications: ["Boiler furnaces", "Slag control", "Fuel-side treatment"], image: "/products/industrial/fireside-treatment.webp", accent: "#164e87" },
  { id: "RO1", slug: "ro-antiscalant", name: "RO Antiscalant", shortName: "RO", category: "Water treatment", summary: "Membrane-treatment chemical used to help prevent scaling in reverse-osmosis systems.", applications: ["RO membranes", "Feed-water treatment", "TDS-management systems"], image: "/products/industrial/ro-antiscalant.webp", accent: "#087ea4" },
  { id: "CT1", slug: "cooling-tower-antiscalant", name: "Cooling Tower Antiscalant", shortName: "CT", category: "Water treatment", summary: "Application-led scale-control treatment for recirculating cooling-water systems.", applications: ["Cooling towers", "Recirculating water", "Scale control"], image: "/products/industrial/cooling-tower-antiscalant.webp", accent: "#0369a1" },
  { id: "BIO", slug: "cooling-water-biocide", name: "Cooling Water Biocide", shortName: "BIO", category: "Water treatment", summary: "Microbiological-control treatment for suitable cooling-tower programs.", applications: ["Cooling towers", "Bacterial control", "Water hygiene"], image: "/products/industrial/cooling-water-biocide.webp", accent: "#0f749c" },
  { id: "AC1", slug: "anticorrosion-chemical", name: "Anticorrosion Chemical", shortName: "AC", category: "Water treatment", summary: "Corrosion-control chemistry selected around the system, water quality and operating conditions.", applications: ["Cooling systems", "Process water", "Metal protection"], image: "/products/industrial/anticorrosion.webp", accent: "#1d6396" },
  { id: "DS1", slug: "industrial-descaling-programme", name: "Industrial Descaling Programme", shortName: "DS", category: "Industrial", summary: "A reviewed cleaning program for scale removal in boilers, heat exchangers and compatible equipment.", applications: ["Boilers", "Heat exchangers", "Pipework"], image: "/products/industrial/descaling.webp", accent: "#165f8f" },
  { id: "WT1", slug: "water-treatment-programme", name: "Water Treatment Programme", shortName: "WT", category: "Water treatment", summary: "Application-led treatment enquiries for boilers, cooling towers, RO systems, softeners and resins.", applications: ["Boilers", "Cooling towers", "RO systems"], image: "/products/industrial/water-treatment.webp", accent: "#0369a1" }
];

export const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))] as const;
export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
