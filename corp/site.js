(function () {
  /**
   * Soft flags — flip to true and republish to restore EN link / open-source surface.
   * Deploy: CloudBase `npm run site:publish:corp`; EN: pocket-ops `bash scripts/publish-corp-cloudflare.sh`
   */
  var FEATURES = {
    langSwitch: false,
    openSource: false,
  }

  var root = document.documentElement
  if (FEATURES.langSwitch) root.classList.add('feat-lang')
  if (FEATURES.openSource) root.classList.add('feat-oss')

  var path = location.pathname || '/'
  if (
    !FEATURES.openSource &&
    /\/projects\.html$/i.test(path)
  ) {
    location.replace('/' + location.search + location.hash)
    return
  }

  var CN_ORIGIN = 'https://sepzok.com'
  var EN_ORIGIN = 'https://en.sepzok.com'
  var COPY = {
    zh: {
      nav_home: '首页',
      nav_projects: '开源',
      nav_about: '关于',
      nav_contact: '联系',
      nav_security: '安全',
      nav_privacy: '隐私政策',
      nav_terms: '用户协议',
      nav_delete: '注销账号',
      home_title: '随造 Sepzok',
      home_status: '主产品下载即将开放',
      home_lede: '开源项目、联系方式，以及用户协议与隐私政策。',
      home_desc: '随造 Sepzok（原造格 Sepzap）。开源项目与公司信息。',
      cta_projects: '浏览开源项目',
      cta_contact: '联系我们',
      cta_about: '了解更多',
      cta_security: '报告安全问题',
      visual_chip: '软件公司',
      visual_title: '开源 · 联系 · 法律条款',
      visual_body: '主产品页面与下载将陆续上线；现阶段可浏览开源仓库与公司介绍。',
      projects_kicker: 'Open source',
      projects_title: '开源项目',
      projects_lede: '若干独立开源小工具，代码托管在 GitHub。',
      projects_github: 'GitHub 账号',
      projects_page_desc: '随造开源小工具：handpan、aa-calc、ear-training。',
      proj_handpan: '浏览器里的虚拟手碟（RESONA），Web Audio 低延迟演奏。',
      proj_aacalc: 'AA 分账计算器，支持多人账单与结算建议。',
      proj_ear: '音感练习：在浏览器里练听音辨音。',
      company_kicker: '公司',
      company_title: '公司信息',
      company_lede: '品牌介绍、联系方式与安全漏洞报告。',
      about_title: '关于',
      about_lede: '随造（Sepzok）是深圳市克罗赛思智能科技有限公司的对外品牌。',
      about_p1:
        '本站由深圳市克罗赛思智能科技有限公司运营，提供开源项目与联系方式，并发布用户协议、隐私政策等法律文本。主产品及安装下载将另行开放。',
      about_p2: '开源小工具包括虚拟手碟、AA 分账与音感练习，源码见 GitHub。',
      about_desc: '关于随造 Sepzok：公司与开源项目。',
      contact_title: '联系',
      contact_p1: '商务、媒体与一般咨询，请发送邮件至：',
      contact_p2:
        '也可在 GitHub 与我们联系：提交 Issue 时请在标题中注明用途。',
      footer_contact: '联系',
      contact_desc: '联系随造 Sepzok。',
      security_meta: '协调披露政策',
      security_title: '安全',
      security_teaser:
        '如发现与本站账号、网站或 GitHub 仓库相关的安全问题，请通过私密渠道向我们报告。',
      security_desc: 'Sepzok 安全漏洞协调披露说明。',
      security_intro:
        '我们重视本站、公司 GitHub 账号及相关开源仓库的安全。欢迎负责任的漏洞报告。本页不描述未上线的产品或内部系统。',
      security_s1_t: '1. 范围',
      security_s1_1: '本公司网站（含本站）及其托管配置中的明显安全问题；',
      security_s1_2: '以 Sepzok 名义发布的公开 GitHub 仓库中的安全缺陷；',
      security_s1_3:
        '可导致他人账户或数据被未授权访问的问题（若涉及本站或公开仓库所托管的内容）。',
      security_s1_out:
        '以下通常不在范围：纯社会工程、物理攻击、对第三方平台（如 GitHub.com 本身）的漏洞、缺少安全最佳实践但无实际影响的问题、以及未公开的内部系统。',
      security_s2_t: '2. 如何报告',
      security_s2_1:
        '请优先使用私密渠道，不要在公开 Issue 中粘贴完整利用细节、令牌或个人数据。',
      security_s2_2:
        '通过 github.com/Sepzok 发送私信，或对相关仓库使用 GitHub 私密漏洞报告（若已开启）；',
      security_s2_3:
        '也可按联系页说明在 GitHub 提交 Issue，标题请注明 [SECURITY]，正文仅作简要说明，技术细节请私下发送。',
      security_s2_4:
        '报告请尽量包含：受影响资产、问题类型、复现步骤、影响说明、概念验证（如有）以及联系方式。',
      security_s3_t: '3. 我们的承诺',
      security_s3_1: '尽快确认收到（目标：数个工作日内）；',
      security_s3_2: '评估严重程度并与您保持必要沟通；',
      security_s3_3: '在修复或缓解后，可与报告人协商公开致谢（若您愿意）。',
      security_s3_4:
        '我们请您在我们修复或双方约定的披露日前，不公开完整利用细节。常见协调窗口约为 90 天，可视情况协商延长。',
      security_s4_t: '4. 善意研究',
      security_s4_1:
        '在适用法律允许的范围内，对符合本政策、未破坏数据可用性、未访问无关数据、且及时报告的善意安全研究，我们不会对研究人提起法律诉讼。请避免破坏性测试、垃圾流量与隐私侵犯。',
      security_s5_t: '5. 安全.txt',
      security_s5_1: '机器可读格式见',
      security_s6_t: '6. 联系',
      security_s6_1: '一般问询见联系页；安全事项请按上文私密渠道提交。',
      footer_blurb: '主产品下载开放前，可先浏览开源项目及相关法律页面。',
      footer_explore: '网站',
      footer_legal: '法律信息',
      entity_title: '主体信息',
      entity_name: '深圳市克罗赛思智能科技有限公司',
      entity_addr: '深圳市龙岗区龙城街道紫薇社区清林中路31号金基吉祥广场720',
      foot_copy: '© Sepzok',
    },
    en: {
      nav_home: 'Home',
      nav_projects: 'Open source',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_security: 'Security',
      nav_privacy: 'Privacy',
      nav_terms: 'Terms',
      nav_delete: 'Delete account',
      home_title: 'Sepzok',
      home_status: 'Main product downloads open later',
      home_lede:
        'Open-source tools, contact details, and policies. Main product downloads open later.',
      home_desc:
        'Sepzok (formerly Sepzap). Open-source projects and company information.',
      cta_projects: 'Browse open source',
      cta_contact: 'Contact us',
      cta_about: 'Learn more',
      cta_security: 'Security',
      visual_chip: 'Software company',
      visual_title: 'Open source · Contact · Policies',
      visual_body:
        'Product pages follow later. Open repositories and company info are available now.',
      projects_kicker: 'Open source',
      projects_title: 'Open source',
      projects_lede:
        'Public side projects, unrelated to the main product. Source on GitHub.',
      projects_github: 'GitHub profile',
      projects_page_desc:
        'Sepzok open-source tools: handpan, aa-calc, ear-training.',
      proj_handpan:
        'Virtual handpan in the browser (RESONA) with low-latency Web Audio.',
      proj_aacalc: 'Going-Dutch bill splitter with multi-person settlement tips.',
      proj_ear: 'Ear-training: a small pitch-practice page in the browser.',
      company_kicker: 'Company',
      company_title: 'Company',
      company_lede: 'Brand, contact, and security reporting.',
      about_title: 'About',
      about_lede: 'Sepzok (随造) is our company brand.',
      about_p1:
        'Sepzok is operated by Shenzhen Keluosaisi Intelligent Technology Co., Ltd. This site lists open-source projects, contact details, and policies. Main product pages and installs will open later.',
      about_p2:
        'Open-source tools include a virtual handpan, bill splitter, and ear training — source on GitHub.',
      about_desc: 'About Sepzok: company information and open-source entry points.',
      contact_title: 'Contact',
      contact_p1: 'For business, press, and general inquiries, email:',
      contact_p2:
        'You can also reach us on GitHub — put the purpose in the Issue title.',
      footer_contact: 'Contact',
      contact_desc: 'Contact Sepzok.',
      security_meta: 'Coordinated disclosure',
      security_title: 'Security',
      security_teaser:
        'If you find an issue related to the account, this site, or public repos, report it privately.',
      security_desc: 'Sepzok coordinated vulnerability disclosure.',
      security_intro:
        'We care about the security of this site, our company GitHub account, and related open-source repositories. Responsible reports are welcome. This page does not describe unreleased products or internal systems.',
      security_s1_t: '1. Scope',
      security_s1_1:
        'Clear security issues in our websites (including this site) and their hosting configuration;',
      security_s1_2: 'Security defects in public GitHub repositories published under Sepzok;',
      security_s1_3:
        'Issues that could lead to unauthorized access to someone else’s account or data, when tied to this site or content hosted in our public repositories.',
      security_s1_out:
        'Usually out of scope: pure social engineering, physical attacks, vulnerabilities in third-party platforms (such as GitHub.com itself), missing hardening with no practical impact, and non-public internal systems.',
      security_s2_t: '2. How to report',
      security_s2_1:
        'Prefer private channels. Do not post full exploit details, tokens, or personal data in public issues.',
      security_s2_2:
        'Message github.com/Sepzok privately, or use GitHub private vulnerability reporting on the relevant repository when enabled;',
      security_s2_3:
        'Or open an Issue via the Contact guidance with a [SECURITY] title and a high-level description only—send details privately.',
      security_s2_4:
        'Please include: affected asset, issue type, reproduction steps, impact, proof of concept (if any), and a way to reach you.',
      security_s3_t: '3. Our commitments',
      security_s3_1: 'Acknowledge receipt promptly (target: within a few business days);',
      security_s3_2: 'Assess severity and keep necessary communication;',
      security_s3_3: 'After a fix or mitigation, we may arrange public credit if you want it.',
      security_s3_4:
        'Please do not publish full exploit details before a fix or an agreed disclosure date. A common coordination window is about 90 days and may be extended by agreement.',
      security_s4_t: '4. Good-faith research',
      security_s4_1:
        'To the extent permitted by law, we will not pursue legal action against good-faith researchers who follow this policy, avoid impairing availability, avoid accessing unrelated data, and report promptly. Do not run destructive tests, floods, or privacy invasions.',
      security_s5_t: '5. security.txt',
      security_s5_1: 'Machine-readable contact details:',
      security_s6_t: '6. Contact',
      security_s6_1: 'General questions: Contact page. Security matters: use the private channels above.',
      footer_blurb:
        'Until main downloads open, browse open-source projects and policy pages.',
      footer_explore: 'Explore',
      footer_legal: 'Legal',
      entity_title: 'Legal entity',
      entity_name: 'Shenzhen Keluosaisi Intelligent Technology Co., Ltd.',
      entity_addr: 'Rm 720, Jinji Jixiang Plz, 31 Qinglin Mid Rd, Ziwei Cmty',
      foot_copy: '© Sepzok',
    },
  }

  /** Copy used while openSource is off (marketing surface hidden; security page keeps its own keys). */
  var COPY_NO_OSS = {
    zh: {
      home_lede: '联系方式，以及用户协议与隐私政策。',
      home_desc: '随造 Sepzok（原造格 Sepzap）。公司信息与法律文本。',
      visual_title: '联系 · 法律条款',
      visual_body: '主产品页面与下载将陆续上线；现阶段可查看公司介绍与法律页面。',
      about_p1:
        '本站由深圳市克罗赛思智能科技有限公司运营，提供联系方式，并发布用户协议、隐私政策等法律文本。主产品及安装下载将另行开放。',
      about_desc: '关于随造 Sepzok：公司信息。',
      security_teaser:
        '如发现与本站或账号相关的安全问题，请通过私密渠道向我们报告。',
      footer_blurb: '主产品下载开放前，可先查看公司介绍及相关法律页面。',
    },
    en: {
      home_lede: 'Contact details and policies. Main product downloads open later.',
      home_desc: 'Sepzok (formerly Sepzap). Company information and policies.',
      visual_title: 'Contact · Policies',
      visual_body:
        'Product pages follow later. Company info and policy pages are available now.',
      about_p1:
        'Sepzok is operated by Shenzhen Keluosaisi Intelligent Technology Co., Ltd. This site lists contact details and policies. Main product pages and installs will open later.',
      about_desc: 'About Sepzok: company information.',
      security_teaser:
        'If you find an issue related to this site or accounts, report it privately.',
      footer_blurb: 'Until main downloads open, browse company info and policy pages.',
    },
  }

  if (!FEATURES.openSource) {
    ;['zh', 'en'].forEach(function (loc) {
      var patch = COPY_NO_OSS[loc]
      Object.keys(patch).forEach(function (key) {
        COPY[loc][key] = patch[key]
      })
    })
  }

  var host = (location.hostname || '').toLowerCase()
  /** @type {'cn' | 'en' | 'preview'} */
  var region = 'preview'
  if (
    host === 'en.sepzok.com' ||
    host.endsWith('.pages.dev')
  ) {
    // pages.dev preview of the EN project still defaults to en when hostname says so
    region = host === 'en.sepzok.com' ? 'en' : 'preview'
  }
  if (
    host === 'sepzok.com' ||
    host === 'www.sepzok.com' ||
    host.endsWith('.tcloudbaseapp.com')
  ) {
    region = 'cn'
  }
  if (host === 'en.sepzok.com') region = 'en'

  var locale = region === 'en' ? 'en' : region === 'cn' ? 'zh' : 'zh'
  var langLinks = document.querySelectorAll('a.lang-btn[data-lang]')

  function t(key) {
    return (COPY[locale] && COPY[locale][key]) || COPY.zh[key] || ''
  }

  function peerUrl(targetLocale) {
    var origin = targetLocale === 'en' ? EN_ORIGIN : CN_ORIGIN
    return origin + path + location.search + location.hash
  }

  function applyLocale(next) {
    locale = next === 'en' ? 'en' : 'zh'
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN'
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n')
      if (!key) return
      var value = t(key)
      if (!value) return
      el.textContent = value
    })
    var meta = document.querySelector('meta[name="description"]')
    var descKey = document.body.getAttribute('data-desc-key')
    if (meta && descKey) meta.setAttribute('content', t(descKey))
    langLinks.forEach(function (link) {
      var lang = link.getAttribute('data-lang')
      var active = lang === locale
      link.classList.toggle('is-on', active)
      link.setAttribute('aria-current', active ? 'true' : 'false')
      if (region === 'cn' || region === 'en') {
        // Production: plain links only — no shared storage across regions.
        if (lang === 'en') link.href = peerUrl('en')
        else link.href = peerUrl('zh')
        if (active) link.removeAttribute('href')
      } else {
        link.href = '#' + lang
      }
    })
    var privacy = document.querySelector('[data-legal-privacy]')
    var terms = document.querySelector('[data-legal-terms]')
    var del = document.querySelector('[data-legal-delete]')
    if (privacy) {
      privacy.href =
        locale === 'en'
          ? '/legal/en/privacy-policy.html'
          : '/legal/zh-CN/privacy-policy.html'
    }
    if (terms) {
      terms.href =
        locale === 'en'
          ? '/legal/en/user-agreement.html'
          : '/legal/zh-CN/user-agreement.html'
    }
    if (del) {
      del.href =
        locale === 'en' ? '/account-delete.en.html' : '/account-delete.html'
    }
    document.querySelectorAll('.footer-beian').forEach(function (el) {
      el.hidden = locale !== 'zh'
    })
    if (!FEATURES.openSource) {
      var contactCta = document.querySelector(
        '.hero-actions a[href="/contact.html"]'
      )
      if (contactCta) {
        contactCta.classList.add('btn-primary')
        contactCta.classList.remove('btn-ghost')
      }
    }
  }

  if (region === 'preview') {
    langLinks.forEach(function (link) {
      link.addEventListener('click', function (ev) {
        var next = link.getAttribute('data-lang')
        if (next !== 'zh' && next !== 'en') return
        ev.preventDefault()
        applyLocale(next)
      })
    })
    var nav = (navigator.language || '').toLowerCase()
    locale = nav.indexOf('en') === 0 ? 'en' : 'zh'
  }

  applyLocale(locale)
})()
