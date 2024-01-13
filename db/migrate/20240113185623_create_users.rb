class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false, unique: true
      t.string :password_digest, null: false
      t.references :avatar, foreign_key: true

      t.timestamps
    end
  end
end
