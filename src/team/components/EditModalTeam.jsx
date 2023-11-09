import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { delActiveTeammate, editMember, onCloseEditT } from '../../store';
import { customStyles } from '../../helpers';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';

export const EditModalTeam = () => {

    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(false);
    const isOpen = useSelector( state => state.ui.isEditOpenT );
    const activeTeammate = useSelector( state => state.team.activeTeammate );   
    const { id, name, phone } = activeTeammate; 

    const [values, handleInputChange ] = useForm({
        name,
        phone
    })



    const onCloseModal = () => {
        dispatch( delActiveTeammate())
        dispatch( onCloseEditT());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        dispatch(editMember({ id, finalValues: {...values}}))
        onCloseModal();
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
            <h1>Edit Team member</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label className='form-label'>Team member name:</label>
                    <input type="text" name="name" className='form-control' value={values.name} onChange={handleInputChange}/>
                </div>
                <div className='mb-2'>
                    <label className='form-label'>Team member phone:</label>
                    <input type="text" name="phone" className='form-control' value={values.phone} onChange={handleInputChange}/>
                </div>
                <div className='mt-3 w-100 d-flex justify-content-center'>
                    <button className='btn btn-warning' disabled={disabled}>Edit Team member</button>
                </div>
            </form>
            </Modal>
        </div>
    )
}
