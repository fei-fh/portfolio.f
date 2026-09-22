# Personal Portfolio

一个桌面优先、无纵向滚动的个人作品集网站。使用 HTML、Tailwind CSS（CDN）和原生 JavaScript 构建。首页使用 `Images/1头图.PNG` 全屏展示；导航为 Home / About / CV / Portfolio / Contact。CV 合并教育与实习经历，Contact 保留兴趣内容。

## 项目结构

```text
.
├── index.html    # 所有场景与页面内容
├── styles.css    # 建筑工作室视觉风格、响应式及动画
├── script.js     # 场景导航与作品集分类数据
└── README.md     # 使用说明
```

## 本地预览

直接用浏览器打开 `index.html`，或在项目目录运行：

```bash
python3 -m http.server 8000
```

随后访问 `http://localhost:8000`。

## 后续替换

在 `index.html` 中查找 `image-placeholder`，即可替换对应图片区块。作品集文字统一维护在 `script.js` 的 `portfolioData` 内；后续可将中文文本与英文文本成对加入该对象，再绑定一个语言切换按钮，无需改变导航逻辑。
