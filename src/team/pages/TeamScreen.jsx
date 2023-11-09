import { useDispatch, useSelector } from 'react-redux';
import { onOpenAddT, onOpenDelT, onOpenEditT, setActiveTeammate } from '../../store';
import { AddModalTeam, DeleteModalTeam, EditModalTeam } from '..';

const headers = ["Name", "Phone"]


export const TeamScreen = () => {

    const dispatch = useDispatch();
    const { isAddOpenT, isEditOpenT, isDelOpenT } = useSelector( state => state.ui)
    const team = useSelector( state => state.team.members );


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
            <div className='clientTable mt-4'>
                <table style={{ "width": "100%" }} className='table table-striped table-hover table-bordered border-black'>
                    <thead>
                        <tr className="tableNames">
                            {
                                headers.map(header => <th key={header} className='p-2'>{header}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody style={{ "color": "#fff" }}>
                        {
                            team?.map(member => {
                                return (
                                    <tr key={member.id} id={member.id} onClick={onEditOpen} style={{ cursor: 'pointer' }}>
                                        <td className='tableElement p-2'>{member.name}</td>
                                        <td className='tableElement p-2'>{member.phone}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    team.length === 0 &&
                    <div className='d-flex justify-content-center mt-5'>
                        <h1>There is no team</h1>
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
