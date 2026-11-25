import type { EvidenceCard } from "../types";

export const COGNITION_CARDS: EvidenceCard[] = [
  {
    id: "l-theanine",
    slug: "l-theanine",
    ingredient: "L-theanine",
    aliases: ["theanine", "Suntheanine", "tea amino acid"],
    category: "Cognition",
    form: "Free-form L-theanine capsule or powder",
    route: "oral",
    claim: "L-theanine reliably reduces anxiety in healthy adults.",
    verdict: "preliminary",
    explanation: "Small, short studies suggest possible stress or anxiety improvements, but many combine theanine with caffeine or other ingredients. The specific effect of L-theanine alone and its durability are unclear.",
    labelClue: "Theanine may be listed as L-theanine or a branded form; tea extracts supply variable amounts and may also contain caffeine.",
    safetyNote: "It is usually well tolerated, but high intake may cause headache or digestive upset.",
    sourceIds: ["medlineplus-theanine", "nccih-atoz", "fda-structure-function"],
    tags: ["anxiety", "stress", "amino-acid"]
  },
  {
    id: "l-tyrosine",
    slug: "l-tyrosine",
    ingredient: "L-tyrosine",
    aliases: ["tyrosine", "N-acetyl-L-tyrosine", "NALT"],
    category: "Cognition",
    form: "Free-form L-tyrosine or N-acetyl-L-tyrosine",
    route: "oral",
    claim: "L-tyrosine improves cognitive performance during acute stress in healthy adults.",
    verdict: "preliminary",
    explanation: "Small studies in stress or sleep-loss settings suggest possible task-specific benefits, but results do not generalize to everyday cognition. Long-term effects and superiority of NALT over free-form tyrosine are unproven.",
    labelClue: "L-tyrosine and NALT are different label entries, and nootropics often hide the amount inside a proprietary blend.",
    safetyNote: "It can interact with levodopa and monoamine oxidase inhibitor medicines.",
    sourceIds: ["ods-exercise", "medlineplus-all", "fda-structure-function"],
    tags: ["stress", "cognition", "amino-acid"]
  },
  {
    id: "phosphatidylserine",
    slug: "phosphatidylserine",
    ingredient: "Phosphatidylserine",
    aliases: ["PS", "soy phosphatidylserine", "bovine phosphatidylserine"],
    category: "Cognition",
    form: "Phosphatidylserine phospholipid from soy, sunflower, or bovine sources",
    route: "oral",
    claim: "Phosphatidylserine improves memory in healthy older adults.",
    verdict: "preliminary",
    explanation: "Some small trials in older adults report memory benefits, but study quality and product sources vary. There is no robust evidence that it prevents dementia or produces large, lasting cognitive gains.",
    labelClue: "Look for phosphatidylserine content and the source; soy-derived and bovine-derived products are not interchangeable for dietary preferences.",
    safetyNote: "It may cause insomnia or digestive upset in some people.",
    sourceIds: ["medlineplus-all", "nccih-atoz", "fda-structure-function"],
    tags: ["memory", "aging", "phospholipid"]
  }
];
