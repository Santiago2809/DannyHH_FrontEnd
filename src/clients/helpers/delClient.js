

export const delClient = ( clientId ) => {

    const oldClients = JSON.parse( localStorage.getItem('clients'));
    const newClients = oldClients.filter( client => client.id != clientId );
    localStorage.setItem('clients', JSON.stringify( newClients ) );
    
}