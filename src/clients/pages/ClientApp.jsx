import { AddModalClient, EditModalClient, DeleteModalClient } from '../index';
import './clientapp.css'
import { useDispatch, useSelector } from 'react-redux';
import { onOpenAddC, onOpenDelC, onOpenEditC, setActiveCustomer } from '../../store';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const headers = ["Name", "Phone", "Address", "Location", "Frecuency", "Time", "Day of Week", "No. of Week", "Category", "Price"]
const frequencyNames = {monthly: "Monthly", every_week: "Every week", every_two_weeks: "Every two weeks", every_three_weeks: "Every three weeks", notA: "Not Available"}
const categories = { full_time: "Full Time", snowbird: "Snowbird", ocasional: "Ocasional", NA: "Not Available"}

export const ClientApp = () => {

    const clients = useSelector(store => store.clients.clients);
    const loading = useSelector(store => store.ui.loadingC );
    const { isEditOpenC, isDelOpenC } = useSelector(store => store.ui);
    const { search: searchParam } = useLocation();
    const [search, setSearch] = useState(searchParam.length > 0 ? searchParam.slice(searchParam.indexOf("=")+1) : '');
    const dispatch = useDispatch();


    const handleInput = (e) => {
        setSearch(e.target.value);
    }
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
                <div className='search_bar w-50'>
                    <input type="text" className='form-control' style={{height: '50px'}} placeholder='Search' value={search} onChange={handleInput} />
                </div>
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
                            
                            !loading
                            ?
                                clients.length < 1
                                    ?
                                    <tr>
                                        <td colSpan={10} className='text-center fw-bold'>No hay clientes</td>
                                    </tr>
                                    :
                                    clients?.map(client => {
                                        const frequency = client.frequency != null ? client.frequency : 'notA';
                                        const no_week = client.no_week != null ? client.no_week : "Not Available";
                                        const dweek = client.dweek != null ? client.dweek : "Not Available";
                                        if (client.name.trim().toLowerCase().includes(search.trim().toLowerCase())) { 
                                            return (
                                                <tr key={client.id} id={client.id} onClick={onCustomerCLick} className='customer'>
                                                    <td className='tableElement p-2 text-center'>{client.name}</td>
                                                    <td className='tableElement p-2 text-center'>{client.phone}</td>
                                                    <td className='tableElement p-2 text-center'>{client.address}</td>
                                                    <td className='tableElement p-2 text-center'>{client.locality}</td>
                                                    <td className='tableElement p-2 text-center'>{frequencyNames[frequency]}</td>
                                                    <td className='tableElement p-2 text-center'>{client.hour}</td>
                                                    <td className='tableElement p-2 text-center'>{dweek}</td>
                                                    <td className='tableElement p-2 text-center'>{no_week}</td>
                                                    <td className='tableElement p-2 text-center'>{categories[client.category]}</td>
                                                    <td className='tableElement p-2 text-center'>{client.price}</td>
                                                </tr>
                                            )
                                        }
                                    })
                            :
                                null                                    
                        }
                    </tbody>
                </table>
                {
                    loading
                    ?
                        <div className='text-center d-flex justify-content-center flex-column align-items-center mt-5'>
                            <span>Loading clients...</span>
                            <div className="spinner-border m-5 " role="status" style={{width: '65px', height: '65px'}}>
                                <span className="visually-hidden">Loading...</span>
                            </div> 
                        </div>
                    :
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
