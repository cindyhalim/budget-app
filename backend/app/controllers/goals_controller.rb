class GoalsController < ApplicationController
  def index
    user = User.find_by(id: session[:user_id])
    @goals = user.goals.where('goal_type = "saving" AND end_date >= ?', DateTime.now.to_date) 
    @sorted_goals = @goals.order('created_at DESC')
    @goals_with_target = @sorted_goals.map do |goal|
      {
        id: goal.id, 
        start_date: goal.start_date, 
        end_date: goal.end_date, 
        amount: goal.amount, 
        name: goal.name, 
        target_per_day: ((goal.amount/(goal.end_date.to_date - goal.start_date.to_date).to_i).ceil)
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
