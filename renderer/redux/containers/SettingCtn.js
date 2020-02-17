import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Setting from "../../components/MainComponent/setting/Setting";
import * as userActions from "../actions/userActions";

const actions = {
  ...userActions
};

const mapStateToProps = state => ({
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
