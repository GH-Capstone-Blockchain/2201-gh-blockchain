'use strict';

const {
  db,
  models: { User, Project },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody123',
      password: '123',
      email: 'cody@seed.js',
      firstName: 'cody',
      lastName: 'hamilton',
    }),
    User.create({
      username: 'murphy123',
      password: '123',
      email: 'murphy@seed.js',
      firstName: 'murphy',
      lastName: 'albert',
    }),
    User.create({
      username: 'SavannahL',
      password: 'geniusScientist',
      email: 'savannah@seed.js',
      firstName: 'Savannah',
      lastName: 'Laliberte',
    }),
    User.create({
      username: 'AleciaC',
      password: 'anthrolady',
      email: 'alecia@seed.js',
      firstName: 'Alecia',
      lastName: 'Carter',
    })
  ]);

  //Assigning as scientist
  const scientistMurphy = await users[1].createScientist({
    publications: 'hello',
    credentials: 'credentials',
  });

  const scientistSavannah = await users[2].createScientist({
    publications: 'A Study of Sharks',
    credentials: 'PHD Candidate at Hawaiʻi Pacific University',
  });

  const scientistAlecia = await users[3].createScientist({
    publications: 'Developmental transitions in body color in chacma baboon infants: Implications to estimate age and developmental pace.',
    credentials: 'Lecturer in Evolutionary Anthropology at UCL',
  });

  //Creating Projects
  const project = await Project.create({
    name: 'Science',
    description: 'lots of science happening',
  });

  const sharkPaleo = await Project.create({
    name: 'Time traveling through shark skin: Unraveling a pre-historical baseline of Caribbean sharks',
    description:
      'How many sharks should there be on Caribbean reefs? Despite evidence suggesting that sharks once existed in numbers unheard of today, this critical question remains unanswered. We discovered that sharks leave a record of their presence in the form of dermal denticles, the tiny, tooth-like scales lining their skin, preserved in reef sediments. We are now pioneering denticles as an ecological tool to reconstruct pre-human shark baselines and supplement surveys on modern reefs.',
    imageUrl: 'https://fishcostarica.com/wp-content/uploads/fishing_shark_costa_rica.jpg',
    videoUrl: 'https://www.youtube.com/embed/4HGNqFdaD34',
    project_timeline_start: '2022-12-01',
    project_timeline_end: '2023-12-01',
    campaign_timeline_start: '2022-5-01',
    campaign_timeline_end: '2022-10-01',
    fundraising_goal: 3,
    isFunded: false,
  });

  const cephalapodProject = await Project.create({
    name: 'What can cephalopods teach us about spatial memory and learning?',
    description:
      'Cephalopods and vertebrates have gone through similar circumstances that required adaptations such as learning and memory abilities. These skills are seen in some cephalopods which are able to solve mazes and navigate complex environments. The timing of this skill development in cephalopod evolution remains unknown. This project determines the spatial learning abilities of the O.bimaculoides by measuring recognition of habitats and pathway to the hidden food source.',
    imageUrl:
      'https://www.leisurepro.com/blog/wp-content/uploads/2020/04/shutterstock_274092959.jpg',
    videoUrl: 'https://www.youtube.com/embed/oSyEZAm8nb8',
    project_timeline_start: '2022-06-01',
    project_timeline_end: '2023-10-15',
    campaign_timeline_start: '2022-5-01',
    campaign_timeline_end: '2022-10-01',
    fundraising_goal: 40,
    isFunded: false,
  });

  await users[0].createContribution({ projectId: 1, contributionAmount: 100 });

  //Add categories to project
  await project.createCategory({ category: 'Mathematics' });
  await project.createCategory({ category: 'Earth Science' });

  //adding scientist to project
  await scientistMurphy.addProject(sharkPaleo);
  await scientistSavannah.addProject(sharkPaleo);
  await scientistAlecia.addProject(cephalapodProject);

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
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
