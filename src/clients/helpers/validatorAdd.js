

export const validateAdd = ( name , phone , address , locality , price ) => {
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
    if( locality.length < 5 ){
        validate.message = 'Locality must be at least 5 characters'
        return validate;
    }
    if( isNaN(price*1) || price.trim().length < 1 ){
        validate.message = 'Price must be a number'
        return validate;
    }

    validate.type = 'success';
    return validate
}