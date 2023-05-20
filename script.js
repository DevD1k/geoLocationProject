const ShowInDiv = document.getElementById("show-data-user-default");
const SearchUserDiv = document.getElementById("search-user-div");
const showErrorDiv = document.getElementById("show-error");
const heading = document.getElementById("your_result");

const SubmitBtn = document.getElementById("submitBtn");
const API_KEY = "708d3932754c48389a71a9781daa119c";
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    ShowInDiv.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  // fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=${API_KEY}`)

  fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=28.2907168&lon=74.9651136&format=json&apiKey=${API_KEY}`
  )
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result.results[0]);

      var div_data = `<div id="" class="timezone-detail">Name Of Time Zone : ${result.results[0].timezone.name}</div>
        <div id="" class="timezone-detail latOrLong">
            <div id="" class="lat">Lat: ${result.results[0].lat}</div>
            <div id="" class="long">Long: ${result.results[0].lon}</div>
        </div>
        <div id="" class="timezone-detail">Offset STD: ${result.results[0].timezone.offset_STD}</div>
        <div id="" class="timezone-detail">Offset STD Seconds : ${result.results[0].timezone.offset_STD_seconds}</div>
        <div id="" class="timezone-detail">Offset DST : ${result.results[0].timezone.offset_DST}</div>
        <div id="" class="timezone-detail">Offset DST Seconds: ${result.results[0].timezone.offset_DST_seconds}</div>
        <div id="" class="timezone-detail">Country: ${result.results[0].country}</div>
        <div id="" class="timezone-detail">Postcode: ${result.results[0].postcode}</div>
        <div id="" class="timezone-detail">City: ${result.results[0].city}</div>`;
      ShowInDiv.innerHTML = div_data;
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      ShowInDiv.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      ShowInDiv.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      ShowInDiv.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      ShowInDiv.innerHTML = "An unknown error occurred.";
      break;
  }
}
getLocation();

//   search by address

function error(errorMessage) {
  var err = `<h3 style="color:red;">${errorMessage}</h3>`;
  showErrorDiv.innerHTML = err;
  SearchUserDiv.style.display = "block";
  heading.style.display = "none";
  setTimeout(errorHide, 2000);
}
function errorHide() {
  showError.innerHTML = "";
  showErrorDiv.style.display = "none";
  SearchUserDiv.style.display = "none";
  heading.style.display = "block";
}

SubmitBtn.addEventListener("click", () => {
  const inputBox = document.getElementById("address").value.trim();
  console.log(inputBox);

  if (inputBox == null || inputBox.match(/^ *$/) != null) {
    error("Please enter an address!");
    console.log("Please enter an address!");
  } else {
    const address = inputBox;

    fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&apiKey=${API_KEY}`
    )
      .then((resp) => resp.json())
      .then((geocodingResult) => {
        console.log(geocodingResult, "sfdf");
        console.log(geocodingResult);
        SearchUserDiv.innerHTML += "";
        if (geocodingResult.features.length == 0) {
          error("Data not found !");
          console.log("Data not found !!");
        }
        var div_data2 = `
                            <div id="" class="show-data-user-default dark"> 
                                <div id="" class="timezone-detail ">Name Of Time Zone : ${geocodingResult.features[0].properties.timezone.name}</div>
                                <div id="" class="timezone-detail latOrLong">
                                    <div id="" class="lat">Lat: ${geocodingResult.features[0].properties.lat}</div>
                                    <div id="" class="long">Long: ${geocodingResult.features[0].properties.lon}</div>
                                </div>
                                <div id="" class="timezone-detail">Offset STD: ${geocodingResult.features[0].properties.timezone.offset_STD}</div>
                                <div id="" class="timezone-detail">Offset STD Seconds : ${geocodingResult.features[0].properties.timezone.offset_STD_seconds}</div>
                                <div id="" class="timezone-detail">Offset DST : ${geocodingResult.features[0].properties.timezone.offset_DST}</div>
                                <div id="" class="timezone-detail">Offset DST Seconds: ${geocodingResult.features[0].properties.timezone.offset_DST_seconds}</div>
                                <div id="" class="timezone-detail">Country: ${geocodingResult.features[0].properties.country}</div>
                                <div id="" class="timezone-detail">Postcode: ${geocodingResult.features[0].properties.postcode}</div>
                                <div id="" class="timezone-detail">City: ${geocodingResult.features[0].properties.city}</div>
                            </div>
                            `;

        SearchUserDiv.innerHTML = div_data2;
        SearchUserDiv.style.display = "block";
      });
  }
});
