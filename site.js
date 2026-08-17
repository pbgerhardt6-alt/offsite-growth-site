(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if(!('IntersectionObserver' in window)||reduce){els.forEach(function(e){e.classList.add('in')});}
  else{
    var idx=function(e){return Array.prototype.slice.call(e.parentNode.children).filter(function(n){return n.classList.contains('reveal')}).indexOf(e)};
    var show=function(e){if(e.classList.contains('in'))return;var i=idx(e);e.style.transitionDelay=(i>0?Math.min(i,5)*70:0)+'ms';e.classList.add('in')};
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){show(x.target);io.unobserve(x.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(e){io.observe(e)});
    /* Fallback: the observer does not always deliver an initial callback for
       elements already in the viewport, which left the whole first fold blank
       until the visitor scrolled. Sweep what is on screen after first paint. */
    var sweep=function(){els.forEach(function(e){if(e.classList.contains('in'))return;var r=e.getBoundingClientRect();if(r.top<window.innerHeight*.95&&r.bottom>0){show(e);io.unobserve(e)}})};
    requestAnimationFrame(function(){requestAnimationFrame(sweep)});
    window.addEventListener('load',sweep);
  }
  var stages=document.querySelectorAll('.stage');function setStage(stage,open){stage.classList.toggle('open',open);var b=stage.querySelector('.stage-btn');if(b)b.setAttribute('aria-expanded',open?'true':'false');}document.querySelectorAll('.stage-btn').forEach(function(btn){btn.addEventListener('click',function(){var stage=btn.parentNode;var wasOpen=stage.classList.contains('open');if(window.matchMedia('(min-width:901px)').matches){stages.forEach(function(s){setStage(s,s===stage);});}else{setStage(stage,!wasOpen);}});});document.querySelectorAll('.stage').forEach(function(st){st.addEventListener('focusin',function(){if(window.matchMedia('(min-width:901px)').matches){stages.forEach(function(s){setStage(s,s===st);});}});});if(stages.length&&window.matchMedia('(min-width:901px)').matches&&!document.querySelector('.stage.open')){setStage(stages[0],true);}
  var toggle=document.querySelector('.menu-toggle'),menu=document.getElementById('mobileMenu');
  if(toggle){toggle.addEventListener('click',function(){var open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',open?'true':'false');toggle.textContent=open?'Close':'Menu';});menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');toggle.textContent='Menu';toggle.setAttribute('aria-expanded','false')});});}
  var sticky=document.getElementById('stickyCta'),hero=document.querySelector('.hero'),finalSec=document.querySelector('.final');
  /* Every element here is page-specific: the case study has no #stickyCta.
     Same trap as the .stage guard above, so guard all three before observing. */
  if('IntersectionObserver' in window&&sticky&&hero&&finalSec){new IntersectionObserver(function(en){en.forEach(function(e){e.isIntersecting?sticky.classList.remove('show'):sticky.classList.add('show')})},{threshold:0}).observe(hero);new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting)sticky.classList.remove('show')})},{threshold:.2}).observe(finalSec);}
})();
