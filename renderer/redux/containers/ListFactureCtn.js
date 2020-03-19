import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ListFacture from "../../components/MainComponent/Facture/ListFacture";
import * as factureActions from "../actions/factureActions";
import * as travauxActions from "../actions/travauActions";

const actions = { ...factureActions, ...travauxActions };

const mapStateToProps = state => ({
  travaux: state.travau.travaux,
  clients: state.client.clients,
  factures: state.facture.factures,
  selectedFacture: state.facture.selectedFacture,
  factureBySearchName: state.facture.factureBySearchName,
  CountFactures: state.facture.CountFactures,
  IdCliFromFacture: state.facture.IdCliFromFacture,
  lastPageChange: state.facture.lastPageChange
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ListFacture);
