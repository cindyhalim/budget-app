class GameController < ApplicationController
    def index
        user = User.find_by(id: session[:user_id])
        user.update(hp: user.hp + params[:hp].to_i, coins: user.coins + params[:coins].to_i)
        render json: {status: user, params: params}
    end
end
