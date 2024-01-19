class RecipesController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]
    
    def index 
        render json: Recipe.where(is_private: false), status: :ok
    end

    def show
        recipe = find_recipe
        if recipe.is_private 
            if recipe.user_id == current_user.id
                render json: recipe, status: :ok
            else
            render json: { error: "Not authorized" }, status: :unauthorized 
            end
        else
        render json: recipe, status: :ok
        end
    end

    def create
        recipe = Recipe.create!(recipe_params)
        render json: recipe, status: :created
    end

    def update
        recipe = find_recipe
        new_recipe = recipe.update!(recipe_update_params)

        render json: new_recipe, status: :accepted
    end

    def destroy
        recipe = find_recipe
        recipe.destroy
        head :no_content
    end

    private

    def recipe_params
        params.require(:recipe).permit(:title, :image_url, :is_private, :user_id, :ingredients_attributes => [:amount, :unit, :name, :ordinal], :directions_attributes => [:direction, :ordinal])
    end

    def recipe_update_params
        params.require(:recipe).permit(:title, :image_url, :is_private, :ingredients_attributes => [:id, :amount, :unit, :name, :ordinal, :recipe_id, :_destroy], :directions_attributes => [:id, :direction, :ordinal, :recipe_id, :_destroy])
    end
    
    def find_recipe
        Recipe.find(params[:id])
    end

end
