'use strict'

// 選択する要求の一覧と結びつく着目点
let requests = [
    {request:'複雑な形にする', point:'機能性' },
    {request:'単純な形にする', point:'機能性' },
    {request:'大きい製作品にする', point:'機能性' },
    {request:'小さい製作品にする', point:'機能性' },
    {request:'正確な寸法にする', point:'機能性' },
    {request:'多少の寸法のずれは許容する', point:'生産効率' },
    {request:'強度や品質が安定した材料を主に使う（集成材）', point:'生産効率' },
    {request:'薄い材料にする', point:'生産効率' },
    {request:'１種類の材料を使用する', point:'生産効率' },
    {request:'加工しやすい材料を使用する', point:'生産効率' },
    {request:'繊維方向を意識して使用する', point:'安全性' },
    {request:'繊維方向を気にせずに使用する', point:'生産効率' },
    {request:'材料が反るなど，変形することを考慮する', point:'機能性' },
    {request:'材料が反るなどの変形することは気にしない', point:'生産効率' },
    {request:'学校にある廃材を使用する', point:'経済性' },
    {request:'価格が安い材料を使用する', point:'経済性' },
    {request:'切り代と削り代は多くする', point:'安全性' },
    {request:'切り代と削り代は少なくする', point:'生産効率' },
    {request:'近くのけがき線はまとめて描くようにする', point:'生産効率' },
    {request:'切断かしょは多くする', point:'機能性' },
    {request:'切断かしょは少なくする', point:'生産効率' },
    {request:'横引きだけ行うようにする', point:'生産効率' },
    {request:'ジグを使用する', point:'安全性' },
    {request:'ひき溝を作るときに指をガイドにする', point:'生産効率' },
    {request:'工作機械を使用して切断する', point:'生産効率' },
    {request:'計画通りの寸法になるように加工する', point:'機能性' },
    {request:'多少の寸法のずれは許容して加工する', point:'生産効率' },
    {request:'工作機械を使用して加工する', point:'生産効率' },
    {request:'まとめて加工できる部品はまとめて加工する', point:'生産効率' },
    {request:'釘は多く使う', point:'安全性' },
    {request:'釘の使用は最低限にする', point:'経済性' },
    {request:'釘を打つ際はジグを使用する', point:'安全性' },
    {request:'まとめて下穴を開けてから釘を打つ', point:'生産効率' },
    {request:'ねじを使用する', point:'環境配慮' },
    {request:'面取りを行う', point:'機能性' },
    {request:'表面を磨く', point:'機能性' },
    {request:'たくさん入るようにする', point:'機能性' },
    {request:'少しだけ入るようにする', point:'機能性' },
    {request:'形を変えられるようにする', point:'機能性' },
    {request:'物や場所のサイズにピッタリにする', point:'機能性' },
    {request:'物や場所のサイズから余裕を持たせる', point:'機能性' },
    {request:'持ちやすい，動かしやすいようにする', point:'機能性' },
    {request:'固定できるようにする', point:'機能性' },
    {request:'部材の断面形状を工夫する', point:'安全性' },
    {request:'強い部材を使用する', point:'安全性' },
    {request:'机の上は整理整頓した状態で作業をする', point:'安全性' },
    {request:'正しい服装で作業する', point:'安全性' },
    {request:'必要に応じで保護メガネや防塵マスクを使用する', point:'安全性' },
    {request:'怪我をしないように，落ち着いて作業する', point:'安全性' },
    {request:'壊れない丈夫な製品を作る', point:'安全性' },
    {request:'使用中に怪我をしない製品になるようにする', point:'安全性' },
    {request:'廃棄時に有害なものが出ないようにする', point:'環境配慮' },
    {request:'長期間の使用に向けて，長持ちするようにする', point:'安全性' },
    {request:'短期間の使用を想定する', point:'生産効率' },
    {request:'・安全性，耐久性を良くする', point:'安全性' },
    {request:'・機能性を良くする', point:'機能性' },
    {request:'・短時間で製作する', point:'生産効率' },
    {request:'・手間をかけずに製作する', point:'生産効率' },
    {request:'・リサイクルできるようにする', point:'環境配慮' },
    {request:'・捨てやすくする', point:'環境配慮' },
    {request:'・捨てる材料が少なくなるようにする', point:'環境配慮' },
    {request:'・お金をかけずに製作する', point:'経済性' }
];
let now_request = 0;

let yes_requests = [];

// 画面が読み込まれたとき
$(document).ready(function(){
    // 配列の全てを読み取る
    for(let request of requests) {
        // オブジェクトから要求を取り出して追加する
        let text = request['request'];
        $('.requests').append(`<div class="to_do"><p>${text}</p></div>`);
    }

    //一つ目を表示する
    $('#request_show p').text(requests[now_request]['request']);
});


//採用ボタンが押されたとき
$('#yes').on('click', function(){
    //配列に採用された要求を追加する
    let yes_request = requests[now_request];
    yes_requests.push(yes_request);
    //下の枠のボーダーの色を変える
    $('.to_do').eq(now_request).addClass('yes_selected_request');

    if (now_request + 1 !== requests.length) {
        //次の要求を表示する
        now_request ++;
        $('#request_show p').text(requests[now_request]['request']);
    } else {
        alert('右上の完了ボタンを押して，次のステップに進んでください。');
    }
});




//しないボタンが押されたとき
$('#no').on('click', function(){
        //下の枠のボーダーの色を変える
        $('.to_do').eq(now_request).addClass('no_selected_request');

        if (now_request + 1 !== requests.length) {
            //次の要求を表示する
            now_request ++;
            $('#request_show p').text(requests[now_request]['request']);
        } else {
            alert('右上の完了ボタンを押して，次のステップに進んでください。');
        }
        
});


// 完了ボタンが押された時
$('.button_start').on('click', function(){
    // 採用されたものをローカルストレージに保存
    let set_yes_requests = JSON.stringify(yes_requests);
    localStorage.setItem('yes_requests', set_yes_requests);

    
    location.href = 'https://technology12.github.io/saiteki.app.v1/index.html?name=' + 'ok2';
});
