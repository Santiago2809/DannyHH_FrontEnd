import React from 'react'

export const CalendarEvent = ({ event }) => {

    const { customer, address, location } = event;
    // console.log(event)
    return ( 
        <>
            <strong>{ customer.name }</strong>
            <strong> - { `${ address }, ${ location }` }</strong>
        </>
    )
}
