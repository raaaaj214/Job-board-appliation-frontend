export const getMyDetails = async () => {
    const res = await fetch("http://localhost:4000/common/me" , {
        credentials : 'include',
        cache : 'no-cache'
    })
    const data = await res.json()

    return data;
}   