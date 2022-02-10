# Grupprojekt - frontend app beskrivning

Ni ska jobba i par och det vanliga gäller när det kommer till jämt committande. Ni kan dela upp arbetet eller parkoda hur ni vill förutom när det kommer till web-api anropen.

Användaren ska kunna trigga fler web-api anrop än de som sker i början för att bygga upp hemsidan första gången. Sidan ska inte behöva laddas om och man ska heller inte behöva navigera till en ny sida.

Ni måste båda koda var sitt sådant här moment för att fylla **kursmål 6**.

Den ena kan göra en [Collapse](https://getbootstrap.com/docs/5.1/components/collapse/) eller [Modal] som visar mer info om ett item när man klickar på `read more`/`read comments`.

Den andra kan göra en [Pagination](https://getbootstrap.com/docs/5.1/components/pagination/) eller [Navigation](https://getbootstrap.com/docs/5.0/components/navs-tabs/#vertical) där man bara ser en viss mängd items åt gången och användaren kan bläddra fram och tillbaka.

Det är ok att komma på något annat att göra med, men det måste innefatta användarevent som leder till web-api anrop.

## Programförslag

Det är ok att bygga något annat eller att använda en annan web-api men i så fall sker det under egenansvar.

### Pokemon webbshop

Denna hemsida bygger på [PokéAPI](https://pokeapi.co/), all info om pokemon hämtas härifrån. Tanken är att skapa en webbshop där man kan browsa pokemon via en pagination.

<img src="img/2022-01-14-20-14-39.png" width="400px">

Man kan även kolla upp enskilda pokemons stats och beskrivningar.

<img src="img/2022-01-14-20-15-06.png" width="400px">

> (bonus)
>
> Det går att lägga till pokemon i sin kundvagn. Kundvagnen finns kvar även om man refreshar sidan och den visar en lista på allt man köpt samt den totala kostnaden.
>
> <img src="img/2022-01-14-20-15-34.png" width="400px">

### Klotterplanket

Här kan folk göra inlägg som sen går att kommentera. Inläggen och dess kommentarer finns att hämta från [JSONPlaceholder](http://jsonplaceholder.typicode.com/) (Det är egentligen en tjänst för att mocka web-api:er)

Man väljer en användare genom navigeringen till vänster och så får man se alla deras inlägg i minimerad form.

Man kan klicka på `view more..` på ett enskilt inlägg och då få se hela inlägget samt alla kommentarer på inlägget.

> (bonus)
>
> Lägg till UI för att man själv ska kunna kommentera ett inlägg. När man trycker på enter så ska dels datan läggas till som en kommentar i UI och dels skickas via web-api:n som ett `HTTP POST` meddelande.
>
> Det går inte att få `JSONPlaceholder` att permanent spara den data som skickas, men man får ett riktigt `200 OK` svar om man skickade på rätt sätt.

## Allmänt

### G krav

Program:

- web-api:n används för att fylla ut hemsidan. Ingen hårdkodad data
- events används för trigga ytterligare web-api anrop vid behov

Rapport:

- ta upp ett exempel där du använder `fetch` och gå igenom tidsförloppet. Vad händer från att du kallar på metoden till att du får ut ett JS objekt som svar?
- reflektera över, och analysera de lösningar du gjort i projektet

## Deadlines

- Deadline #1 Lämnas in senast Söndag 06/03-22 kl 23.55 i PingPong.
- Deadline #2 Lämnas in senast Söndag 20/03-22 kl 23.55 i PingPong.

### Inlämning

1. En i gruppen forkar inlämningsrepon i början. Alla andra sammarbetar sen på forken.

2. I slutet, gör PR till upstream.

3. Skicka in på PingPong Gruppprojekt:

   - Varje person lämnar in en zip av repon med all versionshistorik.
   - Länk till forken på GitHub.

4. Skicka in på PingPong Rapport:

   - Varje person lämnar in sin egna rapport som pdf.
   - Länk till rapporten på GitHub.

### Mål

> Efter genomförd kurs ska den studerande ha kunskaper i/om:
>
> 4. Redogöra för hur en kommunicerar med servern
>
> Efter genomförd kurs ska den studerande ha färdigheter i att:
>
> 6. Utveckla webbsidor som hanterar dynamiskt innehåll och användarhändelser.
> 7. Tillämpa teknik för att hämta och skicka data till servern
