class CreateAvailabilities < ActiveRecord::Migration[7.1]
  def change
    create_table :availabilities do |t|
      t.references :coach, null: false, foreign_key: { to_table: :users }
      t.datetime :start_time, null: false
      t.datetime :end_time

      t.timestamps
    end
  end
end
