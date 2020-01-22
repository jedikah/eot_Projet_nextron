import { connect } from "react-redux";

const mapStateToProps = state => ({
  signIns: state.signIn.signIns
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps);
