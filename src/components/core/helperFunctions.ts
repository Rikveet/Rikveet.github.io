export function cleanDesc(value: string) {
    if (value.length < 3)
        return value
    let prevChar = value[0];
    let currentChar = value[1];
    let nextChar = value[2]
    for (let i = 2; i < value.length - 1; i++) {
        if (prevChar === currentChar && prevChar === nextChar && prevChar === '\n') {
            value = value.substring(0, i - 1) + value.substring(i, value.length);
        }
        prevChar = currentChar;
        currentChar = value[i]
        nextChar = value[i + 1]
    }
    return value;
}

export function checkUrl(url: string, hostname?:string) {
    try {
        const newUrl = new URL(url);
        return (newUrl.protocol === 'http:' || newUrl.protocol === 'https:') && (!hostname || (hostname && newUrl.hostname===hostname));
    } catch (err) {
        return false;
    }
}

export function lockScroll() {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarCompensation}px`;
}

export function unlockScroll() {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = 'scroll';
    document.body.style.paddingRight = `${scrollBarCompensation}px`;
}

export function openInNewTab(url:string){
    const newWindow = window.open(url, '_blank')
    if (newWindow) newWindow.opener = null
}
