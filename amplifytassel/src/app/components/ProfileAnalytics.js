import React from 'react';
import {styled} from '@mui/material';
import MuiPaper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import { Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
              Hours Spent Volunteering
              </Typography>
              <Typography variant="h4" component="div">
                {hoursSpentVolunteering} hrs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h6" component="div">
        Profile Views
      </Typography>
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
    </Analytics>
  );
}
