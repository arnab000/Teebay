export const setUserId = (id) => {
    if (id) {
        localStorage.setItem("userId", id)
        
    }
}

export const getLoggedIn = () =>{
    let userId = localStorage.getItem("userId");
    return parseInt(userId);
}

export const unsetUserId = () =>{
    localStorage.setItem("userId", '')
}
