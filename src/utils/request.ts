import axios, { AxiosResponse } from "axios";
import { message } from "antd";
import { API_URL } from "@/config";

function showError(content: string) {
  return message.open({
    type: "error",
    content: content || "网络异常",
  });
}
function showSuccess(content: boolean | string) {
  const str = typeof content === "string" && content;
  return message.open({
    type: "success",
    content: str || "成功",
  });
}

function httpErrorStatusHandle(response: AxiosResponse) {
  const {
    config: { notifyError },
    status,
    statusText,
    data,
  } = response;
  const result = {
    success: status === 200,
    message: statusText,
    status,
    ...data,
  };
  if (result.success === false && notifyError) {
    showError(typeof notifyError === "boolean" ? result.message : notifyError);
  }
  if (status === 401 || result.code === "NOT_LOGIN") {
    setTimeout(() => {
      const basename =
        document.getElementsByTagName("base")[0]?.getAttribute("href") || "";
      window.location.href = (basename === "/" ? "" : basename) + "/login";
    }, 2000);
  }
  return result;
}



const instance = axios.create({
  getAllData: false,
  notifySuccess: false,
  notifyError: true,
  baseURL: API_URL,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { data, config } = response;
    if (data.success === false) {
      httpErrorStatusHandle(response);
      return Promise.reject(data);
    }
    config.notifySuccess && showSuccess(config.notifySuccess);
    return config.getAllData ? data : data.data;
  },
  function (error) {
    // 对响应错误做点什么
    const { response, config } = error;
    const result = httpErrorStatusHandle(response);
    return Promise.reject(result);
  }
);

export default instance;
