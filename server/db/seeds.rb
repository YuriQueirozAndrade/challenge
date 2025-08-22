# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#   # db/seeds.rb
# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts "Seeding database..."

Comment.destroy_all
Task.destroy_all
User.destroy_all

statuses = [ 0, 1, 2 ]

puts "Finding or creating admin user..."
admin_user = User.find_or_create_by!(email: 'admin@admin') do |user|
  user.name = 'Admin'
  user.password = 'admin'
  user.password_confirmation = 'admin'
end
puts "Admin user created or found."

puts "Creating regular users..."
regular_users = []
10.times do
  regular_users << User.create!(
    name: Faker::Name.unique.name,
    email: Faker::Internet.unique.email,
    password_digest: "password123"
  )
end
puts "10 regular users created."

puts "Creating tasks for the admin user..."
5.times do
  task = admin_user.tasks.create!(
    name: Faker::Lorem.sentence(word_count: 3),
    start_date: Faker::Time.between(from: 1.month.ago, to: Time.now),
    end_date: Faker::Time.between(from: Time.now, to: 1.month.from_now),
    cost: Faker::Number.between(from: 100, to: 5000),
    status: statuses.sample
  )

  rand(1..3).times do
    commenter = [ admin_user, regular_users.sample ].sample

    task.comments.create!(
      user: commenter,
      text: Faker::Lorem.paragraph(sentence_count: 2)
    )
  end
end
puts "Tasks and comments created for the admin user."

puts "Creating tasks and comments for regular users..."
regular_users.each do |user|
  rand(1..5).times do
    task = user.tasks.create!(
      name: Faker::Lorem.sentence(word_count: 3),
      start_date: Faker::Time.between(from: 1.month.ago, to: Time.now),
      end_date: Faker::Time.between(from: Time.now, to: 1.month.from_now),
      cost: Faker::Number.between(from: 100, to: 5000),
      status: statuses.sample
    )

    rand(1..3).times do
      commenter = regular_users.sample
      task.comments.create!(
        user: commenter,
        text: Faker::Lorem.paragraph(sentence_count: 2)
      )
    end
  end
end

puts "Seeding complete"
