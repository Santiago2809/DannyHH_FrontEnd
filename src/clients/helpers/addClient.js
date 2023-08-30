

export const addClient = ( client = {} ) => {
    // console.log(client);
    // const id = (new Date()).getTime();
    const date = new Date();
    let newClient = [];
    
    if ( localStorage.getItem('clients') == null){
        newClient.push({date,...client});
        localStorage.setItem('clients', JSON.stringify(newClient));
    } else {
        let oldClients = JSON.parse(localStorage.getItem('clients'));
        oldClients.push({ date,...client});
        localStorage.setItem('clients', JSON.stringify(oldClients));
    }
}