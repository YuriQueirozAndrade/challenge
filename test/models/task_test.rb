require "test_helper"

class TaskTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
    @task = tasks(:one)
  end


  test "task should be valid" do
    assert @task.valid?
  end

  test "name should be present" do
    @task.name = " "
    assert_not @task.valid?
  end

  test "start_date should be present" do
    @task.start_date = nil
    assert_not @task.valid?
  end

  test "user_id should be present" do
    @task.user_id = nil
    assert_not @task.valid?
  end


  test "task should belong to a user" do
    assert_respond_to @task, :user
    assert_equal @user, @task.user
  end

  test "task should have many comments" do
    assert_respond_to @task, :comments
    assert @task.comments.is_a?(ActiveRecord::Associations::CollectionProxy)
  end
end
