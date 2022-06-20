module Queries
  class PlacesOrderer
    OrderConfig = Struct.new(:sort_column, :sort_order, keyword_init: true)
    def initialize(
      sort_column_allow_list: %w[name city],
      sort_order_allow_list: %w[asc desc]
    )
      @sort_column_allow_list = sort_column_allow_list
      @sort_order_allow_list = sort_order_allow_list
    end

    def call(places, order_config)
      if !sort_column_allow_list.include? order_config.sort_column
        column_error(order_config)
      end

      if !sort_order_allow_list.include? order_config.sort_order
        order_error(order_config)
      end

      places.order("#{order_config.sort_column} #{order_config.sort_order}")
    end

    private

    attr_reader :sort_column_allow_list, :sort_order_allow_list
    
    def order_error(order_config)
      fail StandardError, "#{order_config} has an invalid order"
    end 

    def column_error(order_config)
      fail StandardError, "#{order_config} has an invalid column"
    end
  end
end
