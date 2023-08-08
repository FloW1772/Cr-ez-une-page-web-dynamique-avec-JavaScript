function openModal(imageUrl, title) {
    const modal = document.getElementById('myModal');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
  
    modalImage.src = imageUrl;
    modalTitle.textContent = title;
  
    modal.style.display = 'block';
  }
  // openModalLink.addEventListener('click', () => {
  //   for (let project of projects) {
  //     openModal(project.imageUrl, project.title);
  //   }
  // });
  if (isAdmin()){
    const portfolioTitle  = document.querySelector(".portfolio-title");
    const modifyBtn = document.createElement("button") 
    modifyBtn.setAttribute('id', 'modify-btn')
    modifyBtn.innerHTML = `<i></i> <span>modifier</span>`
    portfolioTitle.appendChild(modifyBtn)

  }