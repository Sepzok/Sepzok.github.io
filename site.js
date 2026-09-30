(function () {
  var STORAGE_KEY = 'sepzok-pages-lang'
  var COPY = {
    zh: {
      title: '随造 Sepzok',
      lede: '下载尚未开放',
      description: '随造 Sepzok（原造格 Sepzap）。下载尚未开放。',
    },
    en: {
      title: 'Sepzok',
      lede: 'Downloads are not open yet',
      description: 'Sepzok (formerly Sepzap). Downloads are not open yet.',
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

  function applyLocale(next) {
    locale = next === 'en' ? 'en' : 'zh'
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN'
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n')
      if (!key || !COPY[locale][key]) return
      el.textContent = COPY[locale][key]
    })
    var meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', COPY[locale].description)
    langButtons.forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === locale
      btn.classList.toggle('is-on', active)
      btn.setAttribute('aria-pressed', active ? 'true' : 'false')
    })
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = btn.getAttribute('data-lang')
      if (next === 'zh' || next === 'en') applyLocale(next)
    })
  })

  applyLocale(detectLocale())
})()
