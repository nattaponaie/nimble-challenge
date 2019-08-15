class CreateKeywordFile < ActiveRecord::Migration[6.0]
  def change
    create_table :keyword_files do |t|
      t.string :file_name, null: false
    end
  end
end
