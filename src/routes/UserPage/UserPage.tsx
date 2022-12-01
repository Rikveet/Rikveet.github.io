import React, {useContext, useEffect, useRef, useState} from 'react';
import {FirebaseContext} from "../../contexts/FirebaseContext";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import {EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {RiAccountBoxLine} from "react-icons/ri";
import {TbEdit} from "react-icons/tb";
import {GiSave} from "react-icons/gi";
import {GoDiffAdded} from "react-icons/go";
import {passwordValidation, ProjectT, UserInfo} from "../../Types";
import EmailVerify from "../../components/core/EmailVerify/EmailVerify";
import Project from "../../components/core/Project/Project";
import Button from "../../components/core/Button/Button";
import './UserPage.sass';
import ImageLoader from "../../components/core/ImageLoader/ImageLoader";
import {checkUrl} from "../../components/core/helperFunctions";
import Hamburger from "../../components/core/Hamburger/Hamburger";
import Video from "../../components/core/VedioBackground/Video";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import BackgroundVideo from "../Backgrounds/userSettings.mp4";

const DeleteUserConfirm = (props: { setError: Function, close: Function, deleteUser: Function }) => {
    const [_password, setPassword] = useState('');
    const {setError, close, deleteUser} = {...props}
    const user = getAuth(useContext(FirebaseContext)).currentUser;
    const nav = useNavigate()
    return (
        <div className={'overlay'}>
            <div className={'overlayMessage'}>Please confirm you want to delete the account by entering your password</div>
            <input name={'password'} type={'password'} placeholder={'Enter password'} onChange={(e) => {
                setPassword(e.target.value)
            }}/>
            <div className={'buttons'}>
                <button id="delete" disabled={_password === ''} onClick={async () => {
                    try {
                        if (user && user.email) {
                            const credential = await EmailAuthProvider.credential(
                                user.email,
                                _password
                            )
                            const re_user = await reauthenticateWithCredential(user, credential)
                            if (re_user.user && re_user.user.uid != null) {
                                deleteUser().then(() => {
                                    nav('/')
                                })
                            }
                        }
                        close()
                    } catch (e) {
                        setError('Incorrect password')
                    }
                }}>
                    Delete
                </button>
                <button onClick={() => {
                    close()
                }}>
                    Close
                </button>
            </div>
        </div>
    )
}

const ChangePassword = (props: { setError: Function, close: Function }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const {setError, close} = {...props}
    const user = getAuth(useContext(FirebaseContext)).currentUser;
    if (!user) {
        close()
        return <></>
    }

    return (
        <div className={'overlay'}>
            <div className={'overlayMessage'}>Please enter your current password, and the new password</div>
            <input name={'oldPassword'} type={'password'} placeholder={'Enter Current Password'} onChange={(e) => {
                setOldPassword(e.target.value)
            }}/>
            <input name={'newPassword'} type={'text'} placeholder={'Enter New Password'} onChange={(e) => {
                setNewPassword(e.target.value)
            }}/>
            <input name={'confirmNewPassword'} type={'text'} placeholder={'Confirm New Password'} onChange={(e) => {
                setConfirmNewPassword(e.target.value)
            }}/>
            <div className={'buttons'}>
                <button id="Change"
                        disabled={oldPassword === '' || newPassword === '' || confirmNewPassword === '' || newPassword !== confirmNewPassword || oldPassword === newPassword}
                        onClick={async () => {
                            const passwordValid = passwordValidation(newPassword);
                            try {
                                if (passwordValid.result) {
                                    const credential = await EmailAuthProvider.credential(
                                        user!.email!,
                                        oldPassword
                                    )
                                    const re_user = await reauthenticateWithCredential(user, credential)
                                    if (re_user.user && re_user.user.uid != null) {
                                        await updatePassword(re_user.user, newPassword);
                                        close()
                                    }
                                } else {
                                    setError(passwordValid.desc.join(", "));
                                }
                            } catch (e) {
                                setError('Incorrect password');
                            }
                        }}>
                    Change Password
                </button>
                <button onClick={() => {
                    close()
                }}>
                    Close
                </button>
            </div>


        </div>
    )
}

const UserInfoTab = (props: {
    label: string,
    value: string,
    isTextArea?: boolean,
    placeHolderText: string,
    onEdit?: { (v: string): void }
}) => {
    const {label, value, isTextArea, placeHolderText, onEdit} = {...props}
    return (
        <div className={'userInfoItem'} style={isTextArea ? {flexDirection: "column"} : {}}>
            <div className={'label'} style={isTextArea ? {textDecoration: 'underline white'} : {}}>{label}</div>
            <span className={'border'}/>
            {isTextArea ?
                <textarea
                    value={value}
                    placeholder={placeHolderText}
                    onChange={(e) => {
                        onEdit && onEdit(e.target.value);
                    }}
                /> :
                <input
                    value={value}
                    placeholder={placeHolderText}
                    onChange={(e) => {
                        onEdit && onEdit(e.target.value);
                    }}/>
            }

        </div>
    )
}

function UserPage() {
    const nav = useNavigate();
    const firebaseApp = useContext(FirebaseContext);
    const auth = getAuth(firebaseApp);
    const firestoreDb = getFirestore(firebaseApp!);
    const initialReadDone = useRef(false);

    const [showUserImageLoader, setShowUserImageLoader] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({
        description: "",
        displayName: "",
        github: "",
        imageUrl: "",
        linkedIn: "",
        social: "",
        timestamp: serverTimestamp()
    });
    const [serverStoredUserInfo, setServerStoredUserInfo] = useState<UserInfo>({} as UserInfo)
    const [userSyncSuccess, _setUserSyncSuccess] = useState(false);
    const [keyword, _setKeyword] = useState('');
    const [serverKeyword, setServerKeyword] = useState('');
    const [keywordChanged, setKeywordChanged] = useState(false);
    const setKeyword = (val: string) => {
        _setKeyword(val);
        if (val !== serverKeyword)
            setKeywordChanged(true);
        else
            setKeywordChanged(false);
    }
    const userSyncSucceded = () => {
        setUserDataChanged(false);
        _setUserSyncSuccess(true)
        setKeywordChanged(false)
        setTimeout(() => {
            _setUserSyncSuccess(false)
        }, 5000);
    }

    const [userDataChanged, setUserDataChanged] = useState(false);
    const [readingUserData, setReadingUserData] = useState(false);
    const [writingUserData, setWritingUserData] = useState(false);
    const [deleteAccountRequested, setDeleteAccountRequested] = useState(false);
    const [changePasswordRequested, setChangePasswordRequested] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const readUser = async () => {
        if (!readingUserData) {
            setReadingUserData(true);
            try {
                const userDoc = (await getDoc(doc(firestoreDb, 'users', auth.currentUser!.uid))).data() as unknown as UserInfo;
                if (userDoc) {
                    setUserInfo(userDoc);
                    setServerStoredUserInfo(userDoc);
                }
                const currentDocQuery = await query(collection(getFirestore(firebaseApp!), 'usersUniqueLink'), where('uid', '==', auth.currentUser!.uid))
                const keywordDocs = await getDocs(currentDocQuery)
                if (!keywordDocs.empty) {
                    keywordDocs.forEach(keywordDoc => {
                        _setKeyword(keywordDoc.id);
                        setServerKeyword(keywordDoc.id);
                        return;
                    })
                }
            } catch (e) {
                if (auth.currentUser?.emailVerified) {
                    setError('Application could not read the user data.');
                }
            }
            setReadingUserData(false);
        }
    }
    const updateUserData = (userUpdateInfo: Partial<UserInfo>) => {
        (Object.keys(userUpdateInfo) as (keyof typeof userUpdateInfo)[]).forEach((key, index) => {
            if (serverStoredUserInfo[key] !== userUpdateInfo[key])
                setUserDataChanged(true)
            else
                setUserDataChanged(false)
        });
        setUserInfo({...userInfo, ...userUpdateInfo, timestamp: serverTimestamp()} as UserInfo);
    }
    const syncUserData = async () => {
        if (userInfo.displayName.length < 4 || userInfo.displayName.length > 20) {
            setError("Display name's size must between 4 and 20 characters");
        } else if (userInfo.description.length > 500) {
            setError("Description's size must between 10 and 500 characters");
        } else if (userInfo.linkedIn.length > 0 && !checkUrl(userInfo.linkedIn, "www.linkedin.com")) {
            setError("Linked-In URL is not valid");
        } else if (userInfo.github.length > 0 && !checkUrl(userInfo.github, "github.com")) {
            setError("Github URL is not valid");
        } else if (userInfo.social.length > 0 && !checkUrl(userInfo.social)) {
            setError('Social URL is not valid')
        } else {
            if (!writingUserData) {
                setWritingUserData(true);
                const UserDoc = (await getDoc(doc(firestoreDb, 'users', auth.currentUser!.uid))).data();
                try {
                    if (userDataChanged) {
                        if (UserDoc) {
                            try {
                                await updateDoc(doc(firestoreDb, 'users', auth.currentUser!.uid), userInfo)
                            } catch (e) {
                                throw new Error('User Data can only be updated every 60 seconds.');
                            }
                        } else {
                            try {
                                await setDoc(doc(getFirestore(firebaseApp!), 'users', auth.currentUser!.uid), userInfo)

                            } catch (e) {
                                throw new Error('Server refused User creation request.');
                            }
                        }
                    }
                    if ((keywordChanged && await syncKeyword()) || !keywordChanged) {
                        userSyncSucceded();
                        setServerStoredUserInfo(userInfo);
                    }
                } catch (e) {
                    if (e instanceof Error) {
                        setError(e.message);
                    }
                }
                setWritingUserData(false);
            }
        }
    }
    const syncKeyword = async () => {
        if (keyword.length > 10) {
            setError("Unique urls cannot be greater than 10")
            return false;
        }
        if (keywordChanged) {
            try {
                if (keyword.length > 0) {
                    await setDoc(doc(getFirestore(firebaseApp!), 'usersUniqueLink', keyword), {uid: auth.currentUser!.uid});
                }
                await deleteKeyword(keyword);
                setServerKeyword(keyword);
                return true;
            } catch (e) {
                console.log(e)
                setError('Keyword already exists')
                _setKeyword(serverKeyword);
                return false;
            }
        }
    }
    const deleteKeyword = async (exclude?: string) => {
        try {
            const currentDocQuery = await query(collection(getFirestore(firebaseApp!), 'usersUniqueLink'), where('uid', '==', auth.currentUser!.uid))
            const currentDoc = await getDocs(currentDocQuery)
            if (!currentDoc.empty) {
                currentDoc.forEach(serverKeyword => {
                    if (!exclude || exclude !== serverKeyword.id)
                        deleteDoc(doc(getFirestore(firebaseApp!), 'usersUniqueLink', serverKeyword.id))
                })
            }
            if (!exclude) {
                _setKeyword('')
                setServerKeyword('')
            }
        } catch (e) {
            console.log(e)
            setError('Was not able to delete the old keywords')
        }
    }
    const deleteUser = async () => {
        if (!writingUserData) {
            setWritingUserData(true);
            try {
                await deleteKeyword()
                for (const key in projects) {
                    await deleteDoc(doc(firestoreDb, 'users', auth.currentUser!.uid, 'projects', key));
                }
                await deleteDoc(doc(firestoreDb, 'users', auth.currentUser!.uid))
                await auth.currentUser!.delete()
            } catch (e) {
                setError('Was not able to complete the delete request.')
            }
            setWritingUserData(false);
        }
    }

    const [projects, setProjects] = useState<ProjectT[]>();
    const [readingUserProjects, setReadingUserProjects] = useState(false);
    const [writingUserProjects, setWritingUserProjects] = useState(false);
    const readProjects = async () => {
        if (!readingUserProjects) {
            setReadingUserProjects(true);
            try {
                const rawProjects = await getDocs(collection(firestoreDb, "users", auth.currentUser!.uid, 'projects'));
                const processedProjects: ProjectT[] = []
                rawProjects.forEach((projectDoc) => {
                    processedProjects.push(projectDoc.data() as ProjectT);
                    processedProjects.sort((projectA, projectB) => {
                        return projectA.projectID > projectB.projectID ? 1 : -1
                    })
                })
                setProjects(processedProjects);
            } catch (e) {
                setError('Unable to read user projects.')
            }
            setReadingUserProjects(false);
        }
    }
    const addProject = async (project: ProjectT) => {
        if (projects) {
            if (error.length === 0) {
                setProjects([...projects, project])
            }
        } else
            setProjects([project])
    }
    const updateProjectData = async (projectID: number, projectChange: Partial<ProjectT>) => {
        const clone = [...projects!]
        clone[projectID] = {...clone[projectID], ...projectChange, timestamp: serverTimestamp()} as ProjectT
        setProjects(clone)
        //setProjects([{...projectChange, timestamp: serverTimestamp()} as ProjectT]);
    }
    const syncProject = async (position: number): Promise<boolean> => {
        console.log(projects && projects[position])
        if (!writingUserProjects && projects) {
            let projectNameDuplicateFlag = false;
            projects.forEach((project, index) => {
                if (index !== position && project.projectName === projects[position].projectName) {
                    setError('Project names should be unique.')
                    projectNameDuplicateFlag = true;
                }
            })
            if (projectNameDuplicateFlag) {
                return false
            }
            if (projects[position].projectName.length < 4) {
                setError("Project name's size must between 4 and 30 characters");
            } else if ((projects[position].liveLink === undefined || projects[position].liveLink !== '') && !checkUrl(projects[position].liveLink!)) {
                setError('Link to live code is invalid');
            } else if ((projects[position].codeLink === undefined || projects[position].codeLink !== '') && !checkUrl(projects[position].codeLink!)) {
                console.log(projects[position].codeLink === undefined, projects[position].codeLink !== '', !checkUrl(projects[position].codeLink!))
                setError('Link to source code is invalid');
            } else {
                setWritingUserProjects(true);
                const firestoreDocId = projects[position].projectID.toString()
                const firestoreProjectData = (await getDoc(doc(firestoreDb, 'users', auth.currentUser!.uid, 'projects', firestoreDocId))).data();
                console.log(firestoreProjectData)
                if (firestoreProjectData) {
                    try {
                        await updateDoc(doc(firestoreDb, 'users', auth.currentUser!.uid, 'projects', firestoreDocId), projects[position])
                    } catch (e) {
                        setError('You can only update your projects every 1 minute.')
                        setWritingUserProjects(false);
                        return false
                    }
                } else {
                    try {
                        await setDoc(doc(firestoreDb, 'users', auth.currentUser!.uid, 'projects', firestoreDocId), projects[position])
                    } catch (e) {
                        setError('Server refused to store the project.');
                        setWritingUserProjects(false);
                        return false
                    }
                }
                setWritingUserProjects(false);
            }
        }
        return true
    }
    const deleteProject = async (position: number) => {
        const projectID = projects![position].projectID.toString()
        if (!writingUserProjects) {
            setWritingUserProjects(true);
            const firestoreProjectData = (await getDoc(doc(firestoreDb, 'users', auth.currentUser!.uid, 'projects', projectID))).data();
            try {
                if (firestoreProjectData) {
                    await deleteDoc(doc(firestoreDb, 'users', auth.currentUser!.uid, 'projects', projectID))
                }
                const clone = [...projects!];
                clone.splice(position, 1)
                setProjects(clone);
            } catch (e) {
                setError('Server refused to delete the project.')
            }
            setWritingUserProjects(false);
        }
    }

    const [error, setError] = useState('');

    useEffect(() => {
        if (!(auth.currentUser && auth.currentUser.uid)) {
            nav('/login');
        } else {
            if (!initialReadDone.current) {
                readUser().then(() => {
                    readProjects().then(() => {
                        initialReadDone.current = true;
                        setLoaded(true)
                    })
                })
            }
        }
    }, [])


    return (
        <div className={'mainDisplay'}>
            <Video source={BackgroundVideo} blur={true}/>
            {
                loaded ?
                    !(auth.currentUser && auth.currentUser.uid) ?
                        <div className={'heading'}> User not logged in redirecting to login.</div> :
                        <>
                            {showUserImageLoader &&
                                <ImageLoader
                                    typeImg={'user'}
                                    setImage={(userImage) => {
                                        if (userImage) {
                                            updateUserData({imageUrl: userImage})
                                        }
                                        setShowUserImageLoader(false)
                                    }}
                                    currentImages={userInfo && userInfo.imageUrl ? userInfo.imageUrl : undefined}/>
                            }
                            {
                                !(auth && auth.currentUser?.emailVerified) ?
                                    <EmailVerify/>
                                    :
                                    <div className={'userPageContainer'}>
                                        <div className={'container'}>
                                            <div className={'heading'} style={{zIndex: 2}}>
                                                USER
                                                <Hamburger>
                                                    <Button id={'portfolios'} text={'Browse Portfolios'} f={{
                                                        func: () => {
                                                            nav('/portfolios')
                                                        }
                                                    }}/>
                                                    <Button id={'preview'} text={'Preview Portfolio'} f={{
                                                        func: () => {
                                                            if (serverKeyword.length > 0) {
                                                                nav('/portfolios/' + serverKeyword)
                                                            } else {
                                                                setError('Seems like the Unique Link is not setup.')
                                                            }
                                                        }
                                                    }}/>
                                                    <Button id={'home'} text={'Home'} f={{
                                                        func: () => {
                                                            nav('/')
                                                        }
                                                    }}/>
                                                    <Button id={'browse'} text={'Logout'} f={{
                                                        func: () => {
                                                            auth.signOut().then(() => {
                                                                nav('/')
                                                            });
                                                        }
                                                    }}/>
                                                    <Button id={'changePassword'} text={'Change Password'} f={{
                                                        func: () => {
                                                            setChangePasswordRequested(true);
                                                        }
                                                    }}/>
                                                    <Button id={'deleteUser'} text={'Delete User'} f={{
                                                        func: () => {
                                                            setDeleteAccountRequested(true)
                                                        }
                                                    }}
                                                    />
                                                </Hamburger>
                                            </div>
                                            <div className={'userInfoContainer'}>
                                                <div className={'userImage'}>
                                                    {userInfo && userInfo.imageUrl ? <img alt={'img'} src={userInfo!.imageUrl}/> :
                                                        <RiAccountBoxLine/>}
                                                    <TbEdit className={'imageEdit'} onClick={() => {
                                                        setShowUserImageLoader(true)
                                                    }}/>
                                                </div>
                                                <div className={'userInfo'}>
                                                    <div className={'userSection'}>
                                                        <UserInfoTab label={'User Name'}
                                                                     value={userInfo.displayName}
                                                                     placeHolderText={'Enter User Name'}
                                                                     onEdit={(value) => {
                                                                         if (value.length > 20)
                                                                             return
                                                                         updateUserData({displayName: value});
                                                                     }}/>
                                                        <UserInfoTab label={'Unique Link Extension'}
                                                                     value={keyword}
                                                                     placeHolderText={'Enter keyword'}
                                                                     onEdit={(value) => {
                                                                         if (value.length > 10)
                                                                             return
                                                                         value = value.replace(/[^a-zA-Z]+/g, '').toLowerCase()
                                                                         setKeyword(value)
                                                                     }}/>
                                                    </div>
                                                    <div className={'userSection'}>
                                                        <UserInfoTab label={'Social Link'}
                                                                     value={userInfo.social}
                                                                     placeHolderText={'Enter Url'}
                                                                     onEdit={(value) => {
                                                                         if (value.length > 200)
                                                                             return
                                                                         updateUserData({social: value})
                                                                     }}/>
                                                        <UserInfoTab label={'Github'}
                                                                     value={userInfo.github}
                                                                     placeHolderText={'Enter Url'}
                                                                     onEdit={(value) => {
                                                                         if (value.length > 200)
                                                                             return
                                                                         updateUserData({github: value})
                                                                     }}/>
                                                        <UserInfoTab label={'Linked-In'}
                                                                     value={userInfo.linkedIn}
                                                                     placeHolderText={'Enter Url'}
                                                                     onEdit={(value) => {
                                                                         if (value.length > 200)
                                                                             return
                                                                         updateUserData({linkedIn: value})
                                                                     }}/>
                                                    </div>
                                                    <ReactQuill theme="snow"
                                                                value={userInfo.description}
                                                                className={'description'}
                                                                onKeyDown={(event) => {
                                                                    if (!(userInfo.description.length <= 499 || event.key === 'Backspace')) {
                                                                        event.preventDefault();
                                                                    }
                                                                }}
                                                                onChange={(value) => {
                                                                    if (value.length <= 500)
                                                                        updateUserData({description: value});
                                                                }}/>
                                                    <span className={'userInfoBackground'}/>
                                                    <button disabled={!userDataChanged && !keywordChanged}
                                                            className={'saveIcon' + (userSyncSuccess ? ' success' : "")}
                                                            onClick={async () => {
                                                                await syncUserData()
                                                            }}>
                                                        <GiSave/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'container'}>
                                            <div className={'heading'}>
                                                Projects
                                                <span className={'headingBottomBorder'}/>
                                                <span className={'headingIcon projectsIcon'}>
                                                <GoDiffAdded onClick={async () => {
                                                    await addProject({
                                                        projectID: (new Date()).getTime(),
                                                        codeLink: "",
                                                        images: [],
                                                        liveLink: "",
                                                        projectDesc: "",
                                                        projectName: "",
                                                        timestamp: serverTimestamp()
                                                    })
                                                }}/>
                                              </span>
                                            </div>
                                            {
                                                projects && projects.map((project, index) => {
                                                    return <Project key={project.projectID}
                                                                    position={index}
                                                                    project={project}
                                                                    _updateProjectData={updateProjectData}
                                                                    syncProject={syncProject}
                                                                    deleteProject={deleteProject}/>
                                                })
                                            }
                                        </div>
                                    </div>
                            }
                        </> :
                    <div className={'loading'}/>
            }
            <div className={'overlay'} style={error.length > 0 ? {opacity: 1, zIndex: 10} : {opacity: 0, zIndex: -10}}>
                <div className={'overlayMessage'}>{error}</div>
                <button onClick={() => {
                    setError('')
                }}>
                    OK
                </button>
            </div>
            {deleteAccountRequested && <DeleteUserConfirm setError={setError} close={() => {
                setDeleteAccountRequested(false)
            }} deleteUser={deleteUser}/>}
            {
                changePasswordRequested &&
                <ChangePassword close={() => {
                    setChangePasswordRequested(false)
                }} setError={setError}/>
            }
        </div>
    );
}

export default UserPage;
