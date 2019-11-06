class GoalsController < ApplicationController
  def check_budget_met
    user = User.find_by(id: session[:user_id])
    @database_last_checked = User.select("date_last_checked").where(id: session[:user_id])
    @budget = user.goals.where(goal_type: "budget")
  
    if DateTime.now.to_date >= @database_last_checked[0].date_last_checked && DateTime.now.to_date.month != @database_last_checked[0].date_last_checked.month
      @transactions_amount_for_last_month = user.transactions.where("transaction_date BETWEEN ? AND ?", Date.today.at_beginning_of_month.prev_month, Date.today.at_end_of_month.prev_month).sum(:amount)
      if @budget.last.start_date.to_date > Date.today.at_beginning_of_month
        @budget_for_checking = @budget[-2]
      else 
        @budget_for_checking = @budget.last
      end

      if @transactions_amount_for_last_month > @budget_for_checking.amount
        user.update(hp: user.hp - 20)
        user.update(date_last_checked: Date.today)

      else
        user.update(coins: user.coins + 20)
        user.update(date_last_checked: Date.today, num_times_bud_met: user.num_times_bud_met + 1)
      end
    end
    render json: {user: user}
  end
  
  def index
    user = User.find_by(id: session[:user_id])
    @goals = user.goals.where('goal_type = "saving" AND end_date >= ?', DateTime.now.to_date) 
    @sorted_goals = @goals.order('created_at DESC')
    @budget = user.goals.where('goal_type = "budget"')
    @budget_per_day = (@budget.last.amount/Time.now.end_of_month.day).round(2).to_i
    @goals_with_target = @sorted_goals.map do |goal|
      
      if (DateTime.now.to_date) > goal.start_date.to_date
        @expected_spending = (DateTime.now.to_date - goal.start_date.to_date).to_i * @budget_per_day
        @transactions_for_goal = user.transactions.where("transaction_date > ? AND transaction_date < ?", goal.start_date.to_date, DateTime.yesterday.to_date).sum(:amount)
        @diff_in_spending = @expected_spending - @transactions_for_goal
        @active_goals_total = user.goals.where('goal_type = "saving" AND end_date >= ? AND start_date < ?', (DateTime.now.end_of_day.to_date ), DateTime.now.end_of_day.to_date).sum(:amount)
        @proportion = goal.amount / @active_goals_total
        @target_for_day = ((goal.amount - (@diff_in_spending * @proportion))/(goal.end_date.to_date - DateTime.now.to_date).to_i).round(0).to_i
        if @target_for_day < 0
          @is_completed = true
        else 
          @is_completed = false
        end
      else
      @target_for_day = ((goal.amount/(goal.end_date.to_date - goal.start_date.to_date).to_i).ceil)
      @is_completed = false
      end
      {
        id: goal.id, 
        start_date: goal.start_date, 
        end_date: goal.end_date, 
        amount: goal.amount, 
        name: goal.name, 
        target_per_day: @target_for_day,
        completed: @is_completed,
        met_budget: @exceeded_budget
      }
    end

    render json: {
      goals: @goals_with_target
    }
  end

  def create
    pp session[:user_id]
    user = User.find_by(id: session[:user_id])
    pp user
    goal = user.goals.create(start_date: params['goal']['start_date'], end_date: params['goal']['end_date'], goal_type: params['goal']['goal_type'], amount: params['goal']['amount'], name: params['goal']['name'])

    if user.id == goal.user_id
      render json: {
        status: :created,
        goal: {id: goal.id, 
        start_date: goal.start_date, 
        end_date: goal.end_date, 
        amount: goal.amount, 
        name: goal.name}
      }
    else 
      render json: { status: 500 }
    end
  end

  def update
    goal = Goal.find(params["id"])
    goal.update(start_date: params['goal']['start_date'], end_date: params['goal']['end_date'], amount: params['goal']['amount'], name: params['goal']['name'])
  end

  def destroy
    Goal.find(params["id"]).destroy
  end
end
