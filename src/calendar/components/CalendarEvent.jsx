/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
export const CalendarEvent = ({ event }) => {

    const { title, address, locality } = event;
    return ( 
        <>
            <strong>{ title }</strong>
            <strong> - { `${ address }, ${ locality }` }</strong>
        </>
    )
}
