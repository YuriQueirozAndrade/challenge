require "test_helper"

class CommentTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
    @task = tasks(:one)
    @comment = comments(:one)
  end

  test "comment should be valid" do
    assert @comment.valid?
  end

  test "text should be present" do
    @comment.text = " "
    assert_not @comment.valid?
  end

  test "user_id should be present" do
    @comment.user_id = nil
    assert_not @comment.valid?
  end

  test "task_id should be present" do
    @comment.task_id = nil
    assert_not @comment.valid?
  end


  test "comment should belong to a user" do
    assert_respond_to @comment, :user
    assert_equal @user, @comment.user
  end

  test "comment should belong to a task" do
    assert_respond_to @comment, :task
    assert_equal @task, @comment.task
  end
end
