class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User.find_by(email: params["user"]["email"])

    if user
      #set up cookie
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: [user]
      }
    else
      render json: {
        status: 401
      }
    end
  end

  def logged_in
    user = User.find_by(id: session[:user_id])
    @budget = user.goals.where('goal_type = "budget"')
    @database_last_checked = User.select("date_last_checked").where(id: session[:user_id])
    if DateTime.now.to_date >= @database_last_checked[0].date_last_checked && DateTime.now.to_date.month != @database_last_checked[0].date_last_checked.month
      @transactions_amount_for_last_month = user.transactions.where("transaction_date BETWEEN ? AND ?", Date.today.at_beginning_of_month.prev_month, Date.today.at_end_of_month.next_month).sum(:amount)
      pp @transactions_amount_for_last_month
      if @budget.last.start_date.to_date > Date.today.at_beginning_of_month
        @budget_for_checking = @budget[-2]
      else 
        @budget_for_checking = @budget.last
      end

      if @transactions_amount_for_last_month > @budget_for_checking.amount
        user.update(hp: user.hp - 20)
        # user.update(date_last_checked: Date.today)

      else
        user.update(coins: user.coins + 20)
        # user.update(date_last_checked: Date.today)
      end
      pp user
    end
    if @current_user
      pp @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: {
      status: 200,
      logged_out: true
    }
  end
end
