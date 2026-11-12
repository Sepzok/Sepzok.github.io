(function () {
  try {
    var host = location.hostname || ''
    if (host === 'localhost' || host === '127.0.0.1') return

    // Honour GPC / DNT: skip the page-open record. No first-party cookies.
    var nav = typeof navigator !== 'undefined' ? navigator : null
    if (nav) {
      if (nav.globalPrivacyControl === true) return
      if (nav.doNotTrack === '1' || nav.doNotTrack === 'yes') return
      if (nav.msDoNotTrack === '1') return
    }

    // 中文站 → 境内 API；英文站 → 境外 Edge（各自的库，互不混写）
    var cnApi =
      'https://zaoget-d0g73jxxefd6ba387-1478755746.ap-shanghai.app.tcloudbase.com'
    var enApi = 'https://pskysikkwduowufzynkn.supabase.co/functions/v1/sepzok-api'
    var api = cnApi
    if (host === 'en.sepzok.com') {
      api = enApi
    } else if (host.endsWith('.tcloudbaseapp.com')) {
      api =
        location.protocol +
        '//' +
        host.replace('.tcloudbaseapp.com', '.ap-shanghai.app.tcloudbase.com')
    }

    var ref = ''
    try {
      if (document.referrer) {
        var refHost = new URL(document.referrer).hostname
          .toLowerCase()
          .replace(/^www\./, '')
        if (refHost && /^[a-z0-9.-]+$/.test(refHost) && refHost.length <= 80) {
          // Host only — no path or query in transit. Server stores the same host.
          ref = 'https://' + refHost + '/'
        }
      }
    } catch (e) {}

    var lang = (document.documentElement.lang || '').toLowerCase()
    var body = JSON.stringify({
      path: location.pathname || '/',
      locale: lang.indexOf('en') === 0 ? 'en' : 'zh',
      ref: ref,
    })
    fetch(api + '/v1/site/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
      keepalive: true,
      credentials: 'omit',
      mode: 'cors',
    }).catch(function () {})
  } catch (e) {}
})()
