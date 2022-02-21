import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context } from '../Context';
import Row from './Row';
import { ReactComponent as LeftArrowIcon } from '../res/icons/chevron-left.svg';
import { ReactComponent as RightArrowIcon } from '../res/icons/chevron-right.svg';

const Pagination = ({ stateOriginal, setStateShown }) => {
    const { scrollToTop, calcPaginationIndexes, sliceDataShown, setHomeSelectionUpdated, homeSelectionUpdated } = useContext(Context);
    const [pageNumber, setPageNumber] = useState(1);
    const isInitialRender = useRef(true);

    const calcPageNumber = toNextPage => {
        if(toNextPage){
            const { startElementIndex, endElementIndex } = calcPaginationIndexes(pageNumber + 1);
            const nextIndexResults = stateOriginal.slice(startElementIndex, endElementIndex);
            nextIndexResults.length > 0 && setPageNumber(pageNumber => pageNumber + 1);
        } else {
            pageNumber > 1 && setPageNumber(pageNumber => pageNumber - 1);
        }
    }

    const updatePagination = () => {
        sliceDataShown(stateOriginal, setStateShown, pageNumber);
        scrollToTop();
    }

    //doesn't run on component render
    useEffect(() => isInitialRender.current ? isInitialRender.current = false : updatePagination(), [pageNumber]);

    //if 'homeSelection' in home is updated, reset page number to 1
    useEffect(() => {
        if(homeSelectionUpdated){
            setPageNumber(1);
            setHomeSelectionUpdated(false);
        }
    }, [homeSelectionUpdated])

    return <Row extraClasses='w-full justify-between px-4 sm:px-14 min-h-pagination mt-auto'>
        <button className='arrow__btn' onClick={() => calcPageNumber(false)}>
            <Row>
                <LeftArrowIcon/>
                <h2 className='text-spaceX'>Prev</h2>
            </Row>
        </button>

        <h2 className='font-normal text-spaceX'>Page {pageNumber}</h2>

        <button className='arrow__btn' onClick={() => calcPageNumber(true)}>
            <Row>
                <h2 className='text-spaceX'>Next</h2>
                <RightArrowIcon/>
            </Row>
        </button>
    </Row>
  
}

export default Pagination;