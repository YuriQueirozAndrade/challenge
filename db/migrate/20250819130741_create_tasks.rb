class CreateTasks < ActiveRecord::Migration[8.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.datetime :start_date
      t.datetime :end_date
      t.integer :cost
      t.integer :status
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
