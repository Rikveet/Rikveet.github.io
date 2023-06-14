import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {FirebaseContext} from "../../contexts/FirebaseContext";
import {ProjectT, UserInfo} from "../../Types";
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";
import Button from "../../components/core/Button/Button";
import {MdManageAccounts, MdOutlineAccountBox} from "react-icons/md";
import "./UserDisplay.sass";
import {FaFileCode, FaGithubSquare, FaGlobe} from "react-icons/fa";
import {TbSocial} from 'react-icons/tb';
import {AiFillLinkedin} from "react-icons/ai";
import {CgHomeAlt} from "react-icons/cg";
import {openInNewTab} from "../../components/core/helperFunctions";
import ReactQuill from "react-quill";
import Hamburger from "../../components/core/Hamburger/Hamburger";
import Link from "../../components/core/Link/Link";
// @ts-ignore
import BackgroundVideo from "../Backgrounds/preview.mp4";
import {TiThListOutline} from "react-icons/ti";
import {IoMdLogIn} from "react-icons/io";
import {getAuth} from "firebase/auth";
import {Galleria} from "primereact/galleria";

function UserDisplay() {
    const {id} = useParams();
    const firebaseApp = useContext(FirebaseContext);
    const firestoreDb = getFirestore(firebaseApp!);
    const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
    const [userProjects, setUserProjects] = useState<ProjectT[] | undefined>(undefined);
    const [loaded, setLoaded] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        try {
            if (id) {
                getDoc(doc(firestoreDb, 'usersUniqueLink', id)).then((keywordDoc) => {
                    const keyword = keywordDoc.data() as { uid: string };
                    if (keyword) {
                        getDoc(doc(firestoreDb, 'users', keyword.uid)).then((userDoc) => {
                            if (userDoc) {
                                setUserInfo(userDoc.data() as UserInfo);
                                getDocs(collection(firestoreDb, "users", keyword.uid, 'projects')).then((projects) => {
                                    if (projects) {
                                        const processedProjects: ProjectT[] = []
                                        projects.forEach((projectDoc) => {
                                            processedProjects.push(projectDoc.data() as ProjectT);
                                            processedProjects.sort((projectA, projectB) => {
                                                return projectA.projectID > projectB.projectID ? 1 : -1
                                            })
                                        })
                                        setUserProjects(processedProjects);
                                    }

                                })
                            }
                            setLoaded(true);
                        });
                    } else {
                        setLoaded(true);
                    }
                });
            }
        } catch (e) {
            setLoaded(true);
        }

    }, []);

    return (
        <div className={'userDisplayContainer'}>
            <div className={'content'}>
                {
                    loaded ?
                        userInfo ?
                            <>
                                <div className={'heading'}>
                                    {userInfo.imageUrl ? <img alt={'userImage'} src={userInfo.imageUrl}/> :
                                        <MdOutlineAccountBox style={{cursor: 'default', width: '100px'}}/>}
                                    <div className={'userName'}>
                                        {userInfo.displayName || id}
                                    </div>
                                    <Hamburger>
                                        <Link Icon={FaGithubSquare} link={userInfo.github} linkText={'Github'}/>
                                        <Link Icon={AiFillLinkedin} link={userInfo.linkedIn} linkText={'Linked-In'}/>
                                        <Link Icon={TbSocial} link={userInfo.social} linkText={'Social'}/>
                                        <CgHomeAlt onClick={() => {
                                            nav('/')
                                        }} style={{cursor: 'pointer'}}/>
                                        <TiThListOutline onClick={() => {
                                            nav('/portfolios')
                                        }} style={{cursor: 'pointer'}}/>
                                        {getAuth(firebaseApp).currentUser?.uid ?
                                            <MdManageAccounts onClick={() => {
                                                nav('/user')
                                            }} style={{cursor: 'pointer'}}/> :
                                            <IoMdLogIn onClick={() => {
                                                nav('/login')
                                            }} style={{cursor: 'pointer'}}/>
                                        }
                                    </Hamburger>
                                </div>
                                <div className={'userInfoContainer'}>

                                    <div className={'userDescription'}>
                                        {userInfo.description ?
                                            <>
                                                <div className={'descHeading'}>
                                                    About
                                                </div>
                                                <div className={'border'}/>
                                                <div className={'descContent'}>
                                                    <ReactQuill className={'displayDesc'} readOnly={true}
                                                                theme={'bubble'}
                                                                value={userInfo.description}/>
                                                </div>
                                            </>
                                            :
                                            <>No Description Added By {userInfo.displayName}</>
                                        }
                                    </div>

                                    {userProjects &&
                                        userProjects.map((project) => {
                                            return (
                                                <div key={project.projectID} className={'project'}>
                                                    <div className={'images'}>
                                                        <Galleria
                                                            value={
                                                                project.images && project.images.length > 0 ?
                                                                    project.images.map((url) => {
                                                                        return ({
                                                                            src: url,
                                                                            alt: project.projectName
                                                                        })
                                                                    }) : [{
                                                                        src: 'https://static.vecteezy.com/system/resources/previews/000/423/006/non_2x/picture-icon-vector-illustration.jpg',
                                                                        alt: project.projectName
                                                                    }]
                                                            }
                                                            style={{
                                                                height: '270px',
                                                                width: '270px'
                                                            }}
                                                            item={
                                                                (item) => {
                                                                    return <div
                                                                        style={{
                                                                            height: '270px',
                                                                            width: '270px',
                                                                            display: 'block',
                                                                        }}
                                                                    >
                                                                        <img
                                                                        style={{
                                                                            height: '100%',
                                                                            width: '100%',
                                                                            objectFit: 'contain'
                                                                        }}
                                                                        src={item.src}
                                                                        alt={item.alt}
                                                                        />
                                                                    </div>
                                                                   ;
                                                                }}
                                                            circular
                                                            showItemNavigators
                                                            transitionInterval={2000}
                                                            showThumbnails={false}/>
                                                    </div>

                                                    <div className={'projectInfo'}>
                                                        <div className={'projectName'}>{project.projectName}</div>
                                                        {
                                                            project.codeLink && project.codeLink.length > 0 &&
                                                            <FaFileCode className={'link'} onClick={() => {
                                                                project.codeLink && openInNewTab(project.codeLink)
                                                            }}/>
                                                        }
                                                        {
                                                            project.liveLink && project.liveLink.length > 0 &&
                                                            <FaGlobe className={'link'} onClick={() => {
                                                                project.liveLink && openInNewTab(project.liveLink)
                                                            }}/>
                                                        }
                                                    </div>
                                                    <ReactQuill className={'displayDesc'} readOnly={true}
                                                                theme={'bubble'}
                                                                value={project.projectDesc.length > 0 ? project.projectDesc : 'No Description' +
                                                                    ' provided'}/>
                                                </div>
                                            );
                                        })
                                    }
                                </div>

                            </> :
                            <div className={'invalidContainer'}>
                                <div className={'invalid'}>
                                    The link "{id}" does not exist.
                                    <Button id="home" text={'Home'} f={{
                                        func: () => {
                                            nav('/')
                                        }
                                    }}/>
                                </div>
                            </div> :
                        <div className={'loading'}/>
                }
            </div>

        </div>
    );
}

export default UserDisplay;
