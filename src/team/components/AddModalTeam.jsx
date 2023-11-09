import Modal from 'react-modal';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { customStyles } from '../../helpers';
import { addMember, onCloseAddT } from '../../store';
import { useState } from 'react';


export const AddModalTeam = () => {

    const isOpen = useSelector( state => state.ui.isAddOpenT );
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const [disabled, setDisabled] = useState(false);
    const [ values, handleInputChange, reset ] = useForm({
        name: '',
        phone: ''
    })
    
    const { name, phone } = values;

    const onCloseModal = () => {
        dispatch(onCloseAddT());
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true)
        if(name.length < 3) return;
        if(phone.length < 8) return;
        dispatch(addMember({ id: crypto.randomUUID(), name, phone}))
        onCloseModal();
        
    }
    
    return (
        <div>
            <Modal
                isOpen={ isOpen }
                onRequestClose={ onCloseModal }
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={ 200 }
            >   
            <h1 className='p-2'>Add team member</h1>
            <hr />
            <form className='p-2' onSubmit={ onHandleSubmit }>
                <div className='mb-3 row'>
                    <div className='col-6'>
                        <label className='form-label'>Name:</label>
                        <input value={name} onChange={handleInputChange} name='name' type="text" className='form-control' placeholder='client name'/>
                    </div>
                    <div className='col-6'>
                        <label className='form-label'>Phone: </label>
                        <input value={phone} onChange={handleInputChange} name='phone' type="text" className='form-control' placeholder='client phone'/>
                    </div>
                </div>


                <div className='d-flex justify-content-end mt-2'>
                    <button className='btn btn-primary w-50' disabled={disabled}>
                        Add
                    </button>
                </div>
            </form>
            </Modal>
        </div>
    )
}
