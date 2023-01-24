# Lånekalkylator

## Beskrivning
Du har fått en enkel kalkylator med lånebelopp, återbetalningstid och en knapp för att skicka ansökan.  
För att skicka en ansökan till bankerna, väljer man ett lånebelopp och en återbetalningstid i formuläret och trycker på skicka.  
Först, innan ansökan kan skickas vidare till bankerna, behöver den köras genom en regelmotor som filtrerar ut vilka banker som ansökan ska skickas till.  
Din uppgift är att bygga en enklare variant av denna regelmotor.

Testet innefattar Javascript för att du ska kunna visa dina kunskaper inom området.  
Huruvida du vill ta in ytterliggare bibliotek eller strukturera om koden, är helt upp till dig.

## Instruktioner

### Backend

I `index.js` finns en express-endpoint uppsatt som ska ta emot ansökningsdatan från frontend och skicka vidare den till regelmotorn.

Reglerna för respektive bank finns i `lenders.js`

Punkter att förhålla sig till:
* Funktionen `run` i `rulesEngine.js` ska returnera den filtrerade lenders-arrayn.
* Regelmotorn ska kunna hantera flera olika regler per bank och fält.
* Ska åtminstone ha stöd för operatorerna "större än" och "mindre än".
* Alla bankens regler ska matcha för att banken ska ta sig genom filtret.
* För de banker som tar sig igenom filtret ska `sendToBank` anropas som ligger i `index.js` med ett lender-objekt som argument.
* Efter att ansökningarna skickats till alla banker ska status 200 returneras från endpointen `/submit`.


Vi vill att du gör ditt bästa men har full förståelse för att du inte hinner med allt under tidsramen.  
Prioritera det som ska göras så att du står där med en så fullt fungerande lösning som möjligt när tiden är slut.  
Vi vill gärna höra vad du hade gjort annorlunda om du hade fått mer tid på dig.
