function menuShow() {
  let menuMobile = document.querySelector('.mobile-menu');
  if (menuMobile.classList.contains('open')) {
    menuMobile.classList.remove('open');
    document.querySelector('.icon').src = "menu_white_36dp.svg";
  } else {
    menuMobile.classList.add('open');
    document.querySelector('.icon').src = "close_white_36dp.svg";
  }
}

// Função para buscar os serviços com base no tipo e bairro
function buscarServicos(tipo, bairro) {
  const url = `https://back-end-saude-recife-1.onrender.com/api/servicos/${encodeURIComponent(tipo)}/${encodeURIComponent(bairro)}`;;
  
  // Usando fetch para buscar os dados da API
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Serviços não encontrados.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Serviços encontrados:', data);
      // Aqui você pode manipular os dados retornados, como renderizar no HTML
    })
    .catch(error => {
      console.error('Erro ao buscar serviços:', error);
    });
}

// Exemplo de chamada com tipo e bairro
buscarServicos('caps', 'casa amarela');



