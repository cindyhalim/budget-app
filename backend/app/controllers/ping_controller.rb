class PingController < ApplicationController
  
  def index
    render json: {test: "testing"}
  end
end
