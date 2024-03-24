import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { delActiveTeammate, editMember, onCloseEditT } from '../../store';
import { customStyles, notifyError, notifySuccess } from '../../helpers';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { editTeammate } from '../helpers/dbTeamFunctions';

import classes from '../../styles/modalStyles.module.css'

export const EditModalTeam = () => {

    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);
    const isOpen = useSelector( state => state.ui.isEditOpenT );
    const activeTeammate = useSelector( state => state.team.activeTeammate );   
    const { id, name, phone } = activeTeammate; 

    const [values, handleInputChange ] = useForm({ name, phone })

    const onCloseModal = () => {
        dispatch( delActiveTeammate())
        dispatch( onCloseEditT());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        //todo hacer la validacion correcta para que no se haga el llamado a la api de manera innecesaria
        // if(name.toLowerCase().trim() === values.name.toLowerCase().trim()){
        //     notifyError("Name must be changed")
        //     setDisabled(false);
        //     return;
        // }
        // if(phone.trim() === values.phone.trim()){
        //     notifyError("Phone must be changed")
        //     setDisabled(false);
        //     return;
        // }
        
        await editTeammate(id, {...values})
            .then(() => {
                dispatch(editMember({ id, finalValues: {...values}}))
                notifySuccess("Member updated successfully!")
                onCloseModal();
            })
            .catch((e) => {
                notifyError(e)
            })
            .finally(() => setDisabled(false));
    }

    return (
        <div>
            <Modal
                isOpen={ isOpen }
                onRequestClose={ onCloseModal }
                style={customStyles}
                className="modal p-3"
                overlayClassName="modal-fondo"
                closeTimeoutMS={ 200 }
            >   
            <div className={classes.modalHeader}>
                <h1 className='p-2'>Edit Team member</h1>
                <span onClick={onCloseModal}>X</span>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className='mb-2 row'>
                    <div className='col-6'>
                        <label className='form-label'>Team member name:</label>
                        <input type="text" name="name" className='form-control' value={values.name} onChange={handleInputChange}/>
                    </div>
                    <div className='col-6'>
                        <label className='form-label'>Team member phone: </label>
                        <input type="text" name='phone' className='form-control' value={values.phone} onChange={handleInputChange}/>
                    </div>
                </div>
                <div className='mt-3 w-100 d-flex justify-content-center'>
                    <button className='btn btn-warning' disabled={disabled}>Edit Team member</button>
                </div>
            </form>
            </Modal>
        </div>
    )
}
