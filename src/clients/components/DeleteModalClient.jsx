import Modal from 'react-modal';
import { useForm } from '../../hooks/useForm';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { onCloseDelC } from '../../store';
import { customStyles } from '../../helpers';
import { delDBClient } from '../helpers/delDBClient';

export const DeleteModalClient = () => {

    const dispatch = useDispatch();
    const isOpen = useSelector( state => state.ui.isDelOpenC );
    const customers = useSelector(state => state.clients.clients);

    const [values, handleInputChange] = useForm({
        id: customers[0].id
    })

    const onCloseModal = () => {
        dispatch(onCloseDelC());
    }

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
    
    const onDelete = async () => {
        
        await delDBClient(values.id)
            .then( () => {
                dispatch(onCloseDelC());
                delCorrectly();
            })
            .catch( () => {
                return toast.error("Ups! Something gone wrong", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
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
            <h1 className='p-2'>Delete Client</h1>
            <hr />
            <div className='mt-3'>
                <label className='form-label fs-3'>Client to delete:</label>
                <select className='form-select' onChange={handleInputChange} name='id' value={values.id}>
                    {
                        customers.map( customer => {
                            return (<option key={customer.id} value={customer.id} style={{color: "#000"}}>{customer.name} - {customer.phone}</option>)
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
