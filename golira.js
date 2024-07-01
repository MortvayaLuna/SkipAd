// ==UserScript==
// @name         SkipAd
// @version      1.0
// @description  fck yt and your fckin ads
// @author       MortavyaLuna
// @icon         https://imgur.com/gallery/just-doge-VAi3QCZ
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
  
    const AD_CLASS = "ad-showing";
    const SKIP_TIME = 5000;
    const SKIP_BUTTON_CLASS = "ytp-skip-ad-button";
  
    const getVideoElem = () => document.querySelector("video.html5-main-video");
      
    const adHandler = (media) => {
     
      const moviePlayer = document.querySelector("#movie_player");
  
      if (moviePlayer.classList.contains(AD_CLASS)) {
  
        media.muted = true;
  
        setTimeout(() => {
          const skipBtn = document.querySelector(`button.${SKIP_BUTTON_CLASS}`);
          if (!skipBtn) return;
  
          skipBtn.click();
        }, SKIP_TIME);
      } else {
   
        media.muted = false;
      }
    };
  
    const urlChecker = (url) => url.includes("youtube.com/watch");
  
    const observeUrlChange = () => {
      
      let prev_url = undefined;
  
      const observer = new MutationObserver((_mutations) => {
        const current_url = document.location.href;
  
        if (prev_url && prev_url === current_url) return;
  
        prev_url = current_url;
  
        if (!urlChecker(current_url)) return;
  
        const mainVideo = getVideoElem();
        if (!mainVideo) return;
        mainVideo.oncanplay = (e) => adHandler(e.target);
      });
  
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    };
  
    window.onload = () => {
      if (urlChecker(window.location.href)) adHandler(getVideoElem());
  
      observeUrlChange();
    };
  })();