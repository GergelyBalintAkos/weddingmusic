/* Offer content: Oferta Classis (evenimente corporate).
   Brand: Classis only – the word "Weddingmusic" must not appear anywhere in this offer.
   Text fields are HTML (inline <b>, <a>, <br> allowed). All links point to classis.ro.
   Bump `version` when the content below changes: saved drafts on phones/PCs
   from an older version are then discarded instead of hiding the update. */
(function () {
  var SITE = 'https://www.classis.ro/';
  var REPERTORIU = SITE + 'link-intern-repertoriul-general/';
  var DOTARI = SITE + 'dotari-tehnice.html';

  window.OFFER = {
    id: 'classis',
    version: 1,
    brandName: 'Classis',
    brandSub: '',
    pdfName: 'Oferta-Classis',
    shareTitle: 'Ofertă Classis',
    blocks: [
      { k: 'hello', items: [
        { k: 'to' },
        { k: 'p', h: 'Bună ziua!' },
        { k: 'p', h: 'Conform solicitării dumneavoastră, vă trimitem oferta Classis.' },
        { k: 'p', h: 'Dacă aveți întrebări, nu ezitați să ne contactați.' },
        { k: 'p', h: 'Vă mulțumim!' },
        { k: 'p', h: 'Cu respect,<br><b>Balint GERGELY</b><br><a href="tel:0721262464">0721 262 464</a>' }
      ] },

      { k: 'title', h: 'Ofertă de prețuri Classis', sub: 'Muzică ambientală live pentru evenimente corporate' },

      { k: 'sec', h: 'Oferta include:', items: [
        { k: 'ul', items: [
          'aproximativ 60–80 de minute de muzică ambientală live (trio, cvartet sau cvintet)'
        ] }
      ] },

      { k: 'sec', h: 'Repertoriul formației:', items: [
        { k: 'ul', items: [
          '„cafe-concert”, piese clasice celebre, șlagăre mondiale, jazz melodic, pop, muzică de film și alte piese cunoscute. Repertoriul se stabilește împreună cu organizatorii evenimentului.'
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

      { k: 'sec', h: 'Prețuri:', items: [
        { k: 'prices', rows: [
          ['Trio (trei artiști)', '550 € net'],
          ['Cvartet (patru artiști, inclusiv pian)', '650 € net'],
          ['Cvintet (cinci artiști)', '800 € net'],
          ['Miniorchestră (șase artiști)', 'preț la cerere']
        ] }
      ] },

      { k: 'sec', h: 'Servicii incluse în preț:', items: [
        { k: 'ul', items: [
          'interpretare artistică, consultanță și organizare completă',
          'sonorizarea formației (microfoane pentru instrumente, amplificare, mixer și, la nevoie, boxe)'
        ] },
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
        { k: 'ul', items: ['pentru evenimentele din afara zonei metropolitane Cluj-Napoca: câte un aperitiv rece pentru fiecare artist'] },
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

      { k: 'sec', h: 'Pagina oficială Classis:', items: [
        { k: 'btn', label: 'classis.ro', href: SITE }
      ] },

      { k: 'sec', h: 'Contact:', items: [
        { k: 'p', h: 'tel. <a href="tel:0721262464">0721 262 464</a>' },
        { k: 'p', h: 'e-mail: <a href="mailto:info@classis.ro">info@classis.ro</a>' }
      ] }
    ]
  };
})();
