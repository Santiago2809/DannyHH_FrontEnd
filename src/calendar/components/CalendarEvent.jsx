/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
export const CalendarEvent = ({ event }) => {

    const { title, address, locality } = event;
    return ( 
        <>
            <div>
                <strong>{ title }</strong>
            </div>
            <div>
                <strong>{ address }</strong>
            </div>
            <div>
                <strong>{ locality }</strong>
            </div>
        </>
    )
}
