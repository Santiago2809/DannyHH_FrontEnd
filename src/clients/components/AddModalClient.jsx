import { useState } from 'react'
import Modal from 'react-modal';
import { validateAdd } from '../index';
import { useForm } from '../../hooks/useForm';
import ReactDatePicker from 'react-datepicker';
import { addDays, fromUnixTime, millisecondsToSeconds } from 'date-fns';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';

import { addClients, onCloseAddC } from '../../store';
import { customStyles, notifyError, notifySuccess } from '../../helpers';
import { addDBClient } from '../helpers/addDBClient';
import { days_of_week } from '../../types';

import classes from '../../styles/modalStyles.module.css'

export const AddModalClient = () => {

    const isOpen = useSelector(state => state.ui.isAddOpenC);
    const customers = useSelector(state => state.clients.clients);
    const dispatch = useDispatch();
    const [disabledButton, setDisabledButton] = useState(false);

    const [hour, setHour] = useState(new Date().setHours(8, 0));
    const [changeCreated, setChangeCreated] = useState(new Date());
    const [values, handleInputChange, reset] = useForm({
        name: '',
        phone: '',
        address: '',
        locality: '',
        frecuency: '',
        dweek: '',
        noWeek: '',
        category: 'full_time',
        comments: '',
        price: '',
        duration: 2
    })

    const { name, phone, address, locality, frecuency, dweek, noWeek, category, price, comments, duration } = values;

    const checkCategory = () => {
        if (category != 'full_time') return true
    }

    const onCloseModal = () => {
        dispatch(onCloseAddC());
        setChangeCreated(new Date());
        setHour(new Date().setHours(8,0));
        reset();
    }

    const checkDate = (date) => {
        if (date.getDay() == days_of_week.indexOf(values.dweek)){
            console.log('eeee son iguales very good')
            setChangeCreated(date);
        } else {
            notifyError("Date must be in the same day of the week as specified")
        }
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setDisabledButton(true)

        //?Si la hora no fue cambiada viene en formato de timestap en ms pero el convertidor utiliza segundos
        const formatHour = (typeof hour === 'number') ? fromUnixTime(millisecondsToSeconds(hour)) : hour;
        const finalHour = `${formatHour.getHours()}:${formatHour.getMinutes() == "0" ? "00" : formatHour.getMinutes()}`;
        //? console.log({name, phone, address, locality, frecuency, finalHour, dweek, noWeek, category, price});


        const result = validateAdd(name, phone, address, locality, price, frecuency, dweek, noWeek, comments);

        if (result.type === 'error') {
            notifyError(result.message)
            setDisabledButton(false);
            return;
        } else {
            // const today = new Date();

            let firstDate = new Date();
            if(dweek.trim() != ''){
                if( changeCreated.getDay() === 0){
                    firstDate = addDays(changeCreated, days_of_week.indexOf(dweek));
                } else if (changeCreated.getDay() === 6){
                    firstDate = addDays(changeCreated, days_of_week.indexOf(dweek) + 1 );
                }
            }
            const created = `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()}`;

            const client = { name, phone, address, locality, frequency: frecuency, hour: finalHour, dweek, no_week: noWeek, category, price, comments, created, duration };


            await addDBClient(client)
                .then(() => {
                    dispatch(addClients({ ...client, id: customers.at(-1).id + 1 }))
                    notifySuccess("Client saved")
                    onCloseModal();
                })
                .catch(() => {
                    notifyError("Ups! There was a problem saving the client. Try again")
                })
                .finally(() => {
                    setDisabledButton(false);
                });
            
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
                <div className={classes.modalHeader}>
                    <h1 className='p-2'>Add Customer</h1>
                    <span onClick={onCloseModal}>X</span>
                </div>
                <hr />
                <form className='p-2' onSubmit={onHandleSubmit} autoComplete='off'>
                    <div className='mb-3 row'>
                        <div className='col-6'>
                            <label className='form-label fw-bold'>Name:</label>
                            <input value={name} onChange={handleInputChange} name='name' type="text" className='form-control' placeholder='client name' />
                        </div>
                        <div className='col-6'>
                            <label className='form-label fw-bold'>Phone: </label>
                            <input value={phone} onChange={handleInputChange} name='phone' type="text" className='form-control' placeholder='client phone' />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <div className='col-6'>
                            <label className='form-label fw-bold col-2 col-form-label'>Address: </label>
                            <input value={address} onChange={handleInputChange} name='address' type="text" className='form-control' placeholder='client direction' />
                        </div>
                        <div className='col-6'>
                            <label className='form-label fw-bold'>Locality:</label>
                            <input value={locality} onChange={handleInputChange} name='locality' type="text" className='form-control' placeholder='client locality' />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <div className='col-6'>
                            <label className='form-label fw-bold'>Day of the week:</label>
                            <select onChange={handleInputChange} name='dweek' className='form-select' disabled={checkCategory()}>
                                <option value="" className='optionn'>--Not Selected--</option>
                                <option value="monday" className='optionn'>Monday</option>
                                <option value="tuesday" className='optionn'>Tuesday</option>
                                <option value="wednesday" className='optionn'>Wednesday</option>
                                <option value="thursday" className='optionn'>Thursday</option>
                                <option value="friday" className='optionn'>Friday</option>
                            </select>
                        </div>
                        <div className='col-6'>
                            <label className='form-label fw-bold'>No. of week: </label>
                            <select onChange={handleInputChange} name='noWeek' className='form-select' disabled={checkCategory()}>
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
                            <label className='form-label fw-bold'>Hour: </label>
                            <ReactDatePicker
                                selected={hour}
                                className='form-control'
                                onChange={(date) => { setHour(date) }}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                disabled={checkCategory()}
                            />
                        </div>
                        <div className='col-6'>
                            <label className='form-label fw-bold'>Duration:</label>
                            <select onChange={handleInputChange} name='duration' className='form-select mt-2' disabled={checkCategory()}>
                                <option value="2" className='optionn'>2</option>
                                <option value="1" className='optionn'>1</option>
                                <option value="3" className='optionn'>3</option>
                            </select>
                        </div>
                        <div className='col-12 mt-2'>
                            <label htmlFor="forTextArea" className='form-label fw-bold'>Comments:</label>
                            <textarea className='form-control' placeholder='Some comments here....' id='forTextArea' name="comments" onChange={handleInputChange} value={comments} rows={2} style={{ resize: "none" }}></textarea>
                        </div>
                        <div className='col-12 mt-2'>
                            <label className='form-label fw-bold'>Frecuency: </label>
                            <select onChange={handleInputChange} name='frecuency' className='form-select' disabled={checkCategory()}>
                                <option value='' className='optionn'>--Not Selected--</option>
                                <option value="monthly" className='optionn'>Monthly</option>
                                <option value="every_week" className='optionn'>Every week</option>
                                <option value="every_two_weeks" className='optionn'>Every 2 weeks</option>
                                <option value="every_three_weeks" className='optionn'>Every 3 weeks</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className='col-6'>
                            <label className='form-label fw-bold'>Category: </label>
                            <select onChange={handleInputChange} name='category' className='form-select'>
                                <option value="full_time" className='optionn'>Full time</option>
                                <option value="ocasional" className='optionn'>Ocasional</option>
                                <option value="snowbird" className='optionn'>Snowbird</option>
                            </select>
                        </div>
                        <div className='col-6'>
                            <label className='form-label fw-bold'>Price: </label>
                            <input value={price} onChange={handleInputChange} name='price' type="text" className='form-control' placeholder='price' />
                        </div>
                    </div>

                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Choose first date:</label>
                        <ReactDatePicker 
                            selected={changeCreated}
                            className='form-control'
                            onChange={checkDate}
                            // minDate={addDays(new Date(),1)}
                            disabled={checkCategory()}
                        />
                    </div>

                    <div className='d-flex justify-content-end mt-2'>
                        <button className='btn btn-primary w-50' disabled={disabledButton} style={{margin: '10px 0'}}>
                            Add
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
