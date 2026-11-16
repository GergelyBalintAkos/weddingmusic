/* Offer content: Oferta standard WM.
   Text fields are HTML (inline <b>, <a>, <br> allowed). All links point to classis.ro.
   Bump `version` when the content below changes: saved drafts on phones/PCs
   from an older version are then discarded instead of hiding the update. */
(function () {
  var SITE = 'https://www.classis.ro/';
  var REPERTORIU = SITE + 'link-intern-repertoriul-general/';
  var DOTARI = SITE + 'dotari-tehnice.html';

  window.OFFER = {
    id: 'standard-wm',
    version: 1,
    pdfName: 'Oferta-Weddingmusic',
    shareTitle: 'Ofertă Weddingmusic',
    blocks: [
      { k: 'hello', items: [
        { k: 'p', h: 'Bună ziua<span data-name></span>!' },
        { k: 'p', h: 'Conform solicitării Dvs. vă trimitem oferta Weddingmusic.' },
        { k: 'p', h: 'Dacă doriți să optați pentru una dintre formațiile noastre, vă recomandăm să discutăm ca să vă oferim mai multe informații în legătură cu detalii tehnice (amplificarea, sonorizarea formației), artistice (repertoriul formației, melodiile alese, componența pe instrumente etc.) și un desfășurător recomandat pentru eveniment.' },
        { k: 'p', h: 'Dacă aveți întrebări, vă rog să mă sunați. Dacă nu pot răspunde, vă sun înapoi în cel mai scurt timp posibil.' },
        { k: 'p', h: 'Vă mulțumim!' },
        { k: 'p', h: 'Cu respect,<br><b>Balint GERGELY</b><br><a href="tel:0721262464">0721 262 464</a>' }
      ] },

      { k: 'title', h: 'Ofertă de prețuri Weddingmusic', sub: 'Muzică ambientală la sosirea invitaților și pe durata aperitivului' },

      { k: 'sec', h: 'Conține:', items: [
        { k: 'sub', h: 'Muzică ambientală la sosirea invitaților în restaurant' },
        { k: 'ul', items: [
          'interpretare artistică la sosirea invitaților în restaurant',
          'începerea interpretării: când se adună în jur de 20-25% dintre invitați',
          'durata reprizei: între 30-40 minute în funcție de fiecare eveniment'
        ] },
        { k: 'sub', h: 'Marșul nupțial la intrarea mirilor în restaurant' },
        { k: 'ul', items: [
          'în cazul în care se alege această opțiune, piesa va fi selectată de către miri din repertoriul formației'
        ] },
        { k: 'sub', h: 'Muzică ambientală pe durata aperitivului rece' },
        { k: 'ul', items: [
          'această repriză durează apr. 30-40 minute în funcție de durata aperitivului'
        ] }
      ] },

      { k: 'sec', h: 'Repertoriul formației:', items: [
        { k: 'ul', items: [
          '„cafe-concert”, piese clasice celebre, șlagăre mondiale, jazz melodic, pop, muzică de film și alte piese cunoscute. Repertoriul se va stabili cu mirii.'
        ] },
        { k: 'btn', label: 'Apăsați aici pentru vizualizarea și ascultarea repertoriului formației', href: REPERTORIU }
      ] },

      { k: 'sec', h: 'Formații:', items: [
        { k: 'rows', rows: [
          ['Trio (trei artiști)', 'două viori + pian'],
          ['Cvartet inclus pian (patru artiști)', 'două viori, violă sau violoncel + pian'],
          ['Cvintet (cinci artiști)', 'două viori, violă, violoncel + pian'],
          ['Miniorchestră (șase artiști)', 'două viori, violă, vcel, contrabas + pian']
        ] },
        { k: 'note', h: '(Pianul este digital profesional și este inclus în preț. La solicitarea clientului se poate solicita și pian cu coadă lungă, acesta se închiriază separat)' }
      ] },

      { k: 'sec', h: 'Prețuri masa festivă:', items: [
        { k: 'prices', rows: [
          ['Trio (trei artiști)', '550 euro'],
          ['Cvartet inclus pian (patru artiști)', '650 euro'],
          ['Cvintet (cinci artiști)', '800 euro'],
          ['Miniorchestră (șase artiști)', '-']
        ] }
      ] },

      { k: 'sec', h: 'Servicii incluse în preț:', items: [
        { k: 'ul', items: [
          'interpretare artistică, consultanță și organizare completă',
          'sonorizarea formației (microfoane pt. instrumente, amplificator, mixer, la nevoie și boxe)'
        ] },
        { k: 'note', h: '(Recomandăm să stabilim acest capitol împreună cu mirii și DJ, deoarece sonorizarea proprie a formației este condiția calității prestației artistice pentru fiecare sală în parte)' },
        { k: 'btn', label: 'Dotări, sonorizare – vezi detaliile', href: DOTARI }
      ] },

      { k: 'sec', h: 'Costuri suplimentare:', items: [
        { k: 'sub', h: 'Cheltuieli de transport:' },
        { k: 'p', h: '<b>Pentru zona metropolitană Cluj-Napoca:</b> nu este cazul' },
        { k: 'p', h: '<b>Pentru alte orașe:</b>' },
        { k: 'ul', items: [
          'combustibil dus-întors din Cluj-Napoca',
          'Trio/cvartet: 1 RON/KM',
          'Cvintet: 2 RON/KM'
        ] },
        { k: 'sub', h: 'Masă:' },
        { k: 'ul', items: ['câte un aperitiv rece pentru fiecare artist'] },
        { k: 'sub', h: 'Cazare:' },
        { k: 'ul', items: ['nu este cazul'] }
      ] },

      { k: 'sec', h: 'Valabilitatea ofertei:', items: [
        { k: 'ul', items: ['în limita disponibilității'] },
        { k: 'note', h: '(rezervările se fac în ordinea confirmărilor de către solicitanți)' }
      ] },

      { k: 'sec', h: 'Condiții obligatorii în cazul prestațiilor în aer liber:', items: [
        { k: 'ul', items: [
          'condiții de temperatură optimă',
          'terasă acoperită sau cort în cazul în care soarele bate direct pe instrumente',
          'terasă acoperită sau cort în caz de ploaie/vreme ploioasă'
        ] }
      ] },

      { k: 'sec', h: 'Pagina oficială Weddingmusic:', items: [
        { k: 'btn', label: 'classis.ro', href: SITE }
      ] },

      { k: 'sec', h: 'Contact:', items: [
        { k: 'p', h: 'tel. <a href="tel:0721262464">0721 262 464</a>' },
        { k: 'p', h: 'e-mail: <a href="mailto:info@classis.ro">info@classis.ro</a>' }
      ] }
    ]
  };
})();
