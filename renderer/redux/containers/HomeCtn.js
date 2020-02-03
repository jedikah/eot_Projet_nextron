import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as UserAct from "../actions/userActions";

const actions = { ...UserAct };

const mapStateToProps = state => ({
  clients: state.client.clients,
  travaux: state.travau.travaux,
  factures: state.facture.factures,
  convocations: state.convocation.convocations,
  pvs: state.pv.pvs,
  lettreCharges: state.lettreCharge.lettreCharges,
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
