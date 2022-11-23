const endpoint = 'https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects'

let projectImg = document.querySelectorAll('.project-box img');
let projectH4 = document.querySelectorAll('.project-box h4');
let projectP = document.querySelectorAll('.project-box p');

// FORM

let fullName = document.getElementById('full-name')
let submitBtn = document.getElementById('submit-btn')

function validateForm(){
if(fullName.value.toLowerCase() === "ironhack"){
    alert('You cannot be Ironhack, because I am Ironhack.')
}
else {
    alert('Thanks for contacting us!');
  }
}


let title = document.getElementById('title-proj')
let content = document.getElementById('content-proj')
let date = document.getElementById('date-proj')
let subtitle = document.getElementById('subtitle-proj')
let image = document.getElementById('image-proj')



let apiData;
const getData = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    apiData = data;
    return data;
}


(async () => {
    await getData();
    let counter = 0;
    
    for(i=apiData.length-1; i>0; i--){
        if(counter < projectImg.length){
            console.log(title.textContent)
            if(title.textContent === apiData[i].name)
            {
                continue;
            }
            else if(title.textContent != apiData[i].name){
                projectImg[counter].src = apiData[i].image;
                projectH4[counter].innerHTML = apiData[i].name
                projectP[counter].innerText = apiData[i].description;
                counter++
            }
            
        }
    }
  })();


  async function loadProjectPage(){
    let id = getId();
    await getData();
    console.log(apiData[id])
    console.log(id)
    let projectData = apiData.filter((obj) => {return obj.uuid === id})
    title.innerText = projectData[0].name
    subtitle.innerText = projectData[0].description
    content.innerText = projectData[0].content
    date.innerText = projectData[0].completed_on
    image.src = projectData[0].image

  }

function getId(){
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    let id = urlParams.get("projectId");
    return id;
}


window.addEventListener('click', () => {
    submitBtn.addEventListener('click', validateForm)
    
    
  });