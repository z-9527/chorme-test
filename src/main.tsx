import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider, App as AntdApp } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "dayjs/locale/zh-cn";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <AntdApp>
      <App />
    </AntdApp>
  </ConfigProvider>
);
