import { addHours } from "date-fns";


export const setOcasional = ( ocasionalDates = [] ) => {

    return ocasionalDates?.map( date => {
        const { id, customer, date: customerDate, price, duration, comments, address, locality } = date;
        const dateNumbers = customerDate.slice(0,customerDate.indexOf(",")).split("/");
        const dateHours = customerDate.slice(customerDate.indexOf(",")+1).split(":");
        const startDate = new Date(+dateNumbers[2],+dateNumbers[1]-1,+dateNumbers[0],+dateHours[0],+dateHours[1])
        console.log(startDate.toLocaleDateString());

        return {
            title: customer,
            start: startDate,
            end: addHours(startDate, duration),
        }
    })
}