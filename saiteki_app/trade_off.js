'use strict'


// 選択する要求の一覧と結びつく着目点
let yes_requests = [];

// ローカルストレージから採用された要求を取得
let get_yes_requests = localStorage.getItem('yes_requests');
yes_requests = JSON.parse(get_yes_requests);

let yes_now_request = 0;

//付与するid
let id_num = 0;

// 画面が読み込まれたとき
$(document).ready(function(){
    // 配列の全てを読み取る
    for(let request of yes_requests) {
        // オブジェクトから要求を取り出して追加する
        let text = request['request'];
        $('.requests').append(`<div class="to_do" id="${id_num}"><p>${text}</p></div>`);
        id_num ++;
    }
    //左の枠に一つ目を表示する
    $('#left_request p').text($('#' + yes_now_request).text());
    $('#' + yes_now_request).remove();

    // 右の枠は空欄にする
    $('#right_request p').text('');

    //決定ボタンの非活性
    $('#decide').prop("disabled", true);
});


//次の画面に対で引き継ぐために行うこと
//途中経過を保存するための変数
let left_select_order = 0;
let right_select_order = 0;
//引き継ぐための数字を入れる配列
let left_selected_orders = [];
let right_selected_orders = [];

let select = '';

// 下の一覧の要素がクリックされたらそれを右の空欄に入れる
$('.requests').on('click', '.to_do', function(){
    select = $(this).text();
    right_select_order = Number($(this).attr('id'));
    console.log(right_select_order);
    $('#right_request p').text(select);

    //決定ボタンの活性
    $('#decide').prop("disabled", false);
});

// 犠牲になるものはないをクリックした時
$('#nothing').on('click', function(){
    right_select_order = 9999;
    console.log(right_select_order);
    $('#right_request p').text('犠牲になるものはない');

    //決定ボタンの活性
    $('#decide').prop("disabled", false);
});

//決定ボタンを押したとき
$('#decide').on('click', function(){
    //今の左の取得と，それらを変数を配列に入れる。
    left_select_order = yes_now_request;
    left_selected_orders.push(left_select_order);
    right_selected_orders.push(right_select_order);

    //右の削除
    //もしテキストの一番目が「・」じゃなかあったら，
    if (select.charAt(0) !== '・') {
        $('#' + right_select_order).remove();
    }

    //次の左側を表示する
    yes_now_request ++;

    for (let i = 0; i < 100; i++ ) {
        if($('#' + yes_now_request).length) {
            $('#left_request p').text($('#' + yes_now_request).text());
            //左の削除
            $('#' + yes_now_request).remove();
            $('#right_request p').text('');
            console.log('実行' + yes_now_request);
            break;
        }else {
            yes_now_request ++;
            console.log('実行せず' + yes_now_request);
        }
    }

    //決定ボタンの非活性
    $('#decide').prop("disabled", true);

});


// 完了ボタンが押された時
$('.button_start').on('click', function(){
    
    //ローカルストレージに保存
    let set_left_selected_orders = JSON.stringify(left_selected_orders);
    localStorage.setItem('left_selected_orders', set_left_selected_orders);
    
    let set_right_selected_orders = JSON.stringify(right_selected_orders);
    localStorage.setItem('right_selected_orders', set_right_selected_orders);
    
    location.href = '/index.html?name=' + 'ok3';
});