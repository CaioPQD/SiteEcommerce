
window.onload = function() {
  getAllProducts(); 
  getProductsMoreVisited();
  
  const formulario = document.querySelector('#form-pesquisa');
  formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.querySelector('#inpt-search');
    window.location.href = `./pesquisa.html?pesquisa=${input.value}`;
  });
}

async function getAllProducts() {
  let output = '';
  const containerPrincipal = document.querySelector('#container-produtos');
  const response = await fetch('https://fakestoreapi.com/products');
  const itens = await response.json();
  
  itens.forEach(item => {
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
    
    output += `
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
  });
  containerPrincipal.innerHTML = output;
}

async function getProductsMoreVisited() {
  let output = '';
  const containerLateral = document.querySelector('#mais-visitados');
  const response = await fetch('https://fakestoreapi.com/products?limit=5&sort=desc');
  const itens = await response.json();
  
  itens.forEach(item => {
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
    
    output += `
      <div>
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
  });
  containerLateral.innerHTML = output;
}