import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to your dashboard": "Welcome to your dashboard",
      "Project title": "Project title",
      "Association title": "Association title",
      "Your projects": "Your projects",
      "Search projects": "Search projects",
      "Community page": "Community page",
      "In your virtual piggybank": "In your virtual piggybank",
      "Close profile": "Close profile",
      "Open profile": "Open profile",
      "raised out": "raised out of",
      "You already donated": "You already donated",
      "You never donated to the project": "You never donated to the project",
      "raised": "raised",
      "Add a card": "Add a card",
      "Remove a card": "Remove a card",
      "Switch to dark mode": "Switch to dark mode",
      "Switch to light mode": "Switch to light mode",
      "Welcome back": "Welcome back",
      "Hey there ! Glad to have you back. To proceed, please login to your existing Fundy account.": "Hey there ! Glad to have you back. To proceed, please login to your existing Fundy account.",
      "Login": "Login",
      "Don’t have an existing Fundy account?": "Don’t have an existing Fundy account?",
      "Sign up": "Sign up",
      "Register": "Register",
      "Create your fundy account here: you only have to do it one": "Create your fundy account here: you only have to do it one",
      "Email address": "Email address",
      "Password": "Password",
      "Confirm password": "Confirm password",
      "Already have an existing Fundy account ?": "Already have an existing Fundy account ?",
      "Gather all your accounts": "Gather all your accounts",
      "With Fundy": "With Fundy, all your billing accounts are gathered in the same place. You can keep an eye on all your spendings, all within a single app.",
      "Round up your payments": "Round up your payments",
      "Each centim counts!": "Each centim counts! Round up your paiements to save money. No worries! You are in full control and can decide whenever you want how to limit your spendings.",
      "Help the community": "Help the community",
      "Be a buddy": "Be a buddy! With the money you saved, you can choose projects to help finance. Fundy is the crowdfunding application to help individuals and associations complete their projects.",
      "Got it": "Got it",
      "Piggybank": "Piggybank",
      "Rounded on the": "Rounded on the",
      "Project overview": "Project overview",
      "Make a donation": "Make a donation",
      "Add to your favorites": "Add to your favorites",
      "Remove from favorites": "Remove from favorites",
      "Back": "Back",
      "Save": "Save",
      "Edit profile": "Edit profile",
      "Profile": "Profile"
    }
  },
  fr: {
    translation: {
      "Welcome to your dashboard": "Bienvenue sur votre tableau de bord",
      "Project title": "Titre du projet",
      "Association title": "Titre de l'association",
      "Your projects": "Vos projets",
      "Search projects": "Rechercher les projets",
      "Community page": "Page de communauté",
      "In your virtual piggybank": "Dans votre tirelire virtuelle",
      "Close profile": "Fermer le profil",
      "Open profile": "Ouvrir le profil",
      "raised out": "levés sur",
      "You already donated": "Vous avez déjà donné",
      "You never donated to the project": "Vous n’avez jamais donné à ce projet",
      "raised": "levés",
      "Add a card": "Ajouter un moyen de paiement",
      "Remove a card": "Supprimer un moyen de paiement",
      "Switch to dark mode": "Passer en mode nuit",
      "Switch to light mode": "Switch to light mode",
      "Welcome back": "Ravi de vous revoir",
      "Hey there ! Glad to have you back. To proceed, please login to your existing Fundy account.": "Pour accéder à votre espace Fundy, connectez-vous à votre compte Fundy existant.",
      "Login": "Connexion",
      "Don’t have an existing Fundy account?": "Vous n’avez pas encore de compte Fundy ?",
      "Sign up": "Créer un compte",
      "Register": "Créer un compte",
      "Create your fundy account here: you only have to do it one": "Créer un compte fundy: vous n’aurez à le faire qu’une fois",
      "Email address": "Adresse email",
      "Password": "Mot de passe",
      "Confirm password": "Confirmer le mot de passe",
      "Already have an existing Fundy account ?": "Vous avez déjà un compte fundy existant ?",
      "Gather all your accounts": "Rassembler tous vos comptes",
      "With Fundy": "Avec fundy, tous vos moyens de paiements sont rassemblés au même endroit. Vous pouvez garder un œil sur toutes vos dépenses, dans une seule application.",
      "Round up your payments": "Arrondissez vos paiements",
      "Each centim counts!": "Chaque centime compte ! Arrondissez vos paiements pour économiser de l’argent. Ne vous inquiétez pas ! Vous avez le contrôle total et pouvez décider quand vous le souhaitez de comment limiter vos dépenses.",
      "Help the community": "Aide la communauté",
      "Be a buddy": "Sois un ami ! Avec l’argent que tu mets de côté, tu peux choisir des projets et aider à les financer. Fundy est l’application de crowdfunding pour aider les particuliers et les associations à mener à bien leurs projets.",
      "Got it": "C'est compris",
      "Piggybank": "Tirelire",
      "Rounded on the": "Arrondi le",
      "Project overview": "Aperçu du projet",
      "Make a donation": "Faire une donation",
      "Add to your favorites": "Ajouter à vos favoris",
      "Remove from favorites": "Retirer des favoris",
      "Back": "Retour",
      "Save": "Sauvegarder",
      "Edit profile": "Modifer le profil.",
      "Profile": "Profil"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
