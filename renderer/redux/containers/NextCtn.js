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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps);
