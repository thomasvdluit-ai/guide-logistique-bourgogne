window.dataLayer = window.dataLayer || [];

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
