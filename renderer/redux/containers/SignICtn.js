import { connect } from "react-redux";

import SignIn from "../../pages/components/layouts/SignIn";

const mapStateToProps = state => ({
  signIns: state.signIn.signIns
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
