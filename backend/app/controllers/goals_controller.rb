class GoalsController < ApplicationController
  def index
    user = User.find_by(id: session[:user_id])
    @goals = user.goals.where('goal_type = "saving" AND end_date >= ?', DateTime.now.to_date) 
    @sorted_goals = @goals.order('created_at DESC')
    @budget = user.goals.where('goal_type = "budget"')
    @budget_per_day = (@budget.last.amount/Time.now.end_of_month.day).round(2).to_i
    
    
    @goals_with_target = @sorted_goals.map do |goal|
      
      if (DateTime.now.to_date) > goal.start_date.to_date
        pp "@GOALS"
        pp @goals
        pp "@BUDGET"
        pp @budget.last
        pp "@BUDGET_PER_DAY"
        pp @budget_per_day
        @expected_spending = (DateTime.now.to_date - goal.start_date.to_date).to_i * @budget_per_day
        pp "@EXPECTED SPENDING"
        pp @expected_spending
        @transactions_for_goal = user.transactions.where("transaction_date > ? AND transaction_date < ?", goal.start_date.to_date, DateTime.yesterday.to_date).sum(:amount)
        pp "@TRANSACTIONS FOR GOAL"
        pp @transactions_for_goal
        @diff_in_spending = @expected_spending - @transactions_for_goal
        pp "@DIFF SPENDING"
        pp @diff_in_spending
        @active_goals_total = user.goals.where('goal_type = "saving" AND end_date >= ? AND start_date <= ?', (DateTime.now.end_of_day.to_date ), DateTime.now.end_of_day.to_date + 1.day).sum(:amount)
        pp "@ACTIVE GOALS TOTAL"
        pp @active_goals_total
        @proportion = goal.amount / @active_goals_total
        pp "@Proportion"
        pp @proportion
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
        completed: @is_completed
      }
    end

    render json: {
      goals: @goals_with_target
    }
  end

  def create
    pp "I AM HEREEEEEEE"
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
