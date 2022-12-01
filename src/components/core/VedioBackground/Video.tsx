import React from 'react';

function VideoBackground(props: { source: string, blur?: boolean }) {
    return (
        <>
            <video muted={true} loop={true} autoPlay={true}
                   style={{position: 'fixed', top: '0', float: 'left', objectFit: 'cover', height: '100vh', width: '100vw', zIndex: "-2"}}>
                {<source src={props.source} type={'video/mp4'}/>}
            </video>
            {props.blur && <div className={'frosted'}
                                style={{
                                    position: 'fixed',
                                    top: '0',
                                    float: 'left',
                                    objectFit: 'cover',
                                    height: '100vh',
                                    width: '100vw',
                                    zIndex: "-1"
                                }}/>}
        </>


    );
}

export default VideoBackground;
