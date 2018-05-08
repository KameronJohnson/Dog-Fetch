const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');

// reusable data fetching
const fetchData = url => {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log("Houston, we have a problem!", error));
}

//fetch random dog images
fetchData('https://dog.ceo/api/breeds/image/random')
  .then(data => generateImage(data.message));

//fetch list of breeds
fetchData('https://dog.ceo/api/breeds/list')
  .then(data => generateBreedList(data.message));

//fetch breed image
const fetchBreedImage = () => {
  const breed = select.value;
  const img = card.querySelector('img');
  const paragraph = card.querySelector('p');

  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
      paragraph.textContent = `Click to view more ${breed}s`
    });
}

//generate dog image
const generateImage = url => {
  const html = `
    <img src='${url}' alt/>
    <p>Click to view images of ${select.value}s</p>
  `;
  card.innerHTML = html;
}

//generate select options
const generateBreedList = data => {
  const options = data.map((item) => `
    <option value='${item}'>${item}</option>
  `).join('');
  select.innerHTML = options;
}

//check the status
function checkStatus(res) {
  if (res.ok) {
    return Promise.resolve(res);
  } else {
    return Promise.reject(new Error(res.statusText));
  }
}

select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);