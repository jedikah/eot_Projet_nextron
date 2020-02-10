import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as FormPv from "../actions/pvActions";
import { getTravauClient, getConvocationClient, get } from "../selectors";

const actions = { ...FormPv };

const mapStateToProps = state => {
  const IdTrav = state.travau.selectedTravau
    ? state.travau.selectedTravau.IdTrav
    : null;
  return {
    IdTrav,
    convocation: getConvocationClient(state),
    travau: state.travau.selectedTravau,
    client: getTravauClient(state)
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
