import React from 'react';

const Page = ({ children, extraClasses, backgroundVideo }) => {
    return <div className={`page flex flex-col flex-1 items-center ${extraClasses}`}>
        {
            backgroundVideo &&
            <video 
                src={backgroundVideo} 
                className='fixed w-full h-full top-0 left-0 object-cover brightness-75 z-0'
                autoPlay 
                muted 
                loop 
            />
        }
        {children}     
    </div>
}

export default Page;