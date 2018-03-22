var harvestLinksButton = document.getElementById('submitButton');

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
  event.preventDefault();

  while ((tempArray = emailPattern.exec(textareaValue)) !== null) {
    var harvestedEmail = tempArray[1];
    emailAddressesArray.push(harvestedEmail);
  }
  harvestedResults.emailAddresses = emailAddressesArray;
  console.log(emailAddressesArray);
  console.log(harvestedResults);
  tempArray = [];

  while ((tempArray = linkPattern.exec(textareaValue)) !== null) {
    linksObject.linkText = tempArray[1];
    linksObject.url = tempArray[2];
    linksArray.push(linksObject);
    linksObject = {};
  }
  harvestedResults.links = linksArray;
  console.log(linksArray);
  console.log(harvestedResults);
});


