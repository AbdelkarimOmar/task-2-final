    // Search toggle behaviour: clicking search hides the links and shows the search input.
    const searchToggle = document.getElementById('searchToggle');
    const searchClose = document.getElementById('searchClose');
    const navLinks = document.getElementById('navLinks');
    const searchWrap = document.getElementById('searchWrap');
    const searchInput = document.getElementById('siteSearch');

    function openSearch(){
      navLinks.style.display = 'none';
      searchWrap.classList.add('active');
      searchWrap.setAttribute('aria-hidden','false');
      searchToggle.style.display = 'none';
      searchClose.style.display = '';
      searchClose.setAttribute('aria-hidden','false');
      searchClose.focus();
      if(searchInput) searchInput.focus();
      searchToggle.setAttribute('aria-pressed','true');
    }
    function closeSearch(){
      navLinks.style.display = '';
      searchWrap.classList.remove('active');
      searchWrap.setAttribute('aria-hidden','true');
      searchToggle.style.display = '';
      searchClose.style.display = 'none';
      searchClose.setAttribute('aria-hidden','true');
      searchToggle.setAttribute('aria-pressed','false');
    }

    searchToggle.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);

    // Basic site search (word match) — finds headings and descriptions (client-side)
    (function(){
      if(!searchInput) return;
      searchInput.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
          const q = this.value.trim().toLowerCase();
          if(!q) { alert('Please enter a search term.'); return; }
          // Simple highlighting/filter: show matching boxes only (by text content)
          const boxes = document.querySelectorAll('.news-box');
          let found = 0;
          boxes.forEach(box => {
            const text = (box.innerText || '').toLowerCase();
            if(text.indexOf(q) !== -1){
              box.style.display = 'flex';
              found++;
            } else {
              box.style.display = 'none';
            }
          });
          if(found === 0) alert('No results found for: ' + q);
        }
      });
    })();