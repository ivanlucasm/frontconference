import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'

class ApiClient {
    service: AxiosInstance

    constructor() {
        const service = axios.create({
            baseURL: process.env.apiUrl,
        })
        service.interceptors.response.use(this.handleSuccess, this.handleError)
        this.service = service
    }

    handleSuccess(response: AxiosResponse) {
        return response
    }

    handleError = (error: AxiosError) => {
        console.log(error)
        return error.response.data
    }

    async get(path: string) {
        const response = await this.service.get(path, { headers: { 'Content-Type': 'application/json' } })
        return response
    }

    async post(path: string, payload: object) {
        console.log('api service post')
        console.log(path)
        console.log(payload)
        const response = await this.service.post(path, payload, { headers: { 'Content-Type': 'application/json' } })
        return response
    }

    async put(path: string, payload: object) {
        console.log('api service put')
        console.log(path)
        console.log(payload)
        const response = await this.service.put(path, payload, { headers: { 'Content-Type': 'application/json' } })
        return response
    }
}

export default new ApiClient()
