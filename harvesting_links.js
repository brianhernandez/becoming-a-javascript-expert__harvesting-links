var harvestLinksButton = document.getElementById('submitButton'),
    formElement = document.getElementById('form'),
    clearFlag = false;
    filledFlag = false;

console.log("Harvesting Links file loaded successfully.");

harvestLinksButton.addEventListener('click', function(event){
  var emailAddressesArray = [];
  var linksArray = [];
  var linksObject = {};
  var tempArray = [];
  var harvestedResults = {};
  var textareaValue = document.getElementById("textarea").value;
  var emailPattern = /(?:<a\shref="mailto:)(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3})(?:">)[\w\s\-]+(?:<\/a>)/g;
  var linkPattern = /(?:<a\shref=")(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*))(?:">)([\w\s\-]+)(?:<\/a>)/g;
  var unorderedListElement = document.createElement("UL"),
      unorderedListDivElement = document.createElement("DIV");

  event.preventDefault();
  console.log(textarea);
  if (harvestLinksButton.className === "clearButton") {
    document.getElementById("textarea").value = "";
    console.log(textareaValue + " NOTHING");
    harvestLinksButton.className = "";
    harvestLinksButton.innerHTML = "Harvest Links";
    console.log(harvestLinksButton.innerHTML);
    // if (document.getElementById("resultsDiv")) {
      document.getElementById("resultsDiv").remove();
    // }
  }
  if(textareaValue) {
    while ((tempArray = emailPattern.exec(textareaValue)) !== null) {
      var harvestedEmail = tempArray[1];
      emailAddressesArray.push(harvestedEmail);
    }
    harvestedResults.emailAddresses = emailAddressesArray;
    tempArray = [];

    while ((tempArray = linkPattern.exec(textareaValue)) !== null) {
      linksObject.linkText = tempArray[2];
      linksObject.url = tempArray[1];
      linksArray.push(linksObject);
      linksObject = {};
    }
    harvestedResults.links = linksArray;
    console.log(harvestedResults);

    if(harvestedResults) {
      if(harvestedResults.emailAddresses) {
        var emailListItemElement = document.createElement("LI");
        emailListItemElement.className = "listHeading";
        emailListItemElement.innerHTML = "Email Addresses Found";
        unorderedListElement.appendChild(emailListItemElement);
        for(var i = 0; i < harvestedResults.emailAddresses.length; i++) {
          var listItemElement = document.createElement("LI");
          listItemElement.innerHTML = harvestedResults.emailAddresses[i];
          unorderedListElement.appendChild(listItemElement);
        }
      }

      if(harvestedResults.links) {
        var hyperLinksListItemElement = document.createElement("LI");
        hyperLinksListItemElement.className = "listHeading";
        hyperLinksListItemElement.innerHTML = "Hyper Links Found";
        unorderedListElement.appendChild(hyperLinksListItemElement);
        for(var i = 0; i < harvestedResults.links.length; i++) {
          var listItemElement = document.createElement("LI");
          listItemElement.innerHTML += harvestedResults.links[i].linkText + ': ';
          listItemElement.innerHTML += harvestedResults.links[i].url;
          unorderedListElement.appendChild(listItemElement);
        }
      }
    }
    console.log(unorderedListElement);
    unorderedListDivElement.className = "linksList";
    unorderedListDivElement.id = "resultsDiv";
    unorderedListDivElement.appendChild(unorderedListElement);
    formElement.appendChild(unorderedListDivElement);
    harvestLinksButton.className = "clearButton";
    harvestLinksButton.innerHTML = "Clear Results";
  }
});


