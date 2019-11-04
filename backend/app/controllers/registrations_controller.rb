class RegistrationsController < ApplicationController
  def check_badges
    user = User.find_by(id: session[:user_id])
    @badges = user.badges
    pp params[:badge]

    if params[:badge] == "1"
      pp user.badges.where(name: "badge1")[0].path_name
      send_file user.badges.where(name: "badge#{params[:badge]}")[0].path_name
    end
    if params[:badge] == "3"
      pp user.badges.where(name: "badge1")[0].path_name
      send_file user.badges.where(name: "badge#{params[:badge]}")[0].path_name
    end
    if params[:badge] == "5"
      pp user.badges.where(name: "badge1")[0].path_name
      send_file user.badges.where(name: "badge#{params[:badge]}")[0].path_name
    end
    if params[:badge] == "10"
      pp user.badges.where(name: "badge1")[0].path_name
      send_file user.badges.where(name: "badge#{params[:badge]}")[0].path_name
    end
    # pp 'HELLOOOOOOOOOOOOOOOOOOOO'
    # send_file "storage/badge_1.png"
    # @badges.each do |badge|
    #   pp badge
    #   send_file badge.path_name, :type => 'image/jpeg'
    # end

    # render json: {badges: @badges}
  end

  def create
    user = User.create!(name: params['user']['name'], email: params['user']['email'], password: params['user']['password'], password_confirmation: params['user']['password_confirmation'])

    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: [user]
      }
    else 
      render json: { status: 500 }
    end
  end
end
