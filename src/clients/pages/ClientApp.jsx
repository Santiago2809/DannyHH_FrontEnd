import { AddModalClient, EditModalClient, DeleteModalClient } from '../index';
import './clientapp.css'
import { useDispatch, useSelector } from 'react-redux';
import { onOpenAddC, onOpenDelC, onOpenEditC, setActiveCustomer } from '../../store';

const headers = ["Name", "Phone", "Address", "Location", "Frecuency", "Time", "Day of Week", "No. of Week", "Category", "Price"]

export const ClientApp = () => {

    const clients = useSelector(store => store.clients.clients);
    const {isEditOpenC, isDelOpenC } = useSelector(store => store.ui);
    const dispatch = useDispatch();

    const onAddOpen = () => {
        dispatch(onOpenAddC());
    };
    const onDelOpen = () => {
        dispatch(onOpenDelC());
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
                    <button onClick={onDelOpen} className='controlBtn btn btn-danger'>
                        Delete client
                    </button>
                </div>
            </div>
            <div className='clientTable mt-4'>
                <table style={{ "width": "100%" }} className='table table-striped table-hover table-bordered border-black'>
                    <thead>
                        <tr className="tableNames">
                            {
                                headers.map(header => <th key={header} scope='col' className='p-2 text-center'>{header}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody style={{ "color": "#000" }} className='table-group-divider'>
                        {
                            clients.length < 1 
                            ?
                                <tr>
                                    <td colSpan={10} className='text-center fw-bold'>No hay clientes</td>
                                </tr>
                            :
                                clients?.map(client => {
                                        const frequency = client.frequency != null ? client.frequency : "Not Available";
                                        const no_week = client.no_week != null ? client.no_week : "Not Available";
                                        const dweek = client.dweek != null ? client.dweek : "Not Available";
                                        return (
                                            <tr key={client.id} id={client.id} onClick={onCustomerCLick} className='customer'>
                                                <td className='tableElement p-2 text-center'>{client.name}</td>
                                                <td className='tableElement p-2 text-center'>{client.phone}</td>
                                                <td className='tableElement p-2 text-center'>{client.address}</td>
                                                <td className='tableElement p-2 text-center'>{client.locality}</td>
                                                <td className='tableElement p-2 text-center'>{frequency}</td>
                                                <td className='tableElement p-2 text-center'>{client.hour}</td>
                                                <td className='tableElement p-2 text-center'>{dweek}</td>
                                                <td className='tableElement p-2 text-center'>{no_week}</td>
                                                <td className='tableElement p-2 text-center'>{client.category}</td>
                                                <td className='tableElement p-2 text-center'>{client.price}</td>
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
            {
                isDelOpenC && <DeleteModalClient />
            }
        </div>
    )
}
