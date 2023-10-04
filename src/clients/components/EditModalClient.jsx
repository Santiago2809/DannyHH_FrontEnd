import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { delActiveCustomer, onCloseEditC } from '../../store';
import { customStyles } from '../../helpers';
import { useForm } from '../../hooks/useForm';

export const EditModalClient = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.ui.isEditOpenC);
    const activeCustomer = useSelector(state => state.clients.activeCustomer);
    const { name, phone, address, locality, frequency, hour, dweek, no_week, category, price, comments } = activeCustomer;

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
        if (values.category != 'full_time') return true
    }


    const onCloseModal = () => {
        dispatch(delActiveCustomer());
        dispatch(onCloseEditC());
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
                <h1>Edit Client</h1>
                <hr />
                <form autoComplete='off'>
                    <div className='mb-2'>
                        <label className='form-label'>Customer name:</label>
                        <input className='form-control' type="text" name="name" value={values.name} onChange={handleInputChange} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Customer phone:</label>
                        <input className='form-control' type="text" name="phone" value={values.phone} onChange={handleInputChange} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Customer address:</label>
                        <input className='form-control' type="text" name="address" value={values.address} onChange={handleInputChange} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Customer locality:</label>
                        <input className='form-control' type="text" name="locality" value={values.locality} onChange={handleInputChange} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label '>Price: </label>
                        <input value={values.price} onChange={handleInputChange} name='price' type="text" className='form-control' placeholder='price' />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Customer hour:</label>
                        <input className='form-control' type="text" name="hour" value={values.hour} onChange={handleInputChange} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Customer Day of Week:</label>
                        <select onChange={handleInputChange} name='dweek' value={values.dweek} className='form-select' disabled={checkCategory()}>
                            <option value="" className='optionn'>--Not Selected--</option>
                            <option value="monday" className='optionn'>Monday</option>
                            <option value="tuesday" className='optionn'>Tuesday</option>
                            <option value="wednesday" className='optionn'>Wednesday</option>
                            <option value="thursday" className='optionn'>Thursday</option>
                            <option value="friday" className='optionn'>Friday</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label>Number of Week:</label>
                        <select onChange={handleInputChange} name='noWeek' value={no_week ? no_week : ''} className='form-select' disabled={checkCategory()}>
                            <option value='' className='optionn'>--Not Selected--</option>
                            <option value="1" className='optionn'>1</option>
                            <option value="2" className='optionn'>2</option>
                            <option value="3" className='optionn'>3</option>
                            <option value="4" className='optionn'>4</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Customer category:</label>
                        <select onChange={handleInputChange} name='category' value={values.category} className='form-select'>
                            <option value="full_time" className='optionn'>Full time</option>
                            <option value="ocasional" className='optionn'>Ocasional</option>
                            <option value="snowbird" className='optionn'>Snowbird</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Customer comments:</label>
                        <input className='form-control' type="text" name="comments" value={values.comments} onChange={handleInputChange} />
                    </div>

                    <div className='d-flex justify-content-center mt-3'>
                        <button className='btn btn-warning'>Edit Customer</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
