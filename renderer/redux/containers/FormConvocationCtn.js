import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormConvocation from "../../components/MainComponent/ElaborationTravaux/FormConvocation";
import { getTravauClient } from "../selectors";
import * as convocationActions from "../actions/convocationActions";

const mapStateToProps = state => {
  const IdTrav = state.travau.selectedTravau
    ? state.travau.selectedTravau.IdTrav
    : null;
  return {
    IdTrav,
    client: getTravauClient(state)
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(convocationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FormConvocation);