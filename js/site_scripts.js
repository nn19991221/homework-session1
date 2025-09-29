// js/site_scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const partners = [
    { src: "partners/partner-bustour.png",     alt: "Partner - Bus Tour" },
    { src: "partners/partner-cabinrental.png", alt: "Partner - Cabin Rental" },
    { src: "partners/partner-campingadv.png",  alt: "Partner - Camping Adventure" },
    { src: "partners/partner-collegetours.png",alt: "Partner - College Tours" },
    { src: "partners/partner-rentalbike.png",  alt: "Partner - Rental Bike" },
    { src: "partners/partner-tourgroup.png",   alt: "Partner - Tour Group" }
  ];

  const list = document.getElementById("partners");
  if (!list) return;

  partners.forEach(p => {
    const li = document.createElement("li");
    li.className = "partner";
    const img = document.createElement("img");
    img.src = p.src;
    img.alt = p.alt;
    li.appendChild(img);
    list.appendChild(li);
  });
});
