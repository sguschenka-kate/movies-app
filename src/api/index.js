import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api/v1';

function prepareResponse(r) {
  if (!r.data.status) {
    alert(r.data.error.code)
    throw Error(r.data.error.code)
  }

  return r.data
}

async function get(url, query) {
  const r = await axios.get(url, {params: query});
  return prepareResponse(r)
}

async function post(url, body, headers={}) {
  const r = await axios.post(url, body, headers);
  return prepareResponse(r)
}

async function destroy(url) {
  const r = await axios.delete(url);
  return prepareResponse(r)
}

export {
    get, post, destroy
}