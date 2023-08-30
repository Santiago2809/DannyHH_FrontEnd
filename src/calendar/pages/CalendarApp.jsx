import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navigate } from 'react-router-dom';

import './calendar.css'
import { CalendarEvent, CalendarModal, EventModal, getEvents, maxValue, minValue } from '../index';
import { useEffect, useState } from 'react';
import { localizer } from '../../helpers';
import { useDispatch } from 'react-redux';
import { onOpenEvent, setActiveEvent } from '../../store';

let events = [];

export const CalendarApp = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || "month");
    const status = true;
    const dispatch = useDispatch();
    
    useEffect(() => {
		getEvents()?.forEach( clientDates => {
			clientDates.forEach( event => {
				events.push(event)
			})
		})
		return () => {
			events = [];
		}
    }, []);
    

    if( !status ) {
        return <Navigate to="/auth" />
    }

    const onDubleClick = ( event ) => { 
        console.log({ doubleClick: event})
    }

    const onSelect = ( event ) => {
        
        dispatch(setActiveEvent({
            ...event,
            start: event.start.toString(),
            end: event.end.toString()
        }))
        dispatch(onOpenEvent());
    }

    const onSlot = (event) => {
        console.log(event)
    }

    const onViewChange = (view) => {
        
        view === 'agenda' ? localStorage.setItem('lastView', "month") : localStorage.setItem('lastView', view);
        setLastView(view != 'agenda' ? view : 'month');
    }
	

    return (
        <div>
            <Calendar
                localizer={localizer}
                defaultView={ lastView }
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 150px)', padding: '15px'}}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDubleClick }
                onSelectEvent={ onSelect }
                onSelectSlot={ onSlot }
                onView={ onViewChange }
                min={minValue}
                max={maxValue}
            />
            <CalendarModal />
            <EventModal />
        </div>
    )
}
