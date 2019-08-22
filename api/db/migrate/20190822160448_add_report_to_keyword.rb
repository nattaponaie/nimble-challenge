class AddReportToKeyword < ActiveRecord::Migration[6.0]
  def change
    add_reference :keyword, :report, index: true
    add_foreign_key :keyword, :report
  end
end
