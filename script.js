var myHeaders = new Headers();
myHeaders.append("Cookie", "AWSALB=vSaqH97qS/++YhkW0syR0R/Ap053rBN0JO/717b/nl5pqXvXKZ009P9/mviVz9dqOdhsvHzKm1+0yZlgeuMYL5HHsCJ+tHGf56tHOym/gp2PwOy+j9Jc3mIEUuvK; AWSALBCORS=vSaqH97qS/++YhkW0syR0R/Ap053rBN0JO/717b/nl5pqXvXKZ009P9/mviVz9dqOdhsvHzKm1+0yZlgeuMYL5HHsCJ+tHGf56tHOym/gp2PwOy+j9Jc3mIEUuvK");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

function getParks(state, num) {
fetch(`https://developer.nps.gov/api/v1/parks?limit=${num}&api_key=W9cihIaRHWJGEhy0yNcajtOCjOwEKHZC68cPUBwJ&stateCode=${state}`, requestOptions)
  .then(response => response.json())
  .then(result => displayResult(result))
  .catch(error => console.log('error', error));
}

function displayResult(result) {
    console.log(result);
    $('#results-list').empty();
    let parkInfo = result.data;
    for (let i = 0; i < parkInfo.length; i++) {
        $('#results-list').append(`<li><h3>${parkInfo[i].fullName}</h3><br>
        <p>${parkInfo[i].description}</p><br>
        <a href="${parkInfo[i].url}">${parkInfo[i].url}</a></li>`);
        $('#results').removeClass('hidden');
    }
}

function getSubmit() {
    $('form').submit(event =>{
        let state = $('select[type="search"]').val();
        let num = $('input[type="number"]').val();
        console.log('submit');
        event.preventDefault();
        getParks(state, num);
    })
}

$(function () {
    console.log('App loaded! Waiting for submit')
    getSubmit();
})