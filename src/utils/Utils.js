export const onLogon = async (logonResponse) => {
    localStorage.setItem('token', logonResponse.accessToken);
    localStorage.setItem('tokenType', logonResponse.tokenType);
    localStorage.setItem('user', JSON.stringify({
        id: logonResponse.id,
        name: logonResponse.name,
        username: logonResponse.username,
        email: logonResponse.email,
        roles: logonResponse.roles
    }));
    
    return logonResponse;
}

export const doLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('user');
}

export const isLoggedIn = async () => {
    if(!localStorage.getItem('user')) {
        return false;
    }
    
    const accessToken = localStorage.getItem('token');
    if(!accessToken) {
        return false;
    }

    return true;
}
