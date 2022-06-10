class ReactController < ApplicationController

  def home # Returns the react root app
    render "pages/react_app"
  end
end
