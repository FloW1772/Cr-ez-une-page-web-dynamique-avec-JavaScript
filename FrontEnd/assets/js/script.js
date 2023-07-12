let gallery = document.querySelector('.gallery')
let projects = []

async function getProjects(){
  await fetch ('http://localhost:5678/api/works')
    .then((response)=>response.json())
    .then((data)=>{
      projects = data
    })
    .catch((error)=>console.log(error))

}

async function displayProjects(){
  await getProjects()
  console.log(projects)  
  for(let project of projects){
    console.log(project)
    let figure = document.createElement('figure')
    figure.setAttribute('class','display')

    let image = new Image();  // Créer un nouvel élément d'image
    image.src = project.imageURL; // Définir la source de l'image
    image.alt = project.title;
    figure.appendChild(image);

    let caption = document.createElement('figcaption');
    caption.innerText = project.title;
    figure.appendChild(caption);

    gallery.appendChild(figure);
  }
}

displayProjects();