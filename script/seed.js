"use strict";

const {
  db,
  models: { User, Project, Contribution },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    //0
    User.create({
      username: "cody123",
      password: "123",
      email: "cody@seed.js",
      firstName: "cody",
      lastName: "hamilton",
    }),
    //1 scientist
    User.create({
      username: "murphy123",
      password: "123",
      email: "murphy@seed.js",
      firstName: "murphy",
      lastName: "albert",
      type: "scientist"
    }),
    //2 scientist
    User.create({
      username: "SavannahL",
      password: "geniusScientist",
      email: "savannah@seed.js",
      firstName: "Savannah",
      lastName: "Laliberte",
      type: "scientist"
    }),
    //3 scientist
    User.create({
      username: "AleciaC",
      password: "anthrolady",
      email: "alecia@seed.js",
      firstName: "Alecia",
      lastName: "Carter",
      type: "scientist"
    }),
    //4 scientist
    User.create({
      username: "RalphieEmerson",
      password: "1234",
      email: "ralphieemerson@gmail.com",
      firstName: "Ralphie",
      lastName: "Emerson",
      type: "scientist"
    }),
    //5 scientist
    User.create({
      username: "ChristianS",
      password: "seasianmothers",
      email: "ChristianSuharlim@gmail.com",
      firstName: "Christian",
      lastName: "Suharlim",
      type: "scientist"
    }),
    //6 scientist
    User.create({
      username: "lindalinda",
      password: "3.14159265",
      email: "linda@seed.js",
      firstName: "Linda",
      lastName: "Chilton",
      type: "scientist"
    }),
    //7 scientist
    User.create({
      username: "AlexC",
      password: "primatesRule",
      email: "Alex@seed.js",
      firstName: "Alex",
      lastName: "Carter",
      type: "scientist"
    }),
    //8 scientist
    User.create({
      username: "DoctorJokes",
      password: "yeayea",
      email: "docjokes@yahoo.com",
      firstName: "Lawrence",
      lastName: "Hong",
      type: "scientist"
    }),
    //9 scientist
    User.create({
      username: "CHyeRimChoi",
      password: "chyerim",
      email: "clarachoi@yahoo.com",
      firstName: "Clara",
      lastName: "Choi",
      type: "scientist"
    }),
    //10 scientist
    User.create({
      username: "HongniFa",
      password: "hongni123",
      email: "HongniFa@gmail.com",
      firstName: "Hong Ni",
      lastName: "Fa",
      type: "scientist"
    }),
    //11 scientist
    User.create({
      username: "JustinKay",
      password: "whatup",
      email: "JustinKay@gmail.com",
      firstName: "Justin",
      lastName: "Kay",
      type: "scientist"
    }),
    //12 scientist
    User.create({
      username: "CatherineFoley",
      password: "whatssup",
      email: "CatherineFoley@gmail.com",
      firstName: "Catherine",
      lastName: "Foley",
      type: "scientist"
    }),
    //13 scientist
    User.create({
      username: "StefanGrundner",
      password: "whatssup",
      email: "StefanGrundner@gmail.com",
      firstName: "Stefan",
      lastName: "Grundner",
      type: "scientist"
    }),
    //14 scientist
    User.create({
      username: "BenjaminYetton",
      password: "whatssup",
      email: "BenjaminYetton@gmail.com",
      firstName: "Benjamin",
      lastName: "Yetton",
      type: "scientist"
    }),
    //15
    User.create({
      username: "simonwarby",
      password: "whatssup",
      email: "simonwarby@gmail.com",
      firstName: "Simon",
      lastName: "Warby",
    }),
    //16
    User.create({
      username: "saramednick",
      password: "whatssup",
      email: "saramednick@gmail.com",
      firstName: "Sara",
      lastName: "Mednick",
    }),
    //17
    User.create({
      username: "Karinelacourse",
      password: "whatssup",
      email: "Karinelacourse@gmail.com",
      firstName: "Karine",
      lastName: "Lacourse",
    }),
    //18
    User.create({
      username: "AlexRodriguez",
      password: "whatssup",
      email: "AlexRodriguez@gmail.com",
      firstName: "Alex",
      lastName: "Rodriguez",
    }),
    //19
    User.create({
      username: "KatieLeung",
      password: "whatssup",
      email: "KatieLeung@gmail.com",
      firstName: "Katie",
      lastName: "Leung",
    }),
    //20
    User.create({
      username: "HalleSmith",
      password: "whatssup",
      email: "HalleSmith@gmail.com",
      firstName: "Halle",
      lastName: "Smith",
    }),
    //21
    User.create({
      username: "ThomasFelton",
      password: "whatssup",
      email: "ThomasFelton@gmail.com",
      firstName: "Thomas",
      lastName: "Felton",
    }),
    //22
    User.create({
      username: "Aisha Hurst",
      password: "whatssup",
      email: "Aisha Hurst@gmail.com",
      firstName: "Aisha",
      lastName: "Hurst",
    }),
    //23
    User.create({
      username: "LandynPerkins",
      password: "whatssup",
      email: "LandynPerkins@gmail.com",
      firstName: "Landyn",
      lastName: "Perkins",
    }),
    //24
    User.create({
      username: "JasonDeleon",
      password: "whatssup",
      email: "JasonDeleon@gmail.com",
      firstName: "Jason",
      lastName: "Deleon",
    }),
    //25
    User.create({
      username: "HayleeNeal",
      password: "whatssup",
      email: "HayleeNeal@gmail.com",
      firstName: "Haylee",
      lastName: "Neal",
    }),
    //26
    User.create({
      username: "CiaraHuang",
      password: "whatssup",
      email: "CiaraHuang@gmail.com",
      firstName: "Ciara",
      lastName: "Huang",
    }),
    //27
    User.create({
      username: "BrianPark",
      password: "whatssup",
      email: "BrianPark@gmail.com",
      firstName: "Brian",
      lastName: "Park",
    }),
    //28
    User.create({
      username: "YeRimKim",
      password: "whatssup",
      email: "YeRimKim@gmail.com",
      firstName: "Yerim",
      lastName: "Kim",
    }),
  ]);

  //Assigning as scientist
  const scientistMurphy = await users[1].createScientist({
    publications: "hello",
    credentials: "credentials",
  });

  const scientistSavannah = await users[2].createScientist({
    publications: "A Study of Sharks",
    credentials: "PHD Candidate at Hawaiʻi Pacific University",
  });

  const scientistAlecia = await users[3].createScientist({
    publications:
      "Developmental transitions in body color in chacma baboon infants: Implications to estimate age and developmental pace.",
    credentials: "Lecturer in Evolutionary Anthropology at UCL",
  });

  const scientistEmerson = await users[4].createScientist({
    publications: "Humans and Their Effect on Natural Caves",
    credentials: "PHD Candidate at Harvard University",
  });

  const scientistChristian = await users[5].createScientist({
    publications: "Maternal and Infant Mortality in Southeast Asia",
    credentials: "Researcher at the Harvard Center for Health Decision Science",
  });

  const scientistAlex = await users[7].createScientist({
    publications: "Grooming Practices of Silverback Gorillas",
    credentials:
      "Lecturer in Evolutionanry Anthropology at University College London",
  });

  const scientistLinda = await users[6].createScientist({
    publications: "A Study of Jokes",
    credentials: "PHD Candidate at Washington University",
  });

  const scientistDocJokes = await users[8].createScientist({
    publications: "A Study of Jokes",
    credentials: "Researcher at Washington University",
  });

  const scientistCHyeRim = await users[9].createScientist({
    publications: "How Poverty Affects Human Infertility",
    credentials: "PHD Candidate at University of California",
  });

  const scientistHongni = await users[10].createScientist({
    publications: "An Overview of Modern Day Primates",
    credentials: "PHD Candidate at UCLA",
  });

  const scientistJustin = await users[11].createScientist({
    publications: "How to Study A Mammal Through the Use of AI",
    credentials: "Researcher at UC Berkeley",
  });

  const scientistCatherine = await users[12].createScientist({
    publications: "An Overview of Modern Day Primates",
    credentials: "PHD Candidate at UC Berkeley",
  });

  const scientistStefan = await users[13].createScientist({
    publications: "Psychology of Consumerism",
    credentials: "PHD Candidate at Georgetown University",
  });

  const scientistBenjamin = await users[14].createScientist({
    publications: "Sleep Cycles",
    credentials: "PHD Candidate at University of Canterbury, Christchurch",
  });

  //Creating Projects
  const bacteriaCave = await Project.create({
    name: "How do bacteria respond when humans damage caves?",
    description:
      "The Tongass National Forest in Alaska contains both damaged and undamaged caves. These caves are homes to a bacteria-rich mineraloid formation called moonmilk. Microbial communities play critical roles in maintaining ecosystem stability. This motivated my of team of cavers and cave explorers to travel to remote field sites this summer to collect and analyze samples and attempt to answer the question: Does human-caused damage to cave formations change the moonmilk ecosystem?",
    imageUrl:
      "https://d3t9s8cdqyboc5.cloudfront.net/images?path=1148380/lGu5QYcRTkyeSv56C7Ms_Logsdon_Sampling_Stripes_CDecelle.jpg&width=640&height=360",
    videoUrl: "https://www.youtube.com/embed/apSPGHbIHbw",
    project_timeline_start: "2022-07-01",
    project_timeline_end: "2022-12-01",
    campaign_timeline_start: "2022-04-15",
    campaign_timeline_end: "2022-06-15",
    fundraising_goal: 6,
    isFunded: false,
  });

  const maternalMortality = await Project.create({
    name: "Mathematical model to reduce maternal and infant mortality in Southeast Asia",
    description:
      "Maternal and child mortality in Southeast Asian countries is still very high, especially in poor and rural areas. The goal of our study is to develop user-friendly mathematical model to improve referral of high-risk term pregnancies in resource-poor settings; creating a more resource-efficient health system, while delivering better health outcomes to mothers and children.",
    imageUrl:
      "https://i.pinimg.com/originals/e6/ae/e3/e6aee3fb730dfce4e34afc6cc823eae5.jpg",
    videoUrl: "https://www.youtube.com/embed/42HIaK6fuWA",
    project_timeline_start: "2022-10-15",
    project_timeline_end: "2023-03-01",
    campaign_timeline_start: "2022-05-01",
    campaign_timeline_end: "2022-07-01",
    fundraising_goal: 2,
    isFunded: false,
  });

  const sharkPaleo = await Project.create({
    name: "Time traveling through shark skin: Unraveling a pre-historical baseline of Caribbean sharks",
    description:
      "How many sharks should there be on Caribbean reefs? Despite evidence suggesting that sharks once existed in numbers unheard of today, this critical question remains unanswered. We discovered that sharks leave a record of their presence in the form of dermal denticles, the tiny, tooth-like scales lining their skin, preserved in reef sediments. We are now pioneering denticles as an ecological tool to reconstruct pre-human shark baselines and supplement surveys on modern reefs.",
    imageUrl:
      "https://fishcostarica.com/wp-content/uploads/fishing_shark_costa_rica.jpg",
    videoUrl: "https://www.youtube.com/embed/4HGNqFdaD34",
    project_timeline_start: "2022-12-01",
    project_timeline_end: "2023-12-01",
    campaign_timeline_start: "2022-5-01",
    campaign_timeline_end: "2022-10-01",
    fundraising_goal: 3,
    isFunded: false,
  });

  const cephalapodProject = await Project.create({
    name: "What can cephalopods teach us about spatial memory and learning?",
    description:
      "Cephalopods and vertebrates have gone through similar circumstances that required adaptations such as learning and memory abilities. These skills are seen in some cephalopods which are able to solve mazes and navigate complex environments. The timing of this skill development in cephalopod evolution remains unknown. This project determines the spatial learning abilities of the O.bimaculoides by measuring recognition of habitats and pathway to the hidden food source.",
    imageUrl:
      "https://www.leisurepro.com/blog/wp-content/uploads/2020/04/shutterstock_274092959.jpg",
    videoUrl: "https://www.youtube.com/embed/oSyEZAm8nb8",
    project_timeline_start: "2022-06-01",
    project_timeline_end: "2023-10-15",
    campaign_timeline_start: "2022-5-01",
    campaign_timeline_end: "2022-10-01",
    fundraising_goal: 40,
    isFunded: false,
  });

  const funnyJokes = await Project.create({
    name: "Why are jokes funny?",
    description:
      "The first step of my research is to come up with theories for why jokes are funny. Next we will test those theories on thousands of jokes.Once we test theories for why jokes are funny, we can use those theories to improve old jokes and make new ones.",
    imageUrl:
      "https://i.pinimg.com/originals/3a/d9/75/3ad975c766a414b1dcf2de3778b700ab.jpg",
    videoUrl: "https://www.youtube.com/watch?v=IgYlRrgNiQQ",
    project_timeline_start: "2022-10-01",
    project_timeline_end: "2023-9-01",
    campaign_timeline_start: "2022-6-01",
    campaign_timeline_end: "2022-10-01",
    fundraising_goal: 3,
    isFunded: false,
  });

  const mommyPrimates = await Project.create({
    name: "Do Primate Mothers Grieve?",
    description:
      "Do primates understand death? Can they grieve? When a primate baby dies, often the mother will carry its corpse, in some cases for weeks. Some suggest this is evidence of grief. But we can look for other markers of grief, like those that humans show: depression, loss of appetite and lethargy. In this study, we will conduct a field study of macaques to quantify mothers behavioural responses to the deaths of their infants and search for evidence of grief.",
    imageUrl:
      "https://s3.amazonaws.com/spectrumnews-web-assets/uploads/2017/11/macaque-familycc.jpg",
    videoUrl: "https://www.youtube.com/embed/_yahK7ib9ys",
    project_timeline_start: "2022-10-01",
    project_timeline_end: "2023-9-01",
    campaign_timeline_start: "2022-6-01",
    campaign_timeline_end: "2022-10-01",
    fundraising_goal: 3,
    isFunded: false,
  });

  const sealBehaviorWithAI = await Project.create({
    name: "Understanding seal behavior with artificial intelligence",
    description:
      "Seals are important indicators for the health of our oceans, but it is often difficult to monitor their populations, especially in remote regions. Time-lapse cameras have made this monitoring more feasible, however the scale of data produced by these tools is prohibitively large. This project will enable automated AI-based analysis of this data via the publication of a large high-quality dataset of images collected of seal populations on remote islands near Antarctica over the last ten years.",
    imageUrl:
      "https://d3t9s8cdqyboc5.cloudfront.net/images?path=1149908/xnQwyCcxSMSQp6nLM86U_IMG_3958.JPG&width=640&height=360",
    videoUrl: "https://www.youtube.com/embed/BF2TZq-ntRQ",
    project_timeline_start: "2022-10-01",
    project_timeline_end: "2023-04-01",
    campaign_timeline_start: "2022-03-21",
    campaign_timeline_end: "2022-10-01",
    fundraising_goal: 5,
    isFunded: false,
  });

  const informedConsumers = await Project.create({
    name: "Why do informed consumers refrain from buying ethical products? Applying insights from behavioural economics",
    description:
      "Studies have shown that even well-informed consumers rarely purchase ethical products. Insights from behavioural economics suggest that informing consumers is not enough. In addition, consumers need to be reassured that other consumers purchase equally ethical products. Only then will they express their ethical values in their own purchase decisions and thus force firms to produce compliantly. My aim is to conduct an economic laboratory experiment that allows for analysing this market dynamics.",
    imageUrl:
      "https://d3t9s8cdqyboc5.cloudfront.net/images?path=137525/PIrVIQ8bSgmnX0kVhtaF_COLOURBOX20181414.jpg&width=640&height=360",
    videoUrl: "https://www.youtube.com/embed/UEtE-el6KKs",
    project_timeline_start: "2022-06-01",
    project_timeline_end: "2023-02-01",
    campaign_timeline_start: "2022-03-01",
    campaign_timeline_end: "2022-06-01",
    fundraising_goal: 3,
    isFunded: false,
  });

  const analysisOfSleep = await Project.create({
    name: "The People vs. Academia: Crowdsourcing the analysis of sleep",
    description:
      "Brainwaves during sleep are a window into cognition, early marker of mental disorders, and brain deterioration due to age. However, detection of brainwave patterns by highly trained experts is extremely time consuming and costly! We hypothesize, that through the power of crowdsourcing, the general public can match the performance of these learned experts and help us find these important patterns in the brain.",
    imageUrl:
      "https://d3t9s8cdqyboc5.cloudfront.net/images?path=49841/CuwopAXPSaeYpPyJwYhz_MODA Pic.png&width=640&height=360",
    videoUrl: "https://www.youtube.com/embed/6XmY6_WojuU",
    project_timeline_start: "2022-02-01",
    project_timeline_end: "2022-09-01",
    campaign_timeline_start: "2022-04-13",
    campaign_timeline_end: "2022-06-13",
    fundraising_goal: 8,
    isFunded: false,
  });

  const coralReefs = await Project.create({
    name: "Characterizing the resilience of coral reefs and island people",
    description:
      "Corals are one of the most important keystone species on the planet and greatly depend on the microbes in their mucus for survival. This study will test the hypothesis that the microbial community within coral mucus exhibits physicochemical responses during heavy sedimentation events. More specifically, coral reefs that can maintain their steady-state surface layer mucus microbiome will exhibit less signs of physiological stress.",
    imageUrl:
      "https://i.guim.co.uk/img/media/4be3d80ea95460c225f4eb6525f1f47a1764797a/0_275_4288_2573/master/4288.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=d6afe8fbbd0e29cf1b1f39a7038d00f5",
    videoUrl: "https://www.youtube.com/embed/ZiULxLLP32s",
    project_timeline_start: "2022-02-01",
    project_timeline_end: "2022-09-01",
    campaign_timeline_start: "2022-04-13",
    campaign_timeline_end: "2022-06-13",
    fundraising_goal: 15,
    isFunded: false,
  });

  const congoBasin = await Project.create({
    name: "How are rural communities on the edge of the largest tropical peat swamp forest in the Congo Basin using peat resources?",
    description:
      "Climate change and human interference threaten to degrade the world’s largest tropical peatland. No detailed assessment of the human uses of the central Congo Basin swamp forest exists. I will couple a remote sensing study on deforestation with an anthropological study in the Democratic Republic of Congo. I will explore how two communities living on the edge of the peatland forest use these resources and the values and cultural significance that they attribute to this unique ecosystem.",
    imageUrl:
      "https://theecologist.org/sites/default/files/styles/inline_l/public/2019-04/congo-basin-via-www.sizeofwales.org_.uk_-e1481900696869.jpg?itok=xNNFIboo",
    videoUrl: "https://www.youtube.com/embed/6t0k-hcffZw",
    project_timeline_start: "2022-02-01",
    project_timeline_end: "2022-09-01",
    campaign_timeline_start: "2022-04-13",
    campaign_timeline_end: "2022-06-13",
    fundraising_goal: 8,
    isFunded: false,
  });

  const americanChesnut = await Project.create({
    name: "Can RNAi be used to reduce the virulence of the pathogens of American chestnut?",
    description:
      "The American chestnut (Castanea dentata) was once an important member of the Appalachian ecosystem but was largely destroyed by two introduced plant pathogens. Through the use of techniques previously innovated by researchers at SUNY-ESF, a new form of biotechnology called RNA interference (RNAi) could potentially be pursued to confer resistance to these pathogens by silencing the genes they use to attack American chestnut.",
    imageUrl:
      "https://hudsonvalleyone.com/wp-content/uploads/2020/01/American-Chestnut-700x467-1.jpg",
    videoUrl: "https://www.youtube.com/embed/-mhMdUryolU",
    project_timeline_start: "2022-02-01",
    project_timeline_end: "2022-09-01",
    campaign_timeline_start: "2022-04-13",
    campaign_timeline_end: "2022-06-13",
    fundraising_goal: 5,
    isFunded: false,
  });

  const romeNewCities = await Project.create({
    name: "How did Rome create new cities to build an Empire?",
    description:
      "How did Rome become a preeminent Empire? How did they serially incorporate regions? To answer these questions we are conducting the archaeological excavation of Libarna, a unique Roman colonial site in North-West Italy. It was founded in 148 BCE right after the Second Punic War when Rome became the dominate power in the Mediterranean. By studying the material culture of the inhabitants we hypothesize we will be able to detect changes to the local indigenous and immigrant populations.",
    imageUrl:
      "https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTU3ODc5MDg1MzU2MDMzNzU5/ancient-rome-hero.jpg",
    videoUrl: "https://www.youtube.com/embed/gxqPbGqYACw",
    project_timeline_start: "2022-02-01",
    project_timeline_end: "2022-09-01",
    campaign_timeline_start: "2022-04-13",
    campaign_timeline_end: "2022-06-13",
    fundraising_goal: 22,
    isFunded: false,
  });

  const marinePollution = await Project.create({
    name: "Effects of marine pollution on Halophila hawaiiana",
    description:
      "Halophila hawaiiana is a Native Hawaiian seagrass that creates a habitat relied on by many organisms. H. hawaiiana is labeled as vulnerable to stressors likely due to development, invasive species, and pollution. Low leaf density of seagrass in Maunalua Bay compared to other populations of seagrass on Oahu has been observed this is possibly due to marine pollution. This study will measure the effects of ammonium exposure, simulating marine pollution, on H. hawaiiana.",
    imageUrl:
    'https://d3t9s8cdqyboc5.cloudfront.net/images?path=1136067/Z6Xj2PaqR1aUKUrCxVsg_IMG_7474 4.jpg&width=640&height=360',
    videoUrl: "https://www.youtube.com/embed/AXT7y9klHCI",
    project_timeline_start: "2022-02-01",
    project_timeline_end: "2022-09-01",
    campaign_timeline_start: "2022-04-13",
    campaign_timeline_end: "2022-06-13",
    fundraising_goal: 4,
    isFunded: false,
  });


  await users[0].createContribution({ projectId: 1, contributionAmount: 100 });

  //Add categories to project
  await cephalapodProject.createCategory({ category: "Biology" });
  await bacteriaCave.createCategory({ category: "Biology" });
  await maternalMortality.createCategory({ category: "Ecology" });
  await maternalMortality.createCategory({ category: "Mathematics" });
  await maternalMortality.createCategory({ category: "Biology" });
  await mommyPrimates.createCategory({ category: "Anthropology" });
  await mommyPrimates.createCategory({ category: "Psychology" });
  await funnyJokes.createCategory({ category: "Mathematics" });
  await funnyJokes.createCategory({ category: "Computer Science" });
  await sealBehaviorWithAI.createCategory({ category: "Computer Science" });
  await sealBehaviorWithAI.createCategory({ category: "Biology" });
  await sealBehaviorWithAI.createCategory({ category: "Ecology" });
  await informedConsumers.createCategory({ category: "Economics" });
  await informedConsumers.createCategory({ category: "Social Science" });
  await analysisOfSleep.createCategory({ category: "Computer Science" });
  await analysisOfSleep.createCategory({ category: "Biology" });
  await coralReefs.createCategory({ category: "Biology" });
  await coralReefs.createCategory({ category: "Ecology" });
  await congoBasin.createCategory({ category: "Ecology" });
  await congoBasin.createCategory({ category: "Biology" });
  await americanChesnut.createCategory({ category: "Biology" });
  await americanChesnut.createCategory({ category: "Ecology" });
  await romeNewCities.createCategory({ category: "Anthropology" });
  await marinePollution.createCategory({ category: "Ecology" });

  //adding scientist to project
  await scientistMurphy.addProject(sharkPaleo);
  await scientistSavannah.addProject(sharkPaleo);
  await scientistHongni.addProject(sharkPaleo);
  await scientistHongni.addProject(cephalapodProject);
  await scientistAlecia.addProject(cephalapodProject);
  await scientistAlex.addProject(bacteriaCave);
  await scientistEmerson.addProject(bacteriaCave);
  await scientistChristian.addProject(maternalMortality);
  await scientistCHyeRim.addProject(maternalMortality);
  await scientistDocJokes.addProject(funnyJokes);
  await scientistLinda.addProject(funnyJokes);
  await scientistHongni.addProject(mommyPrimates);
  await scientistAlex.addProject(mommyPrimates);
  await scientistJustin.addProject(sealBehaviorWithAI);
  await scientistCatherine.addProject(sealBehaviorWithAI);
  await scientistStefan.addProject(informedConsumers);
  await scientistLinda.addProject(informedConsumers);
  await scientistBenjamin.addProject(analysisOfSleep);
  await scientistLinda.addProject(analysisOfSleep);
  await scientistCHyeRim.addProject(analysisOfSleep);
  await scientistAlex.addProject(analysisOfSleep);
  await scientistHongni.addProject(coralReefs);
  await scientistMurphy.addProject(congoBasin);
  await scientistAlex.addProject(congoBasin);
  await scientistEmerson.addProject(americanChesnut);
  await scientistChristian.addProject(romeNewCities);
  await scientistCHyeRim.addProject(romeNewCities);
  await scientistJustin.addProject(marinePollution);

  await marinePollution.createContribution({userId: 3, contributionAmount: 3})
  await marinePollution.createContribution({userId: 4, contributionAmount: 5})

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}





/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
