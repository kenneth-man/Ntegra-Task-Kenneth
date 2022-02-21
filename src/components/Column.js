import React from 'react';

const Column = ({ children, extraClasses, backgroundImg }) => {
    return <div 
        className={`flex flex-col items-center ${extraClasses}`}
        style={backgroundImg && { backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,1)), url(${backgroundImg})`, backgroundSize: 'cover', backgroundPositionY: '75%'}}
    >
        {children}
    </div>
}

export default Column;