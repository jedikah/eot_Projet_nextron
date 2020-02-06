import { connect } from "react-redux";

import FormConvocation from "../../components/MainComponent/ElaborationTravaux/FormConvocation";

const mapStateToProps = state => {
  const IdTrav = state.travau.selectedTravau
    ? state.travau.selectedTravau.IdTrav
    : null;
  return {
    IdTrav
  };
};

export default connect(mapStateToProps)(FormConvocation);
