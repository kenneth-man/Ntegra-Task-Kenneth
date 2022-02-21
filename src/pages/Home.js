import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../Context';
import Page from '../components/Page';
import Column from '../components/Column';
import Row from '../components/Row';
import TableHeading from '../components/TableHeading';
import TableResult from '../components/TableResult';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import spaceXLogo from '../res/images/spaceX.jpg';
import backgroundVideo from '../res/images/background.mp4';
import { tableHeadingsData } from '../data/tableHeadingsData';
import { launchData } from '../data/launchData';
import RowToColumn from '../components/RowToColumn';

const Home = () => {
    const { fetchApiData, isLoading, setHomeSelectionUpdated } = useContext(Context);
    //all data fetched for a specific query parameter if total results > 'pageLimit', in context;
    const [homeDataOriginal, setHomeDataOriginal] = useState([]);
    //data currently being shown
    const [homeDataShown, setHomeDataShown] = useState([]);
    //determine which query parameter to fetch for
    const [homeSelection, setHomeSelection] = useState('');

    //fetch data on component render and whenever 'homeSelection' state is updated
    useEffect(() => {
        fetchApiData(setHomeDataOriginal, setHomeDataShown, homeSelection);
        setHomeSelectionUpdated(true);
    }, [homeSelection]);

    return <Page extraClasses='justify-center space-y-4 py-4 px-4 lg:py-10 lg:px-10 xl:px-0' backgroundVideo={backgroundVideo}> 
        <RowToColumn extraClasses='space-y-4 sm:space-y-0 sm:space-x-20'>
            <img src={spaceXLogo} alt='space-x-logo' className='w-48 object-cover'/>
            <h1 className='text-white hidden xl:block'>&ndash; Select the type of data to display &ndash;</h1>
            <select 
                value={homeSelection} 
                onChange={e => setHomeSelection(e.target.value)} 
                className='rounded-3xl py-1 px-2 outline outline-8 focus:outline-spaceX/90 hover:cursor-pointer'
            >
                {
                    launchData.map((curr, index) => 
                        <option 
                            key={index} 
                            value={curr.value} 
                        >
                            {curr.text}
                        </option>
                    )
                } 
            </select>
        </RowToColumn>

        {/* table */}
        <Column extraClasses='bg-white/100 border-8 border-white rounded-table overflow-hidden hover:cursor-pointer w-full h-table xl:w-table'>
            <Row extraClasses='w-full justify-evenly border-b-2 border-white'>
                {
                    tableHeadingsData.map((curr, index) => 
                        <TableHeading 
                            key={index}
                            data={curr}
                            state={homeDataShown}
                            setState={setHomeDataShown}
                        />
                    )
                }
            </Row>

            <Column extraClasses='home__results w-full h-full justify-start overflow-y-auto fill-spaceX'>
                {
                    isLoading ?
                    <Loading/> :
                    (
                        homeDataShown.length > 0 ?
                        homeDataShown.map((curr, index) => 
                            <TableResult
                                key={index}
                                data={curr}
                            />
                        ) :
                        <NoData/>
                    )
                }
                <Pagination 
                    stateOriginal={homeDataOriginal}
                    setStateShown={setHomeDataShown}
                />
            </Column>
        </Column> 
    </Page>
}

export default Home;