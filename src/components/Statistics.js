import React, { useEffect, useState } from "react";
import { API_URL } from '../constants';
import { format } from 'date-fns';
import { Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import _ from 'lodash';

function Statistics() {
    const [actGroupedData, setActGroupedData] = useState([]);
    const [groupedData, setGroupedData] = useState([]);

    /**
     * Calculate the sum of the time spent on each activity
     * @param {List of the trainings} data 
     */
    const handleStatsActivity = (data) => {
        const grouped = _.groupBy(data, 'activity');
        const result = _.map(grouped, (group, key) => ({
            activity: key,
            duration: _.sumBy(group, 'duration')
        }));
        setActGroupedData(result);
    }

    /**
     * Calculate the average of the time spent per customer
     * @param {List of the trainings} data 
     */
    const handleStatsCustomers = (data) => {
        let grouped = _.groupBy(data, 'customer');
        let groupedData = [];
        for (let key in grouped) {
            let totalDuration = 0;
            let totalSessions = 0;
            grouped[key].forEach((item) => {
                totalDuration += item.duration;
                totalSessions += 1;
            });
            groupedData.push({
                customer: key,
                duration: totalDuration,
                sessions: totalSessions,
                avgDuration: totalDuration / totalSessions
            });
        }
        setGroupedData(groupedData);
    };

    useEffect(() => {
        fetch(API_URL + '/trainings')
        .then(response => response.json())
        .then(data => {
            ( async () => {
                let trainingList = [];
                for (let i = 0; i < data.content.length; i++) {
                    await fetch(data.content[i].links[2].href)
                    .then(response => response.json())
                    .then(customer => {
                        trainingList.push({
                            activity: data.content[i].activity,
                            date: format(new Date(data.content[i].date), 'dd.MM.yyyy HH:mm'),
                            duration: data.content[i].duration,
                            customer: customer.firstname + " " + customer.lastname,
                            links: data.content[i].links
                        });
                    })
                }
                handleStatsCustomers(trainingList);
                handleStatsActivity(trainingList);
            })();
        })
        .catch(err => console.error(err))
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Statistics</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderStyle: 'solid', width: '60%', marginBottom: 20 }}>
                <h2>Duration per activity</h2>
                <BarChart width={800} height={600} data={actGroupedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="duration" fill="#8884d8" />
                </BarChart>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderStyle: 'solid', width: '60%' }}>
                <h2>Duration per customer</h2>
                <BarChart width={800} height={600} data={groupedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="customer" />
                    <YAxis label={{ value: 'Average duration (min)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="avgDuration" fill="#8884d8" />
                </BarChart>
                </div>

        </div>
    );
};

export default Statistics;