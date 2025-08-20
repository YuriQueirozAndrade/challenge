require "test_helper"
require_relative "../../app/serializers/user_serializer"

class AuthControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = User.create!(name: "Test User", email: "test@example.com", password: "password")
  end

  test "should log in user with correct credentials" do
    post auth_login_url, params: { email: @user.email, password: "password" }, as: :json
    assert_response :accepted
    response_json = JSON.parse(response.body)
    assert response_json["user"]
    assert response_json["token"]
    assert_equal @user.email, response_json["user"]["email"]
  end

  test "should not log in user with incorrect password" do
    post auth_login_url, params: { email: @user.email, password: "wrong_password" }, as: :json
    assert_response :unauthorized
    response_json = JSON.parse(response.body)
    assert_equal "Incorrect password", response_json["message"]
  end

  test "should not log in if user does not exist" do
    post auth_login_url, params: { email: "nonexistent@example.com", password: "any_password" }, as: :json
    assert_response :unauthorized
    response_json = JSON.parse(response.body)
    assert_equal "User doesn't exist", response_json["message"]
  end
end
