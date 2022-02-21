import React, { createContext, useState } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalData, setModalData] = useState(undefined);
    const [homeSelectionUpdated, setHomeSelectionUpdated] = useState(false);
    const pageLimit = 30;

    //fetch data from api
    const fetchApiData = async (setStateOriginal, setStateShown, fetchType) => {
        try {
            setIsLoading(true);

            const response = await fetch(`https://api.spacexdata.com/v4/launches/${fetchType}`);
            const data = await response.json();
            //30 results per page
            const requiresPagination = data.length > pageLimit;
            //api returns single object if only one result, and an array for more than one result
            const moreThanOneResult = data.length > 1;

            if(moreThanOneResult){
                setStateOriginal(data);

                if(requiresPagination){
                    sliceDataShown(data, setStateShown, 1);
                    setIsLoading(false);
                    return;
                }

                setStateShown(data);
            } else {
                setStateOriginal([data]);
                setStateShown([data]);
            }

            setIsLoading(false);
        } catch(error){
            alert(error.message);
            setIsLoading(false);
        }
    }

    //calculate pagination indexes that are used to slice certain sections of original data returned from api
    const calcPaginationIndexes = pageNum => {
        const startElementIndex = pageNum === 1 ? 0 : (pageNum - 1) * pageLimit;
        const endElementIndex = pageNum * pageLimit;

        return { startElementIndex, endElementIndex };
    }

    //slice original data fetched from api, to represent different pages
    const sliceDataShown = (state, setState, pageNum) => {
        const { startElementIndex, endElementIndex } = calcPaginationIndexes(pageNum);
        setState(state.slice(startElementIndex, endElementIndex));
    }

    //format date to make it more readable
    const formatDate = dateString => {
        let twelveHourFormat;
        const hour = Number(dateString.slice(11,13));

        if(hour - 12 === 0){
            twelveHourFormat = '12 pm';
        } else if(hour - 12 === 12){
            twelveHourFormat = '12 am'
        } else if(hour - 12 > 0){
            twelveHourFormat = `${hour - 12} pm`
        } else {
            twelveHourFormat = `${hour} am`
        }
    
        return `${dateString.slice(0,10)}, at ${twelveHourFormat.padStart(5, '0').split(' ').join(`:${dateString.slice(14,16)}`)}`
    };

    //smooth scroll to top
    const scrollToTop = () => {
        document.querySelector('.home__results').scrollTo({
            top: document.querySelector('.home__results'),
            behavior: 'smooth'
        });
    }

    return <Context.Provider value={{ 
            fetchApiData, calcPaginationIndexes, formatDate, setIsLoading, setIsModalShown, setModalData, scrollToTop, sliceDataShown, setHomeSelectionUpdated, 
            isLoading, isModalShown, modalData, homeSelectionUpdated 
        }}>
        {children}
    </Context.Provider>
}

export default ContextProvider;