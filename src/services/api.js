import axios from 'axios';

//Base URL -> https://sujeitoprogramador.com/

//r-api/?api=filmes(TODOS OS FILMES)

//r-api/?api=filmes/123(ID DO FILME)

const api = axios.create({
    baseURL: 'https://localhost:7080/api/'
})

export default api;