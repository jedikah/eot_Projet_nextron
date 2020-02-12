import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton
} from "@devexpress/dx-react-scheduler-material-ui";
import { ViewState } from "@devexpress/dx-react-scheduler";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import moment, { DATE_FORMAT } from "../../../module/moment";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  }
}));

const Planning = ({ travaux, clients }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    viewName: "Week"
  });

  const handleChange = event =>
    setState({ ...state, viewName: event.target.value });
  const filterClient = IdCli =>
    clients.filter(client => client.IdCli === IdCli)[0];

  const generatePlanning = () => {
    const planning = [];
    travaux.forEach(travau => {
      const title = `${travau.TypeTrav}, client ${
        filterClient(travau.IdCli).Nom
      }`;
      const startDate = moment(travau.DateTrav, DATE_FORMAT);
      const defaultEndDate = moment(travau.DateTrav, DATE_FORMAT).add(1, "h");
      console.log({ startDate, defaultEndDate });
      planning.push({ title, startDate, endDate: defaultEndDate });
    });
    return planning;
  };

  return (
    <div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Affichage du planning</FormLabel>
        <RadioGroup row value={state.viewName} onChange={handleChange}>
          <FormControlLabel value="Day" control={<Radio />} label="Jour" />
          <FormControlLabel value="Week" control={<Radio />} label="Semaine" />
          <FormControlLabel value="Month" control={<Radio />} label="Moi" />
        </RadioGroup>
      </FormControl>
      <Scheduler data={generatePlanning()}>
        <ViewState currentViewName={state.viewName} />
        <DayView startDayHour={0} endDayHour={24} />
        <WeekView />
        <MonthView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
      </Scheduler>
    </div>
  );
};

export default Planning;
