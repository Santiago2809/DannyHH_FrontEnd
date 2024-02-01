import Modal from 'react-modal';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { delMember, onCloseDelT } from '../../store';
import { customStyles, notifyError, notifySuccess } from '../../helpers';
import { delTeamMember } from '../helpers/dbTeamFunctions';
import { useState } from 'react';

export const DeleteModalTeam = () => {

    const isOpen = useSelector(state => state.ui.isDelOpenT);
    const dispatch = useDispatch();
    const fullTeam = useSelector(state => state.team.members);

    const [disabled, setDisabled] = useState(false);

    const [value, handleInputChange] = useForm({
        team: '',
    });
    const { team } = value;

    const onCloseModal = () => {
        dispatch(onCloseDelT());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        if (team == '') {
            setDisabled(false);    
            return
        }
        await delTeamMember(team)
            .then(() => {
                dispatch(delMember(team))
                notifySuccess("Team member deleted successfully!");
                onCloseModal();
            })
            .catch(e => notifyError(e))
            .finally(() => setDisabled(false));
    }


    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={onCloseModal}
                style={customStyles}
                className="modal"
                overlayClassName="modal-fondo"
                closeTimeoutMS={200}
            >
                <h1 className='p-2'>Delete Team member</h1>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className='mt-3'>
                        <label className='form-label fs-3'>Team member to delete:</label>
                        <select className='form-select' onChange={handleInputChange} name='team' value={team}>
                            <option value="" className='optionn'>---Not Selected---</option>
                            {
                                fullTeam != null &&
                                fullTeam.map(member => {
                                    return (
                                        <option key={member.id} className='optionn' value={member.id}>{member.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <button className='btn btn-danger w-50' disabled={disabled}>
                            Delete
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
