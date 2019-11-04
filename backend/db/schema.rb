# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_04_142925) do

  create_table "badges", force: :cascade do |t|
    t.string "name"
    t.string "path_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

<<<<<<< HEAD
  create_table "categories_users", id: false, force: :cascade do |t|
    t.integer "category_id", null: false
    t.integer "user_id", null: false
    t.index ["category_id"], name: "index_categories_users_on_category_id"
    t.index ["user_id"], name: "index_categories_users_on_user_id"
=======
  create_table "badges_users", id: false, force: :cascade do |t|
    t.integer "badge_id", null: false
    t.integer "user_id", null: false
    t.index ["badge_id"], name: "index_badges_users_on_badge_id"
    t.index ["user_id"], name: "index_badges_users_on_user_id"
>>>>>>> feature/add-badge
  end

  create_table "goals", force: :cascade do |t|
    t.datetime "start_date"
    t.datetime "end_date"
    t.string "goal_type"
    t.decimal "amount"
    t.string "name"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_goals_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "user_id"
    t.decimal "amount"
    t.string "category"
    t.string "location"
    t.datetime "transaction_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "hp", default: 100
    t.integer "coins", default: 20
    t.date "date_last_checked", default: "2000-01-01"
    t.integer "num_times_bud_met", default: 9
  end

  add_foreign_key "goals", "users"
  add_foreign_key "transactions", "users"
end
