import React, {useEffect, useState} from 'react';
import {RiDeleteBin5Fill} from "react-icons/ri";
import './ImageLoader.sass';
import {FiPlusSquare} from "react-icons/fi";
import {CiEraser} from "react-icons/ci";
import {FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";

async function checkImage(url: string) {
    try{
        const res = await fetch(url);
        const buff = await res.blob();
        return buff.type.startsWith('image/')
    }
    catch (e) {
        return false
    }
}

const ImageDisplay = (props: { index?: number, url: string, deleteImage: Function, changeImage?: Function, isEdgeLeft?: boolean, isEdgeRight?: boolean }) => {
    const {index, url, deleteImage, changeImage, isEdgeLeft, isEdgeRight} = {...props};
    return (
        url && url.length > 0 ?
            <div className={"imageDisplay"}>
                <img key={index} src={url} alt={''}/>
                <RiDeleteBin5Fill className={'deleteImage'} onClick={() => {
                    deleteImage(index);
                }}/>
                {
                    changeImage && index !== undefined
                    &&
                    <>
                        <FaArrowCircleRight className={'imageSelectorArrow'}
                                            style={{right: "5px", background: isEdgeRight ? 'grey' : 'white'}}
                                            onClick={() => {
                                                changeImage(index + 1)
                                            }}/>
                        <FaArrowCircleLeft className={'imageSelectorArrow'} style={{left: "5px", background: isEdgeLeft ? 'grey' : 'white'}}
                                           onClick={() => {
                                               changeImage(index - 1)
                                           }}/>
                    </>
                }
            </div> :
            <></>
    )
}

function ImageLoader(props: {
    setImage?: { (img: string): void },
    setImages?: { (img: string[]): void },
    typeImg: 'user' | 'project',
    currentImages: string[] | string
}) {
    const {setImage, setImages, typeImg, currentImages} = {...props}
    const [fileList, setFileList] = useState<string[] | string>();
    const [tempUrlHolder, setTempUrlHolder] = useState<string>('');
    const [addingUrlImage, setAddingUrlImage] = useState(false);
    const [error, setError] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        return () => {
            if (currentImages) {
                setFileList(currentImages)
            }
        };
    }, []);

    return (
        <div className={'imageSelector'}>
            <div className={'imageContainer'}>
                {fileList ? (
                        typeImg === 'user' ?
                            <ImageDisplay
                                deleteImage={() => {
                                    setFileList('')
                                }}
                                url={fileList as string}/>
                            :
                            <ImageDisplay
                                key={fileList[currentImageIndex] + "_" + currentImageIndex.toString()}
                                url={fileList[currentImageIndex]}
                                index={currentImageIndex}
                                deleteImage={(imgIndex: number) => {
                                    setFileList([...(fileList as string[]).slice(0, imgIndex), ...(fileList as string[]).slice(imgIndex + 1)])
                                }}
                                changeImage={
                                    (newIndex: number) => {
                                        if (newIndex >= 0 && newIndex < fileList.length) {
                                            setCurrentImageIndex(newIndex);
                                        }
                                    }
                                }
                                isEdgeLeft={currentImageIndex === 0}
                                isEdgeRight={currentImageIndex === fileList.length-1}
                            />
                    )
                    :
                    <span className={''}/>
                }
            </div>
            <div className={'urlInput'}>
                <input type={'text'} value={tempUrlHolder} placeholder={error} onChange={(e) => {
                    setTempUrlHolder(e.target.value)
                }}/>
                <div className={'options'}>
                    <FiPlusSquare onClick={async () => {
                        if (!tempUrlHolder) {
                            setError('Url Cannot Be Empty')
                            return;
                        }
                        if (!addingUrlImage) {
                            setAddingUrlImage(true)
                            if (!(await checkImage(tempUrlHolder))) {
                                setTempUrlHolder('')
                                setError('Url is not linked to an image.')
                                setAddingUrlImage(false)
                                return;
                            }
                            if (typeImg === 'user') {
                                setFileList(tempUrlHolder)
                            } else {
                                if (!fileList || (fileList && fileList.indexOf(tempUrlHolder) === -1)) {
                                    if(fileList){
                                        setFileList([tempUrlHolder, ...fileList as string[]])
                                    }
                                    else {
                                        setFileList([tempUrlHolder])
                                    }
                                } else {
                                    setTempUrlHolder('');
                                    setError('Url already in the list');
                                }
                            }
                            setAddingUrlImage(false)
                        }
                    }}/>
                    <CiEraser onClick={() => {
                        setTempUrlHolder('')
                    }}/>
                </div>
            </div>
            <div className={'buttons'}>
                <button onClick={() => {
                    if (setImage) {
                        setImage(fileList as string)
                    } else {
                        if (setImages)
                            setImages(fileList as string[])
                    }
                }}>Close
                </button>
            </div>
            <span className={'displayBlur'}/>
        </div>
    )
}

export default ImageLoader;
