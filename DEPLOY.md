# 部署到 Vercel（公开访问）

本应用是纯前端静态站点，界面支持中文、英语和葡萄牙语，Excel 导出在浏览器本地完成，无需后端。

当前状态：
- `npm run build` 已通过
- 已配置 `vercel.json`
- 手机 / 桌面自适应布局已就绪

---

## 一、部署前准备

### 1. 安装 Node.js（本机已有可跳过）

需要 Node.js 18 或以上（推荐 20）。

### 2. 确认本地构建成功

```bash
cd /Users/zhangzhengyu/Desktop/EXCEL
npm install
npm run build
```

看到 `✓ built` 且生成 `dist/` 目录即可。

### 3. 初始化 Git 并推送到 GitHub

如果项目还没有 Git 仓库：

```bash
cd /Users/zhangzhengyu/Desktop/EXCEL
git init
git add .
git commit -m "Initial commit: Excel order generator ready for Vercel"
```

在 GitHub 新建一个**公开或私有**仓库（例如 `excel-order-generator`），然后：

```bash
git branch -M main
git remote add origin https://github.com/你的用户名/excel-order-generator.git
git push -u origin main
```

把上面的 URL 换成你自己的仓库地址。

---

## 二、在 Vercel 网页上部署（推荐）

1. 打开 [https://vercel.com](https://vercel.com) 并登录（可用 GitHub 账号）。
2. 点击 **Add New… → Project**。
3. 选择刚推送的 GitHub 仓库，点击 **Import**。
4. 确认构建设置（一般会自动识别 Vite）：
   - **Framework Preset**：Vite
   - **Build Command**：`npm run build`
   - **Output Directory**：`dist`
   - **Install Command**：`npm install`
5. 点击 **Deploy**。
6. 等待 1～3 分钟，部署成功后会得到类似：

   `https://excel-order-generator-xxxx.vercel.app`

7. 把这个链接发给别人即可公开访问。

### 可选：绑定自己的域名

在 Vercel 项目 → **Settings → Domains** 添加域名，按提示配置 DNS。

---

## 三、用 Vercel CLI 部署（可选）

```bash
cd /Users/zhangzhengyu/Desktop/EXCEL
npm install -g vercel
vercel login
vercel
```

首次按提示关联项目；正式上线：

```bash
vercel --prod
```

---

## 四、部署后自检

在电脑和手机浏览器打开线上地址，确认：

| 检查项 | 期望结果 |
|--------|----------|
| 页面打开 | 三种界面语言均可正常切换 |
| 填写产品行 | 可增删复制 |
| 切换导出语言 | 仅预览/Excel 表头变化，界面仍是中文 |
| 导出 Excel | 下载 `.xlsx`，打开后有公式 |
| 保存记录 | 刷新后历史还在（同浏览器） |
| 手机布局 | 底部有「清空 / 保存 / 导出」，顶部有 Tab |

> 历史记录保存在用户自己的浏览器 localStorage，换设备或清缓存不会同步。

---

## 五、常见问题

**Build 失败：找不到模块**  
在 Vercel 项目 Settings → General 确认 Root Directory 为空（或指向本项目根目录），Node.js 版本选 20.x。

**页面空白**  
打开浏览器开发者工具看 Console；确认 Output Directory 是 `dist`。

**导出没反应**  
部分手机浏览器会拦截下载，可换 Chrome / Safari 重试；确保已填写完整产品行。

**更新代码后网站没变**  
本地改完后：

```bash
git add .
git commit -m "Update app"
git push
```

Vercel 会自动重新部署（已连接 GitHub 时）。
