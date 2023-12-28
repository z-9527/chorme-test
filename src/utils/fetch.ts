import { API_URL } from "@/config";

function get(api, data) {
  let str = "";
  for (const [key, value] of Object.entries(data || {})) {
    str += `${key}=${value}&`;
  }
  return fetch(`${API_URL}${api}?${str.slice(0, -1)}`, { method: "GET" }).then(
    (res) => res.json()
  );
}

async function post(api, data) {
  return fetch(`${API_URL}${api}`, {
    method: "POST",
    body: data,
  }).then((res) => res.json());
}

export default {
  get,
  post,
};
