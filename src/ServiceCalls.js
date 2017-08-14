import { host, myapp, mainTopic } from './constants';

const makeHeaders = (headers)=>{
   const finalHeaders = {};
   for(const header of ['Content-Type', 'x-user-token']){
     if(headers[header]) finalHeaders[header] = headers[header];
   }
   finalHeaders['Content-Type'] = headers['Content-Type'] || 'application/json';
   return finalHeaders;
};
const commonFetch = (url, options)=>{
  const headers = makeHeaders(options.headers);
  const request = {
    method: options.method || 'GET',
    headers : headers
  }
  if(options.body) request.body = options.body;
  return fetch(url, request)
  .then((response) =>{
    if(response.ok){
      return response.json();
    }
     return response.json().then((error) => Promise.reject(error));
  }).catch((error)=> error);
};

export const login = ({userName, password}) =>{
  const url = `${host}/users/${myapp}/${userName}/session`;
  return commonFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( { password: password })
  });
};

export const logout = ({userName, token}) => {
  const url = `${host}/users/${myapp}/${userName}/session`;
  return commonFetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-user-token' : token },
  });
}
export const register = ({userName, password}) =>{
  const url = `${host}/users/${myapp}/${userName}`;
  // const url = `${host}/users/${myapp}/${userName}/profile`;
  return commonFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( { password: password })
  });
};

export const updateProfile = ({userName, profile, token}) =>{
  const url = `${host}/users/${myapp}/${userName}/profile`;
  return commonFetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' , 'x-user-token' : token},
    body: JSON.stringify( { toStore: profile })
  });
};

export const getProfile = ({userName, token}) =>{
  const url = `${host}/users/${myapp}/${userName}/profile`;
  return commonFetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' , 'x-user-token' : token}
  });
};
