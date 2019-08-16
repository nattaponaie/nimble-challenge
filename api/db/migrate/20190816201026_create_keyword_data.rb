class CreateKeywordData < ActiveRecord::Migration[6.0]
  def change
    create_table :keyword_data do |t|
      t.string :keyword, null: false
      t.timestamps
    end
  end
end
