//onRange es para las vistas del mes
const minValue = (new Date());
minValue.setHours(8)
minValue.setMinutes(0)
minValue.setSeconds(0)
minValue.setMilliseconds(0)
const maxValue = (new Date());
maxValue.setHours(19)
maxValue.setMinutes(0)
maxValue.setSeconds(0)
maxValue.setMilliseconds(0)

export { minValue, maxValue };