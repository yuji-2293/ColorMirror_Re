class CreateColors < ActiveRecord::Migration[8.0]
  def change
    create_table :colors do |t|
      t.string "color_name", null: false
      t.string "mood"
      t.timestamps
    end
  end
end
