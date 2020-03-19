import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as travauActions from "../actions/travauActions";
import * as convocationAction from "../actions/convocationActions";

const actions = { ...travauActions, ...convocationAction };

const mapStateToProps = state => ({
  clients: state.client.clients,
  travaux: state.travau.travaux,
  selectedTravau: state.travau.selectedTravau,
  factures: state.facture.factures,
  convocations: state.convocation.convocations,
  selectedConvocation: state.convocation.selectedConvocation,
  pvs: state.pv.pvs,
  lettreCharges: state.lettreCharge.lettreCharges,
  users: state.user.users,
  travauxBySearchName: state.travau.travauxBySearchName,
  CountTravaux: state.travau.CountTravaux,
  lastPageChange: state.travau.lastPageChange
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
