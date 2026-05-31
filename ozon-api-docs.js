// === Scoped Tab switching (main tabs: Описание / Консоль) ===
document.querySelectorAll('.tabs').forEach(function(tabsContainer) {
  tabsContainer.querySelectorAll('.tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      tabsContainer.querySelectorAll('.tab').forEach(function(t) {
        t.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
});

// === Scoped Response tabs ===
document.querySelectorAll('.response-tabs, .resp-tabs-group').forEach(function(group) {
  group.querySelectorAll('.resp-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      group.querySelectorAll('.resp-tab').forEach(function(t) {
        t.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
});

// Fallback: global resp-tab switching for tabs not inside .response-tabs wrapper
document.querySelectorAll('.resp-tab').forEach(function(tab) {
  if (!tab.closest('.response-tabs') && !tab.closest('.resp-tabs-group')) {
    tab.addEventListener('click', function() {
      var siblings = tab.parentNode.querySelectorAll('.resp-tab');
      siblings.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
    });
  }
});

// === Copy endpoint URL button ===
document.querySelectorAll('.btn-copy').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var section = btn.closest('section');
    var url = section ? section.querySelector('.endpoint-url') : document.querySelector('.endpoint-url');
    if (url) {
      navigator.clipboard.writeText(url.textContent.trim()).then(function() {
        btn.textContent = '✓';
        setTimeout(function() { btn.textContent = '⧉'; }, 1500);
      }).catch(function() {
        btn.textContent = '✓';
        setTimeout(function() { btn.textContent = '⧉'; }, 1500);
      });
    }
  });
});

// === Copy link: copy nearest code block ===
document.querySelectorAll('.copy-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var a = link.querySelector('a');
    if (!a || !e.target.closest('a')) return;
    e.preventDefault();
    // Find nearest code block in the same parent
    var parent = link.parentNode;
    var code = parent ? parent.querySelector('pre') : null;
    // If not found, search in siblings upward
    if (!code) {
      var el = link.previousElementSibling;
      while (el) {
        var pre = el.querySelector('pre');
        if (pre) { code = pre; break; }
        if (el.tagName === 'PRE') { code = el; break; }
        el = el.previousElementSibling;
      }
    }
    if (code) {
      navigator.clipboard.writeText(code.textContent.trim()).then(function() {
        a.textContent = 'Скопировано!';
        setTimeout(function() { a.textContent = 'Копировать'; }, 1800);
      }).catch(function() {
        a.textContent = 'Ошибка';
        setTimeout(function() { a.textContent = 'Копировать'; }, 1800);
      });
    }
  });
});

// === Collapse/Expand JSON (per section) ===
function collapseAllJson(btn) {
  // Find nearest pre element
  var container = btn ? btn.closest('.response-block, .examples-section, .params-section') : null;
  var pre = container ? container.querySelector('pre') : null;
  if (!pre) pre = document.querySelector('pre');
  if (!pre) return;
  if (pre.dataset.collapsed === 'true') {
    pre.textContent = pre.dataset.full || pre.textContent;
    pre.dataset.collapsed = 'false';
    if (btn) btn.textContent = '⇕ Свернуть всё';
  } else {
    pre.dataset.full = pre.textContent;
    var lines = pre.textContent.split('\n');
    pre.textContent = lines[0] + '\n  ...\n' + lines[lines.length - 1];
    pre.dataset.collapsed = 'true';
    if (btn) btn.textContent = '⇕ Развернуть всё';
  }
}

// Fix collapse-link to pass itself
document.querySelectorAll('.collapse-link').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    collapseAllJson(this);
  });
});

// === Response accordion toggle ===
function toggleAccordion(header) {
  var accordion = header.closest('.response-accordion');
  if (!accordion) return;
  var isOpen = accordion.classList.contains('open');
  var body = accordion.querySelector('.response-accordion-body');
  var arrow = header.querySelector('.resp-accordion-arrow');
  if (isOpen) {
    accordion.classList.remove('open');
    if (body) body.style.display = 'none';
    if (arrow) arrow.textContent = '›';
  } else {
    accordion.classList.add('open');
    if (body) body.style.display = '';
    if (arrow) arrow.textContent = '∨';
  }
}

// Init: sync body visibility with open class on load
document.querySelectorAll('.response-accordion').forEach(function(accordion) {
  var body = accordion.querySelector('.response-accordion-body');
  var arrow = accordion.querySelector('.resp-accordion-arrow');
  if (!accordion.classList.contains('open')) {
    if (body) body.style.display = 'none';
    if (arrow) arrow.textContent = '›';
  } else {
    if (body) body.style.display = '';
    if (arrow) arrow.textContent = '∨';
  }
});

// === Schema block toggle ===
function toggleSchemaBlock(toggle) {
  var row = toggle.closest('.schema-row');
  if (!row) return;
  var next = row.nextElementSibling;
  if (!next) return;
  if (next.style.display === 'none') {
    next.style.display = '';
    toggle.textContent = '˅';
  } else {
    next.style.display = 'none';
    toggle.textContent = '˄';
  }
}

// === Collapsible sidebar groups ===
document.querySelectorAll('.sidebar-group-title.collapsible').forEach(function(title) {
  title.addEventListener('click', function() {
    var group = this.closest('.sidebar-group');
    var menu = group ? group.querySelector('.sidebar-menu') : this.nextElementSibling;
    var arrow = this.querySelector('.arrow');
    if (menu) {
      var isHidden = menu.style.display === 'none';
      menu.style.display = isHidden ? '' : 'none';
      if (arrow) arrow.textContent = isHidden ? '∨' : '›';
    }
  });
});

// Init sidebar: close non-active groups
document.querySelectorAll('.sidebar-group').forEach(function(group) {
  var menu = group.querySelector('.sidebar-menu');
  var title = group.querySelector('.sidebar-group-title');
  var arrow = title ? title.querySelector('.arrow') : null;
  if (menu && !group.classList.contains('open')) {
    menu.style.display = 'none';
    if (arrow) arrow.textContent = '›';
  }
});

// === Smooth scroll for sidebar links ===
document.querySelectorAll('.sidebar-menu a[href^="#"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update active state
      document.querySelectorAll('.sidebar-menu li').forEach(function(li) {
        li.classList.remove('active');
      });
      link.closest('li') && link.closest('li').classList.add('active');
    }
  });
});

// === Highlight active section on scroll ===
var sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', function() {
  var scrollY = window.scrollY + 120;
  sections.forEach(function(section) {
    var top = section.offsetTop;
    var height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      var id = section.getAttribute('id');
      document.querySelectorAll('.sidebar-menu a').forEach(function(a) {
        var li = a.closest('li');
        if (li) {
          if (a.getAttribute('href') === '#' + id) {
            li.classList.add('active');
          } else {
            li.classList.remove('active');
          }
        }
      });
    }
  });
}, { passive: true });
