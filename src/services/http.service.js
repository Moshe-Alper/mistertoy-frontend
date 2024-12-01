import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
})

console.log('process.env.NODE_ENV:', process.env.NODE_ENV)

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

export const httpService = {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data) // car/
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}

function ajax(endpoint, method = 'GET', data = null) {
    const options = {
        url: `${BASE_URL}${endpoint}`,
        method,
        data,
        params: (method === 'GET') ? data : null
    }

    return axios(options)
        .then(res => res.data)
        .catch(err => {
            
            console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data)
            console.dir(err)

            if (err.response && err.response.status === 401) sessionStorage.clear()
            return Promise.reject(err)
        })
}