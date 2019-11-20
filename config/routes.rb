Rails.application.routes.draw do
  devise_for :users
  root to: 'groups#index'
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
   resources :messages, only: [:index, :create]
   namespace :api do
    resources :messages, only: :index, defaults: { format: 'json' }
    # namespace :ディレクトリ名 do ~ endと囲む形でルーティングを記述すると、そのディレクトリ内のコントローラのアクションを指定できます。
    # defaultsオプションを利用して、このルーティングが来たらjson形式でレスポンスするよう指定しています。
  end
  end
end
