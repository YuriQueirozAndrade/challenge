# app/controllers/users_controller.rb
class UsersController < ApplicationController
  skip_before_action :authorized, only: [ :create ]
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid_record

  def create
    user = User.create!(user_params)
    @token = encode_token(user_id: user.id)
    render json: {
        user: UserSerializer.new(user),
        token: @token
    }, status: :created
  end

  def me
    render json: current_user, status: :ok
  end

  def destroy
    user_to_delete = User.find_by(email: params[:email])

    if user_to_delete && user_to_delete == current_user
      user_to_delete.destroy
      head :no_content
    elsif !user_to_delete
      render json: { error: "User not found" }, status: :not_found
    else
      render json: { error: "You are not authorized to delete this account." }, status: :forbidden
    end
  end

  private

  def user_params
    params.permit(:name, :password, :email)
  end

  def handle_invalid_record(e)
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
end
