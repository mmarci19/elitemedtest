
 
  A Match ID, Owner, és User megadása csak egy lokális változót állít át.<br>
  Az add camera source egy api hívás, match ID nélkül nem hívható.<br>

  A Create Match -re a backendnek kell tudnia hogy van e már ilyen ID-jú meccs, ott kell lekezelni!<br>

  A Start Recording meg átirányít a Recording page-re, a match ID-t viszi magával paraméterben.<br>
  A Start Recordingnál a backend kell, hogy szóljon, létezik-e ilyen meccs amihez recordingot akarunk indítani.<br>
  A Stop recording ott van beállítva, ahhoz is kell az ID, onnan történik a Stop hívás. Az visszairányít ide.<br>

  A Watch Recording egy adott meccs "közvetítésére" vált, pont úgy mint a start recording.
  De ez nem küld start recording hívást a szerver felé.<br>

A backend részéről szükséges lesz ez a pár api endpoint még:
## POST "http://127.0.0.1:5000/get_cameras" -> a kamera url-eket adja meg, az rtsp címeket, paraméterként megy a match_id

## POST "http://127.0.0.1:5000/stop_recording" -> megállítja a felvételt, paraméterként megy a match_id
## GET "http://localhost:5000/get_image" -> kép visszaadása (valahogyan)
## POST "http://localhost:5000/send_coords" -> koordináták fogadására felkészíteni
## Szerveroldali ellenőrzés, hogy létezik-e az a meccs, amit éppen létre akarunk hozni (ne engedjen se duplikációt se felülírást).
Illetve, mivel lehet létrehozás nélkül is a recording page-re menni jelenleg, maga az, hogy létezik-e a meccs, az kell, hogy lekezelve legyen.


magamnak:
getimage, start recording nem megy a pitch-selectoron.
