import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormFacture from "../../components/MainComponent/Facture/FormFacture";
import * as travauActions from "../actions/travauActions";
import * as factureActions from "../actions/factureActions";

const actions = { ...travauActions, ...factureActions };

const mapStateToProps = state => ({
  travaux: state.travau.travaux,
  clients: state.client.clients,
  selectedFacture: state.facture.selectedFacture,
  selectedTravauxByFacture: state.facture.selectedTravauxByFacture
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FormFacture);
