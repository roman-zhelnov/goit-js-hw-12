import{S as u,i}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function p(a){const t="https://pixabay.com/api/",s="45157582-00dbe423a45a27ad3340fe116",l=new URLSearchParams({key:s,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${t}?${l}`).then(e=>{if(!e.ok)throw new Error("Network response was not ok");return e.json()})}function y(a,t){const s=a.hits.map(e=>`<li
      class="gallery-item">
    <a class="gallery-link" href=${e.largeImageURL}>
    <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}"/>
    <div class="gallery-wrap">
    <p class="gallery-text"><span class="gallery-span">Likes</span>${e.likes}</p>
    <p class="gallery-text"><span class="gallery-span">Views</span>${e.views}</p>
    <p class="gallery-text"><span class="gallery-span">Comments</span>${e.comments}</p>
    <p class="gallery-text"><span class="gallery-span">Downloads</span>${e.downloads}</p>
    </div>
    </a>
    </li>`).join("");t.insertAdjacentHTML("beforeend",s),new u(".gallery-list a",{captionsData:"alt",captionDelay:250}).refresh()}const f=document.querySelector(".form-gallery"),c=document.querySelector(".form-gallery-input"),o=document.querySelector(".loader"),d=document.querySelector(".gallery-list");f.addEventListener("submit",m);function m(a){a.preventDefault(),d.innerHTML="",o.classList.remove("visually-hidden");const t=c.value.trim().toLowerCase();if(t===""){o.classList.add("visually-hidden");return}p(t).then(s=>{o.classList.add("visually-hidden"),s.hits.length===0?i.error({maxWidth:"370px",position:"topRight",messageColor:"white",backgroundColor:"red",message:"Sorry, there are no images matching your search query. Please try again!"}):(o.classList.add("visually-hidden"),y(s,d))}).catch(s=>{o.classList.add("visually-hidden"),i.error({maxWidth:"370px",position:"topRight",messageColor:"white",backgroundColor:"red",message:" Sorry, there was an error connecting to the server!"}),console.error(s)}).finally(()=>{c.value="",a.target.reset()})}
//# sourceMappingURL=commonHelpers.js.map
