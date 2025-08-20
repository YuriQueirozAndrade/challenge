require "test_helper"
require_relative "../../app/serializers/user_serializer"

class UsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    payload = { user_id: @user.id }
    @token = JWT.encode(payload, "hellomars1211")
  end
  test "should create user" do
    assert_difference("User.count") do
      post users_url, params: { email: "newuser@example.com", name: "New User", password: "securepassword" }, as: :json
    end
    assert_response :created
  end


  test "should destroy a user with a valid token" do
    assert_difference("User.count", -1) do
      delete "/users/delete", params: { email: @user.email }, headers: { "Authorization" => "Bearer #{@token}" }, as: :json
    end
    assert_response :no_content
  end

  test "should not destroy a user that doesn't exist" do
    delete "/users/delete", params: { email: "nonexistent@example.com" }, headers: { "Authorization" => "Bearer #{@token}" }, as: :json
    assert_response :not_found
  end
end
