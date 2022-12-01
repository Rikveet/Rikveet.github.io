import React, {MouseEventHandler, useContext} from 'react';
import './Home.sass';
import {RiFileList3Fill, RiUserSettingsLine} from "react-icons/ri";
import {IoMdLogIn} from "react-icons/io";
import {VscPersonAdd} from "react-icons/vsc";
import {useNavigate} from "react-router-dom";
import {FirebaseContext} from "../../contexts/FirebaseContext";
import {getAuth} from "firebase/auth";
import {AiOutlineLogout} from "react-icons/ai";
import Video from "../../components/core/VedioBackground/Video";
// @ts-ignore
import BackgroundVideo from "../Backgrounds/home.mp4";
import {IconType} from "react-icons";

const MenuButton = (props: { Icon: IconType, url: string, value: string, onClick?: MouseEventHandler<HTMLDivElement> }) => {
    const navigate = useNavigate();
    const {Icon, url, value, onClick} = {...props};
    return (
        <div id={'btn'} onClick={onClick ? onClick : () => {
            navigate(url)
        }}>
            <Icon id={'btnIcon'}/>
            <div>
                {value}
                <span id={'expansion'}/>
            </div>
        </div>
    )
}

function Home() {
    const navigate = useNavigate();
    const firebaseApp = useContext(FirebaseContext);
    return (
        <div className={'mainDisplay'}>
            <Video source={BackgroundVideo}/>
            <div className={'homePageOptionsContainer'}>
                <div id={'cardContainer'}>
                    <div id={'card'}>
                        <div id={'heading'}>
                            {'portfolio share'.split('').map((value, index) => {
                                return (<span key={index}>{value}</span>)
                            })}
                        </div>
                        <div id={'menu'}>
                            <MenuButton Icon={RiFileList3Fill} url={'portfolios'} value={'Browse Portfolio'}/>
                            {getAuth(firebaseApp).currentUser?.uid ?
                                <>
                                    <MenuButton Icon={RiUserSettingsLine} url={'user'} value={'User Settings'}/>
                                    <MenuButton Icon={AiOutlineLogout} url={'portfolios'} value={'Log Out'}
                                                onClick={() => {
                                                    getAuth(firebaseApp).signOut()
                                                }}/>
                                </> :
                                <>
                                    <MenuButton Icon={VscPersonAdd} url={'signup'} value={'Sign Up'}/>
                                    <MenuButton Icon={IoMdLogIn} url={'login'} value={'Login'}/>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
