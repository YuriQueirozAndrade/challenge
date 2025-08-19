class TasksController < ApplicationController
  before_action :set_task, only: %i[ show update destroy ]

  # GET /tasks
  def index
    @tasks = current_user.tasks.includes(:comments).order(created_at: :desc)
    render json: @tasks, status: :ok
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    @task = current_user.tasks.build(task_params)

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  def destroy
    @task.destroy
    head :no_content
  end


private

  def set_task
    @task = current_user.tasks.includes(:comments).find_by!(id: params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Task not found" }, status: :not_found
  end

  def task_params
    params.require(:task).permit(:name, :start_date, :end_date, :cost, :status)
  end
end
# app/serializers/task_serializer.rb
class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :start_date, :end_date, :cost, :status

  has_many :comments
end
