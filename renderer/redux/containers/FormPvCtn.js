import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as FormPv from "../actions/pvActions";
import {
  getTravauClient,
  getConvocationClient,
  getPvTravau
} from "../selectors";

const actions = { ...FormPv };

const mapStateToProps = state => {
  const selectedIdTrav =
    state.travau.selectedTravau !== null
      ? state.travau.selectedTravau.IdTrav
      : null;
  return {
    selectedIdTrav,
    convocation: getConvocationClient(state),
    selectedTravau: state.travau.selectedTravau,
    client: getTravauClient(state),
    pv: getPvTravau(state)
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
