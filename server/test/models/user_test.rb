require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
  end


  test "user should be valid" do
    assert @user.valid?
  end

  test "name should be present" do
    @user.name = " "
    assert_not @user.valid?
  end

  test "email should be present" do
    @user.email = " "
    assert_not @user.valid?
  end


  test "email should be unique" do
    duplicate_user = @user.dup
    assert_not duplicate_user.valid?
  end


  test "should authenticate with correct password" do
    assert @user.authenticate("password"), "User should be authenticated"
  end

  test "should not authenticate with incorrect password" do
    assert_not @user.authenticate("wrong_password"), "User should not be authenticated"
  end


  test "user should have many tasks" do
    assert_respond_to @user, :tasks
    assert @user.tasks.is_a?(ActiveRecord::Associations::CollectionProxy)
  end

  test "user should have many comments" do
    assert_respond_to @user, :comments
    assert @user.comments.is_a?(ActiveRecord::Associations::CollectionProxy)
  end
end
