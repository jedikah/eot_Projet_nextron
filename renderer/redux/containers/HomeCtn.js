import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../actions/userActions";

const actions = {
  ...userActions
};

const mapStateToProps = state => ({
  users: state.user.users,
  maxs: state.user.maxs
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
