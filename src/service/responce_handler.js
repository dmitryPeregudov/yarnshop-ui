export function handleResult(responce) {
    if (!responce.ok) {
        if (responce.status === 401 || responce.status === 403) {
            window.location.href = "/login"
        } else {
            throw responce;
        }
    }
    return responce;

}
export function handleSyncResult(responce){
    if (!responce.ok) {
        if (responce.status === 401 || responce.status === 403) {
            window.location.href = "/login"
        }
    }
    return responce;
}