import React from 'react';
import {styled} from '@mui/material';
import MuiPaper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from "dayjs";



const Analytics = styled((props) => (
  <MuiPaper elevation={0} {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5em',
  padding: '2em',
  height: 'auto',
  width: '60%',
  background: 'white',
  boxShadow: '0px 4px 50px -15px rgba(0, 86, 166, 0.15)',
  border: '0.5px solid rgba(0, 0, 0, 0.15)',
  borderRadius: '10px',
}));

/**
 * creates Profile
 * @return {HTML} Profile component
 */
export default function ProfileAnalytics({data}) {
  const testData = {"ProfileViews": [10, 5, 6, 10, 4],
                    "HoursSpentVolunteering": 100,
  }
  const profileViews = testData["ProfileViews"];
  const hoursSpentVolunteering = testData["HoursSpentVolunteering"]
  const todaysDate = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const dates = [];
  for (let i = 0; i < profileViews.length; i++){
    const dateAsString = months[todaysDate.getMonth()] + " " + todaysDate.getDate().toString()
    dates.push(dateAsString)
    todaysDate.setDate(todaysDate.getDate() - 1);
  }
  console.log(dates.reverse());

  const todaysDate2 = new Date();
  const xAxisData = [];
  for (let i = 0; i < profileViews.length; i++){
    const dateToPush = new Date();
    dateToPush.setDate(todaysDate2.getDate() - i)
    xAxisData.push(dateToPush);
  }
  console.log("xaxis: ", xAxisData);

  return (
    <Analytics>
      <h4 className='text-dark'>Analytics</h4>
      <h3>Profile Views</h3>
      <LineChart
        xAxis={[
          {
            label: "Date",
            data: xAxisData.reverse(),
            tickInterval: xAxisData,
            scaleType: "time",
            valueFormatter: (date) => dayjs(date).format("MMM D"),
          },
        ]}
        yAxis={[{ label: "Profile Views" }]}
        series={[
          { data: profileViews },
        ]}
        height={400}
      />
      <h3>Hours Spent Volunteering: {hoursSpentVolunteering}</h3>
    </Analytics>
  );
}
