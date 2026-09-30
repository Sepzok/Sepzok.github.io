(function () {
  var STORAGE_KEY = 'sepzok-pages-lang'
  var COPY = {
    zh: {
      nav_home: '首页',
      nav_about: '关于',
      nav_contact: '联系',
      nav_security: '安全',
      nav_privacy: '隐私政策',
      nav_terms: '用户协议',
      nav_delete: '注销账号',
      home_title: '随造 Sepzok',
      home_status: '下载尚未开放',
      home_lede: '公司公开站。产品介绍与安装稍后开放。',
      home_desc: '随造 Sepzok（原造格 Sepzap）。下载尚未开放。',
      card_about_kicker: 'Company',
      card_about_body: '品牌与本站说明',
      card_contact_kicker: 'Reach us',
      card_contact_body: '通过 GitHub 留言',
      card_security_kicker: 'Trust',
      card_security_body: '私密报告安全问题',
      about_title: '关于',
      about_p1:
        '随造（Sepzok）是公司对外品牌。本站是公开占位站，不介绍产品功能，也不提供安装包下载。',
      about_p2:
        '完整产品站与下载通道另有运营安排；开放时会在本站更新说明。',
      about_desc: '关于随造 Sepzok。公开占位站，不介绍产品功能。',
      contact_title: '联系',
      contact_p1: '目前请通过公司 GitHub 账号联系：',
      contact_p2: '尚未开放公开客服邮箱。商务或媒体来信可先在 GitHub 开 Issue，并在标题标明用途。',
      contact_desc: '联系随造 Sepzok。',
      security_title: '安全反馈',
      security_p1:
        '若发现与 Sepzok 账号、本站或后续公开仓库相关的安全问题，请优先通过 GitHub 私密渠道报告，不要在公开 Issue 里贴复现细节或凭证。',
      security_p2:
        '可用：GitHub 账号页留言 / 对相关仓库开启私密漏洞报告（若已开通）。我们会按严重程度跟进。',
      security_desc: '向 Sepzok 报告安全问题。',
      foot_copy: '© Sepzok',
    },
    en: {
      nav_home: 'Home',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_security: 'Security',
      nav_privacy: 'Privacy',
      nav_terms: 'Terms',
      nav_delete: 'Delete account',
      home_title: 'Sepzok',
      home_status: 'Downloads are not open yet',
      home_lede: 'Public company site. Product pages and installs come later.',
      home_desc: 'Sepzok (formerly Sepzap). Downloads are not open yet.',
      card_about_kicker: 'Company',
      card_about_body: 'Brand and this site',
      card_contact_kicker: 'Reach us',
      card_contact_body: 'Message us on GitHub',
      card_security_kicker: 'Trust',
      card_security_body: 'Report security issues privately',
      about_title: 'About',
      about_p1:
        'Sepzok (随造) is our public company brand. This site is a public placeholder. It does not describe product features and does not offer installs.',
      about_p2:
        'The full product site and download channels are handled separately. We will update this page when they open.',
      about_desc: 'About Sepzok. Public placeholder without product details.',
      contact_title: 'Contact',
      contact_p1: 'For now, reach us via the company GitHub account:',
      contact_p2:
        'There is no public support email yet. For business or press, open a GitHub Issue and put the purpose in the title.',
      contact_desc: 'Contact Sepzok.',
      security_title: 'Security',
      security_p1:
        'If you find a security issue related to the Sepzok account, this site, or future public repositories, report it privately on GitHub. Do not post exploit details or credentials in public issues.',
      security_p2:
        'Use a private message on the GitHub profile, or private vulnerability reporting on the relevant repository when available. We will follow up by severity.',
      security_desc: 'Report security issues to Sepzok.',
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
