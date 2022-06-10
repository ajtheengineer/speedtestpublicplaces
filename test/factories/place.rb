FactoryBot.define do
  factory :place do
    name { Faker::Name.name }
    address  { Faker::Address.street_address }
    city { Faker::Address.city }
  end
end