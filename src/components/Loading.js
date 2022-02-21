import React from 'react';
import Row from './Row';
import loadingGif from '../res/images/rocket-white-background.gif';

const Loading = ({ extraClasses }) => {
    return <Row extraClasses='m-auto'>
        <h1 className={extraClasses}>Loading results...</h1>
        <img src={loadingGif} alt='loading-gif' className='ml-4'/>
    </Row>
}

export default Loading;