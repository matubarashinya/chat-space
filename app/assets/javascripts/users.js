$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();
        // イベントが発火するたびに、すでに検索結果欄で出力されている投稿情報をemptyメソッドを使用して削除する（これを実装しないと、一つ前の検索結果が残り続けてしまう）
        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
  $("#user-search-result").on("click", ".user-search-add", function() {
    console.log
    const userName = $(this).attr("data-user-name");
    // data-user-nameをthisとして変更して、userNameに代入している
    // constで値書き換えを禁止下変数を宣言する方法
    // const 変数名 = 変数に入れる値
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
      //クリックされたところのhtmlを親要素をごと消す（検索結果から消す）
    addDeleteUser(userName, userId);
    //削除ボタンの書いてあるhtmlを呼び出す処理に飛ばす
    addMember(userId);
    //ユーザーをグループに登録するための処理
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    // removeメソッドを使用してHTMLは削除
    $(this)
      .parent()
      .remove();
  });
});
