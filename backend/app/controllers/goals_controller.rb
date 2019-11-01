class GoalsController < ApplicationController
  def index
    user = User.find_by(id: session[:user_id])
    @goals = user.goals.where('goal_type = "saving" AND end_date >= ?', DateTime.now.to_date) 
    @sorted_goals = @goals.order('created_at DESC')

    render json: {
      goals: @sorted_goals
    }
  end

  def create
    user = User.find_by(id: session[:user_id])
    goal = user.goals.create(start_date: params['goal']['start_date'], end_date: params['goal']['end_date'], user_id: session[:user_id], goal_type: params['goal']['goal_type'], amount: params['goal']['amount'], name: params['goal']['name'])

    if user.id == goal.user_id
      render json: {
        status: :created,
        goal: {id: goal.id, start_date: goal.start_date, end_date: goal.end_date, amount: goal.amount, name: goal.name}
      }
    else 
      render json: { status: 500 }
    end
  end

  def update
    pp "=========="
    pp params
    pp "=========="
    goal = Goal.find(params["id"])
    goal.update(start_date: params['goal']['start_date'], end_date: params['goal']['end_date'], amount: params['goal']['amount'], name: params['goal']['name'])
  end

  def destroy
    Goal.find(params["id"]).destroy
  end
end
