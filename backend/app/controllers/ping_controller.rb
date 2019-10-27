class PingController < ApplicationController
  
  def index
    @result = Transaction.all
    @result
    render json: { transactions: @result}
  end


  

  
end
