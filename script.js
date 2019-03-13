'use strict'
const api_key = "nz53UPwC8ir4ArDYETrsgiv8tGQ6AwTfwaBq6dSz"
const base_url = "https://api.nps.gov/api/v1/parks?"

function BuildUrl(params){
  const queryItems = Object.keys(params)
  const final_url_array = queryItems.map(key=> `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  const final_url_string =base_url+ final_url_array.join("&")
  return final_url_string
}
function iterateJson(jsonObj){
  $(".js-results-header").text(`Parks in states:${$("#js-user-input").val()}`)
  for (let i =0; i< jsonObj.data.length; i++){
    const fullName = jsonObj.data[i].fullName
    const description = jsonObj.data[i].description
    const websiteUrl = jsonObj.data[i].url
    $(".js-results").append(
      `
      <li>
        <h3>${fullName}</h3>
        <p>${description}</p>
        <a href="${websiteUrl}" target="_blank" ><strong>Website at:${websiteUrl}</strong></a>
      </li>
      `)
  }
}
function fetchParks(states,maxNumber){
  console.log("Have to build url first")
  const params= {
    api_key:api_key,
    stateCode:states,
    limit:maxNumber
  }
  const final_url = BuildUrl(params)
  console.log(final_url)
  fetch(final_url).then( response =>{
    if (response.ok){
      return response.json()
    } throw new Error(response.statusText)
  }).then(responseJson=>
    iterateJson(responseJson)
  ).catch(
    err =>{
      console.log(err)
      $(".js-results-header").text(`Sorry there was an error: ${err}`)
    }
  )
}

function watchSubmit(){
  $("form").submit(event=>{
    event.preventDefault()
    console.log("searching")
    $(".js-results").empty()
    const userStates = $("#js-user-input").val()
    const maxSearch = $("#js-result-max").val()
    fetchParks(userStates,maxSearch)
  })
}
function readyfx(){
  watchSubmit()
}
$(readyfx)