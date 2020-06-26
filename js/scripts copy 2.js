const home = document.querySelector(".home");
const vid = document.querySelector("#opening-video");
const hoverRect = document.querySelector(".hover-space")


// Execute this after the main, "heavy" video is loaded
// This code replaces videos, hides the message



// DETECT MOBILE FOR MAIN PAGE
//IF MOBILE: remove video elements
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || home) {

  if (hoverRect) {
    hoverRect.remove();
    let el = document.querySelector('#before-loaded')
    let newEl = document.querySelector('#opening-video')
    if (el && newEl) {
      el.remove()
      newEl.remove();
    }
    document.querySelector('main').style.visibility = "visible";
    document.querySelector('.background-element').classList.add("opacityIn");
    document.querySelector('nav').classList.add("scaleIn");
    run(4000, 5);
    console.log(document.getElementById("bg-img").src);
  }
}
// DESKTOP, IF OPENING PAGE
// CHANGE CURSOR TO WAIT BEFORE THE VIDEO IS ABLE TO PLAY
if (vid) {
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

    let el = document.querySelector('#before-loaded')
    let newEl = document.querySelector('#opening-video')

    vid.addEventListener('loadeddata', function() {
      hoverRect.addEventListener('click', () => {


        if (vid.readyState <= 4) {
          document.body.style.cursor = "wait";
        }

      })


    });
    // hoverRect.addEventListener('click', () => {
    //   document.body.style.cursor = "wait";
    //   vid.addEventListener("canplaythrough", () => {
    //     document.body.style.cursor = "default";
    //     el.addEventListener('ended', function() {
    //
    //     });
    //   })
    // })

    // on click hover rect
    //   check if loadeddata == true
    //     // if can play
    //       when video ended (el.addEventListener('ended', ...);)
    //         video replace
    //
    // (on click: cursor -> wait)
    //     (when main video can play cursor->pointer)



    vid.addEventListener("loadeddata", () => {


      let counter = 0;

      function counterUpdate() {
        counter++;
      }
      el.addEventListener('ended', counterUpdate, false);
      // let allSources = document.getElementById("face-vid").src;



      //what if the first video ends but you don't click again

      hoverRect.addEventListener('click', () => {

        hoverRect.classList.toggle("hide");


        let waitingTime = 4000;
        if (counter == 0) {
          // document.body.style.cursor ="wait";
          el.addEventListener('ended', myHandler, false);

          function myHandler(e) {
            // document.body.style.cursor ="pointer";

            newEl.classList.toggle("hide");
            newEl.classList.toggle("video-styles");
            el.parentNode.replaceChild(newEl, el);
            document.body.style.cursor = "default";
            setTimeout(showMenu, waitingTime);

          }
        } else if (counter == 1) {


          newEl.classList.toggle("hide");
          newEl.classList.toggle("video-styles");
          el.parentNode.replaceChild(newEl, el);
          document.body.style.cursor = "default";
          setTimeout(showMenu, waitingTime);

        }

        function showMenu() {
          document.querySelector('main').style.visibility = "visible";
          document.querySelector('.background-element').classList.add("opacityIn");
          document.querySelector('nav').classList.add("scaleIn");

          run(4000, 5);


          console.log(document.getElementById("bg-img").src);
        }

      });


    });
  }
}

let bgImages = document.querySelectorAll("#bg-img")
let arrayBgImages = Array.from(bgImages)

console.log(arrayBgImages);

function run(interval, frames) {
  var int = 2;

  function func() {

    let dataSource = arrayBgImages[0].getAttribute("data-src");
    arrayBgImages[0].src = `${dataSource + int}.jpg`

    int++;
    if (int === frames) {
      int = 1;
    }
  }

  var swap = window.setInterval(func, interval);
}


//ABOUT SECTION

if (document.querySelector("section")) {


  document.querySelector(".navigation-top").addEventListener("click", () => {

    document.querySelectorAll(".element").forEach(element => {
      element.classList.toggle("logoOpen")
    })
    console.log("clicked");
    document.querySelector(".banner").classList.toggle("active")
    document.querySelector(".navigation-top ul").classList.toggle("active")
  })
}

let sectionAbout = document.getElementById("about-section");
let sectionOpenCall = document.getElementById("open-call-section")
let sectionArchive = document.getElementById("archive-section")

if (sectionOpenCall) {

}
if (sectionArchive) {
  run(7000, 5);
}

if (sectionAbout) {

  console.log("about");

  document.querySelector('.banner').classList.add("banner-animation");

  let faceVid = document.getElementById("face-vid");
  let soundStatus = faceVid.muted;
  let playStatus = faceVid.paused;
  let unmuteButton = document.getElementById("unmute-btn");
  unmuteButton.addEventListener("click", (e) => {
    console.log("clicked")
    e.preventDefault()
    if (soundStatus) {
      unmuteButton.classList.remove("highlight");
      playButton.classList.add("highlight");
      faceVid.muted = false;
      soundStatus = false;

    } else if (!soundStatus) {
      unmuteButton.classList.add("highlight");
      faceVid.muted = true;
      soundStatus = true;
    }

  })

  let playButton = document.getElementById('play-button');
  playButton.addEventListener('click', (e) => {
    unmuteButton.classList.remove("highlight");
    playButton.classList.add("highlight");
    e.preventDefault()
    smoothScroll(document.querySelector('.faces'))
    faceVid.muted = false;
    faceVid.play();
  })

}
window.smoothScroll = function(target) {
  var scrollContainer = target;
  do { //find scroll container
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do { //find the top of target relatively to the container
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function(c, a, b, i) {
    i++;
    if (i > 30) return;
    c.scrollTop = a + (b - a) / 30 * i;
    setTimeout(function() {
      scroll(c, a, b, i);
    }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

let videoNames = document.querySelectorAll("#video-name")

function changeVideo(a) {
  videoName.src = a;
}
let videoInView = document.getElementById("video-src")
let videocontainer = document.getElementById("face-vid")
videoNames.forEach(videoName => {

  videoName.addEventListener("click", function(e) {
    e.preventDefault()
    // console.log(e.target);
    videoNames.forEach(videoNameInside => {
      videoNameInside.classList.remove("current")
    })

    e.target.classList.add("current")
    if (videoInView.getAttribute("data-src") === videoName.getAttribute("data-src")) {
      return;
    } else {

      console.log("ss");
      console.log(videoName.getAttribute("data-src"));
      console.log(videoInView.getAttribute("data-src"));
      videocontainer.pause();
      videoInView.setAttribute('src', videoName.getAttribute("data-src"));
      videoInView.setAttribute('data-src', videoName.getAttribute("data-src"));
      videocontainer.load();
      videocontainer.play();
      document.getElementById("play-button").classList.add("highlight")
      document.getElementById("unmute-btn").classList.remove("highlight")
      videocontainer.muted = false;
    }

  });

})