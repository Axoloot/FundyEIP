import bcrypt from 'bcrypt';
import { UserType, PrismaClient } from '@prisma/client'

import stripe from '../src/services/stripe';
import { userSelection } from '../src/components/users/entities';

const prisma = new PrismaClient()

async function main() {
  const demoUser = {
    password: 'test1234',
    email: 'demo@demo.com',
    lastname: 'lastname_test',
    firstname: 'firstname_test',
  };

  demoUser.password = await bcrypt.hash(demoUser.password, 12);

  const stripeCustomer = await stripe.customers.create({
    email: demoUser.email.toLowerCase().trim(),
    name: `${demoUser.firstname} ${demoUser.lastname}`,
  });

  const demo = await prisma.user.create({
    data: {
      ...demoUser,
      type: UserType.CUSTOMER,
      stripeCustomerId: stripeCustomer.id,
    },
    select: userSelection,
  });

  console.log('---------- USER ----------');
  console.log('demo user successfully created.');
  console.log(`email: ${demo.email}`);
  console.log('password: test1234\n');

  const associations = [{
    email: 'la-croix-rouge@example.org',
    name: 'La croix rouge',
    title: 'La croix rouge',
    description: 'La Croix-Rouge française (CRF) est une association d\'aide humanitaire française fondée en 1864. Elle a pour objectif de venir en aide aux personnes en difficulté en France et à l\'étranger. Ses missions fondamentales sont l\'urgence, le secourisme, l\'action sociale, la formation, la santé et l\'action internationale.',
    raisedCurrently: 2429098,
    image: 'https://www.mitry-mory.fr/wp-content/uploads/2021/09/croix-rouge.jpg',
    tags: ['HEALTH', 'GLOBAL'],
    latitude: 46.8120558,
    longitude: 1.7129312,
    Actions: {
      create: [{
        title: 'Repas pour des sans abris',
        description: '1000 repas distribués',
        image: 'https://cdn.paris.fr/paris/2020/12/03/huge-3fac0ee1079bcb4a65eaa5f2d71dbe4d.jpg',
      }]
    }
  }, {
    email: 'sea-sheaprd@example.org',
    name: 'Sea Shepard',
    title: 'Sea Shepard',
    description: 'La mission de Sea Shepherd est de lutter contre la destruction de la vie et de l’habitat marin dans son ensemble. Depuis 1977, nous utilisons des stratégies novatrices d’action directe pour défendre, conserver et protéger la biodiversité fragile de nos mers, océans, et faire respecter les lois internationales de conservation, trop souvent bafouées.',
    raisedCurrently: 40210030,
    image: 'https://www.faunesauvage.fr/wp-content/uploads/2018/11/SS_JR_Logo_white_0-1-1024x902.png',
    tags: ['OCEAN'],
    latitude: 48.8458061,
    longitude: 2.288264,
    Actions: {
      create: [{
        title: 'Achat d\'un nouveau bateau',
        description: 'Ajout d\'un bateau à la flotte',
        image: 'https://assets.meretmarine.com/s3fs-public/images/2015-01/20150127002805_150126-dream-project-ship-large.jpg',
      }, {
        title: 'Matériel de plongé',
        description: 'Remplacement du matériel défectueux',
        image: 'https://magazine.click-dive.com/wp-content/uploads/2018/04/Matos-plong%C3%A9e.jpg',
      }]
    }
  }, {
    email: 'spa@example.org',
    name: 'Spa',
    title: 'Spa',
    description: 'La Société Protectrice des Animaux (SPA) est la première association de protection animale en France. Elle a été créée en 1845 et reconnue d’utilité publique en 1860.',
    raisedCurrently: 196054,
    image: 'https://www.la-spa.fr/app/assets-spa/uploads/2021/10/lasso-deskop-2.jpg',
    tags: ['ANIMAL'],
    latitude: 48.8875873,
    longitude: 2.2992204,
    Actions: {
      create: [{
        title: 'Refuge dans le 77',
        description: 'Création d\'un nouveau refuge dans la ville de Meaux',
        image: 'https://www.la-spa.fr/app/assets-spa/uploads/2021/09/Refuge-Pornic.jpg',
      }]
    }
  }, {
    email: 'humanappeal@example.org',
    name: 'Humanappeal',
    title: 'Humanappeal',
    description: 'Calculez puis donnez votre Zakat Al Maal en faveur de projets durables, pour les populations les plus démunies de la planète !',
    raisedCurrently: 216005,
    image: 'https://radioorient.lesindesradios.net/upload/podcasts/photos/carre/60907518a79ad3.71475329_mini.jpeg',
    tags: ['HEALTH', 'CHILDREN'],
    latitude: 48.9171113,
    longitude: 2.3398748,
  }, {
    email: 'villenoy-tennis-club@example.org',
    name: 'Villenoy tennis club',
    title: 'Villenoy tennis club',
    description: 'Club de tennis officiel de la grande ville de Villenoy juste à côté de Meaux et son brie',
    raisedCurrently: 40073,
    image: 'https://www.sortiraparis.com/images/58/74061/401722-ou-jouer-au-tennis-a-paris-sur-terrain-decouvert.jpg',
    tags: ['SPORT', 'HEALTH', 'TENNIS'],
    latitude: 48.9381057,
    longitude: 2.8591061,
  }, {
    email: 'fff@example.org',
    name: 'Fédération française de football',
    title: 'Fédération française de football',
    description: 'La Fédération française de football (FFF) est une association française, fondée le 7 avril 1919 sous le nom de Fédération française de football association (FFFA), regroupant les clubs de football de France et de Monaco et chargée de l\'organisation de la pratique du football en France, notamment des compétitions nationales et des matchs internationaux des équipes de France.',
    raisedCurrently: 5432612,
    image: 'https://resize-europe1.lanmedia.fr/r/622,311,forcex,center-middle/img/var/europe1/storage/images/europe1/sport/fff-lfp-qui-fait-quoi-1370132/21310736-5-fre-FR/Football-FFF-LFP-qui-fait-quoi.jpg',
    tags: ['SPORT', 'FOOTBALL'],
    latitude: 48.8458061,
    longitude: 2.288264,
  }, {
    email: 'generations-futures@example.org',
    name: 'Génération Futures',
    title: 'Génération Futures',
    description: 'Générations Futures est une association de défense de l’environnement agréée par le ministère de l’Ecologie depuis 2008 (renouvellement obtenu en 2014 et 2019), et reconnue d’intérêt générale. L’association a été fondée en 1996 (anciennement nommée le Mouvement pour les Droits et le Respect des Générations Futures ou MDRGF) par un ingénieur agronome, Georges Toutain, et un enseignant, François Veillerette, coauteur de l’ouvrage de référence « Pesticides, révélations sur un scandale français », paru chez Fayard en 2007.',
    raisedCurrently: 7212304,
    image: 'https://www.generations-futures.fr/wp-content/themes/generationsfutures/images/illustrations/agis.jpg',
    tags: ['PLANET'],
    latitude: 48.8458061,
    longitude: 2.288264,
  }];

  await Promise.all(associations.map(async (association) => {
    await prisma.association.create({ data: association });
  }));

  console.log('---------- ASSOCIATIONS ----------')
  console.log('Associations successfully created:');
  associations.forEach((association) => console.log(association.name));
  console.log();

  const projects = [{
    email: 'volt@example.org',
    name: 'Volt',
    title: 'Volt',
    description: 'Volt est une entreprise française indépendante créée en 2021 et détenue à 98 % par ses fondateurs et leurs familles. Tout ce que nous faisons vise à cultiver le sentiment de liberté au quotidien. Nous concevons des véhicules qui rendent les déplacements quotidiens exaltants. Nos véhicules sont modulaires de façon à être aussi utiles pour vous rendre à votre lieu de travail que pour faire les courses, sortir en couple ou déposer vos enfants à l’école.',
    goal: 10000,
    raisedCurrently: 242998,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQorkh4Xozkgl1mIvl52rH0MyfkG8UzjOTFi6KAdCYqSDlkR0YECiSUOEexO2DABl_RMnk&usqp=CAU',
    tags: ['SPORT'],
    latitude: 42.8120558,
    longitude: 1.2129312,
    Actions: {
      create: [{
        title: 'Première version',
        description: 'Réalisation de la V1 de notre projet Volt',
        image: 'https://cdn.cleanrider.com/uploads/2021/07/bajaboard-skateboard-electrique-pantera_040319.jpg',
      }]
    }
  }, {
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
  }, {
    email: 'switchGame@example.org',
    name: 'kingdom',
    title: 'kingdom the game',
    description: 'L\'innovation du jeu vidéo est marche, prenez part avec nous pour cette révolution',
    goal: 45000,
    raisedCurrently: 1500000,
    image: 'https://www.dynamique-mag.com/wp-content/uploads/08d52b71cb5e49767f8d7acd19bd7b79.jpg',
    tags: ['GAMING'],
    latitude: 48.8875873,
    longitude: 2.2992204,
  }, {
    email: 'mug@example.org',
    name: 'Mug v2',
    title: 'Mug chaufant',
    description: 'Grâce à notre mug chauffant, adieu le café froid ! ',
    goal: 11500,
    raisedCurrently: 570000,
    image: 'https://cdn-60b12283c1ac185aa47c6d65.closte.com/wp-content/uploads/2021/12/Muggo_Qi_Grande_Blanc_1-1.jpg',
    tags: ['HOUSE'],
    latitude: 48.8875873,
    longitude: 2.2992204,
  },{
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
  }, {
    email: 'cappy@example.org',
    name: 'Cappy',
    title: 'Cappy',
    description: 'Fini la routine et les casquettes qui se ressemblent toutes, personnaliser la votre pour la rendre unique !',
    goal: 5000,
    raisedCurrently: 145000,
    image: 'https://www.casquette-personnalisee.biz/photos/blog/4011.jpg',
    tags: ['CLOTHES'],
    latitude: 48.8875873,
    longitude: 2.2992204,
  }, {
    email: 'thirsty@example.org',
    name: 'Thirsty',
    title: 'Thirsty',
    description: 'Fatiguer de préparer des cocktails pour vos invités ? Nous sommes la pour vous et on s\'occupe de tout !',
    goal: 10000,
    raisedCurrently: 216500,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb13v3mLJ_Tt4gm4uDtHwQ1ghvyIzj8ssXqQ&usqp=CAU',
    tags: ['ALCOHOL'],
    latitude: 45.9171113,
    longitude: 3.3398748,
  }];

  await Promise.all(projects.map(async (project) => {
    await prisma.project.create({ data: project });
  }));

  console.log('---------- PROJECTS ----------')
  console.log('Projects successfully created:');
  projects.forEach((project) => console.log(project.name));
  console.log();
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
