import { connect } from "react-redux";

import HomePage from "../../pages/components/HomePage";

const mapStateToProps = state => ({
  clients: state.client.clients,
  travaux: state.travau.travaux,
  factures: state.facture.factures,
  convocations: state.convocation.convocations,
  pvs: state.pv.pvs,
  lettreCharges: state.lettreCharge.lettreCharges,
  signIns: state.signIn.signIns
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
