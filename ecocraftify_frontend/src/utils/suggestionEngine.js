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
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=400&q=80",
    steps: [
      "Collect colorful plastic bottle caps of various sizes.",
      "Cut a base from cardboard or a sturdy board to your desired shape.",
      "Arrange the bottle caps into a mosaic design on the base.",
      "Glue each cap firmly to the base using strong craft glue.",
      "Let it dry completely before hanging or displaying your artwork."
    ]
  },
  {
    id: 2,
    title: "Tin Can Lanterns",
    description:
      "Turn empty tin cans into lovely outdoor lanterns. Punch decorative holes and illuminate your garden with upcycled charm.",
    relatedWasteItems: ["Tin Cans", "Soup Cans", "Can Lids", "Candles"],
    imageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?fit=crop&w=400&q=80",
    steps: [
      "Clean the empty tin cans and remove any labels.",
      "Fill each can with water and freeze overnight to help with punching holes.",
      "Draw a simple design on the outside of the can.",
      "Use a hammer and nail to punch holes along your design lines.",
      "Let the ice melt and empty the water, then dry the can.",
      "Place a candle or LED light inside and enjoy your lantern."
    ]
  },
  {
    id: 3,
    title: "Fabric Scrap Coasters",
    description:
      "Repurpose leftover fabric into trendy, washable coasters. Personalize with your favorite patterns!",
    relatedWasteItems: ["Fabric Scraps", "Clothes", "Old Shirts", "Jeans"],
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?fit=crop&w=400&q=80",
    steps: [
      "Cut fabric scraps into circles or squares of equal size.",
      "Layer two pieces of fabric with the patterns facing out.",
      "Sew around the edges, leaving a small opening.",
      "Turn the coaster right side out and iron it flat.",
      "Sew the small opening closed, and optionally top-stitch around the edge for durability."
    ]
  },
  {
    id: 4,
    title: "Glass Jar Herb Garden",
    description:
      "Reuse glass jars to plant kitchen herbs for a mini-garden on your windowsill.",
    relatedWasteItems: ["Glass Jars", "Mason Jars", "Jam Jars"],
    imageUrl: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?fit=crop&w=400&q=80",
    steps: [
      "Wash and dry the glass jars thoroughly.",
      "Place small stones or pebbles at the bottom for drainage.",
      "Fill each jar with potting soil.",
      "Plant herb seeds or small herb plants into the soil.",
      "Label the jars and place them in a sunny window.",
      "Water regularly and watch your herbs grow."
    ]
  },
  {
    id: 5,
    title: "Cardboard Organizer Tray",
    description:
      "Transform cardboard boxes into eco-friendly organizers or drawer dividers.",
    relatedWasteItems: ["Cardboard", "Shoebox", "Corrugated Box"],
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?fit=crop&w=400&q=80",
    steps: [
      "Find a clean cardboard box, such as a shoebox.",
      "Cut the box to your desired height for a tray.",
      "Cut extra strips of cardboard for dividers, if desired.",
      "Arrange and glue dividers as needed for different sections.",
      "Optionally, cover the box with decorative paper or paint.",
      "Let dry and use as a drawer organizer or desktop tray."
    ]
  },
  {
    id: 6,
    title: "Paper Bead Jewelry",
    description:
      "Create beautiful, lightweight jewelry by rolling upcycled magazines or colored paper.",
    relatedWasteItems: ["Paper", "Old Magazines", "Newspapers"],
    imageUrl: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?fit=crop&w=400&q=80",
    steps: [
      "Cut colorful paper into long, narrow triangles.",
      "Start rolling the wide end of a triangle tightly around a toothpick or skewer.",
      "Apply glue near the tip and roll to finish the bead.",
      "Slide the bead off and let it dry completely.",
      "String beads onto elastic or thread to create necklaces or bracelets."
    ]
  },
  {
    id: 7,
    title: "CD Sun Catcher",
    description:
      "Repurpose scratched CDs/DVDs into shimmering window sun catchers.",
    relatedWasteItems: ["CDs", "DVDs", "Disc"],
    imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?fit=crop&w=400&q=80",
    steps: [
      "Clean any dust off old CDs or DVDs.",
      "Draw or trace a design with marker on the shiny side.",
      "Carefully cut the CDs into shapes using strong scissors.",
      "Punch a small hole at the top of each piece.",
      "Thread string or fishing line through the holes.",
      "Hang your CD pieces in a sunny window for a colorful light show."
    ]
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
