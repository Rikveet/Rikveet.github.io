export function getDateFromSeconds(seconds: number) {
    const date = new Date(1970, 0, 1);
    date.setSeconds(seconds);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', "Oct", "Nov", "Dec"];

    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}