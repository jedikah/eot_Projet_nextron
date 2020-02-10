import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as travauActions from "../actions/travauActions";
import { setConvocationItems } from "../actions/convocationActions";

const actions = { ...travauActions, setConvocationItems };

const mapStateToProps = state => ({
  clients: state.client.clients,
  travaux: state.travau.travaux,
  selectedTravau: state.travau.selectedTravau,
  factures: state.facture.factures,
  convocations: state.convocation.convocations,
  pvs: state.pv.pvs,
  lettreCharges: state.lettreCharge.lettreCharges,
  users: state.user.users,
  convocationItems: state.convocation.convocationItems
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
