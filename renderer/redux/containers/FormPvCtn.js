import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as FormPv from "../actions/pvActions";
import { getTravauClient } from "../selectors";

const actions = { ...FormPv };

const mapStateToProps = state => ({
  travaux: state.travau.travaux,
  convocations: state.convocation.convocations,
  client: getTravauClient(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
