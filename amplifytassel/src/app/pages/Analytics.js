import React, { useEffect, useState } from 'react';
import MuiBox from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import MuiPaper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from "dayjs";

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

    const todaysDate = new Date();
    const xAxisData = [];
    for (let i = 0; i < testData["dailySignups"].length; i++){
      const dateToPush = new Date();
      dateToPush.setDate(todaysDate.getDate() - i)
      xAxisData.push(dateToPush);
    }

    const todaysDate2 = new Date();
    const xAxisDataMonthly = [];
    for (let i = 0; i < testData["monthlySignups"].length; i++){
      const dateToPush = new Date();
      dateToPush.setMonth(todaysDate2.getMonth() - i)
      xAxisDataMonthly.push(dateToPush);
    }

  return (
    <Page>
        <AnalyticsBox>
            <h1>Site Analytics</h1>
            <h3>Monthly Sign Ups</h3>
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
                { data: testData["monthlySignups"] },
                ]}
                height={300}
            />
            <h3>Daily Sign Ups</h3>
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
                { data: testData["dailySignups"] },
                ]}
                height={300}
            />

            <h3>Monthly User Tassel Time: {testData["monthlyUserTasselTime"]}</h3>
            <h3>Monthly User Volunteer Time: {testData["monthlyUserVolunteerTime"]}</h3>
            <h3>Monthly User Applications: {testData["monthlyUserApps"]}</h3>
            <h3>Monthly No Shows: {testData["monthlyNoShows"]}</h3>
        </AnalyticsBox>
    </Page>
  );
}
