class RegistrationsController < ApplicationController
  def check_badges
    user = User.find_by(id: session[:user_id])
    @badges = user.badges

    if params[:badge] == "1"
      pp user.badges.where(name: 'badge1')[0].path_name
      send_file user.badges.where(name: "badge#{params[:badge]}")[0].path_name
    end
    if params[:badge] == "3"
      pp user.badges.where(name: 'badge1')[0].path_name
      send_file user.badges.where(name: "badge#{params[:badge]}")[0].path_name
    end
    if params[:badge] == "5"
      pp user.badges.where(name: 'badge1')[0].path_name
      send_file user.badges.where(name: "badge#{params[:badge]}")[0].path_name
    end
    if params[:badge] == "10"
      pp user.badges.where(name: 'badge1')[0].path_name
      send_file user.badges.where(name: 'badge#{params[:badge]}')[0].path_name
    end
    if params[:badge] == "locked"
      pp user.badges.where(name: 'badge1')[0].path_name
      send_file "storage/locked.png"
    end
  end

  def create
    user = User.create!(name: params['user']['name'], email: params['user']['email'], password: params['user']['password'], password_confirmation: params['user']['password_confirmation'])

    badge = Badge.first
    badge2 = Badge.second
    badge3 = Badge.third
    badge4 = Badge.fourth
    user.badges << badge
    user.badges << badge2
    user.badges << badge3
    user.badges << badge4

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

  def update
    user = User.find_by(id: session[:user_id])
    def reg_params
      params.require(:registration).permit(:name, :email, :password, :password_confirmation).select { |k, v| !v.empty? }
    end
    user.update_attributes(reg_params)
    render json: {success:true}
  end
end
