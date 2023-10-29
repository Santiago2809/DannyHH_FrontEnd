import { addHours, addWeeks } from "date-fns";

export const getEvents = (customers = [] ) => {
	// const customers = JSON.parse(localStorage.getItem('customers'));

	const events = customers?.map(customer => {
		if (customer.dweek === null || customer.category === "NA") return [];
		let dates = [];
		
		// const daysWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		const { id, name, phone, address, locality, frequency, hour, price, created, duration } = customer;
		
		//Se almacencan los valores de year - month - day de la fecha de creacion por cliente
		const numbers = created?.split('-');

		//Se crea el obj fecha de la fecha de creacion
		const customerDate = new Date(numbers[0], numbers[1]-1, numbers[2] );

		if ( !frequency ){
			console.log(name);
			//TODO: Desarrollar el algoritmo para calcular las fechas en base al numero de dia
		} 
		
		let firstDate = customerDate;

		//En lo siguiente se calcula cuantos dias se añadiran para la primera limpieza, en base a que dia es la creacion

		//Se crean las horas y minutos de la limpieza en base a la hora del cliente y se le añaden a la primera limpieza
		const event_hour = +hour.slice(0, hour.indexOf(':'))
		const event_minute = +hour.slice(hour.indexOf(':')+1)
		firstDate.setHours(event_hour, event_minute );

		//Se agrega la primer limpieza al arreglo de limpiezas de este cliente
		dates.push({
			id,
			title: name,
			start: firstDate,
			end: addHours(firstDate, duration ),
			phone,
			address,
			locality,
			price
		})

		//Se crea un ciclo para generar fechas del cliente
		for(let i = 0; i <= 50; i++){
			if( frequency ){
				switch (frequency){
					case 'monthly':{
						const start_date = addWeeks(dates.at(-1)?.start,4);
						dates.push({
							id,
							title: name,
							start: start_date,
							end: addHours(start_date, duration ),
							phone,
							address,
							locality,
							price
						})
						break;
					}
					case 'every_week': {
						const start_date = addWeeks(dates.at(-1)?.start,1);
						dates.push({
							id,
							title: name,
							start: start_date,
							end: addHours(start_date, duration),
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
							end: addHours(start_date, duration),
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
							end: addHours(start_date, duration),
							phone,
							address,
							locality,
							price
						})
						break
					}
					case null:{
						break
					}
					default:
						console.log('error');
				}
			}
		}		

		return dates;
	})
	return events
}