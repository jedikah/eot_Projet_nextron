import { connect } from "react-redux";

const mapStateToProps = state => ({
  clients: state.client.clients,
  travaux: state.travau.travaux,
  factures: state.facture.factures,
  convocations: state.convocation.convocations,
  pvs: state.pv.pvs,
  lettreCharges: state.lettreCharge.lettreCharges,
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps);
