// Demo dataset for the static portfolio build (DEMO_MODE=true).
// Shapes mirror the backend's Prisma models (backend/prisma/schema.prisma) and
// the content mirrors backend/prisma/seed.ts. Money is stored in cents, except
// Project.goal which is in euros (same convention as the real API).

export const DEMO_EMAIL = 'demo@demo.com';
export const DEMO_PASSWORD = 'test1234';

const DAY = 24 * 60 * 60 * 1000;
const daysAgo = (n) => new Date(Date.now() - n * DAY).toISOString();

// Stable placeholder photos for seed images whose original URLs no longer resolve.
const placeholder = (seed) => `https://picsum.photos/seed/fundy-${seed}/800/600`;

const association = (id, n, fields) => ({
  id,
  isVerified: true,
  userId: null,
  ownerId: null,
  createdAt: daysAgo(n),
  updatedAt: daysAgo(n),
  Donations: [],
  ...fields,
  Actions: (fields.Actions || []).map((action, i) => ({
    id: `${id}-action-${i}`,
    projectId: null,
    associationId: id,
    createdAt: daysAgo(n),
    ...action,
  })),
});

const project = (id, n, fields) => {
  const p = {
    id,
    isVerified: true,
    userId: null,
    ownerId: null,
    createdAt: daysAgo(n),
    updatedAt: daysAgo(n),
    Donations: [],
    ...fields,
    Actions: (fields.Actions || []).map((action, i) => ({
      id: `${id}-action-${i}`,
      projectId: id,
      associationId: null,
      createdAt: daysAgo(n),
      ...action,
    })),
  };
  return p;
};

export const associations = [
  association('asso-croix-rouge', 2, {
    email: 'la-croix-rouge@example.org',
    name: 'La croix rouge',
    title: 'La croix rouge',
    description: 'La Croix-Rouge française (CRF) est une association d\'aide humanitaire française fondée en 1864. Elle a pour objectif de venir en aide aux personnes en difficulté en France et à l\'étranger. Ses missions fondamentales sont l\'urgence, le secourisme, l\'action sociale, la formation, la santé et l\'action internationale.',
    raisedCurrently: 2429098,
    image: 'https://www.mitry-mory.fr/wp-content/uploads/2021/09/croix-rouge.jpg',
    tags: ['HEALTH', 'GLOBAL'],
    latitude: 46.8120558,
    longitude: 1.7129312,
    Actions: [{
      title: 'Repas pour des sans abris',
      description: '1000 repas distribués',
      image: 'https://cdn.paris.fr/paris/2020/12/03/huge-3fac0ee1079bcb4a65eaa5f2d71dbe4d.jpg',
    }],
  }),
  association('asso-sea-shepherd', 3, {
    email: 'sea-sheaprd@example.org',
    name: 'Sea Shepard',
    title: 'Sea Shepard',
    description: 'La mission de Sea Shepherd est de lutter contre la destruction de la vie et de l’habitat marin dans son ensemble. Depuis 1977, nous utilisons des stratégies novatrices d’action directe pour défendre, conserver et protéger la biodiversité fragile de nos mers, océans, et faire respecter les lois internationales de conservation, trop souvent bafouées.',
    raisedCurrently: 40210030,
    image: 'https://www.faunesauvage.fr/wp-content/uploads/2018/11/SS_JR_Logo_white_0-1-1024x902.png',
    tags: ['OCEAN'],
    latitude: 48.8458061,
    longitude: 2.288264,
    Actions: [{
      title: 'Achat d\'un nouveau bateau',
      description: 'Ajout d\'un bateau à la flotte',
      image: 'https://assets.meretmarine.com/s3fs-public/images/2015-01/20150127002805_150126-dream-project-ship-large.jpg',
    }, {
      title: 'Matériel de plongé',
      description: 'Remplacement du matériel défectueux',
      image: placeholder('diving'),
    }],
  }),
  association('asso-spa', 4, {
    email: 'spa@example.org',
    name: 'Spa',
    title: 'Spa',
    description: 'La Société Protectrice des Animaux (SPA) est la première association de protection animale en France. Elle a été créée en 1845 et reconnue d’utilité publique en 1860.',
    raisedCurrently: 196054,
    image: 'https://www.la-spa.fr/app/assets-spa/uploads/2021/10/lasso-deskop-2.jpg',
    tags: ['ANIMAL'],
    latitude: 48.8875873,
    longitude: 2.2992204,
    Actions: [{
      title: 'Refuge dans le 77',
      description: 'Création d\'un nouveau refuge dans la ville de Meaux',
      image: 'https://www.la-spa.fr/app/assets-spa/uploads/2021/09/Refuge-Pornic.jpg',
    }],
  }),
  association('asso-humanappeal', 5, {
    email: 'humanappeal@example.org',
    name: 'Humanappeal',
    title: 'Humanappeal',
    description: 'Calculez puis donnez votre Zakat Al Maal en faveur de projets durables, pour les populations les plus démunies de la planète !',
    raisedCurrently: 216005,
    image: placeholder('humanappeal'),
    tags: ['HEALTH', 'CHILDREN'],
    latitude: 48.9171113,
    longitude: 2.3398748,
  }),
  association('asso-villenoy-tennis', 6, {
    email: 'villenoy-tennis-club@example.org',
    name: 'Villenoy tennis club',
    title: 'Villenoy tennis club',
    description: 'Club de tennis officiel de la grande ville de Villenoy juste à côté de Meaux et son brie',
    raisedCurrently: 40073,
    image: 'https://www.sortiraparis.com/images/58/74061/401722-ou-jouer-au-tennis-a-paris-sur-terrain-decouvert.jpg',
    tags: ['SPORT', 'HEALTH', 'TENNIS'],
    latitude: 48.9381057,
    longitude: 2.8591061,
  }),
  association('asso-fff', 8, {
    email: 'fff@example.org',
    name: 'Fédération française de football',
    title: 'Fédération française de football',
    description: 'La Fédération française de football (FFF) est une association française, fondée le 7 avril 1919, regroupant les clubs de football de France et de Monaco et chargée de l\'organisation de la pratique du football en France, notamment des compétitions nationales et des matchs internationaux des équipes de France.',
    raisedCurrently: 5432612,
    image: placeholder('football'),
    tags: ['SPORT', 'FOOTBALL'],
    latitude: 48.8458061,
    longitude: 2.288264,
  }),
  association('asso-generations-futures', 9, {
    email: 'generations-futures@example.org',
    name: 'Génération Futures',
    title: 'Génération Futures',
    description: 'Générations Futures est une association de défense de l’environnement agréée par le ministère de l’Ecologie depuis 2008, et reconnue d’intérêt générale. L’association a été fondée en 1996.',
    raisedCurrently: 7212304,
    image: 'https://www.generations-futures.fr/wp-content/themes/generationsfutures/images/illustrations/agis.jpg',
    tags: ['PLANET'],
    latitude: 48.8458061,
    longitude: 2.288264,
  }),
];

export const projects = [
  project('proj-volt', 1, {
    email: 'volt@example.org',
    name: 'Volt',
    title: 'Volt',
    description: 'Volt est une entreprise française indépendante créée en 2021. Tout ce que nous faisons vise à cultiver le sentiment de liberté au quotidien. Nous concevons des véhicules modulaires qui rendent les déplacements quotidiens exaltants.',
    goal: 10000,
    raisedCurrently: 242998,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQorkh4Xozkgl1mIvl52rH0MyfkG8UzjOTFi6KAdCYqSDlkR0YECiSUOEexO2DABl_RMnk&usqp=CAU',
    tags: ['SPORT'],
    latitude: 42.8120558,
    longitude: 1.2129312,
    Actions: [{
      title: 'Première version',
      description: 'Réalisation de la V1 de notre projet Volt',
      image: 'https://cdn.cleanrider.com/uploads/2021/07/bajaboard-skateboard-electrique-pantera_040319.jpg',
    }],
  }),
  project('proj-wazabi', 2, {
    email: 'wazabi@example.org',
    name: 'Wazabi',
    title: 'Wazabi',
    description: 'Vous êtes-vous déjà ennuyé en soirée ? Nous avons pour but de pimenter vos soirées avec ce jeu de société épicé',
    goal: 100000,
    raisedCurrently: 5210000,
    image: 'https://i0.wp.com/cestquoicebruit.com/wp-content/uploads/2020/04/blog-famille-mes-jeux-de-societe-preferes.jpg?fit=1024%2C768&ssl=1',
    tags: ['BOARD GAME'],
    latitude: 48.8875873,
    longitude: 2.2992204,
  }),
  project('proj-kingdom', 3, {
    email: 'switchGame@example.org',
    name: 'kingdom',
    title: 'kingdom the game',
    description: 'L\'innovation du jeu vidéo est en marche, prenez part avec nous à cette révolution',
    goal: 45000,
    raisedCurrently: 1500000,
    image: 'https://www.dynamique-mag.com/wp-content/uploads/08d52b71cb5e49767f8d7acd19bd7b79.jpg',
    tags: ['GAMING'],
    latitude: 48.8875873,
    longitude: 2.2992204,
  }),
  project('proj-mug', 4, {
    email: 'mug@example.org',
    name: 'Mug v2',
    title: 'Mug chauffant',
    description: 'Grâce à notre mug chauffant, adieu le café froid !',
    goal: 11500,
    raisedCurrently: 570000,
    image: placeholder('mug'),
    tags: ['HOUSE'],
    latitude: 48.8875873,
    longitude: 2.2992204,
  }),
  project('proj-shield', 5, {
    email: 'shield@example.org',
    name: 'Shield',
    title: 'Shield',
    description: 'Nous avons pour but de rendre votre téléphone incassable',
    goal: 15000,
    raisedCurrently: 700000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEJmNUMn1INg60IE6aX3PpkdDcRBIRv-anMg&usqp=CAU',
    tags: ['PHONE'],
    latitude: 48.8875873,
    longitude: 2.2992204,
  }),
  project('proj-cappy', 6, {
    email: 'cappy@example.org',
    name: 'Cappy',
    title: 'Cappy',
    description: 'Fini la routine et les casquettes qui se ressemblent toutes, personnalisez la vôtre pour la rendre unique !',
    goal: 5000,
    raisedCurrently: 145000,
    image: placeholder('cap'),
    tags: ['CLOTHES'],
    latitude: 48.8875873,
    longitude: 2.2992204,
  }),
  project('proj-thirsty', 7, {
    email: 'thirsty@example.org',
    name: 'Thirsty',
    title: 'Thirsty',
    description: 'Fatigué de préparer des cocktails pour vos invités ? Nous sommes là pour vous et on s\'occupe de tout !',
    goal: 10000,
    raisedCurrently: 216500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb13v3mLJ_Tt4gm4uDtHwQ1ghvyIzj8ssXqQ&usqp=CAU',
    tags: ['ALCOHOL'],
    latitude: 45.9171113,
    longitude: 3.3398748,
  }),
];

export const banks = [
  'BNP Paribas', 'Société Générale', 'Crédit Agricole', 'Banque Populaire',
  'Caisse d\'Epargne', 'LCL', 'Crédit Mutuel', 'La Banque Postale',
  'Boursorama', 'Revolut', 'N26', 'Fortuneo',
].map((name) => ({
  id: name.toUpperCase().replace(/[^A-Z0-9]+/g, '_'),
  name,
  bic: 'DEMOFRPP',
  transaction_total_days: '730',
  countries: ['FR'],
  logo: null,
}));

const DEMO_ACCOUNT_ID = 'demo-account-1';

// Card purchases on the linked account; roundAmount is what Fundy put aside.
const purchases = [1250, 340, 2799, 875, 1520, 460, 3390, 1105, 690, 2240, 1515, 5430];
const roundUp = (cents) => (Math.ceil(cents / 100) * 100) - cents || 100;

export function createDemoUser() {
  const id = 'demo-user';
  const Transactions = purchases.map((initialAmount, i) => ({
    id: `demo-tx-${i}`,
    userId: id,
    bankAccountId: DEMO_ACCOUNT_ID,
    initialAmount,
    amount: initialAmount + roundUp(initialAmount),
    roundAmount: roundUp(initialAmount),
    processed: i > 2,
    createdAt: daysAgo(i * 2 + 1),
    updatedAt: daysAgo(i * 2 + 1),
  }));
  const Donations = [
    { id: 'demo-don-0', amount: 500, type: 'piggy-bank', projectId: 'proj-volt', associationId: null, createdAt: daysAgo(6) },
    { id: 'demo-don-1', amount: 1000, type: 'card', projectId: null, associationId: 'asso-spa', createdAt: daysAgo(12) },
    { id: 'demo-don-2', amount: 300, type: 'piggy-bank', projectId: null, associationId: 'asso-croix-rouge', createdAt: daysAgo(20) },
  ].map((d) => ({ ...d, userId: id }));

  return {
    id,
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD, // only ever lives in the visitor's browser
    firstname: 'Camille',
    lastname: 'Martin',
    type: 'CUSTOMER',
    lang: 'fr',
    isVerified: true,
    darkMode: false,
    profilePicture: '',
    roundedTo: 1,
    piggyBank: 2450,
    stripeCustomerId: 'cus_demo',
    nordigenRequisitions: [],
    passwordResetToken: null,
    paypalAccessToken: null,
    paypalRefreshToken: null,
    paypalLastRefresh: null,
    trueLayerAccessToken: null,
    trueLayerLastRefresh: null,
    deviceNotificationToken: null,
    createdAt: daysAgo(60),
    updatedAt: daysAgo(1),
    pg: null,
    bankAccounts: [{
      id: DEMO_ACCOUNT_ID,
      accountId: 'demo-acc',
      requisitionId: 'demo-req',
      userId: id,
      status: 'ACTIVE',
      iban: 'FR7630006000011234567890189',
      institution: 'Boursorama',
      numberOfTransactions: Transactions.length,
      createdAt: daysAgo(45),
      updatedAt: daysAgo(1),
    }],
    Transactions,
    Donations,
    // stored as ids, expanded to full objects in responses
    followedProjectIds: ['proj-wazabi', 'proj-kingdom'],
    followedAssociationIds: ['asso-sea-shepherd'],
    OnwedAssociations: [],
    OwnedProjects: [],
  };
}
