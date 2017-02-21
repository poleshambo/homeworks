'use strict'

var pokeImgs = ['http://pokeapi.co/media/img/3.png'
    ,'https://upload.wikimedia.org/wikipedia/commons/4/4c/Pokeball.png'
    ,'http://pokeapi.co/media/img/6.png'];

var pokePromises = pokeImgs.map(fetchImage);

function fetchImage(url) {
  return new Promise(function(resolve, reject){
        var img = new Image();
        img.onload = function() {
            resolve(url);
        };
        img.onerror = function() {
            reject(url);
        }

        img.src = url;
    });
}

function addImage(imgUrl){
    return new Promise((resolve, reject) => {
        let divs = document.querySelectorAll('.images div');
        let imgArr = [];

        imgUrl.forEach(url => {
            let img = new Image();
            img.src = url;
            imgArr.push(img);
        });

        divs.forEach((div, i) => {
            div.appendChild(imgArr[i]);
        });

        let playBut = document.querySelector('div[data-id="center"] img');
        playBut.addEventListener('click', play)

        resolve(divs);
    })
}

var KEYFRAMES = {
    moveDivL: [
        {transform: 'translateX(0)'},
        {transform: 'translateX(500px)'},
    ],
    scaleImgL: [
        {transform: 'scale(1)'},
        {transform: 'scale(0.1,0.1)'}
    ],
    moveDivR: [
        {transform: 'translateX(0)'},
        {transform: 'translateX(-500px)'},
    ],
    scaleImgR: [
        {transform: 'scale(1)'},
        {transform: 'scale(0.1,0.1)'}
    ]


}


function play(){
    let leftDiv = document.querySelector('div[data-id="left"]');
    let leftImg = document.querySelector('div[data-id="left"] img');

    let rightDiv = document.querySelector('div[data-id="right"]');
    let rightImg = document.querySelector('div[data-id="right"] img');

    var animA = leftDiv.animate(KEYFRAMES.moveDivL, 1000);
    var animB = leftImg.animate(KEYFRAMES.scaleImgL, 1000);
    var animC = rightDiv.animate(KEYFRAMES.moveDivR, 1000);
    var animD = rightImg.animate(KEYFRAMES.scaleImgR, 1000);


    // let animA = function() {
    //     leftDiv.animate(KEYFRAMES.moveDivL,  1000);
    //     leftImg.animate(KEYFRAMES.scaleImgL, 1000);
    //     rightDiv.animate(KEYFRAMES.moveDivR, 1000);
    //     rightImg.animate(KEYFRAMES.scaleImgR,1000);
    //     }

    // function animA() {
    //    //return new Promise((resolve, reject) => {
    //         leftDiv.animate(KEYFRAMES.moveDivL, 1000);
    //         leftImg.animate(KEYFRAMES.scaleImgL, 1000);
    //         rightDiv.animate(KEYFRAMES.moveDivR, 1000);
    //         rightImg.animate(KEYFRAMES.scaleImgR, 1000);
    //         //resolve();
    //     //})
    // }

    // animA.finished.then(function() {
    //     var animB = leftImg.animate(KEYFRAMES.scaleImgL, 1000);
    //     return animB.finished;
    // });

}

Promise.all(pokePromises).then(imgUrl => addImage(imgUrl))
