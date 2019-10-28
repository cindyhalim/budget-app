class PingController < ApplicationController
  
  def index
    @result = Transaction.all
    @goal = Goal.all
    render json: { transactions: @result, goals: @goal}
  end


  

  
end
