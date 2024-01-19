class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :show]

    def show
        user = find_user
        render json: user, status: :ok
    end

    def auth
        render json: current_user, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end 

    def update
        current_user.update!(edit_params)
        render json: current_user, status: :accepted
    end
    
    private 

    def user_params
        params.permit(:username, :avatar_id, :password)
    end 

    def edit_params
        params.permit(:avatar_id)
      end

    def find_user
        User.find(params[:id])
    end
end
