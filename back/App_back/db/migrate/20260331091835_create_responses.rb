class CreateResponses < ActiveRecord::Migration[8.0]
  def change
    create_table :responses do |t|
      t.string "ai_response"
      t.timestamps
    end
  end
end
