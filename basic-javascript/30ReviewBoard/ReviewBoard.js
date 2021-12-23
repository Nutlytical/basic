const userdata = [
    {
        name: "jojo",
        job: "career 1",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quod.",
        image: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
        name: "jaja",
        job: "career 2",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quod.",
        image: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    {
        name: "jeje",
        job: "career 3",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quod.",
        image:  "https://randomuser.me/api/portraits/women/18.jpg"
    },
    {
        name: "juju",
        job: "career 4",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quod.",
        image: "https://randomuser.me/api/portraits/women/60.jpg"
    },
    {
        name: "jiji",
        job: "career 5",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quod.",
        image: "https://randomuser.me/api/portraits/women/82.jpg"
    }
];

const review=document.querySelector('.review');
const userImage=document.querySelector('.userImage');
const userName=document.querySelector('.userName');
const userJob=document.querySelector('.userJob');

let activeIndex = 1;

function showReview(){
    const {name,job,text,image} = userdata[activeIndex];
    review.innerHTML=text;
    userImage.src=image;
    userName.innerHTML=name;
    userJob.innerHTML=job;
    activeIndex++;

    if(activeIndex>userdata.length-1){
        activeIndex=0;
    }
}

setInterval(showReview,5000);