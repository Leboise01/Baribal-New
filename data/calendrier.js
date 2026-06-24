/* ============================================================
   CALENDRIER — Modifier les dates ici
   monthIndex : 0=janv, 1=fév, … 8=sept, 9=oct, 10=nov, 11=déc
   type : camp | weekend-troupe | weekend-patrouille | sortie | rentree | pelerinage | autre
   optional: true pour afficher le badge « Optionnel »
   ============================================================ */

const CALENDRIER = [
  { id: "rentree", title: "Rentrée scoute", dateLabel: "20 – 21 septembre", monthIndex: 8, type: "rentree" },
  { id: "calendrier-rentree-pat", title: "Vente calendrier + rentrée de patrouille", dateLabel: "11 – 12 octobre", monthIndex: 9, type: "weekend-patrouille" },
  { id: "we-troupe-nov", title: "Weekend de troupe", dateLabel: "22 – 23 novembre", monthIndex: 10, type: "weekend-troupe" },
  { id: "sortie-ehpad", title: "Sortie de patrouille — EHPAD, défi cîmes", dateLabel: "30 novembre", monthIndex: 10, type: "sortie" },
  { id: "froissartage-noel", title: "Sortie froissartage + Fête de Noël", dateLabel: "13 décembre", monthIndex: 11, type: "sortie" },
  { id: "we-pat-defi", title: "Weekend de patrouille — défi technique cîmes", dateLabel: "17 – 18 décembre", monthIndex: 11, type: "weekend-patrouille" },
  { id: "we-troupe-fev", title: "Weekend de troupe", dateLabel: "31 janv. – 1ᵉʳ février", monthIndex: 0, type: "weekend-troupe" },
  { id: "rallye-hiver", title: "Rallye montagne / camp d'hiver", dateLabel: "Date à déterminer", monthIndex: 1, type: "camp" },
  { id: "we-pat-mars", title: "Weekend de patrouille — défi spirituel", dateLabel: "14 – 15 mars", monthIndex: 2, type: "weekend-patrouille" },
  { id: "camp-paques", title: "Camp de Pâques en patrouille — défi technique", dateLabel: "16 – 17 – 18 avril", monthIndex: 3, type: "camp" },
  { id: "chartres", title: "Pèlerinage de Chartres", dateLabel: "9 – 10 mai", monthIndex: 4, type: "pelerinage", optional: true },
  { id: "we-troupe-juin", title: "Weekend de troupe", dateLabel: "6 – 7 juin", monthIndex: 5, type: "weekend-troupe" },
  { id: "we-pat-prep-camp", title: "Weekend de patrouille — préparation du camp", dateLabel: "13 – 14 juin", monthIndex: 5, type: "weekend-patrouille" },
  { id: "camp-ete", title: "Camp d'été 2026", dateLabel: "Juillet 2026", monthIndex: 6, type: "camp" },
];

const TYPE_LABEL = {
  camp: "Camp",
  "weekend-troupe": "Weekend troupe",
  "weekend-patrouille": "Weekend patrouille",
  sortie: "Sortie",
  rentree: "Rentrée",
  pelerinage: "Pèlerinage",
  autre: "Activité",
};

const MOIS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

/* Ordre année scoute : septembre → août */
const ORDRE_MOIS_SCOUT = [8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7];
