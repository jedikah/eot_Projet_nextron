import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as FormPv from "../actions/pvActions";
import { getTravauClient, getConvocationClient } from "../selectors";

const actions = { ...FormPv };

const mapStateToProps = state => {
  const IdTrav = state.travau.selectedTravau
    ? state.travau.selectedTravau.IdTrav
    : null;
  return {
    IdTrav,
    convocation: getConvocationClient(state),
    travaux: state.travau.travaux,
    client: getTravauClient(state)
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
