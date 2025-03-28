const mainMenu = document.querySelector('.mainMenu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const sidePanel = document.querySelector('.sidepanel');
const collapse = document.querySelector('.collapse');
const expand = document.querySelector('.expand');
const rightCol = document.querySelector('.right-col')

const section = document.getElementsByClassName('section');
const subSection = document.getElementsByClassName('sub-section');
const title = document.getElementsByClassName('title');

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

console.log("Loaded.")

openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

function show(){
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}
function close(){
    mainMenu.style.top = '-500%';
    mainMenu.style.display = 'flex';
}

function openSidePanel() {
    sidePanel.style.display = "block";
    collapse.style.display = 'block';
    expand.style.display = "none"
}

function closeSidePanel() {
    sidePanel.style.display = "none";
    collapse.style.display = 'none';
    expand.style.display = "block"
}

if (width < 900) {
    title[0].onclick = function () {
        closeSidePanel()
    }
    title[1].onclick = function () {
        closeSidePanel()
    }
    title[2].onclick = function () {
        closeSidePanel()
    }
    title[3].onclick = function () {
        closeSidePanel()
    }
    title[4].onclick = function () {
        closeSidePanel()
    }    
}

if (width < 900) {
    section[0].onclick = function () {
        closeSidePanel()
    }
    section[1].onclick = function () {
        closeSidePanel()
    }
    section[2].onclick = function () {
        closeSidePanel()
    }
    section[3].onclick = function () {
        closeSidePanel()
    }
    section[4].onclick = function () {
        closeSidePanel()
    }    
    section[5].onclick = function () {
        closeSidePanel()
    }    
    section[6].onclick = function () {
        closeSidePanel()
    }    
    section[7].onclick = function () {
        closeSidePanel()
    }    
    section[8].onclick = function () {
        closeSidePanel()
    }    
    section[9].onclick = function () {
        closeSidePanel()
    }    
    section[10].onclick = function () {
        closeSidePanel()
    }    
}

if (width < 650) {
    subSection[0].onclick = function () {
        closeSidePanel()
    }
    subSection[1].onclick = function () {
        closeSidePanel()
    }
}

var myVar;

function loaderFunction() {
  myVar = setTimeout(showPage, 1400);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("page").style.display = "block";
}

(function() {
    const container = document.getElementById('page');
    const elements = document.querySelectorAll('.auto-position');

    function scalePage() {
        let scale = window.innerWidth / baseWidth;
        if (scale > 1) scale = 1; // Nie powiększaj na dużych ekranach

        // Ustawienie skalowania
        container.style.transform = `scale(${scale})`;
        container.style.transformOrigin = "top left";
        
        // Wyśrodkowanie treści w poziomie
        let offsetX = (window.innerWidth - baseWidth * scale) / 2;
        container.style.position = "absolute";
        container.style.left = `${offsetX}px`;
        container.style.top = "0";
        
        // Dostosowanie wysokości, aby uniknąć obcinania na mobilnych
        container.style.height = `${window.innerHeight / scale}px`;

        positionElements(); // Aktualizacja pozycji elementów
    }

    function positionElements() {
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            const elementHeight = element.offsetHeight;
            const elementWidth = element.offsetWidth;

            element.style.position = 'absolute';
            element.style.top = `${windowHeight - elementHeight}px`;
            element.style.left = `${windowWidth - elementWidth}px`;
        });
    }

    window.addEventListener('resize', scalePage);
    document.addEventListener('DOMContentLoaded', scalePage);
})();
