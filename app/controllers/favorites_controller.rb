class FavoritesController < ApplicationController
    def create
        fav = Favorite.create!(fav_params)
        render json: fav, status: :created
    end

    def destroy
        fav = find_fav
        fav.destroy
        head :no_content
    end

    private

    def find_fav
        Favorite.find(params[:id])
    end

    def fav_params
        params.permit(:user_id, :recipe_id)
    end
end
