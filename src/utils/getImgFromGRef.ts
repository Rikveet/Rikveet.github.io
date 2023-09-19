import {getDownloadURL, getStorage, ref} from "firebase/storage";

export async function getImgFromGRef(link: string) : Promise<IMG>{
    const storage = getStorage();
    const gsReference = ref(storage, link);
    return await getDownloadURL(gsReference)
        .then((url): IMG => {
            return {src: url};
        })
        .catch((error): IMG => {
            switch (error.code) {
                case 'storage/object-not-found':
                    return {error: "Image not found"}
                case 'storage/unauthorized':
                    return {error: "This image is not public"}
                default:
                    return {error: "Unable to get image"}
            }
        });
}