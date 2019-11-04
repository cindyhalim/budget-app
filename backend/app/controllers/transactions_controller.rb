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
        @total_for_day = user.transactions.select("sum(amount) as total").where("transaction_date >= ?", Date.today.beginning_of_day)


        @current_saving_goals= user.goals.where('end_date >= ? AND goal_type = "saving" AND start_date <= ?', Date.today.beginning_of_day, Date.today.end_of_day)

        pp "current saving"
        pp Date.today.end_of_day
        pp user.goals.where('goal_type = "saving"')

        @to_save_amount = (@current_saving_goals.map do |saving| 
             ((saving.amount/(saving.end_date.to_date - saving.start_date.to_date).to_i).ceil)
        end).reduce(0, :+)


        render json: {
          total: @total_for_day[0].total, 
          budget: (@budget.last.amount/Time.days_in_month(Date::MONTHNAMES.index(params[:month]))).round(2).to_i,
          toSave: @to_save_amount
        }

      elsif params[:type] === "alltransactions"
        @alltransactions = user.transactions.where('transaction_date BETWEEN ? AND ?', Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1),Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1).next_month.prev_day)
        render json: {allTransactions: @alltransactions} 

      elsif params[:type] === "monthlyprogress"
        @budget = user.goals.where('goal_type = "budget"')
        @total = (@transactions.map do |transaction| 
          ((transaction.amount).to_i).ceil end).reduce(0, :+)
        render json: {
          budget: (@budget.last.amount),
          total: @total
        }

      elsif params[:type] === "pie"        
        @percent = @transactions.map do |transaction| 
     
          {
            name: transaction.category, 
            y: (transaction.amount/@total_for_month[0].total * 100).to_f, 
            amount: transaction.amount.to_f
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

      elsif params[:type] === "transactions"
        @category_transactions = user.transactions.where('category = ? AND transaction_date BETWEEN ? AND ?', params[:category],Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1),Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1).next_month.prev_day)
        render json: {category_transactions: @category_transactions}
      end
    end
  end
  

def create
  pp params
  user = User.find_by(id: session[:user_id])
  user.transactions.create(amount: params["amount"], category: params["category"], location: params["location"], transaction_date: params["transaction_date"])
  pp Transaction.all
end
end
