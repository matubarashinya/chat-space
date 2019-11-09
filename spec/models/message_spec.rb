require 'rails_helper'
# ◉メッセージを保存できる場合
RSpec.describe Message, type: :model do
  
  describe '#create' do
    context 'can save' do
      it 'is valid with content' do
        # メッセージがあれば保存できる
        expect(build(:message, image: nil)).to be_valid
        # 今回は、メッセージがあれば保存できることを確かめたいので、image: nilを引数として、画像を持っていないインスタンスを生成する。
      end

      it 'is valid with image' do
        expect(build(:message, content: nil)).to be_valid
        # 画像があれば保存できる
      end

      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
        # メッセージと画像があれば保存できる
        # ファクトリーでデフォルトの値が定義されているので、build(:message)と記述するだけで、メッセージと画像を持ったインスタンスを生成することができます。
      end
    end

    context 'can not save' do
      it 'is invalid without content and image' do
        # ◉メッセージを保存できない場合
        message = build(:message, content: nil, image: nil)
        # buildメソッドの引数でメッセージも画像もnilにすることによって、必要なインスタンスを生成することができます。
        message.valid?
        # 作成したインスタンスがバリデーションによって保存ができない状態かチェックするため、valid?メソッドを利用します。
        expect(message.errors[:content]).to include('を入力してください')
        # message.errors[:カラム名]と記述することによって、そのカラムが原因のエラー文が入った配列を取り出すことができます
        # メッセージも画像も保存できない
      end

      it 'is invalid without group_id' do
        # group_idがないと保存できない
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it 'is invaid without user_id' do
        # user_idがないと保存できない
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end