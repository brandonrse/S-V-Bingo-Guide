export const areCompatible = (p1, p2) => {
  if (!p1 || !p2) { return false; }

  if (p1.eggGroups.includes("undiscovered") || p2.eggGroups.includes("undiscovered") || p1.eggGroups.includes("no-eggs") || p2.eggGroups.includes("no-eggs")) {
    return false;
  }

  if ((p1.name === "ditto" && p2.name === "ditto") || (p1.name === "manaphy" && p2.name !== "ditto") || (p1.name !== "ditto" && p2.name === "manaphy")) {
    return false;
  }

  if (p1.genderRate === -1 || p2.genderRate === -1) {
    return p1.eggGroups.includes("ditto") || p2.eggGroups.includes("ditto");
  }

  if ((p1.genderRate === 0 && p2.genderRate === 0) || (p1.genderRate === 8 && p2.genderRate === 8)) {
    return false;
  }

  const overlap = p1.eggGroups.some(g => p2.eggGroups.includes(g));
  if (!overlap) { return false; }

  return true;
}