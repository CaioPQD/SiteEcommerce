window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  getOneProduct(id); 
}

function getOneProduct(id){
  const containerPrincipal = document.querySelector('#container-produtos');
  
  fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res=>res.json())
  .then(item => {
    const contEstrelas = Math.round(item.rating.rate);
    const countAvalidacoes = item.rating.count;
    let strStar = '';
    
    for (let i = 0; i < 5; i++) {
      if (i <= contEstrelas) {
        strStar += '★';
      } else {
        strStar += '☆';
      }
    }
    
    let output = `
      <div class="col-md-4 col-sm-6">
        <div class="card">
          <img src="${item.image}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <p>${strStar} (${countAvalidacoes})</p>
            <p class="red">$ ${item.price}</p>
            <a href="./detalhes.html?id=${item.id}" class="btn btn-primary">Detalhar</a>
          </div>
        </div>
      </div>
    `;
    containerPrincipal.innerHTML = output;
  })
  
}