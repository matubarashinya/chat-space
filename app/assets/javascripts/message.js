$(function(){
  function buildHTML(message){
    var img = message.image ? `<img src = "${message.image}" >` : '';
    var html = `<div class="message" data-id="${message.id}"> 
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    <div class="lower-message__image">
                      ${img} 
                    </div>
                  </div>
                </div>`
    return html;
  }
  
  $('#new_message').on('submit', function(e){
    // new_messageがクラス
    e.preventDefault();
    var formData = new FormData(this);
    // フォームのデータの送信に使用することができる
    var url = $(this).attr('action')
    $.ajax({
      //サーバに送信するリクエストの設定
      url: url,
      // Ajaxリクエストを送信するURL（パス）を指定します。リクエストを送るコントローラーとアクションが決まる
      // rake routesnのコマンドでパスを確認する
      type: "POST",
      // リクエストのタイプ("POST"または"GET")を指定します。リクエストを送るコントローラーとアクションが決まる
      data: formData,
      // サーバへ送信するデータでキー/値のペアで設定します
      dataType: 'json',
      // サーバから返ってくるデータの型を指定します(json, xml, htmlなど)。
      processData: false,
      contentType: false
    })
    .done(function(data){
      // data: formDataの値がここに入る
      var html = buildHTML(data);
      $('.messages').append(html);
      // クラス名がmessages
      // htmlを出力するという意味合い
      $("#new_message")[0].reset();
      // 送信ボタンを押した後に入力したテキストが入っていたらいけないので、それを消すようにする
      $('.new-message__send').prop('disabled', false);
      // ボタンをなんども押せるようにする
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      // messegesというクラスを自動でスクロールできるようにする
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
  
  
    
    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $(".message:last").data("id");
    
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        // console.log(messages)
        var insertHTML = '';//追加するHTMLの入れ物を作る
          messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
            insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
            $('.messages').append(insertHTML);//メッセージを追加
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })

      .fail(function() {
        alert('自動更新に失敗しました');//ダメだったらアラートを出す
      });
  
  }
    setInterval(reloadMessages, 7000);//7000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。

})