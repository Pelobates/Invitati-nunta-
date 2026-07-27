# Invitație virtuală de nuntă cu RSVP și Google Sheets

## Fișiere
- `index.html` — pagina invitației
- `styles.css` — designul
- `script.js` — formular, câmpuri dinamice și countdown
- `Code.gs` — codul care introduce răspunsurile în Google Sheets

## 1. Personalizează invitația
Deschide `index.html` într-un editor precum VS Code sau chiar Notepad și înlocuiește:
- Ana & Mihai
- data, ora și orașul
- locațiile și linkurile Google Maps
- termenul limită pentru confirmare

În `script.js`, schimbă data din:
```js
const WEDDING_DATE = new Date(2027, 8, 12, 15, 0, 0);
```
Lunile pornesc de la 0: ianuarie = 0, septembrie = 8, decembrie = 11.

Imaginea principală este definită în `styles.css`, în regula `.hero`. Poți înlocui URL-ul Unsplash cu un URL către fotografia voastră.

## 2. Creează Google Sheet-ul
1. Intră în Google Drive și creează un Google Sheet gol.
2. Dă-i un nume, de exemplu `RSVP Nuntă`.
3. În Google Sheets, mergi la `Extensions` / `Extensii` → `Apps Script`.
4. Șterge codul existent și lipește conținutul fișierului `Code.gs`.
5. Apasă Save.

## 3. Publică Apps Script ca Web App
1. În Apps Script, apasă `Deploy` → `New deployment`.
2. La tip, selectează `Web app`.
3. `Execute as`: selectează contul tău (`Me`).
4. `Who has access`: selectează `Anyone`.
5. Apasă `Deploy` și aprobă permisiunile cerute.
6. Copiază URL-ul care se termină în `/exec`.

În `script.js`, înlocuiește:
```js
const GOOGLE_SCRIPT_URL = "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```
cu URL-ul copiat.

Important: când modifici ulterior `Code.gs`, creează o versiune nouă din `Deploy` → `Manage deployments` → Edit → New version → Deploy.

## 4. Testează local
Deschide `index.html` în browser, completează formularul și verifică dacă apare automat fila `Raspunsuri RSVP` în Google Sheet.

## 5. Publică gratuit pe GitHub Pages
1. Creează un cont pe GitHub, dacă nu ai deja.
2. Creează un repository nou, de exemplu `invitatie-nunta`.
3. Încarcă `index.html`, `styles.css` și `script.js` în repository. Nu este necesar să publici `Code.gs`.
4. Deschide `Settings` → `Pages`.
5. La `Build and deployment`, selectează `Deploy from a branch`.
6. Selectează branch-ul `main` și folderul `/ (root)`, apoi Save.
7. GitHub va afișa adresa site-ului, de obicei:
   `https://NUME-UTILIZATOR.github.io/invitatie-nunta/`

## Linkuri personalizate
Poți trimite unui invitat un link precum:
`https://site-ul-tau.ro/?nume=Ion%20Popescu&id=INV001`

Numele va fi completat automat, iar ID-ul va apărea în Sheet. Pentru spații folosește `%20`.

## Export în Excel
În Google Sheets: `File` → `Download` → `Microsoft Excel (.xlsx)`.

## Confidențialitate
Adaugă în invitație o frază scurtă, de exemplu: „Datele sunt colectate exclusiv pentru organizarea evenimentului și nu vor fi distribuite.” Nu solicita date sensibile de care nu ai nevoie.
