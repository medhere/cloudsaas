import axios from "axios"
// import { loadProgressBar } from 'axios-progress-bar'
import useAxios from 'axios-hooks'

// export const REQUEST_URI = `https://${window.location.hostname}:4000/api`
// export const REQUEST_URI = '/api'
export const REQUEST_URI = import.meta.env.MODE === 'development' ? 'https://localhost:8000' : 'https://inretia.com'

// loadProgressBar()

const XHRLog = (setting = false) => {

  // const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
  // axios.interceptors.request.eject(myInterceptor);

  // const requestInterceptor = 
  // const responseInterceptor = 

  if (setting === true) {
    axios.interceptors.request.use(
      (req) => {
        var data = req.method === 'get' ? req.params : req.data
        console.log(`Request method: '${req.method}', to ${req.url}, with data: ${JSON.stringify(data, true)}`)
        return req;
      },
      (err) => { return Promise.reject(err) }
    );

    axios.interceptors.response.use(
      (res) => {
        console.log(`Status: ${res.status}:${res.statusText} - Data: ${JSON.stringify(res.data, true)}`)
        return res;
      },
      (err) => { return Promise.reject(err) }
    );
  }
  else {
    axios.interceptors.request.use(
      (req) => { return req; }, (err) => { return Promise.reject(err) }
    );

    axios.interceptors.response.use(
      (res) => { return res; }, (err) => { return Promise.reject(err) }
    );
  }

}

export const XHR = async (method, url, userdata = null, config = {}, log = false) => {
  XHRLog(log)
  const auth = localStorage.getItem('auth') || null;
  return await axios({
    url, method, timeout: 10000,
    baseURL: REQUEST_URI+'/api',
    headers: { 'Authorization': auth ? `Bearer ${auth}` : undefined, },
    params: method === 'get' ? userdata : undefined,
    data: method !== 'get' ? userdata : undefined,
    withCredentials: true,
    ...config
  })
}


export const useXHR = (method, url, userdata = null, autoStart = false, config = {}, log = false) => {
  //method = get, post, put, patch, delete
  //url = 'http://api'
  //userdata = {}

  XHRLog(log)
  const auth = localStorage.getItem('auth') || null;

  const [{ data, loading, error, response }, execute, manualCancel] = useAxios(
    {
      url, method, timeout: 20000,
      baseURL: REQUEST_URI+'/api',
      headers: { 'Authorization': auth ? `Bearer ${auth}` : undefined, },
      params: method === 'get' ? userdata : undefined,
      data: method !== 'get' ? userdata : undefined,
      withCredentials: true,
      ...config
    },
    { manual: !autoStart, useCache: false, autoCancel: false, ssr: false }
  )

  const send = (data, ...args) => {
    if (userdata !== null) data = { ...userdata, ...data }   //merge userdata and data from start() if there is
    return execute({
      params: method === 'get' ? data : undefined,
      data: method !== 'get' ? data : undefined,
      ...args
    })
  }

  const err = error && {
    msg: error?.message,
    data: error?.response?.data
  }
  const statusCode = response?.status

  return { loading, data, statusCode, err, send, cancel: manualCancel }
  //err returns null or object
  //send({},...).then().catch().finally()
  //loading && 
  //cancel()
}