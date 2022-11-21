import React, { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { API_URL } from '../constants';
import { format, parse, startOfWeek, getDay } from 'date-fns';


const locales = {
    'en-US': require('date-fns/locale/en-US'),
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

function MyCalendar() {
    const [events, setEvents] = useState([]);

    const fetchTrainings = () => {
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
                            start: new Date(data.content[i].date),
                            end: new Date(new Date(data.content[i].date).getTime() + data.content[i].duration * 60000),
                            duration: data.content[i].duration,
                            customer: customer.firstname + " " + customer.lastname,
                            links: data.content[i].links
                        });
                    })
                }
                setEvents(trainingList);
            })();
        })
        .catch(err => console.error(err))
    };
    
    useEffect(() => {
        fetchTrainings();
    }, []);

    return (
        <div>
            <h1 style={{textAlign: 'center'}} >Calendar</h1>
            <Calendar
                localizer={localizer}
                events={events} 
                startAccessor="start"
                endAccessor="end"
                titleAccessor={event => event.activity + " / " + event.customer}
                style={{ height: 1000, margin: '50px' }}               
            />
        </div>
    );
};

export default MyCalendar;