const ENDPOINT = 'https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects'

let projectBox = document.querySelectorAll('.project-box');
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

// ----------------------

// Project page -------

let title = document.getElementById('title-proj')
let content = document.getElementById('content-proj')
let date = document.getElementById('date-proj')
let subtitle = document.getElementById('subtitle-proj')
let image = document.getElementById('image-proj')

let learnLink1 = document.getElementById('learnM1')
let learnLink2 = document.getElementById('learnM2')
let learnLink3 = document.getElementById('learnM3')

//  ---------------------



let apiData;
const getData = async () => {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    apiData = data;
    return data;
}


(async () => {
    await getData();
    let counter = 0;
    
    for(i=apiData.length-1; i>0; i--){
        if(counter < projectImg.length){
            projectBox[counter].style.backgroundImage = `url(${apiData[i].image})`;
            projectH4[counter].innerHTML = apiData[i].name
            projectP[counter].innerText = apiData[i].description;
            counter++
        }
    }
  })();


  async function loadProjectPage(){
    let id = getId();
    await getData();
    let projectData = apiData.filter((obj) => {return obj.uuid === id})
    title.innerText = projectData[0].name
    subtitle.innerText = projectData[0].description
    content.innerText = projectData[0].content
    date.innerText = projectData[0].completed_on
    image.src = projectData[0].image

    let counter = 0;
    let href = ""
    apiData.forEach(e => {
        if(title.textContent != e.name){
            projectBox[counter].style.backgroundImage = `url(${e.image})`
            projectH4[counter].innerHTML = e.name
            projectP[counter].innerText = e.description;
            
            href = `./project-page.html?projectId=${e.uuid}`
            switch (counter){
                case 0: learnLink1.href = href;
                case 1: learnLink2.href = href;
                case 2: learnLink3.href = href;
            }
            counter++;
        }
        
    });

  }

function getId(){
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    let id = urlParams.get("projectId");
    return id;
}


window.addEventListener('load', () => {
    submitBtn.addEventListener('click', validateForm);
    
    
  });