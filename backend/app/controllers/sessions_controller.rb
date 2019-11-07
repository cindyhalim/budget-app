class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    
    user = User.find_by(email: params['user']['email'])

    if user && user.authenticate(params['user']['password'])
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: [user]
      }
    else
      pp "here in fail"
      render json: {
        status: 401
      }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    session[:user_id] = nil
    render json: {
      status: 200,
      logged_out: true
    }
  end
  #   def options
  #     if access_allowed?
  #       set_access_control_headers
  #       head :ok
  #     else
  #       head :forbidden
  #     end
  #   end

  #   private
  #   def set_access_control_headers 
  #     headers['Access-Control-Allow-Origin'] = request.env['HTTP_ORIGIN']
  #     headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
  #     headers['Access-Control-Max-Age'] = '1000'
  #     headers['Access-Control-Allow-Headers'] = '*,x-requested-with'
  #   end


  #   def access_allowed?
  #     allowed_sites = [request.env['HTTP_ORIGIN']] #you might query the DB or something, this is just an example
  #     return allowed_sites.include?(request.env['HTTP_ORIGIN'])    
  #   end  
  # end
end
