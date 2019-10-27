class ApplicationController < ActionController::API
  # before_filter headers['Access-Control-Allow-Origin'] = '*' 

  #ignore csrf token to communicate with router which is used when user is inputing in rails form, not needed for our app
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token 
end
