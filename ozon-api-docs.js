// === Tab switching ===
document.querySelectorAll('.tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
    this.classList.add('active');
  });
});

// === Response tabs ===
document.querySelectorAll('.resp-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.resp-tab').forEach(function(t) { t.classList.remove('active'); });
    this.classList.add('active');
  });
});

// === Copy button ===
document.querySelectorAll('.btn-copy').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var url = document.querySelector('.endpoint-url');
    if (url) {
      navigator.clipboard.writeText(url.textContent).then(function() {
        btn.textContent = '✓';
        setTimeout(function() { btn.textContent = '⧉'; }, 1500);
      });
    }
  });
});

// === Copy code block ===
document.querySelectorAll('.copy-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var code = document.querySelector('.request-block pre');
    if (code) {
      navigator.clipboard.writeText(code.textContent).then(function() {
        link.querySelector('a').textContent = 'Скопировано!';
        setTimeout(function() { link.querySelector('a').textContent = 'Копировать'; }, 1500);
      });
    }
  });
});

// === Collapsible sidebar groups ===
document.querySelectorAll('.sidebar-group-title.collapsible').forEach(function(title) {
  title.addEventListener('click', function() {
    var menu = this.nextElementSibling;
    if (menu) {
      menu.style.display = menu.style.display === 'none' ? '' : 'none';
    }
  });
});
