/* =================================================================
   AWU PHOTOGRAPHY: YOUR EDITING FILE

   This is the only file you need to touch to update the site.
   Change text between the "quotes", keep the commas at the end
   of each line, and click "Commit changes" when you're done.
   Full instructions are in README.md.
   ================================================================= */

window.SITE = {

  /* ---------- Basics ---------- */
  name: "Awu Photography",
  tagline: "Headshots, group photos and events around Penn and Philadelphia.",
  heroPhoto: "photos/site/hero.jpg",       // big photo at the top of the home page

  /* ---------- About section ---------- */
  about: {
    photo: "photos/site/about.jpg",
    paragraphs: [
      "Hi, I'm Anna, an undergrad at Wharton. I first picked up a camera in high school and got really into photography after joining the Daily Pennsylvanian (the DP) my freshman year.",
      "These days I love shooting around campus and all over Philly. I'm always down to try something new, so if you have an idea for a shoot, send it my way."
    ]
  },

  /* ---------- Contact ---------- */
  contact: {
    email: "annawu1@wharton.upenn.edu",          // inquiries from the booking form go here
    instagram: "Wuflixs_"            // your handle, without the @
  },

  /* ---------- Booking link (optional) ----------
     Paste a Google Form, Calendly, or other booking link here and every
     "Book a session" button will open it. Leave it as "" to use the
     built-in email inquiry form instead. */
  bookingLink: "",

  /* ---------- Categories (the tabs above your portfolio) ----------
     Add comingSoon: true to show a "Coming soon" note instead of albums. */
  categories: [
    { id: "headshots", name: "Headshots" },
    { id: "groups",    name: "Group shots" },
    { id: "events",    name: "Events" },
    { id: "landscape", name: "Scenery" },
    { id: "grad",      name: "Grad photos", comingSoon: true,
      comingSoonText: "Grad sessions open in spring. Send an inquiry to get on the list early." }
  ],

  /* ---------- Services and prices (shown in the Book section) ----------
     Leave price as "" to hide it. */
  packages: [
    { category: "headshots", name: "Headshots",   price: "$5",  details: "Quick session on campus with edited photos." },
    { category: "groups",    name: "Group shots", price: "From $20, inquire",  details: "Clubs, teams and friend groups. 45 minutes, 10+ edited photos." },
    { category: "events",    name: "Events",      price: "From $20, inquire", details: "Socials, panels and formals. Edited gallery delivered in a week." },
    { category: "grad",      name: "Grad photos", price: "",          details: "Caps, gowns and campus landmarks. Booking opens in spring." }
  ],

  /* ---------- Albums ----------
     Each album = one cover on the portfolio page. Click it to see every photo.

       id:       short name with no spaces, used in the link (e.g. "maya-headshots")
       title:    what people see
       category: one of the category ids above ("headshots", "groups", "events", "grad", "landscape")
       date:     any text, e.g. "October 2026" (or "")
       folder:   where the photos live in your repo
       cover:    the file to use as the cover photo
       photos:   how many photos, if they're named 1.jpg, 2.jpg, 3.jpg ...
                 OR a list of exact file names: ["IMG_2041.jpg", "IMG_2045.jpg"]
       pattern:  (optional) use when your files are named another way,
                 e.g. "photo ({n}).jpg" for photo (1).jpg, photo (2).jpg ...

     The newest album should go at the TOP of this list. */
  albums: [
    {
      id: "headshots",
      title: "Headshots",
      category: "headshots",
      date: "Fall 2026",
      folder: "photos/portraits",
      cover: "15.jpg",
      banner: "photos/groups/1.jpg",
      photos: 17
    },
    {
      id: "group-shots",
      title: "Group shots",
      category: "groups",
      date: "Fall 2026",
      folder: "photos/groups",
      cover: "6.jpg",
      photos: 6
    },
    {
      id: "events",
      title: "Events",
      category: "events",
      date: "2026",
      folder: "photos/events",
      cover: "7.jpg",
      photos: 8
    },
    {
      id: "scenery",
      title: "Scenery",
      category: "landscape",
      date: "",
      folder: "photos/campus-philly",
      cover: "10.jpg",
      photos: 11
    }
  ]
};
