import axios from 'axios';

// Make a GET-request to the backend route specified by target URI and return the response
export function callBackend(target, param = null) {
  // Include query parameters to request only if they are not null
  return new Promise((resolve, reject) => {
    axios.get(target, param? {params: {'sort': param}} : null).then(result => {
      resolve(result.data)
    })
    .catch(error => {
      resolve({error});
    })
  })
}
