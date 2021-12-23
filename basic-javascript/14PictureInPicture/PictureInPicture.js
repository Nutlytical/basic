const video=document.getElementById('video');
const requestbtn=document.getElementById('requestbtn');
const sharebtn=document.getElementById('sharebtn');

requestbtn.addEventListener('click',()=>{
    selectMediaStream();
});

sharebtn.addEventListener('click',async ()=>{
    sharebtn.disabled=true;
    await video.requestPictureInPicture();
    sharebtn.disabled=false;
});

// ส่งคำขอเข้าถึงอุปกรณ์
async function selectMediaStream(){
    try {
        const mediastream=await navigator.mediaDevices.getDisplayMedia();
        video.srcObject=mediastream
        video.onloadedmetadata=()=>{
            video.play();
        }
    } catch (error) {
        console.log(error);
    }
}