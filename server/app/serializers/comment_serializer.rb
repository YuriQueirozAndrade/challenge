class CommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :task_id, :text, :created_at

  attributes :user_name

  def user_name
    object.user.name
  end
end
