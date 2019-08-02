'use strict'

function getNPSinfo(queryParams) {
    fetch(`https://developer.nps.gov/api/v1/parks?api_key=${queryParams.key}&limit=${queryParams.limit}&stateCode=${queryParams.stateCode}`)
      .then(response => response.json())
      .then(response => getAPIstuff(response))
      .catch(err => console.log(`There was a problem ${err}`))
    }
      
  
function getAPIstuff(response) {
    console.log(response)
    response.data.map(function(item){
        const parkName = item.fullName
        const parkDescription = item.description
        const parkURL = item.url
        return renderList(parkName, parkDescription, parkURL)
    }).join("")
}

function renderList(parkName, parkDescription, parkURL) {
    $(".results").append(`<br>${parkName}<br>${parkDescription}<br>${parkURL}<br>`)
}

function makeAPIRequest(stateIdForm, limitForm){
    const queryParams = {
        stateCode: stateIdForm.replace(/\s/g, ''),
        limit: limitForm,
        key: "AaJrfGzY5wLTcPK6ZXnvrZbM0IYmK7Wk4FquLmed"
    }
    getNPSinfo(queryParams)
}
   
function watchForm() {
    $('form').submit(event => {
        event.preventDefault()
        $(".results").empty()
        const stateIdForm = $(event.currentTarget).find('#stateId').val()
        const limitForm = $(event.currentTarget).find('#resultsReturn').val()
        console.log(stateIdForm, limitForm)
        makeAPIRequest(stateIdForm, limitForm)
    });
  }
  
$(function() {
    console.log('App loaded! Waiting for submit!')
    watchForm();
  });