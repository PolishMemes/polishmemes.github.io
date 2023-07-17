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

console.log("Loaded.")

if (openMenu) {
  openMenu.addEventListener('click', show);
}

if (closeMenu) {
  closeMenu.addEventListener('click', close);
}

function show() {
  if (mainMenu) {
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
  }
}

function close() {
  if (mainMenu) {
    mainMenu.style.top = '-500%';
    mainMenu.style.display = 'flex';
  }
}

function openSidePanel() {
  if (sidePanel && collapse && expand) {
    sidePanel.style.display = "block";
    collapse.style.display = 'block';
    expand.style.display = "none";
  }
}

function closeSidePanel() {
  if (sidePanel && collapse && expand) {
    sidePanel.style.display = "none";
    collapse.style.display = 'none';
    expand.style.display = "block";
  }
}

if (title) {
  for (let i = 0; i < title.length; i++) {
    title[i].onclick = function () {
      closeSidePanel();
    };
  }
}

if (section) {
  for (let i = 0; i < section.length; i++) {
    section[i].onclick = function () {
      closeSidePanel();
    };
  }
}

if (subSection) {
  for (let i = 0; i < subSection.length; i++) {
    subSection[i].onclick = function () {
      closeSidePanel();
    };
  }
}

var myVar;

function loaderFunction() {
  myVar = setTimeout(showPage, 1400);
}

function showPage() {
  const loader = document.getElementById("loader");
  const page = document.getElementById("page");
  if (loader && page) {
    loader.style.display = "none";
    page.style.display = "block";
  }
}

window.onload = loaderFunction;
