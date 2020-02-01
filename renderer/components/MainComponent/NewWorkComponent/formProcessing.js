let inputs = {
  //table client
  nom: "",
  contact: "",
  domicile: "",
  //table travaux
  dateTrav: "",
  prix: "",
  numTitre: "",
  nomTer: "",
  localisation: "",
  fokontanyTer: "",
  //table lettre de charge
  objet: "",
  numRTX: "",
  dateL: "",
  villeL: ""
};

export const handleChange = (e, input) => {
  if (input === "nom") {
    inputs.nom = e.target.value;
  } else if (input === "contact") {
    inputs.contact = e.target.value;
  } else if (input === "domicile") {
    inputs.domicile = e.target.value;
  } else if (input === "dateTrav") {
    inputs.dateTrav = e.target.value;
  } else if (input === "prix") {
    inputs.prix = e.target.value;
  } else if (input === "numTitre") {
    inputs.numTitre = e.target.value;
  } else if (input === "nomTer") {
    inputs.nomTer = e.target.value;
  } else if (input === "localisation") {
    inputs.localisation = e.target.value;
  } else if (input === "fokontanyTer") {
    inputs.fokontanyTer = e.target.value;
  } else if (input === "objet") {
    inputs.objet = e.target.value;
  } else if (input === "numRTX") {
    inputs.numRTX = e.target.value;
  } else if (input === "dateL") {
    inputs.dateL = e.target.value;
  } else if (input === "villeL") {
    inputs.villeL = e.target.value;
  }
  return inputs;
};
