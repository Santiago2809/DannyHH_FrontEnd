import { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { customStyles, notifyError } from '../../helpers';
import '../../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { onAddCloseCal } from '../../store';
import { fromUnixTime, millisecondsToSeconds } from 'date-fns';

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const isOpen = useSelector(state => state.ui.isAddOpenCal);
    const customers = useSelector(state => state.clients.clients);
    const dispatch = useDispatch();


    const [formValues, setFormValues] = useState({
        customer: '',
        date: new Date().setHours(8, 0),
        duration: 2,
        price: '',
        comments: '',
        address: '',
        locality: ''
    })

    //** Funcion que cierra el modal
    const onCloseModal = () => {
        dispatch(onAddCloseCal());
    };

    //*Funcion que guarda los campos del formulario
    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    //*Funcion que guarda las fechas cuando cambian
    const onDateChange = (event = new Date(), changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    //*Funcion validadora de los campos en el formulario
    const validate = (values = {}) => {

        if (values.customer === '') {
            notifyError("Invalid Customer")
            return false;
        }
        if (values.date === '') {
            notifyError("Invalid Date")
            return false;
        }
        if (values.address.length < 4) {
            notifyError("Invalid Address")
            return false;
        }
        if (values.locality.length < 4) {
            notifyError("Invalid Locality")
            return false;
        }
        if (values.price.trim() === '' || isNaN(+values.price)) {
            notifyError("Invalid Price")
            return false;
        }
        return true;
    }

    //*Funcion que guarda los datos al hacer submit en el formulario
    const onSubmit = async (e) => {
        e.preventDefault();

        if (validate({ ...formValues })) {

            //? Si la hora no fue cambiada viene en timestamp por lo tanto hacemos la conversion
            const formatHour = (typeof formValues.date === 'number') ? fromUnixTime(millisecondsToSeconds(formValues.date)) : formValues.date;

            const idx = formatHour.toLocaleTimeString().lastIndexOf(':');
            const value = `${formatHour.toLocaleDateString()},${formatHour.toLocaleTimeString().substring(0, idx)}`
            const finalValues = {
                ...formValues,
                customer: +formValues.customer,
                date: value,
                duration: +formValues.duration,
                price: +formValues.price,
                comments: formValues.comments.trim().length < 1 ? null : formValues.comments
            }
            console.log(finalValues)
            return
            // await addEvent(finalValues)
            //     .then(() => {
            //         notifySuccess("Saved Date")
            //         onCloseModal()
            //     })
            //     .catch(() => {
            //         notifyError("Ups! Something went wrong");
            //     })
            // dispatch(onAddCloseCal());
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1>New Date</h1>
            <hr />
            <form className="container needs-validation" onSubmit={onSubmit}>

                <div className='mb-2'>
                    <label className='mb-2'>Select customer:</label>
                    <select onChange={onInputChange} name='customer' className='form-select'>
                        <option value='' className='optionn'>--Not Selected--</option>
                        {
                            customers.map(customer => {
                                if (customer.category != "full_time" && customer.category != "NA")
                                    return (<option key={customer.id} value={customer.id} className='optionn'>{customer.name} - {customer.phone}</option>)
                            })
                        }
                    </select>
                </div>

                <div className="form-group mb-2 datepiker mt-3">
                    <label className='mb-1'>Start Date and Time:</label>
                    <ReactDatePicker
                        showTimeSelect
                        showTimeInput
                        className='form-control'
                        selected={formValues.date}
                        minDate={new Date().setHours(8, 0)}
                        minTime={new Date().setHours(8, 0)}
                        maxTime={new Date().setHours(14, 0)}
                        onChange={(event) => onDateChange(event, 'date')}
                        dateFormat="Pp"
                    />
                </div>

                <div className='mb-2'>
                    <label className='form-label'>Address:</label>
                    <input type="text" className='form-control' placeholder='Address...' name='address' value={formValues.address} onChange={onInputChange} />
                </div>

                <div className='mb-2'>
                    <label className='form-label'>Locality:</label>
                    <input type="text" className='form-control' placeholder='Locality...' name='locality' value={formValues.locality} onChange={onInputChange} />
                </div>

                <div>
                    <label>Duration:</label>
                    <select onChange={onInputChange} name='duration' className='form-select mt-2'>
                        <option value="2" className='optionn'>2</option>
                        <option value="1" className='optionn'>1</option>
                        <option value="3" className='optionn'>3</option>
                    </select>
                </div>

                <div>
                    <label className='form-label'>Price</label>
                    <input className='form-control' autoComplete='off' type="text" value={formValues.price} onChange={onInputChange} name='price' />
                </div>
                <hr />
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block guardar"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
