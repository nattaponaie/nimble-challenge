class CreateKeyword < ActiveRecord::Migration[6.0]
  def change
    create_table :keyword do |t|
      t.timestamps
      t.references :user, index: true, foreign_key: { to_table: :user }
      t.string :keyword_name, null: false
    end
  end
end
