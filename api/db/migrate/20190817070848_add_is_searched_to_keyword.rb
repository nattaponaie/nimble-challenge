class AddIsSearchedToKeyword < ActiveRecord::Migration[6.0]
  def change
    add_column :keyword_data, :total_adwords, :integer, default: 0
    add_column :keyword_data, :total_links, :integer, default: 0
    add_column :keyword_data, :total_results, :integer, default: 0
    add_column :keyword_data, :html_code, :integer, default: 0
    add_column :keyword_data, :is_searched, :boolean, default: false
  end
end
