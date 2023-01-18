'use strict'

const keizai = `<h4 style="background-color:#bce2e8" id="keizai">経済性</h4>`;
const kankyou = `<h4 style="background-color:#d8e698" id="kankyou">環境配慮</h4>`;
const kouritu = `<h4 style="background-color:#f8e58c" id="kouritu">生産効率</h4>`;
const kinou = `<h4 style="background-color:#f8b862" id="kinou">機能性</h4>`;
const anzen = `<h4 style="background-color:#eebbcb" id="anzen">安全性</h4>`;

let kei_num = 3;
let kan_num = 3;
let kou_num = 3;
let ki_num = 3;
let an_num = 3;


// 経済性
$('#kei_up').on('click', function(){
    if(kei_num > 1) {
        $('.rank' + kei_num + '_items #keizai').remove();
        kei_num --;
        $('.rank' + kei_num + '_items').append(keizai);
    }
});
$('#kei_down').on('click', function(){
    if(kei_num < 5) {
        $('.rank' + kei_num + '_items #keizai').remove();
        kei_num ++;
        $('.rank' + kei_num + '_items').append(keizai);
    }
});

// 環境配慮
$('#kan_up').on('click', function(){
    if(kan_num > 1) {
        $('.rank' + kan_num + '_items #kankyou').remove();
        kan_num --;
        $('.rank' + kan_num + '_items').append(kankyou);
    }
});
$('#kan_down').on('click', function(){
    if(kan_num < 5) {
        $('.rank' + kan_num + '_items #kankyou').remove();
        kan_num ++;
        $('.rank' + kan_num + '_items').append(kankyou);
    }
});

// 生産効率
$('#kou_up').on('click', function(){
    if(kou_num > 1) {
        $('.rank' + kou_num + '_items #kouritu').remove();
        kou_num --;
        $('.rank' + kou_num + '_items').append(kouritu);
    }
});
$('#kou_down').on('click', function(){
    if(kou_num < 5) {
        $('.rank' + kou_num + '_items #kouritu').remove();
        kou_num ++;
        $('.rank' + kou_num + '_items').append(kouritu);
    }
});

// 機能性
$('#ki_up').on('click', function(){
    if(ki_num > 1) {
        $('.rank' + ki_num + '_items #kinou').remove();
        ki_num --;
        $('.rank' + ki_num + '_items').append(kinou);
    }
});
$('#ki_down').on('click', function(){
    if(ki_num < 5) {
        $('.rank' + ki_num + '_items #kinou').remove();
        ki_num ++;
        $('.rank' + ki_num + '_items').append(kinou);
    }
});

// 安全性
$('#an_up').on('click', function(){
    if(an_num > 1) {
        $('.rank' + an_num + '_items #anzen').remove();
        an_num --;
        $('.rank' + an_num + '_items').append(anzen);
    }
});
$('#an_down').on('click', function(){
    if(an_num < 5) {
        $('.rank' + an_num + '_items #anzen').remove();
        an_num ++;
        $('.rank' + an_num + '_items').append(anzen);
    }
});


$('.decide').on('click', function() {
    alert('右上の完了ボタンを押して，次のステップに進んでください。');
});

// 完了ボタンが押された時
$('.button_start').on('click', function(){
    // ローカルストレージに保存する
    let rank_num = [kei_num, kan_num, kou_num, ki_num, an_num];
    let set_rank_num = JSON.stringify(rank_num);
    localStorage.setItem('rank_num', set_rank_num);

    // トップに戻る
    location.href = './index.html?name=' + 'ok1';
});
