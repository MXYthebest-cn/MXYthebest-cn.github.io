/*
 * 个人主页内容编辑区（V1.0）
 * 只修改这个文件即可维护大部分网站内容。保存并刷新 index.html 就能预览。
 * 字符串需要放在英文双引号 "..." 中；各字段之间保留英文逗号。
 * 想隐藏某个区块：将其列表改成 [] 即可。
 * 想增加一项：复制一项 {...}，修改里面的文字。
 * 注意：本文件在公开仓库中任何人都能看到，请勿填写身份证号、私人手机、token等。
 */
window.SITE_CONTENT = {
  profile: {
    name: "孟星扬",
    initials: "MX",             // 左侧名字缩写，可以自行修改
    headline: "金融研究 · 行业分析 · 数据分析",
    degree: "经济与国际金融经济硕士",
    intro: "华威大学经济与国际金融经济硕士，上海大学金融学本科；拥有券商投行与行业研究实习经历，参与公司尽调、行业研究及宏观经济数据分析。",
    navTagline: "Research · Analysis · Ideas"
  },

  // 教育背景：可以增加、删除、调整顺序
  education: [
    {
      school: "华威大学",
      degree: "经济与国际金融经济 · 硕士",
      period: "2024.09 — 2025.09",
      highlights: ["微观经济学、宏观经济学、计量经济学", "投资与金融系统、国际金融管理"]
    },
    {
      school: "上海大学",
      degree: "金融学 · 本科",
      period: "2020.09 — 2024.06",
      highlights: ["证券投资、金融科技概论、金融数据库检索与分析", "金融市场与金融衍生工具"]
    }
  ],

  // 实习经历：复制一个 {...} 就可以增加一条，数组顺序即展示顺序
  experience: [
    {
      organization: "中信建投",
      position: "投行部实习生",
      period: "2023.06 — 2023.08",
      location: "",
      points: [
        "收集北斗星通及光伏行业相关政策、财务数据与市场资料。",
        "参与公司治理、合规、估值与盈利预测分析，并梳理光伏产业链及投融资信息。",
        "制作北斗星通尽职调查报告、光伏行业分析报告及相关路演材料。"
      ]
    },
    {
      organization: "华西证券研究所",
      position: "服纺教育组 · 行业研究实习生",
      period: "2023.01 — 2023.02",
      location: "",
      points: [
        "通过 Wind 等平台整理朗姿股份及服纺、教育行业相关数据。",
        "分析朗姿股份医美、女装、婴童业务，并参与盈利及估值预测。",
        "制作公司深度报告、行业周报及会议纪要。"
      ]
    }
  ],

  // 项目：research = 研究作品，github = 代码项目，other = 其他
  // link 留空即不显示按钮；没有实际项目时不要填写占位网址
  // image 可选，例如 "assets/images/my-project.jpg"；不填则显示文字图案
  projects: [
    {
      category: "research",
      title: "2022年第三季度中国宏观经济数据分析",
      period: "2023.01",
      summary: "独立梳理宏观基本面、生产、需求、收入、通胀及货币政策指标；对比中、美、欧、英、日主要经济指标，并讨论重大事件的潜在影响。",
      tags: ["宏观经济", "数据分析", "比较研究"],
      link: "",
      linkLabel: "",
      image: ""
    }
    // 新增 GitHub 项目示例（删除前面的 // 后，再按实际信息填写）：
    // ,{
    //   category: "github",
    //   title: "我的开源项目",
    //   period: "2026",
    //   summary: "它解决了什么问题，我做了什么。",
    //   tags: ["Python", "Data"],
    //   link: "https://github.com/你的用户名/仓库名",
    //   linkLabel: "查看源代码",
    //   image: ""
    // }
  ],

  // 技能分类：可以追加新分组；keywords 与 details 都是字符串列表
  skills: [
    { title: "分析与工具", keywords: ["Python", "Wind", "Choice", "Office", "Adobe", "AI 工具"] },
    { title: "研究方向", keywords: ["宏观分析", "行业研究", "公司研究", "财务与估值分析"] }
  ],

  // 证书与语言：表述以真实已获得的资格为准
  qualifications: [
    "大学英语六级 · 已通过",
    "雅思 IELTS 7.0",
    "FRM 一级考试通过",
    "CFA 考试备考中"
  ],

  // 个人兴趣：初始为空，不会显示导航或栏目。添加例如 ["阅读经济史", "徒步"] 即出现。
  interests: [],

  // 可选自定义栏目：例如志愿服务、活动、文章等，完全不需要修改页面代码
  // 每项结构：{ id: "activities", title: "社会活动", eyebrow: "MORE", intro: "", items: [...] }
  customSections: [],

  // 展示顺序：改动数组顺序即可调整各栏目先后，自定义栏目 id 也可以写进来
  sectionOrder: ["education", "experience", "projects", "skills", "interests", "contact"],

  // 仅公开已明确批准的联系方式；没有内容时联系栏目自动隐藏
  contact: {
    email: "",                 // 获得本人确认后填写，例如 job@example.com
    github: "",                // 例如 https://github.com/你的用户名
    website: "",               // 其他公开网站，可留空
    resumePdf: ""              // 仅在确认PDF已脱敏且允许公开时填写相对路径
  }
};
