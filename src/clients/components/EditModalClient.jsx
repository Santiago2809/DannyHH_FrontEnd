import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { delActiveCustomer, onCloseEditC } from '../../store';
import { customStyles } from '../../helpers';
import { useForm } from '../../hooks/useForm';
import ReactDatePicker from 'react-datepicker';
import { useState } from 'react';
import { fromUnixTime, millisecondsToSeconds } from 'date-fns';
import { toast } from 'react-toastify';

export const EditModalClient = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.ui.isEditOpenC);
    const activeCustomer = useSelector(state => state.clients.activeCustomer);
    const { name, phone, address, locality, frequency, hour, dweek, no_week, category, price, comments } = activeCustomer;

    const [hours, setHour] = useState(new Date().setHours(8, 0));
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
        comments: comments ? comments : ""
    })

    const checkCategory = () => {
        if (values.category != 'full_time' && values.category != "NA") return true
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
    const twoCalls = (e)=> {
        handleInputChange(e)
        if(changedValues.length > 0){
            setChangedValues(state => {
                if(!state.includes(e.target.name)) return [...state, e.target.name]
                else return state;
            })
        } else {
            setChangedValues(state => [...state, e.target.name])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const compareActive = (({id,created,...obj}) => obj )(activeCustomer)
        const editedCustomer = {
            ...values,
            frequency: values.frequency === "" ? null : values.frequency,
            dweek: values.dwe === "" ? null : values.dweek ,
            no_week: values.no_week === "" ? null : values.no_week,
            comments: values.comments === "" ? null : values.comments

        }
        if(JSON.stringify(compareActive) === JSON.stringify(editedCustomer)) return notifyError("Must be at leat 1 edited value")
        console.log(changedValues)
        //Si la hora no fue cambiada viene en formato de timestap en ms pero el convertidor utiliza segundos
        const formatHour = (typeof hours === 'number') ? fromUnixTime(millisecondsToSeconds(hours)) : hours;
        const finalHour = `${formatHour.getHours()}:${formatHour.getMinutes() == "0" ? "00" : formatHour.getMinutes()}`;
        // console.log({name, phone, address, locality, frecuency, finalHour, dweek, noWeek, category, price});4
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
                        <select onChange={twoCalls} name='frecuency' className='form-select' disabled={checkCategory()}>
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
                            onChange={(date) => { setHour(date) }}
                            minTime={new Date().setHours(8, 0)}
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
                        <select onChange={twoCalls} name='no_week' value={values.no_week == null ? '' : values.no_week  } className='form-select' disabled={checkCategory()}>
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
                        <input className='form-control' type="text" name="comments" value={values.comments == null ? '' : values.comments } onChange={handleInputChange} />
                    </div>

                    <div className='d-flex justify-content-center mt-3'>
                        <button className='btn btn-warning'>Edit Customer</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
