# 个人求职主页 V1.0 · 填写与维护说明

## 先看效果

下载并解压整份文件夹，双击 `index.html` 即可在浏览器中查看；首版不需要安装 Node.js、Python、数据库或 VS Code。

本网站已通过 T3 浏览器及本机打开检查、T4 内容与公开文件核对，**G1 发布候选版已获用户批准**。首次上传公开仓库前，请确认仓库名称、所有者和实际发布内容。

## 今后如何自己填写

绝大部分内容只需要修改 **`assets/js/content.js`**。可以使用 Windows 记事本或 VS Code 编辑，保存为 UTF-8，再刷新浏览器。

| 想做什么 | 修改哪个位置 |
| --- | --- |
| 修改姓名、职业定位、简介 | `profile` |
| 修改/增加/删除学校 | `education` |
| 修改/增加/删除实习 | `experience` |
| 添加研究或 GitHub 项目 | `projects` |
| 修改专业能力、资质 | `skills` 与 `qualifications` |
| 添加兴趣 | `interests`（原来是 `[]`） |
| 添加新的栏目，比如社会活动 | `customSections` |
| 重新调整栏目顺序 | `sectionOrder` |
| 公开联系邮箱或 GitHub 链接 | `contact` |

**改内容只需改一个文件；修改配色和样式才需要改 `assets/css/styles.css`。**

### 示例1：增加实习

在 `experience: [ ... ]` 里复制一个完整的 `{ ... }` 条目（前一项和后一项之间必须加英文逗号），修改字段：

```js
{
  organization: "某机构",
  position: "行业研究实习生",
  period: "2026.07 — 2026.09",
  location: "",
  points: ["研究内容一", "研究内容二"]
}
```

### 示例2：增加真实 GitHub 项目

在 `projects: [ ... ]` 里增加条目：

```js
{
  category: "github",
  title: "项目名称",
  period: "2026",
  summary: "项目做什么、自己做了什么、成果是什么。",
  tags: ["Python", "Research"],
  link: "https://github.com/实际用户名/实际仓库名",
  linkLabel: "查看源代码",
  image: ""
}
```

图片可放 `assets/images/`，如 `image: "assets/images/example.jpg"`。不添加图片时，会自动显示蓝色封面；链接留空时，不会出现虚假按钮。

### 示例3：增加个人兴趣

将 `interests: []` 改成 `interests: ["摄影", "跑步", "经济史阅读"]`。栏目会自动出现；恢复为 `[]` 后栏目会消失，导航也会同步消失。

### 示例4：增加新的自定义栏目

在 `customSections` 中添加：

```js
customSections: [
  {
    id: "activities",
    title: "社会活动",
    eyebrow: "ACTIVITIES",
    intro: "一些活动与实践。",
    items: [
      {title:"活动名称", subtitle:"职责", period:"2026", description:"具体内容", tags:["组织"], link:""}
    ]
  }
],
```

然后在 `sectionOrder` 最后添加 `"activities"`（不添加也会自动在已有栏目后出现）。

### 示例5：改变顺序或删除

数组中的顺序即展示顺序，移动 `{...}` 整块即可调整经历排序。删除一个条目就是删除对应 `{...}`，注意相邻条目之间的逗号。将整个栏目改成 `[]` 会隐藏该栏目。联系方式全部为空时联系栏目自动隐藏。

## 常见注意事项

1. JS 配置中不要漏写 `,`、`}`、`]` 或成对的引号；出错时用浏览器开发者工具（F12 → Console）查看。
2. 请勿公开手机号、私人简历、未授权的研究报告、密码或任何访问令牌。**GitHub 公共仓库及历史提交可能被所有人查看**。
3. 只有在确认公开权限后才填写 `contact.email`、照片、下载链接等字段。首版全部留空。
4. 首页 `title` 和 `meta description` 的静态初始文本在 `index.html` 内；将来更改网站姓名或专业定位时，建议同步修改这两处，确保链接预览/搜索摘要一致。
5. 不要删除 `LICENSE-StartBootstrap.txt`；所借鉴模板按 MIT 许可署名。
6. 本包不使用外部 CSS/JS CDN；所有必需资源均在项目文件夹中。
7. 首版联系方式为空，因此网页不会显示“联系”栏目；这符合先前批准的隐私默认值。若要网站独立承担招聘联系功能，可在公开前确认一个邮箱或 GitHub 入口。

## GitHub Pages 首次发布与以后更新

使用公开仓库 `你的用户名.github.io`，将 `index.html` 及整个 `assets` 文件夹上传到仓库根目录，同时保留许可证；在仓库 Settings → Pages 选择从 `main` / `(root)` 发布。后续直接在 GitHub 编辑 `assets/js/content.js`，提交修改后站点即可重新部署。

## 版本回退

GitHub 仓库的 History / Commits 可以查看旧版本。想恢复文件时，在 GitHub 的对应文件历史中查看旧内容，再恢复到当前分支。对于多文件改动，请优先用 Git 的 revert 功能恢复对应提交，避免覆盖其他正常更新。

## 交付范围

当前交付为：可在本地打开的静态网站、唯一内容编辑文件、简短说明和 Start Bootstrap 的 MIT 许可声明。T3 测试及用户直接文件加载验证已经通过；T4 内容与公开文件核对已完成，等待用户视觉审阅及 G1 发布批准。G1 已批准；实际公开部署和公网验收分别以 GitHub Pages 的 T5/T6 结果为准。
