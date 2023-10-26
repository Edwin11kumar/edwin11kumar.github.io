var database = firebase.database();

//To send data to firebase
/*
database.ref('data').set({
  name: 'Raja',
  age: 20
});
*/


    database.ref('noise_pollution_monitoring').once('value', function(snapshot) {
        var firebaseData = snapshot.val();
        const lastUpdated = {};
    
    // Iterate through the Firebase data
    for (const key in firebaseData) {
        const item = firebaseData[key];
        const latLon = `${item.lat},${item.lon}`;
    
        // Check if we haven't seen this latLon pair before or the current item's datetime is greater
        if (!lastUpdated[latLon] || item.datetime > lastUpdated[latLon].datetime) {
            lastUpdated[latLon] = item;
        }
    }
    
    
    firebaseData = lastUpdated;
    
    const dataContainer = document.getElementById("table");
    
    // Iterate through the Firebase data
    for (const key in firebaseData) {
        const item = firebaseData[key];
        const latLon = key.split(',');
        const latitude = latLon[0];
        const longitude = latLon[1];
        const datetime = item.datetime;
        const decibel = item.decibel;
	const noiseraw = item.rawnoise;
        
        // Create a div to display the data
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
        <td>${datetime}</td>
        <td>${latitude}</td>
        <td>${longitude}</td>
        <td><a href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" target="blank">View<i class="fa fa-map-marker"></i></a></td>
        <td>${decibel}</td>
        <td>${noiseraw}</td>

        `;
        
        // Append the div to the data-container
        dataContainer.appendChild(tableRow);
    }
    
      });



// Create an object to store the last updated document for each unique lat and lon pair
