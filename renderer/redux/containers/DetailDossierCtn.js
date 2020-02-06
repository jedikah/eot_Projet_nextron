import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ClientAct from "../actions/clientActions";
import * as TravAct from "../actions/travauActions";
import * as LetterChargeAct from "../actions/lettreChargeActions";
import DetailDossier from "../../components/MainComponent/NewWorkComponent/DetailDossier";
import { getTravauClient, getTravauLettreCharge } from "../selectors";

const mapStateToProps = state => ({
  travau: state.travau.selectedTravau,
  client: getTravauClient(state),
  lettreCharge: getTravauLettreCharge(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    client: bindActionCreators(ClientAct, dispatch),
    travau: bindActionCreators(TravAct, dispatch),
    lettreCharge: bindActionCreators(LetterChargeAct, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailDossier);
