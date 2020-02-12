import { connect } from "react-redux";

import Planning from "../../components/MainComponent/Planning";

const mapStateToProps = state => ({
  travaux: state.travau.travaux,
  clients: state.client.clients
});

export default connect(mapStateToProps)(Planning);
