import request from "../utils/request";
import fetchRequest from "../utils/fetch";

export function saveItemTaskRecord(params: any, options?: any) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(params)) {
    fd.append(key, value);
  }
  return request.post("/api/grab/item/saveItemTaskRecord", fd, options);
}

export function saveItemTaskRecordFetch(params: any, options?: any) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(params)) {
    fd.append(key, value);
  }
  return fetchRequest.post("/api/grab/item/saveItemTaskRecord", fd);
}

export function pullTaskList(params?: any) {
  return fetchRequest.get("/api/grab/item/pullTaskList", params);
}
