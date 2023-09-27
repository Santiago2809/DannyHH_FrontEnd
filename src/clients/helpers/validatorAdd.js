

export const validateAdd = ( name , phone , address , locality , price, frecuency, dweek, noWeek ) => {
    let validate = {
        type: 'error',
        message: 'no message',
    }
    
    if( name.length < 3 ) {
        validate.message = 'Name must be at least 3 characters'
        return validate;
    }
    if ( isNaN(phone*1) ){
        validate.message = 'Phone space must be a number'
        return validate;
    }
    if( phone.length < 8 || phone.length > 12 ) {
        validate.message = 'Phone must have between 8 and 12 characters'
        return validate;
    }
    if( address.length < 5 ){
        validate.message = 'Direction must be at least 5 characters'
        return validate;
    }
    if( locality.length < 4 ){
        validate.message = 'Locality must be at least 4 characters'
        return validate;
    }
    if( isNaN(price*1) || price.trim().length < 1 ){
        validate.message = 'Price must be a number'
        return validate;
    }
    if( frecuency.length < 1 && dweek.length < 1 && noWeek.length < 1){
        validate.message = 'Frequency, day of week or number of week must be filled'
        return validate;
    }
    if( frecuency.length > 1 && dweek.length > 1 && noWeek.length > 0){
        console.log("hola");
        validate.message = 'Frequency, day of week and number of week must not be filled all at once'
        return validate;
    }
    if( noWeek.length > 0 && frecuency.length > 1 ){
        validate.message = 'Frequency and number of week cant be filled at once';
        return validate
    }
    validate.type = 'success';
    return validate
}