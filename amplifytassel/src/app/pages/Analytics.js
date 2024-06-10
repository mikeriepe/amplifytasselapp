import React, { useEffect, useState } from 'react';
import MuiBox from '@mui/material/Box';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import MuiPaper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from "dayjs";
import { Grid } from '@mui/material';
import { DataStore } from "@aws-amplify/datastore";
import { SiteAnalytics, Profile } from "./../../models";


const AnalyticsBox = styled((props) => (
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
    marginLeft: '20%',
    marginTop: '10px',
    minHeight: '100%',
  }));

const Page = styled((props) => (
  <MuiBox {...props} />
))(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 'auto',
  width: 'auto',
  background: 'var(--background-primary)',
}));

/**
 * creates socials page
 * @return {HTML} socials page
 */
export default function Analytics() {
    const testData = {"monthlySignups": [302, 205, 135, 215],
                      "dailySignups": [15, 20, 13, 24, 21],
                      "MonthlyPopularEvents": ["Computer Science", "Mentoring", "Art"],
                      "monthlyUserTasselTime": 2.5,
                      "monthlyUserVolunteerTime": 3.5,
                      "monthlyUserApps": 5,
                      "monthlyNoShows": 26,
    }

    const [siteAnalyticsData, setSiteAnalyticsData] = useState();
    const getSiteAnalytics = () => {
      DataStore.query(SiteAnalytics).then((res) => {
        setSiteAnalyticsData(res);
        console.log("here: ", res);
      }).catch((err) => {
        alert("Error retrieving site analytics, please try again");
        console.log(err);
      });
    };

    const todaysDate = new Date();
    const xAxisData = [];
    for (let i = 0; i < siteAnalyticsData?.dailySignups?.length; i++){
      const dateToPush = new Date();
      dateToPush.setDate(todaysDate.getDate() - i)
      xAxisData.push(dateToPush);
    }

    const todaysDate2 = new Date();
    const xAxisDataMonthly = [];
    for (let i = 0; i < siteAnalyticsData?.monthlySignups?.length; i++){
      const dateToPush = new Date();
      dateToPush.setMonth(todaysDate2.getMonth() - i)
      xAxisDataMonthly.push(dateToPush);
    }

    useEffect(() => {
      getSiteAnalytics();
      // eslint-disable-next-line
    }, []);
  return (
    <Page>
        <AnalyticsBox>
            <Typography variant="h3" component="div">
            Site Analytics
            </Typography>
            <Grid container spacing={4}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                        Monthly User Tassel Time
                    </Typography>
                    <Typography variant="h4" component="div">
                      {siteAnalyticsData?.monthlyUserTasselTime} hrs
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Monthly User Volunteer Time
                    </Typography>
                    <Typography variant="h4" component="div">
                      {siteAnalyticsData?.monthlyUserVolunteerTime} hrs
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Monthly User Applications
                    </Typography>
                    <Typography variant="h4" component="div">
                      {siteAnalyticsData?.monthlyUserApps}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Monthly No Shows
                    </Typography>
                    <Typography variant="h4" component="div">
                      {siteAnalyticsData?.monthlyNoShows}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Typography color="text.primary" variant="h5">
              Monthly Sign Ups
            </Typography>
            {siteAnalyticsData?.monthlySignups ? 
              <LineChart
                xAxis={[
                {
                    label: "Months",
                    data: xAxisDataMonthly.reverse(),
                    tickInterval: xAxisDataMonthly,
                    scaleType: "time",
                    valueFormatter: (date) => dayjs(date).format("MMM"),
                },
                ]}
                yAxis={[{ label: "Monthly Sign Ups" }]}
                series={[
                { data: siteAnalyticsData?.monthlySignups },
                ]}
                height={300}
              />
            : <></>}
            <Typography color="text.primary" variant="h5">
              Daily Sign Ups
            </Typography>
            {siteAnalyticsData?.dailySignups ? 
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
              yAxis={[{ label: "Daily Sign Ups" }]}
              series={[
              { data: siteAnalyticsData?.dailySignups },
              ]}
              height={300}
          />
            : <></>}
        </AnalyticsBox>
    </Page>
  );
}
