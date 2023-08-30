import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { customStyles } from '../../helpers';
import { delActiveEvent, onCloseEvent } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export const EventModal = () => {
    
    const dispatch = useDispatch();
    const isOpen = useSelector( state => state.ui.isOpenEvent );
    const activeEvent = useSelector( state => state.calendar.activeEvent );
    const { address, customer, end, location, price, start } = activeEvent;

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
            <h1>{customer?.name}</h1>
            <hr />
            <h3>{address}, {location}</h3>
            <h3>Customer Phone: { customer?.phone }</h3>
            <h3>Start hour: {start_date.getHours()}:{start_date.getMinutes() <1 ? "00" : start_date.getMinutes()} {start_date.getHours() < 12 ? "AM" : "PM"}</h3>
            <h3>End hour: {end_date.getHours()}:{end_date.getMinutes() <1 ? "00" : end_date.getMinutes()} {end_date.getHours() < 12 ? "AM" : "PM"}</h3>
            <h3>Price: ${price}</h3>
            <form>
                
            </form>
        </Modal>
    )
}
