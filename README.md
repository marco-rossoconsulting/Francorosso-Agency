# Francorosso SA — sito web

Sito dell'agenzia di viaggi Francorosso SA (Lugano), costruito con **Astro 5**,
pubblicato su **Netlify** e gestito dall'agenzia tramite **Sveltia CMS**.

- Lingue: italiano (predefinita, alla radice) e inglese (sotto `/en/`)
- Contenuti: interamente in `src/content/`, un file per lingua
- Nessun testo visibile è scritto dentro un componente: quello che si vede sul
  sito è quello che si modifica nel CMS

---

## Avvio locale

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # serve dist/ in locale
npm run check    # controllo dei tipi
```

Richiede Node 22.

---

## Struttura

```
src/
  content/                 tutti i contenuti, per lingua
    settings/{it,en}/      contatti, orari, menu, etichette ricorrenti
    pages/{it,en}/         testi di ogni pagina, sezione per sezione
    departures/{it,en}/    le partenze di gruppo (una cartella per lingua)
    team/{it,en}/          le schede del team
    legal/{it,en}/         privacy e note legali
    links/{it,en}/         i link utili
  content.config.ts        schema di validazione dei contenuti
  lib/i18n.ts              rotte, slug localizzati, formattazione date e prezzi
  lib/content.ts           accesso ai contenuti per lingua
  components/              header, footer, moduli, schede
  views/                   una vista per tipo di pagina, condivisa fra IT ed EN
  pages/                   rotte reali (IT alla radice, EN sotto /en/)
public/
  admin/                   Sveltia CMS (index.html + config.yml)
  media/                   immagini e PDF caricati dal CMS
```

### Perché `views/` e `pages/` sono separati

Ogni pagina esiste in due lingue con URL diversi (`/servizi/` e `/en/services/`).
I file in `src/pages/` sono guscio di due righe che passano la lingua alla vista
corrispondente. La logica e il markup vivono una sola volta, in `src/views/`.

### Aggiungere una lingua

1. `src/lib/i18n.ts` → aggiungere il codice a `LOCALES` e gli slug in `SLUGS`
2. `astro.config.mjs` → aggiungere la lingua a `i18n.locales` e al sitemap
3. duplicare le cartelle `src/content/*/it/` nella nuova lingua e tradurle
4. creare le rotte sotto `src/pages/<lingua>/`
5. `public/admin/config.yml` → aggiungere il codice a `i18n.locales`

---

## URL

| Italiano | Inglese |
| --- | --- |
| `/` | `/en/` |
| `/le-nostre-partenze/` | `/en/our-departures/` |
| `/le-nostre-partenze/<slug>/` | `/en/our-departures/<slug>/` |
| `/servizi/` | `/en/services/` |
| `/assicurazione-viaggio/` | `/en/travel-insurance/` |
| `/aziende/` | `/en/business-travel-mice/` |
| `/chi-siamo/` | `/en/about-us/` |
| `/contatti/` | `/en/contact/` |
| `/preventivo/` | `/en/request-a-quote/` |
| `/link-utili/` | `/en/useful-links/` |
| `/privacy/`, `/note-legali/` | `/en/privacy/`, `/en/legal-notice/` |
| `/grazie/` | `/en/thank-you/` |

I vecchi indirizzi del sito precedente sono rediretti in `netlify.toml`.

---

## CMS

Il pannello è su **`/admin/`**. Le raccolte sono:

| Raccolta | Cosa contiene |
| --- | --- |
| Impostazioni | Contatti, orari, WhatsApp, social, menu, footer, etichette ricorrenti |
| Pagine | I testi di ogni pagina, sezione per sezione |
| Le nostre partenze | I viaggi di gruppo, con itinerario, quote ed escursioni |
| Il team | Le persone dell'agenzia |
| Privacy e note legali | I due documenti legali |

Ogni voce ha le due lingue affiancate. L'italiano è la lingua di riferimento;
i campi tecnici (indirizzi, e-mail, date, prezzi, file immagine) sono impostati
su `duplicate` e si compilano una volta sola.

Un salvataggio nel CMS è un commit su `main`, e Netlify ricostruisce il sito in
uno o due minuti.

### Accesso al CMS

Sveltia usa GitHub come backend: chi modifica ha bisogno di un account GitHub con
accesso in scrittura al repository. Tre strade, dalla più rapida alla più comoda
per l'agenzia:

**1. Token personale (funziona subito, nessuna configurazione)**
Ogni persona genera un fine-grained personal access token su GitHub con permessi
`Contents: read and write` (e `Pull requests: read and write` se in futuro si
attiva l'editorial workflow), poi su `/admin/` sceglie *Sign In with Token*.
Il token resta nel browser.

**2. Sveltia CMS Authenticator su Cloudflare Workers (consigliata)**
Si registra una GitHub OAuth App e si pubblica
[`sveltia-cms-auth`](https://github.com/sveltia/sveltia-cms-auth) su Cloudflare
Workers (piano gratuito). Poi in `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: marco-rossoconsulting/Francorosso-Agency
  branch: main
  base_url: https://<il-vostro-worker>.workers.dev
```

Da quel momento il pulsante *Sign in with GitHub* funziona per tutti.

**3. Netlify come provider OAuth**
Sveltia usa Netlify come provider predefinito quando `base_url` non è impostato.
Richiede di registrare una GitHub OAuth App e collegarla al sito Netlify dalle
impostazioni di accesso. Funziona, ma dipende da una funzione storica di Netlify:
se non è disponibile sul vostro piano, usate l'opzione 2.

La configurazione attuale non imposta `base_url`, quindi vale l'opzione 3, con
l'opzione 1 sempre disponibile come ripiego immediato.

### Immagini

Il CMS carica in `public/media/`. Le foto vanno caricate già ottimizzate
(larghezza massima consigliata 2000 px, formato WebP o JPEG). I campi immagine
hanno accanto un **brief fotografico**: finché non c'è una foto, il sito mostra
un riquadro con il brief al posto dell'immagine, così si vede subito cosa manca.

---

## Moduli e lead

I moduli usano **Netlify Forms**. Ne esistono cinque, in due lingue:

| Nome del modulo | Dove | Reparto |
| --- | --- | --- |
| `preventivo-it` / `preventivo-en` | Preventivo, pagina di ogni partenza | Leisure |
| `aziende-mice-it` / `aziende-mice-en` | Aziende e MICE | MICE |
| `assicurazione-it` / `assicurazione-en` | Assicurazione viaggio | Assicurazioni |
| `contatti-it` / `contatti-en` | Contatti | Generale |
| `newsletter-it` / `newsletter-en` | Contatti, sezione Seguici e newsletter | Iscrizioni newsletter |

Dopo il primo deploy, in Netlify → *Forms* si imposta una notifica e-mail per
ciascuno, verso la casella del reparto giusto. Ogni invio porta con sé i campi
nascosti `department`, `locale` e `page`, così si sa da dove arriva.

Tutti i moduli hanno honeypot antispam. Le richieste reindirizzano a `/grazie/`
(o `/en/thank-you/`); l'iscrizione newsletter ha una conferma dedicata a
`/newsletter-grazie/` (o `/en/newsletter-thank-you/`). La newsletter raccoglie
indirizzo e-mail e consenso in Netlify Forms; non invia ancora e-mail. Quando si
sceglie un servizio di mailing, esportare gli iscritti dal modulo newsletter o
collegarlo tramite webhook. Le etichette della sezione si modificano in Sveltia
CMS → Pagine → Contatti, mentre gli URL social restano in Impostazioni → Agenzia,
contatti e orari → Social.

---

## Assicurazione viaggio — come attivare la vendita diretta

La pagina è già predisposta per due modalità, commutabili dal CMS senza toccare
il codice (*Pagine → Assicurazione viaggio → Vendita online*):

- **`form`** (attuale): il visitatore compila una richiesta strutturata con date,
  valore del viaggio e copertura desiderata; l'agenzia risponde con la polizza e
  un link di pagamento.
- **`link`**: il pulsante in cima alla pagina porta direttamente al portale di
  acquisto del partner assicurativo, con il codice agenzia nell'indirizzo. A quel
  punto la vendita avviene senza intervento del team.

Per passare alla seconda modalità servono solo il nome del partner e il formato
del link affiliato.

---

## Deploy

Netlify, con `netlify.toml` già nel repository:

- build: `npm run build`
- publish: `dist`
- Node: 22

Da fare al primo collegamento:

1. collegare il repository a un sito Netlify;
2. impostare il dominio `www.francorosso.ch` e il redirect da `francorosso.ch`;
3. configurare le notifiche dei moduli (sopra);
4. verificare che `/admin/` si apra e che il login funzioni.

---

## Marchio

Il logo principale è il wordmark fornito dall'agenzia, usato senza modifiche in
tre varianti di colore generate dall'originale (`public/media/brand/`). La favicon
e le icone applicazione usano il simbolo FR fornito separatamente dall'agenzia.
La comunicazione dell'assicurazione viaggio usa il marchio dedicato fornito
dall'agenzia, esportato in due dimensioni ottimizzate nella stessa cartella.

Colori: Rosso Orizzonte `#B21E23`, Blu Notte `#0E1B2B`, Sabbia Chiara `#F6EFE9`,
Avorio `#F2F2F2`. Caratteri: Inter (testi e interfaccia), Source Serif 4 corsivo
(solo per le citazioni), entrambi ospitati localmente.

---

## Da completare

Vedere `CONTENT-TODO.md`: elenco dei contenuti che devono arrivare dall'agenzia
prima della messa online.
