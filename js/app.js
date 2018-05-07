const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

//random dog images
fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  .then(data => generateImage(data.message));

//list of breeds
fetch('https://dog.ceo/api/breeds/list')
  .then(response => response.json())
  .then(data => generateBreedList(data.message));


const generateImage = url => {
  const html = `
    <img src='${url}' alt/>
    <p>Click to view images of ${select.value}s</p>
  `;
  card.innerHTML = html;
}

const generateBreedList = data => {
  const options = data.map((item) => `
    <option value='${item}'>${item}</option>
  `).join('');
  select.innerHTML = options;
}