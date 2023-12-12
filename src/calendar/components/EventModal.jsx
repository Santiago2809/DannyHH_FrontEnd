import Modal from 'react-modal'
import './eventmodal.css';
import { useState } from 'react';
import { customStyles, notifyError, notifySuccess } from '../../helpers';
import { delActiveEvent, onCloseEvent } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { editCustomerTeam } from '../helper/editCustomerTeam';

export const EventModal = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector(state => state.ui.isOpenEvent );
    const activeEvent = useSelector(state => state.calendar.activeEvent);
    const companyTeam = useSelector(state => state.team.members)
    const [confirmDisabled, setConfirmDisabled ] = useState(false);
    
    const { id, title, address, end, locality, price, start, phone, team } = activeEvent;
    const start_date = new Date(start);
    const end_date = new Date(end);

    const customerTeam = team === null ? [] : JSON.parse(team);

    const [selectedTeam, setSelectedTeam] = useState(customerTeam);
    const [haveChange, setHaveChange] = useState(false);
    
    const onCloseModal = () => {
        dispatch(onCloseEvent())
        dispatch(delActiveEvent());
    };

    const onSubmit = (e) => {
        e.preventDefault();
    }

    //* Funcion que maneja el cambio de elementos del equipo del cliente
    const handleSelectChange = ({ target }) => {
        const { value } = target;
        if (value === '') return;
        if (selectedTeam.find(member => member.id === +value)) return;
        const memberSelected = companyTeam.find(member => member.id === +value);
        setSelectedTeam(prev => [...prev, memberSelected])
        setHaveChange(true)
    }

    //* Eliminamos un elemento del equipo del cliente
    const handleMemberDelete = ({ target }) => {
        const teamName = target.value;
        setSelectedTeam(prev => prev.filter(member => member.name != teamName))
        setHaveChange(true)
    }

    const onConfirmTeam = async () => {

        setConfirmDisabled(true)
        //* Ordenamos los arreglos del equipo inicial y el seleccionado para comprobar si son iguales y abandonar la ejecucion
        const customerTeamCompare = customerTeam.toSorted( (a,b) => a.id - b.id );
        const selectedTeamCompare = selectedTeam.toSorted( (a,b) => a.id - b.id );

        //* Comprobamos igualdad, en caso negativo actualizamos la base de datos
        if(JSON.stringify(customerTeamCompare.sort()) === JSON.stringify(selectedTeamCompare)){
            notifyError("The selected team is the same")
            setConfirmDisabled(false);
            return
        }
        await editCustomerTeam( id, selectedTeam.length < 1 ? null : JSON.stringify(selectedTeam))
            .then(() => {
                notifySuccess("Team updated successfully")
                onCloseModal();
            })
            .catch(() => {
                notifyError("Ups! Something gone wrong, try again")
                setConfirmDisabled(false);
            });  
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal p-3"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <form className='' onSubmit={onSubmit}>
                <div style={{ color: '#000' }}>
                    <div className='mb-2'>
                        <label className='form-label'>Customer Name - Phone:</label>
                        <input type="text" readOnly value={`${title} - ${phone}`} className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>Address - Locality:</label>
                        <input type="text" readOnly value={`${address} - ${locality}`} className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>From hour:</label>
                        <input type="text" readOnly value={`${start_date.getHours()}:${start_date.getMinutes() < 1 ? "00" : start_date.getMinutes()} ${start_date.getHours() < 12 ? "AM" : "PM"}`} className='form-control' />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label'>To hour:</label>
                        <input type="text" readOnly value={`${end_date.getHours()}:${end_date.getMinutes() < 1 ? "00" : end_date.getMinutes()} ${end_date.getHours() < 12 ? "AM" : "PM"}`} className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Price:</label>
                        <div className='d-flex'>
                            <input type="text" readOnly value={`$${price}`} className='form-control w-50' />
                            <button className='btn btn-success ms-2'>Confirm</button>
                        </div>
                    </div>

                    <div className='mb-2'>
                        <label>Select Team:</label>
                        <select name="teamMembers" className='form-control mt-2 teamSelect' onChange={handleSelectChange}>
                            <option value="" className='optionn'>--Not Selected--</option>
                            {companyTeam.map(member => (
                                <option key={member.id} className='optionn' value={member.id}>{member.name}</option>
                            ))}
                        </select>
                    </div>

                    {
                        selectedTeam.length > 0
                            ? (<div>
                                <label className='form-label'>Selected Team:</label>
                                {
                                    selectedTeam.map(member => (
                                        <input key={member.id} type="text" readOnly value={member.name} className='form-control memberDelete' style={{ cursor: 'pointer' }} onClick={handleMemberDelete} />
                                    ))
                                }
                            </div>
                            )
                            : null

                    }
                    {
                        haveChange &&
                            <button className='btn btn-success mt-3' onClick={onConfirmTeam} disabled={confirmDisabled}>Confirm changes</button>
                    }
                </div>
            </form>
        </Modal>
    )
}
