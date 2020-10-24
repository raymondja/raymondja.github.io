// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortByKey(original, compare, key) {
  if (original[key] < compare[key]) {
    return -1;
  } if (original[key] > compare[key]) {
    return 1;
  }
  return 0;
}

// Randomizer works: 5:10 PM
function randomize(max) {
  const num = Math.floor(Math.random() * Math.floor(max));
  // console.log(num);
  return num;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const newArr = range(10);
      const countryList = newArr.map(() => {
        const num = randomize(244);
        return fromServer[num];
      });

      const reversal = countryList.sort((a, b) => sortByKey(b, a, 'name'));
      const list = document.createElement('ul');
      list.className = 'flex-inner';
      $('form').prepend(list);

      reversal.forEach((element, i) => {
        const li = document.createElement('li');
        $(list).append(`<input type="checkbox" value=${element.code} id=${element.code} />`);
        $(list).append(`<label for=${element.code}>${element.name}</label>`);
        $(list).append(li);
      });
    })
  // .catch((err) => console.log(err));
});