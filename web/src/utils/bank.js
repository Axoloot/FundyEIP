export const getAmountFromDB = (nbr, divider = 100) => {
  return (nbr / divider).toLocaleString("fr-FR", {style:"currency", currency:"EUR"});
}
