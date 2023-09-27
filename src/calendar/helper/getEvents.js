import { addDays, addHours, addMonths, addWeeks } from "date-fns";


export const getEvents = (customers) => {
	// const customers = JSON.parse(localStorage.getItem('customers'));
	
	const events = customers?.map(customer => {
		let dates = [];
		
		const daysWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		const { id, name, phone, address, locality, frequency, hour, dweek, price, created, } = customer;
		
		const numbers = created.split('-');
		const customerDate = new Date(numbers[0], numbers[1]-1, numbers[2] );
		let firstDate;
		
		if(customerDate.getDay() == daysWeek.indexOf(dweek)){
			firstDate = addDays(customerDate, 7);
		} else if (customerDate.getDay() < daysWeek.indexOf(dweek)){
			firstDate = addDays(customerDate,  7 + (daysWeek.indexOf(dweek) - customerDate.getDay()))
		} else {
			firstDate = addDays(customerDate,  7 - (customerDate.getDay() - daysWeek.indexOf(dweek)))
		}
		const event_hour = +hour.slice(0, hour.indexOf(':'))
		const event_minute = +hour.slice(hour.indexOf(':')+1)
		firstDate.setHours(event_hour, event_minute );

		dates.push({
			id,
			title: name,
			start: firstDate,
			end: addHours(firstDate, 2),
			phone,
			address,
			locality,
			price
		})
		for(let i = 0; i <= 50; i++){
			switch (frequency){
				case 'monthly':{
					const start_date = addMonths(dates.at(-1)?.start,1);
					dates.push({
						id,
						title: name,
						start: start_date,
						end: addHours(start_date, 2),
						phone,
						address,
						locality,
						price
					})
					break;
				}
				case 'every_two_weeks':{
					const start_date = addWeeks(dates.at(-1)?.start,2);
					dates.push({
						id,
						title: name,
						start: start_date,
						end: addHours(start_date, 2),
						phone,
						address,
						locality,
						price
					})
					break;	
				}
				case 'every_three_weeks':{
					const start_date = addWeeks(dates.at(-1)?.start,3);
					dates.push({
						id,
						title: name,
						start: start_date,
						end: addHours(start_date, 2),
						phone,
						address,
						locality,
						price
					})
					break
				}
				
				default:
					console.log('error');
			}
		}		

		return dates;
	})
	return events
}