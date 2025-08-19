class CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show update destroy ]

  # GET /comments
  def index
    @comments = current_user.comments.order(created_at: :desc)
    render json: @comments
  end

  # GET /tasks/:task_id/comments/:id
  def show
    render json: @comment
  end

  # POST /tasks/:task_id/comments
  def create
    task = current_user.tasks.find_by!(id: params[:task_id])

    @comment = task.comments.build(comment_params.merge(user_id: current_user.id))

    if @comment.save
      render json: @comment, status: :created
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Task not found" }, status: :not_found
  end

  # PATCH/PUT /tasks/:task_id/comments/:id
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/:task_id/comments/:id
  def destroy
    @comment.destroy
    head :no_content
  end

  private
    def set_comment
      task = current_user.tasks.find_by!(id: params[:task_id])

      @comment = task.comments.find_by!(id: params[:id])

    rescue ActiveRecord::RecordNotFound
      render json: { error: "Comment or task not found" }, status: :not_found
    end

    def comment_params
      params.require(:comment).permit(:text)
    end
end
