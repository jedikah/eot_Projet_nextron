import { connect } from "react-redux";

const mapStateToProps = state => ({
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps);
