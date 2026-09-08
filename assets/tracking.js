window.dataLayer = window.dataLayer || [];

function updateAnalyticsConsent(value) {
  localStorage.setItem('analytics_consent', value);
  if (typeof gtag === 'function') {
    gtag('consent', 'update', {analytics_storage: value});
  }
  if (value === 'granted') {
    window.dataLayer.push({event: 'analytics_consent_granted'});
  }
}

function openConsentPanel() {
  document.getElementById('cookie-banner').hidden = false;
}

var consentBanner = document.createElement('section');
consentBanner.id = 'cookie-banner';
consentBanner.className = 'cookie-banner';
consentBanner.setAttribute('aria-label', 'Choix des cookies');
consentBanner.innerHTML = '<div><strong>Mesure d’audience</strong><p>Ce site expérimental utilise GA4 uniquement avec votre accord afin de mesurer la navigation. <a href="a-propos.html">En savoir plus</a>.</p></div><div class="cookie-actions"><button type="button" class="cookie-refuse">Refuser</button><button type="button" class="button cookie-accept">Accepter</button></div>';
document.body.appendChild(consentBanner);

var consentSettings = document.createElement('button');
consentSettings.type = 'button';
consentSettings.className = 'cookie-settings';
consentSettings.textContent = 'Gérer les cookies';
consentSettings.addEventListener('click', openConsentPanel);
document.body.appendChild(consentSettings);

if (localStorage.getItem('analytics_consent')) {
  consentBanner.hidden = true;
}

consentBanner.querySelector('.cookie-accept').addEventListener('click', function () {
  updateAnalyticsConsent('granted');
  consentBanner.hidden = true;
});

consentBanner.querySelector('.cookie-refuse').addEventListener('click', function () {
  updateAnalyticsConsent('denied');
  consentBanner.hidden = true;
});

document.querySelectorAll('[data-track]').forEach(function (element) {
  element.addEventListener('click', function () {
    window.dataLayer.push({
      event: 'cta_click',
      cta_name: element.dataset.track,
      page_path: window.location.pathname
    });
  });
});

var form = document.getElementById('diagnostic-form');
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    window.dataLayer.push({event: 'generate_lead', form_name: 'diagnostic_logistique'});
    document.getElementById('form-result').hidden = false;
  });
}

var milestones = [25, 50, 75, 90];
var sent = {};
window.addEventListener('scroll', function () {
  var height = document.documentElement.scrollHeight - window.innerHeight;
  if (height <= 0) return;
  var percentage = Math.round((window.scrollY / height) * 100);
  milestones.forEach(function (milestone) {
    if (percentage >= milestone && !sent[milestone]) {
      sent[milestone] = true;
      window.dataLayer.push({event: 'scroll_depth', scroll_percent: milestone});
    }
  });
}, {passive: true});
