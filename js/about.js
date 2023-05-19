function openOverlay(contentId) {
    var content = document.getElementById(contentId);
    var overlay = document.getElementById('overlay');
    var overlayContent = document.getElementById('aboutUsContent');
    
    if (content && overlay && overlayContent) {
      overlayContent.innerHTML = content.innerHTML;
      overlay.style.display = 'flex';
    }
  }
  
  function closeOverlay() {
    var overlay = document.getElementById('overlay');
    
    if (overlay) {
      overlay.style.display = 'none';
    }
  }
  