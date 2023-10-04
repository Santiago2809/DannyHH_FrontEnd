import { AddModalClient, EditModalClient, DeleteModalClient } from '../index';
import './clientapp.css'
import { useDispatch, useSelector } from 'react-redux';
import { onOpenAddC, onOpenDelC, onOpenEditC, setActiveCustomer } from '../../store';

const headers = ["Name", "Phone", "Address", "Location", "Frecuency", "Time", "Day of Week", "No. of Week", "Category", "Price"]

export const ClientApp = () => {

    const clients = useSelector(store => store.clients.clients);
    const isEditOpenC = useSelector(store => store.ui.isEditOpenC);
    const dispatch = useDispatch();

    const onAddOpen = () => {
        dispatch(onOpenAddC());
    };
    const onDelOpen = () => {
        dispatch(onOpenDelC());
    };
    const onEditOpen = () => {
        dispatch(onOpenEditC());
    };

    const onCustomerCLick = ({ target }) => {
        dispatch(setActiveCustomer(target.parentElement.id))
        dispatch(onOpenEditC());
    }

    return (
        <div className='p-4'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <h1>Client Screen</h1>
                <div className='controlBtns'>
                    <button onClick={onAddOpen} className='controlBtn btn btn-success'>
                        Add client
                    </button>
                    <button onClick={onEditOpen} className='controlBtn btn btn-warning' disabled>
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
                                const frequency = client.frequency != null ? client.frequency : "Not Available";
                                const no_week = client.no_week != null ? client.no_week : "Not Available";
                                return (
                                    <tr key={client.id} id={client.id} onClick={onCustomerCLick} className='customer'>
                                        <td className='tableElement p-2'>{client.name}</td>
                                        <td className='tableElement p-2'>{client.phone}</td>
                                        <td className='tableElement p-2'>{client.address}</td>
                                        <td className='tableElement p-2'>{client.locality}</td>
                                        <td className='tableElement p-2'>{frequency}</td>
                                        <td className='tableElement p-2'>{client.hour}</td>
                                        <td className='tableElement p-2'>{client.dweek}</td>
                                        <td className='tableElement p-2'>{no_week}</td>
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
            {
                isEditOpenC && <EditModalClient />
            }
            <DeleteModalClient />
        </div>
    )
}
