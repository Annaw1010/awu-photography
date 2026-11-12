# Awu Photography

Portfolio and booking site, hosted free on GitHub Pages.
Live at: **https://annaw1010.github.io/awu-photography/**

Everything you'll ever edit is in **`content.js`** (text, prices, albums) and the **`photos`** folder (your pictures). You can ignore `index.html`, `styles.css` and `app.js`.

---

## Part 1: Put the site online (one time, about 10 minutes)

Do this on your laptop in Chrome or Edge.

1. **Unzip the download.** Right click `awu-photography.zip` → Extract All. You'll get a folder called `awu-photography`.
2. **Make the repo.** Go to github.com, click **+** (top right) → **New repository**.
   * Repository name: `awu-photography`
   * Public
   * Click **Create repository**.
3. **Upload the files.** On the empty repo page, click the link **uploading an existing file**.
   Open your extracted `awu-photography` folder, select everything *inside* it (`index.html`, `styles.css`, `app.js`, `content.js`, `README.md` and the `photos` folder), and drag it all into the browser window.
   Wait until every file is listed, then click **Commit changes**.
   *Check:* your repo should show `index.html` at the top level, not inside another folder.
4. **Turn on the website.** In the repo, go to **Settings** → **Pages** (left sidebar).
   Under "Build and deployment": Source = **Deploy from a branch**, Branch = **main**, folder = **/ (root)** → **Save**.
5. **Wait 1 to 2 minutes**, then open https://annaw1010.github.io/awu-photography/
6. **Add it to Instagram.** Profile → Edit profile → Links → Add external link. Paste the URL and title it something like "Portfolio + booking".

---

## Part 2: First edits (do these before sharing)

Open `content.js` on GitHub and click the **pencil icon** (Edit). Change:

* `email:` to the address where you want inquiries
* `instagram:` to your handle (no @)
* the `price:` lines and `details:` for each service
* the `about` paragraphs, if you want different wording

Click **Commit changes**. The site updates in about a minute (refresh the page; on your phone you may need to close and reopen the tab).

**Rules that keep content.js working:** keep text inside "quotes", keep the comma at the end of lines, and don't delete curly braces `{ }` or square brackets `[ ]`. If the site ever goes blank, it's almost always a missing comma or quote in the last thing you changed.

---

## Part 3: Add a new album

**Step A: get your photos ready (on your laptop)**

1. Export from Lightroom or your editing app as **JPG**, about **2000 px on the long side** (keeps the site fast). iPhone HEIC files won't show in browsers, so convert them to JPG.
2. Make a new folder named for the shoot, lowercase with no spaces, e.g. `maya-headshots`.
3. Name the photos **1.jpg, 2.jpg, 3.jpg** and so on, in the order you want them shown.

   *Shortcut on Windows:* select all the photos in File Explorer, press **F2**, type `photo`, press Enter. Windows renames them `photo (1).jpg`, `photo (2).jpg` ... That works too, see `pattern` below.

**Step B: upload the folder**

1. In your repo, click into the **photos** folder.
2. **Add file** → **Upload files**, then drag your whole `maya-headshots` folder in. Commit changes.

**Step C: add the album to content.js**

Edit `content.js` and paste a new block at the **top** of the `albums: [` list (newest shows first):

```js
    {
      id: "maya-headshots",
      title: "Maya, LinkedIn headshots",
      category: "headshots",
      date: "November 2026",
      folder: "photos/maya-headshots",
      cover: "3.jpg",
      photos: 12
    },
```

* `id` must be unique with no spaces. It becomes the album's link, e.g. `.../awu-photography/#album/maya-headshots` (handy for sending a client just their gallery).
* `category` is one of: `headshots`, `groups`, `events`, `grad`
* `cover` is the photo shown on the portfolio page. Change it anytime.
* `photos` is how many photos are in the folder.
* If you used the Windows rename shortcut, add this line: `pattern: "photo ({n}).jpg",`
* If your files have random names, list them instead: `photos: ["IMG_2041.jpg", "IMG_2045.jpg", "IMG_2050.jpg"],`

**File names are case sensitive.** `1.JPG` and `1.jpg` are different files to GitHub. If a photo can't be found, the site shows a grey box with the exact file path it was looking for, so you can see what to fix.

---

## Other common edits

**Remove the sample albums:** delete their blocks from `albums` in content.js. To clean up the repo too, open each `photos/...-sample` folder, open a file, and use the trash icon (or leave them, they don't hurt anything).

**Change the big homepage photo or your About photo:** upload a new JPG into `photos/site/` with the same name (`hero.jpg` or `about.jpg`) to replace it. A landscape photo works best for `hero.jpg`.

**Open up grad photos:** in `categories`, change
`{ id: "grad", name: "Grad photos", comingSoon: true, ...}` to `{ id: "grad", name: "Grad photos" },`
then add a price to the Grad photos package and add a grad album. (Even with comingSoon on, adding a grad album will show it.)

**Add a new category:** add a line to `categories`, e.g. `{ id: "couples", name: "Couples" },` and use `category: "couples"` in albums.

**Use a booking form instead of email:** make a Google Form (name, email, session type, date, notes), click **Send** → link icon → copy, and paste it into `bookingLink: ""`. Every Book button will then open your form, and responses collect in a Google Sheet. Calendly links work the same way.

**How the built-in inquiry form works:** when someone fills it out and taps Send inquiry, their email app opens with a message to you already written. They press send, and it lands in your inbox.
