/* Resume 固定侧栏 + 轻量内容渲染，原生 JS；不依赖 CDN 或构建流程。 */
(() => {
  "use strict";
  const data = window.SITE_CONTENT || {};
  const doc = document;
  const $ = (selector) => doc.querySelector(selector);
  const make = (tag, className, text) => {
    const node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  };
  const add = (parent, ...nodes) => nodes.forEach(n => n && parent.appendChild(n));
  const safeHttp = (raw) => {
    if (typeof raw !== "string") return "";
    try {
      const u = new URL(raw.trim());
      return u.protocol === "https:" || u.protocol === "http:" ? u.href : "";
    } catch { return ""; }
  };
  const safeLocalPath = (raw) => typeof raw === "string" &&
    /^(?:assets\/|\.\/assets\/)[\w\-./%\u4e00-\u9fff]+$/u.test(raw) && !raw.includes("..") ? raw : "";
  const list = (value) => Array.isArray(value) ? value : [];
  const short = (value) => typeof value === "string" ? value.trim() : "";
  const sectionInfo = {
    education: ["教育背景", "EDUCATION", "Education"],
    experience: ["实习经历", "EXPERIENCE", "Experience"],
    projects: ["代表项目", "SELECTED WORK", "Projects"],
    skills: ["能力与资质", "SKILLS & QUALIFICATIONS", "Skills"],
    interests: ["兴趣与更多", "BEYOND WORK", "Interests"],
    contact: ["联系", "GET IN TOUCH", "Contact"]
  };

  function section(id, title, eyebrow, intro) {
    const s = make("section", "resume-section body-section"); s.id = id;
    s.setAttribute("aria-labelledby", `${id}-title`);
    const wrap = make("div", "resume-section-content");
    const head = make("header", "section-heading");
    add(head, make("p", "section-eyebrow", eyebrow), make("h2", "section-title", title));
    if (intro) add(head, make("p", "section-intro", intro));
    add(wrap, head); add(s, wrap);
    return { node: s, body: wrap };
  }
  function textList(parent, items, className="point-list") {
    const valid = list(items).filter(Boolean);
    if (!valid.length) return;
    const ul = make("ul", className);
    valid.forEach(v => add(ul, make("li", "", v)));
    add(parent, ul);
  }
  function externalLink(raw, label, className="text-link") {
    const url = safeHttp(raw);
    if (!url) return null;
    const a = make("a", className, label);
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    return a;
  }
  function renderEducation(items) {
    const s = section("education", "教育背景", "02 / EDUCATION", "扎实的经济金融理论基础与分析训练。");
    const timeline = make("div", "timeline");
    items.forEach((it) => {
      const card = make("article", "timeline-entry");
      const mark = make("div", "timeline-marker");
      const inner = make("div", "timeline-details");
      const title = make("h3", "entry-title", it.school || "未命名学校");
      add(inner, title, make("p", "entry-subtitle", it.degree || ""));
      textList(inner, it.highlights, "small-list");
      add(card, mark, inner, make("time", "entry-period", it.period || ""));
      add(timeline, card);
    });
    add(s.body, timeline); return s.node;
  }
  function renderExperience(items) {
    const s = section("experience", "实习经历", "03 / EXPERIENCE", "围绕行业、公司与数据展开研究实践。");
    const timeline = make("div", "timeline");
    items.forEach((it) => {
      const card = make("article", "timeline-entry");
      const mark = make("div", "timeline-marker");
      const inner = make("div", "timeline-details");
      add(inner, make("h3", "entry-title", it.organization || "未命名机构"));
      add(inner, make("p", "entry-subtitle", it.position || ""));
      if (it.location) add(inner, make("p", "entry-muted", it.location));
      textList(inner, it.points);
      add(card, mark, inner, make("time", "entry-period", it.period || ""));
      add(timeline, card);
    });
    add(s.body, timeline); return s.node;
  }
  function tags(parent, values) {
    const all = list(values).filter(Boolean);
    if (!all.length) return;
    const holder = make("div", "tag-list");
    all.forEach(v => add(holder, make("span", "tag", v)));
    add(parent, holder);
  }
  function projectCard(it, index) {
    const card = make("article", "project-card");
    const imagePath = safeLocalPath(it.image);
    if (imagePath) {
      const img = make("img", "project-image"); img.src = imagePath; img.alt = it.title ? `${it.title} 项目展示图` : "项目展示图"; img.loading = "lazy";
      add(card, img);
    } else {
      const visual = make("div", "project-visual");
      add(visual, make("span", "project-visual-index", String(index + 1).padStart(2, "0")));
      add(visual, make("span", "project-visual-label", it.category === "github" ? "CODE / BUILD" : it.category === "research" ? "RESEARCH / STUDY" : "PROJECT / WORK"));
      add(card, visual);
    }
    const body = make("div", "project-body");
    const top = make("div", "project-topline");
    add(top, make("span", "project-type", it.category === "github" ? "GitHub 项目" : it.category === "research" ? "研究项目" : "其他项目"));
    if (it.period) add(top, make("span", "project-date", it.period));
    add(body, top, make("h3", "project-title", it.title || "未命名项目"));
    if (it.summary) add(body, make("p", "project-summary", it.summary));
    tags(body, it.tags);
    const link = externalLink(it.link, (it.linkLabel || "查看项目") + " ↗");
    if (link) add(body, link);
    add(card, body); return card;
  }
  function renderProjects(items) {
    const s = section("projects", "代表项目", "04 / SELECTED WORK", "研究思路、方法与实际作品。新的 GitHub 项目也可以直接放在这里。");
    const grid = make("div", "project-grid");
    items.forEach((it, i) => add(grid, projectCard(it, i)));
    add(s.body, grid); return s.node;
  }
  function renderSkills(skills, qualifications) {
    const s = section("skills", "能力与资质", "05 / SKILLS & QUALIFICATIONS", "专业工具、研究能力与已取得的语言及考试成绩。");
    const grid = make("div", "skills-grid");
    skills.forEach((it) => {
      const card = make("div", "skill-block");
      add(card, make("h3", "skill-title", it.title || "技能"));
      tags(card, it.keywords); add(grid, card);
    });
    if (qualifications.length) {
      const card = make("div", "skill-block");
      add(card, make("h3", "skill-title", "语言与资格"));
      textList(card, qualifications, "qualifications"); add(grid, card);
    }
    add(s.body, grid); return s.node;
  }
  function renderInterests(items) {
    const s = section("interests", "兴趣与更多", "06 / BEYOND WORK", "探索专业之外持续感兴趣的事。" );
    const grid = make("div", "interest-list");
    items.forEach((it, i) => {
      const text = typeof it === "string" ? it : it.title || it.description || "";
      if (!text) return;
      const item = make("div", "interest-item");
      add(item, make("span", "interest-num", String(i+1).padStart(2,"0")), make("p", "", text));
      add(grid,item);
    });
    add(s.body, grid); return s.node;
  }
  function renderContact(c) {
    const s = section("contact", "保持联系", "07 / CONTACT", "期待通过研究、项目与交流建立连接。");
    const block = make("div", "contact-block");
    if (short(c.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) {
      const a = make("a", "contact-item", c.email + " ↗"); a.href = "mailto:" + c.email; add(block, a);
    }
    const github = externalLink(c.github, "GitHub 主页 ↗", "contact-item"); if (github) add(block, github);
    const site = externalLink(c.website, "其他网站 ↗", "contact-item"); if (site) add(block, site);
    const resumePath = safeLocalPath(c.resumePdf);
    if (resumePath && resumePath.toLowerCase().endsWith(".pdf")) {
      const a = make("a", "contact-item", "下载公开版简历 ↓"); a.href = resumePath; a.download = "resume.pdf"; add(block,a);
    }
    add(s.body, block); return s.node;
  }
  function renderCustom(cfg) {
    if (!cfg || !short(cfg.id) || !/^[a-z][a-z0-9-]{1,30}$/.test(cfg.id)) return null;
    const valid = list(cfg.items).filter(Boolean);
    if (!valid.length) return null;
    const s = section(cfg.id, cfg.title || "其他内容", cfg.eyebrow || "MORE / EXPLORE", cfg.intro || "");
    const grid = make("div", "custom-grid");
    valid.forEach(it => {
      const card = make("article", "custom-card");
      if (typeof it === "string") add(card, make("p", "", it));
      else {
        add(card, make("h3", "entry-title", it.title || ""));
        if (it.subtitle) add(card, make("p", "entry-subtitle", it.subtitle));
        if (it.period) add(card, make("p", "entry-period", it.period));
        if (it.description) add(card, make("p", "project-summary", it.description));
        tags(card, it.tags);
        const link = externalLink(it.link, it.linkLabel || "查看更多 ↗"); if (link) add(card, link);
      }
      add(grid,card);
    });
    add(s.body,grid); return s.node;
  }
  function makeNavItem(id, label, number) {
    const li = make("li", "nav-item");
    const a = make("a", "nav-link", "");
    a.href = "#" + id;
    add(a, make("span", "nav-index", String(number).padStart(2,"0")), make("span", "", label));
    li.appendChild(a); return li;
  }
  function render() {
    const profile = data.profile || {};
    const title = short(profile.name) || "个人主页";
    doc.title = title + " · 个人主页";
    const navName = $("#nav-name"); if (navName) navName.textContent = title;
    const copyright = $("#copyright-name"); if (copyright) copyright.textContent = title;
    $("#year").textContent = String(new Date().getFullYear());
    $(".brand-mark").textContent = short(profile.initials) || title.slice(0,1);
    $("#hero-title").textContent = title;
    $("#hero-overline").textContent = profile.headline || "";
    $("#hero-subtitle").textContent = profile.degree || "";
    $("#hero-description").textContent = profile.intro || "";
    $("#nav-tagline").textContent = profile.navTagline || "Research · Analysis · Ideas";

    const menu = $("#nav-list");
    add(menu, makeNavItem("about", "首页", 1));
    const avail = new Map();
    const education = list(data.education).filter(Boolean); if (education.length) avail.set("education", ["教育", renderEducation(education)]);
    const experience = list(data.experience).filter(Boolean); if (experience.length) avail.set("experience", ["实习", renderExperience(experience)]);
    const projects = list(data.projects).filter(Boolean); if (projects.length) avail.set("projects", ["项目", renderProjects(projects)]);
    const skills = list(data.skills).filter(Boolean);
    const quals = list(data.qualifications).filter(Boolean);
    if (skills.length || quals.length) avail.set("skills", ["技能", renderSkills(skills, quals)]);
    const interests = list(data.interests).filter(Boolean); if (interests.length) avail.set("interests", ["兴趣", renderInterests(interests)]);
    const contact = data.contact || {};
    if ((short(contact.email) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) || safeHttp(contact.github) || safeHttp(contact.website) || (safeLocalPath(contact.resumePdf) && String(contact.resumePdf).toLowerCase().endsWith(".pdf"))) {
      avail.set("contact", ["联系", renderContact(contact)]);
    }
    list(data.customSections).forEach(cfg => {
      const s = renderCustom(cfg);
      if (s && !avail.has(cfg.id) && cfg.id !== "about") avail.set(cfg.id, [cfg.title || "更多", s]);
    });
    let num = 2;
    const order = [...new Set([...list(data.sectionOrder), ...avail.keys()])];
    order.forEach(id => {
      const record = avail.get(id); if (!record) return;
      // Keep heading numbers synchronized when a reader reorders sections.
      const heading = record[1].querySelector(".section-eyebrow");
      if (heading) heading.textContent = String(num).padStart(2, "0") + " / " + heading.textContent.replace(/^\d+\s*\/\s*/, "");
      add(menu, makeNavItem(id, record[0], num++));
      $("#page-sections").appendChild(record[1]);
    });
    const acts = $("#hero-actions");
    if (avail.has("experience")) {
      const a = make("a", "btn btn-primary", "查看经历"); a.href = "#experience"; add(acts,a);
    }
    if (avail.has("projects")) {
      const a = make("a", "btn btn-outline", "浏览项目 ↗"); a.href = "#projects"; add(acts,a);
    }
    if (avail.has("contact")) {
      const a = make("a", "btn btn-text", "联系我 ↗"); a.href = "#contact"; add(acts,a);
    }
    attachInteractions();
  }
  function attachInteractions() {
    const button = $("#menu-toggle"), menu = $("#navbarResponsive");
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open", !expanded);
    });
    const anchors = [...doc.querySelectorAll(".nav-link")];
    anchors.forEach(a => a.addEventListener("click", () => {
      button.setAttribute("aria-expanded","false"); menu.classList.remove("open");
    }));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          anchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
        });
      }, {rootMargin:"-20% 0px -68% 0px", threshold:0});
      doc.querySelectorAll("main > section[id]").forEach(s => io.observe(s));
    } else if (anchors.length) anchors[0].classList.add("active");
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", render, {once:true});
  else render();
})();
