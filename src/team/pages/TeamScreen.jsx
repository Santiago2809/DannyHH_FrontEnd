import { useDispatch, useSelector } from 'react-redux';
import { onOpenAddT, onOpenDelT, onOpenEditT, setActiveTeammate } from '../../store';
import { AddModalTeam, DeleteModalTeam, EditModalTeam } from '..';

const headers = ["Name"]


export const TeamScreen = () => {

    const dispatch = useDispatch();
    const { isAddOpenT, isEditOpenT, isDelOpenT } = useSelector( state => state.ui)
    const team = useSelector( state => state.team.members);
    const loading = useSelector( state => state.ui.loadingT );


    const onAddOpen = () => {
        dispatch(onOpenAddT());
    };
    const onDelOpen = () => {
        dispatch(onOpenDelT());
    };
    const onEditOpen = ({target}) => {
        dispatch(setActiveTeammate(target.parentElement.id))
        dispatch(onOpenEditT());
    };


    return (
        <div className='p-4'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <h1>Team Screen</h1>
                <div className='controlBtns'>
                    <button onClick={onAddOpen} className='controlBtn btn btn-success'>
                        Add member
                    </button>
                    <button onClick={onDelOpen} className='controlBtn btn btn-danger'>
                        Delete member
                    </button>
                </div>
            </div>
            <div className='mt-4 table-container'>
                <table style={{ "maxWidth": "100%"}} className='teamTable table table-striped table-hover table-bordered border-black'>
                    <thead>
                        <tr className="tableNames">
                            {
                                headers.map(header => <th key={header} className='p-2'>{header}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody style={{ "color": "#fff" }}>

                        {
                            !loading
                            ?   team.length < 1
                                ?
                                <tr>
                                    <td colSpan={10} className='text-center fw-bold'>No hay miembros de equipo</td>
                                </tr>
                                :
                                team?.map(member => {
                                    return (
                                        <tr key={member.id} id={member.id} onClick={onEditOpen} style={{ cursor: 'pointer' }}>
                                            <td className='tableElement p-2'>{member.name}</td>
                                        </tr>
                                    )
                                })
                            :
                            null            
                        }
                    </tbody>
                </table>
                {
                    loading
                    ?
                        <div className='text-center d-flex justify-content-center flex-column align-items-center mt-5'>
                            <span>Loading clients...</span>
                            <div className="spinner-border m-5 " role="status" style={{width: '65px', height: '65px'}}>
                                <span className="visually-hidden">Loading...</span>
                            </div> 
                        </div>
                    :
                        !team &&
                            <div className='d-flex justify-content-center mt-5'>
                                <h1>No hay clientes</h1>
                            </div>
                }
            </div>
            {
                isAddOpenT && <AddModalTeam />
            }
            {
                isEditOpenT && <EditModalTeam />
            }
            {
                isDelOpenT && <DeleteModalTeam />
            }
        </div>
    )
}
