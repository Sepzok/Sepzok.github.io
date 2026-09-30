(function () {
  var STORAGE_KEY = 'sepzok-pages-lang'
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
      home_status: '主产品下载稍后开放',
      home_lede: '做软件的公司。这里是公开主页：开源工具、联系与制度信息。',
      home_desc: '随造 Sepzok（原造格 Sepzap）。软件公司公开站与开源项目。',
      cta_projects: '浏览开源项目',
      cta_contact: '联系我们',
      cta_about: '了解更多',
      cta_security: '安全反馈',
      visual_chip: 'Software company',
      visual_title: '公开站 · 开源 · 制度页',
      visual_body: '主产品介绍另有时间表；当前可访问开源仓库与公司信息。',
      projects_kicker: 'Open source',
      projects_title: '开源项目',
      projects_lede: '与主产品无关的公开小工具，代码在 GitHub。',
      projects_github: 'GitHub 账号',
      projects_page_desc: 'Sepzok 公开的开源小工具：handpan、aa-calc、ear-training。',
      proj_handpan: '浏览器里的虚拟手碟（RESONA），Web Audio 低延迟演奏。',
      proj_aacalc: 'AA 分账计算器，支持多人账单与结算建议。',
      proj_ear: '音感练习：听音辨音的网页小工具。',
      company_kicker: 'Company',
      company_title: '公司信息',
      company_lede: '品牌、联络与安全反馈，按软件公司公开站惯例提供。',
      about_title: '关于',
      about_lede: '随造（Sepzok）是公司对外品牌。',
      about_p1:
        '本站是软件公司公开主页：开源项目、联系与制度信息。主产品介绍与安装通道将另行开放。',
      about_p2: '公开小工具包括虚拟手碟、AA 分账与音感练习，源码在 GitHub。',
      about_desc: '关于随造 Sepzok。软件公司公开站与开源入口。',
      contact_title: '联系',
      contact_p1: '目前请通过公司 GitHub 账号联系：',
      contact_p2:
        '尚未开放公开客服邮箱。商务或媒体来信可先在 GitHub 开 Issue，并在标题标明用途。',
      contact_desc: '联系随造 Sepzok。',
      security_title: '安全反馈',
      security_teaser:
        '发现与账号、本站或公开仓库相关的安全问题，请走私密渠道报告。',
      security_p1:
        '若发现与 Sepzok 账号、本站或后续公开仓库相关的安全问题，请优先通过 GitHub 私密渠道报告，不要在公开 Issue 里贴复现细节或凭证。',
      security_p2:
        '可用：GitHub 账号页留言 / 对相关仓库开启私密漏洞报告（若已开通）。我们会按严重程度跟进。',
      security_desc: '向 Sepzok 报告安全问题。',
      footer_blurb: '软件公司公开站。主产品下载开放前，可浏览开源与制度页。',
      footer_explore: '探索',
      footer_legal: '制度',
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
        'A software company. This is the public site: open source, contact, and policy pages.',
      home_desc:
        'Sepzok (formerly Sepzap). Public company site and open-source projects.',
      cta_projects: 'Browse open source',
      cta_contact: 'Contact us',
      cta_about: 'Learn more',
      cta_security: 'Security',
      visual_chip: 'Software company',
      visual_title: 'Public · Open source · Policy',
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
      company_lede:
        'Brand, contact, and security — the usual public pages for a software company.',
      about_title: 'About',
      about_lede: 'Sepzok (随造) is our public company brand.',
      about_p1:
        'This site is the public company home: open source, contact, and policy pages. Main product pages and installs will open later.',
      about_p2:
        'Side tools include a virtual handpan, bill splitter, and ear training — source on GitHub.',
      about_desc: 'About Sepzok. Public company site and open-source entry points.',
      contact_title: 'Contact',
      contact_p1: 'For now, reach us via the company GitHub account:',
      contact_p2:
        'There is no public support email yet. For business or press, open a GitHub Issue and put the purpose in the title.',
      contact_desc: 'Contact Sepzok.',
      security_title: 'Security',
      security_teaser:
        'If you find an issue related to the account, this site, or public repos, report it privately.',
      security_p1:
        'If you find a security issue related to the Sepzok account, this site, or future public repositories, report it privately on GitHub. Do not post exploit details or credentials in public issues.',
      security_p2:
        'Use a private message on the GitHub profile, or private vulnerability reporting on the relevant repository when available. We will follow up by severity.',
      security_desc: 'Report security issues to Sepzok.',
      footer_blurb:
        'Public software-company site. Until main downloads open, browse open source and policy pages.',
      footer_explore: 'Explore',
      footer_legal: 'Legal',
      foot_copy: '© Sepzok',
    },
  }

  var locale = 'zh'
  var langButtons = document.querySelectorAll('[data-lang]')

  function detectLocale() {
    var stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'zh') return stored
    var nav = (navigator.language || '').toLowerCase()
    return nav.indexOf('en') === 0 ? 'en' : 'zh'
  }

  function t(key) {
    return (COPY[locale] && COPY[locale][key]) || COPY.zh[key] || ''
  }

  function applyLocale(next) {
    locale = next === 'en' ? 'en' : 'zh'
    localStorage.setItem(STORAGE_KEY, locale)
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
    langButtons.forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === locale
      btn.classList.toggle('is-on', active)
      btn.setAttribute('aria-pressed', active ? 'true' : 'false')
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
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = btn.getAttribute('data-lang')
      if (next === 'zh' || next === 'en') applyLocale(next)
    })
  })

  applyLocale(detectLocale())
})()
