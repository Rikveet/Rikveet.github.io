import React, {ReactNode, useState} from 'react';
import "./Hamburger.sass";
import {MdMenuOpen} from "react-icons/md";
import {AiFillCloseCircle} from "react-icons/ai";
import {lockScroll, unlockScroll} from "../helperFunctions";

function Hamburger(props: { children: ReactNode }) {
    const [toggled, setToggled] = useState(false);

    return (
        <div className={'nav'} onScroll={() => {
        }}>
            {
                !toggled && <MdMenuOpen className={'menuToggle headingIcon'} onClick={() => {
                    setToggled(true)
                    lockScroll()
                }}/>
            }
            <div className={'options ' + (toggled ? 'frosted' : '')} style={
                toggled ?
                    {
                        display: "flex",
                        flexDirection: 'column',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        margin: "auto",
                        padding: '10vh 0 0',
                        height: '100vh',
                        minHeight: 'fit-content',
                        width: '100%',
                        justifyContent: "start",
                        alignItems: 'center',
                        background: 'rgba(0, 0, 0, 0.70)',
                        zIndex: '5',
                        borderRadius: 0
                    } : {}}>
                {
                    <>
                        {
                            toggled && <AiFillCloseCircle className={'menuToggle'} onClick={() => {
                                setToggled(false)
                                unlockScroll()
                            }} style={toggled ? {display: 'block', position: "absolute", top: '20px', right: '20px'} : {}}/>
                        }
                        {props.children}
                    </>
                }
            </div>
        </div>
    );
}

export default Hamburger;
