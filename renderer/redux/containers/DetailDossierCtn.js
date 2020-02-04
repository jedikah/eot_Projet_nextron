import { connect } from "react-redux";

import DetailDossier from "../../components/MainComponent/NewWorkComponent/DetailDossier";
import { getTravauClient, getTravauLettreCharge } from "../selectors";

const mapStateToProps = state => ({
  travau: state.travau.selectedTravau,
  client: getTravauClient(state),
  lettreCharge: getTravauLettreCharge(state)
});

export default connect(mapStateToProps)(DetailDossier);
