import axios from 'axios'
const $http = axios.create({
	baseURL: process.env.VUE_APP_BACKEND_URL,
	withCredentials: true,
	headers: {'X-Requested-With': 'XMLHttpRequest'}
})

export default $http;