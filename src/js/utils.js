export function isAndroidApp() {
    return /Android/i.test(navigator.userAgent);
}

export function isMobile() {
    return (window.innerWidth < 860) ? true : false;
}