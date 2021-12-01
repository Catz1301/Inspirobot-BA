var ticking = false;
var last_known_scroll_position = 0
window.addEventListener('load', function(e) {
  let imgs = document.getElementsByClassName('inspImg');
  for (let i = 0; i < imgs.length; i++) {
    getInspirobotImage(imgs[i]);
  }
  for (let i = 0; i < 12; i++) {
    addImage();
  }
});


function getInspirobotImage(el) {
  let url = "https://inspirobot.me/api?generate=true";
  fetch(url).then((response) => {
    response.text().then((result) => {
      el.src = result;
    });
  });
}

function downloadImage(e) {
  fetch(e.target.src).then((result) => {
    result.blob().then((blob) => {
      let fileName = e.target.src.substr(e.target.src.lastIndexOf('/') + 1);
      let file = new File([blob], fileName);
      let adownloadEl = document.createElement('a');
      adownloadEl.id = "downloadEl";
      adownloadEl.download = fileName;
      let fileObjURL = URL.createObjectURL(file);
      adownloadEl.href = fileObjURL;
      document.body.append(adownloadEl);
      let adownload = document.getElementById('downloadEl');
      adownload.click();
      adownload.remove();
      URL.revokeObjectURL(fileObjURL);
    })
  });
  //console.log('meow!');
}

function checkScroll(currentScroll, lastKnownScroll) {
  if (currentScroll - lastKnownScroll >= (window.screen.height/4)) {
    for (let i = 0; i < 4; i++)
      addImage();
  } 
}

function clickd(e) {
  //console.log(e);
  downloadImage(e);
  //emit('click');
}

window.addEventListener('scroll', function(e) {
  
  if (!ticking) {
    ticking = true;
    setTimeout(function() {
      checkScroll(window.scrollY, last_known_scroll_position);
      ticking = false;
    }, 300);
    
    last_known_scroll_position = window.scrollY;
  }
});

function addImage() {
  let grid = document.getElementsByClassName('imageSection')[0];
  let clickNum = grid.children.length;
  let imageInspiroEl = document.createElement('div');
  imageInspiroEl.classList.add('imageInspiro')
  let inspImg = document.createElement("img");
  inspImg.classList.add('inspImg');
  inspImg.onclick = "clickd(e)";
  getInspirobotImage(inspImg);
  imageInspiroEl.appendChild(inspImg);
  grid.appendChild(imageInspiroEl);
}
