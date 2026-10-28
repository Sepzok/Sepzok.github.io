(function () {
  /**
   * Soft flags. Both on: the header shows a language menu, and the footer shows open source and GitHub.
   * Deploy: CloudBase `npm run site:publish:corp`; EN: pocket-ops `bash scripts/publish-corp-cloudflare.sh`
   */
  var FEATURES = {
    langSwitch: true,
    openSource: true,
  }

  /**
   * Browser tab titles. Shared pages set data-title-key.
   * EN publish rewrites <title> from the en map so the English host
   * does not paint the Chinese title before this script runs.
   * Pages without data-title-key keep the title in their own file.
   */
  var PAGE_TITLE = {
    zh: {
      home: '随造 Sepzok',
      download: '下载 · 随造 Sepzok',
      about: '关于 · 随造 Sepzok',
      contact: '联系 · 随造 Sepzok',
      security: '安全 · 随造 Sepzok',
      projects: '开源 · 随造 Sepzok',
      pricing: '价格 · 随造 Sepzok',
    },
    en: {
      home: 'Sepzok',
      download: 'Download · Sepzok',
      about: 'About · Sepzok',
      contact: 'Contact · Sepzok',
      security: 'Security · Sepzok',
      projects: 'Open source · Sepzok',
      pricing: 'Pricing · Sepzok',
    },
  }

  var root = document.documentElement
  if (FEATURES.langSwitch) root.classList.add('feat-lang')
  if (FEATURES.openSource) root.classList.add('feat-oss')

  /** Set by setupBrandLogoMorph — rebuild letter spans after locale text swap. */
  var syncBrandNameChars = null

  var path = location.pathname || '/'
  if (
    !FEATURES.openSource &&
    /\/projects(\.html)?\/?$/i.test(path)
  ) {
    location.replace('/' + location.search + location.hash)
    return
  }

  var CN_ORIGIN = 'https://sepzok.com'
  var EN_ORIGIN = 'https://en.sepzok.com'
  var COPY = {
    zh: {
      nav_home: '首页',
      nav_product: '产品',
      nav_projects: '开源',
      nav_about: '关于',
      nav_contact: '联系',
      nav_security: '安全',
      nav_privacy: '隐私政策',
      nav_terms: '用户协议',
      nav_refund: '退款政策',
      nav_pricing: '价格',
      pricing_desc:
        '随造价格：免费、Starter（$10/月）、Pro（$40/月）、Advanced（$120/月）。国际结账由 Paddle 完成。',
      pricing_title: '价格',
      pricing_lede:
        '本机创作不另收费；官方模型额度、官方备份与托管的我的服务按档位。免费即可开始。Starter、Pro、Advanced 均含 7 天试用。',
      pricing_period: '计费周期',
      pricing_col_month: '月付',
      pricing_col_year: '年付',
      pricing_per_month: '/月',
      pricing_per_year: '/年',
      pricing_free_name: '免费',
      pricing_free_desc: '安装随造，本机创作；需要时再登录随造账号。',
      pricing_free_f1: '完整安装与本机创作',
      pricing_free_f2: '本机模型与自备供应商',
      pricing_free_f3: '随造账号与每月官方积分',
      pricing_free_f4: '官方备份 10 槽',
      pricing_free_f5: '自建我的服务不另收费',
      pricing_free_cta: '下载安装',
      pricing_starter_desc: '个人常用官方云额度与备份。',
      pricing_starter_f1: '包含免费档的全部',
      pricing_starter_f2: '更高每月官方积分',
      pricing_starter_f3: '更多官方备份槽',
      pricing_starter_f4: '邮件支持',
      pricing_starter_f5: '7 天免费试用',
      pricing_pro_desc: '更大官方额度，并托管一台我的服务。',
      pricing_pro_f1: '包含 Starter 的全部',
      pricing_pro_f2: '每月官方积分约免费档 10 倍',
      pricing_pro_f3: '官方备份 100 槽',
      pricing_pro_f4: '随造云托管一台我的服务',
      pricing_pro_f5: '优先支持',
      pricing_pro_f6: '7 天免费试用',
      pricing_advanced_desc: '组织用量与开通可单独约定。',
      pricing_advanced_f1: '包含 Pro 的全部',
      pricing_advanced_f2: '积分与备份上限可约定',
      pricing_advanced_f3: '专人协助开通',
      pricing_advanced_f4: '7 天免费试用',
      pricing_tax_note: '目录标价为美元。结账时可能显示税费与当地货币。',
      pricing_refund: '自购买之日起 14 天内可全额退款，无例外、无附加条件。',
      nav_delete: '注销账号',
      brand_name: '随造',
      brand_former: '原名造格 Sepzap',
      home_line1: '随心想',
      home_line2: '随手造',
      home_lede: '做你自己的 app',
      cta_download: '下载',
      cta_subscribe: '订阅',
      download_title: '下载',
      download_lede: '国际完整包从这里安装。直接下载，不是应用商店。',
      download_prompt: '填写访问钥匙，获取当前安装包。',
      download_key: '访问钥匙',
      download_show: '显示下载',
      download_get: '下载随造',
      download_desc: '下载随造国际完整包。',
      notify_title: '开放时通知你',
      notify_lede: '留下邮箱。可以下载时，我们发一封通知。',
      notify_email: '邮箱',
      notify_submit: '通知我',
      notify_note: '只用于下载通知，不会发广告。',
      home_desc: '随造 Sepzok（原造格 Sepzap）。随心想，随手造。做你自己的 app。',
      feat_make_title: '随手做出',
      feat_make_body: '记账、手帐、小游戏。选一个，做完就能打开。',
      feat_use_title: '现做现用',
      feat_use_body: '打开就能用，也可以继续改。',
      feat_link_title: '应用之间发消息',
      feat_link_body: '一个应用记下的一行，另一个应用可以收到。',
      feat_make_alt: '选出一个想法，做成能打开的应用',
      feat_use_alt: '做好的应用在手机里打开',
      feat_link_alt: '另一个应用收到记下的一行',
      cta_contact: '联系我们',
      cta_about: '了解更多',
      cta_security: '报告安全问题',
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
        '本站由深圳市克罗赛思智能科技有限公司运营。随造用来在手机上做出自己的应用，做完就能打开，也可以继续改。',
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
      footer_blurb: '在手机上做出自己的应用。',
      footer_explore: '网站',
      footer_legal: '法律信息',
      entity_title: '主体信息',
      entity_name: '深圳市克罗赛思智能科技有限公司',
      entity_addr: '深圳市龙岗区龙城街道紫薇社区清林中路31号金基吉祥广场720',
      foot_copy: '© Sepzok',
    },
    en: {
      nav_home: 'Home',
      nav_product: 'Product',
      nav_projects: 'Open source',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_security: 'Security',
      nav_privacy: 'Privacy',
      nav_terms: 'Terms',
      nav_refund: 'Refunds',
      nav_pricing: 'Pricing',
      pricing_desc:
        'Sepzok pricing: Free, Starter ($10/mo), Pro ($40/mo), Advanced ($120/mo). International checkout via Paddle.',
      pricing_title: 'Pricing',
      pricing_lede:
        'Create on your device at no charge; official model points, official backups, and hosted My Service follow your plan. Start free. Starter, Pro, and Advanced each include a 7-day trial.',
      pricing_period: 'Billing period',
      pricing_col_month: 'Monthly',
      pricing_col_year: 'Yearly',
      pricing_per_month: '/month',
      pricing_per_year: '/year',
      pricing_free_name: 'Free',
      pricing_free_desc:
        'Install Sepzok and create on device; sign in when you need the official cloud.',
      pricing_free_f1: 'Full install and on-device creation',
      pricing_free_f2: 'On-device models and your own API keys',
      pricing_free_f3: 'Sepzok account with monthly official points',
      pricing_free_f4: '10 official backup slots',
      pricing_free_f5: 'Self-hosted My Service at no extra charge',
      pricing_free_cta: 'Download',
      pricing_starter_desc: 'More official cloud points and backups for regular personal use.',
      pricing_starter_f1: 'Everything in Free',
      pricing_starter_f2: 'Higher monthly official points',
      pricing_starter_f3: 'More official backup slots',
      pricing_starter_f4: 'Email support',
      pricing_starter_f5: '7-day free trial',
      pricing_pro_desc: 'Larger official allowance, plus one hosted My Service.',
      pricing_pro_f1: 'Everything in Starter',
      pricing_pro_f2: 'About 10× Free monthly official points',
      pricing_pro_f3: '100 official backup slots',
      pricing_pro_f4: 'One hosted My Service on Sepzok Cloud',
      pricing_pro_f5: 'Priority support',
      pricing_pro_f6: '7-day free trial',
      pricing_advanced_desc: 'For organizations that need agreed limits and guided setup.',
      pricing_advanced_f1: 'Everything in Pro',
      pricing_advanced_f2: 'Agreed points and backup limits',
      pricing_advanced_f3: 'Dedicated onboarding',
      pricing_advanced_f4: '7-day free trial',
      pricing_tax_note: 'Catalog list prices are in USD. Tax and local currency may appear at checkout.',
      pricing_refund:
        'Full refund within 14 days of purchase, with no exceptions and no conditions.',
      nav_delete: 'Delete account',
      brand_name: 'Sepzok',
      brand_former: 'Formerly Sepzap',
      home_line1: 'Imagine it',
      home_line2: 'Build it',
      home_lede: 'Your own app',
      cta_download: 'Download',
      cta_subscribe: 'Subscribe',
      download_title: 'Download',
      download_lede:
        'This page installs the international full package. It is a direct download, not a store listing.',
      download_prompt: 'Enter the access key to get the current build.',
      download_key: 'Access key',
      download_show: 'Show download',
      download_get: 'Download Sepzok',
      download_desc: 'Download the Sepzok international Android package.',
      notify_title: 'Get a note when it is open',
      notify_lede: 'Leave your email. We will write once when the download is open.',
      notify_email: 'Email',
      notify_submit: 'Notify me',
      notify_note: 'Only for that download note. No marketing mail.',
      home_desc:
        'Sepzok (formerly Sepzap). Imagine it. Build it. Your own app.',
      feat_make_title: 'Make one',
      feat_make_body:
        'A ledger, a journal, or a small game. Pick one, then open it.',
      feat_use_title: 'Ready to use',
      feat_use_body: 'Open it on your phone. Keep changing it whenever you want.',
      feat_link_title: 'Messages between apps',
      feat_link_body: 'A line written in one app can be received in another.',
      feat_make_alt: 'Pick an idea and make an app you can open',
      feat_use_alt: 'A finished app open on the phone',
      feat_link_alt: 'A line received from another app',
      cta_contact: 'Contact us',
      cta_about: 'Learn more',
      cta_security: 'Security',
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
        'Sepzok is operated by Shenzhen Keluosaisi Intelligent Technology Co., Ltd. You make your own apps on your phone, open them when they are ready, and keep changing them.',
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
      footer_blurb: 'Make your own apps on your phone.',
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
      about_desc: '关于随造 Sepzok：公司与产品。',
      security_teaser:
        '如发现与本站或账号相关的安全问题，请通过私密渠道向我们报告。',
    },
    en: {
      about_desc: 'About Sepzok: the company and the product.',
      security_teaser:
        'If you find an issue related to this site or accounts, report it privately.',
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
  var langMenu = document.querySelector('.lang-menu')
  var langButton = langMenu && langMenu.querySelector('.lang-menu-btn')
  var langCurrent = langMenu && langMenu.querySelector('.lang-menu-current')
  var langLinks = document.querySelectorAll('.lang-menu a[data-lang]')

  function setLangOpen(open) {
    if (!langMenu || !langButton) return
    langMenu.classList.toggle('is-open', open)
    langButton.setAttribute('aria-expanded', open ? 'true' : 'false')
  }

  if (langButton) {
    langButton.addEventListener('click', function () {
      setLangOpen(langButton.getAttribute('aria-expanded') !== 'true')
    })
  }
  document.addEventListener('click', function (event) {
    if (!langMenu || langMenu.contains(event.target)) return
    setLangOpen(false)
  })
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setLangOpen(false)
  })

  function t(key) {
    return (COPY[locale] && COPY[locale][key]) || COPY.zh[key] || ''
  }

  function peerUrl(targetLocale) {
    var origin = targetLocale === 'en' ? EN_ORIGIN : CN_ORIGIN
    var peerPath = path
    if (
      path === '/download' ||
      path === '/download/' ||
      path === '/download/index' ||
      path === '/download/index.html'
    ) {
      peerPath = targetLocale === 'en' ? '/download/' : '/download/index.html'
    }
    return origin + peerPath + location.search + location.hash
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
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-alt')
      if (!key) return
      var value = t(key)
      if (!value) return
      el.setAttribute('alt', value)
    })
    var meta = document.querySelector('meta[name="description"]')
    var descKey = document.body.getAttribute('data-desc-key')
    if (meta && descKey) meta.setAttribute('content', t(descKey))
    var titleKey = document.body.getAttribute('data-title-key')
    var titleMap = PAGE_TITLE[locale]
    if (titleKey && titleMap && titleMap[titleKey]) {
      document.title = titleMap[titleKey]
    }
    if (langCurrent) langCurrent.textContent = locale === 'en' ? 'English' : '中文'
    if (langButton) {
      langButton.setAttribute('aria-label', locale === 'en' ? 'Language' : '语言')
    }
    langLinks.forEach(function (link) {
      var lang = link.getAttribute('data-lang')
      var active = lang === locale
      if (active) link.setAttribute('aria-current', 'true')
      else link.removeAttribute('aria-current')
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
    document.querySelectorAll('[data-legal-refund]').forEach(function (refund) {
      refund.href =
        locale === 'en'
          ? '/legal/en/refund-policy.html'
          : '/legal/zh-CN/refund-policy.html'
    })
    var pricingLocal = '/pricing.html'
    var pricingPayZh = 'https://pay.sepzok.com/pricing'
    var pricingPayEn = 'https://pay.sepzok.com/en/pricing'
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (
        link.hasAttribute('data-checkout') ||
        link.hasAttribute('data-checkout-paid') ||
        link.hasAttribute('data-free-cta')
      ) {
        return
      }
      var href = link.getAttribute('href') || ''
      if (
        href === pricingLocal ||
        href.indexOf(pricingLocal + '?') === 0 ||
        href === pricingPayZh ||
        href.indexOf(pricingPayZh + '?') === 0 ||
        href === pricingPayEn ||
        href.indexOf(pricingPayEn + '?') === 0
      ) {
        link.href = pricingLocal
      }
    })
    document.querySelectorAll('[data-checkout-paid]').forEach(function (link) {
      link.href = locale === 'en' ? pricingPayEn : pricingPayZh
    })
    document.querySelectorAll('[data-free-cta]').forEach(function (link) {
      link.href =
        locale === 'en'
          ? 'https://en.sepzok.com/download'
          : 'https://sepzok.com/download/index.html'
    })
    syncPricingFrequency()
    document.querySelectorAll('.footer-beian').forEach(function (el) {
      el.hidden = locale !== 'zh'
    })
    document.querySelectorAll('.entity-name-en, .footer-entity-name-en').forEach(function (el) {
      el.hidden = locale === 'en'
    })
    if (!FEATURES.openSource) {
      var pricingCta = document.querySelector('[data-i18n="cta_pricing"]')
      var contactCta = document.querySelector(
        '.hero-actions a[href="/contact.html"]'
      )
      if (!pricingCta && contactCta) {
        contactCta.classList.add('btn-primary')
        contactCta.classList.remove('btn-ghost')
      }
    }
    bindFeatureShots()
    bindFilmSource()
    syncFilm()
    if (typeof syncBrandNameChars === 'function') syncBrandNameChars()
    var video = document.querySelector('[data-promo]')
    if (
      video &&
      video.paused &&
      (video.currentTime || 0) < 0.2 &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      var auto = video.play()
      if (auto && typeof auto.catch === 'function') auto.catch(function () {})
    }
  }

  function bindFeatureShots() {
    var suffix = locale === 'en' ? '.en.jpg' : '.jpg'
    document.querySelectorAll('[data-feature]').forEach(function (img) {
      var id = img.getAttribute('data-feature')
      if (!id) return
      var next = '/promo/feat-' + id + suffix
      if (img.getAttribute('src') !== next) img.setAttribute('src', next)
    })
  }

  function filmSources() {
    var rev = '20261025d'
    if (locale === 'en') {
      return {
        src: '/promo/home.en.mp4?v=' + rev,
        poster: '/promo/poster.en.jpg?v=' + rev,
      }
    }
    return {
      src: '/promo/home.mp4?v=' + rev,
      poster: '/promo/poster.jpg?v=' + rev,
    }
  }

  function bindFilmSource() {
    var video = document.querySelector('[data-promo]')
    if (!video) return
    var next = filmSources()
    video.poster = next.poster
    if (video.getAttribute('data-film-src') === next.src) return
    var playing = !video.paused && !video.ended && video.currentTime > 0
    video.setAttribute('data-film-src', next.src)
    video.src = next.src
    video.load()
    if (playing) {
      var again = video.play()
      if (again && typeof again.catch === 'function') again.catch(function () {})
    }
  }

  function filmChapters() {
    if (locale === 'en') {
      return [
        { t: 0, text: 'Start from an idea' },
        { t: 2.7, text: 'Apps work with each other' },
        { t: 7.5, text: 'Imagine it. Build it.' },
      ]
    }
    return [
      { t: 0, text: '从一个创意开始' },
      { t: 2.65, text: '按这个做出来' },
      { t: 7.8, text: '应用之间互通' },
      { t: 12.5, text: '随心想，随手造' },
    ]
  }

  function filmChapter(time) {
    var chapters = filmChapters()
    var hit = chapters[0]
    for (var i = 0; i < chapters.length; i += 1) {
      if (time + 0.05 >= chapters[i].t) hit = chapters[i]
    }
    return hit
  }

  function syncFilm() {
    var video = document.querySelector('[data-promo]')
    var caption = document.querySelector('[data-promo-caption]')
    var toggle = document.querySelector('[data-promo-toggle]')
    if (!video || !caption || !toggle) return
    var chapter = filmChapter(video.currentTime || 0)
    caption.textContent = chapter.text
    var playing = !video.paused && !video.ended
    var label
    if (!playing) {
      label = locale === 'en' ? 'Play' : '播放'
    } else if (video.muted) {
      label = locale === 'en' ? 'Unmute' : '打开声音'
    } else {
      label = locale === 'en' ? 'Pause' : '暂停'
    }
    toggle.textContent = label
    toggle.setAttribute('aria-pressed', playing && !video.muted ? 'true' : 'false')
    video.setAttribute(
      'aria-label',
      locale === 'en' ? 'Sepzok film' : '随造宣传片',
    )
  }

  var promo = document.querySelector('[data-promo]')
  var promoToggle = document.querySelector('[data-promo-toggle]')
  if (promo && promoToggle) {
    promo.addEventListener('timeupdate', syncFilm)
    promo.addEventListener('seeked', syncFilm)
    promo.addEventListener('play', syncFilm)
    promo.addEventListener('pause', syncFilm)
    promo.addEventListener('volumechange', syncFilm)
    promoToggle.addEventListener('click', function () {
      if (promo.paused || promo.muted) {
        promo.muted = false
        var started = promo.play()
        if (started && typeof started.catch === 'function') {
          started.catch(function () {})
        }
      } else {
        promo.pause()
      }
    })
  }

  langLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setLangOpen(false)
    })
  })

  if (region === 'preview') {
    langLinks.forEach(function (link) {
      link.addEventListener('click', function (ev) {
        var next = link.getAttribute('data-lang')
        if (next !== 'zh' && next !== 'en') return
        ev.preventDefault()
        applyLocale(next)
        setLangOpen(false)
      })
    })
    var nav = (navigator.language || '').toLowerCase()
    locale = nav.indexOf('en') === 0 ? 'en' : 'zh'
  }

  var pricingFreq = 'month'

  function syncPricingFrequency() {
    var page = document.querySelector('.pricing-page')
    if (!page) return
    var periodKey =
      pricingFreq === 'year' ? 'pricing_per_year' : 'pricing_per_month'
    page.querySelectorAll('.plan-amount').forEach(function (el) {
      var label = el.getAttribute(
        pricingFreq === 'year' ? 'data-price-year' : 'data-price-month',
      )
      if (label) el.textContent = label
    })
    page.querySelectorAll('.plan-period').forEach(function (el) {
      el.textContent = t(periodKey)
    })
    page.querySelectorAll('.plan-toggle button').forEach(function (btn) {
      var freq = btn.getAttribute('data-freq')
      btn.setAttribute('aria-pressed', freq === pricingFreq ? 'true' : 'false')
    })
    var toggle = page.querySelector('.plan-toggle')
    if (toggle) {
      toggle.setAttribute('aria-label', t('pricing_period'))
    }
  }

  function setupPricingToggle() {
    var page = document.querySelector('.pricing-page')
    if (!page) return
    page.querySelectorAll('.plan-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var freq = btn.getAttribute('data-freq')
        if (freq !== 'month' && freq !== 'year') return
        pricingFreq = freq
        syncPricingFrequency()
      })
    })
    syncPricingFrequency()
  }

  applyLocale(locale)
  setupPricingToggle()

  /**
   * Header brand: idle = real favicon (exact product icon). On load/hover,
   * hide favicon and play morph in a wider overflow-visible frame so S/Z
   * are not clipped; when done, reveal Sepzok/随造 letter-by-letter, then
   * one trailing shine.
   */
  function setupBrandLogoMorph() {
    var brand = document.querySelector('a.brand')
    var mark = brand && brand.querySelector('.brand-mark')
    var name = brand && brand.querySelector('.brand-name')
    if (!brand || !mark || !name) return
    if (name.querySelector('.brand-name-live')) return

    var MARK_H = 28
    var CHAR_STAGGER_MS = 70
    var CHAR_IN_MS = 320
    var SHINE_MS = 1100
    var liveTimer = 0
    /** Full-motion viewBox + CSS size/offset so end icon = 28×28 slot. */
    var playLayout = null

    name.innerHTML =
      '<span class="brand-name-live">' +
      '<span class="brand-name-chars" aria-hidden="true"></span>' +
      '<span class="tm">™</span></span>'

    var live = name.querySelector('.brand-name-live')
    var charsHost = name.querySelector('.brand-name-chars')
    var tmEl = name.querySelector('.tm')

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
    }

    function buildBrandChars(text) {
      var chars = Array.from(String(text || ''))
      var html = ''
      for (var i = 0; i < chars.length; i += 1) {
        html +=
          '<span class="brand-name-char" style="--i:' +
          i +
          '">' +
          escapeHtml(chars[i]) +
          '</span>'
      }
      return { html: html, count: chars.length }
    }

    function syncBrandChars() {
      var built = buildBrandChars(t('brand_name'))
      charsHost.innerHTML = built.html
      if (tmEl) tmEl.style.setProperty('--i', String(built.count))
      name.setAttribute('aria-label', t('brand_name') + '™')
      live.classList.remove('is-revealing', 'is-live', 'is-shown')
    }

    syncBrandNameChars = syncBrandChars
    syncBrandChars()

    function resetNameEntrance() {
      window.clearTimeout(liveTimer)
      live.classList.remove('is-revealing', 'is-live', 'is-shown')
    }

    function playNameEntrance() {
      if (!live) return
      window.clearTimeout(liveTimer)
      live.classList.remove('is-revealing', 'is-live', 'is-shown')
      void live.offsetWidth
      var n = charsHost.querySelectorAll('.brand-name-char').length
      // ™ shares the last stagger slot after the final letter.
      var steps = n + (tmEl ? 1 : 0)
      live.classList.add('is-revealing')
      var revealMs = Math.max(0, steps - 1) * CHAR_STAGGER_MS + CHAR_IN_MS
      liveTimer = window.setTimeout(function () {
        live.classList.add('is-shown')
        live.classList.add('is-live')
        liveTimer = window.setTimeout(function () {
          live.classList.remove('is-live')
          live.classList.remove('is-revealing')
        }, SHINE_MS)
      }, revealMs)
    }

    var favHref = '/favicon.svg?v=20261027a'
    mark.setAttribute('aria-hidden', 'true')
    mark.innerHTML =
      '<img class="brand-mark-static" src="' +
      favHref +
      '" alt="" width="28" height="28" />' +
      '<span class="brand-mark-morph"></span>'

    var morphHost = mark.querySelector('.brand-mark-morph')

    function morphSvg() {
      return morphHost.querySelector('svg.sz-logo-morph')
    }

    /** End pose only (favicon solids) — used to pin scale to the idle slot. */
    function endLogoBBox() {
      var nodes = morphHost.querySelectorAll(
        '[data-layer="s"] path, [data-layer="z"] polygon',
      )
      var minX = Infinity
      var minY = Infinity
      var maxX = -Infinity
      var maxY = -Infinity
      var hit = false
      for (var i = 0; i < nodes.length; i += 1) {
        var el = nodes[i]
        try {
          var op = el.getAttribute('opacity')
          if (op !== null && Number(op) <= 0.01) continue
          var b = el.getBBox()
          if (!b.width && !b.height) continue
          hit = true
          if (b.x < minX) minX = b.x
          if (b.y < minY) minY = b.y
          if (b.x + b.width > maxX) maxX = b.x + b.width
          if (b.y + b.height > maxY) maxY = b.y + b.height
        } catch (err) {
          /* not rendered yet */
        }
      }
      if (!hit) return null
      return { minX: minX, minY: minY, maxX: maxX, maxY: maxY }
    }

    function applyPlayView() {
      var svg = morphSvg()
      if (!svg || !playLayout) return
      svg.setAttribute('viewBox', playLayout.viewBox)
      svg.setAttribute('preserveAspectRatio', 'xMinYMin meet')
      svg.setAttribute('overflow', 'visible')
      svg.style.overflow = 'visible'
      svg.style.width = '100%'
      svg.style.height = '100%'
      // Portal to body + fixed so header backdrop/stacking cannot clip ink.
      var mr = mark.getBoundingClientRect()
      if (morphHost.parentElement !== document.body) {
        document.body.appendChild(morphHost)
      }
      morphHost.style.position = 'fixed'
      morphHost.style.zIndex = '60'
      morphHost.style.width = playLayout.w + 'px'
      morphHost.style.height = playLayout.h + 'px'
      morphHost.style.left = Math.round(mr.left + playLayout.left) + 'px'
      morphHost.style.top = Math.round(mr.top + playLayout.top) + 'px'
    }

    function onPlayViewport() {
      if (!mark.classList.contains('is-playing')) return
      applyPlayView()
    }

    function setPlayingFrame(on) {
      if (on) {
        mark.classList.add('is-playing')
        brand.classList.add('is-playing')
        // mount() may set inline display:block — keep explicit for idle hide.
        morphHost.style.display = 'block'
        applyPlayView()
        window.addEventListener('scroll', onPlayViewport, true)
        window.addEventListener('resize', onPlayViewport)
      } else {
        window.removeEventListener('scroll', onPlayViewport, true)
        window.removeEventListener('resize', onPlayViewport)
        mark.classList.remove('is-playing')
        brand.classList.remove('is-playing')
        morphHost.style.display = 'none'
        morphHost.style.width = ''
        morphHost.style.height = ''
        morphHost.style.left = ''
        morphHost.style.top = ''
        morphHost.style.position = 'absolute'
        morphHost.style.zIndex = ''
        if (morphHost.parentElement !== mark) mark.appendChild(morphHost)
      }
    }

    /**
     * Full design canvas (520×140), scaled/offset so the end favicon pose
     * lands on the 28×28 idle slot. Play layer is fixed on body (unclipped).
     */
    function capturePlayFrame(anim) {
      anim.seek(1)
      var endBox = endLogoBBox()
      var vbX = 0
      var vbY = 0
      var vbW = 520
      var vbH = 140
      if (!endBox) {
        playLayout = { viewBox: '0 0 520 140', w: Math.ceil(MARK_H * (520 / 140)), h: MARK_H, left: 0, top: 0 }
        return
      }
      var endW = Math.max(1, endBox.maxX - endBox.minX)
      var endH = Math.max(1, endBox.maxY - endBox.minY)
      // Match favicon <img>: square 28×28 frame, content letterboxed by max side.
      var scale = MARK_H / Math.max(endW, endH)
      var svgW = Math.ceil(vbW * scale)
      var svgH = Math.ceil(vbH * scale)
      var endLeftPx = (endBox.minX - vbX) * scale
      var endTopPx = (endBox.minY - vbY) * scale
      var endDrawW = endW * scale
      var endDrawH = endH * scale
      var slotX = (MARK_H - endDrawW) / 2
      var slotY = (MARK_H - endDrawH) / 2
      playLayout = {
        viewBox: vbX + ' ' + vbY + ' ' + vbW + ' ' + vbH,
        w: svgW,
        h: svgH,
        left: Math.round(slotX - endLeftPx),
        top: Math.round(slotY - endTopPx),
      }
    }

    brand.classList.add('is-morphing')

    import('/logo-morph/sepzok-logo-morph.js')
      .then(function (mod) {
        var busy = false
        var reduced =
          window.matchMedia &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches

        var anim = mod.mount(morphHost, {
          theme: 'light',
          duration: 2.1,
          hold: 0.35,
          loop: false,
          autoplay: false,
          logoPlacement: 'left',
          onComplete: function () {
            busy = false
            anim.seek(1)
            setPlayingFrame(false)
            brand.classList.remove('is-morphing')
            if (reduced) {
              live.classList.add('is-shown')
            } else {
              playNameEntrance()
            }
          },
        })
        // Overlay on the 28×28 slot (mount must not leave relative flow).
        morphHost.style.position = 'absolute'

        capturePlayFrame(anim)
        anim.seek(0)
        morphHost.style.display = 'none'

        function startPlay() {
          if (busy || reduced) return
          busy = true
          resetNameEntrance()
          brand.classList.add('is-morphing')
          setPlayingFrame(true)
          anim.play()
        }

        if (reduced) {
          setPlayingFrame(false)
          brand.classList.remove('is-morphing')
          live.classList.add('is-shown')
        } else {
          startPlay()
        }

        brand.addEventListener('pointerenter', startPlay)
      })
      .catch(function () {
        brand.classList.remove('is-morphing')
        brand.classList.remove('is-playing')
        mark.classList.remove('is-playing')
        live.classList.add('is-shown')
        if (morphHost) morphHost.remove()
      })
  }

  setupBrandLogoMorph()
})()
