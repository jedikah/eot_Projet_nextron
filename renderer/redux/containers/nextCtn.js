import { connect } from "react-redux";

import NextPage from "../../pages/components/NextPage";

const mapStateToProps = state => ({
  clients: state.client.clients
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(NextPage);
