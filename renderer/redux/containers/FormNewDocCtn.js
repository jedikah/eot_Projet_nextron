import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as ClientAct from "../actions/clientActions";
import * as TravAct from "../actions/travauActions";
import * as LetterChargeAct from "../actions/lettreChargeActions";
import * as PvAct from "../actions/pvActions";
import FormNewDoc from "../../components/MainComponent/NewWorkComponent/FormNewDoc";

const mapStateToProps = state => ({
  clients: state.client.clients
});

const mapDispatchToProps = dispatch => ({
  actions: {
    client: bindActionCreators(ClientAct, dispatch),
    travau: bindActionCreators(TravAct, dispatch),
    lettreCharge: bindActionCreators(LetterChargeAct, dispatch),
    pv: bindActionCreators(PvAct, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormNewDoc);
