console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');
    getTheJokes();
}

// Append the jokes to the DOM on page load
function getTheJokes(){
    $.ajax({
        method: 'GET',
        url: '/showJokes'
    }).then(function (response) {
        for (const jokes of response) {
            console.log(jokes);
            // Access each property of response
            $('#jokesGoHere').append(`<li> From ${jokes.whoseJoke}:<br> 
            ${jokes.jokeQuestion}<br>
            ---${jokes.punchLine}</li><br>`);
    }
}).catch(errorMessage);
}

// Display an error if there is an error in GET function
function errorMessage(){
    alert('There was an error getting jokes')
}