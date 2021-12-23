const header = document.getElementById('header');
const title = document.getElementById('title');
const description = document.getElementById('description');
const profile_img = document.getElementById('profile_img');
const adminName = document.getElementById('adminName');
const aboutMe = document.getElementById('aboutMe');

const animated_bg = document.querySelectorAll('.animated_bg')
const animated_text = document.querySelectorAll('.animated_text')

setTimeout(showContent,2000);

function showContent(){
    header.innerHTML=`<img src="https://cdn.pixabay.com/photo/2014/12/15/14/05/home-office-569153_960_720.jpg" alt="">`;
    title.innerHTML=`Working Space`;
    description.innerHTML=`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni ducimus laborum sint cupiditate quod culpa fugiat debitis illum eveniet ullam?`;
    profile_img.innerHTML=`<img src="https://randomuser.me/api/portraits/women/60.jpg" alt="">`;
    adminName.innerHTML=`Miyuki`;
    aboutMe.innerHTML=`Study with me`;

    animated_bg.forEach(el=>el.classList.remove('animated_bg'));
    animated_text.forEach(el=>el.classList.remove('animated_text'));
}