export const userData = {
    getData: () => JSON.parse(localStorage.getItem('user')),
    setData: (data) => localStorage.setItem('user',JSON.stringify(data)),
    clearData: () => localStorage.removeItem('user'),
}