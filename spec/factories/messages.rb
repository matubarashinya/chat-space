FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    # FactoryBotの記法を省略するために、rails_helper.rbに以下の記述
    user
    group
  end
end