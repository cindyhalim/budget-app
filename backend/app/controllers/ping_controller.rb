class PingController < ApplicationController
  
  def index
<<<<<<< HEAD
    render json: { hello: "hello"}
  end
=======
    @result = Transaction.all
    @goal = Goal.all
    render json: { transactions: @result, goals: @goal}
  end 
>>>>>>> master


  

  
end
