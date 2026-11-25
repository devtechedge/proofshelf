import type { EvidenceCard } from "../types";

export const MUSHROOM_CARDS: EvidenceCard[] = [
  {
    id: "lions-mane",
    slug: "lions-mane",
    ingredient: "Lion's mane",
    aliases: ["Hericium erinaceus", "yamabushitake", "hedgehog mushroom"],
    category: "Medicinal mushrooms",
    form: "Fruiting-body or mycelium extract",
    route: "oral",
    claim: "Lion's mane improves memory in healthy older adults.",
    verdict: "preliminary",
    explanation: "Human studies are small, short, and sometimes uncontrolled, so cognitive findings remain preliminary. Laboratory evidence for nerve growth does not establish a reliable memory benefit.",
    labelClue: "Look for Hericium erinaceus and whether the product uses fruiting bodies, mycelium, or an extract; beta-glucan percentages are not standardized across products.",
    safetyNote: "It may cause digestive upset or allergic reactions in people sensitive to mushrooms.",
    sourceIds: ["medlineplus-all", "nccih-atoz", "fda-structure-function"],
    tags: ["memory", "cognition", "mushroom"]
  },
  {
    id: "reishi",
    slug: "reishi",
    ingredient: "Reishi",
    aliases: ["Ganoderma lingzhi", "Ganoderma lucidum", "lingzhi"],
    category: "Medicinal mushrooms",
    form: "Reishi fruiting-body extract or mycelium preparation",
    route: "oral",
    claim: "Reishi prevents infections by boosting immune function in humans.",
    verdict: "unsupported",
    explanation: "Most immune evidence is laboratory or animal work, and small cancer-adjunct studies do not establish infection prevention. No robust human trial supports this broad immune claim.",
    labelClue: "Look for the Ganoderma species, plant part, and extract type; triterpene or beta-glucan percentages do not prove infection prevention.",
    safetyNote: "Reishi can affect bleeding and has rare liver-safety concerns with concentrated products.",
    sourceIds: ["medlineplus-reishi", "medlineplus-all", "nccih-wise-use"],
    tags: ["immune", "infection", "mushroom"]
  },
  {
    id: "turkey-tail",
    slug: "turkey-tail",
    ingredient: "Turkey tail",
    aliases: ["Trametes versicolor", "Coriolus versicolor", "PSK", "PSP"],
    category: "Medicinal mushrooms",
    form: "Turkey tail fruiting-body powder or polysaccharide extract",
    route: "oral",
    claim: "Turkey tail supplements improve immune response to cancer treatment.",
    verdict: "preliminary",
    explanation: "Some small adjunct studies report immune or treatment-related outcomes, but many use specific PSK or PSP extracts rather than ordinary turkey tail powder. The evidence is not sufficient for a general clinical-benefit claim.",
    labelClue: "Look for Trametes or Coriolus species, fruiting body versus mycelium, and any PSK or PSP standardization; these are not interchangeable products.",
    safetyNote: "It may cause digestive upset and can interact with medicines, including immunosuppressive treatment.",
    sourceIds: ["medlineplus-all", "nccih-atoz", "fda-structure-function"],
    tags: ["immune", "cancer-adjunct", "mushroom"]
  }
];
