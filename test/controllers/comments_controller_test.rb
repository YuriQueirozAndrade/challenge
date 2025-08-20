require "test_helper"

class CommentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    payload = { user_id: @user.id }
    @token = JWT.encode(payload, "hellomars1211")
    @task = tasks(:one)
    @comment = comments(:one)
  end

  test "should get index" do
    get task_comments_url(@task), headers: { "Authorization" => "Bearer #{@token}" }, as: :json
    assert_response :success
  end

  test "should create comment" do
    assert_difference("Comment.count") do
      post task_comments_url(@task), params: { comment: { task_id: @task.id, text: "A new comment", user_id: @user.id } }, headers: { "Authorization" => "Bearer #{@token}" }, as: :json
    end
    assert_response :created
  end

  test "should show comment" do
    get task_comment_url(@task, @comment), headers: { "Authorization" => "Bearer #{@token}" }, as: :json
    assert_response :success
  end

  test "should update comment" do
    patch task_comment_url(@task, @comment), params: { comment: { text: "Updated text" } }, headers: { "Authorization" => "Bearer #{@token}" }, as: :json
    assert_response :success
  end

  test "should destroy comment" do
    assert_difference("Comment.count", -1) do
      delete task_comment_url(@task, @comment), headers: { "Authorization" => "Bearer #{@token}" }, as: :json
    end
    assert_response :no_content
  end
end
