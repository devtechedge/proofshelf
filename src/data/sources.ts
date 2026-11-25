import type { EvidenceSource } from "./types";

export const SOURCES: EvidenceSource[] = [
  {
    id: "ods-index",
    title: "NIH Office of Dietary Supplements fact sheet index",
    publisher: "National Institutes of Health",
    url: "https://ods.od.nih.gov/factsheets/list-all/",
    kind: "fact-sheet",
    note: "Index of nutrient fact sheets. Use the linked nutrient page for ingredient-specific evidence and safety context."
  },
  {
    id: "ods-exercise",
    title: "Dietary Supplements for Exercise and Athletic Performance",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/",
    kind: "fact-sheet",
    note: "Health professional review of performance claims, evidence limitations, and safety considerations."
  },
  {
    id: "ods-vitamin-d",
    title: "Vitamin D fact sheet for health professionals",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/",
    kind: "fact-sheet",
    note: "Reviews vitamin D physiology, evidence by outcome, and upper intake concerns."
  },
  {
    id: "ods-pregnancy",
    title: "Dietary Supplements During Pregnancy",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Pregnancy-HealthProfessional/",
    kind: "fact-sheet",
    note: "Reviews pregnancy-specific evidence and safety, including folate and nausea-related supplements."
  },
  {
    id: "ods-probiotics",
    title: "Probiotics fact sheet for health professionals",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Probiotics-HealthProfessional/",
    kind: "fact-sheet",
    note: "Summarizes strain- and indication-specific probiotic evidence and safety limitations."
  },
  {
    id: "ods-areds2-update",
    title: "Age-Related Eye Disease Study 2 update",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/pubs/ODS_Update_September_2024.pdf",
    kind: "review",
    note: "Explains the original AREDS2 formulation and later lutein and zeaxanthin findings."
  },
  {
    id: "dsld",
    title: "Dietary Supplement Label Database",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/Research/Dietary_Supplement_Label_Database.aspx",
    kind: "regulatory",
    note: "Label discovery resource. A listed label is not evidence that its claims are effective."
  },
  {
    id: "cochrane-omega3",
    title: "Omega-3 intake for cardiovascular disease prevention",
    publisher: "Cochrane",
    url: "https://www.cochrane.org/evidence/CD003177_omega-3-intake-cardiovascular-disease",
    kind: "review",
    note: "Systematic review of omega-3 intake and cardiovascular outcomes, including effect certainty."
  },
  {
    id: "collagen-systematic-review",
    title: "Oral collagen supplementation for skin and joint health",
    publisher: "PubMed Central",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8521576/",
    kind: "review",
    note: "Systematic review of human studies. Small samples, product differences, and industry support limit confidence."
  },
  {
    id: "collagen-skin-review",
    title: "Oral collagen supplementation and skin aging",
    publisher: "PubMed Central",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10180699/",
    kind: "review",
    note: "Review of skin-focused human studies. Hydration and elasticity outcomes are not proof of long-term rejuvenation."
  },
  {
    id: "glutathione-liposomal-pilot",
    title: "Oral liposomal glutathione pilot study",
    publisher: "PubMed Central",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6389332/",
    kind: "trial",
    note: "Small, short, uncontrolled pilot with biomarker outcomes and industry support. It does not establish clinical benefits or superiority to standard oral glutathione."
  },
  {
    id: "ghk-cu-review",
    title: "GHK-Cu biological activity review",
    publisher: "PubMed Central",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3359723/",
    kind: "review",
    note: "Reviews copper peptide biology across cell, animal, and limited human work. Much of the evidence is preclinical or topical."
  },
  {
    id: "peptide-scoping-review",
    title: "Peptide supplements and therapeutic applications in sports medicine",
    publisher: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/42578445/",
    kind: "review",
    note: "Scoping review of emerging peptides. Most included studies were preclinical, and human efficacy and safety data were limited."
  },
  {
    id: "urolithin-a-meta-analysis",
    title: "Urolithin A supplementation and muscle health outcomes",
    publisher: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/42559151/",
    kind: "review",
    note: "Meta-analysis of five small randomized trials. Walking outcomes were inconclusive and strength findings were exploratory."
  },
  {
    id: "nad-precursor-review",
    title: "NAD supplementation for anti-aging and wellness",
    publisher: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/41655607/",
    kind: "review",
    note: "Systematic review separating changes in NAD-related biomarkers from functional and health outcomes."
  },
  {
    id: "fisetin-pilot",
    title: "Fisetin and biological aging pilot study",
    publisher: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/39269340/",
    kind: "trial",
    note: "Ten-person pilot of a commercial biological-age marker. It did not test lifespan or disease prevention."
  },
  {
    id: "nccih-atoz",
    title: "NCCIH herbs and supplements A to Z",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/atoz",
    kind: "safety",
    note: "General gateway for evidence summaries and safety information. An index listing is not an ingredient-specific efficacy trial."
  },
  {
    id: "nccih-colds",
    title: "Colds, flu, and complementary health approaches",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/colds-flu-and-complementary-health-approaches",
    kind: "review",
    note: "Summarizes complementary approaches for colds and flu, including evidence gaps and safety considerations."
  },
  {
    id: "nccih-ashwagandha",
    title: "Ashwagandha",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/ashwagandha",
    kind: "review",
    note: "Evidence and safety summary for ashwagandha, including study limitations and rare liver concerns."
  },
  {
    id: "nccih-st-johns-wort",
    title: "St. John's wort and depression in depth",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/st-johns-wort-and-depression-in-depth",
    kind: "review",
    note: "Reviews depression evidence, product variability, and clinically important drug interactions."
  },
  {
    id: "nccih-glucosamine-chondroitin",
    title: "Glucosamine and chondroitin for osteoarthritis",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/glucosamine-and-chondroitin-for-osteoarthritis-what-you-need-to-know",
    kind: "review",
    note: "Summarizes mixed trial results and explains why these supplements are not proven cartilage-restoring treatments."
  },
  {
    id: "nccih-peppermint-oil",
    title: "Peppermint oil",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/peppermint-oil",
    kind: "review",
    note: "Reviews enteric-coated peppermint oil for irritable bowel symptoms and formulation-specific limitations."
  },
  {
    id: "nccih-diabetes-supplements",
    title: "Things to know about type 2 diabetes and dietary supplements",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/tips/things-to-know-about-type-diabetes-and-dietary-supplements",
    kind: "safety",
    note: "Explains uncertain efficacy, variable product quality, and safety concerns with glucose-related supplements."
  },
  {
    id: "nccih-green-tea",
    title: "Green tea",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/green-tea",
    kind: "review",
    note: "Separates beverage evidence from concentrated extracts and discusses limited weight-loss evidence and liver concerns."
  },
  {
    id: "nccih-wise-use",
    title: "Using dietary supplements wisely",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/using-dietary-supplements-wisely",
    kind: "safety",
    note: "General safety guidance on product quality, interactions, and limits of supplement evidence."
  },
  {
    id: "medlineplus-all",
    title: "MedlinePlus herbs and supplements",
    publisher: "National Library of Medicine",
    url: "https://medlineplus.gov/druginfo/herb_All.html",
    kind: "safety",
    note: "General index of supplement monographs. For ingredients without a linked specific source here, it is safety and discovery context only."
  },
  {
    id: "medlineplus-nac",
    title: "N-acetyl cysteine",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/1018.html",
    kind: "review",
    note: "Safety and evidence monograph for NAC. Oral supplements, inhaled products, and prescription uses are not interchangeable."
  },
  {
    id: "medlineplus-melatonin",
    title: "Melatonin",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/940.html",
    kind: "review",
    note: "Evidence and safety monograph covering circadian timing, sleep outcomes, and product variability."
  },
  {
    id: "medlineplus-psyllium",
    title: "Psyllium",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/meds/a601104.html",
    kind: "review",
    note: "Drug information for psyllium, including bowel and cholesterol-related effects and administration precautions."
  },
  {
    id: "medlineplus-berberine",
    title: "Berberine",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/1126.html",
    kind: "review",
    note: "Evidence and interaction monograph for berberine, including uncertain study quality and drug interactions."
  },
  {
    id: "medlineplus-reishi",
    title: "Reishi mushroom",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/905.html",
    kind: "review",
    note: "Safety and evidence monograph for reishi. General immune claims are not established by robust human infection outcomes."
  },
  {
    id: "fda-consumer",
    title: "Information for consumers using dietary supplements",
    publisher: "U.S. Food and Drug Administration",
    url: "https://www.fda.gov/food/dietary-supplements/information-consumers-using-dietary-supplements",
    kind: "regulatory",
    note: "General consumer information about supplement regulation, labeling, and safety."
  },
  {
    id: "fda-structure-function",
    title: "Structure and function claims",
    publisher: "U.S. Food and Drug Administration",
    url: "https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/structurefunction-claims",
    kind: "regulatory",
    note: "Explains the legal category of structure and function claims. Such wording is not proof of clinical benefit."
  },
  {
    id: "fda-nac-proposed-rule",
    title: "FDA issues proposed rule on NAC products as dietary supplements",
    publisher: "U.S. Food and Drug Administration",
    url: "https://www.fda.gov/food/hfp-constituent-updates/fda-issues-proposed-rule-nac-products-dietary-supplements",
    kind: "regulatory",
    note: "November 2026 proposed rule. It is not a final rule and does not substantiate efficacy."
  },
  {
    id: "now-product-index",
    title: "NOW Foods product index",
    publisher: "NOW Foods",
    url: "https://www.nowfoods.com/products/products-alphabet",
    kind: "market-discovery",
    note: "Market and label discovery only. Product listings do not substantiate efficacy."
  },
  {
    id: "now-liposomal-glutathione",
    title: "NOW liposomal glutathione product listing",
    publisher: "NOW Foods",
    url: "https://www.nowfoods.com/products/supplements/liposomal-glutathione-veg-capsules",
    kind: "market-discovery",
    note: "Label discovery only. The listing is not clinical evidence and does not prove superior absorption."
  },
  {
    id: "iherb-supplements",
    title: "iHerb supplements category",
    publisher: "iHerb",
    url: "https://www.iherb.com/c/supplements",
    kind: "market-discovery",
    note: "Market discovery only. Rankings, popularity, and product descriptions are not efficacy evidence."
  },
  {
    id: "iherb-collagen",
    title: "iHerb collagen peptides product listing",
    publisher: "iHerb",
    url: "https://www.iherb.com/pr/now-foods-collagen-peptides-powder-8-oz-227-g/86319",
    kind: "market-discovery",
    note: "Label discovery only. Product language is not clinical evidence."
  },
  {
    id: "iherb-nac",
    title: "iHerb NOW NAC category",
    publisher: "iHerb",
    url: "https://www.iherb.com/c/now-foods/n-acetyl-cysteine-nac",
    kind: "market-discovery",
    note: "Market and label discovery only. Category placement does not substantiate efficacy."
  },
  {
    id: "iherb-triple-fish-oil",
    title: "iHerb triple-strength fish oil product listing",
    publisher: "iHerb",
    url: "https://www.iherb.com/pr/sports-research-omega-3-fish-oil-triple-strength-120-softgels/109322",
    kind: "market-discovery",
    note: "Label discovery only. Triple strength describes concentration, not superior clinical outcomes."
  },
  {
    id: "iherb-zinc-picolinate",
    title: "iHerb zinc picolinate product listing",
    publisher: "iHerb",
    url: "https://www.iherb.com/pr/now-foods-zinc-picolinate-50-mg-30-veg-capsules/129591",
    kind: "market-discovery",
    note: "Label discovery only. The listing does not prove superior absorption or outcomes."
  },
  {
    id: "iherb-liposomal-glutathione",
    title: "iHerb liposomal glutathione product listing",
    publisher: "iHerb",
    url: "https://www.iherb.com/pr/nutricost-liposomal-glutathione-60-capsules-360-mg-per-capsule/153912",
    kind: "market-discovery",
    note: "Label discovery only. Product claims are not evidence of absorption or health effects."
  },
  {
    id: "iherb-topical-ghk-cu",
    title: "iHerb topical GHK-Cu product listing",
    publisher: "iHerb",
    url: "https://www.iherb.com/pr/neurogan-health-ghk-cu-copper-peptide-face-serum-1-oz-30-ml/159352",
    kind: "market-discovery",
    note: "Label and route discovery only. A topical listing does not substantiate oral GHK-Cu claims."
  },
  {
    id: "ods-vitamin-a",
    title: "Vitamin A and carotenoids consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/VitaminA-Consumer/",
    kind: "fact-sheet",
    note: "Covers preformed vitamin A, carotenoids, deficiency, eye health, and excess intake risks."
  },
  {
    id: "ods-vitamin-c",
    title: "Vitamin C consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/VitaminC-Consumer/",
    kind: "fact-sheet",
    note: "Reviews common cold evidence, nutrient roles, and upper intake concerns."
  },
  {
    id: "ods-vitamin-e",
    title: "Vitamin E consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/VitaminE-Consumer/",
    kind: "fact-sheet",
    note: "Reviews antioxidant biology, clinical outcome evidence, and bleeding risks at high intake."
  },
  {
    id: "ods-vitamin-k",
    title: "Vitamin K consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/VitaminK-Consumer/",
    kind: "fact-sheet",
    note: "Covers vitamin K forms, bone and coagulation biology, and warfarin interactions."
  },
  {
    id: "ods-thiamin",
    title: "Thiamin consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Thiamin-Consumer/",
    kind: "fact-sheet",
    note: "Covers thiamin deficiency and physiological roles. It does not establish cognitive enhancement in well-nourished adults."
  },
  {
    id: "ods-riboflavin",
    title: "Riboflavin consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Riboflavin-Consumer/",
    kind: "fact-sheet",
    note: "Covers riboflavin physiology and limited migraine-related evidence, with study limitations."
  },
  {
    id: "ods-niacin",
    title: "Niacin consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Niacin-Consumer/",
    kind: "fact-sheet",
    note: "Reviews niacin forms, lipid effects, flushing, liver concerns, and the distinction between supplements and prescription products."
  },
  {
    id: "ods-pantothenic-acid",
    title: "Pantothenic acid consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/PantothenicAcid-Consumer/",
    kind: "fact-sheet",
    note: "Covers physiological roles and the lack of convincing evidence for performance enhancement."
  },
  {
    id: "ods-vitamin-b6",
    title: "Vitamin B6 consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/VitaminB6-Consumer/",
    kind: "fact-sheet",
    note: "Reviews vitamin B6 evidence, including nausea-related outcomes and toxicity from chronic excess intake."
  },
  {
    id: "ods-folate",
    title: "Folate consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Folate-Consumer/",
    kind: "fact-sheet",
    note: "Covers folate forms, neural tube defect prevention, and limits of comparisons among forms."
  },
  {
    id: "ods-vitamin-b12",
    title: "Vitamin B12 consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/VitaminB12-Consumer/",
    kind: "fact-sheet",
    note: "Covers vitamin B12 forms, deficiency correction, and the lack of evidence that methylcobalamin is superior for all uses."
  },
  {
    id: "ods-calcium",
    title: "Calcium consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Calcium-Consumer/",
    kind: "fact-sheet",
    note: "Reviews calcium forms, bone density, fracture evidence, and safety considerations."
  },
  {
    id: "ods-magnesium",
    title: "Magnesium consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Magnesium-Consumer/",
    kind: "fact-sheet",
    note: "Covers magnesium forms and physiological roles. Sleep-specific evidence is limited and not glycinate-specific."
  },
  {
    id: "ods-iron",
    title: "Iron consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Iron-Consumer/",
    kind: "fact-sheet",
    note: "Reviews iron forms, absorption, deficiency, gastrointestinal effects, and excess intake risks."
  },
  {
    id: "ods-zinc",
    title: "Zinc consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Zinc-Consumer/",
    kind: "fact-sheet",
    note: "Reviews zinc forms, physiological roles, deficiency, and the lack of convincing superiority for picolinate."
  },
  {
    id: "ods-selenium",
    title: "Selenium consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Selenium-Consumer/",
    kind: "fact-sheet",
    note: "Reviews selenium forms, physiological roles, cancer trial findings, and toxicity risks."
  },
  {
    id: "ods-iodine",
    title: "Iodine consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Iodine-Consumer/",
    kind: "fact-sheet",
    note: "Covers iodine forms, thyroid physiology, and the risks of excess iodine intake."
  },
  {
    id: "ods-chromium",
    title: "Chromium consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Chromium-Consumer/",
    kind: "fact-sheet",
    note: "Reviews chromium evidence for glucose and weight outcomes, including small and inconsistent effects."
  },
  {
    id: "ods-manganese",
    title: "Manganese consumer fact sheet",
    publisher: "NIH Office of Dietary Supplements",
    url: "https://ods.od.nih.gov/factsheets/Manganese-Consumer/",
    kind: "fact-sheet",
    note: "Covers manganese physiology and safety. It does not establish bone or performance benefits from supplements."
  },
  {
    id: "medlineplus-alpha-lipoic-acid",
    title: "Alpha-lipoic acid",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/767.html",
    kind: "review",
    note: "Evidence and safety monograph, including neuropathy-related research and formulation limitations."
  },
  {
    id: "medlineplus-ashwagandha",
    title: "Ashwagandha",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/953.html",
    kind: "review",
    note: "Evidence and safety monograph covering stress-related studies and product variability."
  },
  {
    id: "medlineplus-beta-carotene",
    title: "Beta-carotene",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/999.html",
    kind: "review",
    note: "Evidence and safety monograph, including adverse cancer-related trial findings in smokers."
  },
  {
    id: "medlineplus-biotin",
    title: "Biotin",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/313.html",
    kind: "review",
    note: "Evidence and safety monograph, including weak hair and nail evidence and laboratory test interference."
  },
  {
    id: "medlineplus-bitter-melon",
    title: "Bitter melon",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/795.html",
    kind: "review",
    note: "Evidence and safety monograph. Glucose-related human trials are limited and heterogeneous."
  },
  {
    id: "medlineplus-boron",
    title: "Boron",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/894.html",
    kind: "review",
    note: "Evidence and safety monograph. Hormone-related findings are small, short-term, and not replicated robustly."
  },
  {
    id: "medlineplus-boswellia",
    title: "Boswellia serrata",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/63.html",
    kind: "review",
    note: "Evidence and safety monograph covering small osteoarthritis studies and extract variability."
  },
  {
    id: "medlineplus-chondroitin",
    title: "Chondroitin sulfate",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/744.html",
    kind: "review",
    note: "Evidence and safety monograph for osteoarthritis-related outcomes."
  },
  {
    id: "medlineplus-cod-liver-oil",
    title: "Cod liver oil",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/1040.html",
    kind: "review",
    note: "Evidence and safety monograph. Cod liver oil contains preformed vitamin A and vitamin D, which complicates interchangeability with purified omega-3 products."
  },
  {
    id: "medlineplus-collagen-peptides",
    title: "Collagen peptides",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/1606.html",
    kind: "review",
    note: "Evidence and safety monograph for collagen peptides, with study-quality limitations."
  },
  {
    id: "medlineplus-creatine",
    title: "Creatine",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/873.html",
    kind: "review",
    note: "Evidence and safety monograph for creatine, including performance contexts and product forms."
  },
  {
    id: "medlineplus-eleuthero",
    title: "Eleuthero",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/985.html",
    kind: "review",
    note: "Evidence and safety monograph. Athletic performance claims are not supported by consistent human trials."
  },
  {
    id: "medlineplus-glucosamine",
    title: "Glucosamine",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/807.html",
    kind: "review",
    note: "Evidence and safety monograph for osteoarthritis outcomes and differences among glucosamine forms."
  },
  {
    id: "medlineplus-l-arginine",
    title: "L-arginine",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/875.html",
    kind: "review",
    note: "Evidence and safety monograph. Exercise performance findings are limited and inconsistent."
  },
  {
    id: "medlineplus-lutein",
    title: "Lutein",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/754.html",
    kind: "review",
    note: "Evidence and safety monograph for lutein. Eye-disease findings depend on the specific AREDS2 combination and population."
  },
  {
    id: "medlineplus-msm",
    title: "Methylsulfonylmethane",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/522.html",
    kind: "review",
    note: "Evidence and safety monograph. Osteoarthritis studies are small and product-specific."
  },
  {
    id: "medlineplus-panax-ginseng",
    title: "Panax ginseng",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/1000.html",
    kind: "review",
    note: "Evidence and safety monograph. Endurance and cognition findings vary by extract and study quality."
  },
  {
    id: "medlineplus-quercetin",
    title: "Quercetin",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/294.html",
    kind: "review",
    note: "Evidence and safety monograph. Infection-prevention evidence is limited and population-specific."
  },
  {
    id: "medlineplus-resveratrol",
    title: "Resveratrol",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/307.html",
    kind: "review",
    note: "Evidence and safety monograph. Biomarker findings do not establish lifespan extension in humans."
  },
  {
    id: "medlineplus-saccharomyces-boulardii",
    title: "Saccharomyces boulardii",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/332.html",
    kind: "review",
    note: "Evidence and safety monograph for antibiotic-associated diarrhea and other gut indications."
  },
  {
    id: "medlineplus-theanine",
    title: "Theanine",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/1053.html",
    kind: "review",
    note: "Evidence and safety monograph. Anxiety and cognition studies are small and often combine theanine with other ingredients."
  },
  {
    id: "medlineplus-whey-protein",
    title: "Whey protein",
    publisher: "MedlinePlus",
    url: "https://medlineplus.gov/druginfo/natural/833.html",
    kind: "review",
    note: "Evidence and safety monograph for protein intake, resistance training, and body-composition outcomes."
  },
  {
    id: "nccih-asian-ginseng",
    title: "Asian ginseng",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/asian-ginseng",
    kind: "review",
    note: "Evidence and safety summary for Panax ginseng, including limited and inconsistent performance findings."
  },
  {
    id: "nccih-boswellia",
    title: "Boswellia",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/boswellia",
    kind: "review",
    note: "Evidence and safety summary with limitations of osteoarthritis studies."
  },
  {
    id: "nccih-cinnamon",
    title: "Cinnamon",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/cinnamon",
    kind: "review",
    note: "Reviews glucose-related studies, inconsistent results, and differences among cinnamon types."
  },
  {
    id: "nccih-echinacea",
    title: "Echinacea",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/echinacea",
    kind: "review",
    note: "Reviews common cold evidence, product variability, and safety considerations."
  },
  {
    id: "nccih-evening-primrose-oil",
    title: "Evening primrose oil",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/evening-primrose-oil",
    kind: "review",
    note: "Evidence summary that does not support reliable relief of menopausal hot flashes."
  },
  {
    id: "nccih-fenugreek",
    title: "Fenugreek",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/fenugreek",
    kind: "review",
    note: "Evidence and safety summary, including glucose-related trial limitations and drug interactions."
  },
  {
    id: "nccih-flaxseed",
    title: "Flaxseed and flaxseed oil",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/flaxseed-and-flaxseed-oil",
    kind: "review",
    note: "Evidence summary covering ALA, limited conversion to EPA and DHA, and safety considerations."
  },
  {
    id: "nccih-garlic",
    title: "Garlic",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/garlic",
    kind: "review",
    note: "Evidence and safety summary for garlic supplements, including blood-pressure studies and preparation variability."
  },
  {
    id: "nccih-ginger",
    title: "Ginger",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/ginger",
    kind: "review",
    note: "Evidence and safety summary for nausea-related outcomes and differences among preparations."
  },
  {
    id: "nccih-ginkgo",
    title: "Ginkgo",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/ginkgo",
    kind: "review",
    note: "Evidence and safety summary showing no convincing memory benefit in healthy older adults."
  },
  {
    id: "nccih-licorice",
    title: "Licorice root",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/licorice-root",
    kind: "safety",
    note: "Safety summary covering glycyrrhizin, blood-pressure and potassium effects, and product differences."
  },
  {
    id: "nccih-milk-thistle",
    title: "Milk thistle",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/milk-thistle",
    kind: "review",
    note: "Evidence and safety summary. Current clinical evidence does not show meaningful liver-disease benefit."
  },
  {
    id: "nccih-omega3",
    title: "Omega-3 supplements: what you need to know",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/omega3-supplements-what-you-need-to-know",
    kind: "review",
    note: "Reviews omega-3 sources, cardiovascular evidence, product differences, and safety."
  },
  {
    id: "nccih-probiotics",
    title: "Probiotics: usefulness and safety",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety",
    kind: "review",
    note: "General probiotic evidence and safety summary. Benefits are strain- and indication-specific."
  },
  {
    id: "nccih-rhodiola",
    title: "Rhodiola",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/rhodiola",
    kind: "review",
    note: "Evidence and safety summary. Fatigue studies are small, short, and heterogeneous."
  },
  {
    id: "nccih-saw-palmetto",
    title: "Saw palmetto",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/saw-palmetto",
    kind: "review",
    note: "Evidence and safety summary. High-quality trials do not show meaningful urinary symptom benefit."
  },
  {
    id: "nccih-turmeric",
    title: "Turmeric",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/turmeric",
    kind: "review",
    note: "Evidence and safety summary for curcumin-containing products, including formulation and liver concerns."
  },
  {
    id: "nccih-valerian",
    title: "Valerian",
    publisher: "National Center for Complementary and Integrative Health",
    url: "https://www.nccih.nih.gov/health/valerian",
    kind: "review",
    note: "Evidence and safety summary. Insomnia trials are inconsistent and product-specific."
  }
];
