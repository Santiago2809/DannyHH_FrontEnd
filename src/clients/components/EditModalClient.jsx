import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { onCloseEditC } from '../../store';
import { customStyles } from '../../helpers';

export const EditModalClient = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector( state => state.ui.isEditOpenC );
    // const [clients, setClients] = useState( useSelector( state => state.clients.clients ) )
    const clients = useSelector( state => state.clients.clients );
    const [selectedClient, setSelectedClient] = useState(clients[0]);
    
    const handleInputChange = () =>{};

    const onCloseModal = () => {
        dispatch( onCloseEditC());
    }

    const onClientChange = ({target}) => {
        console.log(target.value)
    }


    //TODO: Arreglar lo del selected client, no jala con el useState
    // 9 cita primera
    // 

    // console.log(selectedClient);

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
            <h1>Edit Client</h1>
            <hr />
            {/* <form>
                <div className="form-floating mb-2">
                    <select className="form-select" onChange={ onClientChange }>
                        { clients.map( (client) => {
                            return (
                                <option className='optionn' key={client.id} value={client.id}>{client.name} - {client.phone}</option>
                            )
                        })}
                    </select>
                    <label>Cliente a editar</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="text" value={ selectedClient.name } onChange={ handleInputChange } name='name' className="form-control"/>
                    <label>Client name</label>
                </div>
                <div className="form-floating mb-2">
                    <input type="name" value={ selectedClient.phone } onChange={ handleInputChange } name='name' className="form-control"/>
                    <label>Client Phone</label>
                </div>
            </form> */}
            </Modal>
        </div>
    )
}
