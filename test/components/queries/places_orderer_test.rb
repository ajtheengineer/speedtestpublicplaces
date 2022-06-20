require "test_helper"

module Queries
  class PlacesOrdererTest < ActiveSupport::TestCase
    orderer = Queries::PlacesOrderer.new

    test "throws error if sort column is invalid" do
      places = FactoryBot.create_list(:place, 2)
      order_config = Queries::PlacesOrderer::OrderConfig.new(sort_column: "invalid_column", sort_order: "desc")
      err =  assert_raises(StandardError) { orderer.call(places, order_config) }
      assert_match /has an invalid column/, err.message
    end

    test "throws error if sort order is invalid" do
      places = FactoryBot.create_list(:place, 2)
      order_config = Queries::PlacesOrderer::OrderConfig.new(sort_column: "name", sort_order: "invalid")
      err =  assert_raises(StandardError) { orderer.call(places, order_config) }
      assert_match /has an invalid order/, err.message
    end

    test "returns empty list of places is empty with valid order config" do
      order_config = Queries::PlacesOrderer::OrderConfig.new(sort_column: "name", sort_order: "asc")
     
      assert_equal orderer.call(Place.all, order_config), []
    end

    test "returns single place if only one place is passed in with valid order config" do
      place = FactoryBot.create(:place)
      order_config = Queries::PlacesOrderer::OrderConfig.new(sort_column: "name", sort_order: "asc")
     
      assert_equal orderer.call(Place.all, order_config), [place]
    end

    test "orders by name asc correctly" do
      place_1 = FactoryBot.create(:place, name: "A")
      place_2 = FactoryBot.create(:place, name: "C")
      place_3 = FactoryBot.create(:place, name: "B")
      order_config = Queries::PlacesOrderer::OrderConfig.new(sort_column: "name", sort_order: "asc")

      assert_equal orderer.call(Place.all, order_config), [place_1, place_3, place_2]
    end

    test "orders by name desc correctly" do
      place_1 = FactoryBot.create(:place, name: "A")
      place_2 = FactoryBot.create(:place, name: "C")
      place_3 = FactoryBot.create(:place, name: "B")
      order_config = Queries::PlacesOrderer::OrderConfig.new(sort_column: "name", sort_order: "desc")

      assert_equal orderer.call(Place.all, order_config), [place_2, place_3, place_1]
    end

    test "orders by city asc correctly" do
      place_1 = FactoryBot.create(:place, city: "A")
      place_2 = FactoryBot.create(:place, city: "C")
      place_3 = FactoryBot.create(:place, city: "B")
      order_config = Queries::PlacesOrderer::OrderConfig.new(sort_column: "city", sort_order: "asc")

      assert_equal orderer.call(Place.all, order_config), [place_1, place_3, place_2]
    end

    test "orders by city desc correctly" do
      place_1 = FactoryBot.create(:place, city: "A")
      place_2 = FactoryBot.create(:place, city: "C")
      place_3 = FactoryBot.create(:place, city: "B")
      order_config = Queries::PlacesOrderer::OrderConfig.new(sort_column: "city", sort_order: "desc")

      assert_equal orderer.call(Place.all, order_config), [place_2, place_3, place_1]
    end
  end
end