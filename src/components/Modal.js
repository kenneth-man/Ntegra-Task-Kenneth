import React, { useContext } from 'react';
import { Context } from '../Context';
import Column from './Column';
import RowToColumn from '../components/RowToColumn';
import Loading from './Loading';
import { ReactComponent as CloseIcon } from '../res/icons/chevron-down-large.svg';
import placeholderImage from '../res/images/placeholder.jpg';

const Modal = () => {
    const { setIsModalShown, isModalShown, modalData, formatDate } = useContext(Context);

    //determine colour and text based on if flight success is true, false or null (not flown yet)
    const calcFlightSuccessObj = success => {
        if(success){
            return { color: 'text-green-500', text: 'Success' }
        } else if(success === null){
            return { color: 'text-amber-500', text: 'Pending' }
        } else {
            return { color: 'text-red-500', text: 'Fail' }
        }
    }

    return <div className={`modal fixed flex items-center justify-center w-full h-full bottom-0 left-0 bg-black ${isModalShown ? 'z-10 opacity-100' : '-z-10 opacity-0'}`}>
        {
            modalData ?
            <Column 
                extraClasses='justify-evenly w-full h-full px-6 py-6 sm:px-16 sm:py-0' 
                backgroundImg={modalData.links.flickr.original.length > 0 ? modalData.links.flickr.original[0] : placeholderImage}
            >
                <h1 className='font-black text-white'>
                    <span className='font-thin'>Flight</span> {modalData.name} 
                    &nbsp; &ndash; &nbsp;
                    <span className={calcFlightSuccessObj(modalData.success).color}>
                        {calcFlightSuccessObj(modalData.success).text}
                    </span>
                </h1>
                <p className='text-white text-left'>
                    {`Flight number ${modalData.flight_number}. ${modalData.details ? modalData.details : ''}`}
                </p>
                <RowToColumn>
                    <h2 className='font-bold'>Launch date:&nbsp;</h2> 
                    <h2>{formatDate(modalData.date_utc)}</h2>
                </RowToColumn>
                <RowToColumn>
                    <h2 className='font-bold'>Rocket Id:&nbsp;</h2> 
                    <h2>{modalData.rocket}</h2>
                </RowToColumn>
                <RowToColumn>
                    <h2 className='font-bold'>Launchpad Id:&nbsp;</h2> 
                    <h2>{modalData.launchpad}</h2>
                </RowToColumn>
                <button className='text-white fill-white arrow__btn' onClick={() => setIsModalShown(false)}>
                    <CloseIcon/>
                </button>
            </Column> :
            <Loading extraClasses='text-white'/>
        }
    </div> 
}

export default Modal;