import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { customStyles } from '../../helpers';
import { delActiveEvent, onCloseEvent } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export const EventModal = () => {
    
    const dispatch = useDispatch();
    const isOpen = useSelector( state => state.ui.isOpenEvent );
    const activeEvent = useSelector( state => state.calendar.activeEvent );

    const {title, address, customer, end, locality, price, start, phone } = activeEvent;

    const onCloseModal = () => {
        dispatch(onCloseEvent())
        dispatch(delActiveEvent());
    };
    
    const start_date = new Date(start);
    const end_date = new Date(end);

    return (
        <Modal
            isOpen={ isOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className="modal p-3"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <div style={{color: '#000'}}>
                <p className='h2 fw-bold'>Customer Name:</p>
                <h2>-{title}</h2>
                <hr />
                <div style={{color: '#000'}}>
                    <p className='h2 fw-bold'>Address:</p>
                    <h3>-{address}, {locality}</h3>
                </div>
                <br />
                <div style={{color: '#000'}}>
                    <h3 className='fw-bold'>Customer Phone: <p className='fw-normal h3' style={{color:'#000'}}>-{ phone }</p></h3>
                </div>
                <div style={{color: '#000'}}>
                    <p className='h2 fw-bold'>Hours: </p>
                    <h3><span className='fw-bold' style={{color: '#000'}}>-Start hour</span>: {start_date.getHours()}:{start_date.getMinutes() <1 ? "00" : start_date.getMinutes()} {start_date.getHours() < 12 ? "AM" : "PM"}</h3>
                    <h3><span className='fw-bold' style={{color: '#000'}}>-End hour</span>: {end_date.getHours()}:{end_date.getMinutes() <1 ? "00" : end_date.getMinutes()} {end_date.getHours() < 12 ? "AM" : "PM"}</h3>
                </div>
                <p className='h3 mt-3'><span className='fw-bold' style={{color:'#000'}}>Price:</span> ${price}</p>
            </div>
        </Modal>
    )
}
