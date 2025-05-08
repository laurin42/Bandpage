export const bioDescriptions: { [key: string]: string } = {
  alex: "ist der charismatische Frontmann und Lead-Sänger. Seine kraftvolle Stimme und energiegeladene Bühnenpräsenz ziehen das Publikum in den Bann. Er schreibt die meisten Songtexte.",
  luca: "zaubert an der Leadgitarre. Seine Soli sind legendär und reichen von gefühlvollen Melodien bis zu schnellen Riffs. Er ist der kreative Kopf hinter vielen Arrangements.",
  lenny:
    "sorgt am Schlagzeug für den nötigen Groove und ein sicheres Timing – das Rückgrat unseres Sounds. Nebenbei kümmert er sich auch um alles, was mit Musikproduktion zu tun hat: Aufnehmen, Mixen und Mastern – alles aus einer Hand.",
  max: "liefert an der Rhythmusgitarre das solide Fundament. Seine Akkorde und Rhythmen geben den Songs Struktur und Drive. Er ist das harmonische Uhrwerk der Band.",
  laurin:
    "bedient den Bass und sorgt für die tiefen Frequenzen. Seine Basslines sind groovig und melodisch zugleich. Er verbindet Rhythmus und Harmonie auf einzigartige Weise.",
};

export const sectionIds = [
  "home",
  "music",
  "social",
  "alex",
  "luca",
  "lenny",
  "max",
  "laurin",
  "ueber-uns-desktop",
  "konzerte",
  "footer-section",
];

export const sectionToLogicalGroup = (id: string): string => {
  if (["alex", "luca", "lenny", "max", "laurin"].includes(id)) {
    return "ueber-uns";
  }
  if (id === "ueber-uns-desktop") {
    return "ueber-uns";
  }
  if (id === "music") {
    return "musik";
  }
  if (id === "konzerte") {
    return "konzerte";
  }
  if (id === "social") {
    return "social";
  }
  if (id === "footer-section") {
    return "footer";
  }
  return "default";
};

export const pathToSectionId: { [key: string]: string } = {
  "/musik": "music",
  "/konzerte": "konzerte",
  "/social": "social",
  "/ueber-uns": "ueber-uns-desktop",
}; 