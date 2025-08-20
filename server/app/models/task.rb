class Task < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  enum :status, { done: 0, pending: 1, ongoing: 2 }

  validates :name, presence: true
  validates :start_date, presence: true
end
