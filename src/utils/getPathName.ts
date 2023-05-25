export const getPathName = (path: string) => {
    if (path === '/') {
        return 'home';
    }
    if (path === '/booking') {
        return 'booking restaurant';
    }
    if (path === '/profile') {
        return 'profile';
    }
    return;
};
