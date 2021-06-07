import axios from 'axios'
import store from "@/store";
import router from "@/router";
import {SET_ERRORS, SET_AUTH} from '@/store/mutations.type'
const $http = axios.create({
	baseURL: process.env.VUE_APP_BACKEND_URL,
	withCredentials: true,
	headers: {'X-Requested-With': 'XMLHttpRequest'}
})

$http.interceptors.response.use(
	response => response,
	error => {
	  if (error.response.status === 422) {
		store.commit(SET_ERRORS, error.response.data.errors)
		return Promise.reject(error)
	  } else if (error.response.status === 401) {
		store.commit('auth/'+SET_AUTH, null);		
		router.push({ name: "Login" });
	  } else {
		return Promise.reject(error);
	  }
	}
  );

export default $http;