class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date, :cost, :status

  has_many :comments
end
