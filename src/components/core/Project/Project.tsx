import React, {useEffect, useState} from 'react';
import {ProjectT} from "../../../Types";
import {GiSave} from "react-icons/gi";
import {RiDeleteBin5Fill} from "react-icons/ri";
import './Project.sass';
import {cleanDesc} from "../helperFunctions";
import {TbEdit} from "react-icons/tb";
import ImageLoader from "../ImageLoader/ImageLoader";
import {BsArrowLeftRight} from "react-icons/bs";
import ReactQuill from "react-quill";

function Project(props: { position: number, project: ProjectT, _updateProjectData: Function, syncProject: { (projectId: number): Promise<boolean> }, deleteProject: Function }) {
    const {position, project, _updateProjectData, syncProject, deleteProject} = {...props}
    //   projectName: string,
    //   projectDesc: string,
    //   position: number,
    //   images: string[],
    //   liveLink?: string,
    //   codeLink?: string
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [images, setImages] = useState<string[]>(['']);
    const [liveLink, setLiveLink] = useState<string>('');
    const [codeLink, setCodeLink] = useState<string>('');
    const [projectDataChanged, setProjectDataChanged] = useState(false);
    const [showImageLoader, setShowImageLoader] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const updateProjectData = (position: number, projectChange: Partial<ProjectT>) => {
        _updateProjectData(position, projectChange);
        setProjectDataChanged(true);
    }
    useEffect(() => {
        project.projectName && setName(project.projectName)
        project.projectDesc && setDesc(project.projectDesc)
        project.images && setImages(project.images)
        project.liveLink && setLiveLink(project.liveLink)
        project.codeLink && setCodeLink(project.codeLink)
    }, [])
    return (
        <div className={'project'}>
      <span className={'icons'}>
        <button className={'icon'} disabled={!projectDataChanged} onClick={async () => {
            const result = await syncProject(position)
            if (result)
                setProjectDataChanged(false);
        }}>
          <GiSave/>
        </button>
        <button className={'icon'} onClick={() => {
            console.log('deleting', position)
            deleteProject(position);
        }}>
          <RiDeleteBin5Fill/>
        </button>
      </span>
            <input
                className={'projectHeading'}
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    updateProjectData(position, {projectName: e.target.value} as ProjectT)
                }}
                placeholder={'Enter Project Name'}
                type={'text'}/>
            <div className={'projectInfo'}>
                {showImageLoader &&
                    <ImageLoader
                        currentImages={images}
                        setImages={(images) => {
                            const updatedImages = images ? images : [];
                            setImages(updatedImages);
                            updateProjectData(position, {images: updatedImages} as ProjectT)
                            setShowImageLoader(false)
                        }}
                        typeImg={'project'}/>}

                <div className={'imageNInputContainer'}>
                    <div className={'imageContainer'}>;
                        {images && images.length > 0 ?
                            <>
                                <div className={'currentImage'}>
                                    <img key={images[currentImageIndex]} src={images[currentImageIndex]}
                                         alt={images[currentImageIndex]}/>
                                </div>
                                <div className={'imageScroll'}>
                                    {
                                        images.map((imageUrl, index) => {
                                            return (
                                                <div className={'image'} key={imageUrl}>
                                                    <img alt={index.toString() + ' image'} src={imageUrl}
                                                         onClick={() => {
                                                             setCurrentImageIndex(index)
                                                         }}
                                                         style={currentImageIndex === index ? {borderColor: "white"} : {}}/>
                                                    {(index !== images.length - 1) &&
                                                        <BsArrowLeftRight className={'swapIcon'} onClick={() => {
                                                            const tempCurrentImg = images[index]
                                                            const newArray = [...images]
                                                            newArray[index] = newArray[index + 1]
                                                            newArray[index + 1] = tempCurrentImg
                                                            setImages(newArray)
                                                            updateProjectData(position, {images: newArray} as ProjectT)
                                                        }}/>}
                                                </div>)
                                        })
                                    }
                                </div>
                            </>

                            :
                            <div className={'noImage'}>No Images added</div>}
                        <TbEdit className={'imageEdit'} onClick={() => {
                            setShowImageLoader(true)
                        }}/>
                    </div>
                    <div className={'projectInputs'}>
                        <div className={'projectInput'}>
                            <label>Live Link</label>
                            <input
                                className={'link'}
                                value={liveLink}
                                onChange={(e) => {
                                    setLiveLink(e.target.value);
                                    updateProjectData(position, {liveLink: e.target.value} as ProjectT)
                                }}
                                placeholder={'Enter Url'}
                                type={'text'}/>
                        </div>
                        <div className={'projectInput'}>
                            <label>Code Link</label>
                            <input
                                name={'link'}
                                value={codeLink}
                                onChange={(e) => {
                                    setCodeLink(e.target.value);
                                    updateProjectData(position, {codeLink: e.target.value} as ProjectT)
                                }}
                                placeholder={'Enter Url'}
                                type={'text'}/>
                        </div>
                    </div>
                </div>
                <ReactQuill theme="snow"
                            value={desc}
                            style={{width:"100%"}}
                            className={'description'}
                            onKeyDown={(event) => {
                                if (!(desc.length <= 999 || event.key === 'Backspace')) {
                                    event.preventDefault();
                                }
                            }}
                            onChange={(value) => {
                                if (value.length > 1000)
                                    return;
                                setDesc(cleanDesc(value));
                                updateProjectData(position, {projectDesc: value} as ProjectT)
                            }}/>
            </div>
        </div>

    );
}

export default Project;
