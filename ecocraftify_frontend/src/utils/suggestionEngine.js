//
// suggestionEngine.js
//
// Provides a function to suggest DIY upcycling projects based on input waste items.
// Simple rule-based matching on keywords/materials. Each project has title, description, and related waste items.
//

// --- Core data: Sample project ideas ---
const PROJECT_DATABASE = [
  {
    id: 1,
    title: "Bottle Cap Mosaic Art",
    description:
      "Upcycle colorful plastic bottle caps into stunning mosaic wall art. Easy, vibrant, and totally unique!",
    relatedWasteItems: ["Bottle Caps", "Plastic Caps", "Plastic Bottles", "Cardboard"],
  },
  {
    id: 2,
    title: "Tin Can Lanterns",
    description:
      "Turn empty tin cans into lovely outdoor lanterns. Punch decorative holes and illuminate your garden with upcycled charm.",
    relatedWasteItems: ["Tin Cans", "Soup Cans", "Can Lids", "Candles"],
  },
  {
    id: 3,
    title: "Fabric Scrap Coasters",
    description:
      "Repurpose leftover fabric into trendy, washable coasters. Personalize with your favorite patterns!",
    relatedWasteItems: ["Fabric Scraps", "Clothes", "Old Shirts", "Jeans"],
  },
  {
    id: 4,
    title: "Glass Jar Herb Garden",
    description:
      "Reuse glass jars to plant kitchen herbs for a mini-garden on your windowsill.",
    relatedWasteItems: ["Glass Jars", "Mason Jars", "Jam Jars"],
  },
  {
    id: 5,
    title: "Cardboard Organizer Tray",
    description:
      "Transform cardboard boxes into eco-friendly organizers or drawer dividers.",
    relatedWasteItems: ["Cardboard", "Shoebox", "Corrugated Box"],
  },
  {
    id: 6,
    title: "Paper Bead Jewelry",
    description:
      "Create beautiful, lightweight jewelry by rolling upcycled magazines or colored paper.",
    relatedWasteItems: ["Paper", "Old Magazines", "Newspapers"],
  },
  {
    id: 7,
    title: "CD Sun Catcher",
    description:
      "Repurpose scratched CDs/DVDs into shimmering window sun catchers.",
    relatedWasteItems: ["CDs", "DVDs", "Disc"],
  },
  // Add more projects as needed
];

// Helper: normalize/standardize strings for better matching
function normalize(str) {
  return String(str || "")
    .trim()
    .toLowerCase()
    .replace(/s$/, ""); // crude plural handling
}

// PUBLIC_INTERFACE
/**
 * Suggest upcycling project ideas based on user-provided waste items.
 *
 * @param {string[]} wasteItems - Array of waste item strings.
 * @returns {Array<{title: string, description: string, relatedWasteItems: string[]}>}
 */
export function getSuggestedProjects(wasteItems = []) {
  // No input? Return popular/all projects (up to 3).
  if (!Array.isArray(wasteItems) || wasteItems.length === 0)
    return PROJECT_DATABASE.slice(0, 3);

  // Attempt to match projects where any relatedWasteItem is close to a user item
  const normWaste = wasteItems.map(normalize);

  const scoredProjects = PROJECT_DATABASE.map((proj) => {
    // Count # of relevant wasteItem matches (simple keyword/plural insensitive)
    const matchCount = proj.relatedWasteItems.reduce((acc, rel) => {
      const relNorm = normalize(rel);
      return (
        acc +
        (normWaste.some(
          (wi) =>
            wi === relNorm ||
            wi.includes(relNorm) ||
            relNorm.includes(wi)
        )
          ? 1
          : 0)
      );
    }, 0);
    return { ...proj, _score: matchCount };
  });

  // Only include those with matches, or fallback to "top 3" if no match
  const filtered =
    scoredProjects.filter((p) => p._score > 0).length > 0
      ? scoredProjects.filter((p) => p._score > 0)
      : PROJECT_DATABASE.slice(0, 3);

  // Sort by # matches, then by title
  return filtered
    .sort((a, b) => b._score - a._score || a.title.localeCompare(b.title))
    .map(({ _score, ...proj }) => proj);
}
