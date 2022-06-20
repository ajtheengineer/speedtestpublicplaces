require "test_helper"

module Api
  class PlacesControllerTest < ActionDispatch::IntegrationTest
    test "answers places the match search term is empty" do
      # Create some data
      place = FactoryBot.create(:place)

      # Hit an endpoint and see if the response is correct.
      get "/api/places?search_term=&sort_column=name&sort_order=asc"
      parsed_body = JSON.parse(response.body)

      expected_response = (
        {
          places: [
            {
              name: place.name,
              city: place.city,
              most_recent_download_speed: nil,
              most_recent_download_units: nil,
              number_of_measurements: 0
            }.stringify_keys
          ]
        }.stringify_keys
      )

      assert_equal expected_response, parsed_body
    end  

    test "answers all places if search term is set" do
      place1 = FactoryBot.create(:place, name: "Starbucks")
      place2 = FactoryBot.create(:place, name: "Uncle Bob's Cafe")

      get "/api/places?search_term=Bob&sort_column=name&sort_order=asc"
      parsed_body = JSON.parse(response.body)

      expected_response = (
        {
          places: [
            {
              name: place2.name,
              city: place2.city,
              most_recent_download_speed: nil,
              most_recent_download_units: nil,
              number_of_measurements: 0
            }.stringify_keys
          ]
        }.stringify_keys
      )

      assert_equal expected_response, parsed_body
    end

    test "answers no places if search term does not match any places" do
      FactoryBot.create(:place, name: "Starbucks")

      get "/api/places?search_term=Blah&sort_column=name&sort_order=asc"

      parsed_body = JSON.parse(response.body)
      expected_response = { places: [] }.stringify_keys

      assert_equal expected_response, parsed_body
    end

    test "recent upload speed, units, and number of meausrements are correct" do
      place = FactoryBot.create(:place, name: "Starbucks", city: "Nairobi")
      speed1 = FactoryBot.create(
        :internet_speed,
        place: place,
        download_speed: 18.22,
        download_units: "mbps",
        created_at: 5.days.ago
      )
      speed2 = FactoryBot.create(
        :internet_speed,
        place: place,
        download_speed: 59.10,
        download_units: "mbps",
        created_at: 3.days.ago
      )

      get "/api/places?search_term&sort_column=name&sort_order=asc"

      parsed_body = JSON.parse(response.body)
      expected_response = {
        places: [
          {
            name: "Starbuck",
            city: "Nairobi",
            most_recent_download_speed: 59.10,
            most_recent_download_units: "mbps",
            number_of_measurements: 2
          }.stringify_keys
        ]
      }.stringify_keys
    end
  end
end