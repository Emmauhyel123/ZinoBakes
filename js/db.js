/* ---------------------------------------------------------------
   DATABASE: sends the order inquiry form to Supabase.
   All page content stays in index.html. This file only talks to the database.
---------------------------------------------------------------- */
(function () {
  const form = document.getElementById('inquiry-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  const cfg = window.SITE_CONFIG || {};
  const configured = cfg.SUPABASE_URL && cfg.SUPABASE_KEY &&
    !cfg.SUPABASE_URL.startsWith('PASTE') && !cfg.SUPABASE_KEY.startsWith('PASTE');

  function say(msg, ok) {
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'ok' : 'err');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!configured) {
      say('The form is not connected yet. Add your keys in js/config.js.', false);
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    const row = {
      name: data.name,
      email: data.email,
      type: data.type,
      needed_by: data.needed_by || null,
      message: data.message,
    };
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    say('Sending...', true);
    try {
      const res = await fetch(`${cfg.SUPABASE_URL}/rest/v1/${cfg.TABLE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: cfg.SUPABASE_KEY,
          Authorization: `Bearer ${cfg.SUPABASE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(row),
      });
      if (!res.ok) throw new Error(await res.text());
      form.reset();
      say('Thank you! Your inquiry was received. We reply within two working days.', true);
    } catch (err) {
      console.error(err);
      say('Something went wrong sending your inquiry. Please try again.', false);
    } finally {
      btn.disabled = false;
    }
  });
})();
