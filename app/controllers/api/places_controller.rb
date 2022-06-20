module Api
  class PlacesController < BaseController
    
    def index
      matching_places = get_matching_places(params["search_term"])

      order_config = Queries::PlacesOrderer::OrderConfig.new(
        sort_column: params["sort_column"],
        sort_order: params["sort_order"]
      )

      ordered_places = Queries::PlacesOrderer.new.call(matching_places, order_config)

      places_to_return = ordered_places.map do |place|
        {
          name: place.name,
          city: place.city,
          most_recent_download_speed: most_recent_download_speed(place),
          most_recent_download_units: most_recent_download_units(place),
          number_of_measurements: number_of_measurements(place)
        }
      end

      render(json: { places: places_to_return} )
    end

    def most_recent_download_speed(place)
      # Assume that all the units are the same.
      place.internet_speeds.order("created_at").last&.download_speed
    end

    def most_recent_download_units(place)
      place.internet_speeds.order("created_at").last&.download_units
    end

    def number_of_measurements(place)
      place.internet_speeds.count
    end

    def get_matching_places(search_term)
      if search_term.blank?
        Place.all
      else
        Place.where("name LIKE :search_term OR city LIKE :search_term", search_term: "%#{search_term}%")
      end
    end
  end
end