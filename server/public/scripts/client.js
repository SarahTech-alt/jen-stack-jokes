console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');
    getTheJokes();
    $('#addJokeButton').on('click', addJoke);
}

// Append the jokes to the DOM on page load
function getTheJokes() {
    $.ajax({
        method: 'GET',
        url: '/showJokes'
    }).then(function (response) {
        // clear the joke list on the DOM before adding
        $('#jokesGoHere').empty();
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
function errorMessage() {
    alert('There was an error getting jokes')
}

// Make a POST function to send new jokes to the server
function addJoke() {
    $.ajax({
        method: 'POST',
        url: '/showJokes',
        data: {
            whoseJoke: $('#whoseJokeIn').val(),
            jokeQuestion: $('#questionIn').val(),
            punchLine: $('#punchlineIn').val()
        }
    }).then(getTheJokes).catch(postError);
}

function postError() {
    alert('There was an error in adding a new joke');
}