import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { delActiveCustomer, onCloseEditC } from '../../store';
import { customStyles } from '../../helpers';
import { useForm } from '../../hooks/useForm';
import ReactDatePicker from 'react-datepicker';
import { useState } from 'react';
import { fromUnixTime, millisecondsToSeconds } from 'date-fns';
import { toast } from 'react-toastify';
import { editClient } from '../helpers/editClient';

export const EditModalClient = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.ui.isEditOpenC);
    const activeCustomer = useSelector(state => state.clients.activeCustomer);
    const { id, name, phone, address, locality, frequency, hour, dweek, no_week, category, price, comments, duration } = activeCustomer;

    const [hours, setHour] = useState(new Date().setHours(+hour.substring(0,hour.indexOf(':')), +hour.substring(hour.indexOf(':')+1)));
    const [changedValues, setChangedValues] = useState([])
    const [values, handleInputChange] = useForm({
        name,
        phone,
        address,
        locality,
        frequency,
        hour,
        dweek,
        no_week,
        category,
        price,
        comments: comments ? comments : "",
        duration
    })



    const checkCategory = () => {
        if (values.category != 'full_time' && values.category != "NA") return true
    }

    const onHourChange = (date) => {
        setHour(date)
        if (changedValues.length > 0 ) {
            setChangedValues(state => {
                if (!state.includes("hour")) return [...state, "hour"]
                else return state;
            })
        } else {
            setChangedValues(state => [...state, "hour"])
        }
    }


    const onCloseModal = () => {
        dispatch(delActiveCustomer());
        dispatch(onCloseEditC());
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
    const twoCalls = (e) => {
        handleInputChange(e)
        if (changedValues.length > 0) {
            setChangedValues(state => {
                if (!state.includes(e.target.name)) return [...state, e.target.name]
                else return state;
            })
        } else {
            setChangedValues(state => [...state, e.target.name])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-vars
        const compareActive = (({ id, created, ...obj }) => obj)(activeCustomer)
        const categories = ["ocasional", "snowbird", "NA"]

        let editedCustomer = {
            ...values,
            price: +values.price,
            frequency: values.frequency === "" || categories.includes(values.category) ? null : values.frequency,
            dweek: values.dwe === "" ? null : values.dweek,
            no_week: values.no_week === "" || values.no_week === null ? null : +values.no_week,
            comments: values.comments === "" ? null : values.comments

        }
        if(changedValues.includes('hour')){
            editedCustomer = {...editedCustomer, hour: `${hours.getHours()}:${hours.getMinutes()}`}
        }
        //Comprobar si se han editado los valores
        // console.log(compareActive)
        // console.log(editedCustomer)
        if (JSON.stringify(compareActive) === JSON.stringify(editedCustomer)) return notifyError("Must be at leat 1 edited value")
        // console.log(changedValues)


        //Si la hora no fue cambiada viene en formato de timestap en ms pero el convertidor utiliza segundos
        const formatHour = (typeof hours === 'number') ? fromUnixTime(millisecondsToSeconds(hours)) : hours;
        // eslint-disable-next-line no-unused-vars
        const finalHour = `${formatHour.getHours()}:${formatHour.getMinutes() == "0" ? "00" : formatHour.getMinutes()}`;
        
        let finalValues = changedValues.includes('hour') ? { hour: finalHour } : {};
        changedValues.forEach((elem) => {
            if (elem == 'hour') return
            if (compareActive[elem] === editedCustomer[elem]) return
            finalValues = {
                ...finalValues,
                [elem]: values[elem]
            }
        })
        
        if( finalValues.duration != undefined ){
            finalValues = {
                ...finalValues,
                duration: +finalValues.duration
            }
        }
        if( finalValues.price != undefined ){
            finalValues = {
                ...finalValues,
                price: +finalValues.price
            }
        }
        if (finalValues.category != undefined && finalValues.category != "full_time" ){
            finalValues = {
                ...finalValues,
                dweek: null,
                no_week: null,
                frequency: null
            }
        }

        // console.log(finalValues)
        await editClient(id, finalValues)
            .then(() => {
                notifySuccess("Customer edited successfully");
                onCloseModal();
            })
            .catch(() => {
                notifyError("Ups! Something gone wrong")
            })
        //TODO: Hacer el dispatch editar los clientes en el estado global

    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onCloseModal}
                style={customStyles}
                className="modal p-3"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}
            >
                <h1>Edit Customer</h1>
                <hr />
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Name:</label>
                        <input className='form-control' type="text" name="name" value={values.name} onChange={twoCalls} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Phone:</label>
                        <input className='form-control' type="text" name="phone" value={values.phone} onChange={twoCalls} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Address:</label>
                        <input className='form-control' type="text" name="address" value={values.address} onChange={twoCalls} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Locality:</label>
                        <input className='form-control' type="text" name="locality" value={values.locality} onChange={twoCalls} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Frecuency:</label>
                        <select onChange={twoCalls} name='frequency' className='form-select' value={values.frequency} disabled={checkCategory()}>
                            <option value='' className='optionn'>--Not Selected--</option>
                            <option value="monthly" className='optionn'>Monthly</option>
                            <option value="every_week" className='optionn'>Every week</option>
                            <option value="every_two_weeks" className='optionn'>Every two weeks</option>
                            <option value="every_three_weeks" className='optionn'>Every three weeks</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Hour:</label>
                        <ReactDatePicker
                            selected={hours}
                            className='form-control'
                            onChange={onHourChange}
                            minTime={new Date().setHours(9,0)}
                            maxTime={new Date().setHours(14, 0)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            disabled={checkCategory()}
                        />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Duration:</label>
                        <select onChange={twoCalls} value={values.duration} name='duration' className='form-select mt-2' disabled={checkCategory()}>
                            <option className='optionn' value={1}>1</option>
                            <option className='optionn' value={2}>2</option>
                            <option className='optionn' value={3}>3</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Day of Week:</label>
                        <select onChange={twoCalls} name='dweek' value={values.dweek == null ? '' : values.dweek} className='form-select' disabled={checkCategory()}>
                            <option value="" className='optionn'>--Not Selected--</option>
                            <option value="monday" className='optionn'>Monday</option>
                            <option value="tuesday" className='optionn'>Tuesday</option>
                            <option value="wednesday" className='optionn'>Wednesday</option>
                            <option value="thursday" className='optionn'>Thursday</option>
                            <option value="friday" className='optionn'>Friday</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Number of Week:</label>
                        <select onChange={twoCalls} name='no_week' value={values.no_week == null ? '' : values.no_week} className='form-select' disabled={checkCategory()}>
                            <option value='' className='optionn'>--Not Selected--</option>
                            <option value="1" className='optionn'>1</option>
                            <option value="2" className='optionn'>2</option>
                            <option value="3" className='optionn'>3</option>
                            <option value="4" className='optionn'>4</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Category:</label>
                        <select onChange={twoCalls} name='category' value={values.category} className='form-select'>
                            <option value="full_time" className='optionn'>Full time</option>
                            <option value="ocasional" className='optionn'>Ocasional</option>
                            <option value="snowbird" className='optionn'>Snowbird</option>
                            <option value="NA" className='optionn'>N A</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Price: </label>
                        <input value={values.price} onChange={twoCalls} name='price' type="text" className='form-control' placeholder='price' />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label fw-bold'>Comments:</label>
                        <input className='form-control' type="text" name="comments" value={values.comments == null ? '' : values.comments} onChange={handleInputChange} />
                    </div>

                    <div className='d-flex justify-content-center mt-3'>
                        <button className='btn btn-warning'>Edit Customer</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
