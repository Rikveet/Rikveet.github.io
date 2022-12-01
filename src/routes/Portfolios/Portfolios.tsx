import React, {useContext, useEffect, useState} from 'react';
import {FirebaseContext} from "../../contexts/FirebaseContext";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {UserInfo} from "../../Types";
import Video from "../../components/core/VedioBackground/Video";
import "./Portfolios.sass";
// @ts-ignore
import BackgroundVideo from "../Backgrounds/preview.mp4";
import Hamburger from "../../components/core/Hamburger/Hamburger";
import {CgHomeAlt} from "react-icons/cg";
import {MdManageAccounts, MdReadMore} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {IoMdLogIn} from "react-icons/io";
import Link from "../../components/core/Link/Link";
import {FaGithubSquare} from "react-icons/fa";
import {AiFillLinkedin} from "react-icons/ai";
import {TbSocial} from "react-icons/tb";
import ReactQuill from "react-quill";
import {BiDownArrow, BiUpArrow} from "react-icons/bi";


const UserTab = (props: { userPackage: { user: UserInfo, keyword: string } }) => {
    const {userPackage} = {...props};
    const {user, keyword} = {...userPackage};
    const {displayName, imageUrl, description, social, github, linkedIn} = {...user}
    const [showDesc, setShowDesc] = useState(false);
    const nav = useNavigate();
    return (
        <div className={'user'}>
            <img
                src={imageUrl && imageUrl.length > 0 ? imageUrl : 'https://static.vecteezy.com/system/resources/previews/006/090/662/non_2x/user-icon-or-logo-isolated-sign-symbol-illustration-free-vector.jpg'}/>
            <div className={'userInfo'}>
                <div className={'userName'}>
                    {displayName}
                </div>
                <div className={'links'}>
                    <Link Icon={FaGithubSquare} link={github}/>
                    <Link Icon={AiFillLinkedin} link={linkedIn}/>
                    <Link Icon={TbSocial} link={social}/>
                    <MdReadMore onClick={() => {
                        if (keyword)
                            nav('/portfolios/' + keyword)
                    }} style={{
                        height: '100%',
                        width: "auto",
                        aspectRatio: '1',
                        border: '2px solid white',
                        borderRadius: '10px',
                        cursor: keyword ? 'pointer' : 'default',
                        color: keyword ? 'white' : 'grey'
                    }}/>
                </div>
                {description && description.length > 0 && <BiUpArrow className={'discArrow'} onClick={() => {
                    setShowDesc(true)
                }}/>}
            </div>
            <div className={'description'} style={{display: showDesc ? 'block' : 'none'}}>
                {<BiDownArrow className={'discArrow'} onClick={() => {
                    setShowDesc(false)
                }}/>}
                <ReactQuill className={'displayDesc'} readOnly={true} theme={'bubble'}
                            value={description}/>
            </div>

        </div>
    )
}


function Portfolios() {
    const nav = useNavigate();
    const firebaseApp = useContext(FirebaseContext);
    const auth = getAuth(firebaseApp);
    const firestoreDb = getFirestore(firebaseApp!);
    const [users, setUsers] = useState<{ user: UserInfo, keyword: string }[]>([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        try {
            getDocs(collection(firestoreDb, 'usersUniqueLink')).then((keywordsDoc) => {
                const processedKeywords: { [key: string]: string } = {}
                if (keywordsDoc) {
                    keywordsDoc.forEach((keyword) => {
                        if (keyword.data()) {
                            processedKeywords[keyword.data().uid as unknown as string] = keyword.id
                        }
                    })
                }
                getDocs(collection(firestoreDb, "users")).then((usersCollection) => {
                    if (usersCollection) {
                        const processedUsers: { user: UserInfo, keyword: string }[] = []
                        usersCollection.forEach((userDoc) => {
                            processedUsers.push({user: userDoc.data() as UserInfo, keyword: processedKeywords[userDoc.id]})
                        })
                        processedUsers.sort((userA, userB) => {
                            if (userA.user.displayName >= userB.user.displayName) {
                                return -1
                            } else {
                                return 1
                            }
                        })
                        setUsers(processedUsers)
                    }

                })
                setLoaded(true)
            })

        } catch (e) {
            setLoaded(true)
        }
    }, []);

    return (
        <div className={'mainDisplay'}>

            <Video source={BackgroundVideo}/>
            <div className={'portfolioHeading'}>
                <p>Portfolios</p>
                <Hamburger>
                    <CgHomeAlt onClick={() => {
                        nav('/')
                    }} style={{cursor: 'pointer'}}/>
                    {auth.currentUser?.uid ?
                        <MdManageAccounts onClick={() => {
                            nav('/user')
                        }} style={{cursor: 'pointer'}}/> :
                        <IoMdLogIn onClick={() => {
                            nav('/login')
                        }} style={{cursor: 'pointer'}}/>
                    }
                </Hamburger>
            </div>
            {
                loaded ?
                    users.length > 0 ?
                        <div className={'users'}>
                            {
                                users.map((user, index) => {
                                    return (<UserTab key={index} userPackage={user}/>)
                                })
                            }
                        </div>
                        :
                        <div className={'users'}>

                        </div>
                    :
                    <div className={'loading'}/>
            }
        </div>
    );
}

export default Portfolios;
