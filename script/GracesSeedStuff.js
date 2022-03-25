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

User.create({
  username: "RalphieEmerson",
  password: "1234",
  email: "ralphieemerson@gmail.com",
  firstName: "Ralphie",
  lastName: "Emerson",
});

const scientistEmerson = await users[2].createScientist({
  publications: "Humans and Their Effect on Natural Caves",
  credentials: "PHD Candidate at Harvard University",
});

await 
await bacteriaCave.createCategory({ category: "Biology" });


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
  fundraising_goal: 1.5,
  isFunded: false,
});

User.create({
  username: "ChristianS",
  password: "seasianmothers",
  email: "ChristianSuharlim@gmail.com",
  firstName: "Christian",
  lastName: "Suharlim",
});

const scientistChristian = await users[2].createScientist({
  publications: "Maternal and Infant Mortality in Southeast Asia",
  credentials:
    "Researcher at the Harvard Center for Health Decision Science",
});

await maternalMortality.createCategory({ category: "Ecology" }); 
