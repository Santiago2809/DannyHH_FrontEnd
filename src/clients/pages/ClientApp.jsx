import { useEffect } from 'react'
import { AddModalClient, EditModalClient, DeleteModalClient } from '../index';
import './clientapp.css'
import { useDispatch, useSelector } from 'react-redux';
import { onOpenAddC, onOpenDelC, onOpenEditC } from '../../store';
import { getDbClients } from '../helpers/getDBClients';

const headers = ["Name", "Phone", "Address", "Location", "Frecuency", "Time", "Day of Week", "No. of Week", "Category", "Price"]

export const ClientApp = () => {

    const clients = useSelector(store => store.clients.clients);
    const dispatch = useDispatch();

    // const [clientsLocaleStorage, setClients] = useState(
    //     (JSON.parse(localStorage.getItem('clients')) == null) ? [] : JSON.parse(localStorage.getItem('clients'))
    // );


    useEffect(() => {
        // console.log("rendering client screen")
        getDbClients();
    }, [])

    const onAddOpen = () => {
        dispatch(onOpenAddC());
    };
    const onDelOpen = () => {
        dispatch(onOpenDelC());
    };
    const onEditOpen = () => {
        dispatch(onOpenEditC());
    };


    return (
        <div className='p-4'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <h1>Client Screen</h1>
                <div className='controlBtns'>
                    <button onClick={onAddOpen} className='controlBtn btn btn-success'>
                        Add client
                    </button>
                    <button onClick={onEditOpen} className='controlBtn btn btn-warning'>
                        Edit client
                    </button>
                    <button onClick={onDelOpen} className='controlBtn btn btn-danger'>
                        Delete client
                    </button>
                </div>
            </div>
            <div className='clientTable mt-4'>
                <table style={{ "width": "100%" }}>
                    <thead>
                        <tr className="tableNames">
                            {
                                headers.map(header => <th key={header} className='p-2'>{header}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody style={{ "color": "#fff" }}>
                        {
                            clients?.map(client => {
                                return (
                                    <tr key={client.id}>
                                        <td className='tableElement p-2'>{client.name}</td>
                                        <td className='tableElement p-2'>{client.phone}</td>
                                        <td className='tableElement p-2'>{client.address}</td>
                                        <td className='tableElement p-2'>{client.locality}</td>
                                        <td className='tableElement p-2'>{client.frecuency}</td>
                                        <td className='tableElement p-2'>{client.finalHour}</td>
                                        <td className='tableElement p-2'>{client.dweek}</td>
                                        <td className='tableElement p-2'>{client.noWeek}</td>
                                        <td className='tableElement p-2'>{client.category}</td>
                                        <td className='tableElement p-2'>{client.price}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    !clients &&
                    <div className='d-flex justify-content-center mt-5'>
                        <h1>No hay clientes</h1>
                    </div>
                }
            </div>
            <AddModalClient />
            <EditModalClient />
            <DeleteModalClient />
        </div>
    )
}
