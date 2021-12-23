const contents=document.querySelectorAll('.content');

document.addEventListener('scroll',showText);

function showText(){
    contents.forEach((section)=>{
        const imgEl = section.querySelector('img');
        const textEl = section.querySelector('.text');

        const scrollPosition = window.pageYOffset;
        
        const textPosition = imgEl.offsetTop + imgEl.offsetHeight / 50;
        if(scrollPosition > textPosition){
            textEl.classList.add('show-reveal');
        }else{
            textEl.classList.remove('show-reveal');
        }
    });
}