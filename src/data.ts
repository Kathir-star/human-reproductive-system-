import { 
  AnatomicalStructure, 
  Hormone, 
  MenstrualPhase, 
  Disease, 
  Symptom, 
  Procedure, 
  Affix, 
  Abbreviation, 
  QuizQuestion 
} from './types';

export const OBJECTIVES = [
  "Understand the fundamental anatomy and physiology of both the male and female reproductive systems.",
  "Identify and define key pathological conditions, infections, and malignancies affecting these systems.",
  "Describe the hormonal regulation pathways that govern menstrual cycles, gamete production, and pre-natal processes.",
  "Master medical linguistic structures, including key prefixes, suffixes, and commonly used clinical abbreviations.",
  "Acknowledge and detail common obstetric, gynecologic, and urologic surgical and investigative procedures."
];

export const ANATOMY_DATA: AnatomicalStructure[] = [
  // Female External
  {
    name: "Labia majora",
    system: "female",
    location: "external",
    definition: "These structures enclose and protect the other external reproductive organs. They contain rich sweat and oil-secreting glands.",
  },
  {
    name: "Labia minora",
    system: "female",
    location: "external",
    definition: "These lie just inside the labia majora and surround the openings to the vagina and urethra.",
  },
  {
    name: "Bartholin's glands",
    system: "female",
    location: "external",
    definition: "These glands are located adjacent to the vaginal opening and produce a fluid (mucus) secretion for lubrication.",
  },
  {
    name: "Clitoris",
    system: "female",
    location: "external",
    definition: "A small, highly sensitive protrusion where the two labia minora meet, comparable structurally to the penis in males.",
  },
  // Female Internal
  {
    name: "Vagina",
    system: "female",
    location: "internal",
    definition: "A muscular canal that joins the cervix (the lower part of the uterus) to the outside of the body. It is also commonly referred to as the birth canal.",
  },
  {
    name: "Uterus (Womb)",
    system: "female",
    location: "internal",
    definition: "A hollow, pear-shaped pelvic organ that is the home to a developing fetus. It is primary divided into the cervix (lower narrow portion) and the corpus (main body).",
  },
  {
    name: "Ovaries",
    system: "female",
    location: "internal",
    definition: "Small, oval-shaped glands located on either side of the uterus. They are responsible for producing egg cells (ova) and key female sex hormones.",
  },
  {
    name: "Fallopian tubes",
    system: "female",
    location: "internal",
    definition: "Narrow tubes attached to the upper part of the uterus serving as tunnels for ova to travel from the ovaries to the uterus. This is the normal site of fertilization (conception) of an egg by a sperm.",
  },
  {
    name: "Cervix",
    system: "female",
    location: "internal",
    definition: "The opening at the lower/top end of the vagina leading to the uterus. It seals off after embryonic implantation to prevent infection and allow amniotic fluid to build, and dilates during labor.",
  },
  {
    name: "Endometrium",
    system: "female",
    location: "internal",
    definition: "The inner lining of the uterus prepared to receive the fertilized ovum. Extremely rich in blood vessels to attach to and nourish the growing embryo.",
  },
  {
    name: "Corpus Luteum",
    system: "female",
    location: "internal",
    definition: "A temporary endocrine gland that forms inside the ovary right after an egg cell (ovum) is released (ovulation), producing the vital hormone progesterone.",
  },
  {
    name: "Perineum",
    system: "female",
    location: "internal", // Considered internal/pelvic floor floor region in the slide context
    definition: "The short stretch of skin starting at the bottom of the vulva and extending to the anus. It forms the pelvic floor and supports external sex organs and pelvic structures.",
  },
  // Male External
  {
    name: "Penis",
    system: "male",
    location: "external",
    definition: "The male organ for sexual intercourse. It consists of three parts: the root, the body (shaft), and the glans. It serves as the channel for expelling semen and urine.",
  },
  {
    name: "Scrotum",
    system: "male",
    location: "external",
    definition: "The loose, pouch-like sac of skin hanging behind the penis. It contains the testicles, nerves, and blood vessels, functioning as a vital climate control system for the testes.",
  },
  {
    name: "Testicles (Testes)",
    system: "male",
    location: "external",
    definition: "Oval organs about the size of large olives residing in the scrotum, secured by the spermatic cord. They are primary sites of sperm production and testosterone synthesis.",
  },
  // Male Internal
  {
    name: "Vas deferens",
    system: "male",
    location: "internal",
    definition: "A long, muscular tube that travels from the epididymis up into the pelvic cavity, behind the bladder. It transports mature sperm to the urethra in preparation for ejaculation.",
  },
  {
    name: "Ejaculatory ducts",
    system: "male",
    location: "internal",
    definition: "Ducts formed by the union of the vas deferens and the seminal vesicle tubes, which empty sperm directly into the urethra.",
  },
  {
    name: "Urethra",
    system: "male",
    location: "internal",
    definition: "The tube carrying urine from the urinary bladder to the outside of the body. In males, it has the dual function of conducting and expelling semen.",
  },
  {
    name: "Seminal vesicles",
    system: "male",
    location: "internal",
    definition: "Sac-like glands attached to the vas deferens near the bladder base. They generate fructose-rich fluid that provides sperm with necessary energy and facilitates motility.",
  },
  {
    name: "Prostate gland",
    system: "male",
    location: "internal",
    definition: "A walnut-sized gland located inferior to the bladder, in front of the rectum. It secretes protective prostate fluids that nourish sperm; the urethra runs directly through its center.",
  },
  {
    name: "Bulbourethral glands",
    system: "male",
    location: "internal",
    definition: "Also known as Cowper's glands, located on either side of the urethra below the prostate. They release a clear, slippery fluid to lubricate the urethra and neutralize residual urinary acidity.",
  },
  {
    name: "Epididymis",
    system: "male",
    location: "internal",
    definition: "A long, tightly coiled tube resting on the posterior side of each testicle. It stores and transports immature sperm cells produced in the testes, housing them until they reach full fertilization maturity.",
  }
];

export const MENSTRUAL_PHASES: MenstrualPhase[] = [
  {
    name: "Follicular Phase",
    timing: "Day 1 to Ovulation (~Day 14)",
    description: "Begins on the first day of menstruation and culminates at ovulation.",
    details: "Prompted by hypothalamic signals, the anterior pituitary gland secretes Follicle Stimulating Hormone (FSH), which triggers development of follicles in the ovary."
  },
  {
    name: "Ovulatory Phase",
    timing: "Midpoint (~Day 14)",
    description: "The phase in which a mature egg is released from the ovarian follicle.",
    details: "Triggered by an acute surge of Luteinizing Hormone (LH). The midpoint of the cycle, occurring approximately 14 days after the follicular phase started, with menstruation following about 2 weeks later."
  },
  {
    name: "Luteal Phase",
    timing: "Ovulation to Menstruation (Days 15-28)",
    description: "The phase following ovulation, paving the way for potential pregnancy.",
    details: "The ruptured follicle transforms into the corpus luteum, secreting progesterone. Progesterone thickens the uterine endometrium lining, preparing it for possible embryo implantation."
  }
];

export const HORMONE_DATA: Hormone[] = [
  {
    name: "Relaxin",
    system: "female",
    origin: "Ovary and Placenta",
    description: "Relaxes pelvis ligaments and softens/widens the cervix in preparation for childbirth.",
    targetOrgan: "Pelvic ligaments, Cervix"
  },
  {
    name: "Inhibin",
    system: "female",
    origin: "Ovary / Granulosa cells",
    description: "Inhibits the synthesis and secretion of Follicle-Stimulating Hormone (FSH) in the anterior pituitary gland and reduces hypothalamic LH-releasing hormone content.",
    targetOrgan: "Anterior Pituitary, Hypothalamus"
  },
  {
    name: "Progesterone",
    system: "female",
    origin: "Corpus Luteum (and Placenta)",
    description: "Involved in regulating the menstrual cycle, preparing the uterus endometrium for pregnancy implantation, and aiding embryogenesis.",
    targetOrgan: "Uterus (Endometrium), Breasts"
  },
  {
    name: "Estrogen",
    system: "female",
    origin: "Ovaries, Corpus Luteum, and Placenta",
    description: "Coordinates development and maintenance of the female reproductive system and secondary sexual characteristics (e.g., breast development and pubic hair).",
    targetOrgan: "Reproductive tract, Brain, Bones, Breasts"
  },
  {
    name: "Luteinizing Hormone (LH)",
    system: "both",
    origin: "Anterior Pituitary Gland (regulated by hypothalamic GnRH)",
    description: "In females, an acute surge triggers ovulation and corpus luteum development. In males, it stimulates Leydig cells in the testes to synthesize testosterone.",
    targetOrgan: "Ovaries (Females) / Testes (Males)"
  },
  {
    name: "Follicle Stimulating Hormone (FSH)",
    system: "both",
    origin: "Anterior Pituitary Gland (regulated by hypothalamic GnRH)",
    description: "In females, initiates ovarian follicle development and maturation. In males, along with testosterone, it runs through blood vessels to stimulate Sertoli cells to mature immature sperm.",
    targetOrgan: "Ovaries (Females) / Testes (Males)"
  },
  {
    name: "Testosterone",
    system: "male",
    origin: "Testes (Leydig cells, stimulated by LH)",
    description: "Also known as the primary 'male hormone' or 'androgen'. Plays a critical role in male physical characteristics, libido, and sperm production (spermatogenesis).",
    targetOrgan: "Sertoli cells, seminiferous tubules, whole body muscular/skeletal systems"
  }
];

export const DISEASES_DATA: Disease[] = [
  // Female
  {
    name: "Urinary Tract Infection (UTI)",
    system: "female",
    description: "A bacterial infection affecting any part of the urinary urinary tract (urethra, bladder, ureters, or kidneys), highly common in females due to anatomical structure.",
    alternativeName: "UTI"
  },
  {
    name: "Cystitis",
    system: "female",
    description: "An infection of the urinary bladder, commonly known as a type of UTI. It occurs when bacteria enter the bladder via the urethra. Symptoms include painful, urgent urination.",
    alternativeName: "Bladder Infection"
  },
  {
    name: "Endometrial Cancer",
    system: "female",
    description: "A type of cancer that begins in the inner lining of the uterus (endometrium). Often detected early due to frequent abnormal vaginal bleeding.",
    clinicalNote: "A highly malignant potential if left untreated, beginning strictly in the uterine cavity."
  },
  {
    name: "Breast Cancer",
    system: "female",
    description: "A malignancy of the breast tissues. The malignancy can start in the milk-producing ducts and/or lobes, and can spread aggressively to surrounding tissue.",
    clinicalNote: "Affects glandular lobules or duct pathways locally or systemically."
  },
  {
    name: "Uterine Fibroids",
    system: "female",
    description: "Noncancerous (benign) muscular growths of the uterus that often appear during childbearing years. They can cause heavy bleeding and pelvic discomfort.",
    alternativeName: "Leiomyomas"
  },
  {
    name: "Polycystic Ovarian Disease (PCOD)",
    system: "female",
    description: "A medical endocrine condition in which a woman's ovaries produce immature or partially mature eggs in large numbers. Over time, these eggs fail to release and turn into multiple cysts inside the ovaries.",
    alternativeName: "PCOD / PCOS"
  },
  {
    name: "Ectopic Pregnancy",
    system: "female",
    description: "A dangerous situation in which a fertilized egg (ovum) implants outside the uterine cavity, most commonly in the narrow Fallopian tube. The ectopic site often ruptures after the first missed period, posing a medical emergency.",
    clinicalNote: "Life-threatening to the mother. Requires immediate intervention."
  },
  {
    name: "Ovarian Cancer",
    system: "female",
    description: "Malignancy starting in one or both of the ovaries, often silent in its early stages and presenting general abdominal bloating symptoms.",
    clinicalNote: "Requires surgical and chemotherapy protocols."
  },
  // Male
  {
    name: "Erectile Dysfunction (ED)",
    system: "male",
    description: "A medical condition characterized by persistent difficulty getting and keeping an erection firm enough for sexual intercourse.",
    alternativeName: "Impotence"
  },
  {
    name: "Benign Prostatic Hyperplasia (BPH)",
    system: "male",
    description: "A noncancerous enlargement of the prostate gland, highly common as men age. It compresses the central urethra, leading to urine flow difficulties, hesitancy, and frequency.",
    alternativeName: "Benign Prostatic Hypertrophy"
  },
  {
    name: "Testicular Cancer",
    system: "male",
    description: "Occurs when cells in the testicle divide abnormally to form a malignant tumor. Testicular cancer can spread, but has an excellent cure rate when detected early through self-examination.",
    clinicalNote: "Commonly affects young to mid-aged men."
  },
  {
    name: "Prostate Cancer",
    system: "male",
    description: "A disease that only affects men, where malignant cancer cells grow within the tissue of the outer prostate gland. It often grows slowly but can become aggressive.",
    clinicalNote: "Regular screening includes PSA blood tests and digital exams."
  },
  // STDs
  {
    name: "Sexually Transmitted Disease (STD)",
    system: "both",
    description: "Any contagious infection spread primarily through sexual contact, especially intercourse. Examples include syphilis, gonorrhea, and chlamydia.",
    alternativeName: "Venereal Disease (VD)"
  }
];

export const SYMPTOMS_DATA: Symptom[] = [
  {
    name: "Amenorrhea",
    definition: "The complete absence of menstruation (one or more missed menstrual periods).",
    genderContext: "female"
  },
  {
    name: "Anejaculation",
    definition: "The complete absence of ejaculation during sexual activity, despite normal erections and nocturnal emissions.",
    genderContext: "male"
  },
  {
    name: "Dysmenorrhea",
    definition: "Severe, painful uterine cramping and pain during the menstrual cycle.",
    genderContext: "female"
  },
  {
    name: "Dyspareunia",
    definition: "Painful or difficult sexual intercourse experienced during or after contact.",
    genderContext: "both"
  },
  {
    name: "Lumbago",
    definition: "Acute or chronic pain in the lower region of the back, often associated with menstrual cycles or pelvic floor distress.",
    genderContext: "both"
  },
  {
    name: "Mastalgia",
    definition: "Tenderness, heavy swelling, and pain in one or both breasts.",
    genderContext: "female"
  },
  {
    name: "Menorrhagia",
    definition: "Abnormally heavy, prolonged, or excessive vaginal bleeding during the menstrual cycle.",
    genderContext: "female"
  },
  {
    name: "Nausea",
    definition: "A subjective feeling of sickness and unease that typically precedes vomiting.",
    genderContext: "both"
  },
  {
    name: "Polyuria",
    definition: "The state of passing abnormally large quantities of urine on a frequent basis.",
    genderContext: "both"
  },
  {
    name: "Vomiting",
    definition: "An involuntary, uncontrollable reflex that forcefully expels stomach contents up through the esophagus and mouth.",
    genderContext: "both"
  }
];

export const PROCEDURES_DATA: Procedure[] = [
  {
    name: "Vaginal Delivery",
    definition: "The natural physiological birth method where the fetus passes through the dilated cervix and out through the vaginal birth canal."
  },
  {
    name: "Episiotomy",
    definition: "A surgical incision of the perineum and posterior vaginal wall during childbirth, routinely performed by a midwife or obstetrician to facilitate quick delivery and prevent ragged tearing.",
    alternativeName: "Perineotomy"
  },
  {
    name: "Hysteroscopy",
    definition: "A diagnostic or therapeutic procedure where an endoscope (hysteroscope) is guided into the uterus via the vagina and cervix to inspect and treat structural sources of abnormal bleeding."
  },
  {
    name: "Obstetrical (OB) Ultrasound",
    definition: "A high-frequency sound wave imaging test that produces real-time diagnostic pictures of an embryo or fetus inside the placenta/uterus, as well as the mother's ovaries."
  },
  {
    name: "Hysterectomy",
    definition: "The surgical procedure to remove a woman's uterus, either partially, totally, or radically."
  },
  {
    name: "Amniocentesis",
    definition: "A prenatal diagnostic test where a needle is guided into the amniotic sac to withdraw a tiny sample of amniotic fluid to analyze the fetus for genetic or chromosomal abnormalities."
  },
  {
    name: "Salpingo-oophorectomy",
    definition: "The surgical excision/removal of one or both ovaries and their adjacent Fallopian tubes."
  },
  {
    name: "Dilatation & Curettage (D&C)",
    definition: "A minor surgical procedure in which the cervix is slowly dilated, and a curette (spoon-shaped medical instrument) is used to gently scrape or suction tissue from the inner lining of the uterus.",
    alternativeName: "D&C"
  },
  {
    name: "Cesarean Delivery",
    definition: "An obstetric surgical delivery procedure in which incisions are made through a mother's abdomen and uterus to safely extract the baby.",
    alternativeName: "C-Section"
  }
];

export const PREFIX_DATA: Affix[] = [
  { type: "prefix", affix: "Amni/o-", meaning: "Amnion (fetal membrane / sac)", example: "Amniocentesis" },
  { type: "prefix", affix: "Andr/o-", meaning: "Man; Male", example: "Androgen" },
  { type: "prefix", affix: "Chori/o-", meaning: "Chorion (outermost fetal membrane)", example: "Chorioamnionitis" },
  { type: "prefix", affix: "Colp/o-", meaning: "Vagina", example: "Colposcopy" },
  { type: "prefix", affix: "Episi/o-", meaning: "Vulva", example: "Episiotomy" },
  { type: "prefix", affix: "Gravida-", meaning: "Pregnancy", example: "Hyperemesis Gravidarum" },
  { type: "prefix", affix: "Gynec/o; gyn/o-", meaning: "Woman; Female", example: "Gynecology" },
  { type: "prefix", affix: "Hyster/o-", meaning: "Uterus", example: "Hysterectomy" },
  { type: "prefix", affix: "Mamm/o; mast/o-", meaning: "Breast", example: "Mammography" },
  { type: "prefix", affix: "Men/o-", meaning: "Menstruation", example: "Menopause" },
  { type: "prefix", affix: "Metr/o; metr/io-", meaning: "Uterus (uterine tissue)", example: "Myometrium" },
  { type: "prefix", affix: "Nat/o; nat/i-", meaning: "Birth", example: "Natality" },
  { type: "prefix", affix: "Null/i-", meaning: "None", example: "Nulligravida" },
  { type: "prefix", affix: "Omphal/o-", meaning: "Umbilicus; Navel", example: "Omphalocele" },
  { type: "prefix", affix: "Ov/o; ov/I; ovul/o-", meaning: "Egg; Ovum", example: "Ovulation" },
  { type: "prefix", affix: "Perine/o-", meaning: "Perineum", example: "Perineotomy" },
  { type: "prefix", affix: "Prim/i-", meaning: "First", example: "Primigravida" },
  { type: "prefix", affix: "Puerper/o-", meaning: "Childbirth", example: "Puerperium" },
  { type: "prefix", affix: "Salping/o-", meaning: "Fallopian tube", example: "Salpingitis" }
];

export const SUFFIX_DATA: Affix[] = [
  { type: "suffix", affix: "-arche", meaning: "Beginning", example: "Menarche" },
  { type: "suffix", affix: "-ase", meaning: "Enzyme", example: "Amylase" },
  { type: "suffix", affix: "-assay", meaning: "To examine; Analyze", example: "Immunoassay" },
  { type: "suffix", affix: "-cyesis", meaning: "Pregnancy", example: "Pseudocyesis" },
  { type: "suffix", affix: "-gravida", meaning: "Pregnant woman", example: "Primigravida" },
  { type: "suffix", affix: "-ia", meaning: "Condition", example: "Anemia" },
  { type: "suffix", affix: "-oma", meaning: "Tumor; Mass; Fluid collection", example: "Adenoma" },
  { type: "suffix", affix: "-optosis", meaning: "Sagging; Drooping", example: "Blepharoptosis" },
  { type: "suffix", affix: "-orrhaphy", meaning: "Suture", example: "Herniorrhaphy" },
  { type: "suffix", affix: "-orrhea", meaning: "Discharge; Flow", example: "Amenorrhea" },
  { type: "suffix", affix: "-otomy", meaning: "Surgical cutting", example: "Episiotomy" },
  { type: "suffix", affix: "-parous", meaning: "Bearing; Bringing forth", example: "Viviparous" },
  { type: "suffix", affix: "-pareunia", meaning: "Sexual Intercourse", example: "Dyspareunia" },
  { type: "suffix", affix: "-partum", meaning: "Birth", example: "Antepartum" },
  { type: "suffix", affix: "-rrhagia", meaning: "Burst forth; Excessive flow", example: "Menorrhagia" },
  { type: "suffix", affix: "-tocia", meaning: "Labor; Childbirth", example: "Atocia" }
];

export const ABBREVIATIONS_DATA: Abbreviation[] = [
  { abbrev: "AIDS", expansion: "Acquired Immunodeficiency Syndrome" },
  { abbrev: "BPH", expansion: "Benign Prostatic Hyperplasia (or Hypertrophy)" },
  { abbrev: "CaP", expansion: "Cancer of the Prostate" },
  { abbrev: "C/S", expansion: "Cesarean Section" },
  { abbrev: "DUB", expansion: "Dysfunctional Uterine Bleeding" },
  { abbrev: "ED", expansion: "Erectile Dysfunction" },
  { abbrev: "EDD", expansion: "Expected Date of Delivery" },
  { abbrev: "EP", expansion: "Ectopic Pregnancy" },
  { abbrev: "FCBD", expansion: "Fibrocystic Breast Disease" },
  { abbrev: "FCD", expansion: "Fibrocystic Disease" },
  { abbrev: "FHT", expansion: "Fetal Heart Tone" },
  { abbrev: "FUB", expansion: "Functional Uterine Bleeding" },
  { abbrev: "GDM", expansion: "Gestational Diabetes Mellitus" },
  { abbrev: "HIV", expansion: "Human Immunodeficiency Virus" },
  { abbrev: "HSV", expansion: "Herpes Simplex Virus" },
  { abbrev: "Hyst", expansion: "Hysterectomy" },
  { abbrev: "HZ", expansion: "Herpes Zoster" },
  { abbrev: "IUD", expansion: "Intrauterine Device" },
  { abbrev: "LMP", expansion: "Last Menstrual Period" },
  { abbrev: "MRI", expansion: "Magnetic Resonance Imaging" }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which hormone is produced by the temporary gland that forms in the ovary right after ovulation?",
    options: ["Estrogen", "Progesterone", "Luteinizing Hormone (LH)", "Relaxin"],
    correctAnswer: 1,
    explanation: "After ovulation, the ruptured follicle inside the ovary transforms into a temporary endocrine gland called the corpus luteum, which primary produces progesterone.",
    category: "physiology"
  },
  {
    id: "q2",
    question: "Where does conception (the fertilization of an egg cell by a sperm cell) normally take place?",
    options: ["Inside the Uterus", "In the Cervix", "Within the Fallopian tubes", "In the Vagina"],
    correctAnswer: 2,
    explanation: "Conception, fertilization of the egg (ovum) by the sperm, normally happens within the Fallopian tubes. The zygote then moves into the uterine cavity for implantation.",
    category: "anatomy"
  },
  {
    id: "q3",
    question: "What is the function of the Bartholin's glands?",
    options: ["Produce sweat secretions", "Provide sperm with rich fructose nutrition", "Produce a lubricating fluid (mucus) secretion next to the vaginal opening", "Synthesize luteinizing hormone"],
    correctAnswer: 2,
    explanation: "Bartholin's glands are located right next to the opening of the vagina and secrete a lubricating fluid (mucus).",
    category: "anatomy"
  },
  {
    id: "q4",
    question: "Which uterine layer is equipped with rich blood vessels to connect to and nourish an embryo?",
    options: ["Perimetrium", "Endometrium", "Myometrium", "Cervix"],
    correctAnswer: 1,
    explanation: "The endometrium is the inner mucosal lining of the uterus, which thickens and gets rich with blood vessels to prepare for embryonic attachment and nourishment.",
    category: "anatomy"
  },
  {
    id: "q5",
    question: "What hormone has the dual-function of triggering ovulation in females and stimulating Leydig cells to produce testosterone in males?",
    options: ["FSH (Follicle-Stimulating Hormone)", "LH (Luteinizing Hormone)", "Prolactin", "Estrogen"],
    correctAnswer: 1,
    explanation: "Luteinizing Hormone (LH) triggers ovulation in women and acts on Leydig interstitial cells in men to promote testosterone secretion.",
    category: "physiology"
  },
  {
    id: "q6",
    question: "In the male reproductive tract, which structure matures immature sperm cells so that they are capable of successful fertilization?",
    options: ["Seminal vesicles", "Sertoli cells", "Vas deferens", "Epididymis"],
    correctAnswer: 3,
    explanation: "While testosterone and FSH stimulate Sertoli cells to form sperm, it is the Epididymis (a coiled tube) that stores and brings sperm to physical and functional maturity.",
    category: "anatomy"
  },
  {
    id: "q7",
    question: "Which of the following conditions is characterized by a fertilized ovum implanting inside a Fallopian tube instead of the uterus, which can be life-threatening?",
    options: ["Cystitis", "Ectopic Pregnancy", "PCOD", "Uterine Fibroids"],
    correctAnswer: 1,
    explanation: "An Ectopic Pregnancy occurs when implantation occurs outside the womb, mostly in a fallopian tube. It represents a major rupture hazard showing life-threat scenarios.",
    category: "pathology"
  },
  {
    id: "q8",
    question: "What does the abbreviation BPH stand for?",
    options: ["Before Pregnancy History", "Breast Pathological Hyperplasia", "Benign Prostatic Hyperplasia (or Hypertrophy)", "Bilateral Pelvic Hydrocele"],
    correctAnswer: 2,
    explanation: "BPH stands for Benign Prostatic Hyperplasia (or Benign Prostatic Hypertrophy), which entails the enlargement of the prostate as men age, impacting urethra transit.",
    category: "abbreviations"
  },
  {
    id: "q9",
    question: "A patient complains of severe pain during their menstrual cycles. What is the clinical term for this symptom?",
    options: ["Amenorrhea", "Mastalgia", "Dysmenorrhea", "Dyspareunia"],
    correctAnswer: 2,
    explanation: "Dysmenorrhea is the clinical term for severe, painful uterine cramping and discomfort during the menstrual cycle.",
    category: "pathology"
  },
  {
    id: "q10",
    question: "What does the prefix 'Salping/o-' represent in medical terminology?",
    options: ["Vagina", "Breast", "Fallopian tube", "Uterus"],
    correctAnswer: 2,
    explanation: "'Salping/o-' is the medical word part meaning Fallopian tube, such as in 'Salpingitis' (inflammation of the tubes) or 'Salpingo-oophorectomy'.",
    category: "terminology"
  },
  {
    id: "q11",
    question: "What does the suffix '-tocia' stand for in terms like 'Atocia'?",
    options: ["Pregnancy", "Suturing", "Labor or Childbirth", "Sagging"],
    correctAnswer: 2,
    explanation: "The suffix '-tocia' translates to labor or childbirth in medical definitions.",
    category: "terminology"
  },
  {
    id: "q12",
    question: "What procedure involves dilating the cervix and scraping the lining of the uterus using a spoon-shaped instrument?",
    options: ["Episiotomy", "Amniocentesis", "Hysteroscopy", "Dilatation & Curettage (D&C)"],
    correctAnswer: 3,
    explanation: "Dilatation & Curettage (D&C) dilates the uterine cervix and uses a curette (spoon-shaped loop) to scrape or suction endometrial tissues.",
    category: "pathology"
  }
];
