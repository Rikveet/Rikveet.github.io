import {IconType} from "react-icons";
import {openInNewTab} from "../helperFunctions";
import React from "react";

export default function Link(props: { Icon: IconType, link: string , linkText?: string}){
    const {Icon, link, linkText} = {...props}
    return (
        <>
            <Icon
                style={link ? {color: "white", cursor: "pointer"} : {color: "grey"}}
                onClick={() => {
                    link && link.length > 0 && openInNewTab(link)
                }}
            />

        </>


    )
}
