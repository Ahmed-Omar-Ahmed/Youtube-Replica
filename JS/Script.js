const tabBox = document.querySelector(".tab-box"),
  allTabs = tabBox.querySelectorAll(".tab"),
  arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;

const handleIcons = (scrollVal) => {
  let maxScrollableWidth = tabBox.scrollWidth - tabBox.clientWidth;
  arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
  arrowIcons[1].parentElement.style.display =
    maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // if clicked icon is left, reduce 350 from tabBox scrollLeft else add
    let scrollWidth = (tabBox.scrollLeft += icon.id === "left" ? -340 : 340);
    handleIcons(scrollWidth);
  });
});

const refresher = document.querySelector(".refresh");
allTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabBox.querySelector(".active").ariaSelected = "false";
    tabBox.querySelector(".active").classList.remove("active");
    tab.classList.add("active");
    tab.ariaSelected = "true";
    refresh();
  });
});

function refresh() {
  refresher.classList.add("active");
  setTimeout(() => {
    refresher.classList.remove("active");
    const videoSlot = document.querySelectorAll(".video-container");
    videoSlot.forEach(
      (slot) =>
        (slot.style.order = Math.floor(Math.random() * videoSlot.length))
    );
  }, 750);
}

const dragging = (e) => {
  if (!isDragging) return;
  tabBox.classList.add("dragging");
  tabBox.scrollLeft -= e.movementX;
  handleIcons(tabBox.scrollLeft);
};

const dragStop = () => {
  isDragging = false;
  tabBox.classList.remove("dragging");
};

tabBox.addEventListener("pointerdown", () => (isDragging = true));
tabBox.addEventListener("pointermove", dragging);
document.addEventListener("pointerup", dragStop);

// Category Bar carousel End

const menuIcon = document.getElementById("YT-Menu-icon");
const menu = document.querySelector(".side-menu");
const menuClone = document.querySelector(".side-menu-clone");

menuIcon.addEventListener("click", function () {
  menu.classList.toggle("active");
  menuClone.classList.toggle("active");
  refresher.classList.toggle("cover");
});

// Menu function End

let videoID = 1;

const videoHolder = document.querySelectorAll(".video-holder");
videoHolder.forEach((container) => {
  const thumbnails = container.querySelector(".lazy-load");
  (imgSource = "Images/Thumbnails/Video-" + videoID + ".png"),
    thumbnails.setAttribute("data-lazy", imgSource);
  if (videoID >= 36) {
    videoID = 1;
  } else {
    videoID++;
  }
});

// Setting the thumbnails' src automatically End

const targets = document.querySelectorAll(".lazy-load");

const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-lazy");
        img.setAttribute("src", src);
        img.classList.add("imgShow");
        setTimeout(() => {
          img.classList.toggle("loaded");
        }, 750);
        observer.disconnect();
      }
    });
  });
  io.observe(target);
};

targets.forEach(lazyLoad);

// Images lazy load End

const YTicon = document.getElementById("Yt-Icon");
YTicon.addEventListener("click", function () {
  refresh();
});

// Yt icon functionality End

const SearchField = document.getElementById("Searchfield");
const SearchBtn = document.getElementById("SearchBtn");

const SearchTrigger = document.getElementById("searchFieldTrigger");
const mobileSearchField = document.querySelector(".mobile-search-field");
const exitArrow = document.getElementById("ExitArrow");
const mobileSearchBox = document.getElementById("Mobile-Searchbox");
const mobileSearchBTN = document.getElementById("mobile-search-icon");

SearchBtn.addEventListener("click", () => {
  if (SearchField.value === "") {
    return;
  } else {
    window.location.assign(
      "https://www.youtube.com/results?search_query=" + SearchField.value
    );
  }
});

SearchField.addEventListener("focusin", () => {
  document.addEventListener("keypress", (event) => {
    let keyCode = event.key;
    if (keyCode === "Enter") {
      SearchBtn.click();
    }
  });
});

// -------------------------

SearchTrigger.addEventListener("click", () => {
  mobileSearchField.classList.add("active");
});

exitArrow.addEventListener("click", () => {
  mobileSearchField.classList.remove("active");
  mobileSearchBox.value = "";
});

mobileSearchBTN.addEventListener("click", () => {
  console.log(mobileSearchBox.value);
  if (mobileSearchBox.value === "") {
    return;
  } else {
    window.location.assign(
      "https://www.youtube.com/results?search_query=" + mobileSearchBox.value
    );
  }
});

mobileSearchBox.addEventListener("focusin", () => {
  document.addEventListener("keypress", (event) => {
    let keyCode = event.key;
    if (keyCode === "Enter") {
      mobileSearchBTN.click();
    }
  });
});
//Searchbar functionality End

const header = document.getElementById("Yt-header");

let scrollPos = 0;
window.addEventListener("scroll", function () {
  if (document.body.getBoundingClientRect().top > scrollPos) {
    header.classList.remove("collapse");
  } else {
    header.classList.add("collapse");
    exitArrow.click();
  }
  scrollPos = document.body.getBoundingClientRect().top;
});

var velX = 0;
var momentumID;

tabBox.addEventListener("wheel", (e) => {
  cancelMomentumTracking();
});

function beginMomentumTracking() {
  cancelMomentumTracking();
  momentumID = requestAnimationFrame(momentumLoop);
}

function cancelMomentumTracking() {
  cancelAnimationFrame(momentumID);
}

function momentumLoop() {
  tabBox.scrollLeft += velX * 2;
  velX *= 0.95;
  if (Math.abs(velX) > 0.5) {
    momentumID = requestAnimationFrame(momentumLoop);
  }
}
