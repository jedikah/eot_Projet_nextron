import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ListFacture from "../../components/MainComponent/Facture/ListFacture";
import * as factureActions from "../actions/factureActions";

const actions = { ...factureActions };

const mapStateToProps = state => ({
  travaux: state.travau.travaux,
  clients: state.client.clients,
  factures: state.facture.factures,
  selectedFacture: state.facture.selectedFacture,
  factureBySearchName: state.facture.factureBySearchName
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListFacture);
