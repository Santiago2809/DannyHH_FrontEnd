import Modal from 'react-modal';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { customStyles, notifyError, notifySuccess } from '../../helpers';
import { addMember, onCloseAddT } from '../../store';
import { useState } from 'react';
import { addTeammate } from '../helpers/dbTeamFunctions';

import classes from '../../styles/modalStyles.module.css'

export const AddModalTeam = () => {

    const isOpen = useSelector( state => state.ui.isAddOpenT );
    const team = useSelector(state => state.team.members);
    const dispatch = useDispatch();


    const [disabled, setDisabled] = useState(false);
    const [ values, handleInputChange ] = useForm({
        name:  '',
        phone: ''
    })
    
    const { name, phone } = values;

    const onCloseModal = () => {
        dispatch(onCloseAddT());
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        if(name.length < 3 || phone.length < 5 ) return;
        
        await addTeammate(name, phone)
            .then(() => {
                dispatch(addMember({id: team.at(-1).id + 1 , name, phone}))
                notifySuccess("Teammate added successfully!")
                onCloseModal();
            })
            .catch((e) => {
                notifyError(e)
            })
            .finally(() => {
                setDisabled(false);
            })
        
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
            <div className={classes.modalHeader}>
                <h1 className='p-2'>Add Team member</h1>
                <span onClick={onCloseModal}>X</span>
            </div>
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
