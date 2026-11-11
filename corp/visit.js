(function () {
  try {
    var host = location.hostname || ''
    if (host === 'localhost' || host === '127.0.0.1') return
    var api =
      'https://zaoget-d0g73jxxefd6ba387-1478755746.ap-shanghai.app.tcloudbase.com'
    if (host.endsWith('.tcloudbaseapp.com')) {
      api =
        location.protocol +
        '//' +
        host.replace('.tcloudbaseapp.com', '.ap-shanghai.app.tcloudbase.com')
    }
    var lang = (document.documentElement.lang || '').toLowerCase()
    var body = JSON.stringify({
      path: location.pathname || '/',
      locale: lang.indexOf('en') === 0 ? 'en' : 'zh',
      ref: document.referrer || '',
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
