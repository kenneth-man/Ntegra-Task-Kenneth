import React from 'react';

const RowToColumn = ({ children, extraClasses }) => {
    return <div className={`flex-col items-center sm:flex sm:flex-row ${extraClasses}`}>
        {children}
    </div>
}

export default RowToColumn;