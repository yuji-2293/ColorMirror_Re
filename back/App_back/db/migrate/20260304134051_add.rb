class Add < ActiveRecord::Migration[8.0]
  def change
      add_column :colors, :user_id, :integer
  end
end
