import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SideNavPage from "../../components/SideNavPage";
import * as menuActions from "../actions/menuActions";

const actions = { ...menuActions };

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(SideNavPage);
