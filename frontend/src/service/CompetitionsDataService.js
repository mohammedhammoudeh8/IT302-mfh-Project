import axios from "axios";

const API_BASE = process.env.REACT_APP_BACKEND_URL;  
const UCID = process.env.REACT_APP_UCID;             
const RESOURCE = process.env.REACT_APP_RESOURCE;     

const client = axios.create({
  baseURL: `${API_BASE}/api/v1/${UCID}/${RESOURCE}`,
  headers: { "Content-Type": "application/json" },
});

export const getAll = () => client.get("");

export const find = (query, by) =>
  client.get(`?${by}=${encodeURIComponent(query)}`);

export const get = (id) => client.get(`/id/${id}`);

const exported = { getAll, find, get };
export default exported;
