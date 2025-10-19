# API契約のための事前定義ファイル

## colors
## users
## self_logs
## responses
## weather_logs

  create_table "analysis_results", force: :cascade do |t|
    t.bigint "response_id", null: false
    t.string "analysis_value"
    t.string "analysis_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["response_id"], name: "index_analysis_results_on_response_id"
  end

  create_table "colors", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "color_name", null: false
    t.string "mood"
  end

  create_table "responses", force: :cascade do |t|
    t.bigint "self_log_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "color_analysis"
    t.string "weather_analysis"
    t.index ["self_log_id"], name: "index_responses_on_self_log_id"
  end

  create_table "self_logs", force: :cascade do |t|
    t.bigint "color_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["color_id"], name: "index_self_logs_on_color_id"
    t.index ["user_id"], name: "index_self_logs_on_user_id"
  end


  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name", default: "", null: false
    t.string "provider"
    t.string "uid"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "prefecture"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "line_id"
    t.integer "line_alert", default: 0, null: false
    t.string "line_token"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "weather_logs", force: :cascade do |t|
    t.bigint "self_log_id", null: false
    t.integer "weather_pressure"
    t.string "weather_name"
    t.integer "temperature"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "temp_max"
    t.integer "temp_min"
    t.string "weather_icon"
    t.string "description"
    t.string "city"
    t.index ["self_log_id"], name: "index_weather_logs_on_self_log_id"
  end

  add_foreign_key "analysis_results", "responses"
  add_foreign_key "reminders", "users"
  add_foreign_key "responses", "self_logs"
  add_foreign_key "self_logs", "colors"
  add_foreign_key "self_logs", "users"
  add_foreign_key "solid_queue_blocked_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_claimed_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_failed_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_ready_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_recurring_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "solid_queue_scheduled_executions", "solid_queue_jobs", column: "job_id", on_delete: :cascade
  add_foreign_key "weather_logs", "self_logs"
end
