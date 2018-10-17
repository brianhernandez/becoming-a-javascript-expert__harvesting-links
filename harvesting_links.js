'use strict';

var harvestLinksButton = document.getElementById('submitButton'),
    formElement = document.getElementById('form');

harvestLinksButton.addEventListener('click', function(event){
  var emailAddressesArray = [],
      linksArray = [],
      linksObject = {},
      tempArray = [],
      harvestedResults = {},
      textareaValue = document.getElementById("textarea").value,
      emailPattern = /(?:<a\shref="mailto:)(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3})(?:">)[\w\s\-]+(?:<\/a>)/g,
      linkPattern = /(?:<a\shref=")(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*))(?:">)([\w\s\-]+)(?:<\/a>)/g,
      unorderedListElement = document.createElement("UL"),
      unorderedListDivElement = document.createElement("DIV");

  event.preventDefault();

  if (harvestLinksButton.className === "clearButton") {
    document.getElementById("textarea").value = "";
    harvestLinksButton.className = "";
    harvestLinksButton.innerHTML = "Harvest Links";
    document.getElementById("resultsDiv").remove();
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
    unorderedListDivElement.className = "linksList";
    unorderedListDivElement.id = "resultsDiv";
    unorderedListDivElement.appendChild(unorderedListElement);
    formElement.appendChild(unorderedListDivElement);
    harvestLinksButton.className = "clearButton";
    harvestLinksButton.innerHTML = "Clear Results";
  }
});


