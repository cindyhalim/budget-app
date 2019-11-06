class TransactionsController < ApplicationController

  def index
    user = User.find_by(id: session[:user_id]) 
    


      if params[:type] === "progress" 
        @budget = user.goals.where(goal_type: 'budget')
        @total_for_day = user.transactions.select('sum(amount) as total').where('transaction_date >= ? AND transaction_date <= ?', Date.today.beginning_of_day, Date.today.end_of_day)

        render json: {
          total: @total_for_day[0].total.to_f.round(2), 
          budget: (@budget.last.amount/Time.days_in_month(Date::MONTHNAMES.index(params[:month]))).round(2).to_i
        }

      elsif params[:type] ==="budgetchart"
        @budget = user.goals.where(goal_type: 'budget')
        current_year = DateTime.now.year
        current_month = DateTime.now.mon

        monthly_transactions = {}

        (1..current_month).each do |month|
	        start_of_month = DateTime.civil_from_format :utc, current_year, month
          end_of_month = start_of_month.end_of_month

          monthly_transactions_sum = user.transactions.where(transaction_date: start_of_month..end_of_month).pluck(:amount).sum.to_f.round(2)
          if(monthly_transactions_sum > 0)
            monthly_transactions[Date::MONTHNAMES[month][0,3]] = monthly_transactions_sum
          end
        end

        render json: {transactions: monthly_transactions, budget: @budget.last.amount.to_f }

      elsif params[:type] === "alltransactions"
        @alltransactions = user.transactions.where('transaction_date BETWEEN ? AND ?', Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1),Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1).next_month.prev_day)
        render json: {allTransactions: @alltransactions} 

      elsif params[:type] === "monthlyprogress"
        @budget = user.goals.where(goal_type: 'budget')
        @transactions = user.transactions.select('category,sum(amount) as amount').where('transaction_date BETWEEN ? AND ?',Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1),Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1).next_month.prev_day).group('category')
        @total = (@transactions.map do |transaction| 
          ((transaction.amount).to_i).ceil end).reduce(0, :+)
        render json: {
          budget: (@budget.last.amount).to_f,
          total: @total
        }

      elsif params[:type] === "pie" 
        @total_for_month = user.transactions.select('sum(amount) as total').where('transaction_date BETWEEN ? AND ?',Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1),Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1).next_month.prev_day)
        @transactions = user.transactions.select('category,sum(amount) as amount').where('transaction_date BETWEEN ? AND ?',Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1),Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1).next_month.prev_day).group('category')    
        @percent = @transactions.map do |transaction| 
     
          {
            name: transaction.category, 
            y: (transaction.amount/@total_for_month[0].total * 100).to_f, 
            amount: transaction.amount.to_f
          } 
        end
        render json: {transactions: @percent, total: @total_for_month}
    
      elsif params[:type] === "bar"
        @transactions = user.transactions.select('category,sum(amount) as amount').where('transaction_date BETWEEN ? AND ?',Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1),Date.new(Time.now.year,Date::MONTHNAMES.index(params[:month]),1).next_month.prev_day).group('category')
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
  # end
  
def create
  pp params
  user = User.find_by(id: session[:user_id])
  user.transactions.create(amount: params['amount'], category: params['category'], location: params['location'], transaction_date: params['transaction_date'])
  pp Transaction.all
end
def check_top_three
  user = User.find_by(id: session[:user_id])
  @transactions_top_three = user.transactions.select('sum(amount) as total, location').where('transaction_date BETWEEN ? AND ?', Date.today.at_beginning_of_month, Date.today.at_end_of_month).group(:location).order('total DESC').limit(3)
  render json: @transactions_top_three
end
end
