import { Button, Space } from "antd";
import { useState } from "react";
import { DownloadOutlined, CameraOutlined } from "@ant-design/icons";
import "./app.less";

export default function App() {
  const [img, setImg] = useState<string>();

  async function onScreenshot() {
    const curTab: any = (await chrome.tabs.query({ active: true }))[0]; // 获取当前活动窗口
    const dataUrl = await chrome.tabs.captureVisibleTab(curTab.windowId); // 获取截屏数据
    setImg(dataUrl);
  }
  function onDownload() {
    const link = document.createElement("a");
    link.download = `task_${new Date().toLocaleString("zh-CN").replace(/[\/\s:]/g,'')}.png`;
    link.href = img;
    link.click();
  }
  return (
    <div className="app">
      <Space>
        <Button icon={<CameraOutlined />} type="primary" onClick={onScreenshot}>
          点击截屏
        </Button>
        {img && <Button onClick={onDownload} icon={<DownloadOutlined />}>下载截图</Button>}
      </Space>
      <div className="result-box">
        {img && <img className="screenshot" src={img} />}
      </div>
    </div>
  );
}
