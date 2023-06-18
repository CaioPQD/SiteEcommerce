window.onload = function() {
  const urlParams = new URLSearchParams(window.location.search);
  const pesquisa = urlParams.get('pesquisa');
  searchProducts(pesquisa); 
  
  const formulario = document.querySelector('#form-pesquisa');
  formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.querySelector('#inpt-search');
    window.location.href = `./pesquisa.html?pesquisa=${input.value}`;
  });
}

async function searchProducts(pesquisa){
  let output = '';
  const containerPrincipal = document.querySelector('#container-produtos');
  const response = await fetch('https://fakestoreapi.com/products');
  const itens = await response.json();
  
  arrayFiltro = itens.filter(item => {
    return item.title.toLowerCase().includes(pesquisa.toLowerCase());
  });
  
  arrayFiltro.forEach(item => {
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