
function getRedirectTo(type,header) {
    let path;
    if (type === 'boss') {
        path = 'boss';
    } else {
        path = 'manito';
    }

    if (!header) {
        path += 'info'
    }
    return path
}

export {
    getRedirectTo,
}