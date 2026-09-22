# Da completare prima della messa online

Elenco onesto di ciò che nel sito è ancora provvisorio, e di chi deve fornirlo.
Ogni voce indica dove si modifica nel CMS.

---

## 1. Dati da confermare (bloccanti)

| Cosa | Stato attuale | Dove nel CMS |
| --- | --- | --- |
| **Orari di apertura** | Inseriti orari plausibili (Lu–Ve 09.00–12.00 / 14.00–18.00, Sa su appuntamento). **Non confermati dall'agenzia.** | Impostazioni → Agenzia, contatti e orari |
| **Numero WhatsApp** | +41 76 577 60 92, indicato da Nadia come numero dell'agenzia in via di conversione ad account Business. Verificare che sia attivo prima del lancio. | Impostazioni → Agenzia → WhatsApp |
| **Numero IDE / UID** | Segnaposto nelle note legali. | Privacy e note legali → Note legali |
| **Affiliazioni** (es. garanzia fondo di garanzia, associazioni di categoria) | Campo vuoto: se l'agenzia aderisce a qualcosa, compare nel footer. | Impostazioni → Agenzia → Riconoscimenti |

Il numero "30+ anni" e "6 consulenti" in home derivano dal sito attuale e dalla
pagina contatti: confermare che siano ancora corretti.

---

## 2. Fotografie

Il sito è costruito perché la mancanza di foto si veda e non si nasconda: dove
manca un'immagine compare un riquadro con il **brief fotografico**. Servono, in
ordine di importanza:

1. **Home, apertura** — orizzontale: il team al lavoro su un itinerario, luce
   naturale, non in posa.
2. **Team, sei ritratti** — verticale, stesso trattamento per tutti, in agenzia.
   Nadia ha scritto che le foto in agenzia si faranno appena possibile.
3. **Chi siamo, apertura** — verticale: l'agenzia in Via Canova.
4. **Home, "perché sceglierci"** — verticale: la vetrina o l'ingresso.
5. **Aziende e MICE** — orizzontale: sala riunioni o cena aziendale allestita.

Formato consigliato: WebP o JPEG, larghezza massima 2000 px, sotto i 300 KB.

### Licenze — da chiarire

Nella corrispondenza l'agenzia ha indicato che alcune immagini sono state prese
online **senza licenza**. Non ne è stata usata nessuna. Le fotografie presenti
sulla pagina della crociera sul Danubio provengono dal programma dell'operatore
(Giver Viaggi): sono materiale commerciale del prodotto che Francorosso rivende,
ma vale la pena avere una conferma scritta dall'operatore prima del lancio.

Per il resto: Unsplash e Pexels sono utilizzabili, purché le immagini siano
scaricate dall'account dell'agenzia e non siano riconoscibili come stock
generico — il manuale di marca chiede esplicitamente "prospettiva, non
cartolina".

---

## 3. Testi del team

Le presentazioni delle sei persone sono scritte a partire dal ruolo pubblico,
non da informazioni fornite dall'agenzia. Berenice si era presa in carico la
sezione "Meet Your Agents": quando arrivano le sue versioni, sostituirle.

Mancano anche le **lingue parlate** da ciascuno: è un'informazione che converte,
soprattutto per la clientela internazionale, e il campo è già pronto e vuoto.

*Il team → ogni persona → Presentazione / Lingue parlate*

---

## 4. Le nostre partenze

È pubblicata **una sola partenza**: Mercatini di Natale sul Danubio, 16–20
dicembre 2026, ricostruita integralmente dal programma in PDF (itinerario,
quote, escursioni facoltative, informazioni sulla nave, riduzioni).

Nadia ha scritto che le proposte per il 2027 sono in lavorazione. Appena
arrivano vanno inserite: la pagina dell'elenco è già costruita per gestire
filtri per categoria e si adatta da una a molte partenze.

**Da verificare sulla partenza già inserita:**
- l'opzione sul viaggio era "fino al 15 settembre": confermare che la partenza
  sia ancora commercializzata prima di pubblicare il sito;
- le quote sono in euro come nel programma dell'operatore. Se l'agenzia vende in
  franchi, cambiare valuta e importi.

*Le nostre partenze → nuova partenza*

---

## 5. Assicurazione viaggio

La pagina è completa e funzionante in modalità **richiesta**: il visitatore manda
date, valore del viaggio e copertura desiderata, l'agenzia risponde con polizza e
link di pagamento.

Per arrivare all'obiettivo dichiarato — margine alto, zero tempo amministrativo —
serve il passaggio alla modalità **link**: il pulsante porta direttamente al
portale del partner assicurativo con il codice agenzia. Servono due informazioni:

1. con quale compagnia lavora l'agenzia (ERV, Allianz Travel, TravelSafe, altro);
2. se quella compagnia offre un link affiliato o un portale white-label.

Il resto è già pronto: si cambia un menu a tendina nel CMS.

*Pagine → Assicurazione viaggio → Vendita online*

---

## 6. Testi legali

Privacy e note legali sono **bozze di lavoro**, segnalate come tali in cima a
ciascun documento. Vanno riviste — idealmente da un consulente — prima della
pubblicazione. In particolare:

- i tempi di conservazione dei dati;
- l'elenco dei fornitori a cui i dati vengono trasmessi;
- le condizioni generali di contratto, che oggi non sono sul sito e che per
  un'agenzia di viaggi svizzera è opportuno rendere accessibili.

---

## 7. Dopo il primo deploy su Netlify

- [ ] Notifiche e-mail per i quattro moduli, verso la casella del reparto giusto
- [ ] Dominio `www.francorosso.ch` e redirect da `francorosso.ch`
- [ ] Accesso al CMS per chi dovrà scrivere (vedi README, sezione *Accesso al CMS*)
- [ ] Google Search Console: proprietà, sitemap, e richiesta di reindicizzazione
      per i vecchi URL rediretti
- [ ] Verifica della scheda Google Business con i nuovi orari
