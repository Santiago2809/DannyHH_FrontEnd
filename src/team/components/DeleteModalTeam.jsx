import Modal from 'react-modal';
// import { getClients } from '../helpers/getClients';
import { useForm } from '../../hooks/useForm';
// import { delClient } from '../helpers/delClient';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { delClients, onCloseDelT } from '../../store';
import { customStyles } from '../../helpers';
import { getDbClients } from '../../clients/helpers/getDBClients';

export const DeleteModalTeam = () => {

    const isOpen = useSelector( state => state.ui.isDelOpenT );
    const dispatch = useDispatch();
    const clients = useSelector( state => state.clients.clients );
    // const [clients, setClients] = useState([])

    const [value, handleInputChange ] = useForm({
        client: clients[0]?.id,
    });

    const onCloseModal = () => {
        dispatch(onCloseDelT());
        // setIsOpen(!isOpen);
    }

    // useEffect(() => {
        
    // }, [])

    const delCorrectly = () => {
        toast.success('Client deleted correctly', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
    
    const onDelete = () => {
        const clientid = value.client != ''  ? value.client*1 : clients[0].id;
        delClients( clientid );
        dispatch( delClients( clientid ));
        dispatch( getDbClients());
        dispatch(onCloseDelT());
        delCorrectly();
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
            <h1 className='p-2'>Delete Client</h1>
            <hr />
            <div className='mt-3'>
                <label className='form-label fs-3'>Client to delete:</label>
                <select className='form-select' onChange={handleInputChange} name='client'>
                    {/* <option value="1" className='optionn'>1</option>
                    <option value="2" className='optionn'>2</option>
                    <option value="3" className='optionn'>3</option>
                    <option value="4" className='optionn'>4</option> */}
                    {
                        clients != null &&
                        clients.map( client => {
                            return (
                                <option key={client.id} className='optionn' value={client.id}>{client.name} -- {client.phone}</option>
                            )
                        })
                    }
                </select>  
            </div>
            <div className='d-flex justify-content-center mt-4'>
                <button className='btn btn-danger w-50' onClick={onDelete}>
                    Delete
                </button>
            </div>
            </Modal>
        </div>
    )
}
