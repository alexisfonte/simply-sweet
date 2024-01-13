class AddValidationToAvatars < ActiveRecord::Migration[7.0]
  def change
    change_column :avatars, :name, :string, null: false
    change_column :avatars, :image_url, :string, null: false
  end
end
