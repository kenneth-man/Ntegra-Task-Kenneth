import React from 'react'
import Row from './Row';
import { ReactComponent as FrownIcon } from '../res/icons/emoji-sad.svg';

const NoData = () => {
    return <Row extraClasses='m-auto'>
        <h1>No data found...</h1>
        <FrownIcon/>
    </Row>
}

export default NoData;