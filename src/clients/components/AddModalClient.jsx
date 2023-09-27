import { useState } from 'react'
import Modal from 'react-modal';
import { validateAdd } from '../index';
import { useForm } from '../../hooks/useForm';
import ReactDatePicker from 'react-datepicker';
import { fromUnixTime, millisecondsToSeconds } from 'date-fns';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addClients, onCloseAddC } from '../../store';
import { customStyles } from '../../helpers';
import { addDBClient } from '../helpers/addDBClient';


export const AddModalClient = () => {

    const isOpen = useSelector(state => state.ui.isAddOpenC);
    const dispatch = useDispatch();


    const [hour, setHour] = useState(new Date().setHours(8, 0));
    const [values, handleInputChange, reset] = useForm({
        name: '',
        phone: '',
        address: '',
        locality: '',
        frecuency: '',
        dweek: '',
        noWeek: '',
        category: 'full_time',
        price: ''
    })

    const { name, phone, address, locality, frecuency, dweek, noWeek, category, price } = values;

    const onCloseModal = () => {
        dispatch(onCloseAddC());
    }

    const notifyError = (message) => {
        return toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
    const notifySuccess = (message) => {
        return toast.success(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();

        //Si la hora no fue cambiada viene en formato de timestap en ms pero el convertidor utiliza segundos
        const formatHour = (typeof hour === 'number') ? fromUnixTime(millisecondsToSeconds(hour)) : hour;
        const finalHour = `${formatHour.getHours()}:${formatHour.getMinutes() == "0" ? "00" : formatHour.getMinutes()}`;
        // console.log({name, phone, address, locality, frecuency, finalHour, dweek, noWeek, category, price});


        const result = validateAdd(name, phone, address, locality, price, frecuency, dweek, noWeek );
        // const freq = ()

        if (result.type === 'error' ) {
            notifyError(result.message)
            return;
        } else {
            notifySuccess("Client saved")
            const client = { name, phone, address, locality, frequency: frecuency, hour: finalHour, dweek, no_week: noWeek, category, price };
            const id = (new Date().getTime());
            addDBClient(client)
            dispatch(addClients({ ...client, id }));
            // addClient({ ...client, id });
            dispatch(onCloseAddC());
            reset();
        }

    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onCloseModal}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}
            >
                <h1 className='p-2'>Add Client</h1>
                <hr />
                <form className='p-2' onSubmit={onHandleSubmit} autoComplete='off'>
                    <div className='mb-3 row'>
                        <div className='col-6'>
                            <label className='form-label'>Name:</label>
                            <input value={name} onChange={handleInputChange} name='name' type="text" className='form-control' placeholder='client name' />
                        </div>
                        <div className='col-6'>
                            <label className='form-label'>Phone: </label>
                            <input value={phone} onChange={handleInputChange} name='phone' type="text" className='form-control' placeholder='client phone' />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <div className='col-6'>
                            <label className='form-label col-2 col-form-label'>Address: </label>
                            <input value={address} onChange={handleInputChange} name='address' type="text" className='form-control' placeholder='client direction' />
                        </div>
                        <div className='col-6'>
                            <label className='form-label'>Locality:</label>
                            <input value={locality} onChange={handleInputChange} name='locality' type="text" className='form-control' placeholder='client locality' />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <div className='col-6'>
                            <label className='form-label'>Day of the week:</label>
                            <select onChange={handleInputChange} name='dweek' className='form-select'>
                                <option value="" className='optionn'>--Not Selected--</option>
                                <option value="monday" className='optionn'>Monday</option>
                                <option value="tuesday" className='optionn'>Tuesday</option>
                                <option value="wednesday" className='optionn'>Wednesday</option>
                                <option value="thursday" className='optionn'>Thursday</option>
                                <option value="friday" className='optionn'>Friday</option>
                            </select>
                        </div>
                        <div className='col-6'>
                            <label className='form-label '>No. of week: </label>
                            <select onChange={handleInputChange} name='noWeek' className='form-select'>
                                <option value='' className='optionn'>--Not Selected--</option>
                                <option value="1" className='optionn'>1</option>
                                <option value="2" className='optionn'>2</option>
                                <option value="3" className='optionn'>3</option>
                                <option value="4" className='optionn'>4</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className='col-6'>
                            <label className='form-label '>Hour: </label>
                            <ReactDatePicker
                                selected={hour}
                                className='form-control'
                                onChange={(date) => { setHour(date) }}
                                minTime={new Date().setHours(8, 0)}
                                maxTime={new Date().setHours(14, 0)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                            />
                            {/* <input value={hour} onChange={handleInputChange} name='hour' type="text" className='form-control' placeholder='hour'/>     */}
                        </div>
                        <div className='col-6'>
                            <label>Duration:</label>
                            <select onChange={handleInputChange} name='duration' className='form-select mt-2'>
                                <option value="2" className='optionn'>2</option>
                                <option value="1" className='optionn'>1</option>
                                <option value="3" className='optionn'>3</option>
                            </select>
                        </div>
                        <div className='col-12 mt-2'>
                            <label className='form-label'>Frecuency: </label>
                            <select onChange={handleInputChange} name='frecuency' className='form-select'>
                                <option value='' className='optionn'>--Not Selected--</option>
                                <option value="monthly" className='optionn'>Monthly</option>
                                <option value="every_two_weeks" className='optionn'>Every two weeks</option>
                                <option value="every_three_weeks" className='optionn'>Every three weeks</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className='col-6'>
                            <label className='form-label '>Category: </label>
                            <select onChange={handleInputChange} name='category' className='form-select'>
                                <option value="full_time" className='optionn'>Full time</option>
                                <option value="ocasional" className='optionn'>Ocasional</option>
                                <option value="snowbird" className='optionn'>Snowbird</option>
                            </select>
                        </div>
                        <div className='col-6'>
                            <label className='form-label '>Price: </label>
                            <input value={price} onChange={handleInputChange} name='price' type="text" className='form-control' placeholder='price' />
                        </div>
                    </div>

                    <div className='d-flex justify-content-end mt-2'>
                        <button className='btn btn-primary w-50'>
                            Add
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
