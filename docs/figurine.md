# Figurine

## Creare una nuova figurina
Guida per la creazione di una nuova figurina. Questa procedura e' divisa in due parti, una per la creazione dell'articolo, l'altra per upload dell'immagine della figurina.

### File articolo

 1. Aprire il folder `_posts/figurine/` <a href="https://github.com/futbolismo/blog/tree/gh-pages/_posts/figurine" target="_blank">https://github.com/futbolismo/blog/tree/gh-pages/_posts/figurine</a>
 ![Folder](https://github.com/futbolismo/blog/raw/gh-pages/docs/img/folder.png)
 2. Cliccare il pulsante `Create new file`
 3. Inserire il nome del file seguendo il formato YYYY-MM-DD-nome_giocatore.md (ad esempio `2018-07-25-antonio-cabrini.md`)
 nel campo di testo
 ![Campo testo per il nome](https://github.com/futbolismo/blog/raw/gh-pages/docs/img/filename.png)
 4. Scrivere il contenuto del file seguendo il formato descritto di seguito
 5. Cliccare il pulsante `Commit new file`
 ![Commit new file](https://github.com/futbolismo/blog/raw/gh-pages/docs/img/commit_new_file.png)

 Le figurine vengono aggiunte automaticamente alla sezione `figurine` non appena il pulsante `Commit new file` viene cliccato.

#### Formato
```
---
layout: post-sticker

pid: ID_UNICO_DEL_GIOCATORE
postTitle: TITOLO_DELL_ARTICOLO # opzionale
player: NOME_COGNOME_GIOCATORE
life: RUOLO, nato il DATA_DI_NASCITA a LUOGO_DI_NASCITA

wikipedia: ULTIMA_PARTE_DELL'URL SU WIKIPEDIA # opzionale

author: AUTORE_DELL_ARTICOLO # opzionale (non viene mostrato nelle figurine)
category: figurine
timeline: 0

---
TESTO DELL'ARTICOLO
```

#### File d'esempio
Aprire e copiare il file: <a href="https://raw.githubusercontent.com/futbolismo/blog/gh-pages/docs/2018-07-24-rocco-filardi.md" target="_blank">https://raw.githubusercontent.com/futbolismo/blog/gh-pages/docs/2018-07-24-rocco-filardi.md</a>

### Immagine

#### Nome del file
Il file deve essere chiamato seguendo del `pid` specificato nel file con i testi della figurina. Se fosse una figurina di Antonio Cabrini e il `pid` nel file fosse `pid: cabrini`, il file deve essere chiamato `cabrini.jpg`

#### Formato
Il file dell'immagine deve essere JPG e avere una dimensione piu' o meno standard: **215px x 277px**
Se non e' esattamente uguale, il sito automaticamente adattera' il file alla larghezza richiesta e tagliera' in verticale la foto.

#### Procedura per il caricamento dell'immagine
 1. Aprire il folder `stickers` <a href="https://github.com/futbolismo/blog/tree/gh-pages/assets/pics/stickers" target="_blank">https://github.com/futbolismo/blog/tree/gh-pages/assets/pics/stickers</a>
  ![Folder stickers](https://github.com/futbolismo/blog/raw/gh-pages/docs/img/stickers_folder.png)
 2. Cliccare il pulsante `Upload files`
 3. Aggiungere trascinando i file o cliccando `choose your files`
  ![Upload files](https://github.com/futbolismo/blog/raw/gh-pages/docs/img/upload_files.png)
 4. Cliccare il pulsante verde `Commit changes`
  ![Commit changes](https://github.com/futbolismo/blog/raw/gh-pages/docs/img/commit_changes_img.png)

Il file sara' caricato nel suo folder. E se l'articolo e' gia' stato creato, la figurina sara' aggiornata nel sito web.

## Modificare una figurina

### Contenuti
1. Aprire il folder `_posts/figurine/` <a href="https://github.com/futbolismo/blog/tree/gh-pages/_posts/figurine" target="_blank">https://github.com/futbolismo/blog/tree/gh-pages/_posts/figurine</a>
 ![Folder](https://github.com/futbolismo/blog/raw/gh-pages/docs/img/folder.png)
2. Cliccare il nome del file che si vuol modificare
3. Cliccare il pulsante con l'icona della matita
![Icona matita](https://github.com/futbolismo/blog/raw/gh-pages/docs/img/pencil.png)
4. Modificare il contenuto del file seguendo il formato descritto precedentemente
5. Cliccare il pulsante verde `Commit changes` ![Commit changes](https://github.com/futbolismo/blog/raw/gh-pages/docs/img/commit_changes.png)

### Figurina
Seguire la stessa procedura della creazione mantenendo la stesso nome del file, il file verra' sovrascritto.
