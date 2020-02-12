import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../actions/userActions";
import * as clientActions from "../actions/clientActions";
import * as travauActions from "../actions/travauActions";
import * as lettreChargeActions from "../actions/lettreChargeActions";
import * as convocationActions from "../actions/convocationActions";
import * as pvActions from "../actions/pvActions";

const actions = {
  ...userActions,
  ...clientActions,
  ...travauActions,
  ...lettreChargeActions,
  ...convocationActions,
  ...pvActions
};

const mapStateToProps = state => ({
  routeMenu: state.menu.routeMenu
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps);
