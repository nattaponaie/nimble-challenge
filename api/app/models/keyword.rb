class Keyword < ApplicationRecord
  self.table_name = 'keyword'
  belongs_to :user
  has_one :report

  def initialize_report
    report = Report.find_or_initialize_by(
      keyword: self
    )
    report.assign_attributes(is_searched: false) if report[:is_searched] 
    report.save!
    assign_attributes(report_id: report[:id])
  end
  
  def self.find_by_user(current_user)
    keywords = Keyword.where(user: current_user).order(id: :asc)
  end
end
