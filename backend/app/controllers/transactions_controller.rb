class TransactionsController < ApplicationController

  def index
    user = User.find_by(id: session[:user_id])
    @total_for_month = user.transactions.select("sum(amount) as total").where('transaction_date BETWEEN ? AND ?',Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1),Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1).next_month.prev_day)
    
    @transactions = user.transactions.select("category,sum(amount) as amount").where('transaction_date BETWEEN ? AND ?',Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1),Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1).next_month.prev_day).group("category")



    if @transactions.length == 0
      render json: {transactions: []}
    else

      if params[:type] === "progress" 
        @budget = user.goals.where('goal_type = "budget"')
        render json: {total: @total, budget: @budget.last}

      elsif params[:type] === "pie"        
        @percent = @transactions.map do |transaction|     
          {
            name: transaction.category, y: (transaction.amount/@total_for_month[0].total * 100).round(2).to_i
          } 
        end
        render json: {transactions: @percent, total: @total_for_month}
    
      elsif params[:type] === "bar"
        @bar1 = @transactions.map do |transaction| 
          { month: params[:month],
            category: transaction.category,
            amount: (transaction.amount).to_i
          }
        end
          render json: {transactions: @bar1}
      end
    end
  end
end
