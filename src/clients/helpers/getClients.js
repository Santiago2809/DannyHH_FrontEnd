export const getClients = () => {
    const clients = JSON.parse(localStorage.getItem('clients'));
    // console.log(clients);
    return clients;
}