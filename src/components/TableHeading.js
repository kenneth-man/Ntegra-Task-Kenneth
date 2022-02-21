import React, { useContext } from 'react';
import { Context } from '../Context';
import Column from '../components/Column';
import Row from '../components/Row';
import { tableHeadingsData } from '../data/tableHeadingsData';
import { ReactComponent as UpArrowIcon } from '../res/icons/chevron-up.svg';
import { ReactComponent as DownArrowIcon } from '../res/icons/chevron-down.svg';

const TableHeading = ({ data, state, setState }) => {
    const { scrollToTop } = useContext(Context);

    //up arrow button orders ascending, down arrow button orders descending
    const orderResults = isAscending => {
        const stateCopy = [...state];
        const propName = tableHeadingsData.find(heading => heading.text === data.text).prop;

        //sort array based on associated heading property
        const sortedArray = stateCopy.sort((a, b) => {
            if(a[propName] < b[propName] || !b[propName]){
                return -1;
            } else if(a[propName] > b[propName] || !a[propName]){
                return 1;
            }
        });

        isAscending ? setState(sortedArray) : setState(sortedArray.reverse());

        scrollToTop();
    }

    return <>
        <Row extraClasses='hidden md:flex w-1/4 space-x-4 justify-center bg-gray-200/80 fill-spaceX min-h-heading'>
            <Row>
                {data.icon}
                <h2 className='text-spaceX font-light'>{data.text}</h2>
            </Row>

            <Column>
                <button onClick={() => orderResults(true)} className='arrow__btn'>
                    <UpArrowIcon/>
                </button>
                <button onClick={() => orderResults(false)} className='arrow__btn'>
                    <DownArrowIcon/>
                </button>
            </Column>
        </Row>

        <Row extraClasses='flex md:hidden w-1/4 space-x-4 justify-center bg-gray-200/80 fill-spaceX min-h-heading'>
            <Column>
                <button onClick={() => orderResults(true)} className='arrow__btn'>
                    <UpArrowIcon/>
                </button>
                <h2 className='table__heading text-spaceX font-light'>{data.text}</h2>
                <button onClick={() => orderResults(false)} className='arrow__btn'>
                    <DownArrowIcon/>
                </button>
            </Column>
        </Row>
    </>
}

export default TableHeading;