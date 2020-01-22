import { connect } from "react-redux";

const mapStateToProps = state => ({
  clients: state.client.clients
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps);
