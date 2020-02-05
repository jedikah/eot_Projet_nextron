import moment from "moment";

moment.locale("fr");

export const currentMoment = moment().format("l");

export default moment;
