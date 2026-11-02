/* ---------------------------------------------------------------
   DATABASE: saves the order inquiry to Supabase, then (optionally)
   offers a WhatsApp message to the bakery with the same details.
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

  function whatsappLink(row) {
    const num = (cfg.WHATSAPP_NUMBER || '').replace(/\D/g, '');
    if (!num) return null;
    const text = [
      'Hello Zino Bakes, I just sent an inquiry from your website.',
      '',
      'Name: ' + row.name,
      row.phone ? 'Phone: ' + row.phone : null,
      row.email ? 'Email: ' + row.email : null,
      'Need: ' + (row.type || '-'),
      row.needed_by ? 'Date needed: ' + row.needed_by : null,
      'Details: ' + row.message,
    ].filter(Boolean).join('\n');
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!configured) {
      say('The form is not connected yet. Add your keys in js/config.js.', false);
      return;
    }
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form));
    const row = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
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

      const wa = whatsappLink(row);
      form.reset();
      status.className = 'form-status ok';
      status.textContent = 'Thank you! Your inquiry was received. We reply within two working days. ';
      if (wa) {
        const a = document.createElement('a');
        a.href = wa;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = 'Want a faster reply? Message us on WhatsApp';
        status.appendChild(a);
      }
    } catch (err) {
      console.error(err);
      say('Something went wrong sending your inquiry. Please try again.', false);
    } finally {
      btn.disabled = false;
    }
  });
})();
