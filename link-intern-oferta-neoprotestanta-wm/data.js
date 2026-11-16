/* Offer content: Oferta nuntă creștină neoprotestantă WM (program scurt / program întreg).
   Text fields are HTML (inline <b>, <a>, <br> allowed). All links point to classis.ro.
   Bump `version` when the content below changes: saved drafts on phones/PCs
   from an older version are then discarded instead of hiding the update. */
(function () {
  var SITE = 'https://www.classis.ro/';
  var REPERTORIU = SITE + 'link-intern-repertoriul-general/';
  var DOTARI = SITE + 'dotari-tehnice.html';

  window.OFFER = {
    id: 'neoprotestanta-wm',
    version: 2,
    pdfName: 'Oferta-Weddingmusic-Nunta-Neoprotestanta',
    shareTitle: 'Ofertă Weddingmusic – nuntă creștină neoprotestantă',
    blocks: [
      { k: 'hello', items: [
        { k: 'to' },
        { k: 'p', h: 'Bună ziua!' },
        { k: 'p', h: 'Conform solicitării dumneavoastră, vă trimitem oferta Weddingmusic pentru nunta creștină neoprotestantă.' },
        { k: 'p', h: 'Dacă aveți întrebări, nu ezitați să ne contactați.' },
        { k: 'p', h: 'Vă mulțumim!' },
        { k: 'p', h: 'Cu respect,<br><b>Balint GERGELY</b><br><a href="tel:0721262464">0721 262 464</a>' }
      ] },

      { k: 'title', h: 'Ofertă de prețuri Weddingmusic', sub: 'Nuntă creștină neoprotestantă – program scurt sau program întreg' },

      { k: 'sec', h: 'Varianta I: program scurt', items: [
        { k: 'sub', h: 'Muzică ambientală la sosirea invitaților în restaurant' },
        { k: 'ul', items: [
          'interpretare live la sosirea invitaților în restaurant, până la intrarea mirilor',
          'durata reprizei: între 30–40 de minute, în funcție de fiecare eveniment'
        ] },
        { k: 'sub', h: 'O piesă muzicală la intrarea mirilor în restaurant' },
        { k: 'ul', items: [
          'în cazul în care se optează această variantă, piesa este aleasă de miri din repertoriul formației'
        ] },
        { k: 'sub', h: 'Muzică ambientală pe durata aperitivului rece' },
        { k: 'ul', items: [
          'această repriză durează aproximativ 30–40 de minute, în funcție de durata aperitivului'
        ] }
      ] },

      { k: 'sec', h: 'Varianta II: program întreg, pe toată durata evenimentului', items: [
        { k: 'note', h: '(patru sau cinci reprize, la fiecare fel de mâncare)' },
        { k: 'ul', items: [
          'o piesă muzicală la intrarea mirilor în restaurant',
          'muzică ambientală la aperitivul rece (aproximativ 30–40 de minute)',
          'muzică ambientală la aperitivul cald (aproximativ 25–30 de minute)',
          'marș la aducerea ceremonioasă a fripturii (dacă este cazul)',
          'muzică ambientală pe durata fripturii (aproximativ 25–30 de minute)',
          'marș tradițional la aducerea ceremonioasă a tortului',
          'muzică ambientală la tort (aproximativ 30 de minute)'
        ] }
      ] },

      { k: 'sec', h: 'Repertoriul formației:', items: [
        { k: 'ul', items: [
          'piese clasice celebre, șlagăre mondiale elegante, „cafe-concert”, jazz melodic, muzică de film și alte piese cunoscute',
          'imnuri creștine transcrise pentru formație',
          'toate piesele se stabilesc în detaliu împreună cu mirii'
        ] },
        { k: 'btn', label: 'Vizualizați și ascultați repertoriul general al formației', href: REPERTORIU }
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

      { k: 'sec', h: 'Prețuri program scurt / program întreg:', items: [
        { k: 'sub', h: 'Varianta I: program scurt' },
        { k: 'prices', rows: [
          ['Trio (trei artiști)', '600 €'],
          ['Cvartet (patru artiști, inclusiv pian)', '750 €'],
          ['Cvintet (cinci artiști)', '900 €'],
          ['Miniorchestră (șase artiști)', 'preț la cerere']
        ] },
        { k: 'sub', h: 'Varianta II: program întreg' },
        { k: 'prices', rows: [
          ['Trio (trei artiști)', '1300 €'],
          ['Cvartet (patru artiști, inclusiv pian)', '1600 €'],
          ['Cvintet (cinci artiști)', '1900 €'],
          ['Miniorchestră (șase artiști)', 'preț la cerere']
        ] },
        { k: 'note', h: '(Oferta pentru sonorizarea completă a evenimentului o găsiți mai jos, la secțiunea „Servicii suplimentare”.)' }
      ] },

      { k: 'sec', h: 'Servicii incluse în preț:', items: [
        { k: 'ul', items: [
          'interpretare artistică',
          'sonorizarea formației pe durata interpretării (microfoane pentru instrumente, amplificare, mixer)'
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
        { k: 'ul', items: ['câte un aperitiv rece (program scurt) sau meniul complet (program întreg) pentru fiecare artist'] },
        { k: 'sub', h: 'Cazare:' },
        { k: 'ul', items: ['nu este necesară'] }
      ] },

      { k: 'sec', h: 'Servicii suplimentare (contra cost):', items: [
        { k: 'sub', h: 'Sonorizarea completă a evenimentului' },
        { k: 'ul', items: [
          '2–6 boxe, după caz',
          'mixer, amplificare',
          'microfoane pentru instrumente',
          'microfoane de voce pentru anunțuri',
          'muzică de pe laptop în pauze'
        ] },
        { k: 'prices', rows: [
          ['Preț total', '300–500 €']
        ] },
        { k: 'note', h: '(în funcție de dimensiunea sălii și de numărul invitaților)' }
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
