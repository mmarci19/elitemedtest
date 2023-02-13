Folyamatosan frissül!

Az indításhoz szükséges:
# NodeJS + npm

szükséges modulok:

## kafkajs
### npm install kafkajs

Elindítás:
Abba a mappába kell navigálni ahol található, és kiadni az alábbi parancsot: 
**node index.js**

A 8000-es porton érhető el localhost-on.

Tudnivalók, használati útmutató és backend információk alább:

## Működés

# Main Menu
A menüből három felé lehet navigálni, a *pitch selector* nem érhető el direktben, csak meccs regisztrációval.

# Settings
A beállítások fülön lehet meccset regisztrálni. A **match ID** megadása kötelező, addig nem fog tovább engedni egyik oldalra sem.
Az id megadása után felugrik a kamera, a userek és az owner megadásának a gombja - ergo így már van értelme megadni felhasználót, vagy kamerát.

**Legalább egy kamerát meg kell adni** ahhoz, hogy tovább lehessen menni a *pitch selectorra*. Amikor megadunk egy információt, a hozzá tartozó gombot le kell nyomni, és megjelenik lent szövegként amit beírtunk, így ellenőrizhetjük hogy jól írtuk-e be amit szerettünk volna.

**Négy kamera** és **négy felhasználó** adható meg a jelenlegi verzióban. Ez igény szerint változhat majd.

A **Next** gomb a *pitch-selectorra* visz, a *Watch Recording* pedig a béta funkció, alább kifejtem.

**Watch Recording**
Ez a gomb a *recording pagere* visz, ami nem más, mint a beregisztrált kamerák nézésének lehetősége. a kamerák url-eket amikor rámegyünk a gombra, akkor kapjuk majd meg a backendtől. A pitch selectornál más a helyzet, mert az arra van felkészítve, hogy "on-the-fly" beregisztráljuk a meccset, megadjuk a kamera url-eket, és az a frontenden utazik tovább a pitch selectorra. *A get_match kéréssel fogja ellenőrizni, hogy létezik-e a meccs a backendben.* Ehhez a rész-funkcióhoz viszont szükséges lesz az alábbi endpoint definiálása:

```
http://127.0.0.1:5000/get_cameras
- GET kérés, paraméterként utazik a match_id
- A response-ban szerepeljen a regisztrált kamerák urlje.
```

**Create Match**
Létrejön a meccs a megadott adatokkal, a response-nak itt nem feltétlenül kell információt hordozni.


## Pitch selector
Talán a legfontosabb komponens, aminél az első és legfontosabb dolog, hogy lekérjük a képet a szervertől, az adott kamerához.

**Get Image** gombbal tudunk képet kérni a backendtől, ennek megvalósítása egyelőre kérdőjeles.

```
http://127.0.0.1:5000/get_image
- GET kérés, paraméterként utazik a match_id
- A response-ban szerepeljen a kép url-je, vagy a kép, mint string. (TODO egyeztetni)
```

Mivel lehetséges több kamerát megadni, válasszuk ki a sárgával jelőlt Camera 1, Camera 2 .. gombok közül azt a kamerát, amelyik képét le szeretnénk kérni. Érdemes nyilván sorban menni, de lehet választani, így praktikusabb. Ha csak egy kamera van, akkor is kattintsunk rá.. :) (ez TODO-k közé fel van véve nekem, majd ha odajutok mindent szépen kijavítok)

Ha lejött a kép, az oldal legalján tudunk adni neki szélességet és magasságot, ha nem felel meg az, amit kiad az oldal.
A két legördülő menü közül a bal oldali a bal térfél, a jobb oldali a jobb térfél pontjait tartalmazza.
Mapping:
leftTop: bal felső szögletzászló, rightBottom: félpálya alsó sarka
leftTop2: félpálya felső, jobb alsó szögletzászló
TODO: a leftTop, leftBottom, ill. leftTop2, leftBottom2 elnevezéseket átírni!

Ha sorban bekattintgattuk a pontokat, a *Set* gomb megnyomása kék háttérrel jelzi, hogy "véglegesítve" lettek a pontok, ezután csinálhatjuk a másik térfelet. Ha el van rontva, a sárga Reset gombot nyomjuk meg, amivel zölddé válik, jelezve, hogy szabad az edit. Egyszerre csak egy térfelet editeljünk, és a hibák elkerülése végett tegyük 'Choose Point!'-ra a másikat, a biztonság kedvéért, ha így , Resettel kellene editelni.

**Send coordinates**

Fontos funkció, leküldi az éppen kiválasztott kamera url mellé a pontok tömbjét, az alábbi formátumban:
![image](https://user-images.githubusercontent.com/47712831/132381793-684102a5-a90d-440e-a037-07a7803ed0ce.png)

A rövidítések szerintem egyértelműeek, lltx -> left left top x, és így tovább

A kamera url szintén fontos. Ehhez szükséges az alábbi endpoint a backendnél:

```
- http://127.0.0.1:5000/send_coords
- POST kérés, body-ban utaznak a dolgok.
- A response itt szintén nem annyira lényeges.
```

A pitch selector elérhető url-el is /pitch-selector.html címen, de paraméterek nélkül "buta" , és nem tud kamerához koordinátákat regisztrálni ha nincs kamera, se match id. 
Ne nyissátok meg, csak a Settings oldalról. :-) 

TODO: letiltani a plain url-t!


**Mini map**
Ez a funkció közel sincs készen, a lényeg, hogy kelleni fog egy endpoint a backend részéről:
```
- http://127.0.0.1:5000/receive_positions
- GET kérés, match ID utazik paraméterként
- Response: **FONTOS** , hiszen itt jönnek a koordináták. 
```
Ennek struktúrája még nincs meg nálam (sem) , de valószínűleg [x,  y,  csapat,  poszt, ( ill. mezszám, név, játékos id, akármi, bármi, amit ki tudunk nyerni és fontos, hasznos lehet)] fog kelleni, más nem hiszem.
TODO: a játékosok tömbjeit definiálni, kirajzolni, ehhez szükséges api hívásnál a response kezelése -> koordináták frissítése.



## Matches

Ez a page csupán lekér, vagy töröl egy meccset, kiírja a response-ban kapott adatokat róla. Szükséges lehet egyeztetni, hogy hogyan , illetve mit jelzünk ki róla. A list matches pedig az összes meccset adja vissza. Interaktívan látszik egy logoló, ami pirossal írja, ha server error lépne fel.
