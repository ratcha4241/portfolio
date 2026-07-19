document.addEventListener('DOMContentLoaded', function () {
  // เมนูมือถือ
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // ปิดเมนูมือถือเมื่อคลิกลิงก์
  if (links) {
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // เผยการ์ดขึ้นทีละใบเมื่อเลื่อนถึง (เคารพผู้ที่ปิดอนิเมชัน)
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets = document.querySelectorAll('.link-card, .work-card, .chapters li, .contact-item');

  if (!prefersReduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i % 6) * 0.06 + 's';
          entry.target.classList.add('reveal');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { io.observe(el); });
  }
});
