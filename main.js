console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);


//팝업창

window.addEventListener("load", function(){
  new Popup();
})

class Popup {
  constructor(opt) {
      this.del = document.querySelector(".del");
      this.popup = document.getElementById("popup");
      this.checkBox = document.querySelector("#no");
      this.close = document.querySelector(".close");

      this.cookieName = "hyCookie=path";
      this.cookiedata = document.cookie;
      this.cookieArray = this.cookiedata.split(";");

      this.del.addEventListener("click", function(e){
          e.preventDefault();
          setCookie('hyCookie','path',-1);
      }.bind(this));

      this.close.addEventListener("click", function(e){
          e.preventDefault();
          let check = this.checkBox.checked;
          if(check) {
              setCookie('hyCookie','path',1);
              this.popup.style.display = "none";
          }
      }.bind(this));
    
      this.close.addEventListener("click", function(e){
          e.preventDefault();
          this.popup.style.display= "none";
      }.bind(this))
    
      for(let cookie of this.cookieArray) {
          if(cookie.indexOf(this.cookieName) > -1) {
              this.popup.style.display = "none";
          }else {
              this.popup.style.display = "block";
          }
      }
  }
  setCookie(name, val, due){
      let today = new Date();
      today.setDate(today.getDate() + due);
      document.cookie = name + "=" + val + "; path=/; expires=" + today.toGMTString() + ";"
  }
}


const del = document.querySelector(".del");
const popup = document.getElementById("popup");
let checkBox = document.querySelector("#no");
const close = document.querySelector(".close");

let cookieName = "hyCookie=path";
let cookiedata = document.cookie;
let cookieArray = cookiedata.split(";");

// //쿠키 셋팅하기
function setCookie(name, val, due){
let today = new Date();
today.setDate(today.getDate() + due);
document.cookie = name + "=" + val + "; path=/; expires=" + today.toGMTString() + ";"
}

// //쿠키 삭제버튼 클릭시 쿠키가 사라진다
del.addEventListener("click", function(e){
e.preventDefault();
setCookie('hyCookie','path',-1);
})

//삭제버튼 누를 때 체크박스가 체크되어 있으면 하루동안 보지 않는다. 
close.addEventListener("click", function(e){
e.preventDefault();
let check = checkBox.checked;
if(check) {
setCookie('hyCookie','path',1);
popup.style.display = "none";
}
})



close.addEventListener("click", function(e) {
  e.preventDefault();
  popup.style.display = "none";
});

let shouldShowPopup = true;

for (let cookie of cookieArray) {
  if (cookie.indexOf(cookieName) > -1) {
    shouldShowPopup = false;
    break; // 쿠키를 찾았으니 루프를 종료합니다.
  }
}

if (shouldShowPopup) {
  popup.style.display = "block";
} else {
  popup.style.display = "none";
}
