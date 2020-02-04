let inputs = {
  //table client
  Nom: "",
  Contact: "",
  Domicile: "",
  //table travaux
  DateTrav: "",
  TypeTrav: "",
  Prix: "",
  NumTitre: "",
  NomTer: "",
  LocalisationTrav: "",
  Fokontany: "",
  //table lettre de charge
  Objet: "",
  NumRTX: "",
  DateL: "",
  VilleL: ""
};

export const handleChange = (e, input) => {
  if (input === "nom") {
    inputs.Nom = e.target.value;
  } else if (input === "contact") {
    inputs.Contact = e.target.value;
  } else if (input === "domicile") {
    inputs.Domicile = e.target.value;
  } else if (input == "TypeTrav") {
  } else if (input === "dateTrav") {
    inputs.DateTrav = e.target.value;
  } else if (input === "prix") {
    inputs.Prix = e.target.value;
  } else if (input === "numTitre") {
    inputs.NumTitre = e.target.value;
  } else if (input === "nomTer") {
    inputs.NomTer = e.target.value;
  } else if (input === "localisation") {
    inputs.LocalisationTrav = e.target.value;
  } else if (input === "fokontanyTer") {
    inputs.Fokontany = e.target.value;
  } else if (input === "objet") {
    inputs.Objet = e.target.value;
  } else if (input === "numRTX") {
    inputs.NumRTX = e.target.value;
  } else if (input === "dateL") {
    inputs.DateL = e.target.value;
  } else if (input === "villeL") {
    inputs.VilleL = e.target.value;
  } else {
    inputs.Nom = input.title;
  }
  return inputs;
};
