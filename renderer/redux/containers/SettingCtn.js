import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Setting from "../../components/MainComponent/setting/Setting";
import * as userActions from "../actions/userActions";
import * as settingActions from "../actions/settingActions";

const actions = {
  ...userActions,
  ...settingActions
};

const mapStateToProps = state => ({
  users: state.user.users,
  settings: state.setting.settings
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
