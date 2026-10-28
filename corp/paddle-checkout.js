/**
 * Corp pricing checkout launchers.
 *
 * Live Paddle.js only opens on approved checkout domains. Official rule:
 * host must match an approved domain exactly (or its www.); a subdomain like
 * en.example.com needs its own Website approval even if example.com is approved.
 * See https://developer.paddle.com/build/transactions/default-payment-link
 * and Paddle > My account > Settings > Website approval.
 *
 * Approved today: pay.sepzok.com, sepzok.com. en.sepzok.com is not approved, so
 * English Subscribe redirects to pay (overlay there). Chinese → WeChat / Alipay.
 */
;(function () {
  var PAY_EN = 'https://pay.sepzok.com/en/pricing'
  var PAY_ZH = 'https://pay.sepzok.com/pricing'

  function locale() {
    return document.documentElement.lang === 'en' ? 'en' : 'zh'
  }

  function freq() {
    var pressed = document.querySelector(
      '.pricing-page .plan-toggle button[aria-pressed="true"]',
    )
    var f = pressed && pressed.getAttribute('data-freq')
    return f === 'year' ? 'year' : 'month'
  }

  function openPaid(tier) {
    if (locale() !== 'en') {
      window.location.href = PAY_ZH
      return
    }
    var name = encodeURIComponent(tier || '')
    var period = encodeURIComponent(freq())
    window.location.href =
      PAY_EN + '?checkout=' + name + '&freq=' + period
  }

  function bind() {
    var page = document.querySelector('.pricing-page')
    if (!page) return
    page.querySelectorAll('[data-checkout-paid]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openPaid(btn.getAttribute('data-tier') || '')
      })
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind)
  } else {
    bind()
  }
})()
