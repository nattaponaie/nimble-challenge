class ModifyHtmlCodeToBinary < ActiveRecord::Migration[6.0]
  def change
    remove_column :keyword_data, :html_code
    add_column :keyword_data, :html_code, :binary
  end
end
