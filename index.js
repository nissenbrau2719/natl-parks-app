console.log("Ready to find National Parks");
let selectedStates = [];
let maxResults;

function displayResults(responseJson) {
  for(const park of responseJson.data) {
    $("#js-searchResults").append(`
    <li>
      <h3>${park.fullName}</h3>
      <p>${park.description}</p>
      <p>State: ${park.states}</p>
      <p><a href="${park.url}" target="_blank">Park Information</a></p>
      <p><a href="${park.directionsUrl}" target="_blank">Directions to the Park</a></p>
      <p><a href="https://www.nps.gov/${park.parkCode}/contacts.htm" target="_blank">Mailing Address/Phone/Email</a></p>
    </li>
    `)
  }
  $('section.results').removeClass('hidden');   
}
  



function fetchParks() {
  console.log('fetching parks');
  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${selectedStates}&limit=${maxResults}&api_key=TrqJRSGcvQZe2EheeQbPEUcoy4tRxsSJg7Xe8TFo`;
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function getMaxResults() {
  maxResults = $('#resultsNum').val();
  console.log(`Selected a maximum of ${maxResults} results`)
}

function getStates() {
  $('select option:selected').each(function(){selectedStates.push($(this).val()); })
  console.log(`States selected: ${selectedStates}`);
}

function getNatlParks() {
  console.log("ran getNatlParks");
  getStates();
  getMaxResults();
  fetchParks();
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('.searchResults').empty();
    getNatlParks();
  })
}

$(watchForm);