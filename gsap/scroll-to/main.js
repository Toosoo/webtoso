import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollToPlugin);
  
 const btn1 = document.getElementById("btn1")
 const btn2 = document.getElementById("btn2")
 const btn3 = document.getElementById("btn3")
 
 gsap.utils.toArray("button").forEach((btn, index) => {
  
  btn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 5, 
      scrollTo:{
        y:"#section" + (index + 1),
        offsetY:100,
        autoKill:true,
        // onAutoKill:()=>console.log('done')
      },
      onComplete:()=>console.log('done')
  })
  });

});


});
