import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../actions/userActions";
import * as clientActions from "../actions/clientActions";
import * as travauActions from "../actions/travauActions";
import * as lettreChargeActions from "../actions/lettreChargeActions";

const actions = {
  ...userActions,
  ...clientActions,
  ...travauActions,
  ...lettreChargeActions
};

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
