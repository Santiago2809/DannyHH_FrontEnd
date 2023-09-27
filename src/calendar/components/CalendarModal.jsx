import { addHours,isAfter, isValid } from 'date-fns';
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import { customStyles } from '../../helpers';
import '../../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { onAddCloseCal } from '../../store';


Modal.setAppElement('#root');

export const CalendarModal = () => {

    const isOpen = useSelector( state => state.ui.isAddOpenCal );
    const dispatch = useDispatch();

    // const [isOpen, setIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        title: "Santiago",
        notes: "Cecena",
        startDate: new Date(),
        endDate: addHours( new Date(), 1),
        frecuency: "once",
        freqNum: null,
    })
    const [showNumber, setShowNumber] = useState(false);

    const onCloseModal = () => {
        dispatch( onAddCloseCal() );
    };

    //Funcion que guarda los campos del formulario
    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    //Funcion que guarda las fechas cuando cambian
    const onDateChange = ( event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    //Funcion que guarda los datos al hacer submit en el formulario
    const onSubmit = (e) => {
        e.preventDefault();

        setFormValues({
            ...formValues,
            frecuency: "once",
            freqNum: null
        })
        validate({...formValues})
    }

    //Funcion que determina el cambio de frecuencia
    const onFrecuencyChange = ({target}) => {
        setFormValues({
            ...formValues,
            frecuency: target.value
        })

        if(target.value !== "once"){
            setShowNumber(true)
        } else {
            setShowNumber(false)
            formValues.freqNum != null && setFormValues({...formValues, freqNum: null})
        }
    }

    //Funcion validadora de los campos en el formulario
    const validate = ( values = {} ) => {
        console.log()
        if(!isValid(values.startDate) ) {
            console.log('no es fecha')
            return
        }
        if( !isAfter(values.endDate, values.startDate )){
            console.log('es antes, no se puede')
            return
        }
        if( values.title.length < 5 ) {
            console.log("Los caracteres deben ser mayor a 5")
            return 
        }
        if(showNumber) {
            if( values.freqNum != null && values.freqNumm?.length == 0 ){
                console.log(values.freqNum?.length)
            } else {
                console.log('ingresa un valor')
                return 
            }
        }
        console.log(formValues)
    }

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >   
            <h1>Nuevo Evento</h1>
            <hr />
            <form className="container needs-validation" onSubmit={ onSubmit }>

                <div className="form-group mb-2 datepiker">
                    <label className='mb-1'>Fecha y hora inicio:</label>
                    <ReactDatePicker 
                            showTimeSelect 
                            showTimeInput 
                            className='form-control'
                            selected={formValues.startDate} 
                            onChange={ (event) => onDateChange(event, 'startDate')}
                            dateFormat="Pp"
                        />
                </div>

                <div className="form-group mb-2 datepiker">
                    <label className='mb-1'>Fecha y hora fin:</label>
                    <ReactDatePicker 
                            minDate={formValues.startDate}
                            showTimeSelect 
                            showTimeInput 
                            className='form-control'
                            selected={formValues.endDate} 
                            onChange={ (event) => onDateChange(event, 'endDate')}
                            dateFormat="Pp"
                        />
                </div>

                <hr />
                <div className='form-group mb-2'>
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
                }
                <div className="form-group mb-2">
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
                </div>

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
