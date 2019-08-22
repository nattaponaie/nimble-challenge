class CreateReport < ActiveRecord::Migration[6.0]
  def change
    create_table :report do |t|
      t.timestamps
      t.references :keyword, index: true, foreign_key: { to_table: :keyword }
      t.integer :total_adwords, default: 0
      t.integer :total_links, default: 0
      t.integer :total_results, default: 0
      t.binary :html_code
      t.boolean :is_searched, default: false
    end
  end
end
