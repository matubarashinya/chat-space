$(function(){
  function buildHTML(message){
    var img = message.image ? `<img src = ${message.image} >` : '';
    var html = `<div class="message">
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
    // console.log(this)このコードでログが記録されているか見る
    console.log(this)
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
    });
  })
})
