const funnyJokes = await Project.create({
  name: "Why are jokes funny?",
  description:
    "The first step of my research is to come up with theories for why jokes are funny. Next we will test those theories on thousands of jokes.Once we test theories for why jokes are funny, we can use those theories to improve old jokes and make new ones.",
  imageUrl:"https://i.pinimg.com/originals/3a/d9/75/3ad975c766a414b1dcf2de3778b700ab.jpg",
  videoUrl: 'https://www.youtube.com/watch?v=IgYlRrgNiQQ',
  project_timeline_start: "2022-10-01",
  project_timeline_end: "2023-9-01",
  campaign_timeline_start: "2022-6-01",
  campaign_timeline_end: "2022-10-01",
  fundraising_goal: 3,
  isFunded: false,
});

User.create({
    username: 'lindalinda',
    password: '3.14159265',
    email: 'linda@seed.js',
    firstName: 'Linda',
    lastName: 'Chilton',
  })

  const scientistLinda = await users[2].createScientist({
    publications: 'A Study of Jokes',
    credentials: 'PHD Candidate at Washington University',
  });

  await funnyJokes.createCategory({ category: 'Mathematics' });
  await funnyJokes.createCategory({ category: 'Computer Science' });


const mommyPrimates = await Project.create({
  name: "Do Primate Mothers Grieve?",
  description:
  "Do primates understand death? Can they grieve? When a primate baby dies, often the mother will carry its corpse, in some cases for weeks. Some suggest this is evidence of grief. But we can look for other markers of grief, like those that humans show: depression, loss of appetite and lethargy. In this study, we will conduct a field study of macaques to quantify mothers behavioural responses to the deaths of their infants and search for evidence of grief.",  
  imageUrl:"https://s3.amazonaws.com/spectrumnews-web-assets/uploads/2017/11/macaque-familycc.jpg",
  videoUrl: 'https://www.youtube.com/watch?v=_yahK7ib9ys',
  project_timeline_start: "2022-10-01",
  project_timeline_end: "2023-9-01",
  campaign_timeline_start: "2022-6-01",
  campaign_timeline_end: "2022-10-01",
  fundraising_goal: 3,
  isFunded: false,
});

User.create({
    username: 'AlexC',
    password: 'primatesRule',
    email: 'Alex@seed.js',
    firstName: 'Alex',
    lastName: 'Carter',
  })

  const scientistAlex = await users[2].createScientist({
    publications: 'Grooming Practices of Silverback Gorillas',
    credentials: 'Lecturer in Evolutionanry Anthropology at University College London',
  });

  await mommyPrimates.createCategory({ category: 'Anthropology' });
  await mommyPrimates.createCategory({ category: 'Psychology' });