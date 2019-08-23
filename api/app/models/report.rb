class Report < ApplicationRecord
  self.table_name = 'report'
  belongs_to :keyword
end
