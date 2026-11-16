/* Offer content: Oferta ceremonie religioasă + masa festivă WM.
   Text fields are HTML (inline <b>, <a>, <br> allowed). All links point to classis.ro.
   Bump `version` when the content below changes: saved drafts on phones/PCs
   from an older version are then discarded instead of hiding the update. */
(function () {
  var SITE = 'https://www.classis.ro/';
  var REPERTORIU = SITE + 'link-intern-repertoriul-general/';
  var DOTARI = SITE + 'dotari-tehnice.html';

  window.OFFER = {
    id: 'ceremonie-masa-wm',
    version: 2,
    pdfName: 'Oferta-Weddingmusic-Ceremonie-Masa',
    shareTitle: 'Ofertă Weddingmusic – ceremonia religioasă și masa festivă',
    blocks: [
      { k: 'hello', items: [
        { k: 'to' },
        { k: 'p', h: 'Bună ziua!' },
        { k: 'p', h: 'Conform solicitării dumneavoastră, vă trimitem oferta Weddingmusic pentru ceremonia religioasă și masa festivă.' },
        { k: 'p', h: 'Dacă aveți întrebări, nu ezitați să ne contactați.' },
        { k: 'p', h: 'Vă mulțumim!' },
        { k: 'p', h: 'Cu respect,<br><b>Balint GERGELY</b><br><a href="tel:0721262464">0721 262 464</a>' }
      ] },

      { k: 'title', h: 'Ofertă de prețuri Weddingmusic', sub: 'Ceremonia religioasă și muzică ambientală la masa festivă' },

      { k: 'sec', h: 'Oferta include:', items: [
        { k: 'sub', h: 'Ceremonia religioasă (înainte de masa festivă)' },
        { k: 'ul', items: [
          'aproximativ 15 minute de muzică live la sosirea invitaților',
          'marșul nupțial sau o altă piesă muzicală la intrarea miresei/mirilor'
        ] },
        { k: 'sub', h: 'Muzică ambientală la sosirea invitaților în restaurant' },
        { k: 'ul', items: [
          'interpretare live la sosirea invitaților în restaurant, până la intrarea mirilor',
          'începerea interpretării: când sosesc aproximativ 20–25% dintre invitați',
          'durata reprizei: între 30–40 de minute, în funcție de fiecare eveniment'
        ] },
        { k: 'sub', h: 'O piesă muzicală la intrarea mirilor în restaurant' },
        { k: 'ul', items: [
          'în cazul în care se optează această variantă, piesa este aleasă de miri din repertoriul formației'
        ] },
        { k: 'sub', h: 'Muzică ambientală pe durata aperitivului rece' },
        { k: 'ul', items: [
          'această repriză durează aproximativ 30–40 de minute, în funcție de durata aperitivului, până la dansul mirilor'
        ] }
      ] },

      { k: 'sec', h: 'Repertoriul formației:', items: [
        { k: 'ul', items: [
          '„cafe-concert”, piese clasice celebre, șlagăre mondiale, jazz melodic, pop, muzică de film și alte piese cunoscute. Repertoriul se stabilește împreună cu mirii.'
        ] },
        { k: 'btn', label: 'Vizualizați și ascultați repertoriul formației', href: REPERTORIU }
      ] },

      { k: 'sec', h: 'Formații:', items: [
        { k: 'rows', rows: [
          ['Trio (trei artiști)', 'două viori + pian'],
          ['Cvartet (patru artiști, inclusiv pian)', 'două viori, violă sau violoncel + pian'],
          ['Cvintet (cinci artiști)', 'două viori, violă, violoncel + pian'],
          ['Miniorchestră (șase artiști)', 'două viori, violă, violoncel, contrabas + pian']
        ] },
        { k: 'note', h: '(Pianul este digital profesional și este inclus în preț. La cerere, se poate asigura și pian cu coadă, închiriat separat.)' }
      ] },

      { k: 'sec', h: 'Prețuri masa festivă:', items: [
        { k: 'prices', rows: [
          ['Trio (trei artiști)', '550 €'],
          ['Cvartet (patru artiști, inclusiv pian)', '650 €'],
          ['Cvintet (cinci artiști)', '800 €'],
          ['Miniorchestră (șase artiști)', 'preț la cerere']
        ] }
      ] },

      { k: 'sec', h: 'Preț ceremonia religioasă (înainte de masa festivă):', items: [
        { k: 'prices', rows: [
          ['Ceremonia religioasă', '+ 150–250 €']
        ] },
        { k: 'note', h: '(preț total, în funcție de numărul artiștilor)' }
      ] },

      { k: 'sec', h: 'Servicii incluse în preț:', items: [
        { k: 'ul', items: [
          'interpretare artistică, consultanță și organizare completă',
          'sonorizarea formației (microfoane pentru instrumente, amplificare, mixer și, la nevoie, boxe)'
        ] },
        { k: 'note', h: '(Recomandăm să stabilim acest aspect împreună cu mirii și cu DJ-ul, deoarece sonorizarea proprie a formației garantează calitatea prestației artistice în fiecare sală.)' },
        { k: 'btn', label: 'Dotări tehnice și sonorizare – vedeți detaliile', href: DOTARI }
      ] },

      { k: 'sec', h: 'Costuri suplimentare:', items: [
        { k: 'sub', h: 'Cheltuieli de transport:' },
        { k: 'p', h: '<b>Pentru zona metropolitană Cluj-Napoca:</b> nu este cazul' },
        { k: 'p', h: '<b>Pentru alte orașe:</b>' },
        { k: 'ul', items: [
          'combustibil dus-întors din Cluj-Napoca',
          'Trio/cvartet: 1 RON/km',
          'Cvintet: 2 RON/km'
        ] },
        { k: 'sub', h: 'Masă:' },
        { k: 'ul', items: ['câte un aperitiv rece pentru fiecare artist'] },
        { k: 'sub', h: 'Cazare:' },
        { k: 'ul', items: ['se stabilește de la caz la caz'] }
      ] },

      { k: 'sec', h: 'Valabilitatea ofertei:', items: [
        { k: 'ul', items: ['în limita disponibilității'] },
        { k: 'note', h: '(rezervările se iau în considerare în ordinea confirmărilor primite)' }
      ] },

      { k: 'sec', h: 'Condiții obligatorii în cazul prestațiilor în aer liber:', items: [
        { k: 'ul', items: [
          'temperatură optimă pentru instrumente',
          'terasă acoperită sau cort, dacă soarele bate direct pe instrumente',
          'terasă acoperită sau cort în caz de ploaie sau vreme instabilă'
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
