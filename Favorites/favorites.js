//selects the favorites container
var favoritesSection = document.querySelector(".favorites-list") 

//retrieves the brewery id from local storage
var favorites = JSON.parse(localStorage.getItem("favBreweries")) || []



//generates cards for each brewery id saved to local storage
//this mimics the process used in brewery-search.js, use comments in that file for reference
//the only difference is pulling information from Open Brewery DB using the id instead of city/state
for (var i=0; i<favorites.length; i++) {
    breweryId = favorites[i];
    var url = "https://api.openbrewerydb.org/breweries/" + breweryId;
    
    fetch(url)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
        var firstDiv = document.createElement('div');
        firstDiv.setAttribute("class", "card");
        

        var secondDiv = document.createElement('div');
        secondDiv.setAttribute("class","card-content")
        firstDiv.appendChild(secondDiv);

        var brewPageLink = document.createElement('a');
        brewPageLink.setAttribute("class", "brewery-page");
        brewPageLink.setAttribute("href", "../Brewery-Search/brewery-page.html?breweryid=" + data.id);
        secondDiv.appendChild(brewPageLink);

        var headerDiv = document.createElement("div");
        headerDiv.setAttribute("class","card-header");
        brewPageLink.appendChild(headerDiv);

        var brandImg = document.createElement("img");
        brandImg.setAttribute("id","hop-brand");
        brandImg.setAttribute("src","../Images/hop-3.png");
        headerDiv.appendChild(brandImg);

        var brewName = document.createElement("p");
        brewName.setAttribute("class","title is-4 name");
        brewName.textContent = data.name;
        headerDiv.appendChild(brewName);

        var infoDiv = document.createElement("div");
        infoDiv.setAttribute("class","content");
        secondDiv.appendChild(infoDiv);

        var ulEl = document.createElement("ul");
        infoDiv.appendChild(ulEl);

        console.log("City: " + data.city)
        console.log("State: " + data.state)
        var liUrl0 = document.createElement("li");
        var imgIcon0 = document.createElement("img");
        imgIcon0.setAttribute("class","icon");
        imgIcon0.setAttribute("src","../Images/beer-icon.png");
        liUrl0.appendChild(imgIcon0);
        var brewCity = data.city;
        brewCity = brewCity.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        var brewState = data.state;
        brewState = brewState.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        var brewLocEl = document.createTextNode("Brewery Location: " + brewCity + ", " +brewState);
        liUrl0.appendChild(brewLocEl);
        ulEl.appendChild(liUrl0);


        var brewUrl = data.website_url;

        //if the value for the url is null, don't generate line for it in html
        if(brewUrl === null) {
            console.log(data.website_url);
        } else {
            var liUrl1 = document.createElement("li");
            var imgIcon = document.createElement("img");
            imgIcon.setAttribute("class","icon");
            imgIcon.setAttribute("src","../Images/beer-icon.png");
            liUrl1.appendChild(imgIcon);
            var urlLink = document.createElement("a");
            urlLink.setAttribute("href",data.website_url);
            urlLink.setAttribute("target","blank");
            urlLink.textContent = data.website_url;
            liUrl1.appendChild(urlLink);
            ulEl.appendChild(liUrl1);
        }


        var liUrl2 = document.createElement("li");
        var imgIcon2 = document.createElement("img");
        imgIcon2.setAttribute("class","icon");
        imgIcon2.setAttribute("src","../Images/beer-icon.png");
        liUrl2.appendChild(imgIcon2);
        var brewType = data.brewery_type;
        brewType = brewType.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        var brewTypeEl = document.createTextNode("Brewery Type: " + brewType);
        liUrl2.appendChild(brewTypeEl);
        ulEl.appendChild(liUrl2);

        brewPhone = data.phone;
        if(brewPhone === null) {
            console.log(data[i].website_url);
        } else {
        var liUrl3 = document.createElement("li");
        var imgIcon3 = document.createElement("img");
        imgIcon3.setAttribute("class","icon");
        imgIcon3.setAttribute("src","../Images/beer-icon.png");
        liUrl3.appendChild(imgIcon3);
        var brewPhone = document.createTextNode("Phone number: " + brewPhone)
        liUrl3.appendChild(brewPhone);
        ulEl.appendChild(liUrl3);
        }

        favoritesSection.appendChild(firstDiv);
    })
}