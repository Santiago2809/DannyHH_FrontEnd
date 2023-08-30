import { addDays, addHours, addMonths } from "date-fns";


export const getEvents = () => {
	const clients = JSON.parse(localStorage.getItem('clients'))?.map( client => {
		return {
			name: client.name, 
			phone: client.phone,
			address: client.address,
			location: client.locality,
			frecuency: client.frecuency,
			finalHour: client.finalHour,
			dweek: client.dweek,
			noWeek: client.noWeek,
			price: client.price,
			date: client.date,
			id: client.id
		}
	})

	const events = clients?.map( client => {
		let dates =  [];
		const daysWeek = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
		const clientDay = daysWeek.indexOf(client.dweek);
		// console.log(daysWeek[clientDay]);

		const clientDate = new Date(client.date);
		let firstClientDay = new Date(clientDate.setDate(1));
		// console.log('-------------------');
		while(true){
			if(firstClientDay.getDay() != clientDay){
				firstClientDay = addDays(firstClientDay,1);
			} else {
				break;
			}
		}
		let eventStartDate = new Date(firstClientDay.setHours(client.finalHour.slice(0,client.finalHour.indexOf(":"))));
		eventStartDate = new Date(eventStartDate.setMinutes(client.finalHour.slice(client.finalHour.indexOf(":")+1)));
		
		if(client.noWeek*1 > 1){
			const daysToAdd = (7 * (client.noWeek*1 - 1) );
			eventStartDate = addDays(eventStartDate,daysToAdd)
		}

		if( client.frecuency != "once") {
			let newEvent = eventStartDate;
			for(let i = 0; i < 30; i++) {
				if(i == 0){
					dates.push({
						start: eventStartDate,
						end: addHours( eventStartDate, 1),
						address: client.address,
						location: client.location,
						customer:{
							name: `${client.name}`,
							id: client.id,
							phone: client.phone
						},
						price: client.price
					})
				} else {
					switch (client.frecuency) {
						case 'monthly':
							newEvent = addDays(newEvent, 28);
							break;
						case 'twoWeeks':
							newEvent = addDays(newEvent, 14);
						default:
							break;
					}
					dates.push({
						start: newEvent,
						end: addHours( newEvent, 1),
						address: client.address,
						location: client.location,
						location: client.location, 
						customer:{
							name: `${client.name}`,
							id: client.id,
							phone: client.phone
						},
						price: client.price
					})
				}
			}
		} else {
			dates.push({
				start: eventStartDate,
				end: addHours( eventStartDate, 1),
				address: client.address,
				customer:{
					name: `${client.name}`,
					id: client.id,
					phone: client.phone
				},
				price: client.price
			})
		}
		
		return dates;
	})
	return events;
	
}