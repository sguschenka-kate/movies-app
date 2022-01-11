import axios from 'axios';
const baseUrl = 'http://localhost:8000/api/v1';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI0OTcyMjYwfQ.X31cryg_A126WLYT96PD-SLLFWSxb2SeoQZ4cvx3VhU';

async function createMovie(body) {
  await axios.post(`${baseUrl}/movies`, body, {
      headers: {
        'Authorization': `Basic ${token}`
      }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

const fetchService = {
    createMovie,
}

export {
    fetchService
}