'use strict'

let do_text = [];

// ローカルストレージから採用された要求を取得
let get_do_text = localStorage.getItem('do_text');
do_text = JSON.parse(get_do_text);

console.log(do_text);

do_text.forEach((x, i) => {
    const list = `<li style="font-size:18px">${x}</li>`;
    $('ul').append(list);
});


// 戻るボタンが押された時
$('.button_start').on('click', function(){
    console.log('戻るボタン');
    location.href = '/index.html?name=' + 'ok5';
});