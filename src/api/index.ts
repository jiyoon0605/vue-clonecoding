import axios from 'axios';

const client = axios.create({
                                baseURL: 'http://localhost:8180/safety'
                            })

export default client;