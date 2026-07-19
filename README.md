# Excel 订单表格生成器

可公开访问的网页版订单 / 报价 Excel 生成工具。

- 界面：中文 / English / Português，可自动识别并记住选择
- Excel 表头：葡萄牙语 / 西班牙语 / 英语
- 导出：带公式的 `.xlsx`（数量×单价、合计）
- 适配：手机与电脑
- 部署：已针对 **Vercel** 配置

## 功能

- 填写标题、型号、数量、单价
- 添加 / 复制 / 删除行，实时预览
- 自动学习已保存或已导出的产品型号，按匹配度、频率和最近使用时间显示最多 3 条建议
- 可在历史页面逐个管理已记住的产品型号
- 一键导出 Excel（公式可在 Excel / WPS / Google Sheets 中自动计算）
- 葡萄牙语价格显示 `RS` 前缀（数字格式，不影响公式）
- 历史记录保存在本机浏览器，刷新后仍保留；不同电脑/浏览器互不可见

订单历史和型号历史不会上传到服务器，仅保存在当前浏览器的 localStorage 中。

## 本地运行

需要 Node.js 18+。

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 部署到 Vercel

完整步骤见 **[DEPLOY.md](./DEPLOY.md)**。

简要流程：

1. `git init` → 推送到 GitHub  
2. 在 [vercel.com](https://vercel.com) Import 该仓库  
3. Build：`npm run build`，Output：`dist`  
4. Deploy 后获得公开 URL  

## 技术栈

React · TypeScript · Vite · Tailwind CSS · exceljs · file-saver
