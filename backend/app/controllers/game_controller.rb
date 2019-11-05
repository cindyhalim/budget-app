class GameController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        user.update(hp: user.hp + params[:hp].to_i, coins: user.coins + params[:coins].to_i)
        render json: {status: user, params: params}
    end
    def update
        user = User.find_by(id: session[:user_id])
        user.update(hp: params[:hp], coins: params[:coins], num_times_bud_met: params[:num_times_bud_met], date_last_checked: Date.today)
        render json: {user: user}
    end
end
