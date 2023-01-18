'use strict'


// 左のダイヤモンドランキング
let rank_num = [2, 2, 3, 4, 5,];
let get_rank_num = localStorage.getItem('rank_num');
rank_num = JSON.parse(get_rank_num);


const keizai = `<h4 style="background-color:#bce2e8" id="keizai">経済性</h4>`;
const kankyou = `<h4 style="background-color:#d8e698" id="kankyou">環境配慮</h4>`;
const kouritu = `<h4 style="background-color:#f8e58c" id="kouritu">生産効率</h4>`;
const kinou = `<h4 style="background-color:#f8b862" id="kinou">機能性</h4>`;
const anzen = `<h4 style="background-color:#eebbcb" id="anzen">安全性</h4>`;

let kei_num = rank_num[0];
let kan_num = rank_num[1];
let kou_num = rank_num[2];
let ki_num = rank_num[3];
let an_num = rank_num[4];

$('.l_rank' + kei_num + '_items').append(keizai);
$('.l_rank' + kan_num + '_items').append(kankyou);
$('.l_rank' + kou_num + '_items').append(kouritu);
$('.l_rank' + ki_num + '_items').append(kinou);
$('.l_rank' + an_num + '_items').append(anzen);




// 選択する要求の一覧と結びつく着目点
let yes_requests = [];
let left_selected_orders = [];
let right_selected_orders = [];

// ローカルストレージから採用された要求を取得
let get_yes_requests = localStorage.getItem('yes_requests');
yes_requests = JSON.parse(get_yes_requests);

let get_left_selected_orders = localStorage.getItem('left_selected_orders');
left_selected_orders = JSON.parse(get_left_selected_orders);

let get_right_selected_orders = localStorage.getItem('right_selected_orders');
right_selected_orders = JSON.parse(get_right_selected_orders);


//ダイヤモンドランキングの作成に必要な情報
let r_rank_num = [3, 3, 3, 3, 3];
let r_kei_num = r_rank_num[0];
let r_kan_num = r_rank_num[1];
let r_kou_num = r_rank_num[2];
let r_ki_num = r_rank_num[3];
let r_an_num = r_rank_num[4];

const r_keizai = `<h4 style="background-color:#bce2e8" id="r_keizai">経済性</h4>`;
const r_kankyou = `<h4 style="background-color:#d8e698" id="r_kankyou">環境配慮</h4>`;
const r_kouritu = `<h4 style="background-color:#f8e58c" id="r_kouritu">生産効率</h4>`;
const r_kinou = `<h4 style="background-color:#f8b862" id="r_kinou">機能性</h4>`;
const r_anzen = `<h4 style="background-color:#eebbcb" id="r_anzen">安全性</h4>`;


//次の画面に引き継ぐデータ
//ダイアモンドランキングの情報
//行うことのテキスト
let do_text = [];


//クリックされた左右の記録，
let selected_left_or_right = [];
let change_text = [];
//それぞれの着目点の数字
let keizai_point = 0;
let kankyou_point = 0;
let kouritu_point = 0;
let kinou_point = 0;
let anzen_point = 0;

let r_rank_num_original = [keizai_point, kankyou_point, kouritu_point, kinou_point, anzen_point];



// 画面が読み込まれたとき
$(document).ready(function(){


    // 右のダイヤモンドランキングを作成
    $('.r_rank' + r_kei_num + '_items').append(r_keizai);
    $('.r_rank' + r_kan_num + '_items').append(r_kankyou);
    $('.r_rank' + r_kou_num + '_items').append(r_kouritu);
    $('.r_rank' + r_ki_num + '_items').append(r_kinou);
    $('.r_rank' + r_an_num + '_items').append(r_anzen);
    console.log('再作成');



    //対の個数を取得する
    let selected_num = right_selected_orders.length;

    //対の数の分だけそれぞれの中身を取得する
    for (let i = 0; i < selected_num; i++ ) {
        //それぞれの中身を保存する変数たち
        let left_text = "";
        let right_text = "";
        let left_point = "";
        let right_point = "";


        let left_num = left_selected_orders[i];
        if (left_num !== 9999){
            left_text = yes_requests[left_num]['request'];
            left_point = yes_requests[left_num]['point'];
        } else {
            //ここに来ることはない。
        }
        
        let right_num = right_selected_orders[i];
        if (right_num !== 9999){
            right_text = yes_requests[right_num]['request'];
            right_point = yes_requests[right_num]['point'];
        } else {
            //犠牲になるものがない時
            left_text = yes_requests[left_num]['request'];
            left_point = yes_requests[left_num]['point'];
            do_text.push(left_text);
            point_upup(left_point);
            continue;

        }

        //取得した値を使って表示する
        $('.solutions_container').append(
            `<div class="one_solution"> 
                <div class="solution_ope_area solution_ope_area${i}">
                    <div class="left_req${i}">
                        <p id="left${i}" class="req_p left_p">${left_text}</p>
                        <h5>${left_point}</h5>
                    </div>
                    <h4>か</h4>
                    <div class="right_req${i}">
                        <p id="right${i}" class="req_p right_p">${right_text}</p>
                        <h5>${right_point}</h5>
                    </div>
                    <img src="./image/right1.svg" alt="右矢印">
                    <form id="form" class="form" action="#">
                        <textarea class="textarea${i}" name="decide_solution" id="decide_solution${i}"></textarea>
                    </form>
                </div>
                <div class="button_area">
                    <button class="decide" id="decide${i}">決定</button>
                </div>
            </div>`);

            $('.decide').prop("disabled", true);
    }

    let final_result = calcu(r_rank_num_original);
    final_dia(final_result);
    console.log(r_rank_num_original);
    console.log(final_result);
    console.log('最初のダイアモンど作成');
});





// $('textarea').on('click', function(){
//     console.log('aa')
// });


//最終的に行うことのテキスト










//クリックした要素に応じて反応を変える
const listRootElm = document.getElementById('solutions_container');
    listRootElm.addEventListener('click', (e) => {

        //左右どちらかの要求がクリックされたら，横のテキストエリアにテキストを入れる
        if (e.target.className.match(/req_p/)) {
            let text = e.target.innerText;
            let click_id = e.target.id;
            let num = click_id.replace(/\D/g, '');
            $('.textarea' + num).val(text);
            //決定ボタンの活性
            $('#decide' + num).prop("disabled", false);

            //クリックされた要求が左なのか右なのか記録する
            switch (e.target.className) {
                case ('req_p left_p'):
                    selected_left_or_right[num] = 'left';
                    break;
                case ('req_p right_p'):
                    selected_left_or_right[num] = 'right';
                    break;
            }

            console.log(selected_left_or_right);

        //テキストエリアがクリックされた
        } else if (e.target.className.match(/textarea/)) {
            let ta_click_id = e.target.id;
            let ta_num = ta_click_id.replace(/\D/g, '');
            change_text[ta_num] = 'change';

        
        //決定ボタンが押されたとき
        } else if (e.target.className.match(/decide/)) {
            //決定ボタンの番号を特定する
            let click_button_id = e.target.id;
            let button_num = click_button_id.replace(/\D/g, '');
            $('.solution_ope_area' + button_num).addClass('last_decide');

            //テキストエリアのテキストを配列に追加する。
            let add_textarea = document.getElementById("decide_solution" + button_num);
            do_text.push(add_textarea.value);
            console.log(do_text);

            //左右の着目点を取得する。
            let left_request = yes_requests[left_selected_orders[button_num]];
            let left_point = left_request['point'];
            let right_request = yes_requests[right_selected_orders[button_num]];
            let right_point = right_request['point'];

            //着目点に応じて点数を変える
            switch (selected_left_or_right[button_num]) {
                case 'left':
                    //こちらの着目点を加算して，逆を減算する。
                    if (change_text[button_num] === 'change') {
                        point_up(left_point);
                        point_down(right_point);
                    } else {
                        point_upup(left_point);
                        point_downdown(right_point);
                    }
                    break;
                case 'right':
                    //こちらの着目点を加算して，逆を減算する。
                    if (change_text[button_num] === 'change') {
                        point_up(right_point);
                        point_down(left_point);
                    } else {
                        point_upup(right_point);
                        point_downdown(left_point);
                    }
                    break;
            }
            console.log(r_rank_num_original);
            //計算の関数を呼ぶ
            let final_result = calcu(r_rank_num_original);
            final_dia(final_result);
            

            //テキストエリアのテキストを最終的にやることとして記録する。
        
        //関係ない時
        } else {
            console.log('関係ないところがクリックされた');
        }
        
});




//2足し算の関数
function point_upup(point) {
    switch (point) {
        case "経済性":
            keizai_point += 2;
            break;
        case "安全性":
            anzen_point += 2;
            break;
        case "環境配慮":
            kankyou_point += 2;
            break;
        case "生産効率":
            kouritu_point += 2;
            break;
        case "機能性":
            kinou_point += 2;
            break;
        default:  
            console.log('着目点が正しくありません');
    }
    r_rank_num_original = [keizai_point, kankyou_point, kouritu_point, kinou_point, anzen_point];
}

//1足し算の関数
function point_up(point) {
    switch (point) {
        case "経済性":
            keizai_point += 1;
            break;
        case "安全性":
            anzen_point += 1;
            break;
        case "環境配慮":
            kankyou_point += 1;
            break;
        case "生産効率":
            kouritu_point += 1;
            break;
        case "機能性":
            kinou_point += 1;
            break;
        default:  
        console.log('着目点が正しくありません');
    }
    r_rank_num_original = [keizai_point, kankyou_point, kouritu_point, kinou_point, anzen_point];
}

//2引き算の関数
function point_downdown(point) {
    switch (point) {
        case "経済性":
            keizai_point -= 2;
            break;
        case "安全性":
            anzen_point -= 2;
            break;
        case "環境配慮":
            kankyou_point -= 2;
            break;
        case "生産効率":
            kouritu_point -= 2;
            break;
        case "機能性":
            kinou_point -= 2;
            break;
        default:  
        console.log('着目点が正しくありません');
    }
    r_rank_num_original = [keizai_point, kankyou_point, kouritu_point, kinou_point, anzen_point];
}

//1引き算の関数
function point_down(point) {
    switch (point) {
        case "経済性":
            keizai_point -= 1;
            break;
        case "安全性":
            anzen_point -= 1;
            break;
        case "環境配慮":
            kankyou_point -= 1;
            break;
        case "生産効率":
            kouritu_point -= 1;
            break;
        case "機能性":
            kinou_point -= 1;
            break;
        default:  
        console.log('着目点が正しくありません');
    }
    r_rank_num_original = [keizai_point, kankyou_point, kouritu_point, kinou_point, anzen_point];
}


//1-5にする計算
function calcu(nums) {
    //マイナスが内容に変換する
    const aryMin = function (a, b) {return Math.min(a, b);}
    let min = nums.reduce(aryMin); 
    nums.forEach((m, i) => {
        m = m + Math.abs(min);
        nums[i] = m
    });

    //範囲を求めて分割し，相対的に数字を振る
    const arynewMax = function (a, b) {return Math.max(a, b);}
    const arynewMin = function (a, b) {return Math.min(a, b);}
    let max = nums.reduce(arynewMax);
    let new_min = nums.reduce(arynewMin); 
    let all_range = max - new_min;
    let one_range = all_range / 5;

    //新たな数字を入れる配列
    let new_array = [];

    nums.forEach((x, i) => {
        if (x === max) {
            new_array[i] = 1;
        } else if (x === new_min) {
            new_array[i] = 5;
        } else {
            if (new_min < x && x <= one_range) {
                new_array[i] = 5;
            } else if (one_range < x && x <= 2 * one_range) {
                new_array[i] = 4;
            } else if (2 * one_range < x && x <= 3 * one_range) {
                new_array[i] = 3;
            } else if (3 * one_range < x && x <= 4 * one_range) {
                new_array[i] = 2;
            } else if (4 * one_range < x && x < max) {
                new_array[i] = 1;
            } else {
                console.log('if文には入ったが該当なし');
            }
        } 
    });

    console.log('計算し直したもの' + new_array)
    return new_array;

}

//ダイヤモンドランキングの再生成
function final_dia(rank) {
    //今あるものを消す
    $('#r_kouritu').remove();
    $('#r_keizai').remove();
    $('#r_kankyou').remove();
    $('#r_anzen').remove();
    $('#r_kinou').remove();
    
    r_rank_num = rank;

    r_kei_num = r_rank_num[0];
    r_kan_num = r_rank_num[1];
    r_kou_num = r_rank_num[2];
    r_ki_num = r_rank_num[3];
    r_an_num = r_rank_num[4];

    $('.r_rank' + r_kei_num + '_items').append(r_keizai);
    $('.r_rank' + r_kan_num + '_items').append(r_kankyou);
    $('.r_rank' + r_kou_num + '_items').append(r_kouritu);
    $('.r_rank' + r_ki_num + '_items').append(r_kinou);
    $('.r_rank' + r_an_num + '_items').append(r_anzen);
}



// 完了ボタンが押された時
$('.button_start').on('click', function(){
    //ローカルストレージに保存
    let set_do_text = JSON.stringify(do_text);
    localStorage.setItem('do_text', set_do_text);

    location.href = 'https://technology12.github.io/saiteki.app.v1/index.html?name=' + 'ok4';

});


