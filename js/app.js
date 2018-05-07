const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  .then(data => generateImage(data.message));


const generateImage = url => {
  const html = `
    <img src='${url}' alt/>
  `;
  card.innerHTML = html;
}