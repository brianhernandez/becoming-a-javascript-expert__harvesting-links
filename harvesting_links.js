var harvestLinksButton = document.getElementById('submitButton');

console.log("Harvesting Links file loaded successfully.");
console.log(harvestLinksButton);


harvestLinksButton.addEventListener('click', function(event){
  var emailAddressesArray = [];
  var linksArray = {};
  var textareaValue = document.getElementById("textarea").value;

  var emailPattern = /(?:<a\shref="mailto:)(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))(?:">)[\w\s\-]+(?:<\/a>)/g;
  var emailPattern2 = /(?:<a\shref="mailto:)[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*(?:">)[\w\s\-]+(?:<\/a>)/g;
  event.preventDefault();


  console.log(textareaValue);
  console.log(emailPattern2.exec(textareaValue));
});


