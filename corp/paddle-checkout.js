/**
 * Corp pricing: English Subscribe opens Paddle overlay on this page.
 * Chinese Subscribe goes to pay.sepzok.com (WeChat / Alipay) — no Paddle there.
 * Client token is public by design (same class as NEXT_PUBLIC_PADDLE_CLIENT_TOKEN).
 */
;(function () {
  var TOKEN = 'live_b2b52b31445a4592625296d6a97'
  var ENV = 'production'
  var SUCCESS_URL = 'https://pay.sepzok.com/en/welcome'
  var PAY_ZH = 'https://pay.sepzok.com/pricing'
  var HEALTH =
    'https://pskysikkwduowufzynkn.supabase.co/functions/v1/sepzok-api-live/health'

  var PRICE_IDS = {
    Starter: {
      month: 'pri_01m5pxhzz3b41cb2ehdz1y134t',
      year: 'pri_01m5pxj082nygz6gh5cjmt3a6r',
    },
    Pro: {
      month: 'pri_01m5pxj19yj479r3fvqrzdqx52',
      year: 'pri_01m5pxj1kzedsda5df1dn7zmdp',
    },
    Advanced: {
      month: 'pri_01m5pxj29aanfzdxqw2mpsjda6',
      year: 'pri_01m5pxj2jk2q583gwb7mwdyvnq',
    },
  }

  var paddle = null
  var initPromise = null
  var initError = null

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

  function setBusy(busy) {
    document.querySelectorAll('[data-checkout-paid]').forEach(function (btn) {
      btn.disabled = !!busy
    })
  }

  function showError(message) {
    var note = document.querySelector('.pricing-page .pricing-checkout-error')
    if (!note) {
      note = document.createElement('p')
      note.className = 'pricing-checkout-error page-alert'
      note.setAttribute('role', 'alert')
      var grid = document.querySelector('.pricing-page .plan-grid')
      if (grid && grid.parentNode) {
        grid.parentNode.insertBefore(note, grid.nextSibling)
      }
    }
    note.hidden = !message
    note.textContent = message || ''
  }

  function loadPaddleScript() {
    return new Promise(function (resolve, reject) {
      if (window.Paddle) {
        resolve(window.Paddle)
        return
      }
      var s = document.createElement('script')
      s.src = 'https://cdn.paddle.com/paddle/v2/paddle.js'
      s.async = true
      s.onload = function () {
        if (window.Paddle) resolve(window.Paddle)
        else reject(new Error('Paddle.js loaded without Paddle global'))
      }
      s.onerror = function () {
        reject(new Error('Paddle.js failed to load'))
      }
      document.head.appendChild(s)
    })
  }

  function ensurePaddle() {
    if (paddle) return Promise.resolve(paddle)
    if (initError) return Promise.reject(initError)
    if (initPromise) return initPromise
    initPromise = loadPaddleScript()
      .then(function (Paddle) {
        if (ENV === 'sandbox' && Paddle.Environment) {
          Paddle.Environment.set('sandbox')
        }
        Paddle.Initialize({ token: TOKEN })
        paddle = Paddle
        return paddle
      })
      .catch(function (err) {
        initError = err
        initPromise = null
        throw err
      })
    return initPromise
  }

  function assertLiveHealth() {
    return fetch(HEALTH, { credentials: 'omit' })
      .then(function (res) {
        return res.json().then(function (data) {
          if (!res.ok || !data || data.paddleEnv !== 'production') {
            throw new Error(
              locale() === 'en'
                ? 'Checkout is not ready. Try again later.'
                : '结账暂不可用，请稍后再试。',
            )
          }
        })
      })
      .catch(function (err) {
        if (err && err.message && /Checkout|结账/.test(err.message)) throw err
        throw new Error(
          locale() === 'en'
            ? 'Checkout service unreachable. Try again later.'
            : '结账服务连不上，请稍后再试。',
        )
      })
  }

  function openPaid(tier) {
    showError('')
    if (locale() !== 'en') {
      window.location.href = PAY_ZH
      return
    }
    var ids = PRICE_IDS[tier]
    if (!ids) {
      showError('Unknown plan.')
      return
    }
    var priceId = ids[freq()]
    setBusy(true)
    assertLiveHealth()
      .then(function () {
        return ensurePaddle()
      })
      .then(function (Paddle) {
        Paddle.Checkout.open({
          items: [{ priceId: priceId, quantity: 1 }],
          settings: {
            displayMode: 'overlay',
            theme: 'light',
            successUrl: SUCCESS_URL,
          },
        })
      })
      .catch(function (err) {
        showError(err instanceof Error ? err.message : String(err))
      })
      .finally(function () {
        setBusy(false)
      })
  }

  function bind() {
    var page = document.querySelector('.pricing-page')
    if (!page) return
    page.querySelectorAll('[data-checkout-paid]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openPaid(btn.getAttribute('data-tier') || '')
      })
    })
    // Warm Paddle on English so the first click is faster.
    if (locale() === 'en') {
      ensurePaddle().catch(function () {})
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind)
  } else {
    bind()
  }
})()
