import { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { customStyles } from '../../helpers';
import '../../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { onAddCloseCal } from '../../store';
import { toast } from 'react-toastify';
import { fromUnixTime, millisecondsToSeconds } from 'date-fns';
import { addEvent } from '../helper/addEvent';


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

    const onCloseModal = () => {
        dispatch(onAddCloseCal());
    };

    //Funcion que guarda los campos del formulario
    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    //Funcion que guarda las fechas cuando cambian
    const onDateChange = (event = new Date(), changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    //Funcion validadora de los campos en el formulario
    const validate = (values = {}) => {

        if (values.customer === '') {
            notifyError("Invalid Customer")
            return false;
        }
        if (values.date === '') {
            notifyError("Invalid Date")
            return false;
        }
        if (values.address.length < 4){
            notifyError("Invalid Address")
            return false;
        }
        if (values.locality.length < 4){
            notifyError("Invalid Locality")
            return false;
        }
        if (values.price.trim() === '' || isNaN(+values.price)) {
            notifyError("Invalid Price")
            return false;
        }
        return true;
    }

    //Funcion que guarda los datos al hacer submit en el formulario
    const onSubmit = async (e) => {
        e.preventDefault();

        if (validate({ ...formValues })) {

            //Si la hora no fue cambiada viene en timestamp
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
            await addEvent(finalValues)
                .then(() => {
                    notifySuccess("Saved Date")
                    onCloseModal()
                })
                .catch(() => {
                    notifyError("Ups! Something went wrong");
                })
            // dispatch(onAddCloseCal());
        }
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
                    <input type="text" className='form-control' placeholder='Address...' name='address' value={formValues.address} onChange={onInputChange}/>
                </div>
                
                <div className='mb-2'>
                    <label className='form-label'>Locality:</label>
                    <input type="text" className='form-control' placeholder='Locality...' name='locality' value={formValues.locality} onChange={onInputChange}/>
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
                    <input className='form-control' autoComplete='off' type="text" value={formValues.price} onChange={onInputChange} name='price'/>
                </div>


                <hr />
                {/* <div className='form-group mb-2'>
                    <label className='d-block mb-2'>Frequency:</label>
                    <div className="form-check form-check-inline">
                        <input onChange={ onFrecuencyChange } value={"once"} defaultChecked className="form-check-input" type="radio" name="flexRadioDefault"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Once
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onChange={ onFrecuencyChange } value={"otherweek"} className="form-check-input" type="radio" name="flexRadioDefault"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Every other week
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input onChange={ onFrecuencyChange } value={"monthly"} className="form-check-input" type="radio" name="flexRadioDefault"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Monthly
                        </label>
                    </div>
                </div>
                {
                    showNumber && 
                    <div className="form-group" style={{color: "#000"}}>
                        <label>Ingresa el numero de veces que se repetira: </label>
                        <input autoComplete="false"  onChange={ onInputChange } name='freqNum' className="form-control my-2" type="number" min={2}/>
                    </div>
                } */}
                {/* <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        value={formValues.title}
                        onChange={ onInputChange }
                        name="title"
                        autoComplete="off"
                    />
                    <div className="invalid-feedback">
                        Please choose a username.
                    </div>
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                        rows="3"
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div> */}

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
