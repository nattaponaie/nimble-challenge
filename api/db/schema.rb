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

ActiveRecord::Schema.define(version: 2019_08_22_160448) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "keyword", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.string "keyword_name", null: false
    t.bigint "report_id"
    t.index ["report_id"], name: "index_keyword_on_report_id"
    t.index ["user_id"], name: "index_keyword_on_user_id"
  end

  create_table "keyword_data", force: :cascade do |t|
    t.string "keyword", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "total_adwords"
    t.integer "total_links"
    t.integer "total_results"
    t.boolean "is_searched", default: false
    t.binary "html_code"
  end

  create_table "report", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "keyword_id"
    t.integer "total_adwords", default: 0
    t.integer "total_links", default: 0
    t.integer "total_results", default: 0
    t.binary "html_code"
    t.boolean "is_searched", default: false
    t.index ["keyword_id"], name: "index_report_on_keyword_id"
  end

  create_table "user", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "uid", null: false
    t.string "email", null: false
    t.index ["uid"], name: "index_user_on_uid", unique: true
  end

  add_foreign_key "keyword", "\"user\"", column: "user_id"
  add_foreign_key "keyword", "report"
  add_foreign_key "report", "keyword"
end
