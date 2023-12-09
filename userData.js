export const userData = {
    getData: () => JSON.parse(sessionStorage.getItem('user')),
    setData: (data) => sessionStorage.setItem('user',JSON.stringify(data)),
    clearData: () => sessionStorage.removeItem('user'),
}
