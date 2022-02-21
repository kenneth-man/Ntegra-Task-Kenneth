import React, { useContext } from 'react';
import Row from './Row';
import { tableHeadingsData } from '../data/tableHeadingsData';
import { Context } from '../Context';

const TableResult = ({ data }) => {
    const { formatDate, setIsModalShown, setModalData } = useContext(Context);

    const tableResultOnClick = () => {
        setModalData(data);
        setIsModalShown(true);
    }

    return <button 
        className='flex items-center w-full min-h-result border-b-2 border-gray-100 hover:shadow-md hover:bg-gray-100 active:bg-white active:shadow-none'
        onClick={tableResultOnClick}>
        {
            tableHeadingsData.map((curr, index) => 
                <Row key={index} extraClasses='w-1/4 justify-center px-2 lg:px-10'>
                    <h2 className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
                        {
                            curr.prop === 'date_utc' ? 
                            formatDate(data[curr.prop]) : 
                            (
                                !data[curr.prop] ?
                                'N/A':
                                data[curr.prop]
                            )
                        }
                    </h2> 
                </Row>
            )    
        }
    </button>
}

export default TableResult;