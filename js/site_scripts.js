// js/site_scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const partners = [
    { src: "partners/partner-bustour.png",      alt: "Partner - Bus Tour" },
    { src: "partners/partner-cabinrental.png",  alt: "Partner - Cabin Rental" },
    { src: "partners/partner-campingadv.png",   alt: "Partner - Camping Adventure" },
    { src: "partners/partner-collegetours.png", alt: "Partner - College Tours" },
    { src: "partners/partner-rentalbike.png",   alt: "Partner - Rental Bike" },
    { src: "partners/partner-tourgroup.png",    alt: "Partner - Tour Group" }
  ];

  const list = document.getElementById('partners');
  if (!list) return;

  
  list.classList.add('row', 'justify-content-center');

  
  list.innerHTML = '';

  
  const frag = document.createDocumentFragment();

  partners.forEach(p => {
    const li = document.createElement('li');


    li.className = 'partner col-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center';

    
    const img = document.createElement('img');
    img.src = p.src;
    img.alt = p.alt;
    img.loading = 'lazy';  
    
    img.width = 70;
    img.height = 70;

    li.appendChild(img);
    frag.appendChild(li);
  });

  list.appendChild(frag);
});
