class CreateUser < ActiveRecord::Migration[6.0]
  def change
    create_table :user do |t|
      t.timestamps
      t.string :uid, null: false, index: { unique: true }
      t.string :email, null: false
    end
  end
end
