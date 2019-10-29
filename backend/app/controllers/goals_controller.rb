class GoalsController < ApplicationController
  def create
    user = User.find_by(id: params['goal']['user_id'])
    pp user
    goal = user.goals.create(end_date: params['goal']['end_date'], user_id: params['goal']['user_id'], goal_type: params['goal']['goal_type'], amount: params['goal']['amount'], name: params['goal']['name'])

    if user.id == goal.user_id
      render json: {
        status: :created,
        goal: [goal]
      }
    else 
      render json: { status: 500 }
    end

  end
end
