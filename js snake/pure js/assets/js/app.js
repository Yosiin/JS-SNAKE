
/*

function addMessage(user, content) {
    var browserList = document.body.querySelector(user),
    newItem = document.createElement('li');

    newItem.textContent = content;
    browserList.appendChild( newItem );
};

addMessage('.browser', 'Ja som tu iba na skúšku');



document.body.addEventListener('click', function clickedIt() {
    addMessage('.user', 'Ja som ten mensí zoznam');
}); 

*/


/*

document.body.addEventListener('keyup', function keboardedIt(event) {

    if(event.key == "w") {
        addMessage('.browser', 'Klikol som W, ideme hore');
    }
    if( event.key == "s" ) {
        addMessage('.browser', 'Klikol som S, ideme dole');
    }
    if( event.key == "a" ) {
        addMessage('.browser', 'Klikol som A, ideme doľava');
    }
    if( event.key == "d" ) {
        addMessage('.browser', 'Klikol som D, ideme doprava');
    }
});


*/






document.body.addEventListener('keypress', function keboardedIt(event) {

    var oldLeft = getComputedStyle( document.querySelector('.browser') ).left,
        newLeft;

        oldLeft = parseInt( oldLeft, 10 );

    
    var oldTop = getComputedStyle( document.querySelector('.browser') ).top,
        newTop;

        oldTop = parseInt( oldTop, 10 );


    if(event.key == "w") {
        newTop = oldTop - 15;
    }
    if( event.key == "s" ) {
        newTop = oldTop + 15;
    }
    if( event.key == "a" ) {
        newLeft = oldLeft - 15;
    }
    if( event.key == "d" ) {
        newLeft = oldLeft + 15;
    }

    document.querySelector('.browser').style.left = newLeft + "px";
    document.querySelector('.browser').style.top = newTop + "px";
});

var dude = document.querySelector('.badge-left');

dude.addEventListener('click', function() {
    
    var scoreElement = this.nextElementSibling,
        score = scoreElement.textContent;

        // score = +score + 1;
        score = Number(score) + 1;

        scoreElement.textContent = score;
    



});