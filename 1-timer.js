import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f as h,i as f}from"./assets/vendor-BbbuE1sJ.js";const e={dateTime:document.querySelector("#datetime-picker"),startBtn:document.querySelector("button[data-start]"),days:document.querySelector("span[data-days]"),hours:document.querySelector("span[data-hours]"),minutes:document.querySelector("span[data-minutes]"),seconds:document.querySelector("span[data-seconds]")};let a=null,s=null;const y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){a=t[0],a<Date.now()?(f.error({title:"Error",message:"Please choose a date in the future!",position:"topRight",timeout:4e3}),e.startBtn.disabled=!0):e.startBtn.disabled=!1}};h("#datetime-picker",y);e.startBtn.addEventListener("click",t=>{e.startBtn.disabled=!0,e.dateTime.disabled=!0,s=setInterval(()=>{const o=a-Date.now();if(o<=0){clearInterval(s),d(u(0)),e.dateTime.disabled=!1;return}const r=u(o);d(r)},1e3)});function d(t){e.days.textContent=n(t.days),e.hours.textContent=n(t.hours),e.minutes.textContent=n(t.minutes),e.seconds.textContent=n(t.seconds)}function n(t){return String(t).padStart(2,"0")}function u(t){const i=Math.floor(t/864e5),c=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:i,hours:c,minutes:l,seconds:m}}
//# sourceMappingURL=1-timer.js.map
